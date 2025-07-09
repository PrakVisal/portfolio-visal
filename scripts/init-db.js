const postgres = require("postgres")
const fs = require("fs")
const path = require("path")

async function initDatabase() {
  const sql = postgres(process.env.DATABASE_URL || "postgresql://localhost:5432/portfolio")

  try {
    console.log("🔄 Initializing database...")

    const sqlPath = path.join(__dirname, "init-database.sql")
    const sqlContent = fs.readFileSync(sqlPath, "utf8")

    // Split SQL content by semicolons and execute each statement
    const statements = sqlContent.split(";").filter((stmt) => stmt.trim())

    for (const statement of statements) {
      if (statement.trim()) {
        await sql.unsafe(statement.trim())
      }
    }

    console.log("✅ Database initialized successfully!")
  } catch (error) {
    console.error("❌ Database initialization failed:", error)
    process.exit(1)
  } finally {
    await sql.end()
  }
}

initDatabase()
