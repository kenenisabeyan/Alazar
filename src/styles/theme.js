// Alazar Video Grapher Burgundy Color Palettes
export const theme = {
  // Dark Burgundy Night Theme (Primary)
  colors: {
    background: '#1E0A0D',        // Primary Background (Deep Dark Burgundy)
    cardBg: '#2E1216',            // Secondary Background (Card/Sections)
    accent: '#8B1E3F',            // Accent Color (Bright Rose Burgundy)
    accentHover: '#A3234A',
    accentLight: 'rgba(139, 30, 63, 0.15)',
    text: '#F5F0F1',              // Primary Text (Off-White)
    textMuted: '#A89597',         // Secondary Text (Muted Rose-Gray)
    border: 'rgba(139, 30, 63, 0.25)',
    borderAccent: 'rgba(139, 30, 63, 0.4)',

    // Light Burgundy Canvas Theme
    light: {
      background: '#FAFAF9',       // Background (Clean Canvas Off-White)
      brand: '#6B1D2F',            // Brand Color (Rich Burgundy for headers & buttons)
      accent: '#C59A9F',           // Accent Color (Soft Rose for highlights/borders)
      text: '#1C1917',             // Primary Text (Charcoal for readability)
      textMuted: '#78716C',        // Secondary Text (Muted Slate)
      border: '#E5D9DB',
    }
  },
  fonts: {
    heading: "'Outfit', 'Cinzel', 'Playfair Display', serif",
    body: "'Plus Jakarta Sans', 'Inter', sans-serif"
  }
};

export const darkTheme = {
  background: '#1E0A0D',        // Primary Background (Deep Dark Burgundy)
  cardBg: '#2E1216',            // Secondary Background (Card/Sections)
  accent: '#8B1E3F',            // Accent Color (Bright Rose Burgundy)
  text: '#F5F0F1',              // Primary Text (Off-White)
  textMuted: '#A89597',         // Secondary Text (Muted Rose-Gray)
  border: 'rgba(139, 30, 63, 0.25)',
};

export const lightTheme = {
  background: '#FAFAF9',        // Background (Clean Canvas Off-White)
  brand: '#6B1D2F',             // Brand Color (Rich Burgundy for headers & buttons)
  accent: '#C59A9F',            // Accent Color (Soft Rose for highlights/borders)
  text: '#1C1917',              // Primary Text (Charcoal for readability)
  textMuted: '#78716C',         // Secondary Text (Muted Slate)
  border: '#E5D9DB',
};

export default theme;
