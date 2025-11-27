import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const token = request.cookies.get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { items, shippingAddress, paymentMethod } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ success: false, error: "Cart is empty" }, { status: 400 })
    }

    if (!shippingAddress) {
      return NextResponse.json({ success: false, error: "Shipping address is required" }, { status: 400 })
    }

    if (!paymentMethod) {
      return NextResponse.json({ success: false, error: "Payment method is required" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: "Checkout data is valid",
    })
  } catch (error) {
    console.error("[API] Checkout validate error:", error)
    return NextResponse.json({ success: false, error: "Validation failed" }, { status: 500 })
  }
}
