'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const EVENT = new Date('2026-08-16T09:30:00+01:00')
const calc = () => {
  const d = Math.max(0, EVENT.getTime() - Date.now())
  return { D: Math.floor(d/86400000), H: Math.floor((d/3600000)%24), M: Math.floor((d/60000)%60), S: Math.floor((d/1000)%60) }
}

function Tile({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flex:1 }}>
      <div style={{ width:'100%', aspectRatio:'1', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'18px', background:'rgba(255,255,255,0.85)', border:'1px solid rgba(200,170,90,0.18)', boxShadow:'0 2px 8px rgba(0,0,0,0.05)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'50%', left:0, right:0, height:'1px', background:'rgba(200,170,90,0.12)' }} />
        <AnimatePresence mode="wait">
          <motion.span key={value} className="font-display"
            style={{ fontSize:'clamp(1.5rem,8vw,2.2rem)', fontWeight:600, color:'hsl(38,72%,36%)', lineHeight:1, position:'relative', zIndex:1 }}
            initial={{ y:-12, opacity:0 }} animate={{ y:0, opacity:1 }} exit={{ y:12, opacity:0 }}
            transition={{ duration:0.28, ease:[0.16,1,0.3,1] }}
            aria-live="polite" aria-atomic="true">
            {String(value).padStart(2,'0')}
          </motion.span>
        </AnimatePresence>
      </div>
      <span style={{ marginTop:'6px', fontSize:'9px', letterSpacing:'0.15em', textTransform:'uppercase', color:'hsl(38,10%,56%)', fontWeight:500 }}>{label}</span>
    </div>
  )
}

export function CountdownCard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' as any })
  const [t, setT] = useState({ D: 0, H: 0, M: 0, S: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setT(calc())
    setMounted(true)
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
  }, [])

  const isEnded = mounted && (EVENT.getTime() - Date.now() <= 0)

  return (
    <motion.div ref={ref} className="card mb-4" style={{ padding:'28px 20px', textAlign:'center' }}
      initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7 }}>
      <p style={{ fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'hsl(42,55%,48%)', fontWeight:500, marginBottom:'6px' }}>Counting down</p>
      <h2 className="font-display italic" style={{ fontSize:'clamp(1.2rem,5vw,1.7rem)', fontWeight:400, color:'hsl(38,18%,26%)', marginBottom:'20px' }}>
        {isEnded ? "The Celebration" : "The big day arrives in…"}
      </h2>

      {isEnded ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-display"
          style={{
            fontSize: 'clamp(1.3rem, 5.5vw, 1.8rem)',
            color: 'hsl(38,72%,36%)',
            fontWeight: 600,
            padding: '10px 0 6px',
            lineHeight: 1.4
          }}
        >
          The celebration is underway! 🎉
        </motion.div>
      ) : (
        <div style={{ display:'flex', gap:'8px' }} role="timer" aria-label="Countdown to baby shower">
          <Tile value={mounted ? t.D : 0} label="Days" />
          <div style={{ display:'flex', alignItems:'center', paddingBottom:'18px', color:'hsl(42,50%,70%)', fontWeight:300, fontSize:'1.4rem' }}>:</div>
          <Tile value={mounted ? t.H : 0} label="Hours" />
          <div style={{ display:'flex', alignItems:'center', paddingBottom:'18px', color:'hsl(42,50%,70%)', fontWeight:300, fontSize:'1.4rem' }}>:</div>
          <Tile value={mounted ? t.M : 0} label="Mins" />
          <div style={{ display:'flex', alignItems:'center', paddingBottom:'18px', color:'hsl(42,50%,70%)', fontWeight:300, fontSize:'1.4rem' }}>:</div>
          <Tile value={mounted ? t.S : 0} label="Secs" />
        </div>
      )}
    </motion.div>
  )
}
