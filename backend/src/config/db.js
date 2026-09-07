import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const { Pool, Client } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfig = {
  host: process.env.PGHOST || 'localhost',
  port: parseInt(process.env.PGPORT || '5432', 10),
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  database: process.env.PGDATABASE || 'alazar_portfolio',
};

export const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : new Pool(dbConfig);

export let isDbConnected = false;

// Fallback in-memory data store when PostgreSQL credentials require configuration
const memoryStore = {
  projects: [
    {
      id: 1,
      title: "Urban Echoes Commercial",
      category: "video",
      client: "Vanguard Apparel",
      thumbnail: "/assets/projects/urban-echoes.svg",
      preview_video_url: "/assets/sample-showreel.mp4",
      video_url: "/assets/sample-showreel.mp4",
      description: "A fast-paced, documentary-style lookbook for Vanguard's Fall collection. Focused on kinetic movement, rhythmic cuts, and a sleek color grade.",
      role: "Lead Video Editor & Colorist",
      deliverables: ["60s Commercial Reel", "3x 15s Instagram Reels", "Full Sound Design Mix"],
      year: "2025",
      featured: true,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: "Lumina Brand Profile Book",
      category: "design",
      client: "Lumina Tech",
      thumbnail: "/assets/projects/lumina-brand.svg",
      preview_video_url: null,
      video_url: null,
      description: "Complete visual overhaul and brand profile book design for a modern tech startup. Built with clean typography grid and brand strategy.",
      role: "Art Director & Graphic Designer",
      deliverables: ["Logo System & Guidelines", "Brand Strategy Book", "Ui Kit & Typography"],
      year: "2024",
      featured: true,
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      title: "The Craftsman Mini-Doc",
      category: "video",
      client: "Oak & Iron",
      thumbnail: "/assets/projects/craftsman.svg",
      preview_video_url: "/assets/sample-showreel.mp4",
      video_url: "/assets/sample-showreel.mp4",
      description: "A slow-cinema mini-documentary following a master woodworker. Emphasis on organic sound design and warm color palettes.",
      role: "Cinematographer & Editor",
      deliverables: ["3-Minute Short Film", "Soundscape Mix", "Color Grading"],
      year: "2025",
      featured: true,
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      title: "Peace & Character Illustration",
      category: "design",
      client: "Peace Creative Studio",
      thumbnail: "/assets/projects/peace-illustration.svg",
      preview_video_url: null,
      video_url: null,
      description: "Vibrant character illustrations and vector artworks crafted for digital media, stickers, and editorial prints.",
      role: "Lead Illustrator & Graphic Artist",
      deliverables: ["Character Vector Suite", "Print File Masters", "Sticker Pack Design"],
      year: "2025",
      featured: true,
      created_at: new Date().toISOString()
    },
    {
      id: 5,
      title: "Custom Typography & Lettering",
      category: "design",
      client: "Typecraft Lab",
      thumbnail: "/assets/projects/typography.svg",
      preview_video_url: null,
      video_url: null,
      description: "Experimental editorial typography, custom hand-lettering badges, and brand display font designs.",
      role: "Typography Specialist",
      deliverables: ["Display Typeface Set", "Hand-Lettering Badges", "Vector Monograms"],
      year: "2024",
      featured: true,
      created_at: new Date().toISOString()
    },
    {
      id: 6,
      title: "Book Cover & Publication Spreads",
      category: "design",
      client: "Novelist Press",
      thumbnail: "/assets/projects/book-cover.svg",
      preview_video_url: null,
      video_url: null,
      description: "3D book cover renders, spine typography, and editorial publication spreads for a literary anthology series.",
      role: "Book & Cover Designer",
      deliverables: ["3D Hardcover Mockups", "Spine & Back Jacket", "Print Layout Spreads"],
      year: "2025",
      featured: true,
      created_at: new Date().toISOString()
    },
    {
      id: 7,
      title: "Digital Composite Imaging",
      category: "design",
      client: "Surreal Vision",
      thumbnail: "/assets/projects/digital-imaging.svg",
      preview_video_url: null,
      video_url: null,
      description: "High-end photo manipulation, color matching, and digital composite art for cinematic movie posters.",
      role: "Digital Compositor",
      deliverables: ["High-Res Key Art", "Multi-Layer PSD Masters", "Retouching Guide"],
      year: "2024",
      featured: false,
      created_at: new Date().toISOString()
    },
    {
      id: 8,
      title: "Artisanal Jar Label & Packaging",
      category: "design",
      client: "Rudeku Gourmet",
      thumbnail: "/assets/projects/jar-label.svg",
      preview_video_url: null,
      video_url: null,
      description: "Premium label packaging design for artisanal food jars, featuring foil stamp details and custom die-cut labels.",
      role: "Packaging Designer",
      deliverables: ["Die-Cut Jar Labels", "Box Packaging Design", "Product 3D Renders"],
      year: "2025",
      featured: false,
      created_at: new Date().toISOString()
    },
    {
      id: 9,
      title: "Instagram Feed & Mobile UI Design",
      category: "design",
      client: "Sunlocal Agency",
      thumbnail: "/assets/projects/social-feed.svg",
      preview_video_url: null,
      video_url: null,
      description: "Cohesive social media grid feed strategy and mobile application preview interfaces designed for high engagement.",
      role: "UI & Social Media Designer",
      deliverables: ["9-Grid Feed Template", "Figma Mobile UI Kit", "Story Animation Assets"],
      year: "2024",
      featured: false,
      created_at: new Date().toISOString()
    },
    {
      id: 10,
      title: "Promotional Content & 3D Hardware",
      category: "design",
      client: "Apex Gaming Tech",
      thumbnail: "/assets/projects/promotional-3d.svg",
      preview_video_url: null,
      video_url: null,
      description: "3D product visualization, lighting setup, and promotional ad banners for high-performance gaming gear.",
      role: "3D & Promotional Designer",
      deliverables: ["3D Product Renderings", "Digital Ad Banners", "Display Kiosk Mockups"],
      year: "2025",
      featured: false,
      created_at: new Date().toISOString()
    },
    {
      id: 11,
      title: "AURA Festival Poster System",
      category: "design",
      client: "AURA Music Group",
      thumbnail: "/assets/projects/aura-poster.svg",
      preview_video_url: null,
      video_url: null,
      description: "Abstract 3D poster designs for a boutique electronic music festival designed to capture ambient lighting.",
      role: "Visual & Poster Designer",
      deliverables: ["Key Art Posters", "3D Motion Graphics", "Social Banners"],
      year: "2024",
      featured: true,
      created_at: new Date().toISOString()
    },
    {
      id: 12,
      title: "Velocity Luxury Car Launch",
      category: "video",
      client: "Apex Motors",
      thumbnail: "/assets/projects/velocity-car.svg",
      preview_video_url: "/assets/sample-showreel.mp4",
      video_url: "/assets/sample-showreel.mp4",
      description: "High-octane commercial edit for a sports car launch, featuring speed-ramping, sound sync, and deep color grading.",
      role: "Lead Editor",
      deliverables: ["30s TV Spot", "Social Teasers", "Cinematic Sound Design"],
      year: "2025",
      featured: true,
      created_at: new Date().toISOString()
    },
    {
      id: 13,
      title: "Noir Editorial Magazine Spreads",
      category: "design",
      client: "Studio One Magazine",
      thumbnail: "/assets/projects/noir-editorial.svg",
      preview_video_url: null,
      video_url: null,
      description: "Editorial layout design for a high-fashion spread. Focused on rigid grid structures juxtaposed with bold typography.",
      role: "Editorial & Layout Designer",
      deliverables: ["16-Page Print Spread", "Typography System", "Digital Press Kit"],
      year: "2024",
      featured: false,
      created_at: new Date().toISOString()
    }
  ],
  inquiries: [],
  quotes: [],
  testimonials: [
    {
      id: 1,
      quote: "Alazar's cinematic touch transformed our brand identity. The editing pacing and color grading on our campaign exceeded every expectation.",
      author: "Elena Rostova",
      title: "Creative Director",
      company: "Vanguard Apparel",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5
    },
    {
      quote: "Working with Alazar on the Lumina rebranding was seamless. He has a rare ability to bridge still design aesthetics with motion.",
      author: "Marcus Chen",
      title: "Founder & CEO",
      company: "Lumina Tech",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5
    },
    {
      quote: "The sound design and color grading on 'The Craftsman' brought tears to our clients' eyes. Pure artistic genius.",
      author: "David Thorne",
      title: "Executive Producer",
      company: "Oak & Iron Media",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5
    }
  ],
  stats: [
    { key_name: 'experience', value: '8+', label: 'Years Experience' },
    { key_name: 'completed', value: '140+', label: 'Projects Completed' },
    { key_name: 'satisfaction', value: '98%', label: 'Client Satisfaction' },
    { key_name: 'awards', value: '12', label: 'Industry Awards' }
  ],
  inquiries: [],
  quotes: [],
  // CMS tables
  site_settings: [],
  blog_posts: [],
  faqs: [
    { id: 1, question: 'How long does a video project take?', answer: 'Most video edits take between 5 to 10 business days depending on the project length and revision needs.', sort_order: 0 },
    { id: 2, question: 'Do you work remotely or on location?', answer: 'Both! Remote video editing, color grading, sound mixing, and graphic design are available worldwide. On-set filming is available locally and for travel assignments.', sort_order: 1 },
    { id: 3, question: 'What cameras and editing software do you use?', answer: 'I film with high-quality 8K cinema cameras and edit using DaVinci Resolve Studio and Adobe Creative Cloud.', sort_order: 2 },
    { id: 4, question: 'How do we start a project together?', answer: 'Simply send a message using my Contact form or email me directly at a.asdesach1@gmail.com with your project goals and timeline.', sort_order: 3 }
  ],
  gear: [
    { id: 1, category: 'Camera Systems', name: 'RED V-Raptor 8K', description: 'Flagship 8K cinema camera', sort_order: 0 },
    { id: 2, category: 'Camera Systems', name: 'Sony FX6 Cinema Line', description: 'Full-frame low light cinema camera', sort_order: 1 },
    { id: 3, category: 'Editing Suite', name: 'DaVinci Resolve Studio 19', description: 'Professional color grading and audio', sort_order: 2 }
  ],
  awards: [
    { id: 1, year: '2025', title: 'Vimeo Staff Pick', project: 'The Craftsman', sort_order: 0 },
    { id: 2, year: '2024', title: 'Telly Gold Winner', project: 'Velocity Commercial', sort_order: 1 },
    { id: 3, year: '2024', title: 'Cannes Lions Shortlist', project: 'Urban Echoes', sort_order: 2 }
  ],
  skills: [
    { id: 1, category: 'Video & Post-Production', name: 'DaVinci Resolve Studio', level: 98, description: 'Color grading, Fairlight audio & node editing', sort_order: 0 },
    { id: 2, category: 'Video & Post-Production', name: 'Adobe Premiere Pro', level: 95, description: 'Rhythmic cutting, multicam & speed ramping', sort_order: 1 },
    { id: 3, category: 'Graphic & Motion Design', name: 'Adobe After Effects', level: 92, description: '2D/3D motion graphics & visual FX', sort_order: 2 }
  ],
  career_experience: [
    { id: 1, period: '2022 - Present', role: 'Founder & Lead Creative Director', company: 'Alazar Studio', location: 'Global / Remote', description: 'Directing, editing, and brand design for international clients.', achievements: ['Delivered 140+ client projects with 98% satisfaction', 'Led campaign for Vanguard Apparel reaching 4.8M+ views'], sort_order: 0 }
  ],
  client_logos: [
    { id: 1, name: 'Vanguard Apparel', display_text: 'VANGUARD', logo_url: null, sort_order: 0 },
    { id: 2, name: 'Lumina Tech', display_text: 'LUMINA', logo_url: null, sort_order: 1 },
    { id: 3, name: 'Apex Motors', display_text: 'APEX MOTORS', logo_url: null, sort_order: 2 }
  ],
  bts_gallery: [
    { id: 1, title: 'Directing on Set', location: 'New York Studio', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80', caption: 'Filming with dual cameras and stabilizer setup.', sort_order: 0 },
    { id: 2, title: 'Editing & Color Suite', location: 'Alazar Studio', image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&q=80', caption: 'Color grading 8K video on reference monitors.', sort_order: 1 }
  ],
  color_grading_samples: [
    { id: 1, title: 'Urban Echoes — High Contrast', log_image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&q=60', graded_image: 'https://images.unsplash.com/photo-1604998103924-89e012e5265a?w=1200&q=80', camera: 'RED V-Raptor 8K', color_space: 'RED Wide Gamut -> Rec.709', lut: 'Custom Film Emulation', iso: 'ISO 800', sort_order: 0 }
  ],
  hiring_guarantees: [
    { id: 1, title: '100% On-Time Delivery', description: 'Strict adherence to project deadlines with clear milestone check-ins.', sort_order: 0 },
    { id: 2, title: 'Master Quality Files', description: 'Receive ProRes 422 HQ, 4K/8K RAW footage, and multi-format vertical social cuts.', sort_order: 1 },
    { id: 3, title: 'Clear & Fast Communication', description: 'Direct access via Slack, email, or WhatsApp with responses under 24 hours.', sort_order: 2 }
  ],
  pricing_options: [
    { id: 1, type: 'project_type', option_id: 'commercial', label: 'Commercial / Brand Video', base_price: 3500, multiplier: null, price: null, sort_order: 0 },
    { id: 2, type: 'project_type', option_id: 'documentary', label: 'Short Documentary', base_price: 2800, multiplier: null, price: null, sort_order: 1 },
    { id: 3, type: 'scope', option_id: 'remote', label: 'Editing Only (Remote)', base_price: null, multiplier: 1.0, price: null, sort_order: 0 },
    { id: 4, type: 'scope', option_id: 'onset', label: 'Filming + Full Editing', base_price: null, multiplier: 1.6, price: null, sort_order: 1 },
    { id: 5, type: 'addon', option_id: 'color', label: 'Advanced Color Grading', base_price: null, multiplier: null, price: 600, sort_order: 0 },
    { id: 6, type: 'addon', option_id: 'sound', label: 'Sound Design & Audio Mix', base_price: null, multiplier: null, price: 500, sort_order: 1 }
  ],
  social_links: [
    { id: 1, name: 'Telegram', url: 'https://t.me/Onlygrace2', handle: '@Onlygrace2', type: 'telegram', sort_order: 0 },
    { id: 2, name: 'Facebook', url: 'https://www.facebook.com/share/169w6Q4Mqo4/', handle: 'Alazar Asdesach', type: 'facebook', sort_order: 1 }
  ],
  case_studies: [
    { id: 1, client: 'Vanguard Apparel', project: 'Fall Collection Commercial', metric: '4.8M+', metric_label: 'Video Views', result: '+420% Sales Growth', deliverables: ['60s Video Cut', '3x Social Clips', 'Audio Mix'], image: 'https://images.unsplash.com/photo-1604998103924-89e012e5265a?w=800&q=80' }
  ],
  page_sections: [
    { id: 1, page: 'home', section_key: 'hero', label: 'Hero Banner', visible: true, sort_order: 1 },
    { id: 2, page: 'home', section_key: 'about_snapshot', label: 'About Snapshot', visible: true, sort_order: 2 },
    { id: 3, page: 'home', section_key: 'expertise', label: 'Expertise Section', visible: true, sort_order: 3 },
    { id: 4, page: 'home', section_key: 'showreel', label: 'Showreel Banner', visible: true, sort_order: 4 },
    { id: 5, page: 'home', section_key: 'social_proof', label: 'Testimonials', visible: true, sort_order: 5 },
    { id: 6, page: 'home', section_key: 'color_grading', label: 'Color Grading Showcase', visible: true, sort_order: 6 },
    { id: 7, page: 'home', section_key: 'skills', label: 'Skills Section', visible: true, sort_order: 7 },
    { id: 8, page: 'home', section_key: 'gear', label: 'Gear Section', visible: true, sort_order: 8 },
    { id: 9, page: 'home', section_key: 'why_hire', label: 'Why Hire Me', visible: true, sort_order: 9 },
    { id: 10, page: 'home', section_key: 'calculator', label: 'Project Calculator', visible: true, sort_order: 10 }
  ]
};

const storeFilePath = path.join(__dirname, '../db/alazar_portfolio_store.json');

export function saveMemoryStoreToDisk() {
  try {
    fs.writeFileSync(storeFilePath, JSON.stringify(memoryStore, null, 2), 'utf8');
  } catch (err) {
    console.error('[Database Store] Error saving to disk:', err.message);
  }
}

export function loadMemoryStoreFromDisk() {
  try {
    if (fs.existsSync(storeFilePath)) {
      const data = fs.readFileSync(storeFilePath, 'utf8');
      const parsed = JSON.parse(data);
      // Core tables
      if (Array.isArray(parsed.projects) && parsed.projects.length > 0) memoryStore.projects = parsed.projects;
      if (Array.isArray(parsed.inquiries)) memoryStore.inquiries = parsed.inquiries;
      if (Array.isArray(parsed.quotes)) memoryStore.quotes = parsed.quotes;
      if (Array.isArray(parsed.testimonials) && parsed.testimonials.length > 0) memoryStore.testimonials = parsed.testimonials;
      if (Array.isArray(parsed.stats) && parsed.stats.length > 0) memoryStore.stats = parsed.stats;
      // CMS tables
      if (Array.isArray(parsed.site_settings)) memoryStore.site_settings = parsed.site_settings;
      if (Array.isArray(parsed.blog_posts)) memoryStore.blog_posts = parsed.blog_posts;
      if (Array.isArray(parsed.faqs) && parsed.faqs.length > 0) memoryStore.faqs = parsed.faqs;
      if (Array.isArray(parsed.gear) && parsed.gear.length > 0) memoryStore.gear = parsed.gear;
      if (Array.isArray(parsed.awards) && parsed.awards.length > 0) memoryStore.awards = parsed.awards;
      if (Array.isArray(parsed.skills) && parsed.skills.length > 0) memoryStore.skills = parsed.skills;
      if (Array.isArray(parsed.career_experience) && parsed.career_experience.length > 0) memoryStore.career_experience = parsed.career_experience;
      if (Array.isArray(parsed.client_logos) && parsed.client_logos.length > 0) memoryStore.client_logos = parsed.client_logos;
      if (Array.isArray(parsed.bts_gallery) && parsed.bts_gallery.length > 0) memoryStore.bts_gallery = parsed.bts_gallery;
      if (Array.isArray(parsed.color_grading_samples) && parsed.color_grading_samples.length > 0) memoryStore.color_grading_samples = parsed.color_grading_samples;
      if (Array.isArray(parsed.hiring_guarantees) && parsed.hiring_guarantees.length > 0) memoryStore.hiring_guarantees = parsed.hiring_guarantees;
      if (Array.isArray(parsed.pricing_options) && parsed.pricing_options.length > 0) memoryStore.pricing_options = parsed.pricing_options;
      if (Array.isArray(parsed.social_links) && parsed.social_links.length > 0) memoryStore.social_links = parsed.social_links;
      if (Array.isArray(parsed.case_studies) && parsed.case_studies.length > 0) memoryStore.case_studies = parsed.case_studies;
      if (Array.isArray(parsed.page_sections) && parsed.page_sections.length > 0) memoryStore.page_sections = parsed.page_sections;
    } else {
      saveMemoryStoreToDisk();
    }
  } catch (err) {
    console.error('[Database Store] Error loading from disk:', err.message);
  }
}

// Ensure database exists
async function ensureDatabaseExists() {
  if (process.env.DATABASE_URL) return;
  const adminClient = new Client({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: 'postgres',
  });

  try {
    await adminClient.connect();
    const res = await adminClient.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbConfig.database]
    );

    if (res.rowCount === 0) {
      console.log(`[Database] Creating database '${dbConfig.database}'...`);
      await adminClient.query(`CREATE DATABASE "${dbConfig.database}"`);
      console.log(`[Database] Created database '${dbConfig.database}'.`);
    }
  } catch (err) {
    // console.warn('[Database] Database check notice:', err.message);
  } finally {
    try {
      await adminClient.end();
    } catch (_) {}
  }
}

// Auto-run schema migrations and seed initial data
export async function initializeDatabase() {
  try {
    await ensureDatabaseExists();

    const client = await pool.connect();
    console.log(`[Database] ✅ Connected to PostgreSQL database '${dbConfig.database}' on port ${dbConfig.port}!`);
    isDbConnected = true;

    const schemaPath = path.join(__dirname, '../db/schema.sql');
    if (fs.existsSync(schemaPath)) {
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      await client.query(schemaSql);
      console.log(`[Database] Database schema synchronized.`);
    }

    console.log(`[Database] Synchronizing portfolio database records...`);
    await seedInitialData(client);
    console.log(`[Database] Synchronization completed.`);

    client.release();
    return true;
  } catch (err) {
    console.warn(`[Database Notice] PostgreSQL not yet authenticated (${err.message}). Set PGPASSWORD in backend/.env to connect directly.`);
    loadMemoryStoreFromDisk();
    console.log(`[Database] Server active with persistent disk store ready for requests (${memoryStore.projects.length} projects, ${memoryStore.inquiries.length} inquiries).`);
    isDbConnected = false;
    return false;
  }
}

export async function seedInitialData(clientOrPool = pool) {
  for (const p of memoryStore.projects) {
    await clientOrPool.query(
      `INSERT INTO projects (id, title, category, client, thumbnail, preview_video_url, video_url, description, role, deliverables, year, featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       ON CONFLICT (id) DO UPDATE SET
         title = EXCLUDED.title,
         category = EXCLUDED.category,
         client = EXCLUDED.client,
         thumbnail = EXCLUDED.thumbnail,
         preview_video_url = EXCLUDED.preview_video_url,
         video_url = EXCLUDED.video_url,
         description = EXCLUDED.description,
         role = EXCLUDED.role,
         deliverables = EXCLUDED.deliverables,
         year = EXCLUDED.year,
         featured = EXCLUDED.featured`,
      [p.id, p.title, p.category, p.client, p.thumbnail, p.preview_video_url, p.video_url, p.description, p.role, p.deliverables, p.year, p.featured]
    );
  }

  for (const t of memoryStore.testimonials) {
    await clientOrPool.query(
      `INSERT INTO testimonials (quote, author, title, company, avatar, rating)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [t.quote, t.author, t.title, t.company, t.avatar, t.rating]
    );
  }

  for (const s of memoryStore.stats) {
    await clientOrPool.query(
      `INSERT INTO stats (key_name, value, label)
       VALUES ($1, $2, $3)
       ON CONFLICT (key_name) DO NOTHING`,
      [s.key_name, s.value, s.label]
    );
  }
}

// Resilient Query Handler
export const query = async (text, params = []) => {
  if (isDbConnected) {
    return await pool.query(text, params);
  }

  // Fallback simulator for memoryStore
  const upperSql = text.toUpperCase();
  if (upperSql.includes('PROJECTS')) {
    if (upperSql.includes('INSERT INTO PROJECTS')) {
      const newProj = {
        id: memoryStore.projects.length + 1,
        title: params[0],
        category: params[1],
        client: params[2],
        thumbnail: params[3],
        preview_video_url: params[4],
        video_url: params[5],
        description: params[6],
        role: params[7],
        deliverables: params[8] || [],
        year: params[9],
        featured: params[10] || false,
        created_at: new Date().toISOString()
      };
      memoryStore.projects.push(newProj);
      saveMemoryStoreToDisk();
      return { rowCount: 1, rows: [newProj] };
    }
    if (upperSql.includes('UPDATE PROJECTS')) {
      const id = parseInt(params[11], 10);
      const proj = memoryStore.projects.find(p => p.id === id);
      if (proj) {
        if (params[0] !== undefined && params[0] !== null) proj.title = params[0];
        if (params[1] !== undefined && params[1] !== null) proj.category = params[1];
        if (params[2] !== undefined && params[2] !== null) proj.client = params[2];
        if (params[3] !== undefined && params[3] !== null) proj.thumbnail = params[3];
        if (params[4] !== undefined && params[4] !== null) proj.preview_video_url = params[4];
        if (params[5] !== undefined && params[5] !== null) proj.video_url = params[5];
        if (params[6] !== undefined && params[6] !== null) proj.description = params[6];
        if (params[7] !== undefined && params[7] !== null) proj.role = params[7];
        if (params[8] !== undefined && params[8] !== null) proj.deliverables = params[8];
        if (params[9] !== undefined && params[9] !== null) proj.year = params[9];
        if (params[10] !== undefined && params[10] !== null) proj.featured = params[10];
        saveMemoryStoreToDisk();
        return { rowCount: 1, rows: [proj] };
      }
      return { rowCount: 0, rows: [] };
    }
    if (upperSql.includes('DELETE FROM PROJECTS')) {
      const id = parseInt(params[0], 10);
      const index = memoryStore.projects.findIndex(p => p.id === id);
      if (index !== -1) {
        const deleted = memoryStore.projects.splice(index, 1);
        saveMemoryStoreToDisk();
        return { rowCount: 1, rows: deleted };
      }
      return { rowCount: 0, rows: [] };
    }
    if (upperSql.includes('WHERE ID = $1')) {
      const id = parseInt(params[0], 10);
      const found = memoryStore.projects.find(p => p.id === id);
      return { rowCount: found ? 1 : 0, rows: found ? [found] : [] };
    }
    return { rowCount: memoryStore.projects.length, rows: memoryStore.projects };
  }

  if (upperSql.includes('INQUIRIES')) {
    if (upperSql.includes('INSERT INTO INQUIRIES')) {
      const newInquiry = {
        id: memoryStore.inquiries.length + 1,
        first_name: params[0],
        last_name: params[1],
        email: params[2],
        project_type: params[3],
        budget: params[4],
        details: params[5],
        status: 'new',
        created_at: new Date().toISOString()
      };
      memoryStore.inquiries.unshift(newInquiry);
      saveMemoryStoreToDisk();
      return { rowCount: 1, rows: [newInquiry] };
    }
    if (upperSql.includes('UPDATE INQUIRIES')) {
      const status = params[0];
      const id = parseInt(params[1], 10);
      const inq = memoryStore.inquiries.find(i => i.id === id);
      if (inq) {
        inq.status = status;
        saveMemoryStoreToDisk();
        return { rowCount: 1, rows: [inq] };
      }
      return { rowCount: 0, rows: [] };
    }
    if (upperSql.includes('DELETE FROM INQUIRIES')) {
      const id = parseInt(params[0], 10);
      const index = memoryStore.inquiries.findIndex(i => i.id === id);
      if (index !== -1) {
        memoryStore.inquiries.splice(index, 1);
        saveMemoryStoreToDisk();
        return { rowCount: 1, rows: [] };
      }
      return { rowCount: 0, rows: [] };
    }
    return { rowCount: memoryStore.inquiries.length, rows: memoryStore.inquiries };
  }

  if (upperSql.includes('QUOTES')) {
    if (upperSql.includes('INSERT INTO QUOTES')) {
      const newQuote = {
        id: memoryStore.quotes.length + 1,
        client_name: params[0],
        client_email: params[1],
        project_type: params[2],
        scope: params[3],
        addons: params[4] || [],
        total_price: params[5],
        notes: params[6],
        status: 'estimated',
        created_at: new Date().toISOString()
      };
      memoryStore.quotes.unshift(newQuote);
      saveMemoryStoreToDisk();
      return { rowCount: 1, rows: [newQuote] };
    }
    return { rowCount: memoryStore.quotes.length, rows: memoryStore.quotes };
  }

  if (upperSql.includes('TESTIMONIALS')) {
    if (upperSql.includes('INSERT INTO TESTIMONIALS')) {
      const t = { id: memoryStore.testimonials.length + 1, quote: params[0], author: params[1], title: params[2], company: params[3], avatar: params[4], rating: params[5], created_at: new Date().toISOString() };
      memoryStore.testimonials.push(t); saveMemoryStoreToDisk();
      return { rowCount: 1, rows: [t] };
    }
    if (upperSql.includes('UPDATE TESTIMONIALS')) {
      const id = parseInt(params[6], 10);
      const t = memoryStore.testimonials.find(x => x.id === id);
      if (t) { t.quote = params[0] ?? t.quote; t.author = params[1] ?? t.author; t.title = params[2] ?? t.title; t.company = params[3] ?? t.company; t.avatar = params[4] ?? t.avatar; t.rating = params[5] ?? t.rating; saveMemoryStoreToDisk(); return { rowCount: 1, rows: [t] }; }
      return { rowCount: 0, rows: [] };
    }
    if (upperSql.includes('DELETE FROM TESTIMONIALS')) {
      const id = parseInt(params[0], 10);
      const idx = memoryStore.testimonials.findIndex(x => x.id === id);
      if (idx !== -1) { memoryStore.testimonials.splice(idx, 1); saveMemoryStoreToDisk(); return { rowCount: 1, rows: [] }; }
      return { rowCount: 0, rows: [] };
    }
    return { rowCount: memoryStore.testimonials.length, rows: memoryStore.testimonials };
  }

  if (upperSql.includes('STATS')) {
    if (upperSql.includes('UPDATE STATS')) {
      const key = params[2]; const s = memoryStore.stats.find(x => x.key_name === key);
      if (s) { s.value = params[0]; if (params[1]) s.label = params[1]; saveMemoryStoreToDisk(); return { rowCount: 1, rows: [s] }; }
      return { rowCount: 0, rows: [] };
    }
    if (upperSql.includes('INSERT INTO STATS')) {
      const existing = memoryStore.stats.find(x => x.key_name === params[0]);
      if (!existing) { const s = { id: memoryStore.stats.length + 1, key_name: params[0], value: params[1], label: params[2] }; memoryStore.stats.push(s); saveMemoryStoreToDisk(); return { rowCount: 1, rows: [s] }; }
      return { rowCount: 0, rows: [existing] };
    }
    return { rowCount: memoryStore.stats.length, rows: memoryStore.stats };
  }

  if (upperSql.includes('SITE_SETTINGS')) {
    if (upperSql.includes('INSERT INTO SITE_SETTINGS')) {
      const key = params[0]; const val = params[1];
      const existing = memoryStore.site_settings.find(x => x.key === key);
      if (existing) { existing.value = val; } else { memoryStore.site_settings.push({ id: memoryStore.site_settings.length + 1, key, value: val }); }
      saveMemoryStoreToDisk();
      return { rowCount: 1, rows: [{ key, value: val }] };
    }
    const map = {}; memoryStore.site_settings.forEach(s => { map[s.key] = s.value; });
    return { rowCount: memoryStore.site_settings.length, rows: memoryStore.site_settings };
  }

  if (upperSql.includes('BLOG_POSTS')) {
    if (upperSql.includes('INSERT INTO BLOG_POSTS')) {
      const post = { id: memoryStore.blog_posts.length + 1, title: params[0], slug: params[1], content: params[2], excerpt: params[3], cover_image: params[4], category: params[5], tags: params[6] || [], published: params[7], published_at: params[8], created_at: new Date().toISOString() };
      memoryStore.blog_posts.unshift(post); saveMemoryStoreToDisk();
      return { rowCount: 1, rows: [post] };
    }
    if (upperSql.includes('DELETE FROM BLOG_POSTS')) {
      const idx = memoryStore.blog_posts.findIndex(x => x.id === parseInt(params[0], 10));
      if (idx !== -1) { memoryStore.blog_posts.splice(idx, 1); saveMemoryStoreToDisk(); return { rowCount: 1, rows: [] }; }
      return { rowCount: 0, rows: [] };
    }
    if (upperSql.includes('WHERE SLUG = $1')) { const p = memoryStore.blog_posts.find(x => x.slug === params[0]); return { rowCount: p ? 1 : 0, rows: p ? [p] : [] }; }
    if (upperSql.includes('WHERE ID = $1')) { const p = memoryStore.blog_posts.find(x => x.id === parseInt(params[0], 10)); return { rowCount: p ? 1 : 0, rows: p ? [p] : [] }; }
    const visible = !upperSql.includes('DRAFT') ? memoryStore.blog_posts.filter(x => x.published) : memoryStore.blog_posts;
    return { rowCount: visible.length, rows: visible };
  }

  // Generic CMS table fallbacks
  const CMS_TABLES = ['FAQS', 'GEAR', 'AWARDS', 'SKILLS', 'CAREER_EXPERIENCE', 'CLIENT_LOGOS', 'BTS_GALLERY', 'COLOR_GRADING_SAMPLES', 'HIRING_GUARANTEES', 'PRICING_OPTIONS', 'SOCIAL_LINKS', 'CASE_STUDIES', 'PAGE_SECTIONS'];
  const storeKey = { FAQS: 'faqs', GEAR: 'gear', AWARDS: 'awards', SKILLS: 'skills', CAREER_EXPERIENCE: 'career_experience', CLIENT_LOGOS: 'client_logos', BTS_GALLERY: 'bts_gallery', COLOR_GRADING_SAMPLES: 'color_grading_samples', HIRING_GUARANTEES: 'hiring_guarantees', PRICING_OPTIONS: 'pricing_options', SOCIAL_LINKS: 'social_links', CASE_STUDIES: 'case_studies', PAGE_SECTIONS: 'page_sections' };
  for (const tbl of CMS_TABLES) {
    if (upperSql.includes(tbl)) {
      const key = storeKey[tbl];
      const store = memoryStore[key];
      if (upperSql.includes('DELETE FROM')) {
        const id = parseInt(params[0], 10); const idx = store.findIndex(x => x.id === id);
        if (idx !== -1) { store.splice(idx, 1); saveMemoryStoreToDisk(); return { rowCount: 1, rows: [] }; }
        return { rowCount: 0, rows: [] };
      }
      if (upperSql.includes('UPDATE ')) {
        const id = parseInt(params[params.length - 1], 10); const item = store.find(x => x.id === id);
        if (item) { Object.keys(item).forEach((k, i) => { if (params[i] !== undefined && params[i] !== null) item[k] = params[i]; }); saveMemoryStoreToDisk(); return { rowCount: 1, rows: [item] }; }
        return { rowCount: 0, rows: [] };
      }
      if (upperSql.includes('INSERT INTO')) {
        const newItem = { id: store.length + 1, created_at: new Date().toISOString() };
        return { rowCount: 1, rows: [newItem] };
      }
      if (upperSql.includes('WHERE ID = $1')) { const item = store.find(x => x.id === parseInt(params[0], 10)); return { rowCount: item ? 1 : 0, rows: item ? [item] : [] }; }
      return { rowCount: store.length, rows: store };
    }
  }

  if (upperSql.includes('COUNT(*)')) {
    return { rowCount: 1, rows: [{ count: 0 }] };
  }

  return { rowCount: 0, rows: [] };
};

// Export memoryStore for direct access by controllers that need it
export { memoryStore };
