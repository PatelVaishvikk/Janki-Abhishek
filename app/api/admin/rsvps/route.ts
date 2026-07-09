import { NextRequest, NextResponse } from 'next/server'
import { getRSVPs } from '@/lib/db'

export const dynamic = 'force-dynamic'


export async function GET(req: NextRequest) {
  try {
    const passcodeHeader = req.headers.get('x-passcode')
    const correctPasscode = process.env.DASHBOARD_PASSCODE || '12345'

    if (passcodeHeader !== correctPasscode) {
      return NextResponse.json({ error: 'unauthorized', message: 'Invalid passcode' }, { status: 401 })
    }

    const rsvps = await getRSVPs()
    return NextResponse.json({ success: true, data: rsvps }, { status: 200 })
  } catch (err) {
    console.error('[Admin API] Error fetching RSVPs:', err)
    return NextResponse.json({ error: 'server_error', message: 'Failed to fetch RSVPs' }, { status: 500 })
  }
}
