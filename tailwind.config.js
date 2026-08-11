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
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
