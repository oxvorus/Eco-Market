"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Heart, MessageCircle, Share, ShoppingCart, Star, Eye, User, Video, Store } from "lucide-react"

export default function ComponentLibrary() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Component Library</h1>
          <p className="text-xl text-gray-600">Reusable UI components for LARISIN</p>
        </div>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Primary Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-purple-600 hover:bg-purple-700">Primary</Button>
                  <Button className="bg-purple-600 hover:bg-purple-700" size="sm">
                    Small
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700" size="lg">
                    Large
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700" disabled>
                    Disabled
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Secondary Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Icon Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button size="icon" className="bg-purple-600 hover:bg-purple-700">
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Elements */}
        <Card>
          <CardHeader>
            <CardTitle>Form Elements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="nama@email.com" />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Setuju dengan syarat dan ketentuan</Label>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Pilih Role</Label>
                <RadioGroup defaultValue="user">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="user" />
                    <Label htmlFor="user">User</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="creator" id="creator" />
                    <Label htmlFor="creator">Kreator</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="seller" id="seller" />
                    <Label htmlFor="seller">Seller</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards */}
        <Card>
          <CardHeader>
            <CardTitle>Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Product Card */}
              <Card>
                <div className="relative">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Product"
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-red-500">-20%</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Serum Vitamin C Premium</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-bold text-purple-600">Rp 89.000</span>
                    <span className="text-sm text-gray-500 line-through">Rp 111.250</span>
                  </div>
                  <div className="flex items-center space-x-1 mb-3">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">4.8 (234 ulasan)</span>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Beli Sekarang</Button>
                </CardContent>
              </Card>

              {/* Creator Card */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>SB</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">Sarah Beauty</h3>
                      <p className="text-sm text-gray-500">125K followers</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div>
                      <span className="text-gray-500">Avg Views:</span>
                      <p className="font-medium">15K</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Rating:</span>
                      <p className="font-medium">4.8</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      Profil
                    </Button>
                    <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Card */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Eye className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Total Views</p>
                      <p className="text-2xl font-bold">125K</p>
                    </div>
                  </div>
                  <p className="text-sm text-green-600">↗ +12% dari bulan lalu</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Badges & Status */}
        <Card>
          <CardHeader>
            <CardTitle>Badges & Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Status Badges</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Error</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge className="bg-green-100 text-green-800">Success</Badge>
                  <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
                  <Badge className="bg-blue-100 text-blue-800">Info</Badge>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Role Badges</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-800">
                    <User className="h-3 w-3 mr-1" />
                    User
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800">
                    <Video className="h-3 w-3 mr-1" />
                    Kreator
                  </Badge>
                  <Badge className="bg-green-100 text-green-800">
                    <Store className="h-3 w-3 mr-1" />
                    Seller
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Discount Badges</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="destructive">-20%</Badge>
                  <Badge variant="destructive">-15%</Badge>
                  <Badge variant="destructive">-30%</Badge>
                  <Badge className="bg-orange-500 text-white">SALE</Badge>
                  <Badge className="bg-red-500 text-white">HOT</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Avatars */}
        <Card>
          <CardHeader>
            <CardTitle>Avatars</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Sizes</h3>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>XS</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback>MD</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback>LG</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">With Status</h3>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>ON</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>OFF</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-gray-400 border-2 border-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
