# EcoMarket API Documentation

Dokumentasi lengkap semua endpoint API yang tersedia di EcoMarket.

## Base URL

\`\`\`
http://localhost:3000/api        # Development
https://your-domain.com/api      # Production
\`\`\`

## Authentication

Semua endpoint yang protected memerlukan `auth_token` cookie yang valid.

## 📦 Products API

### List All Products

\`\`\`
GET /api/products
\`\`\`

**Query Parameters:**
- \`skip\` (number): Pagination offset (default: 0)
- \`limit\` (number): Items per page (default: 10)

**Response:**
\`\`\`json
{
  "products": [
    {
      "id": "1",
      "name": "Recycled Plastic Bottle",
      "price": 25000,
      "category": "upcycled",
      "eco_score": 8.5
    }
  ],
  "total": 150
}
\`\`\`

### Get Product Detail

\`\`\`
GET /api/products/:id
\`\`\`

**Response:**
\`\`\`json
{
  "id": "1",
  "name": "Recycled Plastic Bottle",
  "description": "...",
  "price": 25000,
  "category": "upcycled",
  "eco_score": 8.5,
  "reviews": [],
  "seller": {}
}
\`\`\`

### Search Products

\`\`\`
GET /api/products/search?q=recycled&category=upcycled&minPrice=10000&maxPrice=50000&sort=price
\`\`\`

**Query Parameters:**
- \`q\` (string): Search keyword
- \`category\` (string): Filter by category
- \`minPrice\` (number): Minimum price
- \`maxPrice\` (number): Maximum price
- \`sort\` (string): Sort field (price, rating, newest)

## 👤 Authentication API

### Register

\`\`\`
POST /api/auth/register
\`\`\`

**Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "user"
}
\`\`\`

**Response:**
\`\`\`json
{
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  },
  "token": "auth_token_here"
}
\`\`\`

### Login

\`\`\`
POST /api/auth/login
\`\`\`

**Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "password123"
}
\`\`\`

### Get Current User

\`\`\`
GET /api/auth/me
\`\`\`

**Response:**
\`\`\`json
{
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  }
}
\`\`\`

### Logout

\`\`\`
POST /api/auth/logout
\`\`\`

## 🛒 Cart API

### Get Cart Items

\`\`\`
GET /api/cart
\`\`\`

**Response:**
\`\`\`json
{
  "items": [
    {
      "product_id": "1",
      "quantity": 2,
      "product": {}
    }
  ],
  "total": 50000
}
\`\`\`

### Add to Cart

\`\`\`
POST /api/cart/add
\`\`\`

**Body:**
\`\`\`json
{
  "product_id": "1",
  "quantity": 1
}
\`\`\`

### Update Cart Item

\`\`\`
PATCH /api/cart/:product_id
\`\`\`

**Body:**
\`\`\`json
{
  "quantity": 3
}
\`\`\`

### Remove from Cart

\`\`\`
DELETE /api/cart/:product_id
\`\`\`

## 📋 Orders API

### Get User Orders

\`\`\`
GET /api/users/orders
\`\`\`

**Response:**
\`\`\`json
{
  "orders": [
    {
      "id": "order-123",
      "status": "completed",
      "total": 100000,
      "created_at": "2024-01-15",
      "items": []
    }
  ]
}
\`\`\`

## ❤️ Favorites API

### Get Favorites

\`\`\`
GET /api/users/favorites
\`\`\`

### Add to Favorites

\`\`\`
POST /api/users/favorites
\`\`\`

**Body:**
\`\`\`json
{
  "product_id": "1"
}
\`\`\`

### Remove from Favorites

\`\`\`
DELETE /api/users/favorites/:product_id
\`\`\`

## 👨‍💼 Admin API

### Get Dashboard Stats

\`\`\`
GET /api/admin/dashboard/stats
\`\`\`

**Response:**
\`\`\`json
{
  "total_users": 1247,
  "total_products": 342,
  "total_orders": 5689,
  "total_revenue": 125750000,
  "eco_impact": {
    "waste_collected": 2847,
    "carbon_saved": 1523
  }
}
\`\`\`

### Moderate Products

\`\`\`
GET /api/admin/moderation/products
POST /api/admin/moderation/products/:id/approve
POST /api/admin/moderation/products/:id/reject
\`\`\`

## Error Responses

### 400 Bad Request
\`\`\`json
{
  "error": "Invalid request",
  "details": "Email already exists"
}
\`\`\`

### 401 Unauthorized
\`\`\`json
{
  "error": "Unauthorized",
  "details": "Auth token required"
}
\`\`\`

### 404 Not Found
\`\`\`json
{
  "error": "Not found",
  "details": "Product not found"
}
\`\`\`

### 500 Server Error
\`\`\`json
{
  "error": "Internal server error",
  "details": "Something went wrong"
}
\`\`\`

## Rate Limiting

- No rate limit di development
- Production: 100 requests per minute per IP

## Webhooks (Future)

- \`product.created\`
- \`product.updated\`
- \`order.completed\`
- \`order.cancelled\`
\`\`\`
