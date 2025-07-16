const postgres = require('postgres')
const bcrypt = require('bcryptjs')

async function createAdmin() {
  const sql = postgres(process.env.DATABASE_URL || 'postgresql://localhost:5432/portfolio')

  try {
    console.log('🔄 Creating admin user...')

    const hashedPassword = await bcrypt.hash('admin123', 12)

    await sql`
      INSERT INTO users (email, name, password, role)
      VALUES ('admin@portfolio.com', 'Admin User', ${hashedPassword}, 'admin')
      ON CONFLICT (email) DO UPDATE SET
        password = ${hashedPassword},
        role = 'admin'
    `

    console.log('✅ Admin user created successfully!')
    console.log('📧 Email: admin@portfolio.com')
    console.log('🔑 Password: admin123')
  } catch (error) {
    console.error('❌ Admin user creation failed:', error)
    process.exit(1)
  } finally {
    await sql.end()
  }
}

createAdmin()
