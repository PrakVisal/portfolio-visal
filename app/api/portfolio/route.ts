import { sql } from '@/lib/db'
import { createSuccessResponse, handleApiError } from '@/lib/utils/api-response'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const result = await sql`
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
    `

    if (result.length === 0) {
      return NextResponse.json(
        createSuccessResponse('Portfolio data retrieved', {
          name: 'Prak Visal',
          title: 'UI/UX Designer, Flutter developer',
          description: "Hello! I'm a UI/UX designer and Backend developer.",
          location: 'Cambodia',
          socialLinks: {
            instagram: '#',
            facebook: '#',
            twitter: '#',
            youtube: '#',
          },
        })
      )
    }

    const row = result[0]
    const portfolioData = {
      id: row.id,
      name: row.name,
      title: row.title,
      description: row.description,
      location: row.location,
      socialLinks: {
        instagram: row.social_instagram || '#',
        facebook: row.social_facebook || '#',
        twitter: row.social_twitter || '#',
        youtube: row.social_youtube || '#',
      },
      updatedAt: row.updated_at,
    }

    return NextResponse.json(
      createSuccessResponse('Portfolio data retrieved successfully', portfolioData)
    )
  } catch (error) {
    return NextResponse.json(handleApiError(error), { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { portfolioUpdateSchema } = await import('@/lib/validations')

    const validatedData = portfolioUpdateSchema.parse(body)

    const result = await sql`
      UPDATE portfolio_data 
      SET 
        name = ${validatedData.name},
        title = ${validatedData.title},
        description = ${validatedData.description},
        location = ${validatedData.location},
        social_instagram = ${validatedData.socialLinks.instagram || null},
        social_facebook = ${validatedData.socialLinks.facebook || null},
        social_twitter = ${validatedData.socialLinks.twitter || null},
        social_youtube = ${validatedData.socialLinks.youtube || null},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = (SELECT id FROM portfolio_data ORDER BY updated_at DESC LIMIT 1)
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json(handleApiError(new Error('Portfolio data not found')), {
        status: 404,
      })
    }

    return NextResponse.json(createSuccessResponse('Portfolio updated successfully', result[0]))
  } catch (error) {
    return NextResponse.json(handleApiError(error), { status: 400 })
  }
}
