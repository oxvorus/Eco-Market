import { NextResponse } from "next/server"
import { getAllProducts, searchProducts } from "@/lib/products-storage"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const category = searchParams.get("category")
    const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined
    const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined

    let products

    if (search || category || minPrice !== undefined || maxPrice !== undefined) {
      products = searchProducts(search || undefined, category || undefined, minPrice, maxPrice)
    } else {
      products = getAllProducts()
    }

    return NextResponse.json({ success: true, data: products })
  } catch (error) {
    console.error("[API] Products GET error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}
