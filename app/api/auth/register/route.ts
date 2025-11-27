import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name, role } = body

    if (!email || !password || !name) {
      return NextResponse.json({ success: false, error: "Email, password, and name are required" }, { status: 400 })
    }

    // In production: hash password, check if user exists, store in database
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: role || "user",
      created_at: new Date(),
    }

    const response = NextResponse.json({
      success: true,
      message: "User registered successfully",
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
    })

    response.cookies.set({
      name: "auth_token",
      value: `token_${newUser.id}`,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
    })

    return response
  } catch (error) {
    console.error("[API] Register error:", error)
    return NextResponse.json({ success: false, error: "Registration failed" }, { status: 500 })
  }
}
