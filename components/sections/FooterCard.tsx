'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export function FooterCard() {
  return (
    <footer role="contentinfo" style={{ textAlign:'center', paddingTop:'8px', paddingBottom:'32px', borderTop:'1px solid rgba(200,170,90,0.2)', marginTop:'4px' }}>
      <motion.div initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
        <Image src="/images/radha-krishna.png" alt="" width={56} height={56} style={{ margin:'0 auto 12px', opacity:0.55 }} aria-hidden="true" />
        <p className="font-display" style={{ fontSize:'clamp(1.3rem,5.5vw,1.8rem)', color:'hsl(38,18%,30%)' }}>
          Manish <span className="font-display italic" style={{ fontWeight:300, color:'hsl(38,15%,58%)' }}>&amp;</span> Riddhi
        </p>
        <p style={{ marginTop:'5px', fontSize:'11px', letterSpacing:'0.12em', textTransform:'uppercase', color:'hsl(38,10%,56%)' }}>Sunday, 16th August 2026</p>
        <p style={{ marginTop:'3px', fontSize:'11px', color:'hsl(38,8%,66%)' }}>Manek Chowk · Wembley HA0 2LW</p>
        <div style={{ display:'flex', alignItems:'center', gap:'8px', justifyContent:'center', margin:'14px auto 0', width:'80px', opacity:0.35 }} aria-hidden="true">
          <div style={{ flex:1, height:'1px', background:'hsl(42,55%,60%)' }} />
          <span style={{ fontSize:'8px', color:'hsl(42,55%,55%)' }}>✦</span>
          <div style={{ flex:1, height:'1px', background:'hsl(42,55%,60%)' }} />
        </div>
        <p style={{ marginTop:'10px', fontSize:'10px', color:'hsl(38,8%,70%)', letterSpacing:'0.04em' }}>Made with love for a very special occasion</p>
      </motion.div>
    </footer>
  )
}
