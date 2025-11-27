import { NextResponse } from "next/server"
import { mockUsers } from "@/lib/db/mock-data"

export async function GET(request: Request) {
  try {
    const token = request.cookies.get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    // Extract user ID from token (mock implementation)
    const userId = token.replace("token_", "")
    const user = mockUsers.find((u) => u.id === userId)

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar_url: user.avatar_url,
      },
    })
  } catch (error) {
    console.error("[API] Auth check error:", error)
    return NextResponse.json({ success: false, error: "Auth check failed" }, { status: 500 })
  }
}
