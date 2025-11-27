import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const token = request.cookies.get("admin_token")?.value
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      data: [
        {
          id: "user-1",
          name: "John Doe",
          email: "john@example.com",
          role: "user",
          joined: "2024-01-01",
          orders: 5,
          status: "active",
        },
        {
          id: "user-2",
          name: "Jane Smith",
          email: "jane@example.com",
          role: "creator",
          joined: "2024-01-05",
          orders: 12,
          status: "active",
        },
        {
          id: "user-3",
          name: "Eco Shop",
          email: "ecoshop@example.com",
          role: "seller",
          joined: "2024-01-10",
          orders: 25,
          status: "active",
        },
      ],
      total: 1250,
    })
  } catch (error) {
    console.error("[API] Users error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 })
  }
}
