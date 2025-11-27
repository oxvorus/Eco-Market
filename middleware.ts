import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Protected admin routes
const adminRoutes = ["/admin/dashboard", "/admin/moderation"]
const userRoutes = ["/user/home", "/user/profile", "/user/orders", "/user/cart", "/user/checkout", "/user/favorites"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const authToken = request.cookies.get("auth_token")?.value
  const adminToken = request.cookies.get("admin_token")?.value

  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (!adminToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  if (userRoutes.some((route) => pathname.startsWith(route))) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  if (pathname === "/login" && authToken) {
    return NextResponse.redirect(new URL("/user/home", request.url))
  }

  if (pathname === "/admin/login" && adminToken) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/login", "/checkout", "/cart"],
}
