'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Section } from '@/components/primitives/Section'

// Event: Sunday, 16th August 2026 at 9:30 AM
const DATE_PARTS = {
  dayOfWeek: 'Sunday',
  day: '16',
  month: 'August',
  year: '2026',
  time: '9:30 AM',
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export function DateReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section id="date" aria-label="Event date" className="bg-primary-50/60">
      <div className="text-center">
        {/* Label */}
        <motion.p
          className="text-subheading text-primary-600 mb-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          Save the Date
        </motion.p>

        {/* Day of week */}
        <motion.p
          className="font-display text-[clamp(1rem,3vw,1.25rem)] italic text-neutral-400 mb-1"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {DATE_PARTS.dayOfWeek}
        </motion.p>

        {/* Main date layout */}
        <motion.div
          className="flex items-center justify-center gap-3 sm:gap-5 mb-2"
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Day number */}
          <motion.span
            variants={scaleIn}
            className="font-display text-[clamp(5rem,18vw,9rem)] leading-none font-semibold gradient-text"
            aria-hidden="true"
          >
            {DATE_PARTS.day}
          </motion.span>

          {/* Divider + Month + Year stacked */}
          <div className="flex flex-col items-start gap-0">
            <motion.span
              variants={fadeUp}
              className="font-display text-[clamp(1.5rem,6vw,3.5rem)] font-medium text-neutral-700 leading-tight"
            >
              {DATE_PARTS.month}
            </motion.span>
            <motion.div
              variants={fadeUp}
              className="h-[2px] w-full bg-gradient-to-r from-primary-400 to-primary-200 rounded-full my-1"
              aria-hidden="true"
            />
            <motion.span
              variants={fadeUp}
              className="font-display text-[clamp(1.5rem,6vw,3.5rem)] font-light text-neutral-500 leading-tight"
            >
              {DATE_PARTS.year}
            </motion.span>
          </div>
        </motion.div>

        {/* Time */}
        <motion.p
          className="font-body text-[clamp(0.875rem,2vw,1rem)] text-neutral-500 mt-4 tracking-wide"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Celebrations begin at{' '}
          <strong className="text-primary-600 font-semibold">{DATE_PARTS.time}</strong>
        </motion.p>
      </div>
    </Section>
  )
}
