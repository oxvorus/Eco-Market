"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Typography() {
  const textStyles = [
    {
      name: "Display Large",
      class: "text-6xl font-bold",
      usage: "Hero titles, main headings",
      example: "LARISIN",
    },
    {
      name: "Display Medium",
      class: "text-4xl font-bold",
      usage: "Page titles, section headers",
      example: "Welcome to LARISIN",
    },
    {
      name: "Heading 1",
      class: "text-3xl font-bold",
      usage: "Card titles, modal headers",
      example: "Dashboard Overview",
    },
    {
      name: "Heading 2",
      class: "text-2xl font-bold",
      usage: "Section titles",
      example: "My Products",
    },
    {
      name: "Heading 3",
      class: "text-xl font-bold",
      usage: "Subsection titles",
      example: "Recent Activity",
    },
    {
      name: "Heading 4",
      class: "text-lg font-semibold",
      usage: "Component titles",
      example: "Product Details",
    },
    {
      name: "Body Large",
      class: "text-base font-medium",
      usage: "Important body text",
      example: "This is important information about the product.",
    },
    {
      name: "Body Medium",
      class: "text-sm font-medium",
      usage: "Regular body text",
      example: "Regular text content for descriptions and paragraphs.",
    },
    {
      name: "Body Small",
      class: "text-sm font-normal",
      usage: "Secondary text",
      example: "Additional information and helper text.",
    },
    {
      name: "Caption",
      class: "text-xs font-medium",
      usage: "Labels, metadata",
      example: "2 days ago • 1.2K views",
    },
    {
      name: "Caption Small",
      class: "text-xs font-normal text-gray-500",
      usage: "Timestamps, fine print",
      example: "Last updated 5 minutes ago",
    },
  ]

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Typography System</h1>
          <p className="text-xl text-gray-600">Text styles and hierarchy</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Text Styles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {textStyles.map((style, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <div className="md:w-1/4">
                      <h3 className="font-semibold text-gray-900">{style.name}</h3>
                      <Badge variant="outline" className="text-xs font-mono mt-1">
                        {style.class}
                      </Badge>
                    </div>
                    <div className="md:w-1/3">
                      <p className="text-sm text-gray-600">{style.usage}</p>
                    </div>
                    <div className="md:w-1/2">
                      <p className={style.class}>{style.example}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Font Information */}
        <Card>
          <CardHeader>
            <CardTitle>Font Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Primary Font</h3>
                <div className="space-y-2">
                  <p>
                    <strong>Family:</strong> Inter, system-ui, sans-serif
                  </p>
                  <p>
                    <strong>Weights:</strong> 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
                  </p>
                  <p>
                    <strong>Usage:</strong> All UI text, headings, body content
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Monospace Font</h3>
                <div className="space-y-2">
                  <p>
                    <strong>Family:</strong> ui-monospace, 'Courier New', monospace
                  </p>
                  <p>
                    <strong>Usage:</strong> Code snippets, technical data
                  </p>
                  <p className="font-mono text-sm bg-gray-100 p-2 rounded">Example: #9333ea</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Line Height & Spacing */}
        <Card>
          <CardHeader>
            <CardTitle>Spacing & Line Height</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Line Heights</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Tight:</strong> 1.25 (leading-tight)
                  </p>
                  <p>
                    <strong>Normal:</strong> 1.5 (leading-normal)
                  </p>
                  <p>
                    <strong>Relaxed:</strong> 1.625 (leading-relaxed)
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Letter Spacing</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Tight:</strong> -0.025em (tracking-tight)
                  </p>
                  <p>
                    <strong>Normal:</strong> 0em (tracking-normal)
                  </p>
                  <p>
                    <strong>Wide:</strong> 0.025em (tracking-wide)
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Text Spacing</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Paragraph:</strong> mb-4 (16px)
                  </p>
                  <p>
                    <strong>Section:</strong> mb-6 (24px)
                  </p>
                  <p>
                    <strong>Large Gap:</strong> mb-8 (32px)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
