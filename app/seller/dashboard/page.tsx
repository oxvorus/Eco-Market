"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getMainRouteFromStorage } from "@/lib/role"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Plus,
  Search,
  Filter,
  MessageCircle,
  DollarSign,
  Package,
  Users,
  Star,
  Eye,
  Settings,
  TrendingUp,
  Leaf,
  TreePine,
  Award,
  Target,
  BarChart3,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const onAvatarClick = () => {
    router.push(getMainRouteFromStorage())
  }

  const stats = {
    totalProducts: 45,
    totalSales: 15670000,
    activeCollaborations: 12,
    totalViews: 89430,
    ecoScore: 8.7,
    co2Saved: 125.5,
    monthlyGrowth: 18.5,
    customerSatisfaction: 4.8,
  }

  const myProducts = [
    {
      id: "1",
      name: "Serum Vitamin C Organik Premium",
      price: 89000,
      stock: 150,
      sold: 234,
      image: "/placeholder.svg?height=100&width=100&text=Serum",
      status: "active",
      collaborations: 5,
      ecoScore: 9.2,
      co2Saved: 2.5,
      category: "Skincare Organik",
      rating: 4.8,
      reviews: 124,
    },
    {
      id: "2",
      name: "Smartphone Refurbished Grade A",
      price: 2500000,
      stock: 89,
      sold: 156,
      image: "/placeholder.svg?height=100&width=100&text=Phone",
      status: "active",
      collaborations: 3,
      ecoScore: 8.7,
      co2Saved: 15.2,
      category: "Electronics Refurbished",
      rating: 4.6,
      reviews: 89,
    },
    {
      id: "3",
      name: "Tas Daur Ulang Premium",
      price: 125000,
      stock: 0,
      sold: 89,
      image: "/placeholder.svg?height=100&width=100&text=Bag",
      status: "out_of_stock",
      collaborations: 2,
      ecoScore: 9.5,
      co2Saved: 3.8,
      category: "Fashion Berkelanjutan",
      rating: 4.9,
      reviews: 67,
    },
  ]

  const creators = [
    {
      id: "1",
      name: "Sarah EcoBeauty",
      avatar: "/placeholder.svg?height=40&width=40&text=SB",
      followers: "125K",
      category: "Beauty & Skincare",
      rating: 4.8,
      avgViews: "15K",
      collaborationRate: "Rp 500K - 1M",
      status: "available",
      ecoFocus: "Organic Skincare",
      completedCollabs: 23,
    },
    {
      id: "2",
      name: "GreenTech Reviewer",
      avatar: "/placeholder.svg?height=40&width=40&text=GT",
      followers: "89K",
      category: "Technology",
      rating: 4.9,
      avgViews: "25K",
      collaborationRate: "Rp 750K - 1.5M",
      status: "busy",
      ecoFocus: "Sustainable Tech",
      completedCollabs: 18,
    },
    {
      id: "3",
      name: "EcoLifestyle Vlogger",
      avatar: "/placeholder.svg?height=40&width=40&text=EL",
      followers: "67K",
      category: "Lifestyle & Fashion",
      rating: 4.7,
      avgViews: "12K",
      collaborationRate: "Rp 400K - 800K",
      status: "available",
      ecoFocus: "Zero Waste Living",
      completedCollabs: 15,
    },
  ]

  const collaborations = [
    {
      id: "1",
      creator: "Sarah EcoBeauty",
      product: "Serum Vitamin C Organik",
      status: "active",
      views: 15420,
      sales: 45,
      commission: 675000,
      startDate: "2024-01-15",
      ecoImpact: 12.5,
      conversionRate: 2.9,
    },
    {
      id: "2",
      creator: "EcoLifestyle Vlogger",
      product: "Tas Daur Ulang Premium",
      status: "pending",
      views: 0,
      sales: 0,
      commission: 0,
      startDate: "2024-01-20",
      ecoImpact: 0,
      conversionRate: 0,
    },
    {
      id: "3",
      creator: "GreenTech Reviewer",
      product: "Smartphone Refurbished",
      status: "completed",
      views: 28900,
      sales: 23,
      commission: 1150000,
      startDate: "2023-12-10",
      ecoImpact: 35.2,
      conversionRate: 0.8,
    },
  ]

  const ecoMilestones = [
    {
      title: "Eco Seller Champion",
      description: "Mencapai 100kg CO₂ yang dihemat",
      progress: 125.5,
      target: 100,
      achieved: true,
      icon: Award,
    },
    {
      title: "Sustainable Product Line",
      description: "50 produk eco-friendly",
      progress: 45,
      target: 50,
      achieved: false,
      icon: Package,
    },
    {
      title: "Green Community Builder",
      description: "100 kolaborasi dengan eco creators",
      progress: 12,
      target: 100,
      achieved: false,
      icon: Users,
    },
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <Image src="/ecomarket-logo.png" alt="ecomarket Logo" width={40} height={40} className="rounded-lg" />
                <div>
                  <h1 className="text-xl font-bold text-green-800">ecomarket</h1>
                  <p className="text-xs text-green-600">Seller Dashboard</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-6 bg-green-100/50 rounded-lg px-4 py-2">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-700">{stats.ecoScore}</div>
                  <div className="text-xs text-gray-600">Eco Score</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-emerald-700">{stats.co2Saved}kg</div>
                  <div className="text-xs text-gray-600">CO₂ Saved</div>
                </div>
              </div>

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
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>S</AvatarFallback>
              </Avatar>

              <Button variant="ghost" size="icon" className="hover:bg-green-100">
                <Settings className="h-5 w-5" />
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Produk
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Produk</p>
                  <p className="text-3xl font-bold">{stats.totalProducts}</p>
                  <p className="text-sm text-green-100">+{stats.monthlyGrowth}% bulan ini</p>
                </div>
                <Package className="h-10 w-10 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Penjualan</p>
                  <p className="text-3xl font-bold">
                    {formatPrice(stats.totalSales).replace("IDR", "Rp").replace(",00", "")}
                  </p>
                  <p className="text-sm text-blue-100">Bulan ini</p>
                </div>
                <DollarSign className="h-10 w-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Kolaborasi Aktif</p>
                  <p className="text-3xl font-bold">{stats.activeCollaborations}</p>
                  <p className="text-sm text-purple-100">Dengan eco creators</p>
                </div>
                <Users className="h-10 w-10 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100">Eco Impact</p>
                  <p className="text-3xl font-bold">{stats.co2Saved}kg</p>
                  <p className="text-sm text-emerald-100">CO₂ Dihemat</p>
                </div>
                <Leaf className="h-10 w-10 text-emerald-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 border border-green-200">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
              Produk
            </TabsTrigger>
            <TabsTrigger
              value="collaboration"
              className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800"
            >
              Kolaborasi
            </TabsTrigger>
            <TabsTrigger
              value="creators"
              className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800"
            >
              Cari Kreator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Eco Milestones */}
                <Card className="bg-gradient-to-r from-green-100 to-emerald-100 border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-800">
                      <TreePine className="h-5 w-5 mr-2" />
                      Pencapaian Eco Seller
                    </CardTitle>
                    <CardDescription>Progress menuju milestone keberlanjutan</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {ecoMilestones.map((milestone, index) => {
                      const Icon = milestone.icon
                      const progressPercentage = Math.min((milestone.progress / milestone.target) * 100, 100)
                      return (
                        <div key={index} className="bg-white/60 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Icon className="h-5 w-5 text-green-600" />
                              <span className="font-medium">{milestone.title}</span>
                              {milestone.achieved && (
                                <Badge className="bg-green-600 text-white">
                                  <Award className="h-3 w-3 mr-1" />
                                  Achieved
                                </Badge>
                              )}
                            </div>
                            <span className="text-sm font-bold text-gray-700">
                              {milestone.progress}/{milestone.target}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                          <Progress value={progressPercentage} className="h-2" />
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle>Aktivitas Terbaru</CardTitle>
                    <CardDescription>Kolaborasi dan penjualan terbaru</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {collaborations.slice(0, 3).map((collab) => (
                        <div
                          key={collab.id}
                          className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-green-50/50 transition-colors"
                        >
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">
                              {collab.creator} - {collab.product}
                            </h3>
                            <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                              <span>{formatNumber(collab.views)} views</span>
                              <span>{collab.sales} penjualan</span>
                              <span>{formatPrice(collab.commission)}</span>
                              <span>{collab.ecoImpact}kg CO₂</span>
                            </div>
                          </div>
                          <Badge
                            variant={
                              collab.status === "active"
                                ? "default"
                                : collab.status === "pending"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={collab.status === "active" ? "bg-green-600" : ""}
                          >
                            {collab.status === "active" ? "Aktif" : collab.status === "pending" ? "Pending" : "Selesai"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800">Aksi Cepat</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Tambah Produk Eco
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Cari Kreator Baru
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Lihat Analytics
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Target className="h-4 w-4 mr-2" />
                      Set Target Eco
                    </Button>
                  </CardContent>
                </Card>

                {/* Performance Metrics */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-800">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Performa Bulan Ini
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Penjualan Target</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Kolaborasi Baru</span>
                        <span>12/15</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Customer Satisfaction</span>
                        <span>{stats.customerSatisfaction}/5.0</span>
                      </div>
                      <Progress value={(stats.customerSatisfaction / 5) * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Produk Saya</h2>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Produk
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {myProducts.map((product) => (
                <Card key={product.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge
                      className="absolute top-2 right-2"
                      variant={product.status === "active" ? "default" : "destructive"}
                    >
                      {product.status === "active" ? "Aktif" : "Stok Habis"}
                    </Badge>
                    <Badge variant="secondary" className="absolute top-2 left-2 bg-green-100 text-green-800">
                      Eco {product.ecoScore}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2 text-xs border-green-300 text-green-700">
                      {product.category}
                    </Badge>
                    <h3 className="font-medium mb-2 line-clamp-2">{product.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Harga:</span>
                        <span className="font-medium text-green-600">{formatPrice(product.price)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Stok:</span>
                        <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>{product.stock}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Terjual:</span>
                        <span>{product.sold}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kolaborasi:</span>
                        <span>{product.collaborations} kreator</span>
                      </div>
                    </div>
                    <div className="bg-green-50 p-2 rounded-lg mt-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-green-700">CO₂ Impact:</span>
                        <span className="font-medium text-green-800">{product.co2Saved}kg per unit</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 hover:bg-green-50 hover:border-green-500 bg-transparent"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 hover:bg-blue-50 hover:border-blue-500 bg-transparent"
                      >
                        Promosi
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="collaboration" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Kolaborasi</h2>
              <Button variant="outline" className="hover:bg-green-50 hover:border-green-500 bg-transparent">
                Riwayat Kolaborasi
              </Button>
            </div>

            <div className="space-y-4">
              {collaborations.map((collab) => (
                <Card key={collab.id} className="bg-white/80 backdrop-blur-sm border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium">{collab.creator}</h3>
                          <Badge
                            variant={
                              collab.status === "active"
                                ? "default"
                                : collab.status === "pending"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={collab.status === "active" ? "bg-green-600" : ""}
                          >
                            {collab.status === "active" ? "Aktif" : collab.status === "pending" ? "Pending" : "Selesai"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{collab.product}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Views:</span>
                            <p className="font-medium">{formatNumber(collab.views)}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Penjualan:</span>
                            <p className="font-medium text-green-600">{collab.sales}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Komisi:</span>
                            <p className="font-medium text-green-600">{formatPrice(collab.commission)}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Eco Impact:</span>
                            <p className="font-medium text-emerald-600">{collab.ecoImpact}kg CO₂</p>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          Conversion Rate: {collab.conversionRate}% • Mulai: {collab.startDate}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-blue-50 hover:border-blue-500 bg-transparent"
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Chat
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-green-50 hover:border-green-500 bg-transparent"
                        >
                          Detail
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="creators" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Cari Eco Creator</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Cari kreator..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64 border-green-200 focus:border-green-500"
                  />
                </div>
                <Button variant="outline" className="hover:bg-green-50 hover:border-green-500 bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {creators.map((creator) => (
                <Card key={creator.id} className="bg-white/80 backdrop-blur-sm border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12 ring-2 ring-green-200">
                        <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-green-100 text-green-700">{creator.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{creator.name}</h3>
                          <Badge
                            variant={creator.status === "available" ? "default" : "secondary"}
                            className={creator.status === "available" ? "bg-green-100 text-green-800" : ""}
                          >
                            {creator.status === "available" ? "Tersedia" : "Sibuk"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{creator.category}</p>
                        <Badge variant="outline" className="mb-3 text-xs border-green-300 text-green-700">
                          Focus: {creator.ecoFocus}
                        </Badge>
                        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                          <div>
                            <span className="text-gray-500">Followers:</span>
                            <p className="font-medium">{creator.followers}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Avg Views:</span>
                            <p className="font-medium">{creator.avgViews}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Completed:</span>
                            <p className="font-medium">{creator.completedCollabs} collabs</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Rating:</span>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="ml-1 font-medium">{creator.rating}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">Rate: {creator.collaborationRate}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover:bg-blue-50 hover:border-blue-500 bg-transparent"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Profil
                            </Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Ajak Kolaborasi
                            </Button>
                          </div>
                        </div>
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
