import { pool } from "@/lib/db"
import { createSuccessResponse, handleApiError } from "@/lib/utils/api-response"
import { NextResponse } from "next/server"

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

    const client = await pool.connect()

    const updates: string[] = []
    const values: any[] = []
    let paramCount = 1

    if (typeof body.isRead === "boolean") {
      updates.push(`is_read = $${paramCount}`)
      values.push(body.isRead)
      paramCount++
    }

    if (typeof body.isReplied === "boolean") {
      updates.push(`is_replied = $${paramCount}`)
      values.push(body.isReplied)
      paramCount++
    }

    if (updates.length === 0) {
      return NextResponse.json(handleApiError(new Error("No valid fields to update")), { status: 400 })
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`)
    values.push(id)

    const result = await client.query(
      `
      UPDATE contact_submissions 
      SET ${updates.join(", ")}
      WHERE id = $${paramCount}
      RETURNING *
    `,
      values,
    )

    client.release()

    if (result.rows.length === 0) {
      return NextResponse.json(handleApiError(new Error("Contact submission not found")), { status: 404 })
    }

    return NextResponse.json(createSuccessResponse("Contact submission updated successfully", result.rows[0]))
  } catch (error) {
    return NextResponse.json(handleApiError(error), { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    const client = await pool.connect()

    const result = await client.query(
      `
      DELETE FROM contact_submissions 
      WHERE id = $1
      RETURNING id
    `,
      [id],
    )

    client.release()

    if (result.rows.length === 0) {
      return NextResponse.json(handleApiError(new Error("Contact submission not found")), { status: 404 })
    }

    return NextResponse.json(createSuccessResponse("Contact submission deleted successfully"))
  } catch (error) {
    return NextResponse.json(handleApiError(error), { status: 500 })
  }
}
