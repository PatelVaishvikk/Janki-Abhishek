'use client'

import { motion } from 'framer-motion'

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
})

interface DetailRowProps {
  icon: string
  label: string
  value: React.ReactNode
  delay?: number
}

function DetailRow({ icon, label, value, delay = 0 }: DetailRowProps) {
  return (
    <motion.div
      {...anim(delay)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
        padding: '14px 0',
        borderBottom: '1px solid hsl(35,25%,90%)',
      }}
    >
      <span style={{
        fontSize: '22px',
        minWidth: '32px',
        textAlign: 'center',
        lineHeight: 1,
        paddingTop: '2px',
      }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <p style={{
          fontSize: '10px', fontWeight: 600,
          color: 'hsl(22,70%,45%)',
          textTransform: 'uppercase', letterSpacing: '0.1em',
          marginBottom: '3px',
        }}>
          {label}
        </p>
        <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.5 }}>
          {value}
        </div>
      </div>
    </motion.div>
  )
}

export function DetailsCard() {
  return (
    <div className="card" style={{ padding: '24px 24px 8px', marginBottom: '16px' }}>
      <motion.h2
        {...anim(0.05)}
        className="font-display"
        style={{
          fontSize: 'clamp(1.4rem, 5vw, 1.7rem)',
          fontWeight: 600, color: 'var(--ink)',
          marginBottom: '4px',
        }}
      >
        Event Details
      </motion.h2>
      <motion.p {...anim(0.1)} style={{ fontSize: '13px', color: 'var(--ink-faint)', marginBottom: '8px' }}>
        We look forward to celebrating with you 🙏
      </motion.p>

      <DetailRow
        icon="📅"
        label="Date"
        value={
          <span>
            <span className="font-display" style={{ fontSize: '17px', fontWeight: 600 }}>
              November 22, 2026
            </span>
            <span style={{ fontSize: '13px', color: 'var(--ink-muted)', marginLeft: '8px' }}>
              Sunday
            </span>
          </span>
        }
        delay={0.15}
      />

      <DetailRow
        icon="⏰"
        label="Time"
        value={
          <span className="font-display" style={{ fontSize: '17px', fontWeight: 600 }}>
            9:00 AM onwards
          </span>
        }
        delay={0.22}
      />

      <DetailRow
        icon="📢"
        label="RSVP By"
        value={
          <span>
            <span style={{ fontWeight: 600, color: 'hsl(350,65%,38%)' }}>
              October 31, 2026
            </span>
            <span style={{ fontSize: '13px', color: 'var(--ink-muted)', marginLeft: '6px' }}>
              ✅
            </span>
          </span>
        }
        delay={0.29}
      />

      <motion.div {...anim(0.36)} style={{ paddingTop: '14px', paddingBottom: '6px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '10px 16px', borderRadius: '12px',
          background: 'hsl(350,70%,40%,0.07)',
          border: '1px solid hsl(350,65%,55%,0.18)',
        }}>
          <span style={{ fontSize: '16px' }}>🎁</span>
          <p style={{ fontSize: '13px', color: 'hsl(350,65%,35%)', fontWeight: 500 }}>
            Kindly, no boxed gifts
          </p>
        </div>
      </motion.div>
    </div>
  )
}
