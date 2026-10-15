/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './public/index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  darkMode: 'class',   // toggled by adding/removing class="dark" on <html>

  theme: {
    extend: {
      screens: {
        'xs': '420px',
      },

      // ── CSS-var-driven color tokens ─────────────────────────────────────
      // Every token maps to the CSS variable declared in index.css,
      // so light ↔ dark switches happen automatically site-wide.
      colors: {

        // ── Light canvas palette (Alazar brief) ──────────────────────────
        canvas: '#FAFAF9',   // Clean Canvas Off-White
        cream: '#F4F0EF',   // Warm cream surface
        'off-white': '#FAFAF9',

        brand: {
          DEFAULT: '#6B1D2F',     // Rich Burgundy — signature color
          hover: '#8B2440',     // Hover state
          deep: '#4A1020',     // Pressed / ultra-dark
          soft: '#C59A9F',     // Soft Rose — borders & highlights
          faint: '#F5E8EA',     // Ultra-light rose tint
        },

        charcoal: '#1C1917', // Primary text
        'slate-muted': '#78716C', // Secondary text

        // ── Dark burgundy night palette (Alazar brief) ───────────────────
        dark: {
          primary: '#1E0A0D',   // Deep Dark Burgundy bg
          secondary: '#2E1216',   // Card / section bg
          surface: '#3A161C',   // Slightly lighter surface
          accent: '#8B1E3F',   // Bright Rose Burgundy
          hover: '#A3234A',   // Hover
          border: 'rgba(139, 30, 63, 0.25)',
        },

        'text-main': '#F5F0F1',  // Off-White  (dark mode primary text)
        'text-muted': '#A89597',  // Muted Rose-Gray (dark mode secondary text)

        // ── Shared border colors ─────────────────────────────────────────
        border: {
          DEFAULT: '#E5D9DB',
          brand: 'rgba(107, 29, 47, 0.30)',
        },
      },

      // ── Typography ───────────────────────────────────────────────────────
      fontFamily: {
        sans: ["'Roboto'", 'sans-serif'],
        heading: ["'Roboto'", 'sans-serif'],
        body: ["'Roboto'", 'sans-serif'],
      },

      // ── Box shadows — branded ────────────────────────────────────────────
      boxShadow: {
        'brand-sm': '0 4px 14px -2px rgba(107, 29, 47, 0.18)',
        'brand-md': '0 10px 30px -5px rgba(107, 29, 47, 0.25)',
        'brand-lg': '0 20px 50px -10px rgba(107, 29, 47, 0.30)',
        'brand-xl': '0 30px 60px -15px rgba(107, 29, 47, 0.35)',
        'dark-sm': '0 4px 14px -2px rgba(0, 0, 0, 0.40)',
        'dark-md': '0 10px 30px -5px rgba(0, 0, 0, 0.50)',
        'dark-lg': '0 20px 50px -10px rgba(0, 0, 0, 0.60)',
      },

      // ── Backgrounds ───────────────────────────────────────────────────────
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #6B1D2F 0%, #8B2440 50%, #C59A9F 100%)',
        'brand-gradient-dark': 'linear-gradient(135deg, #8B1E3F 0%, #A3234A 50%, #A89597 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, #F5E8EA 0%, #FAFAF9 100%)',
      },

      // ── Border radius ─────────────────────────────────────────────────────
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // ── Transitions ───────────────────────────────────────────────────────
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce-in': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },

  plugins: [],
};
