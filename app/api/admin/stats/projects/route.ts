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

    const [totalResult, featuredResult] = await Promise.all([
      client.query("SELECT COUNT(*) as count FROM projects"),
      client.query("SELECT COUNT(*) as count FROM projects WHERE featured = TRUE"),
    ])

    client.release()

    return NextResponse.json(
      createSuccessResponse("Project stats retrieved", {
        total: Number.parseInt(totalResult.rows[0].count),
        featured: Number.parseInt(featuredResult.rows[0].count),
      }),
    )
  } catch (error) {
    return NextResponse.json(handleApiError(error), { status: 500 })
  }
}
