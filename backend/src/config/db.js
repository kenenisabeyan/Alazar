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
  ]
};

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
    console.log(`[Database] Server active with in-memory resilient data store ready for requests.`);
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
  if (upperSql.includes('FROM PROJECTS')) {
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
        return { rowCount: 1, rows: [proj] };
      }
      return { rowCount: 0, rows: [] };
    }
    if (upperSql.includes('DELETE FROM PROJECTS')) {
      const id = parseInt(params[0], 10);
      const index = memoryStore.projects.findIndex(p => p.id === id);
      if (index !== -1) {
        const deleted = memoryStore.projects.splice(index, 1);
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

  if (upperSql.includes('FROM INQUIRIES')) {
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
      return { rowCount: 1, rows: [newInquiry] };
    }
    if (upperSql.includes('UPDATE INQUIRIES')) {
      const status = params[0];
      const id = parseInt(params[1], 10);
      const inq = memoryStore.inquiries.find(i => i.id === id);
      if (inq) {
        inq.status = status;
        return { rowCount: 1, rows: [inq] };
      }
      return { rowCount: 0, rows: [] };
    }
    if (upperSql.includes('DELETE FROM INQUIRIES')) {
      const id = parseInt(params[0], 10);
      const index = memoryStore.inquiries.findIndex(i => i.id === id);
      if (index !== -1) {
        memoryStore.inquiries.splice(index, 1);
        return { rowCount: 1, rows: [] };
      }
      return { rowCount: 0, rows: [] };
    }
    return { rowCount: memoryStore.inquiries.length, rows: memoryStore.inquiries };
  }

  if (upperSql.includes('FROM QUOTES')) {
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
      return { rowCount: 1, rows: [newQuote] };
    }
    return { rowCount: memoryStore.quotes.length, rows: memoryStore.quotes };
  }

  if (upperSql.includes('FROM TESTIMONIALS')) {
    return { rowCount: memoryStore.testimonials.length, rows: memoryStore.testimonials };
  }

  if (upperSql.includes('FROM STATS')) {
    return { rowCount: memoryStore.stats.length, rows: memoryStore.stats };
  }

  if (upperSql.includes('COUNT(*)')) {
    return { rowCount: 1, rows: [{ count: 0 }] };
  }

  return { rowCount: 0, rows: [] };
};
