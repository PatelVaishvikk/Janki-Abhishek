'use client'

import { useState, useEffect } from 'react'
import { triggerConfetti } from '@/components/ui/Confetti'

interface RoyalEnvelopeSplashProps {
  onOpen?: () => void
}

type Stage = 'idle' | 'unsealing' | 'flap-opening' | 'card-sliding' | 'fading'

export function RoyalEnvelopeSplash({ onOpen }: RoyalEnvelopeSplashProps) {
  const [stage, setStage] = useState<Stage>('idle')
  const [isDismissed, setIsDismissed] = useState(false)

  // Lock body scroll while envelope opening screen is active
  useEffect(() => {
    if (!isDismissed) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isDismissed])

  const handleOpen = () => {
    if (stage !== 'idle' || isDismissed) return

    // Trigger celebratory confetti burst on envelope tap
    triggerConfetti({ particleCount: 85, originY: 0.55 })

    // Step 1: Wax seal softly begins unsealing
    setStage('unsealing')

    // Start background devotional music on user gesture
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('play-audio'))
    }
    if (onOpen) onOpen()

    // Step 2: Top flap gently folds open (at 500ms)
    setTimeout(() => {
      setStage('flap-opening')
    }, 500)

    // Step 3: Card begins slow, luxurious glide upwards & celebration erupts (at 1400ms)
    setTimeout(() => {
      setStage('card-sliding')
    }, 1400)

    // Step 4: Gentle, slow cross-fade into main invitation (at 4000ms)
    setTimeout(() => {
      setStage('fading')
    }, 4000)

    // Step 5: Complete dismiss (at 5000ms)
    setTimeout(() => {
      setIsDismissed(true)
    }, 5000)
  }

  const handleSkip = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('play-audio'))
    }
    if (onOpen) onOpen()
    setIsDismissed(true)
  }

  if (isDismissed) return null

  const isFlapOpen = stage === 'flap-opening' || stage === 'card-sliding' || stage === 'fading'
  const isCardSliding = stage === 'card-sliding' || stage === 'fading'
  const isFading = stage === 'fading'

  return (
    <div
      onClick={handleOpen}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 16px',
        backgroundColor: '#F6F1E7',
        backgroundImage: `
          radial-gradient(ellipse 95% 70% at 50% 20%, rgba(201, 166, 107, 0.22) 0%, transparent 65%),
          radial-gradient(ellipse 80% 50% at 50% 100%, rgba(104, 29, 41, 0.08) 0%, transparent 65%),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E")
        `,
        overflow: 'hidden',
        cursor: stage === 'idle' ? 'pointer' : 'default',
        transition: 'opacity 1.0s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: isFading ? 0 : 1,
        pointerEvents: isFading ? 'none' : 'auto',
      }}
    >
      <style>{`
        @keyframes sealGlow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(197, 154, 79, 0.45), 0 8px 24px rgba(122, 88, 38, 0.35);
          }
          50% {
            box-shadow: 0 0 0 14px rgba(197, 154, 79, 0), 0 12px 30px rgba(122, 88, 38, 0.45);
          }
        }
      `}</style>

      {/* Top Header Label */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '24px',
          transition: 'transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s ease',
          transform: isCardSliding ? 'translateY(-20px)' : 'translateY(0)',
          opacity: isCardSliding ? 0 : 1,
        }}
      >
        <p
          style={{
            fontSize: '14.5px',
            letterSpacing: '0.1em',
            color: 'var(--gold-dark)',
            fontWeight: 600,
            marginBottom: '4px',
            textShadow: '0 1px 2px rgba(255,255,255,0.8)',
          }}
        >
          🙏 Jay Swaminarayan 🙏
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '6px 0 4px' }}>
          <div style={{ height: '1px', width: '36px', background: 'linear-gradient(to right, transparent, var(--gold-light))' }} />
          <span style={{ fontSize: '9px', color: 'var(--gold-primary)' }}>❖</span>
          <div style={{ height: '1px', width: '36px', background: 'linear-gradient(to left, transparent, var(--gold-light))' }} />
        </div>
        <p
          style={{
            fontSize: '10.5px',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--ink-secondary)',
            fontWeight: 600,
          }}
        >
          A Royal Invitation For You
        </p>
      </div>

      {/* Skip Button at Top Right */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          handleSkip()
        }}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: '#FFFFFF',
          border: '1px solid var(--gold-border)',
          borderRadius: '20px',
          color: 'var(--ink-secondary)',
          fontSize: '11px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontWeight: 600,
          cursor: 'pointer',
          padding: '7px 16px',
          zIndex: 10,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--gold-primary)'
          e.currentTarget.style.color = 'var(--gold-dark)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--gold-border)'
          e.currentTarget.style.color = 'var(--ink-secondary)'
        }}
      >
        Skip ✕
      </button>

      {/* ─── PHYSICAL BESPOKE ENVELOPE ASSEMBLY (3D Perspective) ─── */}
      <div
        style={{
          position: 'relative',
          width: 'min(440px, 92vw)',
          height: 'min(285px, 60vw)',
          perspective: '1400px',
          transform: isCardSliding ? 'translateY(35px)' : 'translateY(0)',
          transition: 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Layer 1: Back Wall of Envelope with Rich Royal Gold Floral Lining */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(145deg, #F5ECE0 0%, #EBDBC5 100%)',
            border: '1.5px solid var(--gold-border)',
            borderRadius: '6px',
            zIndex: 1,
            boxShadow: `
              0 25px 60px rgba(36, 33, 29, 0.16),
              0 8px 24px rgba(36, 33, 29, 0.08),
              inset 0 1px 2px rgba(255,255,255,0.9)
            `,
            overflow: 'hidden',
          }}
        >
          {/* Ornate Gold Damask Wallpaper Lining inside Envelope */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.28,
              backgroundImage: `
                radial-gradient(circle, #A37A3E 1.5px, transparent 1.5px),
                url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 2 L20 12 L30 16 L20 20 L16 30 L12 20 L2 16 L12 12 Z' fill='none' stroke='%23C9A66B' stroke-width='0.7'/%3E%3C/svg%3E")
              `,
              backgroundSize: '24px 24px, 48px 48px',
            }}
          />
        </div>

        {/* Layer 2: The Actual Invitation Card (Smoothly slides up from inside the envelope pocket) */}
        <div
          style={{
            position: 'absolute',
            left: '12px',
            right: '12px',
            bottom: '10px',
            height: '93%',
            background: '#FFFFFF',
            border: '1.5px solid var(--gold-border)',
            borderRadius: '4px',
            boxShadow: isCardSliding
              ? '0 20px 48px rgba(36, 33, 29, 0.22), 0 4px 12px rgba(0,0,0,0.08)'
              : '0 3px 8px rgba(36, 33, 29, 0.06)',
            zIndex: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px',
            textAlign: 'center',
            transformOrigin: 'center bottom',
            transform: isCardSliding
              ? 'translateY(-160px) scale(1.06)'
              : 'translateY(0) scale(0.97)',
            transition: 'transform 1.8s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 1.8s ease',
          }}
        >
          {/* Inner double gold luxury stationery frame */}
          <div
            style={{
              width: '100%',
              height: '100%',
              border: '1px solid rgba(163, 122, 62, 0.45)',
              background: '#FAF7F2',
              padding: '16px 14px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              borderRadius: '2px',
            }}
          >
            {/* Ornate Gold Corner Accents */}
            <div style={{ position: 'absolute', top: '4px', left: '4px', width: '10px', height: '10px', borderTop: '2px solid var(--gold-primary)', borderLeft: '2px solid var(--gold-primary)' }} />
            <div style={{ position: 'absolute', top: '4px', right: '4px', width: '10px', height: '10px', borderTop: '2px solid var(--gold-primary)', borderRight: '2px solid var(--gold-primary)' }} />
            <div style={{ position: 'absolute', bottom: '4px', left: '4px', width: '10px', height: '10px', borderBottom: '2px solid var(--gold-primary)', borderLeft: '2px solid var(--gold-primary)' }} />
            <div style={{ position: 'absolute', bottom: '4px', right: '4px', width: '10px', height: '10px', borderBottom: '2px solid var(--gold-primary)', borderRight: '2px solid var(--gold-primary)' }} />

            <p
              style={{
                fontSize: '11.5px',
                letterSpacing: '0.08em',
                color: 'var(--gold-dark)',
                fontWeight: 600,
                marginBottom: '3px',
              }}
            >
              🙏 Jay Swaminarayan 🙏
            </p>

            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--maroon)',
                fontWeight: 600,
                marginBottom: '6px',
              }}
            >
              We Cordially Invite You To
            </p>

            <h2
              className="font-display gold-heading"
              style={{
                fontSize: 'clamp(1.8rem, 6.2vw, 2.45rem)',
                fontWeight: 500,
                fontStyle: 'italic',
                lineHeight: 1.15,
                margin: '2px 0 6px',
                textAlign: 'center',
              }}
            >
              Janki&apos;s Baby Shower
            </h2>
          </div>
        </div>

        {/* Layer 3: Front Pocket Folds of the Envelope (Covers lower half of card initially) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 5,
            pointerEvents: 'none',
            opacity: isCardSliding ? 0.96 : 1,
            transition: 'opacity 1.2s ease',
          }}
        >
          <svg
            viewBox="0 0 440 285"
            preserveAspectRatio="none"
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              filter: 'drop-shadow(0 -3px 8px rgba(0,0,0,0.06))',
            }}
          >
            {/* Left triangle fold with subtle shadow */}
            <path
              d="M0 0 L220 152 L0 285 Z"
              fill="#FAF7F2"
              stroke="#E2D5BE"
              strokeWidth="1.2"
            />
            {/* Right triangle fold */}
            <path
              d="M440 0 L220 152 L440 285 Z"
              fill="#F5EFE6"
              stroke="#E2D5BE"
              strokeWidth="1.2"
            />
            {/* Bottom triangle fold */}
            <path
              d="M0 285 L220 142 L440 285 Z"
              fill="#FFFFFF"
              stroke="#E2D5BE"
              strokeWidth="1.2"
            />
            {/* Inner gold foil lining along bottom fold edge */}
            <path
              d="M20 280 L220 146 L420 280"
              fill="none"
              stroke="rgba(201, 166, 107, 0.45)"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Layer 4: Triangular Top Flap (Gently Folds Open 180° Backwards) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '54%',
            transformOrigin: 'top center',
            transform: isFlapOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
            transition: 'transform 1.4s cubic-bezier(0.25, 1, 0.45, 1)',
            zIndex: isFlapOpen ? 0 : 6,
            backfaceVisibility: 'hidden',
          }}
        >
          <svg
            viewBox="0 0 440 154"
            preserveAspectRatio="none"
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              filter: 'drop-shadow(0 5px 12px rgba(36, 33, 29, 0.14))',
            }}
          >
            {/* Outer Flap Face */}
            <path
              d="M0 0 L440 0 L220 154 Z"
              fill="#FFFFFF"
              stroke="#E2D5BE"
              strokeWidth="1.5"
            />
            {/* Outer Gold Stitch Line */}
            <path
              d="M16 6 L424 6 L220 146 Z"
              fill="none"
              stroke="rgba(201, 166, 107, 0.55)"
              strokeWidth="1"
            />
            {/* Inner Gold Foil Line */}
            <path
              d="M28 10 L412 10 L220 138 Z"
              fill="none"
              stroke="rgba(163, 122, 62, 0.3)"
              strokeWidth="0.8"
            />
          </svg>
        </div>

        {/* Layer 5: Embossed Gold Wax Seal (With Gentle Golden Pulsing Glow) */}
        <div
          style={{
            position: 'absolute',
            top: '54%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${stage === 'unsealing' ? 0.94 : isFlapOpen ? 0.8 : 1})`,
            zIndex: isFlapOpen ? 0 : 8,
            transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.7s ease',
            opacity: isFlapOpen ? 0 : 1,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 30%, #FFF0CF 0%, #E2BE7B 30%, #B8904D 65%, #6E4D1B 100%)',
              border: '2px solid #FBE7BF',
              animation: stage === 'idle' ? 'sealGlow 2.4s infinite ease-in-out' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Organic Wax Seal Scalloped Rim */}
            <svg
              viewBox="0 0 72 72"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                opacity: 0.35,
              }}
            >
              <circle cx="36" cy="36" r="34" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" />
            </svg>

            {/* Inner debossed coin with royal couple monogram */}
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.6)',
                background: 'radial-gradient(circle at 40% 40%, #D4AF67 0%, #9E7432 75%, #5E3E13 100%)',
                boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.4), 0 1px 2px rgba(255,255,255,0.4)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                className="font-display italic"
                style={{
                  fontSize: '26px',
                  fontWeight: 600,
                  color: '#FAF7F2',
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                  lineHeight: 1,
                  letterSpacing: '0.02em',
                }}
              >
                J
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tap Prompt at Bottom */}
      <div
        style={{
          marginTop: '36px',
          textAlign: 'center',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          opacity: isFlapOpen ? 0 : 1,
          transform: isFlapOpen ? 'translateY(15px)' : 'translateY(0)',
        }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handleOpen()
          }}
          className="btn-primary"
          style={{
            padding: '14px 34px',
            borderRadius: '30px',
            fontSize: '11.5px',
            letterSpacing: '0.2em',
            gap: '10px',
            boxShadow: '0 6px 22px rgba(122, 88, 38, 0.35)',
            cursor: 'pointer',
          }}
        >
          <span>✦</span>
          <span>Tap Wax Seal to Open</span>
          <span>✦</span>
        </button>

        <p
          style={{
            marginTop: '10px',
            fontSize: '11.5px',
            letterSpacing: '0.08em',
            color: 'var(--ink-secondary)',
            fontStyle: 'italic',
          }}
        >
          Haridham Toronto · Mississauga, ON
        </p>
      </div>
    </div>
  )
}
