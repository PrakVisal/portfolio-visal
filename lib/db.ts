import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// Test the connection
pool.on("connect", () => {
  console.log("Connected to PostgreSQL database")
})

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err)
  process.exit(-1)
})

export { pool }

// Helper function to execute queries
export async function query(text: string, params?: any[]) {
  const start = Date.now()
  try {
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log("Executed query", { text, duration, rows: res.rowCount })
    return res
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// Helper function to get a single row
export async function queryRow(text: string, params?: any[]) {
  const result = await query(text, params)
  return result.rows[0]
}

// Helper function to get multiple rows
export async function queryRows(text: string, params?: any[]) {
  const result = await query(text, params)
  return result.rows
}
