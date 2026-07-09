'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.3!2d-0.3200!3d51.5451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760e4d3b5fe64f%3A0x2!2sManek+Chowk%2C+Wembley!5e0!3m2!1sen!2suk!4v1'
const DIR   = 'https://www.google.com/maps/dir/?api=1&destination=763+Harrow+Road,+Wembley+HA0+2LW'

export function VenueCard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' as any })
  return (
    <div ref={ref} className="card mb-4" style={{ padding:'24px 20px' }}>
      <div style={{ textAlign:'center', marginBottom:'16px' }}>
        <motion.div initial={{ opacity:0 }} animate={inView?{opacity:1}:{}}>
          <p style={{ fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'hsl(42,55%,48%)', fontWeight:500, marginBottom:'4px' }}>Where to find us</p>
          <h2 className="font-display" style={{ fontSize:'clamp(1.5rem,6.5vw,2.2rem)', fontWeight:500, color:'hsl(38,18%,22%)', marginBottom:'4px' }}>Manek Chowk</h2>
          <address className="not-italic" style={{ fontSize:'13px', color:'hsl(38,10%,50%)', lineHeight:1.6 }}>
            763–765 Harrow Road<br />Wembley, HA0 2LW
          </address>
        </motion.div>
      </div>
      <motion.div style={{ borderRadius:'16px', overflow:'hidden', aspectRatio:'4/3', border:'1px solid rgba(200,170,90,0.18)', boxShadow:'0 4px 16px rgba(0,0,0,0.07)', marginBottom:'14px' }}
        initial={{ opacity:0, scale:0.97 }} animate={inView?{opacity:1,scale:1}:{}} transition={{ delay:0.15, duration:0.7, ease:[0.16,1,0.3,1] }}>
        {inView&&<iframe src={EMBED} width="100%" height="100%" style={{ border:0, display:'block' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Venue map — Manek Chowk, Wembley" />}
      </motion.div>
      <motion.button onClick={()=>window.open(DIR,'_blank','noopener')} className="pill-btn pill-btn-gold" style={{ width:'100%' }}
        initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.3, duration:0.5 }}>
        📍 Get Directions
      </motion.button>
    </div>
  )
}
