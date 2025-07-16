import { sql } from '@/lib/db'
import { sendEmail, generateContactEmailTemplate, generateAutoReplyTemplate } from '@/lib/email'
import { contactFormSchema } from '@/lib/validations'
import {
  createSuccessResponse,
  createErrorResponse,
  handleApiError,
} from '@/lib/utils/api-response'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate the request data
    const validatedData = contactFormSchema.parse(body)

    // Save to database
    const result = await sql`
      INSERT INTO contact_submissions (first_name, last_name, email, subject, message)
      VALUES (${validatedData.firstName}, ${validatedData.lastName}, ${validatedData.email}, ${validatedData.subject}, ${validatedData.message})
      RETURNING id, created_at
    `

    const submissionId = result[0].id

    // Send notification email to admin (if configured)
    if (process.env.ADMIN_EMAIL && process.env.SMTP_USER) {
      try {
        const emailTemplate = generateContactEmailTemplate(validatedData)
        await sendEmail({
          to: process.env.ADMIN_EMAIL,
          subject: `New Contact Form Submission: ${validatedData.subject}`,
          html: emailTemplate.html,
          text: emailTemplate.text,
        })
      } catch (emailError) {
        console.error('Failed to send admin notification email:', emailError)
        // Don't fail the request if email fails
      }
    }

    // Send auto-reply to user (if configured)
    if (process.env.SMTP_USER) {
      try {
        const autoReplyTemplate = generateAutoReplyTemplate(validatedData.firstName)
        await sendEmail({
          to: validatedData.email,
          subject: 'Thank you for contacting me!',
          html: autoReplyTemplate.html,
          text: autoReplyTemplate.text,
        })
      } catch (emailError) {
        console.error('Failed to send auto-reply email:', emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      createSuccessResponse("Message sent successfully! I'll get back to you soon.", {
        submissionId,
      })
    )
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors: Record<string, string> = {}
      error.errors.forEach(err => {
        if (err.path.length > 0) {
          fieldErrors[err.path[0].toString()] = err.message
        }
      })

      return NextResponse.json(createErrorResponse('Validation failed', fieldErrors), {
        status: 400,
      })
    }

    return NextResponse.json(handleApiError(error), { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get('page') || '1')
    const limit = Number.parseInt(searchParams.get('limit') || '10')
    const unreadOnly = searchParams.get('unread') === 'true'

    const offset = (page - 1) * limit

    let whereClause = ''
    if (unreadOnly) {
      whereClause = 'WHERE is_read = FALSE'
    }

    const countResult = await sql.unsafe(`
      SELECT COUNT(*) as total FROM contact_submissions ${whereClause}
    `)

    const result = await sql.unsafe(
      `
      SELECT 
        id,
        first_name,
        last_name,
        email,
        subject,
        message,
        is_read,
        is_replied,
        created_at
      FROM contact_submissions 
      ${whereClause}
      ORDER BY created_at DESC 
      LIMIT $1 OFFSET $2
    `,
      [limit, offset]
    )

    const total = Number.parseInt(countResult[0].total)
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json(
      createSuccessResponse('Contact submissions retrieved successfully', {
        submissions: result,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      })
    )
  } catch (error) {
    return NextResponse.json(handleApiError(error), { status: 500 })
  }
}
