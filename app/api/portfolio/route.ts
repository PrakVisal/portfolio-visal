import { pool } from "@/lib/db"
import { createSuccessResponse, handleApiError } from "@/lib/utils/api-response"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const client = await pool.connect()

    const result = await client.query(`
      SELECT 
        id,
        name,
        title,
        description,
        location,
        social_instagram,
        social_facebook,
        social_twitter,
        social_youtube,
        updated_at
      FROM portfolio_data 
      ORDER BY updated_at DESC 
      LIMIT 1
    `)

    client.release()

    if (result.rows.length === 0) {
      return NextResponse.json(
        createSuccessResponse("Portfolio data retrieved", {
          name: "Muhammad Aqsam",
          title: "UI/UX Designer, Flutter developer",
          description: "Hello! I'm a UI/UX designer and Flutter developer.",
          location: "Pakistan",
          socialLinks: {
            instagram: "#",
            facebook: "#",
            twitter: "#",
            youtube: "#",
          },
        }),
      )
    }

    const row = result.rows[0]
    const portfolioData = {
      id: row.id,
      name: row.name,
      title: row.title,
      description: row.description,
      location: row.location,
      socialLinks: {
        instagram: row.social_instagram || "#",
        facebook: row.social_facebook || "#",
        twitter: row.social_twitter || "#",
        youtube: row.social_youtube || "#",
      },
      updatedAt: row.updated_at,
    }

    return NextResponse.json(createSuccessResponse("Portfolio data retrieved successfully", portfolioData))
  } catch (error) {
    return NextResponse.json(handleApiError(error), { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { portfolioUpdateSchema } = await import("@/lib/validations")

    const validatedData = portfolioUpdateSchema.parse(body)

    const client = await pool.connect()

    const result = await client.query(
      `
      UPDATE portfolio_data 
      SET 
        name = $1,
        title = $2,
        description = $3,
        location = $4,
        social_instagram = $5,
        social_facebook = $6,
        social_twitter = $7,
        social_youtube = $8,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = (SELECT id FROM portfolio_data ORDER BY updated_at DESC LIMIT 1)
      RETURNING *
    `,
      [
        validatedData.name,
        validatedData.title,
        validatedData.description,
        validatedData.location,
        validatedData.socialLinks.instagram || null,
        validatedData.socialLinks.facebook || null,
        validatedData.socialLinks.twitter || null,
        validatedData.socialLinks.youtube || null,
      ],
    )

    client.release()

    if (result.rows.length === 0) {
      return NextResponse.json(handleApiError(new Error("Portfolio data not found")), { status: 404 })
    }

    return NextResponse.json(createSuccessResponse("Portfolio updated successfully", result.rows[0]))
  } catch (error) {
    return NextResponse.json(handleApiError(error), { status: 400 })
  }
}
