"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { getMainRouteFromStorage } from "@/lib/role"
import {
  Plus,
  Eye,
  Heart,
  MessageCircle,
  TrendingUp,
  DollarSign,
  Users,
  BarChart3,
  Settings,
  Play,
  Upload,
  Leaf,
  Recycle,
  TreePine,
  Award,
  Calendar,
  Target,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  const onAvatarClick = () => {
    router.push(getMainRouteFromStorage())
  }

  const stats = {
    totalViews: 125430,
    totalLikes: 8765,
    followers: 12500,
    earnings: 2450000,
    ecoImpact: 45.2,
    videosCreated: 89,
    collaborations: 12,
    monthlyGrowth: 15.3,
  }

  const myContent = [
    {
      id: "1",
      title: "Review Produk Eco-Friendly Terbaru! Ramah Lingkungan & Berkualitas ✨",
      thumbnail: "/placeholder.svg?height=200&width=300&text=Eco+Review",
      views: 15420,
      likes: 1234,
      comments: 89,
      earnings: 450000,
      status: "published",
      createdAt: "2 hari lalu",
      ecoScore: 9.2,
      co2Saved: 3.5,
      category: "Product Review",
      duration: "12:45",
    },
    {
      id: "2",
      title: "Tutorial Zero Waste: 5 Cara Mudah Mengurangi Sampah di Rumah",
      thumbnail: "/placeholder.svg?height=200&width=300&text=Zero+Waste+Tutorial",
      views: 8765,
      likes: 567,
      comments: 45,
      earnings: 320000,
      status: "published",
      createdAt: "5 hari lalu",
      ecoScore: 9.8,
      co2Saved: 2.1,
      category: "Educational",
      duration: "8:30",
    },
    {
      id: "3",
      title: "Haul Produk Berkelanjutan Budget Friendly - Hemat & Ramah Lingkungan!",
      thumbnail: "/placeholder.svg?height=200&width=300&text=Eco+Haul",
      views: 0,
      likes: 0,
      comments: 0,
      earnings: 0,
      status: "draft",
      createdAt: "1 jam lalu",
      ecoScore: 0,
      co2Saved: 0,
      category: "Haul",
      duration: "15:20",
    },
  ]

  const collaborations = [
    {
      id: "1",
      seller: "EcoBeauty Store Official",
      product: "Serum Vitamin C Organik",
      commission: "15%",
      status: "active",
      earnings: 450000,
      views: 15420,
      conversionRate: 3.2,
      ecoImpact: 12.5,
    },
    {
      id: "2",
      seller: "GreenTech Indonesia",
      product: "Smartphone Refurbished",
      commission: "20%",
      status: "pending",
      earnings: 0,
      views: 0,
      conversionRate: 0,
      ecoImpact: 0,
    },
    {
      id: "3",
      seller: "Sustainable Fashion Co",
      product: "Tas Daur Ulang Premium",
      commission: "18%",
      status: "completed",
      earnings: 280000,
      views: 8900,
      conversionRate: 2.8,
      ecoImpact: 8.3,
    },
  ]

  const ecoMilestones = [
    {
      title: "Eco Warrior",
      description: "Mencapai 50kg CO₂ yang dihemat",
      progress: 90,
      target: 50,
      current: 45.2,
      icon: Award,
      color: "text-green-600",
    },
    {
      title: "Content Creator",
      description: "Membuat 100 video edukatif",
      progress: 89,
      target: 100,
      current: 89,
      icon: Play,
      color: "text-blue-600",
    },
    {
      title: "Community Builder",
      description: "Mencapai 15K followers",
      progress: 83,
      target: 15000,
      current: 12500,
      icon: Users,
      color: "text-purple-600",
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <Image src="/ecomarket-logo.png" alt="ecomarket Logo" width={40} height={40} className="rounded-lg" />
                <div>
                  <h1 className="text-xl font-bold text-green-800">ecomarket</h1>
                  <p className="text-xs text-green-600">Creator Dashboard</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
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
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex items-center space-x-6 bg-green-100/50 rounded-lg px-4 py-2">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-700">{stats.ecoImpact}kg</div>
                  <div className="text-xs text-gray-600">CO₂ Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-700">{formatNumber(stats.followers)}</div>
                  <div className="text-xs text-gray-600">Followers</div>
                </div>
              </div>

              <Button variant="ghost" size="icon" className="hover:bg-green-100">
                <Settings className="h-5 w-5" />
              </Button>
              <Link href="/creator/upload">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Konten
                </Button>
              </Link>
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
                  <p className="text-green-100">Total Views</p>
                  <p className="text-3xl font-bold">{formatNumber(stats.totalViews)}</p>
                  <p className="text-sm text-green-100">+{stats.monthlyGrowth}% bulan ini</p>
                </div>
                <Eye className="h-10 w-10 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Followers</p>
                  <p className="text-3xl font-bold">{formatNumber(stats.followers)}</p>
                  <p className="text-sm text-blue-100">Target: 15K</p>
                </div>
                <Users className="h-10 w-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Penghasilan</p>
                  <p className="text-3xl font-bold">
                    {formatPrice(stats.earnings).replace("IDR", "Rp").replace(",00", "")}
                  </p>
                  <p className="text-sm text-purple-100">Bulan ini</p>
                </div>
                <DollarSign className="h-10 w-10 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100">Eco Impact</p>
                  <p className="text-3xl font-bold">{stats.ecoImpact}kg</p>
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
            <TabsTrigger value="content" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
              Konten Saya
            </TabsTrigger>
            <TabsTrigger
              value="collaboration"
              className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800"
            >
              Kolaborasi
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800"
            >
              Analytics
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
                      Pencapaian Eco
                    </CardTitle>
                    <CardDescription>Progress menuju milestone lingkungan</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {ecoMilestones.map((milestone, index) => {
                      const Icon = milestone.icon
                      return (
                        <div key={index} className="bg-white/60 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Icon className={`h-5 w-5 ${milestone.color}`} />
                              <span className="font-medium">{milestone.title}</span>
                            </div>
                            <span className="text-sm font-bold text-gray-700">
                              {milestone.current}/{milestone.target}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                          <Progress value={milestone.progress} className="h-2" />
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>

                {/* Recent Content */}
                <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle>Konten Terbaru</CardTitle>
                    <CardDescription>Video yang baru saja Anda upload</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {myContent.slice(0, 3).map((content) => (
                        <div
                          key={content.id}
                          className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-green-50/50 transition-colors"
                        >
                          <div className="relative">
                            <Image
                              src={content.thumbnail || "/placeholder.svg"}
                              alt={content.title}
                              width={80}
                              height={60}
                              className="w-20 h-15 object-cover rounded"
                            />
                            <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                              {content.duration}
                            </div>
                            {content.status === "published" && (
                              <Badge
                                variant="secondary"
                                className="absolute top-1 left-1 bg-green-100 text-green-800 text-xs"
                              >
                                {content.ecoScore}
                              </Badge>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-sm line-clamp-2 mb-1">{content.title}</h3>
                            <div className="flex items-center space-x-4 text-xs text-gray-500 mb-1">
                              <span>{formatNumber(content.views)} views</span>
                              <span>{formatNumber(content.likes)} likes</span>
                              <span>{content.comments} komentar</span>
                              <span>{content.createdAt}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <Badge
                                variant={content.status === "published" ? "default" : "secondary"}
                                className={content.status === "published" ? "bg-green-600" : ""}
                              >
                                {content.status === "published" ? "Published" : "Draft"}
                              </Badge>
                              {content.status === "published" && (
                                <div className="flex items-center space-x-2 text-xs">
                                  <span className="text-green-600 font-medium">
                                    {formatPrice(content.earnings).replace("IDR", "Rp").replace(",00", "")}
                                  </span>
                                  <span className="text-gray-500">•</span>
                                  <span className="text-green-600">{content.co2Saved}kg CO₂</span>
                                </div>
                              )}
                            </div>
                          </div>
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
                    <Link href="/creator/upload">
                      <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Video Baru
                      </Button>
                    </Link>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Lihat Analytics
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Cari Kolaborasi
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Target className="h-4 w-4 mr-2" />
                      Set Target Baru
                    </Button>
                  </CardContent>
                </Card>

                {/* Monthly Goals */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-800">
                      <Calendar className="h-5 w-5 mr-2" />
                      Target Bulan Ini
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Upload Video</span>
                        <span>8/10</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Kolaborasi Baru</span>
                        <span>2/3</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Eco Impact</span>
                        <span>45.2/50kg CO₂</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Konten Saya</h2>
              <Link href="/creator/upload">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Baru
                </Button>
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {myContent.map((content) => (
                <Card key={content.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={content.thumbnail || "/placeholder.svg"}
                      alt={content.title}
                      width={400}
                      height={225}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {content.duration}
                    </div>
                    <Badge
                      className="absolute top-2 right-2"
                      variant={content.status === "published" ? "default" : "secondary"}
                    >
                      {content.status === "published" ? "Published" : "Draft"}
                    </Badge>
                    {content.status === "published" && (
                      <Badge variant="secondary" className="absolute top-2 left-2 bg-green-100 text-green-800">
                        Eco {content.ecoScore}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2 text-xs border-green-300 text-green-700">
                      {content.category}
                    </Badge>
                    <h3 className="font-medium mb-2 line-clamp-2">{content.title}</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {formatNumber(content.views)}
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {formatNumber(content.likes)}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {content.comments}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {formatPrice(content.earnings).replace("IDR", "Rp").replace(",00", "")}
                      </div>
                    </div>
                    {content.status === "published" && (
                      <div className="bg-green-50 p-2 rounded-lg text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-green-700">Dampak Eco:</span>
                          <span className="font-medium text-green-800">{content.co2Saved}kg CO₂ saved</span>
                        </div>
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-2">{content.createdAt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="collaboration" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Kolaborasi</h2>
              <Button variant="outline" className="hover:bg-green-50 hover:border-green-500 bg-transparent">
                Cari Seller Baru
              </Button>
            </div>

            <div className="space-y-4">
              {collaborations.map((collab) => (
                <Card key={collab.id} className="bg-white/80 backdrop-blur-sm border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium">{collab.seller}</h3>
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
                            <span className="text-gray-500">Komisi:</span>
                            <p className="font-medium text-green-600">{collab.commission}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Views:</span>
                            <p className="font-medium">{formatNumber(collab.views)}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Penghasilan:</span>
                            <p className="font-medium text-green-600">{formatPrice(collab.earnings)}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Eco Impact:</span>
                            <p className="font-medium text-emerald-600">{collab.ecoImpact}kg CO₂</p>
                          </div>
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

          <TabsContent value="analytics" className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Analytics & Insights</h2>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                    Pertumbuhan Views
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-green-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Chart akan muncul di sini</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Recycle className="h-5 w-5 mr-2 text-emerald-600" />
                    Eco Impact Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TreePine className="h-12 w-12 text-emerald-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Environmental impact chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
