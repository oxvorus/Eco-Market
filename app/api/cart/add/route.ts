import { NextResponse } from "next/server"

// Store cart in memory for demo (in production: use database or Redis)
const carts = new Map()

export async function POST(request: Request) {
  try {
    const token = request.cookies.get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { productId, quantity } = body
    const userId = token.replace("token_", "")

    if (!productId || !quantity) {
      return NextResponse.json({ success: false, error: "Product ID and quantity are required" }, { status: 400 })
    }

    const cart = carts.get(userId) || []
    const existingItem = cart.find((item: any) => item.productId === productId)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({
        id: `cart-${Date.now()}`,
        productId,
        quantity,
        addedAt: new Date(),
      })
    }

    carts.set(userId, cart)

    return NextResponse.json({
      success: true,
      message: "Added to cart",
      data: cart,
    })
  } catch (error) {
    console.error("[API] Add to cart error:", error)
    return NextResponse.json({ success: false, error: "Failed to add to cart" }, { status: 500 })
  }
}
