import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-body font-medium rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.97] select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'

    const variants = {
      primary:
        'bg-primary-500 text-white hover:bg-primary-600 focus-visible:ring-primary-500 shadow-md hover:shadow-lg hover:-translate-y-[1px]',
      secondary:
        'bg-accent-500 text-white hover:bg-accent-600 focus-visible:ring-accent-500 shadow-md hover:shadow-lg hover:-translate-y-[1px]',
      ghost:
        'bg-transparent text-primary-700 hover:bg-primary-50 focus-visible:ring-primary-400',
      outline:
        'bg-transparent border border-primary-300 text-primary-700 hover:bg-primary-50 hover:border-primary-400 focus-visible:ring-primary-400',
    }

    const sizes = {
      sm: 'text-xs px-4 py-2',
      md: 'text-sm px-6 py-3',
      lg: 'text-base px-8 py-4',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
