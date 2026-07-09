'use client'

import { motion } from 'framer-motion'

interface RSVPPillProps {
  value: 'yes' | 'no'
  onChange: (val: 'yes' | 'no') => void
  disabled?: boolean
}

export function RSVPPill({ value, onChange, disabled }: RSVPPillProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Will you attend?"
      className="flex rounded-full bg-neutral-100 p-1 gap-1 w-full max-w-[260px] mx-auto relative"
    >
      {/* Sliding indicator */}
      <motion.div
        className="absolute top-1 bottom-1 rounded-full"
        style={{
          background: value === 'yes'
            ? 'linear-gradient(135deg, hsl(140, 55%, 42%), hsl(140, 60%, 36%))'
            : 'linear-gradient(135deg, hsl(355, 65%, 52%), hsl(355, 70%, 44%))',
          width: 'calc(50% - 4px)',
          left: value === 'yes' ? '4px' : 'calc(50%)',
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      />

      {(['yes', 'no'] as const).map((opt) => (
        <button
          key={opt}
          type="button"
          role="radio"
          aria-checked={value === opt}
          disabled={disabled}
          onClick={() => onChange(opt)}
          className={`
            relative z-10 flex-1 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1.5
            ${value === opt ? 'text-white' : 'text-neutral-500 hover:text-neutral-700'}
            disabled:opacity-50 disabled:cursor-not-allowed
            focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1
          `}
        >
          <span aria-hidden="true">{opt === 'yes' ? '✓' : '✕'}</span>
          {opt === 'yes' ? 'Attending' : 'Can\'t make it'}
        </button>
      ))}
    </div>
  )
}
