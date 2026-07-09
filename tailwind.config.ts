import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary: Warm marigold gold (HSL 38, 85%)
        primary: {
          50:  'hsl(38, 90%, 97%)',
          100: 'hsl(38, 85%, 92%)',
          200: 'hsl(38, 82%, 82%)',
          300: 'hsl(38, 80%, 72%)',
          400: 'hsl(38, 78%, 62%)',
          500: 'hsl(38, 85%, 52%)',  // main gold
          600: 'hsl(38, 88%, 42%)',
          700: 'hsl(38, 85%, 32%)',
          800: 'hsl(38, 80%, 22%)',
          900: 'hsl(38, 75%, 14%)',
        },
        // Accent: Royal violet / Krishna blue-violet
        accent: {
          50:  'hsl(265, 60%, 97%)',
          100: 'hsl(265, 55%, 90%)',
          200: 'hsl(265, 55%, 78%)',
          300: 'hsl(265, 55%, 65%)',
          400: 'hsl(265, 58%, 52%)',
          500: 'hsl(265, 60%, 42%)',  // main violet
          600: 'hsl(265, 62%, 34%)',
          700: 'hsl(265, 60%, 26%)',
          800: 'hsl(265, 55%, 18%)',
          900: 'hsl(265, 50%, 12%)',
        },
        // Neutral: warm parchment scale
        neutral: {
          50:  'hsl(38, 30%, 98%)',
          100: 'hsl(38, 25%, 95%)',
          200: 'hsl(38, 20%, 88%)',
          300: 'hsl(38, 15%, 78%)',
          400: 'hsl(38, 12%, 65%)',
          500: 'hsl(38, 10%, 50%)',
          600: 'hsl(38, 10%, 38%)',
          700: 'hsl(38, 12%, 28%)',
          800: 'hsl(38, 15%, 18%)',
          900: 'hsl(38, 18%, 10%)',
        },
        // Rose / pink accent (Radha's color — use sparingly)
        rose: {
          300: 'hsl(340, 75%, 75%)',
          400: 'hsl(340, 72%, 62%)',
          500: 'hsl(340, 70%, 52%)',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        // 8pt scale
        '0.5': '4px',
        '1':   '8px',
        '1.5': '12px',
        '2':   '16px',
        '3':   '24px',
        '4':   '32px',
        '6':   '48px',
        '8':   '64px',
        '12':  '96px',
        '16':  '128px',
      },
      maxWidth: {
        'invite': '480px',
        'content': '680px',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'count-flip': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(-8px)', opacity: '0' },
          '51%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        'fade-up':    'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in':    'fade-in 0.5s ease-out forwards',
        'scale-in':   'scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer':    'shimmer 2s linear infinite',
        'count-flip': 'count-flip 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-soft': 'pulse-soft 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
