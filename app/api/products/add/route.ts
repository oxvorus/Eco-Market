import { NextResponse } from "next/server"
import { addProduct } from "@/lib/products-storage"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { name, description, price, category, images, seller_name, seller_id, eco_score } = body

    // Validation
    if (!name || !description || !price || !category || !seller_name || !seller_id) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const newProduct = addProduct({
      name,
      description,
      price: Number(price),
      category,
      images: images || ["/placeholder.svg"],
      seller_name,
      seller_id,
      eco_score: eco_score || 75,
      rating: 5,
      reviews_count: 0,
    })

    return NextResponse.json({ success: true, data: newProduct }, { status: 201 })
  } catch (error) {
    console.error("[API] Product POST error:", error)
    return NextResponse.json({ success: false, error: "Failed to add product" }, { status: 500 })
  }
}
