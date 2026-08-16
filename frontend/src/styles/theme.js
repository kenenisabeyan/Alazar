// Alazar Video Grapher Burgundy Color Palettes
export const theme = {
  // Light Burgundy Canvas Palette (Default)
  colors: {
    background: '#FAFAF9',       // Background (Clean Canvas Off-White)
    brand: '#6B1D2F',            // Brand Color (Rich Burgundy for headers & buttons)
    accent: '#6B1D2F',           // Rich Burgundy signature
    accentSoft: '#C59A9F',       // Accent Color (Soft Rose for highlights/borders)
    accentHover: '#8B2440',      // Lighter burgundy for hover
    accentLight: '#F5E8EA',      // Faintest tint — backgrounds & badges
    cardBg: '#FFFFFF',           // Pure White for cards
    surfaceAlt: '#F4F0EF',       // Warm off-white sections
    text: '#1C1917',             // Primary Text (Charcoal for readability)
    textMuted: '#78716C',        // Secondary Text (Muted Slate)
    border: '#E5D9DB',           // Soft burgundy-tinted border

    // Dark Burgundy Night Palette
    dark: {
      backgroundPrimary: '#1E0A0D',   // Primary Background (Deep Dark Burgundy)
      backgroundSecondary: '#2E1216', // Secondary Background (Card/Sections)
      accent: '#8B1E3F',              // Accent Color (Bright Rose Burgundy)
      accentHover: '#A3234A',
      textPrimary: '#F5F0F1',         // Primary Text (Off-White)
      textSecondary: '#A89597',       // Secondary Text (Muted Rose-Gray)
      border: 'rgba(139, 30, 63, 0.25)',
    }
  },
  fonts: {
    heading: "'Roboto', sans-serif",
    body: "'Roboto', sans-serif"
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
