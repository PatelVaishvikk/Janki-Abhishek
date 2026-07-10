'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function Footer() {
  return (
    <footer
      className="w-full px-5 py-12 flex flex-col items-center text-center border-t border-primary-100"
      role="contentinfo"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-4"
      >
        {/* Mini Radha-Krishna */}
        <Image
          src="/images/radha-krishna.png"
          alt=""
          width={72}
          height={72}
          className="opacity-70"
          aria-hidden="true"
        />

        {/* Ornament */}
        <div className="divider-ornament w-32" aria-hidden="true">
          <span className="text-primary-300 text-base">✦</span>
        </div>

        {/* Names */}
        <p className="font-display text-2xl text-neutral-700">
          Manish <span className="text-primary-400 font-light italic">&</span> Riddhi
        </p>

        {/* Date */}
        <p className="text-subheading text-neutral-400">
          Sunday, 16th August 2026
        </p>

        {/* Venue recap */}
        <p className="text-xs text-neutral-400 max-w-[24ch] leading-relaxed">
          Manek Chowk<br />
          763–765 Harrow Road<br />Wembley, HA0 2LW<br />United Kingdom
        </p>

        {/* Ornament */}
        <div className="divider-ornament w-32 mt-2" aria-hidden="true">
          <span className="text-primary-200 text-xs">✦</span>
        </div>

        {/* Credit */}
        <p className="text-[11px] text-neutral-300 mt-1">
          Made with love for a very special occasion
        </p>
      </motion.div>
    </footer>
  )
}
