'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Section } from '@/components/primitives/Section'
import { Button } from '@/components/primitives/Button'

// Event: Sunday 16 August 2026, 9:30 AM BST
const GOOGLE_CAL_URL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  '&text=Baby+Shower+%E2%80%94+Manish+%26+Riddhi' +
  '&dates=20260816T083000Z/20260816T133000Z' +
  '&details=Baby+Shower+Celebration+for+Manish+%26+Riddhi' +
  '&location=Manek+Chowk%2C+763-765+Harrow+Road%2C+Wembley+HA0+2LW'

const ICS_CONTENT = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Manish & Riddhi//Baby Shower//EN
BEGIN:VEVENT
UID:babyshower-manish-riddhi-2026@invite
DTSTAMP:20260101T000000Z
DTSTART:20260816T083000Z
DTEND:20260816T133000Z
SUMMARY:Baby Shower — Manish & Riddhi
DESCRIPTION:Baby Shower Celebration. Let's shower the Mom-to-Be with love & blessings!
LOCATION:Manek Chowk\\, 763-765 Harrow Road\\, Wembley HA0 2LW
END:VEVENT
END:VCALENDAR`

function downloadICS() {
  const blob = new Blob([ICS_CONTENT], { type: 'text/calendar;charset=utf-8' })
  const url  = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'manish-riddhi-baby-shower.ics'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function Calendar() {
  const ref   = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <Section id="calendar" aria-label="Add to calendar">
      <div ref={ref} className="text-center">
        <motion.p
          className="text-subheading text-primary-600 mb-3"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        >
          Don&rsquo;t miss it
        </motion.p>
        <motion.h2
          className="text-heading text-neutral-800 mb-8"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Add to your calendar
        </motion.h2>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Button
            variant="primary"
            size="md"
            onClick={downloadICS}
            aria-label="Download .ics calendar file"
          >
            📅 Apple / Outlook
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={() => window.open(GOOGLE_CAL_URL, '_blank', 'noopener,noreferrer')}
            aria-label="Add to Google Calendar"
          >
            🗓 Google Calendar
          </Button>
        </motion.div>
      </div>
    </Section>
  )
}
