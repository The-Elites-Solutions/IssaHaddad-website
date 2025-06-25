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
import type { JewelryProduct } from '@/types'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Sample diamond jewelry data
const diamondData: JewelryProduct[] = [
  {
    id: 'diamond-001',
    name: 'Radiant Solitaire Ring',
    category: 'diamond',
    subcategory: 'engagement-rings',
    brand: 'Luxuria Diamonds',
    description: 'A breathtaking 2.5-carat round brilliant diamond set in platinum, showcasing exceptional fire and brilliance. Certified for maximum sparkle and clarity.',
    specifications: {
      material: 'Platinum 950',
      weight: '8g',
      dimensions: 'Ring size 6 (adjustable)',
      gemstones: [
        {
          type: 'Diamond',
          cut: 'Round Brilliant',
          carat: 2.5,
          clarity: 'VVS1',
          color: 'D',
          certification: 'GIA Certified'
        }
      ],
      warranty: '5 years craftsmanship warranty'
    },
    model3D: {
      path: '/models/diamond-solitaire-ring.glb',
      scale: [2.2, 2.2, 2.2],
      position: [0, 0, 0],
      rotation: [0, 0, 0]
    },
    images: [
      {
        url: '/images/diamonds/radiant-solitaire-ring.jpg',
        alt: 'Radiant Solitaire Ring',
        type: 'main',
        order: 1
      }
    ],
    price: {
      currency: 'USD',
      showPrice: false,
      inquiryOnly: true
    },
    availability: 'in-stock',
    featured: true,
    newArrival: false,
    bestSeller: true,
    certifications: ['GIA Certified', 'Conflict-Free', 'Platinum 950'],
    tags: ['engagement', 'diamond', 'solitaire', 'platinum'],
    whatsappInquiry: '+1234567890'
  },
  {
    id: 'diamond-002',
    name: 'Eternal Diamond Earrings',
    category: 'diamond',
    subcategory: 'earrings',
    brand: 'Luxuria Collections',
    description: 'Exquisite pair of diamond earrings featuring perfectly matched round brilliant diamonds, each weighing 1.2 carats. The timeless design complements any occasion.',
    specifications: {
      material: '18k White Gold',
      weight: '6g (pair)',
      dimensions: '8mm diameter',
      gemstones: [
        {
          type: 'Diamond',
          cut: 'Round Brilliant',
          carat: 1.2,
          clarity: 'VS1',
          color: 'E',
          certification: 'GIA Certified'
        }
      ],
      warranty: '3 years craftsmanship warranty'
    },
    model3D: {
      path: '/models/diamond-earrings.glb',
      scale: [2.5, 2.5, 2.5],
      position: [0, 0, 0],
      rotation: [0, 0, 0]
    },
    images: [
      {
        url: '/images/diamonds/eternal-diamond-earrings.jpg',
        alt: 'Eternal Diamond Earrings',
        type: 'main',
        order: 1
      }
    ],
    price: {
      currency: 'USD',
      showPrice: false,
      inquiryOnly: true
    },
    availability: 'in-stock',
    featured: true,
    newArrival: true,
    bestSeller: false,
    certifications: ['GIA Certified', 'Conflict-Free', '18k Gold'],
    tags: ['earrings', 'diamond', 'white-gold', 'luxury'],
    whatsappInquiry: '+1234567890'
  },
  {
    id: 'diamond-003',
    name: 'Royal Tennis Bracelet',
    category: 'diamond',
    subcategory: 'bracelets',
    brand: 'Luxuria Elite',
    description: 'A magnificent tennis bracelet featuring 45 perfectly matched round brilliant diamonds totaling 15 carats. Each diamond is individually set in platinum for maximum security and brilliance.',
    specifications: {
      material: 'Platinum 950',
      weight: '35g',
      dimensions: '18cm length, adjustable',
      gemstones: [
        {
          type: 'Diamond',
          cut: 'Round Brilliant',
          carat: 15.0,
          clarity: 'VVS2',
          color: 'D',
          certification: 'GIA Certified'
        }
      ],
      warranty: 'Lifetime authenticity guarantee'
    },
    model3D: {
      path: '/models/diamond-tennis-bracelet.glb',
      scale: [1.8, 1.8, 1.8],
      position: [0, 0, 0],
      rotation: [0, 0, 0]
    },
    images: [
      {
        url: '/images/diamonds/royal-tennis-bracelet.jpg',
        alt: 'Royal Tennis Bracelet',
        type: 'main',
        order: 1
      }
    ],
    price: {
      currency: 'USD',
      showPrice: false,
      inquiryOnly: true
    },
    availability: 'made-to-order',
    featured: true,
    newArrival: false,
    bestSeller: true,
    certifications: ['GIA Certified', 'Conflict-Free', 'Platinum 950'],
    tags: ['bracelet', 'diamond', 'tennis', 'platinum', 'luxury'],
    whatsappInquiry: '+1234567890'
  }
]

export default function DiamondPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const conveyorRef = useRef<HTMLDivElement>(null)
  const currentProduct = useAppStore((state) => state.currentProduct)
  const setActiveCategory = useAppStore((state) => state.setActiveCategory)

  // Set active category on mount
  useEffect(() => {
    setActiveCategory('diamond')
    
    return () => {
      setActiveCategory(null)
    }
  }, [setActiveCategory])

  // Hero animations
  useEffect(() => {
    if (!heroRef.current) return undefined

    const ctx = gsap.context(() => {
      GSAPUtils.fadeInUp('.hero-title', { delay: 0.2 })
      GSAPUtils.fadeInUp('.hero-subtitle', { delay: 0.4 })
      GSAPUtils.fadeInUp('.hero-description', { delay: 0.6 })
      GSAPUtils.scaleIn('.hero-cta', { delay: 0.8 })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Conveyor belt scroll animations
  useEffect(() => {
    if (!conveyorRef.current) return undefined

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '.conveyor-section',
        start: 'top 80%',
        onEnter: () => {
          GSAPUtils.fadeInUp('.conveyor-title', { delay: 0.2 })
          GSAPUtils.fadeInLeft('.conveyor-description', { delay: 0.4 })
        }
      })
    }, conveyorRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-blue-100/30" />
        <div className="absolute inset-0 bg-[url('/images/patterns/diamond-pattern.svg')] opacity-5" />
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className="hero-title opacity-0">
            <h1 className="font-display text-6xl lg:text-8xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800">
                Diamond
              </span>
              <br />
              <span className="text-charcoal-900">
                Collection
              </span>
            </h1>
          </div>
          
          <div className="hero-subtitle opacity-0">
            <p className="font-accent text-xl lg:text-2xl text-charcoal-700 mb-8 max-w-3xl mx-auto">
              Discover our exceptional collection of certified diamonds, each stone carefully selected for its exceptional brilliance, fire, and scintillation.
            </p>
          </div>
          
          <div className="hero-description opacity-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full animate-pulse" />
                <span className="font-accent text-charcoal-800 font-medium">GIA Certified</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full animate-pulse" />
                <span className="font-accent text-charcoal-800 font-medium">Conflict-Free</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full animate-pulse" />
                <span className="font-accent text-charcoal-800 font-medium">Exceptional Cut</span>
              </div>
            </div>
          </div>
          
          <div className="hero-cta opacity-0">
            <button 
              onClick={() => {
                conveyorRef.current?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-base bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 text-lg hover:shadow-lg hover:scale-105"
            >
              Explore Collection
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-charcoal-600 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="font-accent text-sm">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-charcoal-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-charcoal-400 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* 3D Conveyor Belt Section */}
      <section ref={conveyorRef} className="conveyor-section py-24 min-h-screen relative">
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h2 className="conveyor-title opacity-0 font-display text-5xl lg:text-6xl font-bold text-charcoal-900 mb-6">
              Interactive Diamond Showcase
            </h2>
            <p className="conveyor-description opacity-0 font-body text-xl text-charcoal-700 max-w-3xl mx-auto">
              Experience our diamonds in revolutionary 3D. Each piece rotates in its own glass case, allowing you to appreciate every facet and the play of light within.
            </p>
          </div>

          {/* 3D Scene */}
          <div className="h-96 lg:h-[600px] relative bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-luxury">
            <Suspense fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="font-accent text-charcoal-600">Loading Diamond Collection...</p>
                </div>
              </div>
            }>
              <Canvas
                camera={{ 
                  position: [0, 5, 10], 
                  fov: DeviceUtils.isMobile() ? 75 : 50 
                }}
                dpr={DeviceUtils.getDevicePixelRatio()}
                gl={{ antialias: true, alpha: true }}
              >
                <OrbitControls 
                  enablePan={false}
                  enableRotate={!DeviceUtils.isMobile()}
                  enableZoom={false}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 4}
                />
                
                <Environment 
                  files="/textures/environment/studio_small_03_4k.hdr"
                  background={false}
                />
                
                <ConveyorBelt 
                  products={diamondData}
                  category="diamond"
                  config={{
                    beltLength: diamondData.length * 8,
                    caseSpacing: 8,
                    speed: 1
                  }}
                />
              </Canvas>
            </Suspense>
          </div>

          {/* Instructions */}
          <div className="mt-8 text-center">
            <p className="font-body text-charcoal-600">
              {DeviceUtils.isMobile() 
                ? "Scroll to move the conveyor belt • Tap glass cases to view details"
                : "Scroll to move the conveyor belt • Click glass cases to view details • Drag to look around"
              }
            </p>
          </div>
        </div>
      </section>

      {/* Diamond Education Section */}
      <section className="py-24 bg-gradient-to-b from-white to-purple-50">
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal-900 mb-6">
              The 4Cs of Diamond Quality
            </h2>
            <p className="font-body text-xl text-charcoal-700 max-w-3xl mx-auto">
              Understanding the four fundamental characteristics that determine a diamond&apos;s quality and value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Cut",
                description: "The quality of angles, proportions, and finish of a diamond. The cut determines how well the diamond reflects light.",
                icon: "💎"
              },
              {
                title: "Color",
                description: "The absence of color in a diamond. The most valuable diamonds are colorless, graded from D to Z.",
                icon: "🌈"
              },
              {
                title: "Clarity",
                description: "The absence of inclusions and blemishes. Clarity is graded from Flawless (FL) to Included (I).",
                icon: "🔍"
              },
              {
                title: "Carat",
                description: "The weight of the diamond. One carat equals 200 milligrams. Larger diamonds are exponentially more rare.",
                icon: "⚖️"
              }
            ].map((item, index) => (
              <div key={index} className="luxury-card group text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="font-accent text-xl font-bold text-charcoal-900 mb-4">
                  {item.title}
                </h3>
                <p className="font-body text-charcoal-700 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-charcoal-900 text-white">
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
              Diamond Excellence by Numbers
            </h2>
            <p className="font-body text-xl text-gray-300 max-w-3xl mx-auto">
              Our commitment to quality is reflected in every diamond we source and certify.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                metric: "100%",
                label: "GIA Certified",
                description: "Every diamond comes with authentic GIA certification"
              },
              {
                metric: "VVS+",
                label: "Clarity Standard",
                description: "We only source diamonds with VVS1 clarity or better"
              },
              {
                metric: "10",
                label: "Hardness Scale",
                description: "The hardest natural substance known to mankind"
              },
              {
                metric: "∞",
                label: "Eternal Beauty",
                description: "Diamonds maintain their brilliance and value forever"
              }
            ].map((stat, index) => (
              <div key={index} className="space-y-4">
                <div className="text-4xl lg:text-5xl font-display font-bold text-purple-400">
                  {stat.metric}
                </div>
                <h3 className="font-accent text-lg font-semibold text-white">{stat.label}</h3>
                <p className="font-body text-gray-300 text-sm leading-relaxed">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Panel */}
      {currentProduct && (
        <ProductDetailPanel />
      )}
    </div>
  )
}