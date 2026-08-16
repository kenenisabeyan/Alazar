/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light Burgundy Canvas Theme
        canvas: '#FAFAF9',       // Background (Clean Canvas Off-White)
        brand: {
          DEFAULT: '#6B1D2F',    // Brand Color (Rich Burgundy for headers & buttons)
          hover: '#8B2440',
          deep: '#4A1020',
          soft: '#C59A9F',       // Accent Color (Soft Rose for highlights/borders)
          faint: '#F5E8EA',
        },
        charcoal: '#1C1917',     // Primary Text (Charcoal for readability)
        slate: '#78716C',        // Secondary Text (Muted Slate)

        // Dark Burgundy Night Theme
        burgundy: {
          DEFAULT: '#1E0A0D',    // Primary Background (Deep Dark Burgundy)
          dark: '#1E0A0D',       // Primary Background (Deep Dark Burgundy)
          card: '#2E1216',       // Secondary Background (Card/Sections)
          accent: '#8B1E3F',     // Accent Color (Bright Rose Burgundy)
          hover: '#A3234A',
          border: 'rgba(139, 30, 63, 0.25)',
        },
        textMain: '#F5F0F1',     // Primary Text (Off-White)
        textMuted: '#A89597',    // Secondary Text (Muted Rose-Gray)
      },
      fontFamily: {
        sans: ["'Roboto'", "sans-serif"],
        heading: ["'Roboto'", "sans-serif"],
        body: ["'Roboto'", "sans-serif"],
      },
    },
  },
  plugins: [],
}
