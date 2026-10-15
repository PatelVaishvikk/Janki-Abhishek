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
            }}
          >
            🙏 Jay Swaminarayan 🙏
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

        {/* Divine Grace & Blessings Paragraph */}
        <div style={{ marginBottom: '18px' }}>
          <p
            className="font-display italic"
            style={{
              fontSize: 'clamp(1.05rem, 3.8vw, 1.25rem)',
              color: 'var(--ink-secondary)',
              lineHeight: 1.6,
              maxWidth: '440px',
              margin: '0 auto 16px',
            }}
          >
            With the divine grace of Aksharpurushottam Maharaj and the blessings of Guruhari Hariprasad Swamiji Maharaj and Guruhari Premswaroop Swamiji Maharaj
          </p>
          {/* Small diamond / gold ornament */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', margin: '18px 0 16px' }}>
            <div style={{ height: '1px', width: '40px', background: 'linear-gradient(to right, transparent, var(--gold-light))' }} />
            <span style={{ fontSize: '10px', color: 'var(--gold-primary)' }}>◆</span>
            <div style={{ height: '1px', width: '40px', background: 'linear-gradient(to left, transparent, var(--gold-light))' }} />
          </div>

          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--gold-dark)',
              fontWeight: 600,
              marginBottom: '6px',
            }}
          >
            HONOURING THE MUMMY-TO-BE
          </p>

          <h1
            className="font-display gold-heading"
            style={{
              fontSize: 'clamp(3rem, 12vw, 4.2rem)',
              fontWeight: 500,
              fontStyle: 'italic',
              lineHeight: 1.05,
              margin: '8px 0 16px',
              letterSpacing: '0.01em',
            }}
          >
            Janki
          </h1>

          <p
            className="font-display italic"
            style={{
              fontSize: 'clamp(1.1rem, 4vw, 1.3rem)',
              color: 'var(--ink-secondary)',
              lineHeight: 1.5,
              maxWidth: '420px',
              margin: '0 auto 8px',
            }}
          >
            As Abhishek and Janki prepare to welcome a sweet soul, we warmly invite you to the baby shower
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
