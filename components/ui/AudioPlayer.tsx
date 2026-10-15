'use client'

import { useEffect, useRef, useState } from 'react'

interface AudioPlayerProps { src: string }

export function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.loop = true
    audio.volume = 0.35

    // Attempt direct immediate play
    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true)
        })
        .catch(() => {
          // Modern browsers restrict unmuted autoplay without prior interaction.
          // Listen to ANY interaction (click, touch, scroll, pointer) to unlock audio immediately.
          const unlock = () => {
            if (!audio) return
            audio.play().then(() => {
              setIsPlaying(true)
              removeListeners()
            }).catch(() => {})
          }

          const removeListeners = () => {
            window.removeEventListener('click', unlock)
            window.removeEventListener('touchstart', unlock)
            window.removeEventListener('scroll', unlock)
            window.removeEventListener('pointerdown', unlock)
            window.removeEventListener('keydown', unlock)
          }

          window.addEventListener('click', unlock, { once: true })
          window.addEventListener('touchstart', unlock, { once: true })
          window.addEventListener('scroll', unlock, { once: true, passive: true })
          window.addEventListener('pointerdown', unlock, { once: true })
          window.addEventListener('keydown', unlock, { once: true })
          window.addEventListener('play-audio', unlock, { once: true })
        })
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio || error) return
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => setError(true))
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        preload="auto"
        autoPlay
        onError={() => setError(true)}
        aria-label="Celebration background music"
      />
      <div style={{ position: 'fixed', top: '16px', right: '16px', zIndex: 100 }}>
        <button
          onClick={toggle}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 14px',
            borderRadius: '2px',
            background: '#FFFFFF',
            border: '1px solid var(--gold-border)',
            boxShadow: '0 2px 8px rgba(36, 33, 29, 0.08)',
            cursor: 'pointer',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: 'var(--gold-dark)',
            transition: 'all 0.2s ease',
          }}
        >
          <span style={{ fontSize: '11px' }}>{isPlaying ? '◼' : '▶'}</span>
          <span>{isPlaying ? 'Playing' : 'Play Music'}</span>
        </button>
      </div>
    </>
  )
}
