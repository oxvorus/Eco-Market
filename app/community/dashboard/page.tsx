"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Recycle,
  TrendingUp,
  Calendar,
  MapPin,
  Award,
  Target,
  Leaf,
  BarChart3,
  Plus,
  Bell,
  Settings,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CommunityDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  const communityStats = {
    totalMembers: 247,
    activeMembers: 189,
    wasteCollected: 2847.5,
    monthlyTarget: 3000,
    carbonSaved: 1523.2,
    recyclingRate: 78.5,
    ecoPoints: 15420,
  }

  const recentActivities = [
    {
      id: 1,
      type: "collection",
      user: "Ibu Sari",
      action: "mengumpulkan 15kg sampah plastik",
      time: "2 jam lalu",
      points: 150,
    },
    {
      id: 2,
      type: "education",
      user: "Pak Budi",
      action: "menyelesaikan workshop kompos",
      time: "5 jam lalu",
      points: 100,
    },
    {
      id: 3,
      type: "sale",
      user: "Toko Eco",
      action: "menjual produk daur ulang",
      time: "1 hari lalu",
      points: 200,
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Workshop Kompos Rumahan",
      date: "15 Jan 2025",
      time: "09:00 WIB",
      location: "Bank Sampah Hijau",
      participants: 25,
      maxParticipants: 30,
    },
    {
      id: 2,
      title: "Aksi Bersih Lingkungan",
      date: "22 Jan 2025",
      time: "07:00 WIB",
      location: "Taman Kota",
      participants: 45,
      maxParticipants: 50,
    },
  ]

  const topContributors = [
    { name: "Ibu Sari", points: 2450, waste: "125kg", rank: 1 },
    { name: "Pak Budi", points: 2100, waste: "98kg", rank: 2 },
    { name: "Toko Eco", points: 1890, waste: "87kg", rank: 3 },
    { name: "Green Family", points: 1650, waste: "76kg", rank: 4 },
    { name: "Eco Warriors", points: 1420, waste: "65kg", rank: 5 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/landing" className="flex items-center space-x-3">
                <Image src="/ecomarket-logo.png" alt="ecomarket Logo" width={40} height={40} className="rounded-lg" />
                <div>
                  <h1 className="text-xl font-bold text-green-800">Bank Sampah Dashboard</h1>
                  <p className="text-xs text-green-600">Don't Throw It, ReMarket It!</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium">Bank Sampah Hijau</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Anggota</p>
                  <p className="text-3xl font-bold">{communityStats.totalMembers}</p>
                  <p className="text-sm text-green-100">{communityStats.activeMembers} aktif</p>
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
                  <p className="text-3xl font-bold">{communityStats.wasteCollected}kg</p>
                  <Progress
                    value={(communityStats.wasteCollected / communityStats.monthlyTarget) * 100}
                    className="mt-2 bg-blue-400"
                  />
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
                  <p className="text-3xl font-bold">{communityStats.carbonSaved}kg</p>
                  <p className="text-sm text-emerald-100">CO2 equivalent</p>
                </div>
                <Leaf className="h-8 w-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100">Eco Points</p>
                  <p className="text-3xl font-bold">{communityStats.ecoPoints.toLocaleString()}</p>
                  <p className="text-sm text-amber-100">Total komunitas</p>
                </div>
                <Award className="h-8 w-8 text-amber-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activities">Aktivitas</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Monthly Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-green-600" />
                      <span>Target Bulanan</span>
                    </CardTitle>
                    <CardDescription>Progress pengumpulan sampah bulan ini</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Sampah Terkumpul</span>
                        <span className="text-sm text-gray-500">
                          {communityStats.wasteCollected}kg / {communityStats.monthlyTarget}kg
                        </span>
                      </div>
                      <Progress
                        value={(communityStats.wasteCollected / communityStats.monthlyTarget) * 100}
                        className="h-3"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-600 font-medium">
                          {Math.round((communityStats.wasteCollected / communityStats.monthlyTarget) * 100)}% tercapai
                        </span>
                        <span className="text-gray-500">
                          Sisa {communityStats.monthlyTarget - communityStats.wasteCollected}kg
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activities */}
                <Card>
                  <CardHeader>
                    <CardTitle>Aktivitas Terbaru</CardTitle>
                    <CardDescription>Kegiatan terbaru dari anggota komunitas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            {activity.type === "collection" && <Recycle className="h-5 w-5 text-green-600" />}
                            {activity.type === "education" && <Award className="h-5 w-5 text-blue-600" />}
                            {activity.type === "sale" && <TrendingUp className="h-5 w-5 text-amber-600" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              <span className="text-green-600">{activity.user}</span> {activity.action}
                            </p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                          <Badge variant="secondary">+{activity.points} poin</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activities" className="space-y-6">
                {/* Upcoming Events */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Event Mendatang</CardTitle>
                      <CardDescription>Kegiatan komunitas yang akan datang</CardDescription>
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Tambah Event
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <h3 className="font-semibold text-gray-900">{event.title}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>
                                    {event.date} • {event.time}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{event.location}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Progress
                                  value={(event.participants / event.maxParticipants) * 100}
                                  className="w-32 h-2"
                                />
                                <span className="text-sm text-gray-500">
                                  {event.participants}/{event.maxParticipants} peserta
                                </span>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Daftar
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                      <span>Analytics Dashboard</span>
                    </CardTitle>
                    <CardDescription>Data dan statistik komunitas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Tingkat Partisipasi</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Anggota Aktif</span>
                            <span>
                              {Math.round((communityStats.activeMembers / communityStats.totalMembers) * 100)}%
                            </span>
                          </div>
                          <Progress value={(communityStats.activeMembers / communityStats.totalMembers) * 100} />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold">Tingkat Daur Ulang</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Rate Recycling</span>
                            <span>{communityStats.recyclingRate}%</span>
                          </div>
                          <Progress value={communityStats.recyclingRate} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-amber-600" />
                  <span>Top Contributors</span>
                </CardTitle>
                <CardDescription>Anggota dengan kontribusi terbesar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topContributors.map((contributor) => (
                    <div key={contributor.rank} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {contributor.rank}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{contributor.name}</p>
                        <p className="text-xs text-gray-500">
                          {contributor.waste} • {contributor.points} poin
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
                <CardDescription>Tindakan yang sering dilakukan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Anggota Baru
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Recycle className="h-4 w-4 mr-2" />
                    Catat Pengumpulan Sampah
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Buat Event Baru
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Lihat Laporan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Environmental Impact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  <span>Dampak Lingkungan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-700">650</div>
                    <div className="text-sm text-green-600">Pohon Setara</div>
                    <div className="text-xs text-gray-500">dari karbon tersimpan</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">12.5</div>
                    <div className="text-sm text-blue-600">Ton CO2</div>
                    <div className="text-xs text-gray-500">dikurangi tahun ini</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
