'use client'

import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Section } from '@/components/primitives/Section'
import { Input, Textarea } from '@/components/primitives/Input'
import { Button } from '@/components/primitives/Button'
import { RSVPPill } from '@/components/ui/RSVPPill'

const schema = z.object({
  name:       z.string().min(1, 'Please enter your name').max(100),
  attending:  z.enum(['yes', 'no']),
  guestCount: z.preprocess(
    (val) => (val === '' || val === null || val === undefined ? undefined : val),
    z.coerce.number().min(1).max(10).optional()
  ),
  message:    z.string().max(500).optional(),
}).refine(
  (data) => {
    if (data.attending === 'yes') {
      return data.guestCount !== undefined && data.guestCount >= 1;
    }
    return true;
  },
  {
    message: 'Number of guests is required',
    path: ['guestCount'],
  }
)

type FormData = z.infer<typeof schema>

type SubmitState = 'idle' | 'loading' | 'success' | 'error'

export function RSVP() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [submittedName, setSubmittedName] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { attending: 'yes', guestCount: 1 },
  })

  const attending = watch('attending')

  const onSubmit = async (data: FormData) => {
    setSubmitState('loading')
    setSubmittedName(data.name.split(' ')[0])
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
      if (res.status === 201) {
        setSubmitState('success')
      } else {
        setSubmitState('error')
      }
    } catch {
      setSubmitState('error')
    }
  }

  return (
    <Section id="rsvp" aria-label="RSVP">
      <div ref={ref} className="text-center">
        <motion.p
          className="text-subheading text-accent-400 mb-3"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        >
          Will you be joining us?
        </motion.p>
        <motion.h2
          className="text-heading text-neutral-800 mb-8"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Send your RSVP
        </motion.h2>

        <AnimatePresence mode="wait">
          {submitState === 'success' ? (
            <motion.div
              key="success"
              className="glass-card p-8 text-center ornate-border"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              role="status"
            >
              <div className="text-5xl mb-4" aria-hidden="true">🌸</div>
              <h3 className="font-display text-2xl text-primary-600 mb-2">
                Thank you, {submittedName}!
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                {attending === 'yes'
                  ? "We're so excited to celebrate with you. See you on the 16th!"
                  : "We'll miss you! Your love and blessings mean everything to us."}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit(onSubmit)}
              className="glass-card p-6 text-left flex flex-col gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              noValidate
              aria-label="RSVP form"
            >
              {/* Name */}
              <Input
                label="Your name"
                placeholder="e.g. Priya Sharma"
                required
                error={errors.name?.message}
                {...register('name')}
              />

              {/* Attending pill */}
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-neutral-700" id="attending-label">
                  Will you attend? <span className="text-rose-500" aria-hidden="true">*</span>
                </p>
                <RSVPPill
                  value={attending}
                  onChange={(val) => setValue('attending', val)}
                />
              </div>

              {/* Guest count — only if attending */}
              <AnimatePresence>
                {attending === 'yes' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <Input
                      label="Number of guests"
                      type="number"
                      min={1}
                      max={10}
                      hint="Including yourself"
                      error={errors.guestCount?.message}
                      {...register('guestCount')}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Optional message */}
              <Textarea
                label="A message or blessing (optional)"
                placeholder="Share a warm wish for the family…"
                hint="Max 500 characters"
                error={errors.message?.message}
                {...register('message')}
              />

              {/* Error state */}
              {submitState === 'error' && (
                <motion.div
                  role="alert"
                  className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                >
                  ⚠ Something went wrong. Please try again in a moment.
                </motion.div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={submitState === 'loading'}
                className="w-full mt-1"
              >
                Send with Love 💌
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </Section>
  )
}
