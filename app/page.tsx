'use client'

import dynamic from 'next/dynamic'
import { HeroCard } from '@/components/sections/HeroCard'
import { VenueCard } from '@/components/sections/VenueCard'
import { DressCodeCard } from '@/components/sections/DressCodeCard'
import { RSVPCard } from '@/components/sections/RSVPCard'
import { FooterCard } from '@/components/sections/FooterCard'

const AudioPlayer = dynamic(
  () => import('@/components/ui/AudioPlayer').then((m) => m.AudioPlayer),
  { ssr: false }
)

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', padding: '32px 16px 64px' }}>
      <AudioPlayer src="/audio/background.mp3" />

      <div style={{ maxWidth: '580px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <HeroCard />
        <VenueCard />
        <DressCodeCard />
        <RSVPCard />
        <FooterCard />
      </div>
    </main>
  )
}
