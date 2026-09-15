import app from '../backend/src/app.js';
import { initializeDatabase } from '../backend/src/config/db.js';

let isDbInitialized = false;

export default async function handler(req, res) {
  if (!isDbInitialized) {
    try {
      await initializeDatabase();
    } catch (err) {
      console.warn('[Vercel Serverless] Database initialization notice:', err.message);
    }
    isDbInitialized = true;
  }
  return app(req, res);
}
