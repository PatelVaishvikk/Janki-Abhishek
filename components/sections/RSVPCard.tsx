import { useRef, useState } from 'react'
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

export function RSVPCard() {
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' as any })
  const [status, setStatus] = useState<'idle'|'loading'|'error'>('idle')
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
        router.push(`/thank-you?name=${encodeURIComponent(firstName)}&attending=${payload.attending}`)
      } else {
        setStatus('error')
      }
    } catch { setStatus('error') }
  }


  return (
    <div ref={ref} id="rsvp" className="card gold-border mb-4" style={{ padding:'24px 20px', background:'rgba(255,255,255,0.78)' }}>
      <motion.div style={{ textAlign:'center', marginBottom:'20px' }}
        initial={{ opacity:0, y:14 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6 }}>
        <p style={{ fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'hsl(42,55%,48%)', fontWeight:500, marginBottom:'4px' }}>Will you join us?</p>
        <h2 className="font-display" style={{ fontSize:'clamp(1.5rem,6.5vw,2.2rem)', fontWeight:500, color:'hsl(38,18%,22%)' }}>Send your RSVP</h2>
      </motion.div>

      <motion.form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display:'flex', flexDirection:'column', gap:'14px' }}
        initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.15, duration:0.5 }}>

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
      </motion.form>
    </div>
  )
}
