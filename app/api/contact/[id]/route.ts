import { sql } from '@/lib/db'
import { createErrorResponse, createSuccessResponse, handleApiError } from '@/lib/utils/api-response'
import { NextResponse } from 'next/server'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const id = Number.parseInt(idParam)
    const body = await request.json()

    console.log('PATCH body received:', body)

    const updates: string[] = []
    const values: any[] = []
    let paramCount = 1

    // Accept both camelCase and snake_case
    if (body.isRead !== undefined || body.is_read !== undefined) {
      updates.push(`is_read = $${paramCount}`)
      values.push(body.isRead ?? body.is_read) // ← Accept both
      paramCount++
    }

    if (body.isReplied !== undefined || body.is_replied !== undefined) {
      updates.push(`is_replied = $${paramCount}`)
      values.push(body.isReplied ?? body.is_replied) // ← Accept both
      paramCount++
    }

    if (updates.length === 0) {
      return NextResponse.json(
        createErrorResponse('No valid fields to update'),
        { status: 400 }
      )
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`)

    const result = await sql.unsafe(
      `UPDATE contact_submissions SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      [...values, id]
    )

    if (result.length === 0) {
      return NextResponse.json(
        createErrorResponse('Contact submission not found'),
        { status: 404 }
      )
    }

    const transformed = {
      id: result[0].id,
      firstName: result[0].first_name,
      lastName: result[0].last_name,
      email: result[0].email,
      subject: result[0].subject,
      message: result[0].message,
      isRead: result[0].is_read,
      isReplied: result[0].is_replied,
      createdAt: result[0].created_at,
    }

    return NextResponse.json(
      createSuccessResponse('Contact submission updated successfully', transformed)
    )
  } catch (error) {
    console.error('PATCH Error:', error)
    return NextResponse.json(handleApiError(error), { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    const result = await sql`
      DELETE FROM contact_submissions 
      WHERE id = ${id}
      RETURNING id
    `

    if (result.length === 0) {
      return NextResponse.json(handleApiError(new Error('Contact submission not found')), {
        status: 404,
      })
    }

    return NextResponse.json(createSuccessResponse('Contact submission deleted successfully'))
  } catch (error) {
    return NextResponse.json(handleApiError(error), { status: 500 })
  }
}
