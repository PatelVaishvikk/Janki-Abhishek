'use client'

import dynamic from 'next/dynamic'
import { HeroCard }      from '@/components/sections/HeroCard'
import { BlessingCard }  from '@/components/sections/BlessingCard'
import { DateCard }      from '@/components/sections/DateCard'
import { HostCard }      from '@/components/sections/HostCard'
import { FamilyCard }    from '@/components/sections/FamilyCard'
import { CountdownCard } from '@/components/sections/CountdownCard'
import { RSVPCard }      from '@/components/sections/RSVPCard'
import { VenueCard }     from '@/components/sections/VenueCard'
import { FooterCard }    from '@/components/sections/FooterCard'

const AudioPlayer = dynamic(
  () => import('@/components/ui/AudioPlayer').then((m) => m.AudioPlayer),
  { ssr: false }
)

export default function Home() {
  return (
    <main>
      <AudioPlayer src="/audio/background.mp3" />

      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '16px 16px 48px' }}>
        <HeroCard      entered={true} />
        <BlessingCard  />
        <DateCard      />
        <HostCard      />
        <FamilyCard    />
        <CountdownCard />
        <RSVPCard      />
        <VenueCard     />
        <FooterCard    />
      </div>
    </main>
  )
}
