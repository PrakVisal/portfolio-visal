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

    const [totalResult, unreadResult, recentResult] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM contact_submissions`,
      sql`SELECT COUNT(*) as count FROM contact_submissions WHERE is_read = FALSE`,
      sql`SELECT COUNT(*) as count FROM contact_submissions WHERE created_at >= NOW() - INTERVAL '7 days'`,
    ])

    return NextResponse.json(
      createSuccessResponse('Contact stats retrieved', {
        total: Number.parseInt(totalResult[0].count),
        unread: Number.parseInt(unreadResult[0].count),
        recent: Number.parseInt(recentResult[0].count),
      })
    )
  } catch (error) {
    return NextResponse.json(handleApiError(error), { status: 500 })
  }
}
