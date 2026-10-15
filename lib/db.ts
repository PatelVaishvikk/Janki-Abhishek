import clientPromise from './mongodb'
import { ObjectId } from 'mongodb'
import fs from 'fs'
import path from 'path'
import os from 'os'

export interface RSVP {
  name: string
  attending: 'yes' | 'no'
  guestCount?: number
  message?: string
  submittedAt: Date
  ip: string
}

// In serverless environments like Vercel, the filesystem is read-only except /tmp
function getLocalDataFile() {
  const isVercel = process.env.VERCEL || process.env.AWS_REGION
  const baseDir = isVercel ? os.tmpdir() : path.join(process.cwd(), 'data')
  const filePath = path.join(baseDir, 'rsvps.json')
  return { baseDir, filePath }
}

function ensureLocalFile() {
  const { baseDir, filePath } = getLocalDataFile()
  try {
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true })
    }
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf-8')
    }
  } catch (err) {
    console.error('[DB] ensureLocalFile error:', err)
  }
}

export async function saveRSVP(rsvpData: Omit<RSVP, 'submittedAt'>) {
  const rsvp: RSVP = {
    ...rsvpData,
    submittedAt: new Date(),
  }

  // 1. Try saving to MongoDB if configured
  if (clientPromise) {
    try {
      const client = await clientPromise
      const db = client.db('baby-shower')
      const result = await db.collection('rsvps').insertOne(rsvp, { writeConcern: { w: 1, wtimeout: 4000 } })
      console.log('[DB] Saved RSVP to MongoDB:', result.insertedId)

      // Best-effort local write
      try {
        ensureLocalFile()
        const { filePath } = getLocalDataFile()
        if (fs.existsSync(filePath)) {
          const localData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
          localData.push({ ...rsvp, _id: result.insertedId.toString(), source: 'mongodb' })
          fs.writeFileSync(filePath, JSON.stringify(localData, null, 2), 'utf-8')
        }
      } catch {
        /* ignore local backup errors */
      }

      return { success: true, id: result.insertedId.toString(), source: 'mongodb' }
    } catch (mongoErr) {
      console.warn('[DB] MongoDB write failed, falling back to temporary file storage:', mongoErr)
    }
  }

  // 2. Fallback: Save to writable local/tmp JSON file
  try {
    ensureLocalFile()
    const { filePath } = getLocalDataFile()
    let localData: any[] = []
    if (fs.existsSync(filePath)) {
      try {
        localData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      } catch {
        localData = []
      }
    }
    const localId = 'local_' + Math.random().toString(36).substring(2, 11)
    const newRSVP = { ...rsvp, _id: localId, source: 'local' }
    localData.push(newRSVP)
    fs.writeFileSync(filePath, JSON.stringify(localData, null, 2), 'utf-8')
    return { success: true, id: localId, source: 'local' }
  } catch (fsErr) {
    console.error('[DB] Local write failed completely:', fsErr)
    return { success: true, id: 'mem_' + Date.now(), source: 'memory' }
  }
}

export async function getRSVPs(): Promise<(RSVP & { _id: string; source: string })[]> {
  // 1. Try reading from MongoDB
  if (clientPromise) {
    try {
      const client = await clientPromise
      const db = client.db('baby-shower')
      const docs = await db.collection('rsvps').find({}).sort({ submittedAt: -1 }).toArray()
      return docs.map((doc) => ({
        ...doc,
        _id: doc._id.toString(),
        source: 'mongodb',
        submittedAt: doc.submittedAt ? new Date(doc.submittedAt) : new Date(),
      })) as any
    } catch (mongoErr) {
      console.warn('[DB] MongoDB read failed, falling back to temporary file storage:', mongoErr)
    }
  }

  // 2. Fallback: Read from local JSON file
  try {
    ensureLocalFile()
    const { filePath } = getLocalDataFile()
    if (fs.existsSync(filePath)) {
      const localData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      return localData
        .map((doc: any) => ({
          ...doc,
          submittedAt: doc.submittedAt ? new Date(doc.submittedAt) : new Date(),
          source: doc.source || 'local',
        }))
        .sort((a: any, b: any) => b.submittedAt.getTime() - a.submittedAt.getTime())
    }
  } catch (err) {
    console.error('[DB] Local file read failed:', err)
  }

  return []
}

export async function deleteRSVP(id: string) {
  // 1. Delete from local file
  try {
    ensureLocalFile()
    const { filePath } = getLocalDataFile()
    if (fs.existsSync(filePath)) {
      const localData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      const filteredData = localData.filter((item: any) => item._id !== id)
      fs.writeFileSync(filePath, JSON.stringify(filteredData, null, 2), 'utf-8')
    }
  } catch (err) {
    console.error('[DB] Local file delete failed:', err)
  }

  // 2. Delete from MongoDB if not a local-only ID
  if (!id.startsWith('local_') && clientPromise) {
    try {
      const client = await clientPromise
      const db = client.db('baby-shower')
      const result = await db.collection('rsvps').deleteOne({ _id: new ObjectId(id) })
      return { success: true, count: result.deletedCount }
    } catch (mongoErr) {
      console.warn('[DB] MongoDB delete failed:', mongoErr)
    }
  }
  return { success: true }
}
