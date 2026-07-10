import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const schema = z.object({
  name:       z.string().min(1,'Name required').max(100),
  attending:  z.enum(['yes','no']),
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

function ConfettiParticles() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; size: number; delay: number; duration: number }[]>([])
  useEffect(() => {
    const colors = ['#f472b6', '#fbbf24', '#a78bfa', '#34d399', '#60a5fa']
    const items = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10, // 10% to 90%
      y: Math.random() * -40 - 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 6,
      delay: Math.random() * 0.4,
      duration: Math.random() * 1.5 + 1.2
    }))
    setParticles(items)
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', borderRadius: '24px' }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            backgroundColor: p.color,
          }}
          initial={{ y: p.y, opacity: 1, rotate: 0 }}
          animate={{
            y: 400,
            opacity: [1, 1, 0],
            rotate: 360 + Math.random() * 360
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeOut'
          }}
        />
      ))}
    </div>
  )
}

export function RSVPCard() {
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' as any })
  const [status, setStatus] = useState<'idle'|'loading'|'error'|'success'>('idle')
  const [submittedData, setSubmittedData] = useState<{ name: string; attending: boolean } | null>(null)
  
  const { register, handleSubmit, watch, setValue, formState:{errors} } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { attending:'yes', guestCount:1 },
  })
  const attending = watch('attending')

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    const firstName = data.name.split(' ')[0]
    const payload = { ...data }
    if (payload.attending === 'no') {
      delete payload.guestCount
    }
    try {
      const res = await fetch('/api/rsvp',{ 
        method:'POST', 
        headers:{'Content-Type':'application/json'}, 
        body:JSON.stringify(payload) 
      })
      if (res.status === 201) {
        setSubmittedData({ name: firstName, attending: payload.attending === 'yes' })
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch { setStatus('error') }
  }

  return (
    <div ref={ref} id="rsvp" className="card gold-border mb-4" style={{ padding:'24px 20px', background:'rgba(255,255,255,0.78)', position: 'relative' }}>
      <AnimatePresence mode="wait">
        {status === 'success' && submittedData ? (
          <motion.div
            key="thank-you"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: 'center', padding: '24px 10px' }}
          >
            <ConfettiParticles />
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌸</div>
            <h3 className="font-display gold-text" style={{ fontSize: 'clamp(1.6rem, 7vw, 2.2rem)', fontWeight: 600, marginBottom: '8px' }}>
              Thank You, {submittedData.name}!
            </h3>
            <p className="font-display italic" style={{ fontSize: '16px', color: 'hsl(38,15%,36%)', marginBottom: '16px' }}>
              Your RSVP has been received.
            </p>
            <div style={{ margin: '0 auto 18px', width: '60px', height: '1px', background: 'hsl(42,50%,80%)' }} />
            <p style={{ fontSize: '14px', color: 'hsl(38,12%,42%)', lineHeight: 1.65 }}>
              {submittedData.attending ? (
                <>
                  We are absolutely thrilled to celebrate this special day with you. We can&apos;t wait to see you on <strong>Sunday, 16th August 2026</strong>!
                </>
              ) : (
                <>
                  We are sorry you won&apos;t be able to make it, but we deeply appreciate your warm wishes and blessings from afar.
                </>
              )}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div style={{ textAlign:'center', marginBottom:'20px' }}>
              <p style={{ fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'hsl(42,55%,48%)', fontWeight:500, marginBottom:'4px' }}>Will you join us?</p>
              <h2 className="font-display" style={{ fontSize:'clamp(1.5rem,6.5vw,2.2rem)', fontWeight:500, color:'hsl(38,18%,22%)' }}>Send your RSVP</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
              {/* Name */}
              <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
                <label htmlFor="rsvp-name" style={{ fontSize:'11px', fontWeight:500, color:'hsl(38,15%,34%)', letterSpacing:'0.06em' }}>
                  Your name <span style={{ color:'hsl(355,65%,54%)' }} aria-hidden="true">*</span>
                </label>
                <input id="rsvp-name" className={`field-input${errors.name?' error':''}`} placeholder="Enter your name" {...register('name')} />
                {errors.name&&<p role="alert" style={{ fontSize:'11px', color:'hsl(355,65%,50%)' }}>⚠ {errors.name.message}</p>}
              </div>

              {/* Attend pill */}
              <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
                <p style={{ fontSize:'11px', fontWeight:500, color:'hsl(38,15%,34%)', letterSpacing:'0.06em' }} id="attend-lbl">
                  Will you attend? <span style={{ color:'hsl(355,65%,54%)' }} aria-hidden="true">*</span>
                </p>
                <div role="radiogroup" aria-labelledby="attend-lbl" style={{ display:'flex', background:'hsl(40,20%,92%)', borderRadius:'999px', padding:'4px', gap:'4px', position:'relative' }}>
                  <motion.div style={{ position:'absolute', top:'4px', bottom:'4px', borderRadius:'999px', width:'calc(50% - 4px)',
                    left: attending==='yes'?'4px':'calc(50%)',
                    background: attending==='yes'?'linear-gradient(135deg,hsl(140,55%,36%),hsl(140,50%,46%))':'linear-gradient(135deg,hsl(355,60%,48%),hsl(355,55%,57%))'
                  }} transition={{ type:'spring', stiffness:420, damping:36 }} />
                  {(['yes','no'] as const).map(opt=>(
                    <button key={opt} type="button" role="radio" aria-checked={attending===opt} onClick={()=>setValue('attending',opt)}
                      style={{ flex:1, zIndex:1, padding:'10px 6px', borderRadius:'999px', fontSize:'13px', fontWeight:500, border:'none', background:'transparent', cursor:'pointer',
                        color: attending===opt?'#fff':'hsl(38,12%,46%)', transition:'color 0.2s', display:'flex', alignItems:'center', justifyContent:'center', gap:'5px' }}>
                      <span aria-hidden="true">{opt==='yes'?'✓':'✕'}</span>
                      {opt==='yes'?'Attending':"Can't make it"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest count */}
              <AnimatePresence>
                {attending==='yes'&&(
                  <motion.div style={{ display:'flex', flexDirection:'column', gap:'5px' }}
                    initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }} transition={{ duration:0.28 }}>
                    <label htmlFor="rsvp-guests" style={{ fontSize:'11px', fontWeight:500, color:'hsl(38,15%,34%)', letterSpacing:'0.06em' }}>Number of guests</label>
                    <input id="rsvp-guests" type="number" min={1} max={10} className="field-input" {...register('guestCount')} />
                    <p style={{ fontSize:'11px', color:'hsl(38,10%,58%)' }}>Including yourself</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Message */}
              <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
                <label htmlFor="rsvp-msg" style={{ fontSize:'11px', fontWeight:500, color:'hsl(38,15%,34%)', letterSpacing:'0.06em' }}>A blessing or message (optional)</label>
                <textarea id="rsvp-msg" rows={3} className="field-input" placeholder="Share a warm wish…" style={{ resize:'none' }} {...register('message')} />
              </div>

              {status==='error'&&(
                <motion.div role="alert" style={{ borderRadius:'12px', background:'hsl(355,60%,97%)', border:'1px solid hsl(355,60%,84%)', padding:'11px 14px', fontSize:'13px', color:'hsl(355,60%,44%)' }}
                  initial={{ opacity:0 }} animate={{ opacity:1 }}>
                  ⚠ Something went wrong. Please try again.
                </motion.div>
              )}

              <button type="submit" disabled={status==='loading'} className="pill-btn pill-btn-gold" style={{ width:'100%', marginTop:'4px' }}>
                {status==='loading'
                  ?<span style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                      <svg style={{ animation:'spin 1s linear infinite', width:'15px', height:'15px' }} viewBox="0 0 24 24" fill="none"><circle opacity=".25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path opacity=".75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"/></svg>Sending…
                    </span>
                  :'Send with Love 💌'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
