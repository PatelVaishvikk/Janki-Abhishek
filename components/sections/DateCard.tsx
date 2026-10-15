'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function DateCard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' as any })

  return (
    <div ref={ref} className="card mb-4" style={{ padding: '28px 24px', textAlign: 'center' }}>
      <motion.p
        style={{
          fontSize: '10px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'hsl(42,55%,48%)',
          fontWeight: 600,
          marginBottom: '8px',
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        Save the Date
      </motion.p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
        <motion.span
          className="font-display gold-text"
          style={{ fontSize: 'clamp(4.2rem, 18vw, 6.5rem)', fontWeight: 600, lineHeight: 1 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          22
        </motion.span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <motion.span
            className="font-display"
            style={{ fontSize: 'clamp(1.5rem, 7vw, 2.3rem)', fontWeight: 500, color: 'hsl(38,18%,24%)', lineHeight: 1.1 }}
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            November
          </motion.span>
          <div style={{ height: '2px', background: 'linear-gradient(to right, hsl(42,70%,58%), transparent)', borderRadius: '1px', width: '100%', margin: '5px 0' }} />
          <motion.span
            className="font-display"
            style={{ fontSize: 'clamp(1.5rem, 7vw, 2.3rem)', fontWeight: 300, color: 'hsl(38,12%,52%)', lineHeight: 1.1 }}
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            2026
          </motion.span>
        </div>
      </div>
      <motion.p
        style={{ marginTop: '12px', fontSize: '13.5px', color: 'hsl(38,12%,50%)' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Sunday &nbsp;·&nbsp; <strong style={{ color: 'hsl(38,72%,40%)' }}>9:00 AM onwards</strong> &nbsp;·&nbsp; EST
      </motion.p>
    </div>
  )
}
