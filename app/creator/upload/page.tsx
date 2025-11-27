"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Upload, Video, ImageIcon, Tag, Eye, X, Leaf, TreePine, Award, Target, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function UploadContentPage() {
  const [contentType, setContentType] = useState<"video" | "image">("video")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [ecoCategory, setEcoCategory] = useState("")
  const [sustainabilityGoals, setSustainabilityGoals] = useState<string[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const availableProducts = [
    {
      id: "1",
      name: "Serum Vitamin C Organik",
      seller: "EcoBeauty Store Official",
      commission: "15%",
      ecoScore: 9.2,
      category: "Skincare",
      image: "/placeholder.svg?height=60&width=60&text=Serum",
    },
    {
      id: "2",
      name: "Smartphone Refurbished Grade A",
      seller: "GreenTech Indonesia",
      commission: "20%",
      ecoScore: 8.7,
      category: "Electronics",
      image: "/placeholder.svg?height=60&width=60&text=Phone",
    },
    {
      id: "3",
      name: "Tas Daur Ulang Premium",
      seller: "Sustainable Fashion Co",
      commission: "12%",
      ecoScore: 9.5,
      category: "Fashion",
      image: "/placeholder.svg?height=60&width=60&text=Bag",
    },
    {
      id: "4",
      name: "Furnitur Kayu Upcycle",
      seller: "EcoWood Craft",
      commission: "18%",
      ecoScore: 9.1,
      category: "Furniture",
      image: "/placeholder.svg?height=60&width=60&text=Wood",
    },
  ]

  const suggestedTags = [
    "eco-friendly",
    "sustainable",
    "zero-waste",
    "organic",
    "review",
    "tutorial",
    "tips",
    "green-living",
    "recycle",
    "upcycle",
  ]

  const ecoCategories = [
    { id: "review", name: "Product Review", icon: Eye, description: "Review produk ramah lingkungan" },
    { id: "tutorial", name: "Tutorial", icon: Target, description: "Tutorial gaya hidup berkelanjutan" },
    { id: "education", name: "Edukasi", icon: Award, description: "Konten edukatif lingkungan" },
    { id: "lifestyle", name: "Lifestyle", icon: Users, description: "Gaya hidup zero waste" },
  ]

  const sustainabilityOptions = [
    "Mengurangi sampah plastik",
    "Promosi produk daur ulang",
    "Edukasi zero waste",
    "Gaya hidup berkelanjutan",
    "Konservasi energi",
    "Penggunaan bahan organik",
  ]

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleProductSelect = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handleSustainabilityGoalToggle = (goal: string) => {
    setSustainabilityGoals((prev) => (prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const calculateEcoScore = () => {
    let score = 0
    if (selectedProducts.length > 0) score += 30
    if (sustainabilityGoals.length > 0) score += 25
    if (ecoCategory) score += 20
    if (tags.some((tag) => ["eco-friendly", "sustainable", "zero-waste", "organic"].includes(tag))) score += 25
    return Math.min(score, 100)
  }

  const estimatedCO2Impact = () => {
    const baseImpact = selectedProducts.length * 1.5
    const categoryMultiplier = ecoCategory === "education" ? 2 : ecoCategory === "tutorial" ? 1.8 : 1.5
    const goalMultiplier = sustainabilityGoals.length * 0.3
    return (baseImpact * categoryMultiplier + goalMultiplier).toFixed(1)
  }

  const handleSubmit = async () => {
    if (!title || !description || !uploadedFile) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          // Redirect to dashboard or show success message
          return 100
        }
        return prev + 10
      })
    }, 500)

    // Handle form submission
    console.log({
      contentType,
      title,
      description,
      tags,
      selectedProducts,
      uploadedFile,
      ecoCategory,
      sustainabilityGoals,
      ecoScore: calculateEcoScore(),
      estimatedCO2Impact: estimatedCO2Impact(),
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-green-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/creator/dashboard">
                <Button variant="ghost" size="icon" className="hover:bg-green-100">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="font-bold text-xl text-green-800">Upload Konten Eco</h1>
                <p className="text-sm text-gray-600">Buat konten yang menginspirasi gaya hidup berkelanjutan</p>
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700"
              disabled={!title || !description || !uploadedFile || isUploading}
            >
              {isUploading ? "Uploading..." : "Publish"}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Content Type Selection */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Jenis Konten</CardTitle>
                <CardDescription>Pilih jenis konten yang ingin Anda upload</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      contentType === "video"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                    onClick={() => setContentType("video")}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <Video className="h-8 w-8 text-green-600" />
                      <span className="font-medium">Video</span>
                      <span className="text-sm text-gray-500 text-center">Upload video edukatif eco-friendly</span>
                    </div>
                  </div>
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      contentType === "image"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                    onClick={() => setContentType("image")}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <ImageIcon className="h-8 w-8 text-green-600" />
                      <span className="font-medium">Foto</span>
                      <span className="text-sm text-gray-500 text-center">Upload foto dengan tips berkelanjutan</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* File Upload */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Upload {contentType === "video" ? "Video" : "Foto"}</CardTitle>
                <CardDescription>
                  {contentType === "video"
                    ? "Format yang didukung: MP4, MOV, AVI (Max 500MB)"
                    : "Format yang didukung: JPG, PNG, WEBP (Max 10MB)"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-green-300 rounded-lg p-8 bg-green-50/50">
                  <div className="text-center">
                    {uploadedFile ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center">
                          {contentType === "video" ? (
                            <Video className="h-16 w-16 text-green-600" />
                          ) : (
                            <ImageIcon className="h-16 w-16 text-green-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-green-800">{uploadedFile.name}</p>
                          <p className="text-sm text-gray-600">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        {isUploading && (
                          <div className="space-y-2">
                            <Progress value={uploadProgress} className="h-2" />
                            <p className="text-sm text-green-600">Uploading... {uploadProgress}%</p>
                          </div>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setUploadedFile(null)}
                          className="hover:bg-green-50 hover:border-green-500 bg-transparent"
                        >
                          Ganti File
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Upload className="h-16 w-16 text-green-400 mx-auto" />
                        <div>
                          <p className="text-green-700 font-medium">Drag & drop file atau klik untuk browse</p>
                          <p className="text-sm text-gray-500">
                            Upload konten yang menginspirasi gaya hidup berkelanjutan
                          </p>
                        </div>
                        <input
                          type="file"
                          accept={contentType === "video" ? "video/*" : "image/*"}
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <Label htmlFor="file-upload">
                          <Button
                            variant="outline"
                            className="cursor-pointer hover:bg-green-50 hover:border-green-500 bg-transparent"
                          >
                            Pilih File
                          </Button>
                        </Label>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Details */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Detail Konten</CardTitle>
                <CardDescription>Isi informasi tentang konten eco-friendly Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Judul</Label>
                  <Input
                    id="title"
                    placeholder="Masukkan judul yang menarik dan ramah lingkungan..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={100}
                    className="border-green-200 focus:border-green-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">{title.length}/100 karakter</p>
                </div>

                <div>
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    placeholder="Ceritakan tentang produk eco-friendly yang Anda promosikan dan dampak positifnya..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    maxLength={500}
                    className="border-green-200 focus:border-green-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">{description.length}/500 karakter</p>
                </div>

                {/* Eco Category */}
                <div>
                  <Label>Kategori Eco</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {ecoCategories.map((category) => {
                      const Icon = category.icon
                      return (
                        <div
                          key={category.id}
                          className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                            ecoCategory === category.id
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 hover:border-green-300"
                          }`}
                          onClick={() => setEcoCategory(category.id)}
                        >
                          <div className="flex items-center space-x-2">
                            <Icon className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="font-medium text-sm">{category.name}</p>
                              <p className="text-xs text-gray-500">{category.description}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1 bg-green-100 text-green-800"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                        <button onClick={() => removeTag(tag)}>
                          <X className="h-3 w-3 hover:text-red-600" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Tambah tag eco-friendly..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addTag(newTag)}
                      className="border-green-200 focus:border-green-500"
                    />
                    <Button
                      variant="outline"
                      onClick={() => addTag(newTag)}
                      className="hover:bg-green-50 hover:border-green-500 bg-transparent"
                    >
                      Tambah
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className="text-xs text-gray-500 mr-2">Saran:</span>
                    {suggestedTags.map((tag) => (
                      <Button
                        key={tag}
                        variant="ghost"
                        size="sm"
                        className="h-6 text-xs hover:bg-green-50 hover:text-green-700"
                        onClick={() => addTag(tag)}
                      >
                        #{tag}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sustainability Goals */}
            <Card className="bg-gradient-to-r from-green-100 to-emerald-100 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <TreePine className="h-5 w-5 mr-2" />
                  Tujuan Keberlanjutan
                </CardTitle>
                <CardDescription>Pilih tujuan lingkungan yang ingin dicapai melalui konten ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {sustainabilityOptions.map((goal) => (
                    <div key={goal} className="flex items-center space-x-2 p-2 bg-white/60 rounded-lg">
                      <Checkbox
                        checked={sustainabilityGoals.includes(goal)}
                        onCheckedChange={() => handleSustainabilityGoalToggle(goal)}
                        className="border-green-500 data-[state=checked]:bg-green-600"
                      />
                      <span className="text-sm text-green-800">{goal}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Product Selection */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Produk yang Dipromosikan</CardTitle>
                <CardDescription>Pilih produk eco-friendly yang ingin Anda promosikan dalam konten ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {availableProducts.map((product) => (
                    <div
                      key={product.id}
                      className={`flex items-center space-x-3 p-3 border rounded-lg transition-colors ${
                        selectedProducts.includes(product.id)
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                    >
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={() => handleProductSelect(product.id)}
                        className="border-green-500 data-[state=checked]:bg-green-600"
                      />
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-gray-600">{product.seller}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                            {product.category}
                          </Badge>
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                            Eco {product.ecoScore}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-green-600 border-green-300">
                          Komisi {product.commission}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                {selectedProducts.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Pilih minimal 1 produk eco-friendly untuk dipromosikan
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Eco Impact Prediction */}
            <Card className="bg-gradient-to-r from-emerald-100 to-green-100 border-emerald-200 sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center text-emerald-800">
                  <Leaf className="h-5 w-5 mr-2" />
                  Prediksi Eco Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-700">{calculateEcoScore()}</div>
                  <p className="text-sm text-gray-600">Eco Score</p>
                  <Progress value={calculateEcoScore()} className="mt-2 h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Estimasi CO₂ Impact:</span>
                    <span className="font-bold text-emerald-700">{estimatedCO2Impact()}kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Produk Dipromosikan:</span>
                    <span className="font-bold text-blue-700">{selectedProducts.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Tujuan Sustainability:</span>
                    <span className="font-bold text-purple-700">{sustainabilityGoals.length}</span>
                  </div>
                </div>

                <div className="bg-white/60 rounded-lg p-3 text-center">
                  <p className="text-xs text-emerald-700">
                    🌱 Konten ini berpotensi menginspirasi {Math.ceil(calculateEcoScore() * 10)} orang untuk hidup lebih
                    berkelanjutan
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Upload Tips */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Award className="h-5 w-5 mr-2" />
                  Tips Konten Eco
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-blue-800">Gunakan pencahayaan alami untuk video yang lebih eco-friendly</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-blue-800">Sertakan tips praktis yang mudah diterapkan</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-blue-800">Tunjukkan dampak positif dari produk yang direview</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-blue-800">Ajak audience untuk berpartisipasi dalam gerakan zero waste</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Statistik Anda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Followers:</span>
                  <span className="font-bold text-green-700">125K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg. Views:</span>
                  <span className="font-bold text-blue-700">12.5K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Eco Impact Total:</span>
                  <span className="font-bold text-emerald-700">45.2kg CO₂</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Engagement Rate:</span>
                  <span className="font-bold text-purple-700">8.5%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
