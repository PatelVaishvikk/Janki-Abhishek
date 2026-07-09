'use client'

import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

function ThankYouContent() {
  const searchParams = useSearchParams()
  const name = searchParams.get('name') || 'Guest'
  const attending = searchParams.get('attending') === 'yes'

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '40px 16px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="card gold-border text-center relative overflow-hidden"
        style={{ padding: '48px 24px 36px', background: 'linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(255,248,228,0.88) 100%)' }}>

        {/* Bottom glow */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '180px', background: 'radial-gradient(ellipse 90% 80% at 50% 100%, hsl(270,35%,90%,0.4), transparent 70%)', pointerEvents: 'none' }} />

        <div className="relative">
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌸</div>

          <h1 className="font-display gold-text" style={{ fontSize: 'clamp(2rem, 8vw, 2.8rem)', fontWeight: 600, marginBottom: '12px' }}>
            Thank You, {name}!
          </h1>

          <p className="font-display italic" style={{ fontSize: '18px', color: 'hsl(38,15%,36%)', marginBottom: '24px' }}>
            Your RSVP has been received.
          </p>

          <div style={{ margin: '0 auto 24px', width: '80px', height: '1px', background: 'hsl(42,50%,80%)' }} />

          <p style={{ fontSize: '14px', color: 'hsl(38,12%,42%)', lineHeight: 1.65, marginBottom: '32px' }}>
            {attending ? (
              <>
                We are absolutely thrilled to celebrate this special day with you. We can&apos;t wait to see you on <strong>Sunday, 16th August 2026</strong>!
              </>
            ) : (
              <>
                We are sorry you won&apos;t be able to make it, but we deeply appreciate your warm wishes and blessings from afar.
              </>
            )}
          </p>

          <Image src="/images/radha-krishna.png" alt="" width={100} height={100} style={{ margin: '0 auto 28px', opacity: 0.8 }} />

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link href="/" className="pill-btn pill-btn-gold" style={{ textDecoration: 'none' }}>
              Back to Invitation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'hsl(38,10%,50%)' }}>Loading...</p>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  )
}
