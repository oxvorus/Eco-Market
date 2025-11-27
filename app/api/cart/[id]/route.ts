import { NextResponse } from "next/server"

const carts = new Map()

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { quantity } = body
    const userId = token.replace("token_", "")

    if (!quantity || quantity < 1) {
      return NextResponse.json({ success: false, error: "Invalid quantity" }, { status: 400 })
    }

    const cart = carts.get(userId) || []
    const item = cart.find((item: any) => item.id === params.id)

    if (!item) {
      return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 })
    }

    item.quantity = quantity
    carts.set(userId, cart)

    return NextResponse.json({
      success: true,
      message: "Quantity updated",
      data: cart,
    })
  } catch (error) {
    console.error("[API] Cart PATCH error:", error)
    return NextResponse.json({ success: false, error: "Failed to update quantity" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const userId = token.replace("token_", "")
    const cart = carts.get(userId) || []

    const updated = cart.filter((item: any) => item.id !== params.id)
    carts.set(userId, updated)

    return NextResponse.json({
      success: true,
      message: "Item removed",
      data: updated,
    })
  } catch (error) {
    console.error("[API] Cart DELETE error:", error)
    return NextResponse.json({ success: false, error: "Failed to remove item" }, { status: 500 })
  }
}
