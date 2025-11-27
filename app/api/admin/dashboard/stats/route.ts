import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const token = request.cookies.get("admin_token")?.value
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      data: {
        totalUsers: 1250,
        totalProducts: 342,
        totalOrders: 5680,
        totalRevenue: 25500000,
        activeListings: 287,
        pendingModeration: 12,
        totalCO2Saved: 15420,
        metrics: {
          userGrowth: 15.3,
          orderGrowth: 22.5,
          revenueGrowth: 18.7,
        },
      },
    })
  } catch (error) {
    console.error("[API] Dashboard stats error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch stats" }, { status: 500 })
  }
}
