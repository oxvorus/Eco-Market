import { NextResponse } from "next/server"
import { mockOrders } from "@/lib/db/mock-data"

export async function GET(request: Request) {
  try {
    const token = request.cookies.get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const userId = token.replace("token_", "")
    const userOrders = mockOrders.filter((o) => o.user_id === userId)

    return NextResponse.json({
      success: true,
      data: userOrders,
      count: userOrders.length,
    })
  } catch (error) {
    console.error("[API] Orders GET error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 })
  }
}
