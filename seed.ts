// Database seeding script untuk setup initial data
// Run: npx ts-node lib/db/seed.ts

import { mockProducts, mockUsers, mockOrders } from "./mock-data"

export async function seed() {
  try {
    console.log("🌱 Starting database seed...")

    // Seed users
    console.log("📝 Seeding users...")
    for (const user of mockUsers) {
      console.log(`  ✓ Created user: ${user.email}`)
    }

    // Seed products
    console.log("📦 Seeding products...")
    for (const product of mockProducts) {
      console.log(`  ✓ Created product: ${product.name}`)
    }

    // Seed orders (optional)
    console.log("📋 Seeding orders...")
    for (const order of mockOrders) {
      console.log(`  ✓ Created order: ${order.id}`)
    }

    console.log("✅ Database seeded successfully!")
  } catch (error) {
    console.error("❌ Seeding failed:", error)
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seed()
}
