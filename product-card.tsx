"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingCart, Star, Leaf } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice: number
  image: string
  seller: string
  rating: number
  reviews: number
  ecoScore: number
  discount?: string
  onAddToCart?: () => void
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  seller,
  rating,
  reviews,
  ecoScore,
  discount,
  onAddToCart,
}: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100)

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all">
      <Link href={`/product/${id}`}>
        <div className="relative">
          <Image
            src={image || "/placeholder.svg?height=200&width=200&query=product"}
            alt={name}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge className="bg-green-600 text-white">
              <Leaf className="h-3 w-3 mr-1" />
              {ecoScore}
            </Badge>
          </div>
          {discount && (
            <div className="absolute top-2 right-2">
              <Badge variant="destructive">-{discountPercent}%</Badge>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-2 right-2 bg-white/80 hover:bg-white"
            onClick={(e) => {
              e.preventDefault()
              setIsLiked(!isLiked)
            }}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>
      </Link>

      <CardContent className="p-4">
        <div className="space-y-3">
          <Link href={`/product/${id}`}>
            <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-green-600 transition-colors">{name}</h3>
          </Link>

          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-green-600">{formatPrice(price)}</span>
            <span className="text-sm text-gray-500 line-through">{formatPrice(originalPrice)}</span>
          </div>

          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-sm text-gray-500">({reviews})</span>
          </div>

          <div className="text-sm text-gray-600">oleh {seller}</div>

          <Button
            onClick={(e) => {
              e.preventDefault()
              onAddToCart?.()
            }}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Tambah ke Keranjang
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
