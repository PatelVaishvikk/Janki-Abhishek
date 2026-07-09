import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  id?: string
  className?: string
  children: ReactNode
  'aria-label'?: string
}

export function Section({ id, className, children, 'aria-label': ariaLabel }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        'w-full px-5 py-16 sm:py-20 flex flex-col items-center',
        className
      )}
    >
      <div className="w-full max-w-invite">
        {children}
      </div>
    </section>
  )
}
