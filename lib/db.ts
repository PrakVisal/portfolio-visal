import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://localhost:5432/portfolio",
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

export { pool }
