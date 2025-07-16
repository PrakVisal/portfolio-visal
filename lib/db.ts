import postgres from 'postgres'

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set')
}

// Create a connection to PostgreSQL using the Neon connection string
const sql = postgres(databaseUrl, {
  ssl: 'require', // Neon requires SSL
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
    console.log('Executed query', { text, duration, rows: result.length })
    return { rows: result, rowCount: result.length }
  } catch (error) {
    console.error('Database query error:', error)
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
    console.log('✅ Database connected successfully')
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return false
  }
}
