'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Section } from '@/components/primitives/Section'

const BLESSING =
  "May this little one be surrounded by warmth in every room they enter, laughter in every memory they make, and love so deep it finds them even in their quietest moments. You are already so cherished."

export function Blessing() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const words = BLESSING.split(' ')

  return (
    <Section id="blessing" aria-label="Blessing and dedication" className="bg-gradient-to-b from-white/0 to-primary-50/60">
      <div ref={ref} className="text-center">
        {/* Ornament */}
        <motion.div
          className="flex items-center justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-3xl" aria-hidden="true">🌸</span>
        </motion.div>

        {/* Word-by-word reveal */}
        <p
          className="font-display text-[clamp(1.3rem,4vw+0.5rem,2rem)] text-neutral-700 italic leading-relaxed max-w-[38ch] mx-auto"
          aria-label={BLESSING}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.05 * i,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              aria-hidden="true"
            >
              {word}
            </motion.span>
          ))}
        </p>

        <motion.div
          className="mt-8 divider-ornament"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <span className="text-primary-400 text-lg" aria-hidden="true">✦</span>
        </motion.div>
      </div>
    </Section>
  )
}
