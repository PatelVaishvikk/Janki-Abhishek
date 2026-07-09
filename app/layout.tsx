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
  themeColor: 'hsl(38, 30%, 98%)',
}

export const metadata: Metadata = {
  title: "Baby Shower · Manish & Riddhi",
  description:
    "With full hearts, Manish & Riddhi invite you to celebrate the upcoming arrival of their little one. Join us for an intimate baby shower filled with love, laughter, and blessings.",
  metadataBase: new URL('https://manish-riddhi.vercel.app'),
  openGraph: {
    title: "Baby Shower · Manish & Riddhi",
    description:
      "An intimate celebration of new life. Manish & Riddhi invite you to shower their baby-to-be with love and blessings.",
    url: 'https://manish-riddhi.vercel.app',
    siteName: "Manish & Riddhi — Baby Shower",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Baby Shower Invitation — Manish & Riddhi',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Baby Shower · Manish & Riddhi",
    description:
      "An intimate celebration of new life. Manish & Riddhi invite you to shower their baby-to-be with love and blessings.",
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
