"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  LogOut,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Leaf,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function AdminDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  const { data: stats } = useSWR("/api/admin/dashboard/stats", fetcher)
  const { data: pendingProducts } = useSWR("/api/admin/moderation/products", fetcher)

  const handleLogout = () => {
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/admin/dashboard" className="flex items-center space-x-3">
              <div className="bg-green-100 rounded-lg p-2">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-green-800">ecomarket</h1>
                <p className="text-xs text-green-600">Admin Dashboard</p>
              </div>
            </Link>

            <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 border border-green-200">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="moderation"
              className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Moderation
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800"
            >
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-green-100 to-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Total Users</p>
                      <p className="text-3xl font-bold text-green-900">{stats?.data?.totalUsers || 0}</p>
                      <p className="text-xs text-green-700 mt-1">↑ {stats?.data?.metrics?.userGrowth || 0}% growth</p>
                    </div>
                    <Users className="h-10 w-10 text-green-600 opacity-80" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-100 to-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Total Products</p>
                      <p className="text-3xl font-bold text-blue-900">{stats?.data?.totalProducts || 0}</p>
                      <p className="text-xs text-blue-700 mt-1">{stats?.data?.activeListings || 0} active</p>
                    </div>
                    <Package className="h-10 w-10 text-blue-600 opacity-80" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-100 to-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">Total Orders</p>
                      <p className="text-3xl font-bold text-purple-900">{stats?.data?.totalOrders || 0}</p>
                      <p className="text-xs text-purple-700 mt-1">↑ {stats?.data?.metrics?.orderGrowth || 0}% growth</p>
                    </div>
                    <ShoppingCart className="h-10 w-10 text-purple-600 opacity-80" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-100 to-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-600 text-sm font-medium">Total Revenue</p>
                      <p className="text-3xl font-bold text-orange-900">
                        Rp {((stats?.data?.totalRevenue || 0) / 1000000).toFixed(1)}M
                      </p>
                      <p className="text-xs text-orange-700 mt-1">
                        ↑ {stats?.data?.metrics?.revenueGrowth || 0}% growth
                      </p>
                    </div>
                    <TrendingUp className="h-10 w-10 text-orange-600 opacity-80" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/80 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <Leaf className="h-5 w-5 mr-2" />
                  Environmental Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-green-700">{stats?.data?.totalCO2Saved || 0}kg</p>
                    <p className="text-sm text-gray-600 mt-2">Total CO₂ Saved</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-emerald-700">
                      {Math.ceil((stats?.data?.totalCO2Saved || 0) / 22)}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">Equivalent Trees Planted</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-blue-700">{stats?.data?.totalProducts || 0}</p>
                    <p className="text-sm text-gray-600 mt-2">Eco-Friendly Products</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Moderation Tab */}
          <TabsContent value="moderation" className="space-y-6">
            <Card className="bg-white/80 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Pending Products for Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingProducts?.data && pendingProducts.data.length > 0 ? (
                    pendingProducts.data.map((product: any) => (
                      <div key={product.id} className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-600">Seller: {product.seller}</p>
                            <p className="text-sm text-gray-600">Category: {product.category}</p>
                            <p className="text-sm text-green-700 mt-2">{product.description}</p>
                            <p className="text-xs text-gray-500 mt-2">Submitted: {product.submittedAt}</p>
                          </div>
                          <Badge className="bg-yellow-600 text-white">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={async () => {
                              await fetch("/api/admin/moderation/products", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  productId: product.id,
                                  action: "approve",
                                }),
                              })
                            }}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
                            onClick={async () => {
                              await fetch("/api/admin/moderation/products", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  productId: product.id,
                                  action: "reject",
                                  reason: "Quality check failed",
                                }),
                              })
                            }}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-8">No pending products for moderation</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-white/80 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-3 font-semibold text-gray-900">Name</th>
                        <th className="text-left p-3 font-semibold text-gray-900">Email</th>
                        <th className="text-left p-3 font-semibold text-gray-900">Role</th>
                        <th className="text-left p-3 font-semibold text-gray-900">Orders</th>
                        <th className="text-left p-3 font-semibold text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(5)].map((_, i) => (
                        <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3">User {i + 1}</td>
                          <td className="p-3 text-gray-600">user{i}@example.com</td>
                          <td className="p-3">
                            <Badge variant="secondary">{["user", "creator", "seller"][i % 3]}</Badge>
                          </td>
                          <td className="p-3">{Math.floor(Math.random() * 50)}</td>
                          <td className="p-3">
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/80 border-green-200">
                <CardHeader>
                  <CardTitle>Sales Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gradient-to-b from-green-100 to-green-50 rounded-lg flex items-end justify-around p-4">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className="flex flex-col items-center space-y-2">
                        <div
                          className="bg-green-500 rounded-t"
                          style={{
                            width: "24px",
                            height: `${40 + Math.random() * 80}px`,
                          }}
                        ></div>
                        <span className="text-xs text-gray-600">Day {i + 1}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 border-green-200">
                <CardHeader>
                  <CardTitle>Revenue Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: "Fashion", value: 35, color: "bg-green-500" },
                      { label: "Electronics", value: 28, color: "bg-blue-500" },
                      { label: "Home & Garden", value: 22, color: "bg-emerald-500" },
                      { label: "Other", value: 15, color: "bg-gray-500" },
                    ].map((item, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{item.label}</span>
                          <span className="font-semibold">{item.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.value}%` }}></div>
                        </div>
                      </div>
                    ))}
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
