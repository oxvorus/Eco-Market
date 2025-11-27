"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [shockwaves, setShockwaves] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleScreenTap = (e: React.MouseEvent<HTMLDivElement>) => {
    // Trigger pulse animation
    setIsAnimating(true)

    // Create shockwave at click position
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newShockwave = {
      id: Date.now(),
      x,
      y,
    }

    setShockwaves((prev) => [...prev, newShockwave])

    // Remove animation class after animation completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 600)

    // Remove shockwave after animation completes
    setTimeout(() => {
      setShockwaves((prev) => prev.filter((wave) => wave.id !== newShockwave.id))
    }, 1000)
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 relative overflow-hidden cursor-pointer select-none"
      onClick={handleScreenTap}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-400 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-blue-400 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-emerald-400 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-1/3 w-18 h-18 bg-green-500 rounded-full blur-xl"></div>
      </div>

      {/* Shockwave Effects */}
      {shockwaves.map((wave) => (
        <div
          key={wave.id}
          className="absolute pointer-events-none"
          style={{
            left: wave.x,
            top: wave.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-4 h-4 border-2 border-green-400 rounded-full animate-ping opacity-75"></div>
          <div
            className="absolute inset-0 w-4 h-4 border-2 border-emerald-400 rounded-full animate-ping opacity-50"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="absolute inset-0 w-4 h-4 border-2 border-blue-400 rounded-full animate-ping opacity-25"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          {/* Logo Container with Pulse Animation */}
          <div className={`relative ${isAnimating ? "animate-pulse-custom" : ""}`}>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-green-200/50">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-3xl blur-xl"></div>

              {/* Logo */}
              <div className="relative z-10 flex flex-col items-center space-y-4">
                <div className={`transition-transform duration-300 ${isAnimating ? "scale-110" : "scale-100"}`}>
                  <Image
                    src="/ecomarket-logo.png"
                    alt="ecomarket Logo"
                    width={120}
                    height={120}
                    className="rounded-2xl shadow-lg"
                  />
                </div>

                <div className="space-y-2">
                  <h1 className="text-5xl font-bold text-green-800 tracking-tight">ecomarket</h1>
                  <div className="inline-flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full">
                    <Sparkles className="h-4 w-4 text-green-600" />
                    <span className="text-green-700 font-medium text-lg">Don't Throw It, ReMarket It!</span>
                    <Sparkles className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Marketplace Daur Ulang Berbasis Komunitas</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Bergabunglah dengan revolusi zero waste! Temukan produk berkelanjutan, jual barang bekas, dan belajar gaya
              hidup ramah lingkungan bersama komunitas yang peduli masa depan bumi.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-green-200/50">
              <div className="text-3xl mb-3">♻️</div>
              <h3 className="font-semibold text-gray-800 mb-2">Zero Waste</h3>
              <p className="text-sm text-gray-600">Prinsip 5R: Refuse, Reduce, Reuse, Recycle, Rot</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-green-200/50">
              <div className="text-3xl mb-3">🌱</div>
              <h3 className="font-semibold text-gray-800 mb-2">Eco-Friendly</h3>
              <p className="text-sm text-gray-600">Produk ramah lingkungan dengan eco score rating</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-green-200/50">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="font-semibold text-gray-800 mb-2">Komunitas</h3>
              <p className="text-sm text-gray-600">Terhubung dengan bank sampah dan eco warriors</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold mb-2">Siap Memulai Perjalanan Eco-Friendly?</h3>
              <p className="text-green-100 mb-4">
                Ketuk layar di mana saja untuk merasakan energi positif, lalu mulai jelajahi marketplace yang mengubah
                sampah menjadi berkah!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/user/home">
                  <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 font-semibold px-8">
                    Jelajahi Marketplace
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 font-semibold px-8 bg-transparent"
                  >
                    Masuk / Daftar
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-green-700">1,247+</div>
                <div className="text-sm text-gray-600">Eco Warriors</div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-700">2,847kg</div>
                <div className="text-sm text-gray-600">Sampah Terkumpul</div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-emerald-700">1,523kg</div>
                <div className="text-sm text-gray-600">CO2 Tersimpan</div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-amber-700">78.5%</div>
                <div className="text-sm text-gray-600">Tingkat Daur Ulang</div>
              </div>
            </div>
          </div>

          {/* Tap Instruction */}
          <div className="text-center">
            <p className="text-sm text-gray-500 animate-bounce">💡 Ketuk layar di mana saja untuk efek interaktif!</p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-8 h-8 bg-green-400 rounded-full opacity-60"></div>
      </div>
      <div className="absolute top-40 right-20 animate-float-delayed">
        <div className="w-6 h-6 bg-blue-400 rounded-full opacity-60"></div>
      </div>
      <div className="absolute bottom-40 left-1/4 animate-float">
        <div className="w-10 h-10 bg-emerald-400 rounded-full opacity-60"></div>
      </div>

      <style jsx>{`
        @keyframes pulse-custom {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 20px rgba(34, 197, 94, 0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        
        .animate-pulse-custom {
          animation: pulse-custom 0.6s ease-in-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1.5s;
        }
      `}</style>
    </div>
  )
}
