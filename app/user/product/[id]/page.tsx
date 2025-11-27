"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  Share,
  Minus,
  Plus,
  MessageCircle,
  Shield,
  Truck,
  Leaf,
  Recycle,
  TreePine,
  Award,
  Users,
  Eye,
  ThumbsUp,
  Clock,
  MapPin,
  Package,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState("Serum Vitamin C")
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)

  const product = {
    id: "1",
    name: "Serum Vitamin C Premium Eco-Friendly",
    price: 89000,
    originalPrice: 111250,
    discount: 20,
    rating: 4.8,
    reviews: 1234,
    sold: 5678,
    views: 12500,
    likes: 892,
    images: [
      "/placeholder.svg?height=400&width=400&text=Eco+Serum+1",
      "/placeholder.svg?height=400&width=400&text=Eco+Serum+2",
      "/placeholder.svg?height=400&width=400&text=Eco+Serum+3",
      "/placeholder.svg?height=400&width=400&text=Eco+Serum+4",
    ],
    variants: ["Serum Vitamin C", "Serum Niacinamide", "Serum Hyaluronic"],
    category: "Skincare Berkelanjutan",
    ecoScore: 92,
    carbonSaved: 2.5,
    recycledMaterial: 85,
    description:
      "Serum Vitamin C Premium dengan kandungan 20% Vitamin C murni yang membantu mencerahkan kulit dan mengurangi tanda-tanda penuaan. Diproduksi dengan bahan-bahan organik dan kemasan 100% dapat didaur ulang. Cocok untuk semua jenis kulit dan telah tersertifikasi eco-friendly.",
    benefits: [
      "Mencerahkan kulit kusam secara alami",
      "Mengurangi flek hitam dan bekas jerawat",
      "Anti-aging dengan bahan organik",
      "Melembabkan kulit tanpa bahan kimia berbahaya",
      "Kemasan dapat didaur ulang 100%",
    ],
    ingredients: [
      "20% Vitamin C Organik",
      "Hyaluronic Acid Alami",
      "Niacinamide Ekstrak Tumbuhan",
      "Aloe Vera Organik",
      "Green Tea Extract",
    ],
    certifications: ["Organic Certified", "Cruelty-Free", "Eco-Friendly Packaging", "Vegan Formula"],
    seller: {
      name: "EcoBeauty Store Official",
      avatar: "/placeholder.svg?height=40&width=40&text=ES",
      rating: 4.9,
      location: "Jakarta Pusat",
      responseTime: "< 1 jam",
      followers: "25.4K",
      products: 156,
      joinDate: "2022",
    },
    creator: {
      name: "Sarah EcoBeauty",
      avatar: "/placeholder.svg?height=40&width=40&text=SB",
      followers: "125K",
      videos: 89,
      likes: "2.1M",
    },
    shipping: {
      freeShipping: true,
      estimatedDays: "2-3",
      from: "Jakarta",
      weight: "50g",
    },
    sustainability: {
      packaging: "Kemasan dari bahan daur ulang",
      production: "Diproduksi dengan energi terbarukan",
      shipping: "Pengiriman carbon-neutral",
      impact: "Setiap pembelian = 1 pohon ditanam",
    },
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = () => {
    // Add to cart logic
    console.log("Added to cart:", { productId: product.id, quantity, variant: selectedVariant })
  }

  const handleBuyNow = () => {
    // Buy now logic
    console.log("Buy now:", { productId: product.id, quantity, variant: selectedVariant })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-100">
        <div className="flex items-center justify-between p-4">
          <Link href="/user/home">
            <Button variant="ghost" size="icon" className="hover:bg-green-100">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-semibold text-gray-800">Detail Produk</h1>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" className="hover:bg-green-100">
              <Share className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`hover:bg-green-100 ${isWishlisted ? "text-red-500" : ""}`}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
      </div>

      <div className="pb-24">
        {/* Product Images */}
        <div className="bg-white">
          <div className="aspect-square relative">
            <Image
              src={product.images[selectedImageIndex] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
            <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">-{product.discount}%</Badge>
            <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 flex items-center gap-1">
              <Leaf className="h-3 w-3" />
              Eco {product.ecoScore}
            </Badge>
          </div>

          {/* Image Thumbnails */}
          <div className="flex gap-2 p-4 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImageIndex === index
                    ? "border-green-500 ring-2 ring-green-200"
                    : "border-gray-200 hover:border-green-300"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <Card className="rounded-none border-x-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <Badge variant="outline" className="mb-2 border-green-500 text-green-700">
                  {product.category}
                </Badge>
                <h1 className="text-xl font-bold text-gray-900">{product.name}</h1>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium ml-1">{product.rating}</span>
                    <span className="text-gray-500 ml-1">({product.reviews})</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Package className="h-4 w-4 mr-1" />
                    {product.sold} terjual
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Eye className="h-4 w-4 mr-1" />
                    {product.views.toLocaleString()}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {product.likes}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-2xl font-bold text-green-600">{formatPrice(product.price)}</span>
                <span className="text-lg text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
              </div>

              {/* Environmental Impact */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                  <Leaf className="h-4 w-4 mr-2" />
                  Dampak Lingkungan
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{product.carbonSaved}kg</div>
                    <div className="text-xs text-green-700">CO₂ Dihemat</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{product.recycledMaterial}%</div>
                    <div className="text-xs text-green-700">Bahan Daur Ulang</div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-green-700">Eco Score</span>
                    <span className="font-medium text-green-800">{product.ecoScore}/100</span>
                  </div>
                  <Progress value={product.ecoScore} className="h-2 bg-green-100" />
                </div>
              </div>

              {/* Variants */}
              <div>
                <p className="font-medium mb-2">Pilih Varian:</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <Button
                      key={variant}
                      variant={selectedVariant === variant ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedVariant(variant)}
                      className={
                        selectedVariant === variant ? "bg-green-600 hover:bg-green-700" : "hover:border-green-500"
                      }
                    >
                      {variant}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <p className="font-medium mb-2">Sertifikasi:</p>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert) => (
                    <Badge key={cert} variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                      <Award className="h-3 w-3 mr-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Creator Info */}
        <Card className="rounded-none border-x-0 border-t-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="ring-2 ring-green-200">
                  <AvatarImage src={product.creator.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-green-100 text-green-700">{product.creator.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{product.creator.name}</p>
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {product.creator.followers}
                    </span>
                    <span>{product.creator.videos} video</span>
                    <span>{product.creator.likes} suka</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="hover:bg-green-50 hover:border-green-500 bg-transparent">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Chat
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-green-50 hover:border-green-500 bg-transparent">
                  Follow
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seller Info */}
        <Card className="rounded-none border-x-0 border-t-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="ring-2 ring-blue-200">
                  <AvatarImage src={product.seller.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-blue-100 text-blue-700">{product.seller.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{product.seller.name}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{product.seller.rating}</span>
                    <span>•</span>
                    <MapPin className="h-3 w-3" />
                    <span>{product.seller.location}</span>
                    <span>•</span>
                    <Clock className="h-3 w-3" />
                    <span>{product.seller.responseTime}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                    <span>{product.seller.followers} pengikut</span>
                    <span>{product.seller.products} produk</span>
                    <span>Bergabung {product.seller.joinDate}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-500 bg-transparent">
                Kunjungi Toko
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Product Details Tabs */}
        <Card className="rounded-none border-x-0 border-t-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-0">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-50">
                <TabsTrigger
                  value="description"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  Deskripsi
                </TabsTrigger>
                <TabsTrigger
                  value="ingredients"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  Komposisi
                </TabsTrigger>
                <TabsTrigger
                  value="sustainability"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  Keberlanjutan
                </TabsTrigger>
                <TabsTrigger
                  value="shipping"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  Pengiriman
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="p-4">
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {showFullDescription ? product.description : `${product.description.substring(0, 200)}...`}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0"
                  >
                    {showFullDescription ? "Lihat Lebih Sedikit" : "Lihat Selengkapnya"}
                  </Button>

                  <div className="mt-4">
                    <p className="font-medium mb-2 text-gray-800">Manfaat:</p>
                    <ul className="space-y-2">
                      {product.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ingredients" className="p-4">
                <div>
                  <p className="font-medium mb-3 text-gray-800">Komposisi Utama:</p>
                  <div className="space-y-2">
                    {product.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center p-2 bg-green-50 rounded-lg">
                        <Leaf className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm text-gray-700">{ingredient}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sustainability" className="p-4">
                <div className="space-y-4">
                  {Object.entries(product.sustainability).map(([key, value]) => (
                    <div key={key} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="p-1 bg-green-100 rounded-full">
                        {key === "packaging" && <Package className="h-4 w-4 text-green-600" />}
                        {key === "production" && <Recycle className="h-4 w-4 text-green-600" />}
                        {key === "shipping" && <Truck className="h-4 w-4 text-green-600" />}
                        {key === "impact" && <TreePine className="h-4 w-4 text-green-600" />}
                      </div>
                      <div>
                        <p className="font-medium text-green-800 capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
                        <p className="text-sm text-green-700">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="shipping" className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-800">
                        {product.shipping.freeShipping ? "Gratis Ongkir" : "Ongkir Berbayar"}
                      </p>
                      <p className="text-sm text-blue-700">
                        Estimasi {product.shipping.estimatedDays} hari kerja dari {product.shipping.from}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">Garansi Kualitas</p>
                      <p className="text-sm text-green-700">100% original atau uang kembali</p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Berat:</span> {product.shipping.weight}
                    </p>
                    <p>
                      <span className="font-medium">Dikirim dari:</span> {product.shipping.from}
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-green-100 p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="h-8 w-8 hover:bg-green-100"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-medium text-sm">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
              className="h-8 w-8 hover:bg-green-100"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 flex space-x-2">
            <Button
              variant="outline"
              className="flex-1 hover:bg-green-50 hover:border-green-500 bg-transparent"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Keranjang
            </Button>
            <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleBuyNow}>
              Beli Sekarang
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
