"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Wallet,
  Smartphone,
  CheckCircle,
  Leaf,
  Shield,
  Clock,
  Recycle,
  TreePine,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("ewallet")
  const [selectedEwallet, setSelectedEwallet] = useState("gopay")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [useEcoPackaging, setUseEcoPackaging] = useState(true)
  const [carbonOffset, setCarbonOffset] = useState(true)

  const orderItems = [
    {
      id: "1",
      name: "Tas Ramah Lingkungan dari Plastik Daur Ulang",
      price: 125000,
      quantity: 1,
      image: "/eco-friendly-bag-made-from-recycled-plastic.jpg",
      seller: "EcoStore Jakarta",
      ecoScore: 9.2,
      co2Saved: 2.5,
    },
    {
      id: "2",
      name: "Smartphone Refurbished Eco-Friendly",
      price: 2500000,
      quantity: 1,
      image: "/refurbished-smartphone-eco-friendly.jpg",
      seller: "TechGreen",
      ecoScore: 8.7,
      co2Saved: 15.2,
    },
  ]

  const paymentMethods = [
    {
      id: "ewallet",
      name: "E-Wallet",
      icon: Wallet,
      description: "Pembayaran digital yang cepat dan aman",
      options: [
        { id: "gopay", name: "GoPay", fee: 0, popular: true },
        { id: "ovo", name: "OVO", fee: 0, popular: false },
        { id: "dana", name: "DANA", fee: 0, popular: false },
        { id: "shopeepay", name: "ShopeePay", fee: 2500, popular: false },
      ],
    },
    {
      id: "bank",
      name: "Transfer Bank",
      icon: CreditCard,
      description: "Transfer langsung ke rekening bank",
      options: [
        { id: "bca", name: "BCA", fee: 0, popular: true },
        { id: "mandiri", name: "Mandiri", fee: 0, popular: false },
        { id: "bni", name: "BNI", fee: 0, popular: false },
        { id: "bri", name: "BRI", fee: 0, popular: false },
      ],
    },
    {
      id: "va",
      name: "Virtual Account",
      icon: Smartphone,
      description: "Bayar melalui ATM atau mobile banking",
      options: [
        { id: "bca_va", name: "BCA Virtual Account", fee: 4000, popular: true },
        { id: "mandiri_va", name: "Mandiri Virtual Account", fee: 4000, popular: false },
        { id: "bni_va", name: "BNI Virtual Account", fee: 4000, popular: false },
      ],
    },
  ]

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalCO2Saved = orderItems.reduce((sum, item) => sum + item.co2Saved * item.quantity, 0)
  const averageEcoScore =
    orderItems.reduce((sum, item) => sum + item.ecoScore * item.quantity, 0) /
    orderItems.reduce((sum, item) => sum + item.quantity, 0)

  const shippingFee = 0 // Free eco shipping
  const ecoPackagingFee = useEcoPackaging ? 5000 : 0
  const carbonOffsetFee = carbonOffset ? 15000 : 0
  const selectedPaymentOption = paymentMethods
    .find((m) => m.id === paymentMethod)
    ?.options.find((o) => o.id === selectedEwallet)
  const paymentFee = selectedPaymentOption?.fee || 0
  const adminFee = 2500
  const total = subtotal + shippingFee + ecoPackagingFee + carbonOffsetFee + paymentFee + adminFee

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setOrderComplete(true)
    }, 3000)
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="relative mb-6">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
              <div className="absolute -top-2 -right-2">
                <Leaf className="h-8 w-8 text-green-600 animate-pulse" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Pembayaran Berhasil!</h2>
            <p className="text-gray-600 mb-4">Terima kasih telah berbelanja berkelanjutan</p>

            {/* Environmental Impact */}
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="text-center">
                  <div className="font-bold text-green-700">{totalCO2Saved.toFixed(1)}kg</div>
                  <div className="text-green-600">CO₂ Dihemat</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-emerald-700">{averageEcoScore.toFixed(1)}</div>
                  <div className="text-emerald-600">Eco Score</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/user/orders">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Clock className="h-4 w-4 mr-2" />
                  Lihat Status Pesanan
                </Button>
              </Link>
              <Link href="/user/home">
                <Button
                  variant="outline"
                  className="w-full border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
                >
                  Lanjut Belanja Eco
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="relative mb-6">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600 mx-auto"></div>
              <Leaf className="h-6 w-6 text-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Memproses Pembayaran Eco</h2>
            <p className="text-gray-600 mb-4">Sedang memverifikasi transaksi berkelanjutan Anda...</p>
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-sm text-green-700">🌱 Setiap detik menunggu, bumi semakin terjaga</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-200/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/user/cart">
                <Button variant="ghost" size="sm" className="text-green-700 hover:bg-green-100">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Kembali
                </Button>
              </Link>
              <div>
                <h1 className="font-bold text-xl text-green-800">Checkout Eco</h1>
                <p className="text-sm text-gray-600">Pembayaran berkelanjutan</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4 bg-green-100/50 rounded-lg px-3 py-2">
              <div className="text-center">
                <div className="text-sm font-bold text-green-700">{totalCO2Saved.toFixed(1)}kg</div>
                <div className="text-xs text-gray-600">CO₂ Saved</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-green-800">
                  <MapPin className="h-5 w-5 mr-2" />
                  Alamat Pengiriman Eco
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium">John Doe</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Utama
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">(+62) 812-3456-7890</p>
                    <p className="text-sm text-gray-600">
                      Jl. Sudirman No. 123, RT.01/RW.02
                      <br />
                      Menteng, Jakarta Pusat, DKI Jakarta 10310
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
                  >
                    Ubah
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-green-800">Produk Berkelanjutan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-3 bg-green-50/50 rounded-lg">
                      <div className="relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="w-15 h-15 object-cover rounded-lg"
                        />
                        <Badge
                          variant="secondary"
                          className="absolute -top-1 -right-1 bg-green-200 text-green-800 text-xs px-1"
                        >
                          {item.ecoScore}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                        <p className="text-xs text-gray-500 mb-1">{item.seller}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-green-700">
                            Rp {item.price.toLocaleString("id-ID")}
                          </span>
                          <span className="text-xs text-gray-500">x{item.quantity}</span>
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          <Leaf className="h-3 w-3 text-green-600" />
                          <span className="text-xs text-green-600">{item.co2Saved}kg CO₂ saved</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Eco Options */}
            <Card className="bg-gradient-to-r from-green-100 to-emerald-100 border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-green-800">
                  <TreePine className="h-5 w-5 mr-2" />
                  Opsi Ramah Lingkungan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={useEcoPackaging}
                      onChange={(e) => setUseEcoPackaging(e.target.checked)}
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    />
                    <div>
                      <span className="font-medium text-green-800">Kemasan Ramah Lingkungan</span>
                      <p className="text-xs text-gray-600">Kemasan dari bahan daur ulang</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-700">+Rp 5.000</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={carbonOffset}
                      onChange={(e) => setCarbonOffset(e.target.checked)}
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    />
                    <div>
                      <span className="font-medium text-green-800">Carbon Offset</span>
                      <p className="text-xs text-gray-600">Netralkan jejak karbon pengiriman</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-700">+Rp 15.000</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-green-800">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Metode Pembayaran
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  {paymentMethods.map((method) => {
                    const Icon = method.icon
                    return (
                      <div key={method.id} className="space-y-3">
                        <div className="flex items-center space-x-3 p-4 border border-green-200 rounded-lg hover:bg-green-50/50 transition-colors">
                          <RadioGroupItem value={method.id} id={method.id} className="border-green-500" />
                          <Icon className="h-5 w-5 text-green-600" />
                          <div className="flex-1">
                            <Label htmlFor={method.id} className="font-medium text-gray-900">
                              {method.name}
                            </Label>
                            <p className="text-xs text-gray-500">{method.description}</p>
                          </div>
                        </div>
                        {paymentMethod === method.id && (
                          <div className="ml-8 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {method.options.map((option) => (
                              <div
                                key={option.id}
                                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                  selectedEwallet === option.id
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-200 hover:border-green-300"
                                }`}
                                onClick={() => setSelectedEwallet(option.id)}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium">{option.name}</span>
                                  {option.popular && (
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                                      Populer
                                    </Badge>
                                  )}
                                </div>
                                {option.fee > 0 && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    Biaya admin: Rp {option.fee.toLocaleString("id-ID")}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            {/* Environmental Impact */}
            <Card className="bg-gradient-to-r from-green-100 to-emerald-100 border-green-200 sticky top-32">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-green-800">
                  <Recycle className="h-5 w-5 mr-2" />
                  Dampak Lingkungan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700">{totalCO2Saved.toFixed(1)}kg</div>
                  <p className="text-sm text-gray-600">CO₂ yang Dihemat</p>
                </div>
                <Progress value={averageEcoScore * 10} className="h-2" />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Eco Score</span>
                  <span>{averageEcoScore.toFixed(1)}/10</span>
                </div>
                <div className="bg-white/60 rounded-lg p-3 text-center">
                  <p className="text-xs text-green-700">
                    🌱 Setara dengan menanam {Math.ceil(totalCO2Saved / 22)} pohon
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-green-800">Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({orderItems.length} produk)</span>
                    <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ongkos Kirim Eco</span>
                    <span className="text-green-600 font-medium">GRATIS</span>
                  </div>
                  {useEcoPackaging && (
                    <div className="flex justify-between text-green-600">
                      <span>Kemasan Ramah Lingkungan</span>
                      <span>Rp {ecoPackagingFee.toLocaleString("id-ID")}</span>
                    </div>
                  )}
                  {carbonOffset && (
                    <div className="flex justify-between text-green-600">
                      <span>Carbon Offset</span>
                      <span>Rp {carbonOffsetFee.toLocaleString("id-ID")}</span>
                    </div>
                  )}
                  {paymentFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Biaya Admin Pembayaran</span>
                      <span>Rp {paymentFee.toLocaleString("id-ID")}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Biaya Admin</span>
                    <span>Rp {adminFee.toLocaleString("id-ID")}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total Pembayaran</span>
                  <span className="text-green-700">Rp {total.toLocaleString("id-ID")}</span>
                </div>

                <Button
                  onClick={handlePayment}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Bayar Sekarang
                </Button>

                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                  <Shield className="h-3 w-3" />
                  <span>Pembayaran aman dan terenkripsi</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
