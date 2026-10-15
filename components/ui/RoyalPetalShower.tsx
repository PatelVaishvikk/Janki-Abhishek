'use client'

import { useState, useEffect } from 'react'

interface FlowerParticle {
  id: number
  flower: string
  x: number         // 4% to 94% horizontal position
  size: number      // 22px to 28px
  duration: number  // 7.5s to 11.5s slow continuous float
  delay: number     // staggered release
  drift: number     // horizontal sway in px (-70 to +70)
  rotDir: number    // rotation direction
  opacity: number
}

interface RoyalPetalShowerProps {
  active: boolean
}

export function RoyalPetalShower({ active }: RoyalPetalShowerProps) {
  const [items, setItems] = useState<FlowerParticle[]>([])

  useEffect(() => {
    if (!active) {
      setItems([])
      return
    }

    // Exact, universally recognized flowers only:
    // 🌹 Classic Red Rose, 🌸 Pink Blossom, 🌺 Hibiscus, 🪷 Sacred Lotus
    const flowerPool = ['🌹', '🌸', '🌹', '🌺', '🌹', '🪷', '🌸', '🌹']
    const count = 18 // Clean, elegant, well-spaced across the entire screen

    const generated: FlowerParticle[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      flower: flowerPool[i % flowerPool.length],
      x: (i * (88 / count)) + 6 + (Math.random() * 4 - 2), // evenly spaced across screen width
      size: Math.random() * 3 + 14, // small, dainty 14px to 17px flower size
      duration: Math.random() * 3.5 + 7.5, // 7.5s to 11.0s slow, peaceful drift
      delay: (i * 0.42) % 6.8, // smoothly staggered continuous loop
      drift: (Math.random() - 0.5) * 80,
      rotDir: Math.random() > 0.5 ? 1 : -1,
      opacity: Math.random() * 0.15 + 0.85,
    }))

    setItems(generated)
  }, [active])

  if (!active || items.length === 0) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 90,
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes exactFlowerPour {
          0% {
            transform: translate3d(0, -60px, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translate3d(var(--drift), 55vh, 0) rotate(calc(var(--rot-dir) * 120deg));
          }
          90% {
            opacity: 0.95;
          }
          100% {
            transform: translate3d(calc(var(--drift) * 1.3), 118vh, 0) rotate(calc(var(--rot-dir) * 260deg));
            opacity: 0;
          }
        }
      `}</style>

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            position: 'absolute',
            left: `${item.x}%`,
            top: 0,
            width: `${item.size}px`,
            height: `${item.size}px`,
            opacity: item.opacity,
            animation: `exactFlowerPour ${item.duration}s linear ${item.delay}s infinite`,
            // @ts-ignore
            '--drift': `${item.drift}px`,
            '--rot-dir': item.rotDir,
            filter: 'drop-shadow(0 2px 3px rgba(36, 33, 29, 0.12))',
            willChange: 'transform, opacity',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: `${item.size}px`,
              lineHeight: 1,
              userSelect: 'none',
              display: 'inline-block',
            }}
          >
            {item.flower}
          </span>
        </div>
      ))}
    </div>
  )
}
