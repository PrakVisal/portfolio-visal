const { Pool } = require("pg")
const fs = require("fs")
const path = require("path")

async function createAdmin() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  try {
    console.log("🔄 Creating admin user...")

    const sqlPath = path.join(__dirname, "create-admin-user.sql")
    const sql = fs.readFileSync(sqlPath, "utf8")

    await pool.query(sql)
    console.log("✅ Admin user created successfully!")
    console.log("📧 Email: admin@portfolio.com")
    console.log("🔑 Password: admin123")
  } catch (error) {
    console.error("❌ Admin user creation failed:", error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

createAdmin()
