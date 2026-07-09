# Manish & Riddhi — Baby Shower Invitation Site

A bespoke, mobile-first digital invitation for Manish & Riddhi's baby shower.

## Tech Stack
- **Next.js 14** App Router, TypeScript strict mode
- **Tailwind CSS** with custom design token system
- **Framer Motion** for scroll reveals and transitions
- **MongoDB** for RSVP storage
- **react-hook-form + zod** for validated forms

## Event Details
- **Date:** Sunday, 16th August 2026
- **Time:** 9:30 AM
- **Venue:** Manek Chowk, 763–765 Harrow Road, Wembley HA0 2LW

## Getting Started

1. **Add your MongoDB URI:**
   ```
   # .env.local
   MONGODB_URI=mongodb+srv://...
   ```

2. **Run the dev server:**
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## Assets
- `public/images/radha-krishna.png` — Radha-Krishna illustration
- `public/images/poster.jpg` — Original invitation poster
- `public/audio/background.mp3` — Background music (Nanha Sa Mehmaan)

## Project Structure
```
app/
  layout.tsx        # Root layout + fonts + OG meta
  page.tsx          # Main page (all sections)
  not-found.tsx     # 404 page
  api/rsvp/         # RSVP API route → MongoDB
components/
  primitives/       # Button, Input, Section
  sections/         # All 10 invite sections
  ui/               # AudioPlayer, CountdownUnit, RSVPPill
lib/
  mongodb.ts        # DB connection singleton
  utils.ts          # cn() utility
```
