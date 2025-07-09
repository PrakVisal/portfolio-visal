const postgres = require("postgres")

async function checkDatabase() {
  const sql = postgres(process.env.DATABASE_URL || "postgresql://localhost:5432/portfolio")

  try {
    console.log("🔄 Checking database connection...")

    const result = await sql`SELECT NOW() as current_time`
    console.log("✅ Database connected successfully!")
    console.log("🕐 Current time:", result[0].current_time)

    // Check if tables exist
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `

    console.log("📋 Available tables:")
    tables.forEach((table) => {
      console.log(`  - ${table.table_name}`)
    })
  } catch (error) {
    console.error("❌ Database connection failed:", error)
    process.exit(1)
  } finally {
    await sql.end()
  }
}

checkDatabase()
