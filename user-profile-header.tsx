"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Mail, Phone, MapPin, User } from "lucide-react"

interface UserProfileHeaderProps {
  name: string
  email: string
  role: string
  avatar_url?: string
  bio?: string
  phone?: string
  address?: string
  onEdit?: () => void
}

export function UserProfileHeader({
  name,
  email,
  role,
  avatar_url,
  bio,
  phone,
  address,
  onEdit,
}: UserProfileHeaderProps) {
  const roleColors: Record<string, string> = {
    user: "bg-green-100 text-green-800",
    creator: "bg-blue-100 text-blue-800",
    seller: "bg-amber-100 text-amber-800",
    community: "bg-emerald-100 text-emerald-800",
  }

  const roleLabels: Record<string, string> = {
    user: "Eco Consumer",
    creator: "Eco Creator",
    seller: "Eco Seller",
    community: "Bank Sampah",
  }

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20 ring-4 ring-green-200">
            <AvatarImage src={avatar_url || "/placeholder.svg"} />
            <AvatarFallback className="bg-green-200 text-green-800 text-xl font-bold">{name[0]}</AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
              <Badge className={roleColors[role as keyof typeof roleColors]}>
                <User className="h-3 w-3 mr-1" />
                {roleLabels[role as keyof typeof roleLabels]}
              </Badge>
            </div>

            <div className="space-y-1 text-sm text-gray-600">
              {email && (
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>{email}</span>
                </div>
              )}
              {phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>{phone}</span>
                </div>
              )}
              {address && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{address}</span>
                </div>
              )}
            </div>

            {bio && <p className="text-sm text-gray-700 italic">"{bio}"</p>}
          </div>
        </div>

        {onEdit && (
          <Button onClick={onEdit} className="bg-green-600 hover:bg-green-700">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profil
          </Button>
        )}
      </div>
    </div>
  )
}
