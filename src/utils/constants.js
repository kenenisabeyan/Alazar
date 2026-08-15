export const theme = {
  // Dark Burgundy Night Theme (Primary)
  colors: {
    background: '#1E0A0D',     // Primary Background (Deep Dark Burgundy)
    cardBg: '#2E1216',         // Secondary Background (Card/Sections)
    accent: '#8B1E3F',         // Accent Color (Bright Rose Burgundy)
    text: '#F5F0F1',           // Primary Text (Off-White)
    textMuted: '#A89597',      // Secondary Text (Muted Rose-Gray)
    border: 'rgba(139, 30, 63, 0.25)',

    // Light Burgundy Canvas Theme
    light: {
      background: '#FAFAF9',   // Background (Clean Canvas Off-White)
      brand: '#6B1D2F',        // Brand Color (Rich Burgundy for headers & buttons)
      accent: '#C59A9F',       // Accent Color (Soft Rose for highlights/borders)
      text: '#1C1917',         // Primary Text (Charcoal for readability)
      textMuted: '#78716C',    // Secondary Text (Muted Slate)
      border: '#E5D9DB',
    }
  },
  fonts: {
    heading: "'Outfit', 'Cinzel', 'Playfair Display', serif",
    body: "'Plus Jakarta Sans', 'Inter', sans-serif"
  }
};

export const portfolioProjects = [
  {
    id: 1,
    title: "Urban Echoes",
    category: "video",
    client: "Vanguard Apparel",
    thumbnail: "https://images.unsplash.com/photo-1604998103924-89e012e5265a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    description: "A fast-paced video for Vanguard's Fall collection. Focuses on movement, rhythm, and a clean color style.",
    role: "Lead Video Editor & Colorist",
    deliverables: ["60s Video Reel", "3x Short Social Clips", "Full Audio Mix"],
    year: "2025"
  },
  {
    id: 2,
    title: "Lumina Brand Identity",
    category: "design",
    client: "Lumina Tech",
    thumbnail: "https://images.unsplash.com/photo-1626785773579-c93818bb51d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    videoUrl: null,
    description: "A complete brand redesign for a modern tech company. Built to create a simple, clean look that stands out clearly.",
    role: "Art Director & Graphic Designer",
    deliverables: ["Logo System & Guide", "Brand Strategy Book", "UI Kit & Fonts"],
    year: "2024"
  },
  {
    id: 3,
    title: "The Craftsman",
    category: "video",
    client: "Oak & Iron",
    thumbnail: "https://images.unsplash.com/photo-1535016120720-40c746a480d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    description: "A short documentary following a master woodworker. Focuses on clear storytelling, natural sound, and warm colors.",
    role: "Cinematographer & Editor",
    deliverables: ["3-Minute Short Film", "Audio Mixing", "Color Grading"],
    year: "2025"
  },
  {
    id: 4,
    title: "AURA Festival",
    category: "design",
    client: "AURA Music Group",
    thumbnail: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    videoUrl: null,
    description: "Poster designs for an electronic music festival, using bold colors and clean 3D graphics.",
    role: "Visual & Poster Designer",
    deliverables: ["Main Art Posters", "3D Motion Graphics", "Social Banners"],
    year: "2024"
  },
  {
    id: 5,
    title: "Velocity Luxury Car",
    category: "video",
    client: "Apex Motors",
    thumbnail: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    description: "An energetic commercial edit for a sports car launch, featuring smooth timing, clear sound sync, and sleek colors.",
    role: "Lead Editor",
    deliverables: ["30s Video Spot", "Social Teasers", "Sound Design"],
    year: "2025"
  },
  {
    id: 6,
    title: "Noir Editorial Spreads",
    category: "design",
    client: "Studio One Magazine",
    thumbnail: "https://images.unsplash.com/photo-1588636156711-b0728cce7230?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    videoUrl: null,
    description: "Page layouts for a fashion magazine spread, built with clean grids and strong typography.",
    role: "Editorial & Layout Designer",
    deliverables: ["16-Page Print Spread", "Font System", "Digital Press Kit"],
    year: "2024"
  }
];

export const statistics = [
  { value: "8+", label: "Years Experience" },
  { value: "140+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12", label: "Industry Awards" }
];

export const testimonials = [
  {
    id: 1,
    quote: "Alazar's video work made our brand look amazing. The pacing and color work on our campaign exceeded all expectations.",
    author: "Elena Rostova",
    title: "Creative Director",
    company: "Vanguard Apparel",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    quote: "Working with Alazar on the Lumina rebranding was easy and smooth. He combines graphic design and video editing seamlessly.",
    author: "Marcus Chen",
    title: "Founder & CEO",
    company: "Lumina Tech",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    quote: "The audio mixing and color work on 'The Craftsman' brought our story to life. Truly great work from start to finish.",
    author: "David Thorne",
    title: "Executive Producer",
    company: "Oak & Iron Media",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  }
];

export const faqs = [
  {
    q: "How long does a video project take?",
    a: "Most video edits take between 5 to 10 business days depending on the project length and revision needs."
  },
  {
    q: "Do you work remotely or on location?",
    a: "Both! Remote video editing, color grading, sound mixing, and graphic design are available worldwide. On-set filming is available locally and for travel assignments."
  },
  {
    q: "How do we start a project together?",
    a: "Simply send a message using my Contact form or email me directly at hello@alazar.com with your project goals and timeline."
  }
];

export const socialLinks = [
  { name: "Instagram", url: "https://instagram.com", icon: "Instagram" },
  { name: "Twitter", url: "https://twitter.com", icon: "Twitter" },
  { name: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
  { name: "Email", url: "mailto:hello@alazar.com", icon: "Mail" }
];

