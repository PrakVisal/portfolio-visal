const { Pool } = require("pg")

async function checkDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  try {
    console.log("🔄 Checking database connection...")

    const result = await pool.query("SELECT NOW() as current_time, version() as version")
    console.log("✅ Database connected successfully!")
    console.log("⏰ Current time:", result.rows[0].current_time)
    console.log("🗄️ Version:", result.rows[0].version.split(" ")[0] + " " + result.rows[0].version.split(" ")[1])
  } catch (error) {
    console.error("❌ Database connection failed:", error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

checkDatabase()
