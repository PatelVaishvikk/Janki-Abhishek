'use client'
import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

export function ShareCard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' as any })
  const [copied, setCopied] = useState(false)
  const share = async () => {
    const url = window.location.href
    if (navigator.share) {
      try { await navigator.share({ title:'Baby Shower — Manish & Riddhi', text:"You're invited! 16th August 2026, Manek Chowk, Wembley.", url }) } catch {}
    } else {
      await navigator.clipboard.writeText(url).catch(()=>{})
      setCopied(true); setTimeout(()=>setCopied(false),3000)
    }
  }
  return (
    <motion.div ref={ref} className="card mb-4" style={{ padding:'28px 20px', textAlign:'center' }}
      initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6 }}>
      <p style={{ fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'hsl(42,55%,48%)', fontWeight:500, marginBottom:'4px' }}>Spread the joy</p>
      <h2 className="font-display" style={{ fontSize:'clamp(1.3rem,5.5vw,1.9rem)', fontWeight:500, color:'hsl(38,18%,22%)', marginBottom:'6px' }}>Share the invitation</h2>
      <p style={{ fontSize:'13px', color:'hsl(38,10%,52%)', marginBottom:'18px' }}>Know someone who should be there?</p>
      <button onClick={share} className="pill-btn pill-btn-violet" style={{ width:'100%' }}>
        <AnimatePresence mode="wait">
          {copied
            ?<motion.span key="c" initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>✓ Link copied!</motion.span>
            :<motion.span key="s" initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>🔗 Share Invitation</motion.span>}
        </AnimatePresence>
      </button>
    </motion.div>
  )
}
