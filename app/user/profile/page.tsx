"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, ArrowLeft, Save, Lock, Bell, Shield } from "lucide-react"
import Link from "next/link"
import { UserProfileHeader } from "@/components/user-profile-header"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuthContext } from "@/components/auth-provider"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function UserProfilePage() {
  const router = useRouter()
  const { user: authUser } = useAuthContext()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const { data: profileData, mutate } = useSWR("/api/users/profile", fetcher)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    phone: "",
    address: "",
  })

  useEffect(() => {
    if (profileData?.data) {
      setFormData({
        name: profileData.data.name,
        email: profileData.data.email,
        bio: profileData.data.bio || "",
        phone: profileData.data.phone || "",
        address: profileData.data.address || "",
      })
    }
  }, [profileData])

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setMessage({ type: "success", text: "Profil berhasil diperbarui!" })
        mutate()
        setIsEditing(false)
        setTimeout(() => setMessage(null), 3000)
      } else {
        setMessage({ type: "error", text: "Gagal memperbarui profil" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Terjadi kesalahan" })
    } finally {
      setIsSaving(false)
    }
  }

  if (!profileData) {
    return <div className="p-4">Loading...</div>
  }

  const profile = profileData.data

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/user/home">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Pengaturan Profil</h1>
            <div className="w-10" />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <Alert variant={message.type === "error" ? "destructive" : "default"} className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
            <TabsTrigger value="security">Keamanan</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <UserProfileHeader
              name={profile.name}
              email={profile.email}
              role={profile.role}
              avatar_url={profile.avatar_url}
              bio={profile.bio}
              phone={profile.phone}
              address={profile.address}
              onEdit={() => setIsEditing(true)}
            />

            {isEditing ? (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Informasi Profil</CardTitle>
                  <CardDescription>Ubah informasi pribadi Anda di sini</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="border-green-200 focus:border-green-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="border-green-200 focus:border-green-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="border-green-200 focus:border-green-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Alamat</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="border-green-200 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio / Tentang Anda</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Ceritakan tentang diri Anda..."
                      className="border-green-200 focus:border-green-500 resize-none"
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button onClick={handleSaveProfile} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Batal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Dasar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Nama</p>
                      <p className="font-medium">{profile.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{profile.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nomor Telepon</p>
                      <p className="font-medium">{profile.phone || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Alamat</p>
                      <p className="font-medium">{profile.address || "-"}</p>
                    </div>
                  </div>
                  {profile.bio && (
                    <div>
                      <p className="text-sm text-gray-500">Bio</p>
                      <p className="font-medium">{profile.bio}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Preferensi Notifikasi
                </CardTitle>
                <CardDescription>Kelola notifikasi dan alert yang Anda terima</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[
                    { id: "orders", label: "Notifikasi Pesanan", desc: "Pembaruan status pesanan Anda" },
                    { id: "promotions", label: "Promosi & Penawaran", desc: "Diskon eksklusif dan penawaran khusus" },
                    { id: "messages", label: "Pesan", desc: "Pemberitahuan pesan dari seller/creator" },
                    { id: "reviews", label: "Review & Rating", desc: "Notifikasi review produk Anda" },
                  ].map((notification) => (
                    <div key={notification.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{notification.label}</p>
                        <p className="text-sm text-gray-600">{notification.desc}</p>
                      </div>
                      <div className="w-12 h-6 bg-green-500 rounded-full cursor-pointer" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Keamanan Akun
                </CardTitle>
                <CardDescription>Kelola pengaturan keamanan dan akses akun Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Lock className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-900">Ubah Password</p>
                      <p className="text-sm text-yellow-800 mt-1">
                        Disarankan untuk mengubah password secara berkala untuk keamanan akun Anda.
                      </p>
                    </div>
                  </div>
                </div>

                <Button className="bg-green-600 hover:bg-green-700">
                  <Lock className="h-4 w-4 mr-2" />
                  Ubah Password
                </Button>

                <div className="border-t pt-6">
                  <p className="font-medium text-gray-900 mb-4">Sesi Aktif</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Browser Saat Ini</p>
                        <p className="text-sm text-gray-600">Chrome on Windows</p>
                      </div>
                      <span className="text-sm text-green-600 font-medium">Aktif Sekarang</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
