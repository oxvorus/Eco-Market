"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, ShoppingCart, Share2, Star, Leaf, Play, Eye, TrendingUp, Package, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getMainRouteFromStorage } from "@/lib/role"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function FavoritesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("products")

  const { data: favoritesData, mutate: mutateFavorites } = useSWR("/api/users/favorites", fetcher)
  const favorites = favoritesData?.data || []

  const onAvatarClick = () => {
    router.push(getMainRouteFromStorage())
  }

  const handleRemoveFavorite = async (itemId: string | number) => {
    try {
      const response = await fetch(`/api/users/favorites?id=${itemId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        mutateFavorites()
      }
    } catch (error) {
      console.error("Error removing favorite:", error)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  // Separate products and content
  const favoriteProducts = favorites.filter((item: any) => item.type === "product" || item.items)
  const favoriteContent = favorites.filter((item: any) => item.type === "content" || item.thumbnail)

  // Calculate eco stats
  const ecoStats = {
    totalProducts: favoriteProducts.length,
    totalContent: favoriteContent.length,
    estimatedSavings: favoriteProducts.reduce((sum: number, p: any) => sum + (p.originalPrice - p.price), 0),
    carbonSaved: favoriteProducts.reduce((sum: number, p: any) => sum + (p.carbonSaved || 0), 0),
    wasteReduced: favoriteProducts.reduce((sum: number, p: any) => sum + (p.wasteReduced || 0), 0),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/user/home" className="flex items-center space-x-3">
              <Image src="/ecomarket-logo.png" alt="ecomarket Logo" width={40} height={40} className="rounded-lg" />
              <div>
                <h1 className="text-xl font-bold text-green-800">ecomarket</h1>
                <p className="text-xs text-green-600">Favorites</p>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/user/cart">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </Link>
              <Avatar
                onClick={onAvatarClick}
                role="button"
                tabIndex={0}
                aria-label="Kembali ke halaman utama"
                title="Kembali ke halaman utama"
                className="cursor-pointer ring-2 ring-green-200 hover:ring-green-400 transition-all"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onAvatarClick()
                }}
              >
                <AvatarImage src="/placeholder.svg?key=favuser" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Eco Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Favorites</p>
                  <p className="text-3xl font-bold">{ecoStats.totalProducts + ecoStats.totalContent}</p>
                  <p className="text-sm text-green-100">{ecoStats.totalProducts} produk</p>
                </div>
                <Heart className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Est. Hemat</p>
                  <p className="text-3xl font-bold">
                    {formatPrice(ecoStats.estimatedSavings).replace("IDR", "Rp").replace(",00", "")}
                  </p>
                  <p className="text-sm text-blue-100">Jika semua dibeli</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100">Karbon Tersimpan</p>
                  <p className="text-3xl font-bold">{ecoStats.carbonSaved.toFixed(1)}kg</p>
                  <p className="text-sm text-emerald-100">CO2 equivalent</p>
                </div>
                <Leaf className="h-8 w-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Sampah Berkurang</p>
                  <p className="text-3xl font-bold">{ecoStats.wasteReduced.toFixed(1)}kg</p>
                  <p className="text-sm text-purple-100">Dari produk favorit</p>
                </div>
                <Package className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/80 border border-green-200">
            <TabsTrigger
              value="products"
              className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
            >
              Produk ({ecoStats.totalProducts})
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
              Konten ({ecoStats.totalContent})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            {favoriteProducts.length === 0 ? (
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Belum ada favorit</h3>
                  <p className="text-gray-500 mb-6">Mulai tambahkan produk favorit Anda</p>
                  <Link href="/marketplace">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Leaf className="h-4 w-4 mr-2" />
                      Jelajahi Marketplace
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {favoriteProducts.map((product: any) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm"
                  >
                    <div className="relative">
                      <Image
                        src={product.image || product.images?.[0] || "/placeholder.svg?key=prod"}
                        alt={product.name}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-green-600 text-white">
                          <Leaf className="h-3 w-3 mr-1" />
                          {product.eco_score || product.ecoScore}
                        </Badge>
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => handleRemoveFavorite(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>

                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-green-600">{formatPrice(product.price)}</span>
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.originalPrice || product.price * 1.3)}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{product.rating || 4.5}</span>
                          <span className="text-sm text-gray-500">({product.reviews_count || 0} ulasan)</span>
                        </div>

                        <div className="text-sm text-gray-600">
                          oleh <span className="font-medium">{product.seller_name || "Seller"}</span>
                        </div>

                        <div className="flex space-x-2 pt-2">
                          <Link href={`/product/${product.id}`} className="flex-1">
                            <Button className="w-full bg-green-600 hover:bg-green-700" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Lihat
                            </Button>
                          </Link>
                          <Button variant="outline" size="icon">
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            {favoriteContent.length === 0 ? (
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Play className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Belum ada konten favorit</h3>
                  <p className="text-gray-500 mb-6">Mulai tambahkan konten edukasi favorit Anda</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {favoriteContent.map((video: any) => (
                  <Card
                    key={video.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm"
                  >
                    <div className="relative">
                      <Image
                        src={video.thumbnail || "/placeholder.svg?key=vid"}
                        alt={video.title}
                        width={400}
                        height={225}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Button size="icon" className="bg-white/90 hover:bg-white text-black">
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => handleRemoveFavorite(video.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-900 line-clamp-2">{video.title}</h3>

                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={video.avatar || "/placeholder.svg?key=avat"} />
                            <AvatarFallback>C</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{video.creator}</p>
                            <p className="text-xs text-gray-500">{video.views} views</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Play className="h-4 w-4 mr-1" />
                            Tonton
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Share2 className="h-4 w-4 mr-1" />
                            Bagikan
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
