import { pool, initializeDatabase } from '../config/db.js';

async function runSeed() {
  console.log('--- Starting Manual Database Seeding ---');
  try {
    const success = await initializeDatabase();
    if (success) {
      console.log('--- Database seeding completed successfully! ---');
    } else {
      console.error('--- Database seeding could not connect to PostgreSQL ---');
    }
  } catch (err) {
    console.error('Seed Error:', err);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

runSeed();
