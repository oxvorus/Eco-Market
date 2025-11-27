import { NextResponse } from "next/server"

// Admin credentials (in production: use proper database)
const ADMIN_CREDENTIALS = {
  email: "admin@ecomarket.com",
  password: "admin123",
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const response = NextResponse.json({
        success: true,
        message: "Admin login successful",
        user: {
          id: "admin-1",
          email,
          role: "admin",
          name: "Administrator",
        },
      })

      response.cookies.set("admin_token", `admin_token_${Date.now()}`, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
      })

      return response
    }

    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("[API] Admin auth error:", error)
    return NextResponse.json({ success: false, error: "Auth failed" }, { status: 500 })
  }
}
