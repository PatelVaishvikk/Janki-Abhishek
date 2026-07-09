'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface SplashProps {
  onEnter: () => void
}

export function Splash({ onEnter }: SplashProps) {
  const [ready, setReady] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    // Small delay lets fonts and image start loading
    const t = setTimeout(() => setReady(true), 200)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [])

  const handleEnter = () => {
    if (exiting) return
    setExiting(true)
    setTimeout(onEnter, 650)
  }

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="splash"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: 'linear-gradient(165deg, hsl(44,60%,96%) 0%, hsl(270,30%,95%) 50%, hsl(340,30%,96%) 100%)' }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background decorative rings */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-yellow-200/40" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-yellow-300/30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-yellow-400/20" />
            {/* Soft glow spots */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, hsl(270,40%,88%,0.5), transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, hsl(42,70%,88%,0.5), transparent 70%)' }} />
          </div>

          <div className="relative z-10 flex flex-col items-center px-8 text-center w-full max-w-sm mx-auto">

            {/* Radha-Krishna illustration */}
            <motion.div
              className="relative mb-6"
              initial={{ opacity: 0, y: 40, scale: 0.85 }}
              animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Glow halo */}
              <div className="absolute inset-0 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, hsl(42,80%,70%,0.4), transparent 65%)' }} />
              <Image
                src="/images/radha-krishna.png"
                alt="Radha and Krishna"
                width={220}
                height={220}
                priority
                className="relative drop-shadow-2xl"
              />
            </motion.div>

            {/* Tag */}
            <motion.div
              className="mb-3 px-4 py-1.5 rounded-full border text-xs font-medium tracking-widest uppercase"
              style={{ borderColor: 'hsl(42,60%,75%)', color: 'hsl(38,72%,38%)', background: 'hsl(44,80%,94%)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Baby Shower Invitation
            </motion.div>

            {/* Names */}
            <motion.h1
              className="font-display mb-2"
              style={{ fontSize: 'clamp(2.6rem, 12vw, 3.8rem)', lineHeight: 1.05, fontWeight: 600 }}
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="gold-text">Manish</span>
              <br />
              <span className="font-display italic font-light" style={{ color: 'hsl(38,15%,60%)', fontSize: '0.55em' }}>&amp;</span>
              <br />
              <span className="gold-text">Riddhi</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              style={{ color: 'hsl(38,12%,48%)', fontSize: '14px', lineHeight: 1.6, marginBottom: '32px', maxWidth: '26ch' }}
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ delay: 0.65, duration: 0.6 }}
            >
              A new soul is on their way.<br />Come shower them with love &amp; blessings.
            </motion.p>

            {/* CTA */}
            <motion.button
              onClick={handleEnter}
              disabled={exiting}
              className="pill-btn pill-btn-gold w-full"
              style={{ fontSize: '15px', padding: '16px 32px', letterSpacing: '0.02em' }}
              initial={{ opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {exiting ? 'Opening…' : '🌸 Open Invitation'}
            </motion.button>

            <motion.p
              style={{ marginTop: '14px', fontSize: '11px', color: 'hsl(38,10%,65%)', letterSpacing: '0.04em' }}
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              TAP TO REVEAL
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
