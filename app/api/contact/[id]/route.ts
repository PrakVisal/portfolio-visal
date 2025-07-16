import { sql } from '@/lib/db'
import { createSuccessResponse, handleApiError } from '@/lib/utils/api-response'
import { NextResponse } from 'next/server'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

    const updates: string[] = []
    const values: any[] = []

    if (typeof body.isRead === 'boolean') {
      updates.push(sql`is_read = ${body.isRead}`.toString())
    }

    if (typeof body.isReplied === 'boolean') {
      updates.push(sql`is_replied = ${body.isReplied}`.toString())
    }

    if (updates.length === 0) {
      return NextResponse.json(handleApiError(new Error('No valid fields to update')), {
        status: 400,
      })
    }

    updates.push('updated_at = CURRENT_TIMESTAMP')

    const result = await sql.unsafe(
      `UPDATE contact_submissions SET ${updates.join(', ')} WHERE id = $1 RETURNING *`,
      [id]
    )

    if (result.length === 0) {
      return NextResponse.json(handleApiError(new Error('Contact submission not found')), {
        status: 404,
      })
    }

    return NextResponse.json(
      createSuccessResponse('Contact submission updated successfully', result[0])
    )
  } catch (error) {
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
