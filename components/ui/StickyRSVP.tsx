'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function StickyRSVP() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const rsvpEl = document.getElementById('rsvp')
    const onScroll = () => {
      if (!rsvpEl) { setVisible(window.scrollY > 300); return }
      const rect = rsvpEl.getBoundingClientRect()
      setVisible(window.scrollY > 300 && rect.top > window.innerHeight * 0.6)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed', bottom: '24px', left: '50%',
            transform: 'translateX(-50%)', zIndex: 200,
            pointerEvents: 'all',
          }}
        >
          <button
            onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
            className="pill-btn pill-btn-gold"
            style={{
              padding: '14px 32px', fontSize: '14px',
              boxShadow: '0 8px 32px hsl(28,90%,45%,0.4)',
              backdropFilter: 'blur(12px)',
            }}
          >
            💌 RSVP Now
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
