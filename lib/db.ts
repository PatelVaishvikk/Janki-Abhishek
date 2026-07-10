import clientPromise from './mongodb'
import { ObjectId } from 'mongodb'
import fs from 'fs'
import path from 'path'

export interface RSVP {
  name: string
  attending: 'yes' | 'no'
  guestCount?: number
  message?: string
  submittedAt: Date
  ip: string
}

const LOCAL_DATA_DIR = path.join(process.cwd(), 'data')
const LOCAL_DATA_FILE = path.join(LOCAL_DATA_DIR, 'rsvps.json')

function ensureLocalFile() {
  if (!fs.existsSync(LOCAL_DATA_DIR)) {
    fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true })
  }
  if (!fs.existsSync(LOCAL_DATA_FILE)) {
    fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify([], null, 2), 'utf-8')
  }
}

export async function saveRSVP(rsvpData: Omit<RSVP, 'submittedAt'>) {
  const rsvp: RSVP = {
    ...rsvpData,
    submittedAt: new Date(),
  }

  // 1. Try saving to MongoDB
  try {
    const client = await clientPromise
    const db = client.db('baby-shower')
    
    // Set a small server selection timeout so it doesn't hang the request for 30s
    // node-mongodb-driver handles this, but since client is already connected or connecting,
    // let's try inserting with a maxTimeMS limit of 3000ms.
    const result = await db.collection('rsvps').insertOne(rsvp, { writeConcern: { w: 1, wtimeout: 3000 } })
    console.log('[DB] Saved RSVP to MongoDB:', result.insertedId)

    // Also write locally as backup/dual-write
    try {
      ensureLocalFile()
      const localData = JSON.parse(fs.readFileSync(LOCAL_DATA_FILE, 'utf-8'))
      localData.push({ ...rsvp, _id: result.insertedId.toString(), source: 'mongodb' })
      fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(localData, null, 2), 'utf-8')
    } catch (localErr) {
      console.error('[DB] Local backup write failed:', localErr)
    }

    return { success: true, id: result.insertedId.toString(), source: 'mongodb' }
  } catch (mongoErr) {
    console.warn('[DB] MongoDB write failed, falling back to local file storage:', mongoErr)
    
    // 2. Fallback: Save to local JSON file
    ensureLocalFile()
    const localData = JSON.parse(fs.readFileSync(LOCAL_DATA_FILE, 'utf-8'))
    const localId = 'local_' + Math.random().toString(36).substring(2, 11)
    const newRSVP = { ...rsvp, _id: localId, source: 'local' }
    localData.push(newRSVP)
    fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(localData, null, 2), 'utf-8')
    return { success: true, id: localId, source: 'local' }
  }
}

export async function getRSVPs(): Promise<(RSVP & { _id: string; source: string })[]> {
  // 1. Try reading from MongoDB
  try {
    const client = await clientPromise
    const db = client.db('baby-shower')
    const docs = await db.collection('rsvps').find({}).sort({ submittedAt: -1 }).toArray()
    return docs.map(doc => ({
      ...doc,
      _id: doc._id.toString(),
      source: 'mongodb',
      submittedAt: doc.submittedAt ? new Date(doc.submittedAt) : new Date(),
    })) as any
  } catch (mongoErr) {
    console.warn('[DB] MongoDB read failed, falling back to local file storage:', mongoErr)
    
    // 2. Fallback: Read from local JSON file
    try {
      ensureLocalFile()
      const localData = JSON.parse(fs.readFileSync(LOCAL_DATA_FILE, 'utf-8'))
      return localData
        .map((doc: any) => ({
          ...doc,
          submittedAt: doc.submittedAt ? new Date(doc.submittedAt) : new Date(),
          source: doc.source || 'local'
        }))
        .sort((a: any, b: any) => b.submittedAt.getTime() - a.submittedAt.getTime())
    } catch (err) {
      console.error('[DB] Local file read failed:', err)
      return []
    }
  }
}

export async function deleteRSVP(id: string) {
  // 1. Delete from local file
  try {
    ensureLocalFile()
    if (fs.existsSync(LOCAL_DATA_FILE)) {
      const localData = JSON.parse(fs.readFileSync(LOCAL_DATA_FILE, 'utf-8'))
      const filteredData = localData.filter((item: any) => item._id !== id)
      fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(filteredData, null, 2), 'utf-8')
    }
  } catch (err) {
    console.error('[DB] Local file delete failed:', err)
  }

  // 2. Delete from MongoDB if not a local-only ID
  if (!id.startsWith('local_')) {
    try {
      const client = await clientPromise
      const db = client.db('baby-shower')
      const result = await db.collection('rsvps').deleteOne({ _id: new ObjectId(id) })
      console.log('[DB] Deleted RSVP from MongoDB:', id, 'Deleted count:', result.deletedCount)
      return { success: true, count: result.deletedCount }
    } catch (mongoErr) {
      console.warn('[DB] MongoDB delete failed:', mongoErr)
    }
  }
  return { success: true }
}
