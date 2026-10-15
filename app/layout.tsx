import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#FAF7F2',
}

export const metadata: Metadata = {
  title: 'Baby Shower Celebration · Janki & Abhishek',
  description:
    'A little bundle of joy is on the way! Join us for a beautiful baby shower celebration honouring Janki & Abhishek on Sunday, November 22, 2026 at Haridham Toronto. 🙏 Jay Swaminarayan 🙏 Das na das 🙏',
  metadataBase: new URL('https://janki-abhishek.vercel.app'),
  openGraph: {
    title: 'Baby Shower Celebration · Janki & Abhishek',
    description:
      'A little bundle of joy is on the way! Join us to celebrate Janki & Abhishek on Sunday, November 22, 2026 at Haridham Toronto.',
    url: 'https://janki-abhishek.vercel.app',
    siteName: 'Janki & Abhishek — Baby Shower',
    locale: 'en_CA',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
