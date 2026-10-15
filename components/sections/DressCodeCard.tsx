'use client'

export function DressCodeCard() {
  return (
    <section className="wedding-card" style={{ padding: '32px 24px', borderRadius: '4px', textAlign: 'center' }}>
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
        Celebration Details
      </p>

      <h2
        className="font-display"
        style={{
          fontSize: 'clamp(1.6rem, 6vw, 2.1rem)',
          fontWeight: 500,
          color: 'var(--ink-primary)',
          marginBottom: '8px',
        }}
      >
        Traditional Indian Attire
      </h2>

      <p
        style={{
          fontSize: '13px',
          color: 'var(--ink-secondary)',
          lineHeight: 1.6,
          maxWidth: '380px',
          margin: '0 auto 20px',
        }}
      >
        We kindly request our beloved guests to grace the auspicious ceremony in traditional Indian attire.
      </p>

      <div className="divider-gold" style={{ margin: '18px auto', maxWidth: '200px' }} />

      <p
        style={{
          fontSize: '12px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--gold-dark)',
          fontWeight: 600,
        }}
      >
        Kindly, No Boxed Gifts
      </p>
    </section>
  )
}
