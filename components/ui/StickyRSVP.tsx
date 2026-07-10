'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function StickyRSVP() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const rsvpEl = document.getElementById('rsvp')
      if (!rsvpEl) return
      
      const rsvpRect = rsvpEl.getBoundingClientRect()
      
      // Show button if we have scrolled down past hero, and RSVP form is not yet visible
      const scrolledPastHero = window.scrollY > 280
      const rsvpNotInView = rsvpRect.top > window.innerHeight - 80
      
      setVisible(scrolledPastHero && rsvpNotInView)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToRSVP = () => {
    const el = document.getElementById('rsvp')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 40,
            width: '100%',
            maxWidth: '480px',
            padding: '0 24px',
            pointerEvents: 'none'
          }}
        >
          <motion.button
            onClick={scrollToRSVP}
            className="pill-btn pill-btn-gold"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              width: '100%',
              pointerEvents: 'auto',
              boxShadow: '0 8px 30px rgba(180,130,30,0.4)',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.02em',
              border: '1px solid rgba(255,255,255,0.15)'
            }}
          >
            💌 RSVP Now
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  )
}
