"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  MessageCircle,
  Share,
  ShoppingCart,
  Star,
  Eye,
  User,
  Video,
  Store,
  Home,
  Search,
  Bell,
  Settings,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  Upload,
  Download,
  Edit,
  Trash2,
  Menu,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipForward,
  CreditCard,
  Wallet,
  Truck,
  Shield,
  CheckCircle,
  AlertCircle,
  XCircle,
  Info,
  Zap,
  TrendingUp,
} from "lucide-react"

export default function IconSystem() {
  const iconCategories = [
    {
      name: "Navigation",
      icons: [
        { name: "Home", component: Home },
        { name: "Search", component: Search },
        { name: "Menu", component: Menu },
        { name: "ArrowLeft", component: ArrowLeft },
        { name: "ArrowRight", component: ArrowRight },
        { name: "X", component: X },
      ],
    },
    {
      name: "Actions",
      icons: [
        { name: "Plus", component: Plus },
        { name: "Minus", component: Minus },
        { name: "Edit", component: Edit },
        { name: "Trash2", component: Trash2 },
        { name: "Upload", component: Upload },
        { name: "Download", component: Download },
      ],
    },
    {
      name: "Social",
      icons: [
        { name: "Heart", component: Heart },
        { name: "MessageCircle", component: MessageCircle },
        { name: "Share", component: Share },
        { name: "Star", component: Star },
        { name: "Eye", component: Eye },
        { name: "Bell", component: Bell },
      ],
    },
    {
      name: "E-commerce",
      icons: [
        { name: "ShoppingCart", component: ShoppingCart },
        { name: "CreditCard", component: CreditCard },
        { name: "Wallet", component: Wallet },
        { name: "Truck", component: Truck },
        { name: "Shield", component: Shield },
        { name: "TrendingUp", component: TrendingUp },
      ],
    },
    {
      name: "Media",
      icons: [
        { name: "Play", component: Play },
        { name: "Pause", component: Pause },
        { name: "Volume2", component: Volume2 },
        { name: "VolumeX", component: VolumeX },
        { name: "Video", component: Video },
        { name: "SkipForward", component: SkipForward },
      ],
    },
    {
      name: "Status",
      icons: [
        { name: "CheckCircle", component: CheckCircle },
        { name: "AlertCircle", component: AlertCircle },
        { name: "XCircle", component: XCircle },
        { name: "Info", component: Info },
        { name: "Zap", component: Zap },
        { name: "Settings", component: Settings },
      ],
    },
    {
      name: "User Types",
      icons: [
        { name: "User", component: User },
        { name: "Video", component: Video },
        { name: "Store", component: Store },
      ],
    },
  ]

  const iconSizes = [
    { name: "Small", class: "h-4 w-4", size: "16px" },
    { name: "Medium", class: "h-5 w-5", size: "20px" },
    { name: "Large", class: "h-6 w-6", size: "24px" },
    { name: "XL", class: "h-8 w-8", size: "32px" },
  ]

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Icon System</h1>
          <p className="text-xl text-gray-600">Lucide React icons used in LARISIN</p>
        </div>

        {/* Icon Sizes */}
        <Card>
          <CardHeader>
            <CardTitle>Icon Sizes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-8">
              {iconSizes.map((size) => (
                <div key={size.name} className="text-center">
                  <Heart className={`${size.class} text-purple-600 mx-auto mb-2`} />
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{size.name}</p>
                    <p className="text-xs text-gray-600">{size.size}</p>
                    <Badge variant="outline" className="text-xs font-mono">
                      {size.class}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Icon Categories */}
        {iconCategories.map((category) => (
          <Card key={category.name}>
            <CardHeader>
              <CardTitle>{category.name} Icons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                {category.icons.map((icon) => {
                  const IconComponent = icon.component
                  return (
                    <div key={icon.name} className="text-center">
                      <div className="bg-white p-4 rounded-lg shadow-sm border mb-2">
                        <IconComponent className="h-6 w-6 text-gray-700 mx-auto" />
                      </div>
                      <p className="text-sm font-medium">{icon.name}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Icon Usage Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Buttons with Icons</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </div>
                  <div className="border border-gray-300 px-4 py-2 rounded-lg flex items-center">
                    <Heart className="h-4 w-4 mr-2" />
                    Like
                  </div>
                  <div className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Icon-only Buttons</h3>
                <div className="flex space-x-2">
                  <div className="bg-purple-600 text-white p-2 rounded-lg">
                    <Heart className="h-5 w-5" />
                  </div>
                  <div className="bg-gray-100 text-gray-700 p-2 rounded-lg">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div className="bg-gray-100 text-gray-700 p-2 rounded-lg">
                    <Share className="h-5 w-5" />
                  </div>
                  <div className="bg-gray-100 text-gray-700 p-2 rounded-lg">
                    <ShoppingCart className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Status Icons</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span>Success message</span>
                  </div>
                  <div className="flex items-center space-x-2 text-red-600">
                    <XCircle className="h-5 w-5" />
                    <span>Error message</span>
                  </div>
                  <div className="flex items-center space-x-2 text-yellow-600">
                    <AlertCircle className="h-5 w-5" />
                    <span>Warning message</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Info className="h-5 w-5" />
                    <span>Info message</span>
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
