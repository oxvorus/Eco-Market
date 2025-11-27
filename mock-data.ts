import type { User, Product, CartItem, Order, Review, Community } from "./schema"

// Mock users
export const mockUsers: User[] = [
  {
    id: "user-1",
    email: "budi@example.com",
    name: "Budi Santoso",
    password_hash: "hashed_password_123",
    role: "user",
    avatar_url: "/avatars/budi.jpg",
    bio: "Pencinta lingkungan dari Jakarta",
    phone: "081234567890",
    address: "Jl. Sudirman No. 123, Jakarta",
    created_at: new Date("2024-01-15"),
    updated_at: new Date("2024-11-21"),
  },
  {
    id: "creator-1",
    email: "siti@example.com",
    name: "Siti Nurhaliza",
    password_hash: "hashed_password_456",
    role: "creator",
    avatar_url: "/avatars/siti.jpg",
    bio: "Content creator tentang zero waste lifestyle",
    created_at: new Date("2024-02-10"),
    updated_at: new Date("2024-11-21"),
  },
  {
    id: "seller-1",
    email: "eco.shop@example.com",
    name: "Eco Shop Indonesia",
    password_hash: "hashed_password_789",
    role: "seller",
    avatar_url: "/avatars/eco-shop.jpg",
    bio: "Penjual produk ramah lingkungan",
    created_at: new Date("2024-03-01"),
    updated_at: new Date("2024-11-21"),
  },
]

// Mock products
export const mockProducts: Product[] = [
  {
    id: "prod-1",
    seller_id: "seller-1",
    name: "Tas Ramah Lingkungan dari Botol Plastik Daur Ulang",
    description:
      "Tas tangan bergaya modern yang dibuat 100% dari botol plastik daur ulang. Tahan lama dan berkualitas tinggi.",
    category: "fashion",
    price: 250000,
    stock: 15,
    condition: "new",
    eco_score: 9,
    images: ["/products/eco-bag-1.jpg", "/products/eco-bag-2.jpg"],
    rating: 4.8,
    reviews_count: 42,
    created_at: new Date("2024-10-01"),
    updated_at: new Date("2024-11-21"),
  },
  {
    id: "prod-2",
    seller_id: "seller-1",
    name: "Botol Minum Stainless Steel Reusable",
    description:
      "Botol minum 750ml tanpa BPA, cocok untuk aktivitas sehari-hari. Bisa menjaga suhu minuman hingga 12 jam.",
    category: "home",
    price: 120000,
    stock: 45,
    condition: "new",
    eco_score: 8,
    images: ["/products/bottle-1.jpg"],
    rating: 4.9,
    reviews_count: 156,
    created_at: new Date("2024-09-15"),
    updated_at: new Date("2024-11-21"),
  },
  {
    id: "prod-3",
    seller_id: "seller-1",
    name: "Kertas Daur Ulang untuk Kerajinan",
    description:
      "Paket 100 lembar kertas daur ulang berkualitas tinggi untuk kerajinan, origami, atau keperluan kantor.",
    category: "other",
    price: 45000,
    stock: 100,
    condition: "new",
    eco_score: 9,
    images: ["/products/paper-1.jpg"],
    rating: 4.6,
    reviews_count: 28,
    created_at: new Date("2024-08-20"),
    updated_at: new Date("2024-11-21"),
  },
]

// Mock cart
export const mockCart: CartItem[] = []

// Mock orders
export const mockOrders: Order[] = [
  {
    id: "order-1",
    user_id: "user-1",
    seller_id: "seller-1",
    product_id: "prod-1",
    quantity: 1,
    total_price: 250000,
    status: "delivered",
    shipping_address: "Jl. Sudirman No. 123, Jakarta",
    created_at: new Date("2024-11-01"),
    updated_at: new Date("2024-11-10"),
  },
]

// Mock reviews
export const mockReviews: Review[] = [
  {
    id: "review-1",
    product_id: "prod-1",
    user_id: "user-1",
    rating: 5,
    comment: "Kualitas sangat bagus! Packaging ramah lingkungan juga.",
    created_at: new Date("2024-11-11"),
  },
]

// Mock communities
export const mockCommunities: Community[] = [
  {
    id: "community-1",
    name: "Bank Sampah Jakarta Pusat",
    description: "Komunitas bank sampah terpercaya di Jakarta Pusat",
    members_count: 234,
    icon_url: "/icons/bank-sampah.jpg",
    created_at: new Date("2024-01-01"),
  },
  {
    id: "community-2",
    name: "Eco Warriors Indonesia",
    description: "Gerakan untuk mempromosikan gaya hidup ramah lingkungan",
    members_count: 1247,
    icon_url: "/icons/eco-warriors.jpg",
    created_at: new Date("2024-02-01"),
  },
]
