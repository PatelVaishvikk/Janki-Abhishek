'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function BlessingCard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' as any })

  return (
    <motion.div
      ref={ref}
      className="card mb-4"
      style={{ padding: '28px 24px', textAlign: 'center' }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={{ fontSize: '32px', marginBottom: '12px' }} aria-hidden="true">
        🙏
      </div>
      <p
        className="font-display italic"
        style={{
          fontSize: 'clamp(1.1rem, 4.5vw, 1.4rem)',
          lineHeight: 1.6,
          color: 'hsl(38,18%,26%)',
          fontWeight: 400,
        }}
      >
        &ldquo;May Lord Swaminarayan shower His choicest blessings upon Janki &amp; Abhishek as they begin their sacred journey of love, harmony, and togetherness.&rdquo;
      </p>
      <p
        style={{
          marginTop: '16px',
          fontSize: '12.5px',
          color: 'hsl(38,72%,38%)',
          letterSpacing: '0.08em',
          fontWeight: 600,
        }}
      >
        || Jay Swaminarayan || &nbsp;·&nbsp; Das na das 🤗
      </p>
    </motion.div>
  )
}
