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
    q: "What camera gear and editing suites do you operate with?",
    a: "We shoot on RED V-Raptor 8K & Sony FX6 Cinema line with Cooke Anamorphic glass. Post-production is executed in DaVinci Resolve Studio 19 with calibrated Flanders Scientific reference OLED monitors."
  },
  {
    q: "How do we get started on a new project?",
    a: "Simply send an inquiry through our Contact page or email directly at hello@alazar.com with project scope, timeline, and reference benchmarks."
  }
];

export const gearList = [
  {
    category: "Camera Systems",
    items: [
      { name: "RED V-Raptor 8K VV", desc: "Flagship 8K Cinema Sensor (120fps 8K RAW)" },
      { name: "Sony FX6 Cinema Line", desc: "Full-Frame Low Light & High Frame Speed (4K 120fps)" },
      { name: "BMPCC 6K Pro", desc: "Compact B-Cam with Internal ND Filters" }
    ]
  },
  {
    category: "Lenses & Optics",
    items: [
      { name: "Cooke Anamorphic /i Full Frame Plus", desc: "Classic Cinema Flare & Organic Bokeh" },
      { name: "Sony G Master Prime Set (24, 35, 50, 85mm)", desc: "Ultra Sharp f/1.4 aperture glass" },
      { name: "Sirui Saturn 35mm & 50mm Carbon Anamorphic", desc: "1.6x Squeeze Anamorphic flare" }
    ]
  },
  {
    category: "Post-Production Suite",
    items: [
      { name: "DaVinci Resolve Studio 19", desc: "Advanced Color Node Grading & Fairlight Audio" },
      { name: "Mac Studio M2 Ultra (192GB RAM)", desc: "Realtime 8K RAW Playback & Render" },
      { name: "Flanders Scientific XMP310", desc: "Mastering Grade 31-inch QD-OLED HDR Monitor" },
      { name: "Adobe Creative Cloud (Premiere, After Effects)", desc: "Motion Graphics & Kinetic Editing" }
    ]
  },
  {
    category: "Lighting, Drones & Support",
    items: [
      { name: "DJI Mavic 3 Cine", desc: "ProRes 422 HQ Aerial Cinema Flight Rig" },
      { name: "Aputure 600d Pro & 300x Trios", desc: "Daylight Balanced High-CRI LED Cinema Lights" },
      { name: "DJI RS 3 Pro Gimbal + LiDAR", desc: "Autofocus Motor & Heavy Cinema Payload Gimbal" }
    ]
  }
];

export const colorGradingSamples = [
  {
    id: "cg-1",
    title: "Urban Echoes — High Contrast Commercial",
    logImage: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=60",
    gradedImage: "https://images.unsplash.com/photo-1604998103924-89e012e5265a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    camera: "RED V-Raptor 8K",
    colorSpace: "REDWideGamutRGB / Log3G10 -> Rec.709",
    lut: "Custom Kodak 2383 Print Emulation",
    iso: "ISO 800"
  },
  {
    id: "cg-2",
    title: "The Craftsman — Warm Cinematic Film Grade",
    logImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=60",
    gradedImage: "https://images.unsplash.com/photo-1535016120720-40c746a480d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    camera: "Sony FX6",
    colorSpace: "S-Gamut3.Cine / S-Log3 -> Rec.709",
    lut: "Earthy Amber Warmth Film Stock",
    iso: "ISO 12800 Dual Native"
  }
];

export const btsGallery = [
  {
    id: "bts-1",
    title: "On Set Direction — Commercial Shoot",
    location: "Studio 44, New York",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "Directing dual-camera rig setup with DJI RS3 Pro LiDAR autofocus."
  },
  {
    id: "bts-2",
    title: "DaVinci Color Node Suite",
    location: "Alazar Post Suite",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "Color grading 8K RAW RED footage on Flanders OLED reference monitor."
  },
  {
    id: "bts-3",
    title: "Aerial Cinema Operation",
    location: "Coastal Highlands",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "DJI Mavic 3 Cine ProRes tracking shot at sunrise."
  }
];

export const caseStudies = [
  {
    id: "cs-1",
    client: "Vanguard Apparel",
    project: "Fall Collection Commercial",
    metric: "4.8M+",
    metricLabel: "Video Impressions",
    result: "+420% Sales Conversion Surge",
    deliverables: ["60s Cinema Cut", "3x Vertical Reels", "Foley Mix"],
    image: "https://images.unsplash.com/photo-1604998103924-89e012e5265a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cs-2",
    client: "Apex Motors",
    project: "Velocity Car Launch Spot",
    metric: "1.2M",
    metricLabel: "Direct Organic Views",
    result: "Featured on Broadcast & AutoWeek",
    deliverables: ["30s TV Commercial", "Social Cutdowns", "HDR Grade"],
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cs-3",
    client: "Lumina Tech",
    project: "Full Rebrand & Motion Kit",
    metric: "3.5x",
    metricLabel: "Engagement Multiplier",
    result: "Acquired Series B Funding Post-Launch",
    deliverables: ["Brand Identity Book", "3D Motion Assets", "UI Kit"],
    image: "https://images.unsplash.com/photo-1626785773579-c93818bb51d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export const calculatorOptions = {
  projectTypes: [
    { id: "commercial", label: "Commercial / Brand Reel", basePrice: 3500 },
    { id: "documentary", label: "Documentary Short / Story", basePrice: 2800 },
    { id: "music-video", label: "Music Video Cut", basePrice: 2500 },
    { id: "brand-design", label: "Full Brand Identity & Design", basePrice: 2200 }
  ],
  scopes: [
    { id: "remote", label: "Remote Post-Production Only", multiplier: 1.0 },
    { id: "onset", label: "On-Set Shoot + Full Edit", multiplier: 1.6 }
  ],
  addons: [
    { id: "color", label: "Advanced DaVinci Resolve Color Grade", price: 600 },
    { id: "sound", label: "Cinema Sound Design & Foley Mix", price: 500 },
    { id: "motion3d", label: "3D Motion Graphics & Key Art", price: 800 },
    { id: "raw", label: "Master RAW Footage Handover", price: 400 }
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
