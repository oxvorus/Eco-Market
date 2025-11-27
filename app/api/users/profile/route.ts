import { NextResponse } from "next/server"
import { mockUsers } from "@/lib/db/mock-data"

export async function GET(request: Request) {
  try {
    const token = request.cookies.get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const userId = token.replace("token_", "")
    const user = mockUsers.find((u) => u.id === userId)

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar_url: user.avatar_url,
        bio: user.bio,
        phone: user.phone,
        address: user.address,
        created_at: user.created_at,
      },
    })
  } catch (error) {
    console.error("[API] Profile GET error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const token = request.cookies.get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const userId = token.replace("token_", "")

    // In production: Update user in database
    // For now: Return updated data
    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: {
        ...body,
        id: userId,
      },
    })
  } catch (error) {
    console.error("[API] Profile PUT error:", error)
    return NextResponse.json({ success: false, error: "Failed to update profile" }, { status: 500 })
  }
}
