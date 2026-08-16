import { Project, Statistic, Testimonial, FAQ, ThemeConfig } from '@/types/portfolio';

export const theme: ThemeConfig = {
  colors: {
    background: '#FAFAF9',     // Clean Canvas Off-White
    cardBg: '#FFFFFF',         // Pure White for cards
    accent: '#6B1D2F',         // Rich Burgundy (headers & buttons)
    text: '#1C1917',           // Charcoal (primary text)
    textMuted: '#78716C',      // Muted Slate (secondary text)
  },
  fonts: {
    heading: "'Roboto', sans-serif",
    body: "'Roboto', sans-serif"
  }
};

export const portfolioProjects: Project[] = [
  {
    id: 1,
    title: "Urban Echoes",
    category: "video",
    client: "Vanguard Apparel",
    thumbnail: "https://images.unsplash.com/photo-1604998103924-89e012e5265a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    previewVideoUrl: "/assets/sample-showreel.mp4",
    videoUrl: "/assets/sample-showreel.mp4",
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
    previewVideoUrl: null,
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
    previewVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-carpenter-working-with-wood-41555-large.mp4",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-carpenter-working-with-wood-41555-large.mp4",
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
    previewVideoUrl: null,
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
    previewVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-on-a-road-at-sunset-41549-large.mp4",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-on-a-road-at-sunset-41549-large.mp4",
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
    previewVideoUrl: null,
    videoUrl: null,
    description: "Page layouts for a fashion magazine spread, built with clean grids and strong typography.",
    role: "Editorial & Layout Designer",
    deliverables: ["16-Page Print Spread", "Font System", "Digital Press Kit"],
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

export const faqs: FAQ[] = [
  {
    q: "How long does a video project take?",
    a: "Most video edits take between 5 to 10 business days depending on the project length and revision needs."
  },
  {
    q: "Do you work remotely or on location?",
    a: "Both! Remote video editing, color grading, sound mixing, and graphic design are available worldwide. On-set filming is available locally and for travel assignments."
  },
  {
    q: "What cameras and editing software do you use?",
    a: "We film with high-quality 8K cinema cameras and edit using professional software like DaVinci Resolve Studio and Adobe Creative Cloud."
  },
  {
    q: "How do we start a project together?",
    a: "Simply send a message using our Contact page or email us directly at hello@alazar.com with your project goals and timeline."
  }
];

export const gearList = [
  {
    category: "Camera Systems",
    items: [
      { name: "RED V-Raptor 8K", desc: "Flagship 8K cinema camera for high quality video" },
      { name: "Sony FX6 Cinema Line", desc: "Full-frame camera for low light and high speed video" },
      { name: "BMPCC 6K Pro", desc: "Compact secondary camera with built-in ND filters" }
    ]
  },
  {
    category: "Lenses & Optics",
    items: [
      { name: "Cooke Anamorphic Lenses", desc: "Classic cinema lens look with smooth background blur" },
      { name: "Sony G Master Prime Lenses", desc: "Ultra sharp prime lenses with wide aperture" },
      { name: "Sirui Carbon Anamorphic", desc: "Lightweight anamorphic lenses for cinematic flare" }
    ]
  },
  {
    category: "Editing Suite",
    items: [
      { name: "DaVinci Resolve Studio 19", desc: "Professional software for color grading and audio mixing" },
      { name: "Mac Studio Workstation", desc: "Fast hardware for smooth editing and fast rendering" },
      { name: "Flanders OLED Monitor", desc: "Color-calibrated reference screen for accurate colors" },
      { name: "Adobe Creative Cloud", desc: "Premiere Pro and After Effects for editing and graphics" }
    ]
  },
  {
    category: "Lighting & Gear",
    items: [
      { name: "DJI Mavic 3 Drone", desc: "High-resolution drone for smooth aerial video" },
      { name: "Aputure Cinema Lights", desc: "Bright, natural LED lights for video production" },
      { name: "DJI RS 3 Pro Gimbal", desc: "Camera stabilizer for smooth moving shots" }
    ]
  }
];

export const colorGradingSamples = [
  {
    id: "cg-1",
    title: "Urban Echoes — High Contrast Look",
    logImage: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=60",
    gradedImage: "https://images.unsplash.com/photo-1604998103924-89e012e5265a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    camera: "RED V-Raptor 8K",
    colorSpace: "RED Wide Gamut -> Rec.709",
    lut: "Custom Film Emulation",
    iso: "ISO 800"
  },
  {
    id: "cg-2",
    title: "The Craftsman — Warm Film Look",
    logImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=60",
    gradedImage: "https://images.unsplash.com/photo-1535016120720-40c746a480d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    camera: "Sony FX6",
    colorSpace: "Sony S-Log3 -> Rec.709",
    lut: "Warm Amber Film Look",
    iso: "ISO 12800"
  }
];

export const btsGallery = [
  {
    id: "bts-1",
    title: "Directing on Set",
    location: "New York Studio",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "Filming with dual cameras and stabilizer setup."
  },
  {
    id: "bts-2",
    title: "Editing & Color Suite",
    location: "Alazar Studio",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "Color grading 8K video on reference monitors."
  },
  {
    id: "bts-3",
    title: "Aerial Filming",
    location: "Coastal Highlands",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "Capturing drone footage at sunrise."
  }
];

export const caseStudies = [
  {
    id: "cs-1",
    client: "Vanguard Apparel",
    project: "Fall Collection Commercial",
    metric: "4.8M+",
    metricLabel: "Video Views",
    result: "+420% Sales Growth",
    deliverables: ["60s Video Cut", "3x Social Clips", "Audio Mix"],
    image: "https://images.unsplash.com/photo-1604998103924-89e012e5265a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cs-2",
    client: "Apex Motors",
    project: "Car Launch Commercial",
    metric: "1.2M",
    metricLabel: "Direct Organic Views",
    result: "Featured in Major Media",
    deliverables: ["30s TV Spot", "Social Videos", "Color Grade"],
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cs-3",
    client: "Lumina Tech",
    project: "Brand Redesign & Motion",
    metric: "3.5x",
    metricLabel: "More Engagement",
    result: "Helped Secure New Funding",
    deliverables: ["Brand Identity Book", "3D Motion Clips", "UI Kit"],
    image: "https://images.unsplash.com/photo-1626785773579-c93818bb51d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export const calculatorOptions = {
  projectTypes: [
    { id: "commercial", label: "Commercial / Brand Video", basePrice: 3500 },
    { id: "documentary", label: "Short Documentary", basePrice: 2800 },
    { id: "music-video", label: "Music Video", basePrice: 2500 },
    { id: "brand-design", label: "Brand Design & Identity", basePrice: 2200 }
  ],
  scopes: [
    { id: "remote", label: "Editing Only (Remote)", multiplier: 1.0 },
    { id: "onset", label: "Filming + Full Editing", multiplier: 1.6 }
  ],
  addons: [
    { id: "color", label: "Advanced Color Grading", price: 600 },
    { id: "sound", label: "Sound Design & Audio Mix", price: 500 },
    { id: "motion3d", label: "3D Motion Graphics & Posters", price: 800 },
    { id: "raw", label: "Raw Footage Delivery", price: 400 }
  ]
};

export const clientLogos = [
  { name: "Vanguard Apparel", text: "VANGUARD" },
  { name: "Lumina Tech", text: "LUMINA" },
  { name: "Oak & Iron", text: "OAK & IRON" },
  { name: "Apex Motors", text: "APEX MOTORS" },
  { name: "AURA Music", text: "AURA" },
  { name: "Studio One", text: "STUDIO ONE" }
];

export const awardsList = [
  { year: "2025", title: "Vimeo Staff Pick", project: "The Craftsman" },
  { year: "2024", title: "Telly Gold Winner", project: "Velocity Commercial" },
  { year: "2024", title: "Cannes Lions Shortlist", project: "Urban Echoes" },
  { year: "2023", title: "Awwwards Site of the Day", project: "Lumina Launch" }
];

