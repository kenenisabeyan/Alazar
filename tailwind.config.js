/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light Elegant Palette
        canvas: '#FAFAF9',       // Page background — clean off-white
        surface: '#FFFFFF',      // Card/section surface — pure white
        'surface-alt': '#F4F0EF', // Subtle alt sections — warm off-white
        burgundy: {
          DEFAULT: '#6B1D2F',    // Rich Burgundy — brand signature
          light: '#8B2440',      // Lighter burgundy for hover
          deep: '#4A1020',       // Deep shade for pressed states
          soft: '#C59A9F',       // Soft rose — highlights & borders
          faint: '#F5E8EA',      // Faintest tint — backgrounds & badges
        },
        charcoal: '#1C1917',     // Primary text
        slate: '#78716C',        // Secondary / muted text
        border: '#E5D9DB',       // Soft burgundy-tinted border
      },
      fontFamily: {
        sans: ["var(--font-roboto)", "Roboto", "sans-serif"],
        heading: ["var(--font-roboto)", "Roboto", "sans-serif"],
        body: ["var(--font-roboto)", "Roboto", "sans-serif"],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        }
      },
      boxShadow: {
        'burgundy-sm': '0 2px 12px rgba(107, 29, 47, 0.12)',
        'burgundy-md': '0 6px 32px rgba(107, 29, 47, 0.18)',
        'burgundy-lg': '0 12px 48px rgba(107, 29, 47, 0.22)',
        'card': '0 1px 6px rgba(28, 25, 23, 0.06), 0 4px 16px rgba(28, 25, 23, 0.04)',
      }
    },
  },
  plugins: [],
}
