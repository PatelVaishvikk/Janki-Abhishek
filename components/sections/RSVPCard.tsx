'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const rsvpSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  attending: z.enum(['yes', 'no']),
  guestCount: z.coerce.number().min(1).max(10).optional(),
  message: z.string().max(500).optional(),
})

type RSVPFormData = z.infer<typeof rsvpSchema>

export function RSVPCard() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [submittedData, setSubmittedData] = useState<{ name: string; attending: boolean } | null>(null)

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { attending: 'yes', guestCount: 1, message: '' },
  })

  const attending = watch('attending')

  const onSubmit = async (data: RSVPFormData) => {
    setStatus('loading')
    const firstName = data.name.trim().split(' ')[0]
    const payload = { ...data }
    if (payload.attending === 'no') {
      delete payload.guestCount
    }
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.status === 201 || res.ok) {
        setSubmittedData({ name: firstName, attending: payload.attending === 'yes' })
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="rsvp" className="wedding-card" style={{ padding: '36px 24px', borderRadius: '4px' }}>
      {status === 'success' && submittedData ? (
        <div style={{ textAlign: 'center', padding: '24px 12px' }}>
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--gold-dark)',
              fontWeight: 600,
              marginBottom: '6px',
            }}
          >
            Response Recorded
          </p>
          <h3
            className="font-display gold-heading"
            style={{ fontSize: 'clamp(1.8rem, 7vw, 2.4rem)', fontWeight: 500, marginBottom: '12px' }}
          >
            Thank You, {submittedData.name}
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--ink-secondary)', lineHeight: 1.7, maxWidth: '360px', margin: '0 auto 16px' }}>
            {submittedData.attending ? (
              <>
                We look forward with great happiness to celebrating this special milestone with you on <strong>Sunday, November 22, 2026</strong> at Haridham Toronto.
              </>
            ) : (
              <>
                We will miss you, but deeply appreciate your warm love and blessings for the parents-to-be from afar.
              </>
            )}
          </p>
          <div className="divider-gold" style={{ margin: '16px auto', maxWidth: '160px' }} />
          <p style={{ fontSize: '13px', color: 'var(--gold-dark)', fontWeight: 600, letterSpacing: '0.06em' }}>
            🙏 Jay Swaminarayan 🙏
          </p>
          <p style={{ fontSize: '12px', color: 'var(--ink-secondary)', fontWeight: 500, marginTop: '2px' }}>
            Das na das banavshoji
          </p>
        </div>
      ) : (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <p
              style={{
                fontSize: '10px',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'var(--gold-dark)',
                fontWeight: 600,
                marginBottom: '4px',
              }}
            >
              RSVP
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(1.7rem, 6vw, 2.2rem)',
                fontWeight: 500,
                color: 'var(--ink-primary)',
                marginBottom: '4px',
              }}
            >
              Confirm Your Attendance
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--maroon)', fontWeight: 600, letterSpacing: '0.04em' }}>
              Please RSVP by October 31, 2026
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Full Name */}
            <div>
              <label htmlFor="rsvp-name" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--ink-secondary)', display: 'block', marginBottom: '6px' }}>
                Full Name *
              </label>
              <input
                id="rsvp-name"
                className="input-elegant"
                placeholder="Enter your name"
                {...register('name')}
              />
              {errors.name && <p style={{ fontSize: '11px', color: 'var(--maroon)', marginTop: '4px' }}>{errors.name.message}</p>}
            </div>

            {/* Attendance Toggle */}
            <div>
              <label style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--ink-secondary)', display: 'block', marginBottom: '8px' }}>
                Will You Be Attending? *
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setValue('attending', 'yes')}
                  style={{
                    flex: 1,
                    padding: '12px 10px',
                    borderRadius: '2px',
                    border: attending === 'yes' ? '1.5px solid var(--gold-dark)' : '1px solid var(--gold-border)',
                    background: attending === 'yes' ? 'var(--gold-subtle)' : '#FFFFFF',
                    color: attending === 'yes' ? 'var(--gold-dark)' : 'var(--ink-secondary)',
                    fontWeight: attending === 'yes' ? 600 : 500,
                    fontSize: '12px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  Joyfully Attending
                </button>
                <button
                  type="button"
                  onClick={() => setValue('attending', 'no')}
                  style={{
                    flex: 1,
                    padding: '12px 10px',
                    borderRadius: '2px',
                    border: attending === 'no' ? '1.5px solid var(--gold-dark)' : '1px solid var(--gold-border)',
                    background: attending === 'no' ? 'var(--gold-subtle)' : '#FFFFFF',
                    color: attending === 'no' ? 'var(--gold-dark)' : 'var(--ink-secondary)',
                    fontWeight: attending === 'no' ? 600 : 500,
                    fontSize: '12px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  Unable to Attend
                </button>
              </div>
            </div>

            {/* Guest Count */}
            {attending === 'yes' && (
              <div>
                <label htmlFor="rsvp-guests" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--ink-secondary)', display: 'block', marginBottom: '6px' }}>
                  Number of Guests Attending
                </label>
                <select
                  id="rsvp-guests"
                  className="input-elegant"
                  {...register('guestCount')}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Message */}
            <div>
              <label htmlFor="rsvp-msg" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--ink-secondary)', display: 'block', marginBottom: '6px' }}>
                Blessings or Warm Wishes for Baby &amp; Parents
              </label>
              <textarea
                id="rsvp-msg"
                rows={3}
                className="input-elegant"
                placeholder="Share your blessings and love..."
                style={{ resize: 'vertical' }}
                {...register('message')}
              />
            </div>

            {status === 'error' && (
              <p style={{ fontSize: '12px', color: 'var(--maroon)', textAlign: 'center' }}>
                An error occurred while submitting your response. Please try again.
              </p>
            )}

            <div style={{ marginTop: '6px' }}>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary"
                style={{ width: '100%', padding: '14px' }}
              >
                {status === 'loading' ? 'Submitting...' : 'Confirm RSVP'}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  )
}
