'use client'

import { useState, useEffect } from 'react'

const TARGET_DATE = new Date('2026-11-22T09:00:00-05:00') // November 22, 2026, 9:00 AM EST

interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

function calculateTimeRemaining(): TimeRemaining {
  const diff = TARGET_DATE.getTime() - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds, isPast: false }
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

export function CountdownCard() {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTimeLeft(calculateTimeRemaining())

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeRemaining())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <section className="wedding-frame" style={{ borderRadius: '4px' }}>
      <div className="wedding-frame-inner" style={{ textAlign: 'center', padding: '28px 18px 26px' }}>
        
        {/* Header Ornament */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '8px' }}>
          <div style={{ height: '1px', width: '30px', background: 'linear-gradient(to right, transparent, var(--gold-light))' }} />
          <span style={{ fontSize: '9px', color: 'var(--gold-primary)' }}>◆</span>
          <div style={{ height: '1px', width: '30px', background: 'linear-gradient(to left, transparent, var(--gold-light))' }} />
        </div>

        <p
          style={{
            fontSize: '10.5px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gold-dark)',
            fontWeight: 600,
            marginBottom: '16px',
          }}
        >
          Counting Down The Auspicious Days
        </p>

        {mounted && timeLeft.isPast ? (
          <p className="font-display italic" style={{ fontSize: '1.25rem', color: 'var(--maroon)' }}>
            The celebration has begun!
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '8px',
              maxWidth: '440px',
              margin: '0 auto',
            }}
          >
            {units.map((unit) => (
              <div
                key={unit.label}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--gold-border)',
                  borderRadius: '2px',
                  padding: '12px 4px 10px',
                  boxShadow: '0 1px 4px rgba(36, 33, 29, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  className="font-display gold-heading"
                  style={{
                    fontSize: 'clamp(1.7rem, 6.5vw, 2.3rem)',
                    fontWeight: 600,
                    lineHeight: 1,
                    marginBottom: '4px',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {mounted ? pad(unit.value) : '--'}
                </div>
                <div
                  style={{
                    fontSize: '9px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-secondary)',
                    fontWeight: 600,
                  }}
                >
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <p
          className="font-display italic"
          style={{
            fontSize: '13px',
            color: 'var(--ink-muted)',
            marginTop: '16px',
            letterSpacing: '0.02em',
          }}
        >
          Sunday, November 22, 2026 · 9:00 AM onwards
        </p>

      </div>
    </section>
  )
}
