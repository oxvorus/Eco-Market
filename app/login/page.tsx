"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Store, Video, ArrowRight, Users, Home, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAuthContext } from "@/components/auth-provider"
import { setUserRole } from "@/lib/role"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const { login } = useAuthContext()

  const handleLogin = async () => {
    if (!selectedRole || !email || !password) {
      setError("Semua field harus diisi")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await login(email, password)
      setUserRole(selectedRole as any)

      const roleMap: Record<string, string> = {
        user: "/user/home",
        creator: "/creator/dashboard",
        seller: "/seller/dashboard",
        community: "/community/dashboard",
      }

      router.push(roleMap[selectedRole] || "/")
    } catch (err) {
      setError("Login gagal. Silakan periksa kembali email dan password Anda.")
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const roles = [
    {
      id: "user",
      title: "Eco Consumer",
      description: "Jelajahi produk daur ulang dan ramah lingkungan",
      icon: User,
      color: "bg-green-500",
      href: "/user/home",
    },
    {
      id: "creator",
      title: "Eco Creator",
      description: "Buat konten edukasi zero waste dan promosi produk eco",
      icon: Video,
      color: "bg-blue-500",
      href: "/creator/dashboard",
    },
    {
      id: "seller",
      title: "Eco Seller",
      description: "Jual produk daur ulang dan berkelanjutan",
      icon: Store,
      color: "bg-amber-500",
      href: "/seller/dashboard",
    },
    {
      id: "community",
      title: "Bank Sampah",
      description: "Kelola komunitas daur ulang dan bank sampah",
      icon: Users,
      color: "bg-emerald-600",
      href: "/community/dashboard",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Landing Page Link */}
        <div className="text-center mb-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="text-sm font-medium">Kembali ke Beranda</span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="mr-4">
              <Image src="/ecomarket-logo.png" alt="ecomarket Logo" width={80} height={80} className="rounded-lg" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-green-800">ecomarket</h1>
              <div className="mt-2">
                <span className="text-sm text-green-600 font-medium bg-green-100 px-3 py-1 rounded-full">
                  Don't Throw It, ReMarket It!
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-600">Marketplace Daur Ulang Berbasis Komunitas</p>
          <p className="text-sm text-green-700 mt-2">🌱 Sustainable Urban 2025 🌱</p>
        </div>

        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Masuk ke Akun</CardTitle>
            <CardDescription>Pilih role dan bergabung dengan komunitas zero waste</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="border-green-200 focus:border-green-500"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="border-green-200 focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Pilih Role Anda</Label>
              <div className="grid gap-3">
                {roles.map((role) => {
                  const Icon = role.icon
                  return (
                    <div
                      key={role.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedRole === role.id
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-green-300"
                      } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={() => !isLoading && setSelectedRole(role.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${role.color} text-white`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{role.title}</h3>
                          <p className="text-sm text-gray-600">{role.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={!selectedRole || !email || !password || isLoading}
              onClick={handleLogin}
            >
              {isLoading
                ? "Sedang Masuk..."
                : "Masuk sebagai " + (selectedRole ? roles.find((r) => r.id === selectedRole)?.title : "Role")}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Belum punya akun?{" "}
                <Link href="/register" className="text-green-600 hover:underline font-medium">
                  Daftar sekarang
                </Link>
              </p>
            </div>

            {/* Zero Waste Principles */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2 text-center">Prinsip 5R Zero Waste</h4>
              <div className="grid grid-cols-5 gap-2 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mb-1">
                    <span className="text-xs font-bold text-red-600">R</span>
                  </div>
                  <span className="text-xs text-gray-600">Refuse</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mb-1">
                    <span className="text-xs font-bold text-orange-600">R</span>
                  </div>
                  <span className="text-xs text-gray-600">Reduce</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-1">
                    <span className="text-xs font-bold text-blue-600">R</span>
                  </div>
                  <span className="text-xs text-gray-600">Reuse</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-1">
                    <span className="text-xs font-bold text-green-600">R</span>
                  </div>
                  <span className="text-xs text-gray-600">Recycle</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mb-1">
                    <span className="text-xs font-bold text-amber-600">R</span>
                  </div>
                  <span className="text-xs text-gray-600">Rot</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
