'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Section } from '@/components/primitives/Section'
import { Button } from '@/components/primitives/Button'

const VENUE = {
  name: 'Manek Chowk',
  address: '763–765 Harrow Road, Wembley, HA0 2LW, United Kingdom',
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.5!2d-0.3215!3d51.5432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760e5c86d8f9e3%3A0x0!2sManek+Chowk!5e0!3m2!1sen!2suk!4v1',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Manek+Chowk,+763-765+Harrow+Road,+Wembley,+HA0+2LW,+United+Kingdom',
}

export function Venue() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <Section id="venue" aria-label="Venue and directions" className="bg-primary-50/40">
      <div ref={ref}>
        <div className="text-center mb-7">
          <motion.p
            className="text-subheading text-primary-600 mb-3"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          >
            Where to find us
          </motion.p>
          <motion.h2
            className="text-heading text-neutral-800"
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {VENUE.name}
          </motion.h2>
          <motion.address
            className="not-italic text-neutral-500 mt-2 text-sm leading-relaxed"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {VENUE.address}
          </motion.address>
        </div>

        {/* Map — lazy rendered via IntersectionObserver */}
        <motion.div
          className="relative w-full rounded-2xl overflow-hidden border border-primary-100 shadow-sm mb-5"
          style={{ aspectRatio: '4/3' }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {inView && (
            <iframe
              src={VENUE.mapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, position: 'absolute', inset: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map showing ${VENUE.name}`}
            />
          )}
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.open(VENUE.directionsUrl, '_blank', 'noopener,noreferrer')}
            aria-label={`Get directions to ${VENUE.name}`}
          >
            📍 Get Directions
          </Button>
        </motion.div>
      </div>
    </Section>
  )
}
