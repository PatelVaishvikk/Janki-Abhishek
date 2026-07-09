'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export function HeroCard({ entered }: { entered: boolean }) {
  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <div className="card gold-border relative overflow-hidden mt-4 mb-4 text-center"
      style={{ padding: '36px 24px 28px', background: 'linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(255,248,228,0.88) 100%)' }}>
      {/* Violet glow at bottom */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'180px', background:'radial-gradient(ellipse 90% 80% at 50% 100%, hsl(270,35%,90%,0.5), transparent 70%)', pointerEvents:'none' }} />

      <div className="relative">
        {/* Deities invocation in English */}
        <motion.p {...anim(0.15)} style={{ fontSize: 'clamp(9px, 2.5vw, 12px)', whiteSpace: 'nowrap', color: 'hsl(38,72%,38%)', fontWeight: 600, letterSpacing: '0.02em', marginBottom: '16px' }}>
          || Shri Ganpati Dada || Shri Umiya Mata || Shri Hanuman Dada ||
        </motion.p>

        {/* Radha-Krishna */}
        <motion.div className="flex justify-center mb-4" {...anim(0.2)}>
          <Image src="/images/radha-krishna.png" alt="Radha and Krishna" width={140} height={140} priority className="drop-shadow-2xl" />
        </motion.div>

        {/* Badge */}
        <motion.div {...anim(0.4)}
          style={{ display:'inline-block', marginBottom:'12px', padding:'4px 14px', borderRadius:'999px', fontSize:'10px', fontWeight:500, letterSpacing:'0.18em', textTransform:'uppercase', color:'hsl(42,55%,42%)', background:'hsl(44,80%,94%)', border:'1px solid hsl(42,60%,78%)' }}>
          Baby Shower Invitation
        </motion.div>

        {/* Names */}
        <motion.h1 {...anim(0.5)} className="font-display gold-text" style={{ fontSize:'clamp(2.4rem,11vw,3.8rem)', fontWeight:600, lineHeight:1.05, marginBottom:'4px' }}>
          Manish <span className="font-display italic font-light" style={{ fontSize:'0.5em', color:'hsl(38,15%,62%)' }}>&amp;</span> Riddhi
        </motion.h1>

        {/* Italic sub */}
        <motion.p {...anim(0.6)} className="font-display italic" style={{ fontSize:'clamp(0.95rem,3.5vw,1.15rem)', color:'hsl(38,12%,52%)', marginBottom:'16px' }}>
          request the pleasure of your company
        </motion.p>

        {/* Date chip */}
        <motion.div {...anim(0.7)}
          style={{ display:'inline-block', padding:'10px 20px', borderRadius:'14px', background:'hsl(42,60%,96%)', border:'1px solid hsl(42,55%,80%)' }}>
          <p className="font-display" style={{ fontSize:'clamp(1rem,4.5vw,1.2rem)', fontWeight:500, color:'hsl(38,72%,36%)', marginBottom:'2px' }}>
            Sunday, 16th August 2026
          </p>
          <p style={{ fontSize:'12px', color:'hsl(38,12%,52%)' }}>9:30 AM · Manek Chowk, Wembley</p>
        </motion.div>

        {/* Tagline */}
        <motion.p {...anim(0.85)} style={{ marginTop:'14px', fontSize:'12px', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color:'hsl(340,60%,56%)' }}>
          Let's shower the Mom-to-Be! 🌸
        </motion.p>
      </div>
    </div>
  )
}
