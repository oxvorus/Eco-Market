"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Recycle, TreePine } from "lucide-react"

export default function ColorPalette() {
  const colors = {
    primary: {
      name: "Eco Green",
      shades: [
        { name: "green-50", value: "#f0fdf4", hex: "#f0fdf4" },
        { name: "green-100", value: "#dcfce7", hex: "#dcfce7" },
        { name: "green-500", value: "#22c55e", hex: "#22c55e" },
        { name: "green-600", value: "#16a34a", hex: "#16a34a" },
        { name: "green-700", value: "#15803d", hex: "#15803d" },
        { name: "green-800", value: "#166534", hex: "#166534" },
        { name: "green-900", value: "#14532d", hex: "#14532d" },
      ],
    },
    secondary: {
      name: "Earth Tones",
      shades: [
        { name: "emerald-50", value: "#ecfdf5", hex: "#ecfdf5" },
        { name: "emerald-100", value: "#d1fae5", hex: "#d1fae5" },
        { name: "emerald-500", value: "#10b981", hex: "#10b981" },
        { name: "emerald-600", value: "#059669", hex: "#059669" },
        { name: "amber-100", value: "#fef3c7", hex: "#fef3c7" },
        { name: "amber-500", value: "#f59e0b", hex: "#f59e0b" },
        { name: "blue-100", value: "#dbeafe", hex: "#dbeafe" },
        { name: "blue-500", value: "#3b82f6", hex: "#3b82f6" },
      ],
    },
    neutral: {
      name: "Natural Gray",
      shades: [
        { name: "white", value: "#ffffff", hex: "#ffffff" },
        { name: "gray-50", value: "#f9fafb", hex: "#f9fafb" },
        { name: "gray-100", value: "#f3f4f6", hex: "#f3f4f6" },
        { name: "gray-200", value: "#e5e7eb", hex: "#e5e7eb" },
        { name: "gray-300", value: "#d1d5db", hex: "#d1d5db" },
        { name: "gray-400", value: "#9ca3af", hex: "#9ca3af" },
        { name: "gray-500", value: "#6b7280", hex: "#6b7280" },
        { name: "gray-600", value: "#4b5563", hex: "#4b5563" },
        { name: "gray-700", value: "#374151", hex: "#374151" },
        { name: "gray-800", value: "#1f2937", hex: "#1f2937" },
        { name: "gray-900", value: "#111827", hex: "#111827" },
        { name: "black", value: "#000000", hex: "#000000" },
      ],
    },
    semantic: {
      name: "5R Colors",
      shades: [
        { name: "refuse-red", value: "#ef4444", hex: "#ef4444", principle: "Refuse" },
        { name: "reduce-orange", value: "#f97316", hex: "#f97316", principle: "Reduce" },
        { name: "reuse-blue", value: "#3b82f6", hex: "#3b82f6", principle: "Reuse" },
        { name: "recycle-green", value: "#22c55e", hex: "#22c55e", principle: "Recycle" },
        { name: "rot-amber", value: "#f59e0b", hex: "#f59e0b", principle: "Rot" },
        { name: "success-emerald", value: "#10b981", hex: "#10b981", principle: "Success" },
        { name: "warning-yellow", value: "#eab308", hex: "#eab308", principle: "Warning" },
        { name: "info-cyan", value: "#06b6d4", hex: "#06b6d4", principle: "Info" },
      ],
    },
  }

  return (
    <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-600 p-3 rounded-full mr-3">
              <Recycle className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-green-800">ecomarket Design System</h1>
              <p className="text-xl text-green-600 flex items-center justify-center mt-2">
                <Leaf className="h-5 w-5 mr-2" />
                Zero Waste Color Palette & Design Tokens
              </p>
            </div>
          </div>
        </div>

        {Object.entries(colors).map(([category, colorGroup]) => (
          <Card key={category} className="border-green-200">
            <CardHeader>
              <CardTitle className="text-2xl text-green-800 flex items-center">
                {category === "primary" && <TreePine className="h-6 w-6 mr-2" />}
                {category === "secondary" && <Leaf className="h-6 w-6 mr-2" />}
                {category === "semantic" && <Recycle className="h-6 w-6 mr-2" />}
                {colorGroup.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {colorGroup.shades.map((color) => (
                  <div key={color.name} className="text-center">
                    <div
                      className="w-full h-20 rounded-lg border shadow-sm mb-3"
                      style={{ backgroundColor: color.value }}
                    />
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{color.name}</p>
                      <Badge variant="outline" className="text-xs font-mono">
                        {color.hex}
                      </Badge>
                      {color.principle && (
                        <Badge className="text-xs bg-green-100 text-green-800">{color.principle}</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* 5R Principles Showcase */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <Recycle className="h-6 w-6 mr-2" />
              Prinsip 5R Zero Waste
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">R</span>
                </div>
                <h3 className="font-semibold text-red-800 mb-2">Refuse</h3>
                <p className="text-sm text-red-600">Tolak barang yang tidak diperlukan</p>
              </div>

              <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">R</span>
                </div>
                <h3 className="font-semibold text-orange-800 mb-2">Reduce</h3>
                <p className="text-sm text-orange-600">Kurangi konsumsi berlebihan</p>
              </div>

              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">R</span>
                </div>
                <h3 className="font-semibold text-blue-800 mb-2">Reuse</h3>
                <p className="text-sm text-blue-600">Gunakan kembali barang bekas</p>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">R</span>
                </div>
                <h3 className="font-semibold text-green-800 mb-2">Recycle</h3>
                <p className="text-sm text-green-600">Daur ulang material bekas</p>
              </div>

              <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">R</span>
                </div>
                <h3 className="font-semibold text-amber-800 mb-2">Rot</h3>
                <p className="text-sm text-amber-600">Kompos sampah organik</p>
              </div>
            </div>

            {/* Usage Examples */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div>
                <h3 className="font-semibold mb-3 text-green-800">Eco Actions</h3>
                <div className="space-y-2">
                  <div className="bg-green-600 text-white px-4 py-2 rounded-lg">Primary Eco Button</div>
                  <div className="border border-green-600 text-green-600 px-4 py-2 rounded-lg">
                    Secondary Eco Button
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-green-800">Environmental Status</h3>
                <div className="space-y-2">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Eco-Friendly</div>
                  <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">Moderate Impact</div>
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">High Impact</div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Recyclable</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
