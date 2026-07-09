import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { saveRSVP } from '@/lib/db'

export const dynamic = 'force-dynamic'


const rsvpSchema = z.object({
  name:       z.string().min(1, 'Name is required').max(100),
  attending:  z.enum(['yes', 'no']),
  guestCount: z.preprocess(
    (val) => (val === '' || val === null || val === undefined ? undefined : val),
    z.coerce.number().min(1).max(10).optional()
  ),
  message:    z.string().max(500).optional(),
}).refine(
  (data) => {
    if (data.attending === 'yes') {
      return data.guestCount !== undefined && data.guestCount >= 1;
    }
    return true;
  },
  {
    message: 'Number of guests is required when attending',
    path: ['guestCount'],
  }
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = rsvpSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'validation', issues: parsed.error.issues },
        { status: 400 }
      )
    }

    const data = { ...parsed.data }
    // If not attending, remove guest count
    if (data.attending === 'no') {
      delete data.guestCount
    }

    const result = await saveRSVP({
      name: data.name,
      attending: data.attending,
      guestCount: data.guestCount,
      message: data.message,
      ip: req.headers.get('x-forwarded-for') ?? 'unknown',
    })

    return NextResponse.json(
      { success: true, id: result.id, source: result.source },
      { status: 201 }
    )
  } catch (err) {
    console.error('[RSVP] Server error:', err)
    return NextResponse.json(
      { error: 'server_error', message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

// Disallow GET — no data leakage
export function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

