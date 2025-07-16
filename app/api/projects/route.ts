import { sql } from '@/lib/db'
import { createSuccessResponse, handleApiError } from '@/lib/utils/api-response'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured') === 'true'
    const limit = Number.parseInt(searchParams.get('limit') || '10')

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
      FROM projects`

    const params: any[] = []

    if (featured) {
      query += ' WHERE featured = TRUE'
    }

    query += ' ORDER BY display_order ASC, created_at DESC'

    if (limit > 0) {
      params.push(limit)
      query += ` LIMIT $${params.length}`
    }

    let result
    if (params.length > 0) {
      result = await sql.unsafe(query, params)
    } else {
      result = await sql.unsafe(query)
    }

    return NextResponse.json(createSuccessResponse('Projects retrieved successfully', result))
  } catch (error) {
    return NextResponse.json(handleApiError(error), { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      title,
      description,
      imageUrl,
      technologies,
      githubUrl,
      liveUrl,
      featured = false,
      displayOrder = 0,
    } = body

    const result = await sql`
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
      VALUES (${title}, ${description}, ${imageUrl}, ${technologies}, ${githubUrl}, ${liveUrl}, ${featured}, ${displayOrder})
      RETURNING *
    `

    return NextResponse.json(createSuccessResponse('Project created successfully', result[0]), {
      status: 201,
    })
  } catch (error) {
    return NextResponse.json(handleApiError(error), { status: 500 })
  }
}
