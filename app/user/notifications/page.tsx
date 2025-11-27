"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Package, Bell, Tag, Trash2, CheckCheck, Circle, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getMainRouteFromStorage } from "@/lib/role"

interface Notification {
  id: string
  type: "chat" | "order" | "system" | "promo"
  title: string
  message: string
  time: string
  read: boolean
  priority?: "high" | "normal"
  link?: string
  avatar?: string
  image?: string
}

export default function NotificationsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")

  const onAvatarClick = () => {
    router.push(getMainRouteFromStorage())
  }

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "chat",
      title: "Pesan Baru dari EcoStyle Indonesia",
      message: "Terima kasih telah membeli produk kami! Ada yang bisa kami bantu?",
      time: "5 menit lalu",
      read: false,
      priority: "high",
      link: "/user/chat/1",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: "2",
      type: "order",
      title: "Pesanan Sedang Dikirim",
      message: "Tas Daur Ulang Premium sedang dalam perjalanan ke alamat Anda",
      time: "2 jam lalu",
      read: false,
      priority: "high",
      link: "/user/orders",
      image: "/eco-friendly-bag-made-from-recycled-plastic.jpg",
    },
    {
      id: "3",
      type: "system",
      title: "Eco Achievement Unlocked! 🌱",
      message: "Selamat! Anda telah menghemat 10kg CO2. Dapatkan badge Eco Warrior!",
      time: "1 hari lalu",
      read: true,
      priority: "normal",
      link: "/user/achievements",
    },
    {
      id: "4",
      type: "promo",
      title: "Flash Sale: Diskon 50% Produk Pilihan",
      message: "Jangan lewatkan penawaran spesial untuk produk eco-friendly hari ini!",
      time: "1 hari lalu",
      read: true,
      priority: "normal",
      link: "/user/home",
      image: "/placeholder.svg?height=100&width=100&text=Sale",
    },
    {
      id: "5",
      type: "chat",
      title: "Balasan dari Green Living ID",
      message: "Video baru tentang kompos sudah tayang! Check it out 🎥",
      time: "2 hari lalu",
      read: true,
      priority: "normal",
      link: "/user/chat/2",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: "6",
      type: "order",
      title: "Pesanan Telah Tiba",
      message: "Smartphone Refurbished telah sampai. Jangan lupa beri review!",
      time: "3 hari lalu",
      read: true,
      priority: "normal",
      link: "/user/orders",
      image: "/refurbished-smartphone-eco-friendly.jpg",
    },
    {
      id: "7",
      type: "system",
      title: "Update Kebijakan Privasi",
      message: "Kami telah memperbarui kebijakan privasi kami. Silakan baca perubahan terbaru.",
      time: "5 hari lalu",
      read: true,
      priority: "normal",
      link: "/privacy",
    },
    {
      id: "8",
      type: "promo",
      title: "Koleksi Baru: Fashion Berkelanjutan",
      message: "Lihat koleksi terbaru dari brand fashion ramah lingkungan favoritmu!",
      time: "1 minggu lalu",
      read: true,
      priority: "normal",
      link: "/user/home",
      image: "/placeholder.svg?height=100&width=100&text=Fashion",
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length
  const chatUnread = notifications.filter((n) => n.type === "chat" && !n.read).length
  const orderUnread = notifications.filter((n) => n.type === "order" && !n.read).length
  const systemUnread = notifications.filter((n) => n.type === "system" && !n.read).length
  const promoUnread = notifications.filter((n) => n.type === "promo" && !n.read).length

  const filteredNotifications = activeTab === "all" ? notifications : notifications.filter((n) => n.type === activeTab)

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "chat":
        return MessageCircle
      case "order":
        return Package
      case "system":
        return Bell
      case "promo":
        return Tag
      default:
        return Bell
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "chat":
        return "text-blue-600 bg-blue-100"
      case "order":
        return "text-green-600 bg-green-100"
      case "system":
        return "text-purple-600 bg-purple-100"
      case "promo":
        return "text-amber-600 bg-amber-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
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
                <p className="text-xs text-green-600">Notifications</p>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
                <CheckCheck className="h-4 w-4 mr-2" />
                Tandai Semua Dibaca
              </Button>
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
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Notifikasi</p>
                  <p className="text-3xl font-bold">{notifications.length}</p>
                  <p className="text-sm text-blue-100">{unreadCount} belum dibaca</p>
                </div>
                <Bell className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Pesan Chat</p>
                  <p className="text-3xl font-bold">{chatUnread}</p>
                  <p className="text-sm text-green-100">Belum dibaca</p>
                </div>
                <MessageCircle className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Update Pesanan</p>
                  <p className="text-3xl font-bold">{orderUnread}</p>
                  <p className="text-sm text-purple-100">Update baru</p>
                </div>
                <Package className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100">Promo & Ads</p>
                  <p className="text-3xl font-bold">{promoUnread}</p>
                  <p className="text-sm text-amber-100">Penawaran baru</p>
                </div>
                <Tag className="h-8 w-8 text-amber-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Semua Notifikasi</CardTitle>
                <CardDescription>
                  {unreadCount > 0 ? `${unreadCount} notifikasi belum dibaca` : "Semua notifikasi sudah dibaca"}
                </CardDescription>
              </div>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-lg px-3 py-1">
                  {unreadCount}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all" className="relative">
                  Semua
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs rounded-full">
                      {unreadCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="chat" className="relative">
                  Chat
                  {chatUnread > 0 && (
                    <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs rounded-full">
                      {chatUnread}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="order" className="relative">
                  Pesanan
                  {orderUnread > 0 && (
                    <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs rounded-full">
                      {orderUnread}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="system" className="relative">
                  Sistem
                  {systemUnread > 0 && (
                    <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs rounded-full">
                      {systemUnread}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="promo" className="relative">
                  Promo
                  {promoUnread > 0 && (
                    <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs rounded-full">
                      {promoUnread}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              <div className="space-y-3">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Tidak ada notifikasi</p>
                  </div>
                ) : (
                  filteredNotifications.map((notification) => {
                    const Icon = getIcon(notification.type)
                    return (
                      <Card
                        key={notification.id}
                        className={`transition-all hover:shadow-md ${!notification.read ? "bg-blue-50/50 border-blue-200" : "bg-white"}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            {notification.avatar ? (
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                                <AvatarFallback>U</AvatarFallback>
                              </Avatar>
                            ) : notification.image ? (
                              <Image
                                src={notification.image || "/placeholder.svg"}
                                alt={notification.title}
                                width={40}
                                height={40}
                                className="rounded-lg object-cover"
                              />
                            ) : (
                              <div
                                className={`h-10 w-10 rounded-full flex items-center justify-center ${getTypeColor(notification.type)}`}
                              >
                                <Icon className="h-5 w-5" />
                              </div>
                            )}

                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-1">
                                <div className="flex items-center space-x-2">
                                  <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                                  {!notification.read && <Circle className="h-2 w-2 fill-blue-600 text-blue-600" />}
                                </div>
                                <div className="flex items-center space-x-2">
                                  {notification.priority === "high" && (
                                    <Badge variant="destructive" className="text-xs">
                                      Penting
                                    </Badge>
                                  )}
                                  <span className="text-xs text-gray-500">{notification.time}</span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                              <div className="flex items-center space-x-2">
                                {notification.link && (
                                  <Link href={notification.link}>
                                    <Button variant="outline" size="sm">
                                      <Eye className="h-3 w-3 mr-1" />
                                      Lihat
                                    </Button>
                                  </Link>
                                )}
                                {!notification.read && (
                                  <Button variant="outline" size="sm" onClick={() => handleMarkAsRead(notification.id)}>
                                    <CheckCheck className="h-3 w-3 mr-1" />
                                    Tandai Dibaca
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDelete(notification.id)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  Hapus
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
