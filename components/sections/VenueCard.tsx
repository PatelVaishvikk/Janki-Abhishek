'use client'

import { useState } from 'react'

const ADDRESS_TEXT = 'Haridham Toronto, 7605 Danbro Crescent, Mississauga, ON L5N 6P9'
const MAP_EMBED = 'https://www.google.com/maps?q=Haridham+Toronto+7605+Danbro+Crescent+Mississauga+ON+L5N+6P9&output=embed'
const MAP_DIR = 'https://www.google.com/maps/dir/?api=1&destination=Haridham+Toronto,+7605+Danbro+Crescent,+Mississauga,+ON+L5N+6P9'
const GCAL_URL = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Baby Shower · Janki & Abhishek')}&dates=20261122T140000Z/20261122T190000Z&details=${encodeURIComponent('Baby Shower Celebration for Janki & Abhishek\nDress Code: Traditional\nKindly, no boxed gifts.\nJay Swaminarayan 🙏')}&location=${encodeURIComponent(ADDRESS_TEXT)}`

export function VenueCard() {
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    navigator.clipboard.writeText(ADDRESS_TEXT)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section className="wedding-card" style={{ padding: '32px 24px', borderRadius: '4px' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <p
          style={{
            fontSize: '10px',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--gold-dark)',
            fontWeight: 600,
            marginBottom: '6px',
          }}
        >
          Venue Location
        </p>
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(1.7rem, 6vw, 2.2rem)',
            fontWeight: 500,
            color: 'var(--ink-primary)',
            marginBottom: '4px',
          }}
        >
          Haridham Toronto
        </h2>
        <p
          style={{
            fontSize: '13px',
            color: 'var(--ink-secondary)',
            lineHeight: 1.6,
            marginBottom: '14px',
          }}
        >
          7605 Danbro Crescent · Mississauga, ON L5N 6P9
        </p>

        <button
          onClick={copyAddress}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--gold-dark)',
            fontWeight: 600,
            cursor: 'pointer',
            padding: '4px 10px',
            borderBottom: '1px solid rgba(163, 122, 62, 0.4)',
          }}
        >
          {copied ? '✓ Address Copied' : 'Copy Full Address'}
        </button>
      </div>

      {/* Embedded Map */}
      <div
        style={{
          overflow: 'hidden',
          aspectRatio: '16/9',
          border: '1px solid var(--gold-border)',
          marginBottom: '20px',
        }}
      >
        <iframe
          src={MAP_EMBED}
          width="100%"
          height="100%"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Venue Map — Haridham Toronto"
        />
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => window.open(MAP_DIR, '_blank', 'noopener')}
          className="btn-primary"
          style={{ flex: 1, minWidth: '160px' }}
        >
          Get Directions
        </button>
        <button
          onClick={() => window.open(GCAL_URL, '_blank', 'noopener')}
          className="btn-secondary"
          style={{ flex: 1, minWidth: '160px' }}
        >
          Add to Calendar
        </button>
      </div>
    </section>
  )
}
