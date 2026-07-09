import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? `input-${label.toLowerCase().replace(/\s+/g, '-')}`

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-neutral-700"
        >
          {label}
          {props.required && (
            <span className="ml-1 text-rose-500" aria-hidden="true">*</span>
          )}
        </label>

        <input
          ref={ref}
          id={inputId}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          aria-invalid={error ? 'true' : 'false'}
          className={cn(
            'w-full px-4 py-3 rounded-xl bg-white border text-neutral-800 text-sm',
            'placeholder:text-neutral-400',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            error
              ? 'border-red-400 focus:ring-red-300 focus:border-red-400'
              : 'border-neutral-200 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300',
            className
          )}
          {...props}
        />

        {error && (
          <p id={`${inputId}-error`} role="alert" className="text-xs text-red-600 flex items-center gap-1">
            <span aria-hidden="true">⚠</span> {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-neutral-400">{hint}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'


interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-neutral-700">
          {label}
        </label>

        <textarea
          ref={ref}
          id={inputId}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          aria-invalid={error ? 'true' : 'false'}
          rows={3}
          className={cn(
            'w-full px-4 py-3 rounded-xl bg-white border text-neutral-800 text-sm resize-none',
            'placeholder:text-neutral-400',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            error
              ? 'border-red-400 focus:ring-red-300'
              : 'border-neutral-200 focus:ring-primary-300 focus:border-primary-400 hover:border-neutral-300',
            className
          )}
          {...props}
        />

        {error && (
          <p id={`${inputId}-error`} role="alert" className="text-xs text-red-600 flex items-center gap-1">
            <span aria-hidden="true">⚠</span> {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-neutral-400">{hint}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
