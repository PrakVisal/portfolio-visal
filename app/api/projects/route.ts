import { pool } from "@/lib/db"
import { createSuccessResponse, handleApiError } from "@/lib/utils/api-response"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured") === "true"
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const client = await pool.connect()

    let query = `
      SELECT 
        id,
        title,
        description,
        image_url,
        technologies,
        github_url,
        live_url,
        featured,
        created_at
      FROM projects
    `

    const params: any[] = []

    if (featured) {
      query += " WHERE featured = TRUE"
    }

    query += " ORDER BY display_order ASC, created_at DESC"

    if (limit > 0) {
      params.push(limit)
      query += ` LIMIT $${params.length}`
    }

    const result = await client.query(query, params)
    client.release()

    return NextResponse.json(createSuccessResponse("Projects retrieved successfully", result.rows))
  } catch (error) {
    return NextResponse.json(handleApiError(error), { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { title, description, imageUrl, technologies, githubUrl, liveUrl, featured = false, displayOrder = 0 } = body

    const client = await pool.connect()

    const result = await client.query(
      `
      INSERT INTO projects (
        title, 
        description, 
        image_url, 
        technologies, 
        github_url, 
        live_url, 
        featured, 
        display_order
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `,
      [title, description, imageUrl, technologies, githubUrl, liveUrl, featured, displayOrder],
    )

    client.release()

    return NextResponse.json(createSuccessResponse("Project created successfully", result.rows[0]), { status: 201 })
  } catch (error) {
    return NextResponse.json(handleApiError(error), { status: 500 })
  }
}
