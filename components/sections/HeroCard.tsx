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

      {/* Floating floral petals and sparkles for extra visual delight */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
        <motion.span
          style={{ position: 'absolute', top: '8%', left: '8%', fontSize: '13px', opacity: 0.35, display: 'inline-block' }}
          animate={{ y: [0, -10, 0], rotate: [0, 20, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          🌸
        </motion.span>
        <motion.span
          style={{ position: 'absolute', top: '25%', right: '8%', fontSize: '11px', opacity: 0.3, display: 'inline-block' }}
          animate={{ y: [0, 8, 0], rotate: [0, -15, 0], scale: [1, 0.9, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          ✨
        </motion.span>
        <motion.span
          style={{ position: 'absolute', bottom: '25%', left: '10%', fontSize: '12px', opacity: 0.3, display: 'inline-block' }}
          animate={{ y: [0, 10, 0], rotate: [0, 30, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          🌸
        </motion.span>
        <motion.span
          style={{ position: 'absolute', bottom: '15%', right: '10%', fontSize: '14px', opacity: 0.25, display: 'inline-block' }}
          animate={{ y: [0, -12, 0], rotate: [0, -25, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          ✨
        </motion.span>
      </div>

      <div className="relative" style={{ zIndex: 2 }}>
        {/* Deities invocation in Sanskrit/English as requested */}
        <motion.div
          {...anim(0.15)}
          style={{
            fontSize: 'clamp(11px, 2.8vw, 13px)',
            color: 'hsl(38,72%,38%)',
            fontWeight: 600,
            letterSpacing: '0.04em',
            marginBottom: '20px',
            lineHeight: 1.6
          }}
        >
          <div>|| Shri Ganeshaya Namah ||</div>
          <div>|| Shri Umiya Matayai Namah ||</div>
          <div>|| Shri Hanumate Namah ||</div>
        </motion.div>

        {/* Radha-Krishna with a subtle floating animation */}
        <motion.div
          className="flex justify-center mb-4"
          {...anim(0.2)}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image src="/images/radha-krishna.png" alt="Radha and Krishna" width={140} height={140} priority className="drop-shadow-2xl" />
          </motion.div>
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

        {/* Date & Address chip */}
        <motion.div {...anim(0.7)}
          style={{
            display:'inline-block',
            padding:'16px 28px',
            borderRadius:'16px',
            background:'linear-gradient(135deg, hsl(44,70%,97%) 0%, hsl(42,60%,94%) 100%)',
            border:'1px solid hsl(42,55%,80%)',
            boxShadow: '0 2px 10px rgba(180,140,60,0.06)'
          }}
        >
          <p className="font-display" style={{ fontSize:'clamp(1.15rem,5.2vw,1.4rem)', fontWeight:600, color:'hsl(38,72%,36%)', marginBottom:'4px' }}>
            Sunday, 16th August 2026
          </p>
          <p style={{ fontSize:'14px', fontWeight: 600, color:'hsl(38,15%,42%)' }}>9:30 AM</p>
          <div style={{ width: '50px', height: '1px', background: 'hsl(42,40%,80%)', margin: '10px auto' }} />
          <p className="font-display" style={{ fontSize:'16px', fontWeight: 700, color:'hsl(38,72%,38%)', marginBottom:'3px' }}>Manek Chowk</p>
          <p style={{ fontSize:'14px', color:'hsl(38,10%,45%)', lineHeight: 1.5, width: '250px', margin: '0 auto', fontWeight: 500 }}>
            763–765 Harrow Road<br />Wembley, HA0 2LW<br />United Kingdom
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p {...anim(0.85)} style={{ marginTop:'14px', fontSize:'12px', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color:'hsl(340,60%,56%)' }}>
          Let's shower the Mom-to-Be! 🌸
        </motion.p>

        {/* Quick RSVP Button */}
        <motion.div {...anim(0.95)} style={{ marginTop:'20px' }}>
          <button
            onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
            className="pill-btn pill-btn-outline"
            style={{
              padding: '10px 24px',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              background: 'rgba(255,255,255,0.4)',
              backdropFilter: 'blur(8px)',
              cursor: 'pointer'
            }}
          >
            💌 Quick RSVP
          </button>
        </motion.div>
      </div>
    </div>
  )
}
