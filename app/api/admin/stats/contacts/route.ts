import { pool } from "@/lib/db"
import { createSuccessResponse, handleApiError } from "@/lib/utils/api-response"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await pool.connect()

    const [totalResult, unreadResult, recentResult] = await Promise.all([
      client.query("SELECT COUNT(*) as count FROM contact_submissions"),
      client.query("SELECT COUNT(*) as count FROM contact_submissions WHERE is_read = FALSE"),
      client.query(`
        SELECT COUNT(*) as count 
        FROM contact_submissions 
        WHERE created_at >= NOW() - INTERVAL '7 days'
      `),
    ])

    client.release()

    return NextResponse.json(
      createSuccessResponse("Contact stats retrieved", {
        total: Number.parseInt(totalResult.rows[0].count),
        unread: Number.parseInt(unreadResult.rows[0].count),
        recent: Number.parseInt(recentResult.rows[0].count),
      }),
    )
  } catch (error) {
    return NextResponse.json(handleApiError(error), { status: 500 })
  }
}
