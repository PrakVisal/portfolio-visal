import { sql } from '@/lib/db'
import { createSuccessResponse, handleApiError } from '@/lib/utils/api-response'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [totalResult, featuredResult] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM projects`,
      sql`SELECT COUNT(*) as count FROM projects WHERE featured = TRUE`,
    ])

    return NextResponse.json(
      createSuccessResponse('Project stats retrieved', {
        total: Number.parseInt(totalResult[0].count),
        featured: Number.parseInt(featuredResult[0].count),
      })
    )
  } catch (error) {
    return NextResponse.json(handleApiError(error), { status: 500 })
  }
}
