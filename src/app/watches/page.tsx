'use client'

import React, { useEffect, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ConveyorBelt from '@/components/3d/ConveyorBelt'
import ProductDetailPanel from '@/components/ui/ProductDetailPanel'
import { GSAPUtils } from '@/lib/gsap'
import { DeviceUtils } from '@/lib/utils'
import { useAppStore } from '@/lib/store/app-store'
import {watchesData} from '@/lib/data/watches'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}


// Loading component
// const LoadingFallback: React.FC = () => (
//   <div className="absolute inset-0 flex items-center justify-center bg-pearl">
//     <div className="text-center space-y-4">
//       <div className="w-16 h-16 border-4 border-rose-gold-200 border-t-rose-gold-500 rounded-full animate-spin mx-auto" />
//       <p className="font-accent text-charcoal-600">Loading Timepieces...</p>
//     </div>
//   </div>
// )

// Main Watches Page Component
export default function WatchesPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const conveyorSectionRef = useRef<HTMLDivElement>(null)
  const setActiveCategory = useAppStore((state) => state.setActiveCategory)

  useEffect(() => {
    // Set active category
    setActiveCategory('watch')

    // Page entrance animation
    if (heroRef.current) {
      GSAPUtils.fadeInUp('.hero-content > *', {
        stagger: 0.2,
        delay: 0.5
      })
    }

    // Cleanup on unmount
    return () => {
      setActiveCategory(null)
    }
  }, [setActiveCategory])

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-b from-pearl to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 luxury-container">
        <div ref={heroRef} className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="font-display text-6xl lg:text-8xl font-bold text-charcoal-900">
              Luxury <span className="text-gradient-rose">Timepieces</span>
            </h1>
            <div className="w-32 h-1 bg-rose-gold-gradient rounded-full mx-auto" />
          </div>

          <p className="font-body text-xl lg:text-2xl text-charcoal-700 max-w-4xl mx-auto leading-relaxed">
            Discover our exquisite collection of Swiss-made luxury watches, where precision meets artistry.
            Each timepiece represents decades of horological mastery and timeless elegance.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-accent">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-rose-gold-gradient rounded-full" />
              <span>Swiss Made Movement</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-rose-gold-gradient rounded-full" />
              <span>Premium Materials</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-rose-gold-gradient rounded-full" />
              <span>Lifetime Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* Conveyor Belt Section */}
      <section
        ref={conveyorSectionRef}
        className="conveyor-section relative min-h-screen"
      >
        {/* 3D Scene */}
        <div className="absolute inset-0">
          <Canvas
            shadows
            camera={{ position: [0, 8, 15], fov: 50 }}
            gl={{
              antialias: !DeviceUtils.isMobile(),
              alpha: true,
              powerPreference: 'high-performance'
            }}
            dpr={DeviceUtils.getDevicePixelRatio()}
          >
            <Suspense fallback={null}>
              <ConveyorBelt
                products={watchesData}
                category="watch"
                config={{
                  beltLength: watchesData.length * 10,
                  beltWidth: 14,
                  caseSpacing: 10
                }}
              />

              <Environment preset="studio" />

              <OrbitControls
                enablePan={false}
                enableZoom={DeviceUtils.isDesktop()}
                enableRotate={DeviceUtils.isDesktop()}
                autoRotate={false}
                maxPolarAngle={Math.PI / 2.2}
                minPolarAngle={Math.PI / 4}
                maxAzimuthAngle={Math.PI / 6}
                minAzimuthAngle={-Math.PI / 6}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Product Information Panel */}
        <div className="absolute top-8 right-8 z-10 hidden lg:block">
          <ProductDetailPanel position="right" />
        </div>

        {/* Mobile Product Panel */}
        <div className="absolute bottom-0 left-0 right-0 z-10 lg:hidden">
          <ProductDetailPanel position="bottom" compact />
        </div>

        {/* Scroll Instructions */}
        <div className="absolute bottom-8 left-8 z-10 text-white bg-black/50 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-rose-gold-gradient rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <div>
              <p className="font-accent font-medium text-sm">Scroll to Explore</p>
              <p className="font-body text-xs opacity-80">Navigate through our timepiece collection</p>
            </div>
          </div>
        </div>

        {/* Collection Stats */}
        <div className="absolute top-8 left-8 z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 space-y-2">
            <h3 className="font-accent font-semibold text-charcoal-900">Collection Overview</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-body text-charcoal-600">Total Pieces</span>
                <p className="font-accent font-bold text-rose-gold-600">{watchesData.length}</p>
              </div>
              <div>
                <span className="font-body text-charcoal-600">Featured</span>
                <p className="font-accent font-bold text-rose-gold-600">
                  {watchesData.filter(w => w.featured).length}
                </p>
              </div>
              <div>
                <span className="font-body text-charcoal-600">New Arrivals</span>
                <p className="font-accent font-bold text-rose-gold-600">
                  {watchesData.filter(w => w.newArrival).length}
                </p>
              </div>
              <div>
                <span className="font-body text-charcoal-600">Best Sellers</span>
                <p className="font-accent font-bold text-rose-gold-600">
                  {watchesData.filter(w => w.bestSeller).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="luxury-section bg-charcoal-gradient text-white">
        <div className="luxury-container text-center space-y-12">
          <div className="space-y-6">
            <h2 className="font-display text-5xl lg:text-6xl font-bold">
              Swiss <span className="text-gradient-rose">Heritage</span>
            </h2>
            <p className="font-body text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Our timepieces embody centuries of Swiss watchmaking tradition, combining time-honored techniques
              with contemporary innovation to create watches that transcend generations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Master Craftsmen",
                description: "Each watch is assembled by certified master watchmakers with decades of experience in precision horology.",
                icon: "👨‍🔬"
              },
              {
                title: "Swiss Movement",
                description: "Exclusively featuring movements from prestigious Swiss manufactures, ensuring uncompromising accuracy and reliability.",
                icon: "⚙️"
              },
              {
                title: "Lifetime Legacy",
                description: "Built to last generations with comprehensive service support and restoration programs for vintage pieces.",
                icon: "♾️"
              }
            ].map((item, index) => (
              <div key={index} className="space-y-4">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-display text-2xl font-bold">{item.title}</h3>
                <p className="font-body text-white/80 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
