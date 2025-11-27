"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getMainRouteFromStorage } from "@/lib/role"
import {
  Search,
  ShoppingCart,
  Heart,
  Play,
  Leaf,
  Recycle,
  TrendingUp,
  Users,
  MessageCircle,
  Share2,
  Filter,
  Grid3X3,
  List,
  Bell,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ProductCard } from "@/components/product-card"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function UserHomePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const { data: productsData } = useSWR("/api/products", fetcher)
  const products = productsData?.data?.slice(0, 3) || []

  const onAvatarClick = () => {
    router.push(getMainRouteFromStorage())
  }

  const trendingVideos = [
    {
      id: 1,
      title: "5 Cara Mudah Upcycle Botol Plastik",
      creator: "EcoLife Indonesia",
      views: "125K",
      duration: "8:45",
      thumbnail: "/upcycle-video.jpg",
      avatar: "/creator-avatar.png",
      ecoTips: "Refuse, Reuse, Recycle",
    },
    {
      id: 2,
      title: "DIY Kompos dari Sampah Dapur",
      creator: "Green Living ID",
      views: "89K",
      duration: "12:30",
      thumbnail: "/composting-video.jpg",
      avatar: "/creator-avatar.png",
      ecoTips: "Rot",
    },
  ]

  const ecoStats = {
    totalMembers: "1,247",
    wasteCollected: "2,847.5 kg",
    carbonSaved: "1,523.2 kg CO2",
    recyclingRate: "78.5%",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <Image src="/ecomarket-logo.png" alt="ecomarket Logo" width={40} height={40} className="rounded-lg" />
                <div>
                  <h1 className="text-xl font-bold text-green-800">ecomarket</h1>
                  <p className="text-xs text-green-600">Don't Throw It, ReMarket It!</p>
                </div>
              </Link>
            </div>

            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari produk ramah lingkungan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-green-200 focus:border-green-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Link href="/user/favorites">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/user/cart">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </Link>
              <Avatar
                onClick={onAvatarClick}
                role="button"
                tabIndex={0}
                aria-label="Buka menu utama"
                title="Menu utama"
                className="cursor-pointer ring-2 ring-green-200"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onAvatarClick()
                }}
              >
                <AvatarImage src="/diverse-user-avatars.png" />
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
                  <p className="text-green-100">Total Anggota</p>
                  <p className="text-2xl font-bold">{ecoStats.totalMembers}</p>
                  <p className="text-sm text-green-100">+15.3% bulan ini</p>
                </div>
                <Users className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Sampah Terkumpul</p>
                  <p className="text-2xl font-bold">{ecoStats.wasteCollected}</p>
                  <p className="text-sm text-blue-100">Target: 3,000 kg</p>
                </div>
                <Recycle className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100">Karbon Tersimpan</p>
                  <p className="text-2xl font-bold">{ecoStats.carbonSaved}</p>
                  <p className="text-sm text-emerald-100">Setara 650 pohon</p>
                </div>
                <Leaf className="h-8 w-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100">Tingkat Daur Ulang</p>
                  <p className="text-2xl font-bold">{ecoStats.recyclingRate}</p>
                  <p className="text-sm text-amber-100">Target: 85%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-amber-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products">Produk Eco-Friendly</TabsTrigger>
            <TabsTrigger value="videos">Video Edukasi</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Produk Pilihan</h2>
              <div className="flex items-center space-x-2">
                <Link href="/marketplace">
                  <Button variant="outline">Lihat Semua Produk</Button>
                </Link>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
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
            </div>

            <div
              className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
            >
              {products.map((product: any) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.price * 1.3}
                  image={product.images?.[0] || "/placeholder.svg"}
                  seller={product.seller_name || "Seller"}
                  rating={product.rating}
                  reviews={product.reviews_count}
                  ecoScore={product.eco_score}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Video Edukasi Zero Waste</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trendingVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
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
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="secondary">{video.duration}</Badge>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-blue-600 text-white">{video.ecoTips}</Badge>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-900 line-clamp-2">{video.title}</h3>

                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={video.avatar || "/placeholder.svg"} />
                          <AvatarFallback>C</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{video.creator}</p>
                          <p className="text-xs text-gray-500">{video.views} views</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 pt-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Komentar
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4 mr-1" />
                          Bagikan
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
