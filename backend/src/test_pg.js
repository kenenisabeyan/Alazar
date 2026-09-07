import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pg;

const passwordsToTry = [
  'postgres',
  'root',
  'admin',
  '1234',
  '12345',
  '123456',
  '1234567',
  '12345678',
  '123456789',
  '0000',
  '1111',
  'password',
  'password123',
  'alazar',
  'alazar123',
  'alazar2024',
  'alazar2025',
  'alazar2026',
  'kenenisa',
  'kenenisa123',
  'ethiopia',
  'hotel',
  'base',
  'newbase',
  'root123',
  'admin123',
  'PostgreSQL',
  'Postgres123',
  'postgres123',
  'P@ssword1',
  'P@ssword',
  ''
];

async function testConnection() {
  for (const password of passwordsToTry) {
    const client = new Client({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: password,
      database: 'postgres',
    });

    try {
      await client.connect();
      console.log(`\n==============================================`);
      console.log(`SUCCESS! Connected to PostgreSQL with password: "${password}"`);
      console.log(`==============================================\n`);
      await client.end();
      return password;
    } catch (err) {
      // quiet fail
    }
  }
  console.log('None of the expanded candidate passwords worked.');
  return null;
}

testConnection();
