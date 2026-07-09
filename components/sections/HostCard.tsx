'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ITEMS = [
  { icon: '🌸', label: 'A note from us', text: "With hearts so full they could burst, Manish and Riddhi invite you to celebrate the upcoming arrival of their little one. Your presence — your laughter, your warmth, your blessings — means the world." },
  { icon: '👗', label: 'Dress code',       text: "Traditional or festive Indian attire warmly welcomed. Come dressed in colour — the more vibrant, the merrier!" },
  { icon: '🎁', label: 'Gifts',            text: "Your presence is our greatest gift. A heartfelt blessing written in a card means everything." },
]

export function HostCard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' as any })
  return (
    <div ref={ref} className="card mb-4" style={{ padding:'24px 20px' }}>
      <p style={{ fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'hsl(42,55%,48%)', fontWeight:500, textAlign:'center', marginBottom:'4px' }}>From the family</p>
      <h2 className="font-display italic" style={{ fontSize:'clamp(1.3rem,5.5vw,1.8rem)', fontWeight:400, color:'hsl(38,18%,26%)', textAlign:'center', marginBottom:'16px' }}>
        A note from us
      </h2>
      <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
        {ITEMS.map((item, i) => (
          <motion.div key={item.label} style={{ display:'flex', gap:'14px', padding:'14px', borderRadius:'16px', background:'rgba(255,255,255,0.55)', border:'1px solid rgba(200,170,90,0.12)' }}
            initial={{ opacity:0, x:-14 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:i*0.1, duration:0.6, ease:[0.16,1,0.3,1] }}>
            <span style={{ fontSize:'20px', flexShrink:0, marginTop:'1px' }} aria-hidden="true">{item.icon}</span>
            <div>
              <p style={{ fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase', color:'hsl(42,55%,45%)', fontWeight:500, marginBottom:'3px' }}>{item.label}</p>
              <p style={{ fontSize:'13px', color:'hsl(38,12%,38%)', lineHeight:1.6 }}>{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
