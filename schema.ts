export interface User {
  id: string
  email: string
  name: string
  password_hash: string
  role: "user" | "creator" | "seller" | "admin"
  avatar_url?: string
  bio?: string
  phone?: string
  address?: string
  created_at: Date
  updated_at: Date
}

export interface Product {
  id: string
  seller_id: string
  name: string
  description: string
  category: "electronics" | "fashion" | "home" | "food" | "other"
  price: number
  stock: number
  condition: "new" | "like-new" | "used" | "refurbished"
  eco_score: number // 1-10
  images: string[]
  rating: number
  reviews_count: number
  created_at: Date
  updated_at: Date
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: Date
}

export interface Order {
  id: string
  user_id: string
  seller_id: string
  product_id: string
  quantity: number
  total_price: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shipping_address: string
  created_at: Date
  updated_at: Date
}

export interface Review {
  id: string
  product_id: string
  user_id: string
  rating: number
  comment: string
  created_at: Date
}

export interface Community {
  id: string
  name: string
  description: string
  members_count: number
  icon_url?: string
  created_at: Date
}
