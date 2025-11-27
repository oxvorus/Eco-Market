import { NextResponse } from "next/server"

// Mock orders storage
const orders = new Map()

export async function POST(request: Request) {
  try {
    const token = request.cookies.get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { items, total, shippingAddress, paymentMethod } = body
    const userId = token.replace("token_", "")

    if (!items || items.length === 0) {
      return NextResponse.json({ success: false, error: "Cart is empty" }, { status: 400 })
    }

    const orderId = `ORDER-${Date.now()}`
    const order = {
      id: orderId,
      userId,
      items,
      total,
      shippingAddress,
      paymentMethod,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    orders.set(orderId, order)

    return NextResponse.json({
      success: true,
      message: "Order created successfully",
      data: order,
    })
  } catch (error) {
    console.error("[API] Checkout error:", error)
    return NextResponse.json({ success: false, error: "Checkout failed" }, { status: 500 })
  }
}
