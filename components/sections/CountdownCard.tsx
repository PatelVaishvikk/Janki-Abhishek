'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TARGET = new Date('2026-11-22T09:00:00-05:00') // November 22, 2026 9:00 AM EST

interface Unit {
  value: number
  label: string
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function getRemaining(): Unit[] | null {
  const diff = TARGET.getTime() - Date.now()
  if (diff <= 0) return null
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  return [
    { value: d, label: 'Days' },
    { value: h, label: 'Hours' },
    { value: m, label: 'Mins' },
    { value: s, label: 'Secs' },
  ]
}

export function CountdownCard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' as any })
  const [units, setUnits] = useState<Unit[] | null>(getRemaining)

  useEffect(() => {
    const id = setInterval(() => setUnits(getRemaining()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div ref={ref} className="card mb-4" style={{ padding: '24px 20px', textAlign: 'center' }}>
      <motion.p
        style={{
          fontSize: '10px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'hsl(42,55%,48%)',
          fontWeight: 600,
          marginBottom: '14px',
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        ✨ Counting down to the big day
      </motion.p>

      {units === null ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ fontSize: '18px', color: 'hsl(38,72%,36%)', fontWeight: 600 }}
        >
          🎉 The celebration is underway!
        </motion.div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {units.map(({ value, label }, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * idx, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                flex: 1,
                maxWidth: '82px',
                padding: '12px 6px',
                borderRadius: '16px',
                background: 'linear-gradient(145deg, hsl(44,60%,97%) 0%, hsl(42,40%,93%) 100%)',
                border: '1px solid hsl(42,45%,82%)',
              }}
            >
              <div
                className="font-display gold-text"
                style={{ fontSize: 'clamp(1.6rem, 6vw, 2.1rem)', fontWeight: 600, lineHeight: 1, marginBottom: '4px' }}
              >
                {pad(value)}
              </div>
              <div
                style={{
                  fontSize: '9px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'hsl(38,12%,50%)',
                }}
              >
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
