"use client"

import * as React from "react"

type DeviceFrameProps = {
  src?: string
  width?: number
  height?: number
  className?: string
}

export default function DeviceFrame({
  src = "/mvp/index.html",
  width = 390,
  height = 844,
  className = "",
}: DeviceFrameProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [scale, setScale] = React.useState(1)

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const recompute = () => {
      const available = el.clientWidth
      const bezel = 48 // padding bezel around the device
      const needed = width + bezel
      setScale(Math.min(1, available / needed))
    }
    recompute()
    const ro = new ResizeObserver(recompute)
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])

  return (
    <div ref={containerRef} className={["w-full", className].filter(Boolean).join(" ")}>
      <div
        className="relative mx-auto rounded-[48px] bg-neutral-900 shadow-[0_20px_60px_rgba(0,0,0,.25),0_10px_30px_rgba(0,0,0,.15)]"
        style={{
          width: width + 48,
          height: height + 96,
          transform: `scale(${scale})`,
          transformOrigin: "top center",
        }}
        aria-label="Smartphone mockup"
      >
        {/* Side buttons (decorative) */}
        <div className="absolute -left-1 top-[120px] h-20 w-1.5 rounded bg-neutral-800" aria-hidden="true" />
        <div className="absolute -right-1 top-[180px] h-10 w-1.5 rounded bg-neutral-800" aria-hidden="true" />
        <div className="absolute -right-1 top-[210px] h-10 w-1.5 rounded bg-neutral-800" aria-hidden="true" />

        {/* Notch */}
        <div
          className="absolute left-1/2 top-4 h-6 w-32 -translate-x-1/2 rounded-full bg-black/70"
          aria-hidden="true"
        />

        {/* Screen */}
        <div className="absolute inset-x-6 top-12 bottom-12 overflow-hidden rounded-[36px] bg-black">
          <iframe title="Ecomarket MVP" src={src} className="h-full w-full border-0 bg-white" />
        </div>

        {/* Home indicator */}
        <div className="absolute left-1/2 bottom-6 h-1.5 w-28 -translate-x-1/2 rounded-full bg-neutral-700" />
      </div>
    </div>
  )
}
