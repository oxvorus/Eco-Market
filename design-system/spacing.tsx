"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SpacingSystem() {
  const spacingScale = [
    { name: "0", value: "0px", class: "0" },
    { name: "1", value: "4px", class: "1" },
    { name: "2", value: "8px", class: "2" },
    { name: "3", value: "12px", class: "3" },
    { name: "4", value: "16px", class: "4" },
    { name: "5", value: "20px", class: "5" },
    { name: "6", value: "24px", class: "6" },
    { name: "8", value: "32px", class: "8" },
    { name: "10", value: "40px", class: "10" },
    { name: "12", value: "48px", class: "12" },
    { name: "16", value: "64px", class: "16" },
    { name: "20", value: "80px", class: "20" },
    { name: "24", value: "96px", class: "24" },
    { name: "32", value: "128px", class: "32" },
  ]

  const borderRadius = [
    { name: "none", value: "0px", class: "rounded-none" },
    { name: "sm", value: "2px", class: "rounded-sm" },
    { name: "default", value: "4px", class: "rounded" },
    { name: "md", value: "6px", class: "rounded-md" },
    { name: "lg", value: "8px", class: "rounded-lg" },
    { name: "xl", value: "12px", class: "rounded-xl" },
    { name: "2xl", value: "16px", class: "rounded-2xl" },
    { name: "3xl", value: "24px", class: "rounded-3xl" },
    { name: "full", value: "9999px", class: "rounded-full" },
  ]

  const shadows = [
    { name: "sm", class: "shadow-sm", description: "Subtle shadow for cards" },
    { name: "default", class: "shadow", description: "Default shadow" },
    { name: "md", class: "shadow-md", description: "Medium shadow for elevated elements" },
    { name: "lg", class: "shadow-lg", description: "Large shadow for modals" },
    { name: "xl", class: "shadow-xl", description: "Extra large shadow" },
    { name: "2xl", class: "shadow-2xl", description: "Maximum shadow" },
  ]

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Spacing & Layout</h1>
          <p className="text-xl text-gray-600">Spacing scale, border radius, and shadows</p>
        </div>

        {/* Spacing Scale */}
        <Card>
          <CardHeader>
            <CardTitle>Spacing Scale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {spacingScale.map((space) => (
                <div key={space.name} className="flex items-center space-x-4">
                  <div className="w-16 text-sm font-mono">{space.name}</div>
                  <div className="w-20 text-sm text-gray-600">{space.value}</div>
                  <div className="flex-1">
                    <div className="bg-purple-200 h-4" style={{ width: space.value }} />
                  </div>
                  <Badge variant="outline" className="font-mono text-xs">
                    p-{space.class}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Border Radius */}
        <Card>
          <CardHeader>
            <CardTitle>Border Radius</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {borderRadius.map((radius) => (
                <div key={radius.name} className="text-center">
                  <div className={`w-16 h-16 bg-purple-200 mx-auto mb-2 ${radius.class}`} />
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{radius.name}</p>
                    <p className="text-xs text-gray-600">{radius.value}</p>
                    <Badge variant="outline" className="text-xs font-mono">
                      {radius.class}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Shadows */}
        <Card>
          <CardHeader>
            <CardTitle>Shadows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {shadows.map((shadow) => (
                <div key={shadow.name} className="text-center">
                  <div className={`w-20 h-20 bg-white mx-auto mb-3 rounded-lg ${shadow.class}`} />
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{shadow.name}</p>
                    <p className="text-xs text-gray-600">{shadow.description}</p>
                    <Badge variant="outline" className="text-xs font-mono">
                      {shadow.class}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Layout Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Layout Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold mb-4">Card Spacing</h3>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="text-lg font-semibold mb-4">Card Title</h4>
                  <p className="text-gray-600 mb-4">This card uses p-6 (24px) padding for comfortable spacing.</p>
                  <div className="flex space-x-3">
                    <div className="bg-purple-600 text-white px-4 py-2 rounded-lg">Primary</div>
                    <div className="border border-gray-300 px-4 py-2 rounded-lg">Secondary</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Button Spacing</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-purple-600 text-white px-4 py-2 rounded-lg">px-4 py-2</div>
                  <div className="bg-purple-600 text-white px-6 py-3 rounded-lg">px-6 py-3</div>
                  <div className="bg-purple-600 text-white px-8 py-4 rounded-lg">px-8 py-4</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">List Spacing</h3>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg shadow-sm border">List Item 1</div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border">List Item 2</div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border">List Item 3</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
