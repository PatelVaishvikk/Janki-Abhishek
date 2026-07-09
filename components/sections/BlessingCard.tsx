'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function BlessingCard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' as any })
  return (
    <motion.div ref={ref} className="card mb-4" style={{ padding:'28px 24px', textAlign:'center' }}
      initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}>
      <div style={{ fontSize:'28px', marginBottom:'12px' }} aria-hidden="true">🙏</div>
      <p className="font-display italic"
        style={{ fontSize:'clamp(1.1rem,4.5vw,1.45rem)', lineHeight:1.55, color:'hsl(38,18%,28%)', fontWeight:400 }}>
        "May this little one be surrounded by warmth in every room they enter, laughter in every memory they make, and love so deep it finds them even in their quietest moments."
      </p>
      <p style={{ marginTop:'14px', fontSize:'12px', color:'hsl(38,10%,56%)', letterSpacing:'0.06em' }}>
        — With love, Manish &amp; Riddhi
      </p>
    </motion.div>
  )
}
