'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Item {
  id: number
  x: number
  size: number
  delay: number
  duration: number
  drift: number
  rotateStart: number
  rotateEnd: number
  char: string
}

export function FallingElements() {
  const [elements, setElements] = useState<Item[]>([])

  useEffect(() => {
    const symbols = ['🌸', '✨', '🌸', '✨', '🌸']
    const items: Item[] = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // horizontal start percent
      size: Math.random() * 12 + 12, // size between 12px and 24px
      delay: Math.random() * -25, // negative delay so elements start scattered on page load
      duration: Math.random() * 12 + 15, // slow drift, between 15s and 27s
      drift: Math.random() * 140 - 70, // horizontal sway
      rotateStart: Math.random() * 360,
      rotateEnd: Math.random() * 360 + 360,
      char: symbols[Math.floor(Math.random() * symbols.length)]
    }))
    setElements(items)
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 10 }}>
      {elements.map((el) => (
        <motion.span
          key={el.id}
          style={{
            position: 'absolute',
            left: `${el.x}%`,
            top: -40,
            fontSize: `${el.size}px`,
            opacity: el.char === '✨' ? 0.45 : 0.35,
            userSelect: 'none',
            display: 'inline-block',
          }}
          initial={{ y: -50, x: 0, rotate: el.rotateStart }}
          animate={{
            y: '110vh',
            x: el.drift,
            rotate: el.rotateEnd
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          {el.char}
        </motion.span>
      ))}
    </div>
  )
}
