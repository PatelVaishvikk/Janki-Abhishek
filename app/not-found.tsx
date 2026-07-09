import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[hsl(38,30%,98%)]">
      <p className="text-6xl mb-6" aria-hidden="true">🌸</p>
      <h1 className="font-display text-3xl text-neutral-700 mb-3">
        Page not found
      </h1>
      <p className="text-neutral-500 text-sm mb-8 max-w-[28ch]">
        This page doesn&apos;t exist, but the celebration certainly does.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      >
        Back to the invite
      </Link>
    </main>
  )
}
