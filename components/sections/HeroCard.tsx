'use client'

import Image from 'next/image'

export function HeroCard() {
  return (
    <section className="wedding-frame" style={{ borderRadius: '4px' }}>
      <div className="wedding-frame-inner" style={{ textAlign: 'center', padding: '36px 20px 32px' }}>
        
        {/* Swaminarayan Invocations */}
        <div style={{ marginBottom: '18px' }}>
          <p
            style={{
              fontSize: '14px',
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
              fontSize: '12.5px',
              letterSpacing: '0.06em',
              color: 'var(--ink-secondary)',
              fontWeight: 500,
            }}
          >
            Das na das banavshoji
          </p>
        </div>

        {/* Sacred Gunatit Guru Parampara Portrait */}
        <div style={{ maxWidth: '380px', margin: '0 auto 18px' }}>
          <div
            style={{
              background: '#FFFFFF',
              padding: '6px',
              border: '1px solid var(--gold-border)',
              boxShadow: '0 2px 10px rgba(36, 33, 29, 0.04)',
              borderRadius: '2px',
            }}
          >
            <Image
              src="/images/guru-parampara.png"
              alt="Lord Swaminarayan & Gunatit Guru Parampara"
              width={1024}
              height={525}
              priority
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>
        </div>

        {/* Baby Shower Announcement */}
        <div style={{ marginBottom: '12px' }}>
          <p
            className="font-display italic"
            style={{
              fontSize: 'clamp(1.15rem, 4.2vw, 1.45rem)',
              color: 'var(--maroon)',
              fontWeight: 600,
              lineHeight: 1.4,
              marginBottom: '6px',
            }}
          >
            A Little Bundle of Joy Is on the Way!
          </p>
          <p
            style={{
              fontSize: '10.5px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--ink-secondary)',
              fontWeight: 500,
            }}
          >
            With great happiness, we invite you to celebrate honouring
          </p>
        </div>

        {/* Parents to be */}
        <div style={{ margin: '14px 0 20px' }}>
          <h1
            className="font-display gold-heading"
            style={{
              fontSize: 'clamp(2.6rem, 10vw, 3.8rem)',
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: '0.01em',
            }}
          >
            Janki <span className="font-display italic font-light" style={{ fontSize: '0.52em', color: 'var(--gold-primary)' }}>&amp;</span> Abhishek
          </h1>
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--gold-dark)',
              fontWeight: 600,
              marginTop: '4px',
            }}
          >
            Baby Shower Celebration
          </p>
        </div>

        {/* Gold Ornament Divider */}
        <div className="divider-gold" style={{ margin: '16px auto', maxWidth: '240px' }} />

        {/* Date, Time & Venue Block */}
        <div style={{ maxWidth: '380px', margin: '0 auto 18px' }}>
          <p
            className="font-display"
            style={{
              fontSize: 'clamp(1.35rem, 5vw, 1.65rem)',
              fontWeight: 600,
              color: 'var(--ink-primary)',
              marginBottom: '3px',
            }}
          >
            Sunday, November 22, 2026
          </p>
          <p
            style={{
              fontSize: '12.5px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--gold-dark)',
              fontWeight: 600,
              marginBottom: '10px',
            }}
          >
            9:00 AM onwards
          </p>

          <p
            className="font-display"
            style={{
              fontSize: '1.25rem',
              color: 'var(--ink-primary)',
              fontWeight: 600,
              marginBottom: '2px',
            }}
          >
            Haridham Toronto
          </p>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--ink-secondary)',
              lineHeight: 1.5,
            }}
          >
            7605 Danbro Crescent · Mississauga, ON L5N 6P9
          </p>
        </div>

        {/* Personal Message */}
        <p
          className="font-display italic"
          style={{
            fontSize: '1.05rem',
            color: 'var(--ink-secondary)',
            lineHeight: 1.6,
            maxWidth: '380px',
            margin: '0 auto 22px',
          }}
        >
          &ldquo;Come share your love, laughter, and blessings as we celebrate this wonderful new chapter together!&rdquo;
        </p>

        {/* RSVP anchor button */}
        <div>
          <button
            onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            Confirm Your Attendance
          </button>
        </div>

      </div>
    </section>
  )
}
