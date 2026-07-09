'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Section } from '@/components/primitives/Section'

const SHARE_DATA = {
  title: "Baby Shower — Manish & Riddhi",
  text:  "You're invited! Join us to celebrate Manish & Riddhi's baby shower on Sunday, 16th August 2026 at Manek Chowk, Wembley.",
  url:   typeof window !== 'undefined' ? window.location.href : 'https://manish-riddhi.vercel.app',
}

export function ShareButton() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : SHARE_DATA.url

    if (navigator.share) {
      try {
        await navigator.share({ ...SHARE_DATA, url })
      } catch {
        // User cancelled — no action needed
      }
    } else {
      // Clipboard fallback
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
      } catch {
        // Silent fail
      }
    }
  }

  return (
    <Section id="share" aria-label="Share the invitation">
      <div ref={ref} className="text-center">
        <motion.p
          className="text-subheading text-accent-400 mb-3"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        >
          Spread the joy
        </motion.p>
        <motion.h2
          className="text-heading text-neutral-800 mb-6"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Share the invitation
        </motion.h2>
        <motion.p
          className="text-sm text-neutral-500 mb-8 max-w-[28ch] mx-auto"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Know someone who should be there? Pass this along.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button
            onClick={handleShare}
            aria-label="Share invitation"
            className="relative px-8 py-4 rounded-full font-medium text-white overflow-hidden focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            style={{ background: 'linear-gradient(135deg, hsl(265,60%,42%), hsl(265,60%,52%))' }}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="flex items-center gap-2"
                >
                  ✓ Link copied!
                </motion.span>
              ) : (
                <motion.span
                  key="share"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="flex items-center gap-2"
                >
                  🔗 Share Invitation
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>
    </Section>
  )
}
