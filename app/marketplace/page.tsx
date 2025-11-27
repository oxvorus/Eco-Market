"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, X, Grid3X3, List } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ProductCard } from "@/components/product-card"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function MarketplacePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all")
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 5000000,
  })
  const [sortBy, setSortBy] = useState("rating")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const queryParams = new URLSearchParams()
  if (searchQuery) queryParams.append("search", searchQuery)
  if (selectedCategory !== "all") queryParams.append("category", selectedCategory)
  queryParams.append("minPrice", priceRange.min.toString())
  queryParams.append("maxPrice", priceRange.max.toString())

  const { data, error, isLoading } = useSWR(`/api/products?${queryParams.toString()}`, fetcher)

  const categories = [
    { id: "all", label: "Semua Kategori" },
    { id: "electronics", label: "Elektronik" },
    { id: "fashion", label: "Fashion" },
    { id: "home", label: "Rumah & Furnitur" },
    { id: "food", label: "Makanan & Minuman" },
    { id: "other", label: "Lainnya" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.append("q", searchQuery)
    if (selectedCategory !== "all") params.append("category", selectedCategory)
    router.push(`/marketplace?${params.toString()}`)
  }

  const products = data?.data || []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/ecomarket-logo.png" alt="ecomarket" width={40} height={40} className="rounded-lg" />
              <div>
                <h1 className="text-xl font-bold text-green-800">ecomarket</h1>
                <p className="text-xs text-green-600">Don't Throw It, ReMarket It!</p>
              </div>
            </Link>

            <form onSubmit={handleSearch} className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari produk ramah lingkungan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-green-200 focus:border-green-500"
                />
              </div>
            </form>

            <Link href="/user/cart">
              <Button variant="outline" className="hover:border-green-500 bg-transparent">
                Keranjang
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:block ${showFilters ? "block" : "hidden"}`}>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Filter</h3>
                    <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)} className="lg:hidden">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Category Filter */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-700">Kategori</h4>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <Button
                          key={cat.id}
                          variant={selectedCategory === cat.id ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setSelectedCategory(cat.id)}
                        >
                          {cat.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-700">Harga</h4>
                    <div className="space-y-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) =>
                          setPriceRange({
                            ...priceRange,
                            min: Number.parseInt(e.target.value) || 0,
                          })
                        }
                        className="text-sm"
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) =>
                          setPriceRange({
                            ...priceRange,
                            max: Number.parseInt(e.target.value) || 5000000,
                          })
                        }
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={() => setShowFilters(true)} className="lg:hidden">
                  <Filter className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-600">Menampilkan {products.length} produk</span>
              </div>

              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Products */}
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Memuat produk...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Tidak ada produk ditemukan</p>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2" : "grid-cols-1"
                }`}
              >
                {products.map((product: any) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.original_price || product.price}
                    image={product.images?.[0] || "/placeholder.svg"}
                    seller={product.seller_name || "Seller"}
                    rating={product.rating}
                    reviews={product.reviews_count}
                    ecoScore={product.eco_score}
                    onAddToCart={() => {
                      console.log(`Added ${product.name} to cart`)
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
