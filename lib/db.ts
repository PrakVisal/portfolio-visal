import postgres from "postgres"

// Create a connection to PostgreSQL using the pure JavaScript client
const sql = postgres(process.env.DATABASE_URL || "postgresql://localhost:5432/portfolio", {
  host: process.env.DB_HOST || "localhost",
  port: Number.parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "portfolio",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "",
  ssl: process.env.NODE_ENV === "production" ? "require" : false,
  max: 20,
  idle_timeout: 30,
  connect_timeout: 60,
  onnotice: () => {}, // Suppress notices
})

export { sql }

// Helper function for queries
export async function query(text: string, params: any[] = []) {
  const start = Date.now()
  try {
    // Convert parameterized query to postgres format
    let formattedQuery = text
    params.forEach((param, index) => {
      formattedQuery = formattedQuery.replace(`$${index + 1}`, param)
    })

    const result = await sql.unsafe(formattedQuery)
    const duration = Date.now() - start
    console.log("Executed query", { text, duration, rows: result.length })
    return { rows: result, rowCount: result.length }
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// Helper function to get a single row
export async function getOne(text: string, params: any[] = []) {
  const result = await query(text, params)
  return result.rows[0] || null
}

// Helper function to get multiple rows
export async function getMany(text: string, params: any[] = []) {
  const result = await query(text, params)
  return result.rows
}

// Test connection function
export async function testConnection() {
  try {
    await sql`SELECT NOW()`
    console.log("✅ Database connected successfully")
    return true
  } catch (error) {
    console.error("❌ Database connection failed:", error)
    return false
  }
}
