import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  // Only protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Allow access to login page
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next()
    }

    try {
      // Check for valid session token
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      })

      if (!token) {
        // Redirect to login if no token
        const loginUrl = new URL("/admin/login", request.url)
        loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
      }

      // Allow access if token exists
      return NextResponse.next()
    } catch (error) {
      console.error("Middleware auth error:", error)
      // Redirect to login on error
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
