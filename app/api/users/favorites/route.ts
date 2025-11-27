import { NextResponse } from "next/server"

// Store favorites in memory for demo (in production: use database)
const favorites = new Map()

export async function GET(request: Request) {
  try {
    const token = request.cookies.get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const userId = token.replace("token_", "")
    const userFavorites = favorites.get(userId) || []

    return NextResponse.json({
      success: true,
      data: userFavorites,
      count: userFavorites.length,
    })
  } catch (error) {
    console.error("[API] Favorites GET error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch favorites" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const token = request.cookies.get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const userId = token.replace("token_", "")
    const userFavorites = favorites.get(userId) || []

    // Add to favorites if not already present
    if (!userFavorites.find((fav: any) => fav.id === body.id)) {
      userFavorites.push(body)
      favorites.set(userId, userFavorites)
    }

    return NextResponse.json({
      success: true,
      message: "Added to favorites",
      data: userFavorites,
    })
  } catch (error) {
    console.error("[API] Favorites POST error:", error)
    return NextResponse.json({ success: false, error: "Failed to add to favorites" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const token = request.cookies.get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const itemId = searchParams.get("id")

    if (!itemId) {
      return NextResponse.json({ success: false, error: "Item ID required" }, { status: 400 })
    }

    const userId = token.replace("token_", "")
    const userFavorites = favorites.get(userId) || []

    const updated = userFavorites.filter((fav: any) => fav.id !== itemId)
    favorites.set(userId, updated)

    return NextResponse.json({
      success: true,
      message: "Removed from favorites",
      data: updated,
    })
  } catch (error) {
    console.error("[API] Favorites DELETE error:", error)
    return NextResponse.json({ success: false, error: "Failed to remove from favorites" }, { status: 500 })
  }
}
