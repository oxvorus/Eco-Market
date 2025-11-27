"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Store, Video, ArrowRight, Users, Home, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAuthContext } from "@/components/auth-provider"
import { setUserRole } from "@/lib/role"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const router = useRouter()
  const { register } = useAuthContext()

  const handleRegister = async () => {
    if (!selectedRole || !email || !name || !password || !confirmPassword) {
      setError("Semua field harus diisi")
      return
    }

    if (password !== confirmPassword) {
      setError("Password tidak cocok")
      return
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await register(email, password, name, selectedRole)
      setUserRole(selectedRole as any)
      setSuccess(true)

      setTimeout(() => {
        const roleMap: Record<string, string> = {
          user: "/user/home",
          creator: "/creator/dashboard",
          seller: "/seller/dashboard",
          community: "/community/dashboard",
        }
        router.push(roleMap[selectedRole] || "/")
      }, 1500)
    } catch (err) {
      setError("Pendaftaran gagal. Silakan coba lagi.")
      console.error("Register error:", err)
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
    },
    {
      id: "creator",
      title: "Eco Creator",
      description: "Buat konten edukasi zero waste dan promosi produk eco",
      icon: Video,
      color: "bg-blue-500",
    },
    {
      id: "seller",
      title: "Eco Seller",
      description: "Jual produk daur ulang dan berkelanjutan",
      icon: Store,
      color: "bg-amber-500",
    },
    {
      id: "community",
      title: "Bank Sampah",
      description: "Kelola komunitas daur ulang dan bank sampah",
      icon: Users,
      color: "bg-emerald-600",
    },
  ]

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-green-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
              <h2 className="text-2xl font-bold text-green-800">Pendaftaran Berhasil!</h2>
              <p className="text-gray-600">Selamat datang di ecomarket. Anda akan dialihkan ke dashboard...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
        </div>

        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Daftar Akun Baru</CardTitle>
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
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nama Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  className="border-green-200 focus:border-green-500"
                />
              </div>

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

              <div>
                <Label htmlFor="confirm-password">Konfirmasi Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              disabled={!selectedRole || !email || !name || !password || !confirmPassword || isLoading}
              onClick={handleRegister}
            >
              {isLoading ? "Sedang Mendaftar..." : "Daftar"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Sudah punya akun?{" "}
                <Link href="/login" className="text-green-600 hover:underline font-medium">
                  Masuk di sini
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
