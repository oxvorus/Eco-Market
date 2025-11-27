"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductForm } from "@/components/product-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SellerProductsPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Demo seller info - in production this would come from auth
  const sellerId = "seller_demo_001"
  const sellerName = "Toko Ramah Lingkungan"

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/seller/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-green-800">Kelola Produk</h1>
                <p className="text-sm text-gray-600">{sellerName}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Add Product Form */}
          <ProductForm
            sellerId={sellerId}
            sellerName={sellerName}
            onSuccess={() => {
              setRefreshTrigger((prev) => prev + 1)
            }}
          />

          {/* Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Tips Menjual di ecomarket</CardTitle>
              <CardDescription>Maksimalkan penjualan produk ramah lingkungan Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Foto Produk</h4>
                <p className="text-sm text-gray-600">
                  Gunakan foto berkualitas tinggi dengan pencahayaan baik untuk menarik pembeli
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Deskripsi Detail</h4>
                <p className="text-sm text-gray-600">
                  Jelaskan kondisi produk, bahan, ukuran, dan cara penggunaan dengan detail
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Harga Kompetitif</h4>
                <p className="text-sm text-gray-600">
                  Periksa harga produk sejenis di marketplace untuk menetapkan harga yang kompetitif
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Eco Score Tinggi</h4>
                <p className="text-sm text-gray-600">
                  Produk dengan eco score tinggi akan ditampilkan lebih prioritas di hasil pencarian
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
