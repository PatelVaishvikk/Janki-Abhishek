'use client'

export function FooterCard() {
  return (
    <footer
      role="contentinfo"
      style={{
        textAlign: 'center',
        paddingTop: '28px',
        paddingBottom: '20px',
      }}
    >
      <div className="divider-gold" style={{ margin: '0 auto 20px', maxWidth: '240px' }} />

      <p
        className="font-display italic"
        style={{
          fontSize: '1.25rem',
          color: 'var(--ink-secondary)',
          marginBottom: '4px',
        }}
      >
        With humble hearts and love,
      </p>

      <p
        className="font-display gold-heading"
        style={{
          fontSize: 'clamp(1.6rem, 6vw, 2.1rem)',
          fontWeight: 600,
          marginBottom: '14px',
        }}
      >
        Janki &amp; Abhishek
      </p>

      <div style={{ fontSize: '13px', letterSpacing: '0.08em', color: 'var(--gold-dark)', fontWeight: 600 }}>
        🙏 Jay Swaminarayan 🙏
      </div>
    </footer>
  )
}
