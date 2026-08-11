/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          dark: '#1E0A0D',
          card: '#2E1216',
          accent: '#8B1E3F',
          hover: '#a3234a',
          deep: '#150709',
          border: 'rgba(139, 30, 63, 0.25)',
        },
        textMain: '#F5F0F1',
        textMuted: '#A89597',
      },
      fontFamily: {
        heading: ["'Cinzel'", "'Playfair Display'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
}
