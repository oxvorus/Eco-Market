"use client"

import { useState } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Search,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Star,
  MessageCircle,
  RotateCcw,
  Leaf,
  TreePine,
  Recycle,
  Eye,
  Download,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Order {
  id: string
  orderNumber: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: {
    id: string
    name: string
    price: number
    quantity: number
    image: string
    seller: string
    ecoScore: number
    co2Saved: number
  }[]
  shipping: {
    method: string
    trackingNumber?: string
    estimatedDelivery: string
  }
  ecoImpact: {
    totalCO2Saved: number
    ecoPackaging: boolean
    carbonOffset: boolean
  }
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const { data: ordersData } = useSWR("/api/users/orders", fetcher)
  const orders = ordersData?.data || []

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "processing":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Menunggu Konfirmasi"
      case "processing":
        return "Sedang Diproses"
      case "shipped":
        return "Dalam Pengiriman"
      case "delivered":
        return "Telah Diterima"
      case "cancelled":
        return "Dibatalkan"
      default:
        return status
    }
  }

  const filteredOrders = orders.filter((order: any) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item: any) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

    if (activeTab === "all") return matchesSearch
    return matchesSearch && order.status === activeTab
  })

  const totalCO2Saved = orders.reduce((sum: number, order: any) => sum + order.ecoImpact.totalCO2Saved, 0)
  const totalOrders = orders.length
  const deliveredOrders = orders.filter((order: any) => order.status === "delivered").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-200/50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/user/home">
                <Button variant="ghost" size="sm" className="text-green-700 hover:bg-green-100">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Kembali
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-green-800">Pesanan Eco</h1>
                <p className="text-sm text-gray-600">Riwayat belanja berkelanjutan Anda</p>
              </div>
            </div>

            {/* Eco Stats */}
            <div className="hidden md:flex items-center space-x-6 bg-green-100/50 rounded-lg px-4 py-2">
              <div className="text-center">
                <div className="text-lg font-bold text-green-700">{totalCO2Saved.toFixed(1)}kg</div>
                <div className="text-xs text-gray-600">Total CO₂ Dihemat</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-emerald-700">{totalOrders}</div>
                <div className="text-xs text-gray-600">Total Pesanan</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-700">{deliveredOrders}</div>
                <div className="text-xs text-gray-600">Selesai</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Environmental Impact Summary */}
        <Card className="mb-6 bg-gradient-to-r from-green-100 to-emerald-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <TreePine className="h-6 w-6 text-green-600" />
                <h2 className="text-xl font-bold text-green-800">Dampak Lingkungan Anda</h2>
              </div>
              <Badge variant="secondary" className="bg-green-200 text-green-800">
                Eco Warrior
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/60 rounded-lg p-4 text-center">
                <Recycle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-700">{totalCO2Saved.toFixed(1)}kg</div>
                <p className="text-sm text-gray-600">CO₂ Dihemat</p>
              </div>
              <div className="bg-white/60 rounded-lg p-4 text-center">
                <TreePine className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-emerald-700">{Math.ceil(totalCO2Saved / 22)}</div>
                <p className="text-sm text-gray-600">Setara Pohon</p>
              </div>
              <div className="bg-white/60 rounded-lg p-4 text-center">
                <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-700">
                  {orders.filter((o: any) => o.ecoImpact.ecoPackaging).length}
                </div>
                <p className="text-sm text-gray-600">Kemasan Eco</p>
              </div>
              <div className="bg-white/60 rounded-lg p-4 text-center">
                <Leaf className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-teal-700">
                  {orders.filter((o: any) => o.ecoImpact.carbonOffset).length}
                </div>
                <p className="text-sm text-gray-600">Carbon Offset</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cari pesanan atau produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-green-200 focus:border-green-500"
            />
          </div>
        </div>

        {/* Order Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 border border-green-200">
            <TabsTrigger value="all" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
              Semua
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-800"
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              value="processing"
              className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800"
            >
              Diproses
            </TabsTrigger>
            <TabsTrigger
              value="shipped"
              className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800"
            >
              Dikirim
            </TabsTrigger>
            <TabsTrigger
              value="delivered"
              className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
            >
              Selesai
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredOrders.length === 0 ? (
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Tidak ada pesanan</h3>
                  <p className="text-gray-500 mb-6">
                    {searchQuery
                      ? "Tidak ditemukan pesanan yang sesuai dengan pencarian"
                      : "Belum ada pesanan di kategori ini"}
                  </p>
                  <Link href="/user/home">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Leaf className="h-4 w-4 mr-2" />
                      Mulai Belanja Eco
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              filteredOrders.map((order: any) => (
                <Card
                  key={order.id}
                  className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg text-green-800">{order.orderNumber}</CardTitle>
                        <p className="text-sm text-gray-600">
                          {new Date(order.date).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getStatusColor(order.status)} mb-2`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1">{getStatusText(order.status)}</span>
                        </Badge>
                        <p className="text-lg font-bold text-green-700">Rp {order.total.toLocaleString("id-ID")}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-3">
                      {order.items.map((item: any) => (
                        <div key={item.id} className="flex items-center space-x-4 p-3 bg-green-50/50 rounded-lg">
                          <div className="relative">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={60}
                              height={60}
                              className="w-15 h-15 object-cover rounded-lg"
                            />
                            <Badge
                              variant="secondary"
                              className="absolute -top-1 -right-1 bg-green-200 text-green-800 text-xs px-1"
                            >
                              {item.ecoScore}
                            </Badge>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm mb-1">{item.name}</h4>
                            <p className="text-xs text-gray-500 mb-1">{item.seller}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-green-700">
                                Rp {item.price.toLocaleString("id-ID")} x{item.quantity}
                              </span>
                              <div className="flex items-center space-x-1">
                                <Leaf className="h-3 w-3 text-green-600" />
                                <span className="text-xs text-green-600">{item.co2Saved}kg CO₂</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Eco Impact */}
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-green-800">Dampak Lingkungan</span>
                        <span className="text-sm font-bold text-green-700">
                          {order.ecoImpact.totalCO2Saved.toFixed(1)}kg CO₂ saved
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-xs">
                        {order.ecoImpact.ecoPackaging && (
                          <div className="flex items-center space-x-1 text-green-600">
                            <Package className="h-3 w-3" />
                            <span>Kemasan Eco</span>
                          </div>
                        )}
                        {order.ecoImpact.carbonOffset && (
                          <div className="flex items-center space-x-1 text-blue-600">
                            <TreePine className="h-3 w-3" />
                            <span>Carbon Offset</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Shipping Info */}
                    {order.shipping.trackingNumber && (
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-blue-800">Informasi Pengiriman</span>
                          <span className="text-xs text-blue-600">{order.shipping.method}</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">Nomor Resi: {order.shipping.trackingNumber}</p>
                        <p className="text-xs text-gray-600">
                          Estimasi Tiba: {new Date(order.shipping.estimatedDelivery).toLocaleDateString("id-ID")}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Detail
                      </Button>

                      {order.status === "delivered" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                          >
                            <Star className="h-3 w-3 mr-1" />
                            Beri Ulasan
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
                          >
                            <RotateCcw className="h-3 w-3 mr-1" />
                            Beli Lagi
                          </Button>
                        </>
                      )}

                      {order.status === "shipped" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
                        >
                          <Truck className="h-3 w-3 mr-1" />
                          Lacak Paket
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                      >
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Chat Penjual
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Invoice
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
