import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeDatabase, isDbConnected, pool } from './config/db.js';

// ── Core routes ───────────────────────────────────────────────────────────────
import projectRoutes     from './routes/projectRoutes.js';
import inquiryRoutes     from './routes/inquiryRoutes.js';
import quoteRoutes       from './routes/quoteRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import statsRoutes       from './routes/statsRoutes.js';
import serviceRoutes     from './routes/serviceRoutes.js';

// ── CMS routes ────────────────────────────────────────────────────────────────
import authRoutes        from './routes/authRoutes.js';
import settingsRoutes    from './routes/settingsRoutes.js';
import blogRoutes        from './routes/blogRoutes.js';
import mediaRoutes       from './routes/mediaRoutes.js';
import contentRoutes     from './routes/contentRoutes.js';

// ── Middleware ────────────────────────────────────────────────────────────────
import { requestLogger } from './middleware/requestLogger.js';
import { notFound }      from './middleware/notFound.js';
import { errorHandler }  from './middleware/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware stack ──────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));
app.use(requestLogger);

// ── Static file serving (uploaded media) ─────────────────────────────────────
const uploadsDir = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsDir));

// ── Health & database status ──────────────────────────────────────────────────
app.get('/api/health', async (req, res) => {
  try {
    const dbRes = await pool.query('SELECT NOW()');
    res.json({
      status: 'healthy',
      service: 'Alazar Portfolio CMS Backend',
      database: 'PostgreSQL Connected',
      timestamp: dbRes.rows[0].now,
      uptime: process.uptime(),
    });
  } catch {
    res.json({
      status: 'active',
      service: 'Alazar Portfolio CMS Backend',
      database: isDbConnected
        ? 'PostgreSQL Connected'
        : 'Resilient Memory Fallback (PostgreSQL Ready)',
      uptime: process.uptime(),
    });
  }
});

// ── Core API routes ───────────────────────────────────────────────────────────
app.use('/api/projects',     projectRoutes);
app.use('/api/inquiries',    inquiryRoutes);
app.use('/api/quotes',       quoteRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/stats',        statsRoutes);
app.use('/api/services',     serviceRoutes);

// ── CMS API routes ────────────────────────────────────────────────────────────
app.use('/api/auth',         authRoutes);
app.use('/api/settings',     settingsRoutes);
app.use('/api/blog',         blogRoutes);
app.use('/api/media',        mediaRoutes);
app.use('/api/content',      contentRoutes);

// ── Root info ─────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    name: 'Alazar Asdesach Portfolio CMS API',
    version: '2.0.0',
    stack: 'PERN (PostgreSQL, Express, React, Node.js)',
    endpoints: {
      core: ['/api/health', '/api/projects', '/api/inquiries', '/api/quotes', '/api/testimonials', '/api/stats', '/api/services'],
      cms:  ['/api/auth', '/api/settings', '/api/blog', '/api/media', '/api/content/*'],
    },
  });
});

// ── Error handlers (must be last) ────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, async () => {
  console.log('═══════════════════════════════════════════════');
  console.log(`🎬  Alazar Portfolio CMS — v2.0`);
  console.log(`🚀  Server running on port ${PORT}`);
  console.log(`📡  http://localhost:${PORT}`);
  console.log(`🔐  Admin: POST /api/auth/login`);
  console.log('═══════════════════════════════════════════════');
  await initializeDatabase();
});
