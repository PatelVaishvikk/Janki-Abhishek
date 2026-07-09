'use client'

import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'
import { Section } from '@/components/primitives/Section'
import { CountdownUnit } from '@/components/ui/CountdownUnit'

// Event: 16th August 2026 at 9:30 AM BST (UTC+1)
const EVENT_DATE = new Date('2026-08-16T09:30:00+01:00')

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(): TimeLeft {
  const now = Date.now()
  const diff = Math.max(0, EVENT_DATE.getTime() - now)
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function Countdown() {
  const [time, setTime] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    setTime(getTimeLeft())
    setStarted(true)
    const interval = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(interval)
  }, [])

  const isPast = EVENT_DATE.getTime() < Date.now()

  return (
    <Section id="countdown" aria-label="Countdown to the event" className="bg-gradient-to-b from-primary-50/40 to-white/0">
      <div ref={ref} className="text-center">
        <p className="text-subheading text-primary-600 mb-3">Counting down with joy</p>
        <h2 className="text-heading text-neutral-800 mb-8">
          {isPast ? 'The celebration has begun!' : 'The big day arrives in…'}
        </h2>

        {!isPast && (
          <div
            className="flex items-start justify-center gap-3 sm:gap-5"
            aria-label={`${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds remaining`}
            role="timer"
          >
            {started && (
              <>
                <CountdownUnit value={time.days}    label="Days"    />
                <div className="text-2xl text-primary-300 mt-4 font-light" aria-hidden="true">:</div>
                <CountdownUnit value={time.hours}   label="Hours"   />
                <div className="text-2xl text-primary-300 mt-4 font-light" aria-hidden="true">:</div>
                <CountdownUnit value={time.minutes} label="Mins"    />
                <div className="text-2xl text-primary-300 mt-4 font-light" aria-hidden="true">:</div>
                <CountdownUnit value={time.seconds} label="Secs"    />
              </>
            )}
          </div>
        )}

        {isPast && (
          <p className="text-display gradient-text">🎉</p>
        )}
      </div>
    </Section>
  )
}
