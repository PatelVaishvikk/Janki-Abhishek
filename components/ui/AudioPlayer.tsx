'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AudioPlayerProps {
  src: string
}

export function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [muted, setMuted]   = useState(true)
  const [error, setError]   = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.loop   = true
    audio.volume = 0.3
    audio.muted  = true
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio || error) return
    if (muted) {
      audio.muted = false
      audio.play().catch(() => setError(true))
      setMuted(false)
    } else {
      audio.muted = true
      setMuted(true)
    }
  }, [muted, error])

  return (
    <>
      <audio ref={audioRef} src={src} preload="none" onError={() => setError(true)} aria-label="Background music" />
      <motion.button
        onClick={toggle}
        aria-label={muted ? 'Play background music' : 'Mute background music'}
        style={{
          position: 'fixed', top: '14px', right: '14px', zIndex: 100,
          width: '40px', height: '40px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(180,140,60,0.25)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontSize: '16px',
        }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        disabled={error}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={muted ? 'off' : 'on'}
            initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }} style={{ lineHeight: 1, userSelect: 'none' }} aria-hidden="true">
            {error ? '✕' : muted ? '🔇' : '🎵'}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </>
  )
}
