// ─────────────────────────────────────────────────────────────────────────────
// Theme — exact brand tokens from Alazar's color brief
//
//  LIGHT  ·  background #FAFAF9  ·  brand #6B1D2F  ·  soft rose #C59A9F
//           text #1C1917  ·  muted #78716C
//
//  DARK   ·  bg #1E0A0D  ·  card #2E1216  ·  accent #8B1E3F
//           text #F5F0F1  ·  muted #A89597
// ─────────────────────────────────────────────────────────────────────────────
export const theme = {
  colors: {
    // ── Light canvas palette ────────────────────────────────────────────────
    background: '#FAFAF9',   // Clean Canvas Off-White
    surface: '#FAFAF9',   // Warm cream alternate sections
    surfaceAlt: '#FAFAF9',   // Faint rose tint

    brand: '#6B1D2F',   // Rich Burgundy — signature color
    brandHover: '#8B1E3F',   // Hover state
    brandDeep: '#1E0A0D',   // Pressed / ultra-dark
    brandSoft: '#C59A9F',   // Soft Rose — borders & highlights
    brandFaint: '#FAFAF9',   // Ultra-light rose tint

    cardBg: '#FFFFFF',   // Pure white cards
    text: '#1C1917',   // Charcoal — primary readability
    textMuted: '#78716C',   // Muted Slate — secondary text
    border: '#C59A9F',   // Soft rose-gray border

    // ── Dark burgundy night palette ─────────────────────────────────────────
    dark: {
      bgPrimary: '#1E0A0D',   // Deep Dark Burgundy
      bgSecondary: '#2E1216',   // Card / section backgrounds
      bgSurface: '#2E1216',   // Slightly lighter surface

      accent: '#8B1E3F',   // Bright Rose Burgundy
      accentHover: '#8B1E3F',   // Hover state
      accentDeep: '#6B1D2F',   // Deep pressed

      textPrimary: '#F5F0F1', // Off-White
      textSecondary: '#A89597', // Muted Rose-Gray
      border: 'rgba(139, 30, 63, 0.25)',
      borderBrand: 'rgba(139, 30, 63, 0.50)',
    },
  },

  fonts: {
    heading: "'Roboto', sans-serif",
    body: "'Roboto', sans-serif",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Portfolio Projects (fallback when API is unavailable)
// ─────────────────────────────────────────────────────────────────────────────
export const portfolioProjects = [
  {
    id: 1,
    title: 'Urban Echoes Commercial',
    category: 'video',
    subCategory: 'Commercial Video',
    client: 'Vanguard Apparel',
    thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    previewVideoUrl: '/assets/sample-showreel.mp4',
    videoUrl: '/assets/sample-showreel.mp4',
    description: "A high-octane commercial edit for Vanguard's Fall collection. Focused on kinetic movement, rhythmic cuts, and a sleek color grade.",
    role: 'Lead Video Editor & Colorist',
    deliverables: ['60s Commercial Reel', '3x Short Social Clips', 'Full Audio Mix'],
    year: '2025',
  },
  {
    id: 2,
    title: 'Lumina Brand Profile Book',
    category: 'design',
    subCategory: 'Brand Profile Book',
    client: 'Lumina Tech',
    thumbnail: 'https://images.unsplash.com/photo-1626785773579-c93818bb51d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    previewVideoUrl: null,
    videoUrl: null,
    description: 'Complete brand identity book design and visual strategy for a modern tech company, built with clean typography and grid balance.',
    role: 'Art Director & Graphic Designer',
    deliverables: ['Logo System & Guide', 'Brand Strategy Book', 'UI Kit & Fonts'],
    year: '2024',
  },
  {
    id: 3,
    title: 'The Craftsman Mini-Doc',
    category: 'video',
    subCategory: 'Documentary Edit',
    client: 'Oak & Iron',
    thumbnail: 'https://images.unsplash.com/photo-1535016120720-40c746a480d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    previewVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-carpenter-working-with-wood-41555-large.mp4',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-carpenter-working-with-wood-41555-large.mp4',
    description: 'A cinematic mini-documentary following a master craftsman. Focuses on organic sound design and rich color grading.',
    role: 'Cinematographer & Editor',
    deliverables: ['3-Minute Short Film', 'Audio Mixing', 'Color Grading'],
    year: '2025',
  },
  {
    id: 4,
    title: 'Peace & Character Illustration',
    category: 'design',
    subCategory: 'Illustration & Art',
    client: 'Peace Creative Studio',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    previewVideoUrl: null,
    videoUrl: null,
    description: 'A series of vibrant character illustrations and vector artworks crafted for apparel prints and digital media.',
    role: 'Lead Illustrator & Graphic Artist',
    deliverables: ['Character Vector Suite', 'Print File Masters', 'Sticker Pack Design'],
    year: '2025',
  },
  {
    id: 5,
    title: 'Custom Typography & Lettering',
    category: 'design',
    subCategory: 'Typography & Typeface',
    client: 'Typecraft Lab',
    thumbnail: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    previewVideoUrl: null,
    videoUrl: null,
    description: 'Experimental editorial typography, custom hand-lettering badges, and brand display font designs.',
    role: 'Typography Specialist',
    deliverables: ['Display Typeface Set', 'Hand-Lettering Badges', 'Vector Monograms'],
    year: '2024',
  },
  {
    id: 6,
    title: 'Book Cover & Publication Spreads',
    category: 'design',
    subCategory: 'Book Cover Design',
    client: 'Novelist Press',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    previewVideoUrl: null,
    videoUrl: null,
    description: '3D book cover renders, spine typography, and editorial publication spreads for a literary anthology series.',
    role: 'Book & Cover Designer',
    deliverables: ['3D Hardcover Mockups', 'Spine & Back Jacket', 'Print Layout Spreads'],
    year: '2025',
  },
  {
    id: 7,
    title: 'Digital Composite Imaging',
    category: 'design',
    subCategory: 'Digital Imaging',
    client: 'Surreal Vision',
    thumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    previewVideoUrl: null,
    videoUrl: null,
    description: 'High-end photo manipulation, color matching, and digital composite art for cinematic movie posters.',
    role: 'Digital Compositor',
    deliverables: ['High-Res Key Art', 'Multi-Layer PSD Masters', 'Retouching Guide'],
    year: '2024',
  },
  {
    id: 8,
    title: 'Artisanal Jar Label & Packaging',
    category: 'design',
    subCategory: 'Packaging & Labels',
    client: 'Rudeku Gourmet',
    thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    previewVideoUrl: null,
    videoUrl: null,
    description: 'Premium label packaging design for artisanal food jars, featuring foil stamp details and custom die-cut labels.',
    role: 'Packaging Designer',
    deliverables: ['Die-Cut Jar Labels', 'Box Packaging Design', 'Product 3D Renders'],
    year: '2025',
  },
  {
    id: 9,
    title: 'Instagram Feed & Mobile UI Design',
    category: 'design',
    subCategory: 'Feed & App UI',
    client: 'Sunlocal Agency',
    thumbnail: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    previewVideoUrl: null,
    videoUrl: null,
    description: 'Cohesive social media grid feed strategy and mobile application preview interfaces designed for high engagement.',
    role: 'UI & Social Media Designer',
    deliverables: ['9-Grid Feed Template', 'Figma Mobile UI Kit', 'Story Animation Assets'],
    year: '2024',
  },
  {
    id: 10,
    title: 'Promotional Content & 3D Hardware',
    category: 'design',
    subCategory: 'Promotional Content',
    client: 'Apex Gaming Tech',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    previewVideoUrl: null,
    videoUrl: null,
    description: '3D product visualization, lighting setup, and promotional ad banners for high-performance gaming gear.',
    role: '3D & Promotional Designer',
    deliverables: ['3D Product Renderings', 'Digital Ad Banners', 'Display Kiosk Mockups'],
    year: '2025',
  },
  {
    id: 11,
    title: 'AURA Festival Poster System',
    category: 'design',
    subCategory: 'Poster Design',
    client: 'AURA Music Group',
    thumbnail: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    previewVideoUrl: null,
    videoUrl: null,
    description: 'A series of striking, abstract 3D poster designs for an electronic music festival designed to capture ambient lighting.',
    role: 'Visual & Poster Designer',
    deliverables: ['Key Art Posters', '3D Motion Graphics', 'Social Banners'],
    year: '2024',
  },
  {
    id: 12,
    title: 'Velocity Luxury Car Launch',
    category: 'video',
    subCategory: 'Commercial Edit',
    client: 'Apex Motors',
    thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    previewVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-on-a-road-at-sunset-41549-large.mp4',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-on-a-road-at-sunset-41549-large.mp4',
    description: 'High-octane commercial edit for a sports car launch, featuring speed-ramping, sound sync, and deep dark color grading.',
    role: 'Lead Editor',
    deliverables: ['30s TV Spot', 'Social Teasers', 'Sound Design'],
    year: '2025',
  },
  {
    id: 13,
    title: 'Noir Editorial Magazine Spreads',
    category: 'design',
    subCategory: 'Editorial Layout',
    client: 'Studio One Magazine',
    thumbnail: 'https://images.unsplash.com/photo-1588636156711-b0728cce7230?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    previewVideoUrl: null,
    videoUrl: null,
    description: 'Editorial layout design for a high-fashion spread. Focused on rigid grid structures juxtaposed with bold typography.',
    role: 'Editorial & Layout Designer',
    deliverables: ['16-Page Print Spread', 'Typography System', 'Digital Press Kit'],
    year: '2024',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Statistics
// ─────────────────────────────────────────────────────────────────────────────
export const statistics = [
  { value: '8+', label: 'Years Experience' },
  { value: '140+', label: 'Projects Completed' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '12', label: 'Industry Awards' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Testimonials (fallback)
// ─────────────────────────────────────────────────────────────────────────────
export const testimonials = [
  {
    id: 1,
    quote: "Alazar's video work made our brand look amazing. The pacing and color work on our campaign exceeded all expectations.",
    author: 'Elena Rostova',
    title: 'Creative Director',
    company: 'Vanguard Apparel',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 2,
    quote: 'Working with Alazar on the Lumina rebranding was easy and smooth. He combines graphic design and video editing seamlessly.',
    author: 'Marcus Chen',
    title: 'Founder & CEO',
    company: 'Lumina Tech',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 3,
    quote: "The audio mixing and color work on 'The Craftsman' brought our story to life. Truly great work from start to finish.",
    author: 'David Thorne',
    title: 'Executive Producer',
    company: 'Oak & Iron Media',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FAQs
// ─────────────────────────────────────────────────────────────────────────────
export const faqs = [
  {
    q: 'How long does a video project take?',
    a: 'Most video edits take between 5 to 10 business days depending on the project length and revision needs.',
  },
  {
    q: 'Do you work remotely or on location?',
    a: 'Both! Remote video editing, color grading, sound mixing, and graphic design are available worldwide. On-set filming is available locally and for travel assignments.',
  },
  {
    q: 'What cameras and editing software do you use?',
    a: 'I film with high-quality 8K cinema cameras and edit using professional software like DaVinci Resolve Studio and Adobe Creative Cloud.',
  },
  {
    q: 'How do we start a project together?',
    a: 'Simply send a message using my Contact form or email me directly at a.asdesach1@gmail.com with your project goals and timeline.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Gear List
// ─────────────────────────────────────────────────────────────────────────────
export const gearList = [
  {
    category: 'Camera Systems',
    items: [
      { name: 'RED V-Raptor 8K', desc: 'Flagship 8K cinema camera for high quality video' },
      { name: 'Sony FX6 Cinema Line', desc: 'Full-frame camera for low light and high speed video' },
      { name: 'BMPCC 6K Pro', desc: 'Compact secondary camera with built-in ND filters' },
    ],
  },
  {
    category: 'Lenses & Optics',
    items: [
      { name: 'Cooke Anamorphic Lenses', desc: 'Classic cinema lens look with smooth background blur' },
      { name: 'Sony G Master Prime Lenses', desc: 'Ultra sharp prime lenses with wide aperture' },
      { name: 'Sirui Carbon Anamorphic', desc: 'Lightweight anamorphic lenses for cinematic flare' },
    ],
  },
  {
    category: 'Editing Suite',
    items: [
      { name: 'DaVinci Resolve Studio 19', desc: 'Professional software for color grading and audio mixing' },
      { name: 'Mac Studio Workstation', desc: 'Fast hardware for smooth editing and fast rendering' },
      { name: 'Flanders OLED Monitor', desc: 'Color-calibrated reference screen for accurate colors' },
      { name: 'Adobe Creative Cloud', desc: 'Premiere Pro and After Effects for editing and graphics' },
    ],
  },
  {
    category: 'Lighting & Gear',
    items: [
      { name: 'DJI Mavic 3 Drone', desc: 'High-resolution drone for smooth aerial video' },
      { name: 'Aputure Cinema Lights', desc: 'Bright, natural LED lights for video production' },
      { name: 'DJI RS 3 Pro Gimbal', desc: 'Camera stabilizer for smooth moving shots' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Color Grading Samples
// ─────────────────────────────────────────────────────────────────────────────
export const colorGradingSamples = [
  {
    id: 'cg-1',
    title: 'Urban Echoes — High Contrast Look',
    logImage: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=60',
    gradedImage: 'https://images.unsplash.com/photo-1604998103924-89e012e5265a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    camera: 'RED V-Raptor 8K',
    colorSpace: 'RED Wide Gamut -> Rec.709',
    lut: 'Custom Film Emulation',
    iso: 'ISO 800',
  },
  {
    id: 'cg-2',
    title: 'The Craftsman — Warm Film Look',
    logImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=60',
    gradedImage: 'https://images.unsplash.com/photo-1535016120720-40c746a480d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    camera: 'Sony FX6',
    colorSpace: 'Sony S-Log3 -> Rec.709',
    lut: 'Warm Amber Film Look',
    iso: 'ISO 12800',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Behind The Scenes Gallery
// ─────────────────────────────────────────────────────────────────────────────
export const btsGallery = [
  {
    id: 'bts-1',
    title: 'Directing on Set',
    location: 'New York Studio',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Filming with dual cameras and stabilizer setup.',
  },
  {
    id: 'bts-2',
    title: 'Editing & Color Suite',
    location: 'Alazar Studio',
    image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Color grading 8K video on reference monitors.',
  },
  {
    id: 'bts-3',
    title: 'Aerial Filming',
    location: 'Coastal Highlands',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Capturing drone footage at sunrise.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Case Studies
// ─────────────────────────────────────────────────────────────────────────────
export const caseStudies = [
  {
    id: 'cs-1',
    client: 'Vanguard Apparel',
    project: 'Fall Collection Commercial',
    metric: '4.8M+',
    metricLabel: 'Video Views',
    result: '+420% Sales Growth',
    deliverables: ['60s Video Cut', '3x Social Clips', 'Audio Mix'],
    image: 'https://images.unsplash.com/photo-1604998103924-89e012e5265a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cs-2',
    client: 'Apex Motors',
    project: 'Car Launch Commercial',
    metric: '1.2M',
    metricLabel: 'Direct Organic Views',
    result: 'Featured in Major Media',
    deliverables: ['30s TV Spot', 'Social Videos', 'Color Grade'],
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cs-3',
    client: 'Lumina Tech',
    project: 'Brand Redesign & Motion',
    metric: '3.5x',
    metricLabel: 'More Engagement',
    result: 'Helped Secure New Funding',
    deliverables: ['Brand Identity Book', '3D Motion Clips', 'UI Kit'],
    image: 'https://images.unsplash.com/photo-1626785773579-c93818bb51d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Calculator Options
// ─────────────────────────────────────────────────────────────────────────────
export const calculatorOptions = {
  projectTypes: [
    { id: 'commercial', label: 'Commercial / Brand Video', basePrice: 3500 },
    { id: 'documentary', label: 'Short Documentary', basePrice: 2800 },
    { id: 'music-video', label: 'Music Video', basePrice: 2500 },
    { id: 'brand-design', label: 'Brand Design & Identity', basePrice: 2200 },
  ],
  scopes: [
    { id: 'remote', label: 'Editing Only (Remote)', multiplier: 1.0 },
    { id: 'onset', label: 'Filming + Full Editing', multiplier: 1.6 },
  ],
  addons: [
    { id: 'color', label: 'Advanced Color Grading', price: 600 },
    { id: 'sound', label: 'Sound Design & Audio Mix', price: 500 },
    { id: 'motion3d', label: '3D Motion Graphics & Posters', price: 800 },
    { id: 'raw', label: 'Raw Footage Delivery', price: 400 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Client Logos
// ─────────────────────────────────────────────────────────────────────────────
export const clientLogos = [
  { name: 'Vanguard Apparel', text: 'VANGUARD' },
  { name: 'Lumina Tech', text: 'LUMINA' },
  { name: 'Oak & Iron', text: 'OAK & IRON' },
  { name: 'Apex Motors', text: 'APEX MOTORS' },
  { name: 'AURA Music', text: 'AURA' },
  { name: 'Studio One', text: 'STUDIO ONE' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Awards
// ─────────────────────────────────────────────────────────────────────────────
export const awardsList = [
  { year: '2025', title: 'Vimeo Staff Pick', project: 'The Craftsman' },
  { year: '2024', title: 'Telly Gold Winner', project: 'Velocity Commercial' },
  { year: '2024', title: 'Cannes Lions Shortlist', project: 'Urban Echoes' },
  { year: '2023', title: 'Awwwards Site of the Day', project: 'Lumina Launch' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Skills Matrix
// ─────────────────────────────────────────────────────────────────────────────
export const skillsMatrix = [
  {
    category: 'Video & Post-Production',
    skills: [
      { name: 'DaVinci Resolve Studio', level: 98, desc: 'Color grading, Fairlight audio & advanced node editing' },
      { name: 'Adobe Premiere Pro', level: 95, desc: 'Rhythmic cutting, multicam & speed ramping' },
      { name: 'Frame.io Collaboration', level: 98, desc: 'Client review, timecoded notes & rapid delivery' },
      { name: 'Sound Design & Foley', level: 90, desc: 'Audio cleaning, sound FX layering & stereo mixing' },
    ],
  },
  {
    category: 'Graphic & Motion Design',
    skills: [
      { name: 'Adobe After Effects', level: 92, desc: '2D/3D motion graphics, kinetic type & visual FX' },
      { name: 'Photoshop & Illustrator', level: 95, desc: 'Brand design, typography & print/digital layouts' },
      { name: 'Blender 3D', level: 85, desc: '3D poster graphics, lighting & abstract art' },
      { name: 'Figma & UI Kits', level: 90, desc: 'Brand guidelines & digital design systems' },
    ],
  },
  {
    category: 'Filming & On-Set Directing',
    skills: [
      { name: 'Cinema Camera Operation', level: 95, desc: 'RED V-Raptor, Sony FX6 & Blackmagic 6K' },
      { name: 'Lighting & Composition', level: 92, desc: 'Three-point lighting, LED panels & mood setups' },
      { name: 'Drone Aerial Filming', level: 88, desc: 'DJI drone flight, tracking shots & spatial framing' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Career Experience
// ─────────────────────────────────────────────────────────────────────────────
export const careerExperience = [
  {
    period: '2022 - Present',
    role: 'Founder & Lead Creative Director',
    company: 'Alazar Studio',
    location: 'Global / Remote',
    description: 'Directing, video editing, and brand design for international clients in commercial, fashion, and tech industries.',
    achievements: [
      "Delivered 140+ client projects with a 98% satisfaction rate",
      "Led campaign for Vanguard Apparel reaching 4.8M+ views",
    ],
  },
  {
    period: '2020 - 2022',
    role: 'Senior Video Editor & Colorist',
    company: 'Apex Media Group',
    location: 'New York, USA',
    description: 'Spearheaded video editing and color grading for high-profile car commercials, broadcast TV spots, and digital media campaigns.',
    achievements: [
      'Won Telly Gold Award for Velocity Commercial edit',
      'Reduced post-production turnaround time by 30%',
    ],
  },
  {
    period: '2018 - 2020',
    role: 'Motion Designer & Video Specialist',
    company: 'Studio One Agency',
    location: 'Remote',
    description: 'Created kinetic typography, 3D festival posters, and brand identities for music festivals, tech startups, and digital publishers.',
    achievements: [
      'Designed key art for AURA Music Festival',
      'Built reusable video motion templates for 20+ clients',
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Hiring Guarantees
// ─────────────────────────────────────────────────────────────────────────────
export const hiringGuarantees = [
  { title: '100% On-Time Delivery', desc: 'Strict adherence to project deadlines with clear milestone check-ins.' },
  { title: 'Master Quality Files', desc: 'Receive ProRes 422 HQ, 4K/8K RAW footage, and multi-format vertical social cuts.' },
  { title: 'Clear & Fast Communication', desc: 'Direct access via Slack, email, or WhatsApp with responses under 24 hours.' },
  { title: 'Commercial Audio Licenses', desc: 'All videos include fully licensed background music, sound effects, and stems.' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Social Links (Alazar's Official Handles)
// ─────────────────────────────────────────────────────────────────────────────
export const socialLinks = [
  { name: 'Telegram', url: 'https://t.me/Onlygrace2', handle: '@Onlygrace2', type: 'telegram' },
  { name: 'Facebook', url: 'https://www.facebook.com/share/169w6Q4Mqo4/?mibextid=wwXIfr', handle: 'Alazar Asdesach', type: 'facebook' },
  { name: 'Facebook Page', url: 'https://www.facebook.com/share/1CMuAk9pQM/?mibextid=wwXIfr', handle: 'Alazar Studio', type: 'facebook' },
];
