import { pool } from "@/lib/db"
import { createSuccessResponse, handleApiError } from "@/lib/utils/api-response"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    const client = await pool.connect()

    let query = `
      SELECT 
        id,
        name,
        category,
        proficiency_level,
        display_order,
        created_at
      FROM skills
    `

    const params: any[] = []

    if (category) {
      query += " WHERE category = $1"
      params.push(category)
    }

    query += " ORDER BY display_order ASC, name ASC"

    const result = await client.query(query, params)
    client.release()

    // Group by category if no specific category requested
    if (!category) {
      const groupedSkills = result.rows.reduce(
        (acc, skill) => {
          if (!acc[skill.category]) {
            acc[skill.category] = []
          }
          acc[skill.category].push(skill)
          return acc
        },
        {} as Record<string, any[]>,
      )

      return NextResponse.json(createSuccessResponse("Skills retrieved successfully", groupedSkills))
    }

    return NextResponse.json(createSuccessResponse("Skills retrieved successfully", result.rows))
  } catch (error) {
    return NextResponse.json(handleApiError(error), { status: 500 })
  }
}
