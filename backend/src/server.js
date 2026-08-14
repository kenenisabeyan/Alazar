import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { initializeDatabase, isDbConnected, pool } from './config/db.js';

import projectRoutes from './routes/projectRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import quoteRoutes from './routes/quoteRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));

// Health & Database status endpoint
app.get('/api/health', async (req, res) => {
  try {
    const dbRes = await pool.query('SELECT NOW()');
    res.json({
      status: 'healthy',
      service: 'Alazar Portfolio PERN Backend',
      database: 'PostgreSQL Connected',
      timestamp: dbRes.rows[0].now,
      uptime: process.uptime()
    });
  } catch (err) {
    res.json({
      status: 'active',
      service: 'Alazar Portfolio PERN Backend',
      database: isDbConnected ? 'PostgreSQL Connected' : 'Resilient Memory Fallback (PostgreSQL Ready)',
      uptime: process.uptime()
    });
  }
});

// Mount API routes
app.use('/api/projects', projectRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/stats', statsRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    name: 'Alazar Asdesach Portfolio API',
    stack: 'PERN (PostgreSQL, Express, React, Node.js)',
    version: '1.0.0',
    endpoints: [
      '/api/health',
      '/api/projects',
      '/api/inquiries',
      '/api/quotes',
      '/api/testimonials',
      '/api/stats'
    ]
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server and Initialize PostgreSQL
app.listen(PORT, async () => {
  console.log(`=========================================`);
  console.log(`🚀 PERN Server running on port ${PORT}`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`=========================================`);
  await initializeDatabase();
});
