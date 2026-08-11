import { Project, Statistic, Testimonial, FAQ, ThemeConfig } from '@/types/portfolio';

export const theme: ThemeConfig = {
  colors: {
    background: '#1E0A0D',     
    cardBg: '#2E1216',         
    accent: '#8B1E3F',         
    text: '#F5F0F1',           
    textMuted: '#A89597',      
  },
  fonts: {
    heading: "'Cinzel', 'Playfair Display', serif",
    body: "'Inter', sans-serif"
  }
};

export const portfolioProjects: Project[] = [
  {
    id: 1,
    title: "Urban Echoes",
    category: "video",
    client: "Vanguard Apparel",
    thumbnail: "https://images.unsplash.com/photo-1604998103924-89e012e5265a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    description: "A fast-paced, documentary-style lookbook for Vanguard's Fall collection. Focused on kinetic movement, rhythmic cuts matched to an underground beat, and a moody, high-contrast color grade.",
    role: "Lead Video Editor & Colorist",
    deliverables: ["60s Commercial Reel", "3x 15s Instagram Reels", "Full Sound Design Mix"],
    year: "2025"
  },
  {
    id: 2,
    title: "Lumina Brand Identity",
    category: "design",
    client: "Lumina Tech",
    thumbnail: "https://images.unsplash.com/photo-1626785773579-c93818bb51d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    videoUrl: null,
    description: "Complete visual overhaul for a modern tech startup. The goal was to create a minimalist, premium identity that stands out in a cluttered SaaS market.",
    role: "Art Director & Graphic Designer",
    deliverables: ["Logo System & Guidelines", "Brand Strategy Book", "Ui Kit & Typography"],
    year: "2024"
  },
  {
    id: 3,
    title: "The Craftsman",
    category: "video",
    client: "Oak & Iron",
    thumbnail: "https://images.unsplash.com/photo-1535016120720-40c746a480d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    description: "A slow-cinema inspired mini-documentary following a master woodworker. Emphasis on immersive sound design and warm, earthy color palettes.",
    role: "Cinematographer & Editor",
    deliverables: ["3-Minute Short Film", "Soundscape Mix", "Color Grading"],
    year: "2025"
  },
  {
    id: 4,
    title: "AURA Festival",
    category: "design",
    client: "AURA Music Group",
    thumbnail: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    videoUrl: null,
    description: "A series of striking, abstract 3D poster designs for a boutique electronic music festival designed to capture ambient light aesthetics.",
    role: "Visual & Poster Designer",
    deliverables: ["Key Art Posters", "3D Motion Graphics", "Social Banners"],
    year: "2024"
  },
  {
    id: 5,
    title: "Velocity Luxury Car",
    category: "video",
    client: "Apex Motors",
    thumbnail: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    description: "High-octane commercial edit for a luxury sports car launch. Features precision speed-ramping, sound sync, and deep dark cinematic color grading.",
    role: "Lead Editor",
    deliverables: ["30s TV Spot", "Social Teasers", "Cinematic Sound Design"],
    year: "2025"
  },
  {
    id: 6,
    title: "Noir Editorial Spreads",
    category: "design",
    client: "Studio One Magazine",
    thumbnail: "https://images.unsplash.com/photo-1588636156711-b0728cce7230?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    videoUrl: null,
    description: "Editorial layout design for a high-fashion spread. Focused on rigid grid structures juxtaposed with bold editorial typography.",
    role: "Editorial & Layout Designer",
    deliverables: ["16-Page Print Spread", "Typography System", "Digital Press Kit"],
    year: "2024"
  }
];

export const statistics: Statistic[] = [
  { value: "8+", label: "Years Experience" },
  { value: "140+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12", label: "Industry Awards" }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Alazar's cinematic touch transformed our brand identity. The editing pacing and color grading on our campaign exceeded every expectation.",
    author: "Elena Rostova",
    title: "Creative Director",
    company: "Vanguard Apparel",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    quote: "Working with Alazar on the Lumina rebranding was seamless. He has a rare ability to bridge still design aesthetics with motion.",
    author: "Marcus Chen",
    title: "Founder & CEO",
    company: "Lumina Tech",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    quote: "The sound design and color grading on 'The Craftsman' brought tears to our clients' eyes. Pure artistic genius.",
    author: "David Thorne",
    title: "Executive Producer",
    company: "Oak & Iron Media",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  }
];

export const faqs: FAQ[] = [
  {
    q: "What is your typical turnaround time for video editing projects?",
    a: "Commercial reels typically range between 5 to 10 business days depending on visual complexity, motion graphics, and audio mix iterations."
  },
  {
    q: "Do you offer both remote and in-person shoot services?",
    a: "Yes! Remote post-production (editing, color grading, sound design, graphic design) is available globally. In-person videography and studio consultation are available locally and for select travel assignments."
  },
  {
    q: "How do we get started on a new project?",
    a: "Simply send an inquiry through our Contact page or email directly at hello@alazar.com with project scope, timeline, and reference benchmarks."
  }
];
