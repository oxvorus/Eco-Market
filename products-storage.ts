import fs from "fs"
import path from "path"

const PRODUCTS_FILE = path.join(process.cwd(), "data", "products.json")

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  images: string[]
  seller_name: string
  seller_id: string
  eco_score: number
  rating: number
  reviews_count: number
  created_at: string
}

function ensureDataDir() {
  const dir = path.dirname(PRODUCTS_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function readProducts(): Product[] {
  try {
    ensureDataDir()
    if (!fs.existsSync(PRODUCTS_FILE)) {
      return []
    }
    const data = fs.readFileSync(PRODUCTS_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading products:", error)
    return []
  }
}

function writeProducts(products: Product[]) {
  try {
    ensureDataDir()
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2))
  } catch (error) {
    console.error("Error writing products:", error)
  }
}

export function getAllProducts(): Product[] {
  return readProducts()
}

export function getProductById(id: string): Product | undefined {
  const products = readProducts()
  return products.find((p) => p.id === id)
}

export function searchProducts(query?: string, category?: string, minPrice?: number, maxPrice?: number): Product[] {
  let products = readProducts()

  if (query) {
    const lowerQuery = query.toLowerCase()
    products = products.filter(
      (p) => p.name.toLowerCase().includes(lowerQuery) || p.description.toLowerCase().includes(lowerQuery),
    )
  }

  if (category && category !== "all") {
    products = products.filter((p) => p.category === category)
  }

  if (minPrice !== undefined) {
    products = products.filter((p) => p.price >= minPrice)
  }

  if (maxPrice !== undefined) {
    products = products.filter((p) => p.price <= maxPrice)
  }

  return products
}

export function addProduct(product: Omit<Product, "id" | "created_at">): Product {
  const products = readProducts()
  const newProduct: Product = {
    ...product,
    id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    created_at: new Date().toISOString(),
  }
  products.push(newProduct)
  writeProducts(products)
  return newProduct
}
