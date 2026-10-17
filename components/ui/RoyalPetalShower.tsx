'use client'

import React, { useMemo } from 'react'

// ─── GPU-ACCELERATED BOTANICAL ROSE PETALS (OPTIMIZED FOR 60FPS/120FPS MOBILE) ───

export function RoyalPetalShower({ active = true }: { active?: boolean }) {
  // Pre-calculate deterministic petals for zero runtime overhead & zero re-renders
  const petals = useMemo(() => {
    const count = 14 // Optimal density for buttery-smooth mobile 60/120fps
    return Array.from({ length: count }).map((_, i) => {
      const type = i % 4
      const size = type === 3 ? 15 : 14 + (i % 3) // Dainty 14px - 17px
      return {
        id: i,
        type,
        size,
        left: (i * (90 / count)) + 5 + ((i * 7) % 5), // Spread evenly across width
        duration: 9.0 + (i % 4) * 1.1,               // 9.0s to 12.3s smooth float
        delay: ((i * 0.72) % 7.5) * -1,               // Negative delay so petals already float on mount
        drift: (i % 2 === 0 ? 1 : -1) * (25 + ((i * 9) % 20)), // Horizontal breeze drift in px
        rotEnd: (i % 2 === 0 ? 1 : -1) * (260 + (i * 25)),     // Gentle spin
      }
    })
  }, [])

  if (!active) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 85,
        overflow: 'hidden',
        contain: 'layout paint size',
      }}
      aria-hidden="true"
    >
      {/* ─── SHARED GPU GRADIENT PALETTE (Rendered once, cached by GPU) ─── */}
      <svg width="0" height="0" style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <defs>
          {/* Velvety Deep Crimson Rose */}
          <linearGradient id="gpuRoseRed" x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#FF5A78" />
            <stop offset="35%" stopColor="#D9204A" />
            <stop offset="75%" stopColor="#9C1032" />
            <stop offset="100%" stopColor="#6A0820" />
          </linearGradient>

          {/* Rose Petal Curl Velvet Highlight */}
          <linearGradient id="gpuRoseCurl" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFA8BA" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#D9204A" stopOpacity="0" />
          </linearGradient>

          {/* Side-Curled Rich Ruby Petal */}
          <linearGradient id="gpuRoseRuby" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B8B" />
            <stop offset="40%" stopColor="#E12752" />
            <stop offset="80%" stopColor="#A81235" />
            <stop offset="100%" stopColor="#6F0922" />
          </linearGradient>

          {/* Delicate Soft Blush Rose */}
          <linearGradient id="gpuRoseBlush" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#FFE8EE" />
            <stop offset="35%" stopColor="#FCA6BE" />
            <stop offset="70%" stopColor="#DE4D72" />
            <stop offset="100%" stopColor="#A82042" />
          </linearGradient>

          {/* Miniature Rose Blossom */}
          <linearGradient id="gpuRoseBlossom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF5C7A" />
            <stop offset="50%" stopColor="#C9183F" />
            <stop offset="100%" stopColor="#730A24" />
          </linearGradient>
        </defs>
      </svg>

      <style>{`
        /* 
         * Pure 2D GPU-accelerated motion:
         * Uses translate3d + rotate + scaleX (for flip illusion).
         * ZERO filter:drop-shadow or 3D perspective overhead for rock-solid 60/120fps on mobile!
         */
        @keyframes mobileSmoothPetalFall {
          0% {
            transform: translate3d(0, -45px, 0) rotate(0deg) scaleX(1);
            opacity: 0;
          }
          10% {
            opacity: 0.95;
          }
          35% {
            transform: translate3d(calc(var(--drift) * 0.4), 38vh, 0) rotate(calc(var(--rot) * 0.35)) scaleX(0.4);
          }
          65% {
            transform: translate3d(calc(var(--drift) * 0.8), 70vh, 0) rotate(calc(var(--rot) * 0.7)) scaleX(-0.85);
            opacity: 0.92;
          }
          90% {
            opacity: 0.85;
          }
          100% {
            transform: translate3d(var(--drift), calc(100vh + 45px), 0) rotate(var(--rot)) scaleX(1);
            opacity: 0;
          }
        }
      `}</style>

      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: 0,
            width: `${p.size}px`,
            height: `${Math.round(p.size * 1.15)}px`,
            animation: `mobileSmoothPetalFall ${p.duration}s linear ${p.delay}s infinite`,
            // @ts-ignore
            '--drift': `${p.drift}px`,
            '--rot': `${p.rotEnd}deg`,
            willChange: 'transform, opacity',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Type 0: Classic Velvety Crimson Rose Petal */}
          {p.type === 0 && (
            <svg viewBox="0 0 40 46" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
              <path
                d="M 20 2 C 30 2, 38 10, 37 22 C 36 32, 26 40, 20 44 C 14 40, 4 32, 3 22 C 2 10, 10 2, 20 2 Z"
                fill="url(#gpuRoseRed)"
              />
              <path
                d="M 20 4 C 28 4, 34 11, 33 21 C 30 14, 25 8, 20 8 C 15 8, 10 14, 7 21 C 6 11, 12 4, 20 4 Z"
                fill="url(#gpuRoseCurl)"
              />
              <path d="M 20 12 Q 20 28 20 40" stroke="#FF8FA4" strokeWidth="0.8" strokeOpacity="0.35" strokeLinecap="round" />
            </svg>
          )}

          {/* Type 1: Side-Curled Ruby Petal */}
          {p.type === 1 && (
            <svg viewBox="0 0 38 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
              <path
                d="M 18 3 C 27 3, 35 12, 33 24 C 31 34, 23 42, 17 46 C 12 42, 5 33, 4 23 C 3 13, 9 3, 18 3 Z"
                fill="url(#gpuRoseRuby)"
              />
              <path
                d="M 33 24 C 35 16, 29 9, 23 7 C 27 12, 30 18, 29 26 C 28 32, 24 37, 20 41 C 24 38, 30 32, 33 24 Z"
                fill="#FFA1B5"
                opacity="0.55"
              />
            </svg>
          )}

          {/* Type 2: Soft Blush Pink Petal */}
          {p.type === 2 && (
            <svg viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
              <path
                d="M 20 3 C 29 3, 37 11, 36 21 C 35 30, 26 38, 20 42 C 14 38, 5 30, 4 21 C 3 11, 11 3, 20 3 Z"
                fill="url(#gpuRoseBlush)"
              />
              <path
                d="M 20 6 C 26 6, 31 12, 30 20 C 27 15, 23 10, 20 10 C 17 10, 13 15, 10 20 C 9 12, 14 6, 20 6 Z"
                fill="#FFFFFF"
                opacity="0.45"
              />
            </svg>
          )}

          {/* Type 3: Mini Rose Blossom */}
          {p.type === 3 && (
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
              <circle cx="20" cy="20" r="18" fill="url(#gpuRoseBlossom)" />
              <path d="M 20 4 C 27 4, 32 9, 32 16 C 26 12, 18 13, 14 18 C 14 10, 16 4, 20 4 Z" fill="#FF8CA3" opacity="0.65" />
              <path d="M 36 20 C 36 27, 31 32, 24 32 C 28 26, 27 18, 22 14 C 30 14, 36 16, 36 20 Z" fill="#E8305A" opacity="0.75" />
              <path d="M 20 36 C 13 36, 8 31, 8 24 C 14 28, 22 27, 26 22 C 26 30, 24 36, 20 36 Z" fill="#A81235" opacity="0.85" />
              <path d="M 4 20 C 4 13, 9 8, 16 8 C 12 14, 13 22, 18 26 C 10 26, 4 24, 4 20 Z" fill="#FF708F" opacity="0.65" />
              <path d="M 17 18 C 18 15, 23 15, 24 18 C 25 21, 21 24, 18 23 C 16 22, 16 19, 18 18" stroke="#FFE3EB" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}
