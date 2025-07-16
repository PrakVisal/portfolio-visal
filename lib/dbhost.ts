// lib/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Store your Neon connection string in .env
  ssl: { rejectUnauthorized: false }, // Neon requires SSL
});

export default pool;