import { NextResponse } from "next/server"

// Store carts in memory (in production: use database or Redis)
const carts = new Map()

export async function GET(request: Request) {
  try {
    const token = request.cookies.get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const userId = token.replace("token_", "")
    const cart = carts.get(userId) || []

    return NextResponse.json({
      success: true,
      data: cart,
      count: cart.length,
      total: cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0),
    })
  } catch (error) {
    console.error("[API] Cart GET error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch cart" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const token = request.cookies.get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const userId = token.replace("token_", "")
    carts.delete(userId)

    return NextResponse.json({
      success: true,
      message: "Cart cleared",
    })
  } catch (error) {
    console.error("[API] Cart DELETE error:", error)
    return NextResponse.json({ success: false, error: "Failed to clear cart" }, { status: 500 })
  }
}
