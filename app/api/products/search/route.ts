import { NextResponse } from "next/server"
import { mockProducts } from "@/lib/db/mock-data"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")?.toLowerCase() || ""
    const category = searchParams.get("category")
    const minPrice = Number.parseInt(searchParams.get("minPrice") || "0")
    const maxPrice = Number.parseInt(searchParams.get("maxPrice") || "999999999")
    const sortBy = searchParams.get("sortBy") || "rating"

    let results = mockProducts

    // Filter by search query
    if (query) {
      results = results.filter(
        (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query),
      )
    }

    // Filter by category
    if (category) {
      results = results.filter((p) => p.category === category)
    }

    // Filter by price range
    results = results.filter((p) => p.price >= minPrice && p.price <= maxPrice)

    // Sort results
    if (sortBy === "price-low") {
      results.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      results.sort((a, b) => b.price - a.price)
    } else if (sortBy === "newest") {
      results.sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
    } else {
      results.sort((a, b) => b.rating - a.rating)
    }

    return NextResponse.json({
      success: true,
      data: results,
      count: results.length,
    })
  } catch (error) {
    console.error("[API] Search error:", error)
    return NextResponse.json({ success: false, error: "Search failed" }, { status: 500 })
  }
}
