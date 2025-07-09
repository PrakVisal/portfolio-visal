import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Allow access to login page
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next()
    }

    // Check for authentication token
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }

    // If token exists, allow access
    return NextResponse.next()
  }

  // For all other routes, continue normally
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
