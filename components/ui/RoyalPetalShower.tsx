'use client'

import React, { useMemo } from 'react'

// ─── AUTHENTIC BOTANICAL ROSE PETALS (NO EMOJIS, NO PLAIN BALLS) ───
// 4 exquisite organic petal shapes with rich velvety crimson, ruby & blush shading

function ClassicRosePetal({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 40 46" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id={`roseGrad1-${id}`} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#FF5A78" />
          <stop offset="35%" stopColor="#D9204A" />
          <stop offset="75%" stopColor="#9C1032" />
          <stop offset="100%" stopColor="#6A0820" />
        </linearGradient>
        <linearGradient id={`roseCurl1-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFA8BA" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#D9204A" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Curved organic petal silhouette */}
      <path
        d="M 20 2 C 30 2, 38 10, 37 22 C 36 32, 26 40, 20 44 C 14 40, 4 32, 3 22 C 2 10, 10 2, 20 2 Z"
        fill={`url(#roseGrad1-${id})`}
      />
      {/* Velvety inner curl highlight */}
      <path
        d="M 20 4 C 28 4, 34 11, 33 21 C 30 14, 25 8, 20 8 C 15 8, 10 14, 7 21 C 6 11, 12 4, 20 4 Z"
        fill={`url(#roseCurl1-${id})`}
      />
      {/* Soft center petal vein */}
      <path d="M 20 12 Q 20 28 20 40" stroke="#FF8FA4" strokeWidth="0.8" strokeOpacity="0.35" strokeLinecap="round" />
    </svg>
  )
}

function SideCurledPetal({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 38 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id={`roseGrad2-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B8B" />
          <stop offset="40%" stopColor="#E12752" />
          <stop offset="80%" stopColor="#A81235" />
          <stop offset="100%" stopColor="#6F0922" />
        </linearGradient>
      </defs>
      <path
        d="M 18 3 C 27 3, 35 12, 33 24 C 31 34, 23 42, 17 46 C 12 42, 5 33, 4 23 C 3 13, 9 3, 18 3 Z"
        fill={`url(#roseGrad2-${id})`}
      />
      {/* Flapped petal edge */}
      <path
        d="M 33 24 C 35 16, 29 9, 23 7 C 27 12, 30 18, 29 26 C 28 32, 24 37, 20 41 C 24 38, 30 32, 33 24 Z"
        fill="#FFA1B5"
        opacity="0.55"
      />
    </svg>
  )
}

function BlushPetal({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id={`roseGrad3-${id}`} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#FFE8EE" />
          <stop offset="35%" stopColor="#FCA6BE" />
          <stop offset="70%" stopColor="#DE4D72" />
          <stop offset="100%" stopColor="#A82042" />
        </linearGradient>
      </defs>
      <path
        d="M 20 3 C 29 3, 37 11, 36 21 C 35 30, 26 38, 20 42 C 14 38, 5 30, 4 21 C 3 11, 11 3, 20 3 Z"
        fill={`url(#roseGrad3-${id})`}
      />
      <path
        d="M 20 6 C 26 6, 31 12, 30 20 C 27 15, 23 10, 20 10 C 17 10, 13 15, 10 20 C 9 12, 14 6, 20 6 Z"
        fill="#FFFFFF"
        opacity="0.45"
      />
    </svg>
  )
}

function MiniRoseBlossom({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id={`flowerGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF5C7A" />
          <stop offset="50%" stopColor="#C9183F" />
          <stop offset="100%" stopColor="#730A24" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="18" fill={`url(#flowerGrad-${id})`} />
      <path d="M 20 4 C 27 4, 32 9, 32 16 C 26 12, 18 13, 14 18 C 14 10, 16 4, 20 4 Z" fill="#FF8CA3" opacity="0.65" />
      <path d="M 36 20 C 36 27, 31 32, 24 32 C 28 26, 27 18, 22 14 C 30 14, 36 16, 36 20 Z" fill="#E8305A" opacity="0.75" />
      <path d="M 20 36 C 13 36, 8 31, 8 24 C 14 28, 22 27, 26 22 C 26 30, 24 36, 20 36 Z" fill="#A81235" opacity="0.85" />
      <path d="M 4 20 C 4 13, 9 8, 16 8 C 12 14, 13 22, 18 26 C 10 26, 4 24, 4 20 Z" fill="#FF708F" opacity="0.65" />
      <path d="M 17 18 C 18 15, 23 15, 24 18 C 25 21, 21 24, 18 23 C 16 22, 16 19, 18 18" stroke="#FFE3EB" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

interface PetalConfig {
  id: number
  type: number
  x: number         // 4% to 94% horizontal spacing
  width: number     // dainty 13px to 17px
  height: number
  duration: number  // slow, peaceful 8s to 12s float
  delay: number     // continuous staggered loop
  sway: number      // -50px to +50px
  flipDir: number   // 1 or -1
}

export function RoyalPetalShower({ active = true }: { active?: boolean }) {
  // Pre-calculate fixed, deterministic petals so no re-renders or layout shifts
  const petals: PetalConfig[] = useMemo(() => {
    const count = 18 // Dainty, gentle density - elegant without clutter
    return Array.from({ length: count }).map((_, i) => {
      const type = i % 4
      const baseWidth = type === 3 ? 15 : 14 + (i % 4) // 14px to 17px small size
      const height = type === 3 ? baseWidth : Math.round(baseWidth * 1.15)
      return {
        id: i,
        type,
        x: (i * (88 / count)) + 5 + ((i * 7) % 5),
        width: baseWidth,
        height,
        duration: 8.5 + (i % 5) * 0.9, // 8.5s to 12.1s slow gentle float
        delay: ((i * 0.55) % 8.0) * -1, // Negative delay so petals are already softly pouring on page load!
        sway: ((i % 2 === 0 ? 1 : -1) * (30 + ((i * 13) % 25))),
        flipDir: i % 2 === 0 ? 1 : -1,
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
        perspective: '900px',
      }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes botanicalPetalFall {
          0% {
            transform: translate3d(0, -50px, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
            opacity: 0;
          }
          8% {
            opacity: 0.95;
          }
          50% {
            transform: translate3d(var(--sway), 52vh, 40px) rotateX(calc(var(--flip) * 220deg)) rotateY(180deg) rotateZ(calc(var(--flip) * 60deg));
          }
          85% {
            opacity: 0.92;
          }
          100% {
            transform: translate3d(calc(var(--sway) * 1.3), calc(100vh + 50px), -20px) rotateX(calc(var(--flip) * 440deg)) rotateY(360deg) rotateZ(calc(var(--flip) * 140deg));
            opacity: 0;
          }
        }
      `}</style>

      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: 0,
            width: `${p.width}px`,
            height: `${p.height}px`,
            animation: `botanicalPetalFall ${p.duration}s linear ${p.delay}s infinite`,
            // @ts-ignore
            '--sway': `${p.sway}px`,
            '--flip': p.flipDir,
            filter: 'drop-shadow(0 2px 4px rgba(36, 33, 29, 0.15))',
            willChange: 'transform, opacity',
            transformStyle: 'preserve-3d',
          }}
        >
          {p.type === 0 && <ClassicRosePetal id={`p${p.id}`} />}
          {p.type === 1 && <SideCurledPetal id={`p${p.id}`} />}
          {p.type === 2 && <BlushPetal id={`p${p.id}`} />}
          {p.type === 3 && <MiniRoseBlossom id={`p${p.id}`} />}
        </div>
      ))}
    </div>
  )
}
