"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const categories = [
  { id: "electronics", label: "Elektronik" },
  { id: "fashion", label: "Fashion" },
  { id: "home", label: "Rumah & Furnitur" },
  { id: "food", label: "Makanan & Minuman" },
  { id: "other", label: "Lainnya" },
]

interface ProductFormProps {
  onSuccess?: () => void
  sellerId: string
  sellerName: string
}

export function ProductForm({ onSuccess, sellerId, sellerName }: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "other",
    eco_score: "75",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      setError("Semua field harus diisi")
      return
    }

    if (Number(formData.price) <= 0) {
      setError("Harga harus lebih dari 0")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          category: formData.category,
          seller_name: sellerName,
          seller_id: sellerId,
          eco_score: Number(formData.eco_score),
          images: ["/placeholder.svg"],
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to add product")
      }

      setSuccess(true)
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "other",
        eco_score: "75",
      })

      setTimeout(() => {
        setSuccess(false)
        onSuccess?.()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add product")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tambah Produk Baru</CardTitle>
        <CardDescription>Jual produk ramah lingkungan Anda di ecomarket</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">Produk berhasil ditambahkan!</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Nama Produk</Label>
            <Input
              id="name"
              name="name"
              placeholder="Contoh: Tas Bekas Kain Organik"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi Produk</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Jelaskan produk Anda, kondisi, bahan, ukuran, dll"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Harga (Rp)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="50000"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="eco_score">Eco Score (1-100)</Label>
            <Input
              id="eco_score"
              name="eco_score"
              type="number"
              min="1"
              max="100"
              value={formData.eco_score}
              onChange={handleChange}
            />
            <p className="text-sm text-gray-500">Semakin tinggi semakin eco-friendly produk Anda</p>
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Menambahkan Produk..." : "Tambah Produk"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
