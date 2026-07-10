'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const GCal = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Baby+Shower+%E2%80%94+Manish+%26+Riddhi&dates=20260816T083000Z/20260816T133000Z&details=Baby+Shower+Celebration&location=Manek+Chowk%2C+763-765+Harrow+Road%2C+Wembley%2C+HA0+2LW%2C+United+Kingdom'
const ICS  = 'BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nUID:babyshower-manish-riddhi@invite\nDTSTAMP:20260101T000000Z\nDTSTART:20260816T083000Z\nDTEND:20260816T133000Z\nSUMMARY:Baby Shower — Manish & Riddhi\nLOCATION:Manek Chowk\\, 763-765 Harrow Road\\, Wembley\\, HA0 2LW\\, United Kingdom\nEND:VEVENT\nEND:VCALENDAR'

export function CalendarCard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' as any })
  const download = () => {
    const a = Object.assign(document.createElement('a'),{
      href: URL.createObjectURL(new Blob([ICS],{type:'text/calendar'})),
      download: 'baby-shower-manish-riddhi.ics',
    })
    document.body.appendChild(a); a.click(); document.body.removeChild(a)
  }
  return (
    <motion.div ref={ref} className="card mb-4" style={{ padding:'28px 20px', textAlign:'center' }}
      initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6 }}>
      <p style={{ fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'hsl(42,55%,48%)', fontWeight:500, marginBottom:'4px' }}>Don't miss it</p>
      <h2 className="font-display" style={{ fontSize:'clamp(1.3rem,5.5vw,1.9rem)', fontWeight:500, color:'hsl(38,18%,22%)', marginBottom:'18px' }}>Add to your calendar</h2>
      <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
        <button onClick={download} className="pill-btn pill-btn-gold" style={{ width:'100%' }}>📅 Apple / Outlook (.ics)</button>
        <button onClick={()=>window.open(GCal,'_blank','noopener')} className="pill-btn pill-btn-outline" style={{ width:'100%' }}>🗓 Google Calendar</button>
      </div>
    </motion.div>
  )
}
