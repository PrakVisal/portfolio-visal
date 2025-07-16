import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET() {
  try {
    // Path to CV file in public directory
    const cvPath = join(process.cwd(), 'public', 'cv', 'PrakVisalCV.pdf')

    const fileBuffer = await readFile(cvPath)

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="PrakVisalCV.pdf"',
        'Content-Length': fileBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('CV download error:', error)
    return NextResponse.json({ success: false, message: 'CV file not found' }, { status: 404 })
  }
}
