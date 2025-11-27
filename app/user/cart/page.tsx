"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Minus, Plus, Trash2, Leaf, ShoppingBag, Truck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function CartPage() {
  const router = useRouter()
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const { data: cartData, mutate: mutateCart, isLoading } = useSWR("/api/cart", fetcher)
  const cartItems = cartData?.data || []

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      })

      if (response.ok) {
        mutateCart()
      }
    } catch (error) {
      console.error("Error updating quantity:", error)
    }
  }

  const removeItem = async (itemId: string) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        mutateCart()
        setSelectedItems((items) => items.filter((id) => id !== itemId))
      }
    } catch (error) {
      console.error("Error removing item:", error)
    }
  }

  const toggleItemSelection = (id: string) => {
    setSelectedItems((items) => (items.includes(id) ? items.filter((itemId) => itemId !== id) : [...items, id]))
  }

  const selectedCartItems = cartItems.filter((item: any) => selectedItems.includes(item.id))
  const subtotal = selectedCartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
  const totalCO2Saved = selectedCartItems.reduce(
    (sum: number, item: any) => sum + (item.co2Saved || 0) * item.quantity,
    0,
  )

  const shipping = subtotal > 500000 ? 0 : 25000
  const discount = 50000
  const total = subtotal + shipping - discount

  const freeShippingProgress = Math.min((subtotal / 500000) * 100, 100)

  if (isLoading) {
    return <div className="p-4 text-center">Loading cart...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-200/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/user/home">
                <Button variant="ghost" size="sm" className="text-green-700 hover:bg-green-100">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Kembali
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-green-800">Keranjang Eco</h1>
                <p className="text-sm text-gray-600">{cartItems.length} produk berkelanjutan</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6 bg-green-100/50 rounded-lg px-4 py-2">
              <div className="text-center">
                <div className="text-lg font-bold text-green-700">{totalCO2Saved.toFixed(1)}kg</div>
                <div className="text-xs text-gray-600">CO₂ Dihemat</div>
              </div>
            </div>
          </div>

          {subtotal < 500000 && (
            <div className="mt-4 bg-blue-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-800">
                  Tambah Rp {(500000 - subtotal).toLocaleString("id-ID")} untuk gratis ongkir!
                </span>
                <Truck className="h-4 w-4 text-blue-600" />
              </div>
              <Progress value={freeShippingProgress} className="h-2" />
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <Card className="bg-white/80">
                <CardContent className="p-12 text-center">
                  <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Keranjang kosong</h3>
                  <p className="text-gray-500 mb-6">Mulai tambahkan produk berkelanjutan favorit Anda</p>
                  <Link href="/marketplace">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Leaf className="h-4 w-4 mr-2" />
                      Jelajahi Marketplace
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              cartItems.map((item: any) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-md bg-white/80">
                  <CardContent className="p-4">
                    <div className="flex space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleItemSelection(item.id)}
                        className="w-4 h-4 text-green-600 rounded mt-2"
                      />

                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={item.image || "/placeholder.svg?key=cart"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                        <p className="text-xs text-gray-600 mb-1">{item.seller}</p>

                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                            {item.category}
                          </Badge>
                          <span className="text-xs text-green-600">{item.eco_score || 8.5}/10</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="font-bold text-green-700">Rp {item.price.toLocaleString("id-ID")}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center space-x-2 mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <Card className="sticky top-32 bg-white/80">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Ongkos Kirim</span>
                    <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                      {shipping === 0 ? "GRATIS" : `Rp ${shipping.toLocaleString("id-ID")}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Diskon</span>
                    <span>-Rp {discount.toLocaleString("id-ID")}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-green-700">Rp {total.toLocaleString("id-ID")}</span>
                </div>

                <Link href="/user/checkout">
                  <Button className="w-full bg-green-600 hover:bg-green-700" disabled={selectedItems.length === 0}>
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Checkout ({selectedItems.length})
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
