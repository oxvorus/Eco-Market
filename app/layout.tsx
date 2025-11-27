import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"

export const metadata: Metadata = {
  title: "ecomarket - Don't Throw It, ReMarket It!",
  description:
    "Marketplace daur ulang berbasis komunitas untuk produk berkelanjutan. Platform zero waste yang menghubungkan konsumen, kreator, seller, dan bank sampah.",
  keywords:
    "ecomarket, daur ulang, zero waste, marketplace, berkelanjutan, bank sampah, 5R, refuse reduce reuse recycle rot",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
