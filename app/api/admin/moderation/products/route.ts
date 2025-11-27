import { NextResponse } from "next/server"

// Mock pending products for moderation
const pendingProducts = [
  {
    id: "prod-1",
    name: "Tas Daur Ulang Baru",
    seller: "Eco Store",
    status: "pending",
    ecoScore: 8.5,
    submittedAt: "2024-01-20",
    images: ["/placeholder.svg?key=prod1"],
    description: "Tas berkualitas dari bahan daur ulang",
    category: "Fashion",
  },
  {
    id: "prod-2",
    name: "Botol Ramah Lingkungan",
    seller: "Green Living",
    status: "pending",
    ecoScore: 9.2,
    submittedAt: "2024-01-19",
    images: ["/placeholder.svg?key=prod2"],
    description: "Botol tahan lama dari material eco-friendly",
    category: "Lifestyle",
  },
]

export async function GET(request: Request) {
  try {
    const token = request.cookies.get("admin_token")?.value
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      data: pendingProducts,
      count: pendingProducts.length,
    })
  } catch (error) {
    console.error("[API] Moderation products error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const token = request.cookies.get("admin_token")?.value
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { productId, action, reason } = body

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
    }

    const index = pendingProducts.findIndex((p) => p.id === productId)
    if (index !== -1) {
      if (action === "approve") {
        pendingProducts[index].status = "approved"
      } else {
        pendingProducts[index].status = "rejected"
      }
      pendingProducts.splice(index, 1)
    }

    return NextResponse.json({
      success: true,
      message: `Product ${action}ed successfully`,
    })
  } catch (error) {
    console.error("[API] Moderation error:", error)
    return NextResponse.json({ success: false, error: "Moderation failed" }, { status: 500 })
  }
}
