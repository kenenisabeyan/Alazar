import app from './app.js';
import { initializeDatabase } from './config/db.js';

const PORT = process.env.PORT || 5000;

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
