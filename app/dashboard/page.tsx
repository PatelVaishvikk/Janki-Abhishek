'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface RSVP {
  _id: string
  name: string
  attending: 'yes' | 'no'
  guestCount?: number
  message?: string
  submittedAt: string
  ip: string
  source: string
}

export default function Dashboard() {
  const [passcode, setPasscode] = useState('')
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [passcodeError, setPasscodeError] = useState('')
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'yes' | 'no'>('all')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Check if passcode is saved in local storage on mount
  useEffect(() => {
    const savedPasscode = localStorage.getItem('dashboard_passcode')
    if (savedPasscode) {
      fetchRSVPs(savedPasscode)
    }
  }, [])

  const fetchRSVPs = async (codeToUse: string) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/rsvps', {
        headers: {
          'x-passcode': codeToUse
        }
      })
      if (res.ok) {
        const result = await res.json()
        setRsvps(result.data || [])
        setIsAuthorized(true)
        localStorage.setItem('dashboard_passcode', codeToUse)
      } else {
        const errData = await res.json()
        setPasscodeError(errData.message || 'Invalid passcode')
        localStorage.removeItem('dashboard_passcode')
      }
    } catch (err) {
      setError('Failed to load RSVPs. Please check your network connection.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setPasscodeError('')
    if (!passcode) {
      setPasscodeError('Please enter the passcode')
      return
    }
    fetchRSVPs(passcode)
  }

  const handleLogout = () => {
    localStorage.removeItem('dashboard_passcode')
    setIsAuthorized(false)
    setPasscode('')
    setRsvps([])
  }

  // Calculate statistics
  const totalResponses = rsvps.length
  const attendingResponses = rsvps.filter(r => r.attending === 'yes')
  const declinedResponses = rsvps.filter(r => r.attending === 'no')
  
  // Total guests count is sum of guestCount for attending responses (if field exists, otherwise default to 1)
  const totalGuestsCount = attendingResponses.reduce((sum, r) => sum + (r.guestCount || 1), 0)

  // Filtered RSVPs
  const filteredRsvps = rsvps.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (r.message && r.message.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || r.attending === statusFilter
    return matchesSearch && matchesStatus
  })

  // Format date helper
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr)
      return d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateStr
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this RSVP?')) return

    setDeletingId(id)
    try {
      const code = passcode || localStorage.getItem('dashboard_passcode') || ''
      const res = await fetch(`/api/admin/rsvps?id=${id}`, {
        method: 'DELETE',
        headers: {
          'x-passcode': code
        }
      })
      if (res.ok) {
        setRsvps(prev => prev.filter(r => r._id !== id))
      } else {
        const errData = await res.json()
        alert(errData.message || 'Failed to delete RSVP')
      }
    } catch (err) {
      alert('Network error. Failed to delete RSVP.')
    } finally {
      setDeletingId(null)
    }
  }

  if (!isAuthorized) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', background: 'var(--cream)' }}>
        <div className="card gold-border" style={{ width: '100%', maxWidth: '400px', padding: '32px 24px', background: 'rgba(255,255,255,0.85)' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '40px' }} role="img" aria-label="lock">🔒</span>
            <h1 className="font-display" style={{ fontSize: '28px', color: 'hsl(38,18%,22%)', marginTop: '12px', fontWeight: 600 }}>Dashboard Access</h1>
            <p style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>Enter the administrator passcode to view guest details.</p>
          </div>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="passcode-input" style={{ fontSize: '12px', fontWeight: 500, color: 'var(--ink-muted)' }}>Passcode</label>
              <input
                id="passcode-input"
                type="password"
                className="field-input"
                placeholder="Enter passcode (default: 12345)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
              />
              {passcodeError && (
                <p role="alert" style={{ fontSize: '12px', color: 'hsl(355,65%,50%)', marginTop: '4px' }}>⚠ {passcodeError}</p>
              )}
            </div>
            
            <button type="submit" disabled={loading} className="pill-btn pill-btn-gold" style={{ width: '100%', padding: '12px' }}>
              {loading ? 'Verifying...' : 'Unlock Dashboard 🔑'}
            </button>
          </form>
          
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link href="/" style={{ fontSize: '13px', color: 'var(--gold-dark)', textDecoration: 'none', fontWeight: 500 }}>
              ← Back to Invitation
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', padding: '24px 16px 64px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', gap: '16px' }}>
          <div>
            <h1 className="font-display gold-heading" style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 600 }}>Guest Directory</h1>
            <p style={{ fontSize: '14px', color: 'var(--ink-secondary)' }}>Real-time RSVP responses for Janki &amp; Abhishek&apos;s Baby Shower</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/" className="pill-btn pill-btn-outline" style={{ padding: '8px 16px', fontSize: '13px', textDecoration: 'none' }}>
              View Invite
            </Link>
            <button onClick={handleLogout} className="pill-btn" style={{ background: 'hsl(38, 10%, 88%)', color: 'var(--ink)', padding: '8px 16px', fontSize: '13px' }}>
              Lock Out
            </button>
          </div>
        </div>

        {/* Statistics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          
          <div className="card" style={{ padding: '20px', background: '#fff', border: '1px solid rgba(180,140,60,0.15)' }}>
            <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink-muted)', fontWeight: 500 }}>Total Responses</p>
            <p style={{ fontSize: '36px', fontWeight: 600, color: 'var(--ink)', marginTop: '4px', fontFamily: 'var(--font-cormorant)' }}>{totalResponses}</p>
          </div>

          <div className="card" style={{ padding: '20px', background: '#fff', border: '1px solid rgba(180,140,60,0.15)' }}>
            <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'hsl(140,50%,30%)', fontWeight: 500 }}>Attending</p>
            <p style={{ fontSize: '36px', fontWeight: 600, color: 'hsl(140,55%,36%)', marginTop: '4px', fontFamily: 'var(--font-cormorant)' }}>
              {attendingResponses.length} <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--ink-muted)' }}>replies</span>
            </p>
          </div>

          <div className="card" style={{ padding: '20px', background: '#fff', border: '1px solid rgba(180,140,60,0.15)' }}>
            <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'hsl(355,50%,38%)', fontWeight: 500 }}>Declined</p>
            <p style={{ fontSize: '36px', fontWeight: 600, color: 'hsl(355,55%,48%)', marginTop: '4px', fontFamily: 'var(--font-cormorant)' }}>{declinedResponses.length}</p>
          </div>

          <div className="card" style={{ padding: '20px', background: '#fff', border: '1px solid rgba(180,140,60,0.15)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '60px', opacity: 0.1, pointerEvents: 'none' }}>🎉</div>
            <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--gold-dark)', fontWeight: 500 }}>Total Expected Guests</p>
            <p style={{ fontSize: '36px', fontWeight: 600, color: 'var(--gold-dark)', marginTop: '4px', fontFamily: 'var(--font-cormorant)' }}>{totalGuestsCount}</p>
          </div>

        </div>

        {/* Filters & Search Control */}
        <div className="card" style={{ padding: '16px', background: 'rgba(255,255,255,0.7)', marginBottom: '24px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Search bar */}
          <div style={{ flex: '1', minWidth: '260px', position: 'relative' }}>
            <input
              type="text"
              placeholder="🔍 Search guests by name or message..."
              className="field-input"
              style={{ paddingLeft: '16px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter pills */}
          <div style={{ display: 'flex', background: 'hsl(40,15%,90%)', padding: '4px', borderRadius: '999px', gap: '4px' }}>
            {(['all', 'yes', 'no'] as const).map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => setStatusFilter(opt)}
                style={{
                  padding: '6px 16px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  background: statusFilter === opt ? 'var(--gold-dark)' : 'transparent',
                  color: statusFilter === opt ? '#fff' : 'var(--ink-muted)',
                  transition: 'all 0.2s ease'
                }}
              >
                {opt === 'all' ? 'All' : opt === 'yes' ? 'Attending' : "Declined"}
              </button>
            ))}
          </div>
        </div>

        {/* Guest List Grid/Table */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[1, 2, 3].map(n => (
              <div key={n} className="card shimmer" style={{ height: '80px', borderRadius: '16px' }} />
            ))}
          </div>
        ) : error ? (
          <div className="card" style={{ padding: '24px', background: 'hsl(355,60%,97%)', border: '1px solid hsl(355,60%,85%)', color: 'hsl(355,60%,40%)', textAlign: 'center' }}>
            <p>{error}</p>
          </div>
        ) : filteredRsvps.length === 0 ? (
          <div className="card" style={{ padding: '48px 24px', textAlign: 'center', background: '#fff' }}>
            <span style={{ fontSize: '48px' }}>🍂</span>
            <p style={{ marginTop: '12px', color: 'var(--ink-muted)', fontSize: '15px' }}>No RSVP responses match your filters.</p>
          </div>
        ) : (
          <div className="card" style={{ background: '#fff', overflow: 'hidden', padding: '0px' }}>
            
            {/* Desktop Table View */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                <thead>
                  <tr style={{ background: 'hsl(42, 35%, 96%)', borderBottom: '1px solid hsl(42, 25%, 88%)' }}>
                    <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 600, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</th>
                    <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 600, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>RSVP</th>
                    <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 600, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Guests</th>
                    <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 600, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Wishes / Blessings</th>
                    <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 600, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date Submitted</th>
                    <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 600, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Data Source</th>
                    <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 600, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRsvps.map((rsvp, idx) => (
                    <tr key={rsvp._id} style={{ borderBottom: idx === filteredRsvps.length - 1 ? 'none' : '1px solid hsl(40,10%,92%)', transition: 'background-color 0.15s' }}>
                      
                      {/* Name */}
                      <td style={{ padding: '16px 20px', fontWeight: 500, color: 'var(--ink)' }}>{rsvp.name}</td>
                      
                      {/* Status */}
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          fontSize: '12px',
                          fontWeight: 500,
                          background: rsvp.attending === 'yes' ? 'hsl(140,55%,93%)' : 'hsl(355,55%,95%)',
                          color: rsvp.attending === 'yes' ? 'hsl(140,60%,28%)' : 'hsl(355,55%,45%)'
                        }}>
                          {rsvp.attending === 'yes' ? '✓ Attending' : '✕ Declined'}
                        </span>
                      </td>
                      
                      {/* Guest Count */}
                      <td style={{ padding: '16px 20px', color: 'var(--ink-muted)' }}>
                        {rsvp.attending === 'yes' ? (rsvp.guestCount || 1) : '-'}
                      </td>
                      
                      {/* Message */}
                      <td style={{ padding: '16px 20px', color: 'var(--ink-muted)', fontSize: '13.5px', maxWidth: '300px', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                        {rsvp.message ? (
                          <span>&ldquo;{rsvp.message}&rdquo;</span>
                        ) : (
                          <span style={{ fontStyle: 'italic', opacity: 0.5 }}>No message left</span>
                        )}
                      </td>
                      
                      {/* Date */}
                      <td style={{ padding: '16px 20px', color: 'var(--ink-faint)', fontSize: '13px' }}>
                        {formatDate(rsvp.submittedAt)}
                      </td>

                      {/* Source */}
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{
                          fontSize: '11px',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: rsvp.source === 'mongodb' ? 'hsl(200,60%,92%)' : 'hsl(38,50%,92%)',
                          color: rsvp.source === 'mongodb' ? 'hsl(200,65%,32%)' : 'hsl(38,60%,32%)',
                          fontWeight: 500,
                          textTransform: 'uppercase'
                        }}>
                          {rsvp.source === 'mongodb' ? 'Cloud Atlas' : 'Local File'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                        <button
                          onClick={() => handleDelete(rsvp._id)}
                          disabled={deletingId === rsvp._id}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'hsl(355, 65%, 50%)',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: 500,
                            padding: '4px 8px',
                            borderRadius: '4px',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'hsl(355, 60%, 96%)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          {deletingId === rsvp._id ? 'Deleting...' : '🗑 Delete'}
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}
