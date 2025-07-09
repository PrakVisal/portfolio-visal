const { Pool } = require("pg")
const fs = require("fs")
const path = require("path")

async function initDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  try {
    console.log("🔄 Initializing database...")

    const sqlPath = path.join(__dirname, "init-database.sql")
    const sql = fs.readFileSync(sqlPath, "utf8")

    await pool.query(sql)
    console.log("✅ Database initialized successfully!")
  } catch (error) {
    console.error("❌ Database initialization failed:", error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

initDatabase()
