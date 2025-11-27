"use client"

import * as React from "react"
import DeviceFrame from "@/components/device-frame"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Preset = { id: string; label: string; size: { w: number; h: number } }

const presets: Preset[] = [
  { id: "iphone-14", label: "iPhone 14/15 (390×844)", size: { w: 390, h: 844 } },
  { id: "iphone-14pm", label: "iPhone 14 Pro Max (430×932)", size: { w: 430, h: 932 } },
  { id: "iphone-se2", label: "iPhone SE 2 (375×667)", size: { w: 375, h: 667 } },
  { id: "pixel-7", label: "Pixel 7 (412×915)", size: { w: 412, h: 915 } },
  { id: "pixel-5", label: "Pixel 5 (393×851)", size: { w: 393, h: 851 } },
]

export default function MobileMockPage() {
  const [preset, setPreset] = React.useState<Preset>(presets[0])
  const [src, setSrc] = React.useState("/mvp/index.html")

  return (
    <main className="min-h-[100dvh] bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <header className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold">Smartphone Mockup — Ecomarket MVP</h1>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setSrc("/mvp/index.html")}>
              Landing
            </Button>
            <Button variant="secondary" onClick={() => setSrc("/mvp/marketplace.html")}>
              Marketplace
            </Button>
            <Button variant="secondary" onClick={() => setSrc("/mvp/login.html")}>
              Login
            </Button>
          </div>
        </header>

        <Card>
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base">Pilih Perangkat</CardTitle>
            <Select
              defaultValue={preset.id}
              onValueChange={(val) => {
                const p = presets.find((x) => x.id === val) || presets[0]
                setPreset(p)
              }}
            >
              <SelectTrigger className="w-[260px]">
                <SelectValue placeholder="Pilih perangkat" />
              </SelectTrigger>
              <SelectContent>
                {presets.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <DeviceFrame src={src} width={preset.size.w} height={preset.size.h} />
          </CardContent>
        </Card>

        <p className="mt-4 text-sm text-neutral-600">Tip: Ubah ukuran jendela untuk melihat skala perangkat.</p>
      </div>
    </main>
  )
}
