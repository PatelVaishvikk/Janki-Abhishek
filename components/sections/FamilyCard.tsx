'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function FamilyCard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' as any })

  return (
    <div ref={ref} className="card mb-4" style={{ padding: '24px 20px', textAlign: 'center' }}>
      <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'hsl(42,55%,48%)', fontWeight: 500, marginBottom: '4px' }}>
        Family Blessings
      </p>
      <h2 className="font-display italic" style={{ fontSize: 'clamp(1.3rem,5.5vw,1.8rem)', fontWeight: 400, color: 'hsl(38,18%,26%)', marginBottom: '20px' }}>
        With Love & Respect
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
        {/* Parents */}
        <motion.div
          style={{ padding: '14px', borderRadius: '16px', background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(200,170,90,0.12)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <p style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'hsl(340,65%,55%)', fontWeight: 600, marginBottom: '6px' }}>Parents</p>
          <div style={{ fontSize: '14px', color: 'hsl(38,18%,24%)', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <p><strong>Mom:</strong> Riddhi</p>
            <p><strong>Dad:</strong> Manish</p>
          </div>
        </motion.div>

        {/* Grandparents */}
        <motion.div
          style={{ padding: '14px', borderRadius: '16px', background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(200,170,90,0.12)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'hsl(42,55%,45%)', fontWeight: 600, marginBottom: '6px' }}>Paternal Grandparents</p>
          <p style={{ fontSize: '14px', color: 'hsl(38,18%,24%)', lineHeight: 1.6 }}>
            Ashokbhai Chhaganbhai Patel<br />
            Rasilaben Ashokbhai Patel
          </p>
        </motion.div>

        {/* Maternal Grandparents */}
        <motion.div
          style={{ padding: '14px', borderRadius: '16px', background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(200,170,90,0.12)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'hsl(42,55%,45%)', fontWeight: 600, marginBottom: '6px' }}>Maternal Grandparents</p>
          <p style={{ fontSize: '14px', color: 'hsl(38,18%,24%)', lineHeight: 1.6 }}>
            Sureshbhai Jayantibhai Patel<br />
            Arunaben Sureshbhai Patel
          </p>
        </motion.div>
      </div>
    </div>
  )
}
