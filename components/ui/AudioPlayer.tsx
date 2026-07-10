'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AudioPlayerProps {
  src: string
}

export function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [muted, setMuted] = useState(true)
  const [error, setError] = useState(false)

  // Try to play audio automatically on load or user interaction
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.loop = true
    audio.volume = 0.3

    // Start playing in muted mode on mount so browsers allow it immediately
    audio.muted = true
    audio.play()
      .then(() => {
        console.log('Muted autoplay initialized successfully')
      })
      .catch((err) => {
        console.log('Initial muted play deferred:', err)
      })

    const attemptUnmute = () => {
      if (!audio) return
      
      // Unmute and ensure audio is playing
      audio.muted = false
      if (audio.paused) {
        audio.play()
          .then(() => {
            setMuted(false)
            cleanup()
          })
          .catch((err) => {
            console.log('Unmute playback failed:', err)
          })
      } else {
        setMuted(false)
        cleanup()
      }
    }

    const handleInteraction = () => {
      attemptUnmute()
    }

    const cleanup = () => {
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
      window.removeEventListener('scroll', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
    }

    // Monitor first user gestures to trigger unmuting
    window.addEventListener('click', handleInteraction)
    window.addEventListener('touchstart', handleInteraction)
    window.addEventListener('scroll', handleInteraction)
    window.addEventListener('keydown', handleInteraction)

    return cleanup
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio || error) return
    if (audio.paused || muted) {
      audio.muted = false
      audio.play()
        .then(() => setMuted(false))
        .catch(() => setError(true))
    } else {
      audio.muted = true
      audio.pause()
      setMuted(true)
    }
  }, [muted, error])

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" onError={() => setError(true)} aria-label="Background music" />
      <div style={{ position: 'fixed', top: '14px', right: '14px', zIndex: 100 }}>
        {/* Pulsing ring visual indicator when playing */}
        <AnimatePresence>
          {!muted && !error && (
            <>
              <motion.div
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  borderRadius: '50%', border: '2px solid rgba(180,140,60,0.5)',
                  pointerEvents: 'none', zIndex: -1
                }}
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
              />
              <motion.div
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  borderRadius: '50%', border: '1px solid rgba(180,140,60,0.3)',
                  pointerEvents: 'none', zIndex: -1
                }}
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.8, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.8, delay: 0.6, ease: 'easeOut' }}
              />
            </>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggle}
          aria-label={muted ? 'Play background music' : 'Mute background music'}
          style={{
            width: '40px', height: '40px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(180,140,60,0.25)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: '16px',
            position: 'relative'
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
      </div>
    </>
  )
}

