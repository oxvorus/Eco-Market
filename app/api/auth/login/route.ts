import { NextResponse } from "next/server"
import { mockUsers } from "@/lib/db/mock-data"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
    }

    // Mock authentication (in production: hash & verify password)
    const user = mockUsers.find((u) => u.email === email)

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 401 })
    }

    // In production: use proper JWT tokens
    const response = NextResponse.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })

    // Set auth cookie (in production: use secure, httpOnly cookies)
    response.cookies.set({
      name: "auth_token",
      value: `token_${user.id}`,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("[API] Login error:", error)
    return NextResponse.json({ success: false, error: "Login failed" }, { status: 500 })
  }
}
