"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Leaf,
  Recycle,
  TreePine,
  Heart,
  Star,
  ShoppingCart,
  Users,
  Package,
  Award,
  Eye,
  MessageCircle,
  Settings,
  Download,
  Share,
  Plus,
  Search,
  Filter,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function DesignSystemPage() {
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
                  <p className="text-xs text-green-600">Design System</p>
                </div>
              </Link>
            </div>
            <Button variant="outline" className="hover:bg-green-50 hover:border-green-500 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export Guidelines
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="colors" className="w-full">
          <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border border-green-200 rounded-lg mb-6">
            <TabsList className="grid w-full grid-cols-6 h-12 bg-transparent">
              <TabsTrigger
                value="colors"
                className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
              >
                Colors
              </TabsTrigger>
              <TabsTrigger
                value="typography"
                className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800"
              >
                Typography
              </TabsTrigger>
              <TabsTrigger
                value="components"
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800"
              >
                Components
              </TabsTrigger>
              <TabsTrigger
                value="icons"
                className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800"
              >
                Icons
              </TabsTrigger>
              <TabsTrigger
                value="spacing"
                className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800"
              >
                Spacing
              </TabsTrigger>
              <TabsTrigger
                value="patterns"
                className="data-[state=active]:bg-teal-100 data-[state=active]:text-teal-800"
              >
                Patterns
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="colors" className="mt-0 space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <Leaf className="h-5 w-5 mr-2" />
                  Eco-Friendly Color Palette
                </CardTitle>
                <CardDescription>
                  Palet warna yang mencerminkan nilai-nilai keberlanjutan dan ramah lingkungan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Primary Colors */}
                <div>
                  <h3 className="font-semibold mb-4 text-gray-800">Primary Colors</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <div className="w-full h-20 bg-green-500 rounded-lg shadow-sm"></div>
                      <div className="text-center">
                        <p className="font-medium text-sm">Green Primary</p>
                        <p className="text-xs text-gray-500">#10B981</p>
                        <p className="text-xs text-gray-500">rgb(16, 185, 129)</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-20 bg-green-600 rounded-lg shadow-sm"></div>
                      <div className="text-center">
                        <p className="font-medium text-sm">Green Dark</p>
                        <p className="text-xs text-gray-500">#059669</p>
                        <p className="text-xs text-gray-500">rgb(5, 150, 105)</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-20 bg-emerald-500 rounded-lg shadow-sm"></div>
                      <div className="text-center">
                        <p className="font-medium text-sm">Emerald</p>
                        <p className="text-xs text-gray-500">#10B981</p>
                        <p className="text-xs text-gray-500">rgb(16, 185, 129)</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-20 bg-blue-500 rounded-lg shadow-sm"></div>
                      <div className="text-center">
                        <p className="font-medium text-sm">Ocean Blue</p>
                        <p className="text-xs text-gray-500">#3B82F6</p>
                        <p className="text-xs text-gray-500">rgb(59, 130, 246)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secondary Colors */}
                <div>
                  <h3 className="font-semibold mb-4 text-gray-800">Secondary Colors</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="space-y-2">
                      <div className="w-full h-16 bg-amber-500 rounded-lg shadow-sm"></div>
                      <div className="text-center">
                        <p className="font-medium text-sm">Amber</p>
                        <p className="text-xs text-gray-500">#F59E0B</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-16 bg-purple-500 rounded-lg shadow-sm"></div>
                      <div className="text-center">
                        <p className="font-medium text-sm">Purple</p>
                        <p className="text-xs text-gray-500">#8B5CF6</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-16 bg-teal-500 rounded-lg shadow-sm"></div>
                      <div className="text-center">
                        <p className="font-medium text-sm">Teal</p>
                        <p className="text-xs text-gray-500">#14B8A6</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-16 bg-red-500 rounded-lg shadow-sm"></div>
                      <div className="text-center">
                        <p className="font-medium text-sm">Red</p>
                        <p className="text-xs text-gray-500">#EF4444</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-16 bg-gray-500 rounded-lg shadow-sm"></div>
                      <div className="text-center">
                        <p className="font-medium text-sm">Gray</p>
                        <p className="text-xs text-gray-500">#6B7280</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Background Colors */}
                <div>
                  <h3 className="font-semibold mb-4 text-gray-800">Background Gradients</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="w-full h-16 bg-gradient-to-r from-green-50 via-emerald-50 to-blue-50 rounded-lg shadow-sm border"></div>
                      <div className="text-center">
                        <p className="font-medium text-sm">Main Background</p>
                        <p className="text-xs text-gray-500">green-50 → emerald-50 → blue-50</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg shadow-sm"></div>
                      <div className="text-center">
                        <p className="font-medium text-sm">Card Accent</p>
                        <p className="text-xs text-gray-500">green-100 → emerald-100</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-sm"></div>
                      <div className="text-center">
                        <p className="font-medium text-sm">Button Primary</p>
                        <p className="text-xs text-gray-500">green-500 → emerald-600</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="typography" className="mt-0 space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Typography Scale</CardTitle>
                <CardDescription>Hierarki tipografi yang konsisten untuk semua komponen</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Heading 1 - 36px Bold</h1>
                    <p className="text-sm text-gray-500">Digunakan untuk judul utama halaman</p>
                  </div>
                  <div className="border-b pb-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Heading 2 - 30px Bold</h2>
                    <p className="text-sm text-gray-500">Digunakan untuk section headers</p>
                  </div>
                  <div className="border-b pb-4">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">Heading 3 - 24px Semibold</h3>
                    <p className="text-sm text-gray-500">Digunakan untuk sub-section headers</p>
                  </div>
                  <div className="border-b pb-4">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Heading 4 - 20px Semibold</h4>
                    <p className="text-sm text-gray-500">Digunakan untuk card titles</p>
                  </div>
                  <div className="border-b pb-4">
                    <p className="text-base text-gray-900 mb-2">Body Text - 16px Regular</p>
                    <p className="text-sm text-gray-500">Digunakan untuk konten utama dan deskripsi</p>
                  </div>
                  <div className="border-b pb-4">
                    <p className="text-sm text-gray-600 mb-2">Small Text - 14px Regular</p>
                    <p className="text-sm text-gray-500">Digunakan untuk metadata dan informasi tambahan</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Caption - 12px Regular</p>
                    <p className="text-sm text-gray-500">Digunakan untuk labels dan timestamps</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="components" className="mt-0 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Buttons */}
              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Buttons</CardTitle>
                  <CardDescription>Berbagai varian button untuk aksi yang berbeda</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button className="bg-green-600 hover:bg-green-700">Primary Button</Button>
                    <Button variant="outline" className="hover:bg-green-50 hover:border-green-500 bg-transparent">
                      Secondary Button
                    </Button>
                    <Button variant="ghost" className="hover:bg-green-100">
                      Ghost Button
                    </Button>
                    <Button variant="destructive">Destructive Button</Button>
                  </div>
                  <div className="space-y-3">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Small Button
                    </Button>
                    <Button size="lg" className="bg-green-600 hover:bg-green-700">
                      Large Button
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus className="h-4 w-4 mr-2" />
                      With Icon
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-green-50 hover:border-green-500 bg-transparent"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Badges */}
              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Badges</CardTitle>
                  <CardDescription>Status indicators dan labels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-green-600">Default</Badge>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Eco Score
                    </Badge>
                    <Badge variant="outline" className="border-green-300 text-green-700">
                      Outline
                    </Badge>
                    <Badge variant="destructive">Error</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <Leaf className="h-3 w-3 mr-1" />
                      Eco-Friendly
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      <Recycle className="h-3 w-3 mr-1" />
                      Recyclable
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Cards */}
              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Cards</CardTitle>
                  <CardDescription>Container untuk konten yang terorganisir</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Card className="border-green-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Basic Card</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600">Konten card dengan header dan body</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-green-100 to-emerald-100 border-green-200">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Leaf className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-800">Eco Impact Card</span>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>

              {/* Form Elements */}
              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Form Elements</CardTitle>
                  <CardDescription>Input fields dan form controls</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Input Field</label>
                    <Input placeholder="Placeholder text..." className="border-green-200 focus:border-green-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Textarea</label>
                    <Textarea
                      placeholder="Textarea placeholder..."
                      className="border-green-200 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search Input</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search..." className="pl-10 border-green-200 focus:border-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress */}
              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Progress Indicators</CardTitle>
                  <CardDescription>Visual feedback untuk progress dan loading</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Eco Score</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CO₂ Target</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-3" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Monthly Goal</span>
                      <span>67%</span>
                    </div>
                    <Progress value={67} className="h-2 bg-green-100" />
                  </div>
                </CardContent>
              </Card>

              {/* Avatars */}
              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Avatars</CardTitle>
                  <CardDescription>User profile pictures dan placeholders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback className="bg-green-100 text-green-700">U</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback className="bg-blue-100 text-blue-700">S</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-12 w-12 ring-2 ring-green-200">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback className="bg-emerald-100 text-emerald-700">C</AvatarFallback>
                    </Avatar>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="icons" className="mt-0 space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <TreePine className="h-5 w-5 mr-2" />
                  Eco-Friendly Icons
                </CardTitle>
                <CardDescription>Icon set yang mendukung tema keberlanjutan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {/* Environmental Icons */}
                  <div className="text-center space-y-2">
                    <div className="flex justify-center">
                      <Leaf className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="text-xs text-gray-600">Leaf</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="flex justify-center">
                      <Recycle className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="text-xs text-gray-600">Recycle</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="flex justify-center">
                      <TreePine className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="text-xs text-gray-600">Tree</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="flex justify-center">
                      <Award className="h-8 w-8 text-amber-600" />
                    </div>
                    <p className="text-xs text-gray-600">Award</p>
                  </div>

                  {/* Action Icons */}
                  <div className="text-center space-y-2">
                    <div className="flex justify-center">
                      <Heart className="h-8 w-8 text-red-500" />
                    </div>
                    <p className="text-xs text-gray-600">Heart</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="flex justify-center">
                      <Star className="h-8 w-8 text-yellow-500" />
                    </div>
                    <p className="text-xs text-gray-600">Star</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="flex justify-center">
                      <ShoppingCart className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="text-xs text-gray-600">Cart</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="flex justify-center">
                      <MessageCircle className="h-8 w-8 text-purple-600" />
                    </div>
                    <p className="text-xs text-gray-600">Message</p>
                  </div>

                  {/* Interface Icons */}
                  <div className="text-center space-y-2">
                    <div className="flex justify-center">
                      <Search className="h-8 w-8 text-gray-600" />
                    </div>
                    <p className="text-xs text-gray-600">Search</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="flex justify-center">
                      <Filter className="h-8 w-8 text-gray-600" />
                    </div>
                    <p className="text-xs text-gray-600">Filter</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="flex justify-center">
                      <Settings className="h-8 w-8 text-gray-600" />
                    </div>
                    <p className="text-xs text-gray-600">Settings</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="flex justify-center">
                      <Share className="h-8 w-8 text-gray-600" />
                    </div>
                    <p className="text-xs text-gray-600">Share</p>
                  </div>

                  {/* Business Icons */}
                  <div className="text-center space-y-2">
                    <div className="flex justify-center">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="text-xs text-gray-600">Users</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="flex justify-center">
                      <Package className="h-8 w-8 text-brown-600" />
                    </div>
                    <p className="text-xs text-gray-600">Package</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="flex justify-center">
                      <Eye className="h-8 w-8 text-gray-600" />
                    </div>
                    <p className="text-xs text-gray-600">Eye</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="flex justify-center">
                      <Plus className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="text-xs text-gray-600">Plus</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="spacing" className="mt-0 space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Spacing System</CardTitle>
                <CardDescription>Konsistensi jarak dan padding untuk layout yang harmonis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-1 h-1 bg-green-500"></div>
                    <span className="text-sm">1 - 4px</span>
                    <span className="text-xs text-gray-500">Minimal spacing</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500"></div>
                    <span className="text-sm">2 - 8px</span>
                    <span className="text-xs text-gray-500">Small spacing</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-green-500"></div>
                    <span className="text-sm">3 - 12px</span>
                    <span className="text-xs text-gray-500">Medium spacing</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-green-500"></div>
                    <span className="text-sm">4 - 16px</span>
                    <span className="text-xs text-gray-500">Default spacing</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-6 h-6 bg-green-500"></div>
                    <span className="text-sm">6 - 24px</span>
                    <span className="text-xs text-gray-500">Large spacing</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-green-500"></div>
                    <span className="text-sm">8 - 32px</span>
                    <span className="text-xs text-gray-500">Extra large spacing</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patterns" className="mt-0 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Product Card Pattern */}
              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Product Card Pattern</CardTitle>
                  <CardDescription>Template untuk menampilkan produk eco-friendly</CardDescription>
                </CardHeader>
                <CardContent>
                  <Card className="border-green-200 hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <div className="w-full h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-t-lg flex items-center justify-center">
                        <Package className="h-12 w-12 text-green-600" />
                      </div>
                      <Badge className="absolute top-2 right-2 bg-green-600">
                        <Leaf className="h-3 w-3 mr-1" />
                        Eco 9.2
                      </Badge>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-medium text-sm mb-1">Produk Eco-Friendly</h3>
                      <p className="text-xs text-gray-500 mb-2">Sustainable Category</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-green-600">Rp 125.000</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">4.8</span>
                        </div>
                      </div>
                      <div className="bg-green-50 p-2 rounded-lg mt-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-green-700">CO₂ Saved:</span>
                          <span className="font-medium text-green-800">2.5kg</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>

              {/* User Profile Pattern */}
              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">User Profile Pattern</CardTitle>
                  <CardDescription>Template untuk profil creator dan seller</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 p-3 border border-green-200 rounded-lg">
                    <Avatar className="h-12 w-12 ring-2 ring-green-200">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback className="bg-green-100 text-green-700">EC</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium">Eco Creator</h3>
                      <p className="text-sm text-gray-600">Sustainable Living Expert</p>
                      <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                        <span className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          125K
                        </span>
                        <span className="flex items-center">
                          <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                          4.8
                        </span>
                        <span className="flex items-center">
                          <Leaf className="h-3 w-3 mr-1 text-green-600" />
                          45.2kg CO₂
                        </span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Follow
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Card Pattern */}
              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Stats Card Pattern</CardTitle>
                  <CardDescription>Template untuk menampilkan metrics dan KPI</CardDescription>
                </CardHeader>
                <CardContent>
                  <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100 text-sm">Environmental Impact</p>
                          <p className="text-2xl font-bold">125.5kg</p>
                          <p className="text-xs text-green-100">+15.3% this month</p>
                        </div>
                        <Leaf className="h-8 w-8 text-green-200" />
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>

              {/* Navigation Pattern */}
              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Navigation Pattern</CardTitle>
                  <CardDescription>Template untuk header dan navigation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white/80 backdrop-blur-md border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                          <Leaf className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h1 className="font-bold text-green-800">ecomarket</h1>
                          <p className="text-xs text-green-600">Don't Throw It, ReMarket It!</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" className="hover:bg-green-100">
                          <Search className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-green-100">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Plus className="h-3 w-3 mr-1" />
                          Action
                        </Button>
                      </div>
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
