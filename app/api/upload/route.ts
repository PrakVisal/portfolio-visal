import { type NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { createSuccessResponse, handleApiError } from "@/lib/utils/api-response"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const type = (formData.get("type") as string) || "general"

    if (!file) {
      return NextResponse.json(handleApiError(new Error("No file provided")), { status: 400 })
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        handleApiError(new Error("Invalid file type. Only JPEG, PNG, WebP, and PDF files are allowed.")),
        { status: 400 },
      )
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(handleApiError(new Error("File size too large. Maximum size is 5MB.")), { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create upload directory based on type
    const uploadDir = join(process.cwd(), "public", "uploads", type)
    await mkdir(uploadDir, { recursive: true })

    // Generate unique filename
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
    const filename = `${timestamp}_${originalName}`
    const filepath = join(uploadDir, filename)

    await writeFile(filepath, buffer)

    // Return the public URL
    const publicUrl = `/uploads/${type}/${filename}`

    return NextResponse.json(
      createSuccessResponse("File uploaded successfully", {
        filename,
        url: publicUrl,
        size: file.size,
        type: file.type,
      }),
    )
  } catch (error) {
    return NextResponse.json(handleApiError(error), { status: 500 })
  }
}
