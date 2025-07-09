import { NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { join } from "path"

export async function GET() {
  try {
    // Path to CV file in public directory
    const cvPath = join(process.cwd(), "public", "cv", "Aqsam_CV.pdf")

    const fileBuffer = await readFile(cvPath)

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Aqsam_CV.pdf"',
        "Content-Length": fileBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error("CV download error:", error)
    return NextResponse.json({ success: false, message: "CV file not found" }, { status: 404 })
  }
}
