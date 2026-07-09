'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CountdownUnitProps {
  value: number
  label: string
}

export function CountdownUnit({ value, label }: CountdownUnitProps) {
  const prevValue = useRef(value)
  const [flipping, setFlipping] = useState(false)

  useEffect(() => {
    if (prevValue.current !== value) {
      setFlipping(true)
      const t = setTimeout(() => setFlipping(false), 400)
      prevValue.current = value
      return () => clearTimeout(t)
    }
  }, [value])

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
        {/* Background tile */}
        <div className="absolute inset-0 rounded-2xl bg-white/70 backdrop-blur-sm border border-primary-200 shadow-sm" />
        {/* Number */}
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 font-display text-2xl sm:text-3xl font-semibold text-primary-700 tabular-nums"
            aria-live="polite"
            aria-atomic="true"
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
        {/* Top/bottom divider line (card flip aesthetic) */}
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-primary-200/60 z-20" />
      </div>
      <span className="text-subheading text-neutral-500 tracking-widest" aria-hidden="true">
        {label}
      </span>
    </div>
  )
}
