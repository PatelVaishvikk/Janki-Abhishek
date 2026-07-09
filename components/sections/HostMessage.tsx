'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Section } from '@/components/primitives/Section'

const items = [
  {
    icon: '🌸',
    title: 'A note from us',
    content:
      "With hearts so full they could burst, Manish and Riddhi invite you to join in celebrating the upcoming arrival of their little one. Your presence — your laughter, your warmth, your blessings — is the greatest gift of all.",
  },
  {
    icon: '👗',
    title: 'Dress code',
    content: 'Traditional or festive Indian attire warmly welcomed. Come dressed in colour — the more vibrant, the merrier!',
  },
  {
    icon: '🎁',
    title: 'Gifts',
    content: 'Your presence truly is our greatest gift. No gifts necessary, but if you wish, a blessing written in a card means the world.',
  },
]

export function HostMessage() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <Section id="message" aria-label="Message from the hosts">
      <div ref={ref} className="text-center">
        <motion.p
          className="text-subheading text-accent-400 mb-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          From the family
        </motion.p>

        <motion.h2
          className="text-title text-neutral-800 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Let&rsquo;s shower<br />
          <span className="italic text-primary-500">the Mom-to-Be</span>
        </motion.h2>

        <div className="flex flex-col gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              className="glass-card p-5 text-left"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5" aria-hidden="true">{item.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-neutral-700 mb-1">{item.title}</p>
                  <p className="text-sm text-neutral-600 leading-relaxed">{item.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
