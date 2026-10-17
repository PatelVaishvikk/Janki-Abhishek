'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { RoyalEnvelopeSplash } from '@/components/sections/RoyalEnvelopeSplash'
import { RoyalPetalShower } from '@/components/ui/RoyalPetalShower'
import { HeroCard } from '@/components/sections/HeroCard'
import { CountdownCard } from '@/components/sections/CountdownCard'
import { VenueCard } from '@/components/sections/VenueCard'
import { DressCodeCard } from '@/components/sections/DressCodeCard'
import { RSVPCard } from '@/components/sections/RSVPCard'
import { FooterCard } from '@/components/sections/FooterCard'

const AudioPlayer = dynamic(
  () => import('@/components/ui/AudioPlayer').then((m) => m.AudioPlayer),
  { ssr: false }
)

export default function Home() {
  const [hasOpened, setHasOpened] = useState(false)

  return (
    <main style={{ minHeight: '100vh', padding: '32px 16px 64px' }}>
      {/* Luxury Royal Stationery Envelope Opening Experience */}
      <RoyalEnvelopeSplash onOpen={() => setHasOpened(true)} />

      {/* Dainty Botanical Rose Petal Shower */}
      <RoyalPetalShower active={true} />

      {/* Background Devotional Shehnai / Music */}
      <AudioPlayer src="/audio/background.mp3" />

      {/* Main Luxury Invitation Stationery Cards */}
      <div style={{ maxWidth: '580px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <HeroCard />
        <CountdownCard />
        <VenueCard />
        <DressCodeCard />
        <RSVPCard />
        <FooterCard />
      </div>
    </main>
  )
}
