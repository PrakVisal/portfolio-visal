import { sql } from '@/lib/db'
import { createSuccessResponse, handleApiError } from '@/lib/utils/api-response'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test database connection
    await sql`SELECT 1`

    return NextResponse.json(
      createSuccessResponse('Portfolio API is running successfully!', {
        status: 'healthy',
        database: 'connected',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
      })
    )
  } catch (error) {
    return NextResponse.json(handleApiError(new Error('Database connection failed')), {
      status: 503,
    })
  }
}
