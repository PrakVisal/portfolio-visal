const { Pool } = require("pg")

async function checkDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  try {
    console.log("🔄 Checking database connection...")

    const result = await pool.query("SELECT NOW() as current_time")
    console.log("✅ Database connection successful!")
    console.log("🕐 Current time:", result.rows[0].current_time)

    // Check if tables exist
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `)

    console.log("📋 Available tables:")
    tablesResult.rows.forEach((row) => {
      console.log(`  - ${row.table_name}`)
    })
  } catch (error) {
    console.error("❌ Database connection failed:", error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

checkDatabase()
