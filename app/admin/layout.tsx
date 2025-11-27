import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard - ecomarket",
  description: "Admin dashboard for managing ecomarket",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
