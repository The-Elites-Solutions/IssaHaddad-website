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

// Sample gold jewelry data
const goldData: JewelryProduct[] = [
  {
    id: 'gold-001',
    name: 'Eternal Rose Ring',
    category: 'gold',
    subcategory: 'rings',
    brand: 'Luxuria Classics',
    description: 'A stunning solitaire ring crafted from 18k rose gold, featuring intricate floral engravings that symbolize eternal love and commitment.',
    specifications: {
      material: '18k Rose Gold',
      weight: '12g',
      dimensions: 'Ring size 6 (adjustable)',
      warranty: '3 years craftsmanship warranty'
    },
    model3D: {
      path: '/models/gold-rose-ring.glb',
      scale: [2, 2, 2],
      position: [0, 0, 0],
      rotation: [0, 0, 0]
    },
    images: [
      {
        url: '/images/gold/eternal-rose-ring.jpg',
        alt: 'Eternal Rose Ring',
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
    certifications: ['18k Gold Certified', 'Handcrafted'],
    tags: ['engagement', 'rose-gold', 'solitaire', 'handcrafted'],
    whatsappInquiry: '+1234567890'
  },
  {
    id: 'gold-002',
    name: 'Byzantine Chain Necklace',
    category: 'gold',
    subcategory: 'necklaces',
    brand: 'Luxuria Heritage',
    description: 'An exquisite 24k gold chain featuring the ancient Byzantine weave pattern, representing luxury and sophistication in its purest form.',
    specifications: {
      material: '24k Pure Gold',
      weight: '85g',
      dimensions: '60cm length, 8mm width',
      warranty: 'Lifetime authenticity guarantee'
    },
    model3D: {
      path: '/models/gold-byzantine-chain.glb',
      scale: [1.5, 1.5, 1.5],
      position: [0, 0, 0],
      rotation: [0, 0, 0]
    },
    images: [
      {
        url: '/images/gold/byzantine-chain.jpg',
        alt: 'Byzantine Chain Necklace',
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
    newArrival: true,
    bestSeller: false,
    certifications: ['24k Gold Certified', 'Artisan Made'],
    tags: ['necklace', '24k-gold', 'byzantine', 'luxury'],
    whatsappInquiry: '+1234567890'
  },
  {
    id: 'gold-003',
    name: 'Royal Cufflinks Set',
    category: 'gold',
    subcategory: 'accessories',
    brand: 'Luxuria Gentleman',
    description: 'Sophisticated cufflinks crafted from 14k yellow gold with subtle geometric patterns, perfect for the distinguished gentleman.',
    specifications: {
      material: '14k Yellow Gold',
      weight: '18g (pair)',
      dimensions: '15mm diameter',
      warranty: '2 years craftsmanship warranty'
    },
    model3D: {
      path: '/models/gold-cufflinks.glb',
      scale: [3, 3, 3],
      position: [0, 0, 0],
      rotation: [0, 0, 0]
    },
    images: [
      {
        url: '/images/gold/royal-cufflinks.jpg',
        alt: 'Royal Cufflinks Set',
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
    featured: false,
    newArrival: false,
    bestSeller: true,
    certifications: ['14k Gold Certified'],
    tags: ['cufflinks', 'yellow-gold', 'formal', 'gentleman'],
    whatsappInquiry: '+1234567890'
  },
  {
    id: 'gold-004',
    name: 'Infinity Bracelet',
    category: 'gold',
    subcategory: 'bracelets',
    brand: 'Luxuria Modern',
    description: 'A contemporary bracelet featuring interlocking infinity symbols in 18k white gold, representing endless possibilities and modern elegance.',
    specifications: {
      material: '18k White Gold',
      weight: '35g',
      dimensions: '19cm length, adjustable',
      warranty: '3 years craftsmanship warranty'
    },
    model3D: {
      path: '/models/gold-infinity-bracelet.glb',
      scale: [1.8, 1.8, 1.8],
      position: [0, 0, 0],
      rotation: [0, 0, 0]
    },
    images: [
      {
        url: '/images/gold/infinity-bracelet.jpg',
        alt: 'Infinity Bracelet',
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
    featured: false,
    newArrival: true,
    bestSeller: false,
    certifications: ['18k Gold Certified', 'Modern Design Award'],
    tags: ['bracelet', 'white-gold', 'infinity', 'contemporary'],
    whatsappInquiry: '+1234567890'
  },
  {
    id: 'gold-005',
    name: 'Vintage Locket Pendant',
    category: 'gold',
    subcategory: 'pendants',
    brand: 'Luxuria Vintage',
    description: 'A timeless heart-shaped locket in 18k yellow gold with intricate Art Deco engravings, perfect for treasured memories.',
    specifications: {
      material: '18k Yellow Gold',
      weight: '25g',
      dimensions: '3cm height, 2.5cm width',
      warranty: '5 years heritage warranty'
    },
    model3D: {
      path: '/models/gold-vintage-locket.glb',
      scale: [2.5, 2.5, 2.5],
      position: [0, 0, 0],
      rotation: [0, 0, 0]
    },
    images: [
      {
        url: '/images/gold/vintage-locket.jpg',
        alt: 'Vintage Locket Pendant',
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
    bestSeller: false,
    certifications: ['18k Gold Certified', 'Heritage Collection'],
    tags: ['locket', 'vintage', 'yellow-gold', 'art-deco'],
    whatsappInquiry: '+1234567890'
  }
]

// Loading component
// const LoadingFallback: React.FC = () => (
//   <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-champagne to-pearl">
//     <div className="text-center space-y-4">
//       <div className="w-16 h-16 border-4 border-luxury-gold/30 border-t-luxury-gold rounded-full animate-spin mx-auto" />
//       <p className="font-accent text-charcoal-600">Loading Gold Collection...</p>
//     </div>
//   </div>
// )

export default function GoldPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const conveyorSectionRef = useRef<HTMLDivElement>(null)
  const setActiveCategory = useAppStore((state) => state.setActiveCategory)

  useEffect(() => {
    // Set active category
    setActiveCategory('gold')

    // Page entrance animation
    if (heroRef.current) {
      GSAPUtils.fadeInUp('.hero-content > *', {
        stagger: 0.2,
        delay: 0.5
      })
    }

    return () => {
      setActiveCategory(null)
    }
  }, [setActiveCategory])

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-b from-champagne via-pearl to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 luxury-container">
        <div ref={heroRef} className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="font-display text-6xl lg:text-8xl font-bold text-charcoal-900">
              Pure <span className="text-gradient" style={{background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #E8B4A0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Gold</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-luxury-gold to-rose-gold-400 rounded-full mx-auto" />
          </div>
          
          <p className="font-body text-xl lg:text-2xl text-charcoal-700 max-w-4xl mx-auto leading-relaxed">
            Experience the timeless allure of gold jewelry, meticulously crafted from the finest 14k, 18k, and 24k gold. 
            Each piece represents generations of goldsmithing mastery and enduring beauty.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-accent">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-luxury-gold to-rose-gold-400 rounded-full" />
              <span>Ethically Sourced Gold</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-luxury-gold to-rose-gold-400 rounded-full" />
              <span>Master Craftsmanship</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-luxury-gold to-rose-gold-400 rounded-full" />
              <span>Lifetime Authenticity</span>
            </div>
          </div>
        </div>
      </section>

      {/* Conveyor Belt Section */}
      <section 
        ref={conveyorSectionRef}
        className="conveyor-section relative min-h-screen"
      >
        {/* 3D Scene with warm lighting for gold */}
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
                products={goldData} 
                category="gold"
                config={{
                  beltLength: goldData.length * 10,
                  beltWidth: 14,
                  caseSpacing: 10
                }}
              />
              
              {/* Warm environment for gold */}
              <Environment preset="sunset" />
              
              {/* Additional warm lighting */}
              <ambientLight intensity={0.4} color="#FFE4B5" />
              <directionalLight
                position={[10, 10, 5]}
                intensity={1.2}
                color="#FFE4B5"
                castShadow
              />
              
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
            <div className="w-8 h-8 bg-gradient-to-r from-luxury-gold to-rose-gold-400 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <div>
              <p className="font-accent font-medium text-sm">Scroll to Explore</p>
              <p className="font-body text-xs opacity-80">Navigate through our gold collection</p>
            </div>
          </div>
        </div>

        {/* Collection Stats */}
        <div className="absolute top-8 left-8 z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 space-y-2">
            <h3 className="font-accent font-semibold text-charcoal-900">Gold Collection</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-body text-charcoal-600">Total Pieces</span>
                <p className="font-accent font-bold text-luxury-gold">{goldData.length}</p>
              </div>
              <div>
                <span className="font-body text-charcoal-600">Featured</span>
                <p className="font-accent font-bold text-luxury-gold">
                  {goldData.filter(g => g.featured).length}
                </p>
              </div>
              <div>
                <span className="font-body text-charcoal-600">Karat Types</span>
                <p className="font-accent font-bold text-luxury-gold">14k, 18k, 24k</p>
              </div>
              <div>
                <span className="font-body text-charcoal-600">Gold Types</span>
                <p className="font-accent font-bold text-luxury-gold">3 Varieties</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gold Types Section */}
      <section className="luxury-section bg-gradient-to-r from-luxury-gold/10 to-rose-gold-200/20">
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl lg:text-6xl font-bold text-charcoal-900 mb-6">
              Types of <span className="text-gradient" style={{background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #E8B4A0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Gold</span>
            </h2>
            <p className="font-body text-xl text-charcoal-700 max-w-3xl mx-auto">
              Understanding the different gold varieties in our collection and their unique characteristics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                karat: "24k",
                name: "Pure Gold",
                purity: "99.9%",
                color: "Rich Yellow",
                characteristics: "The purest form of gold, offering maximum value and traditional appeal. Softer and more malleable, perfect for investment pieces.",
                gradient: "from-yellow-400 to-yellow-600",
                uses: ["Investment pieces", "Traditional jewelry", "Ceremonial items"]
              },
              {
                karat: "18k",
                name: "Premium Gold",
                purity: "75%",
                color: "Balanced Yellow",
                characteristics: "The perfect balance of purity and durability. Ideal for everyday luxury wear with excellent color retention.",
                gradient: "from-yellow-300 to-yellow-500",
                uses: ["Engagement rings", "Daily wear", "Premium jewelry"]
              },
              {
                karat: "14k",
                name: "Durable Gold",
                purity: "58.3%",
                color: "Subtle Yellow",
                characteristics: "Excellent durability and scratch resistance. Perfect for active lifestyles while maintaining luxury appeal.",
                gradient: "from-yellow-200 to-yellow-400",
                uses: ["Sports jewelry", "Children's jewelry", "Active wear"]
              }
            ].map((gold, index) => (
              <div key={index} className="luxury-card group hover:shadow-gold-glow transition-all duration-500">
                <div className={`w-16 h-16 bg-gradient-to-br ${gold.gradient} rounded-full mb-6 group-hover:scale-110 transition-transform duration-300`} />
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-display text-3xl font-bold text-charcoal-900">{gold.karat}</h3>
                    <h4 className="font-accent text-xl font-semibold text-luxury-gold">{gold.name}</h4>
                    <p className="font-body text-charcoal-600">{gold.purity} Pure Gold</p>
                  </div>

                  <p className="font-body text-charcoal-700 leading-relaxed">{gold.characteristics}</p>

                  <div className="space-y-2">
                    <h5 className="font-accent font-semibold text-charcoal-800">Best Used For:</h5>
                    <ul className="space-y-1">
                      {gold.uses.map((use, useIndex) => (
                        <li key={useIndex} className="flex items-center gap-2 text-sm font-body text-charcoal-600">
                          <div className="w-1.5 h-1.5 bg-luxury-gold rounded-full" />
                          {use}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Process */}
      <section className="luxury-section bg-white">
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl lg:text-6xl font-bold text-charcoal-900 mb-6">
              The Art of <span className="text-gradient" style={{background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #E8B4A0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Goldsmithing</span>
            </h2>
            <p className="font-body text-xl text-charcoal-700 max-w-3xl mx-auto">
              Witness the ancient craft that transforms raw gold into timeless masterpieces through generations of expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {[
                {
                  step: "Sourcing",
                  title: "Ethical Gold Procurement",
                  description: "We source only conflict-free gold from certified suppliers, ensuring our luxury comes with responsibility."
                },
                {
                  step: "Alloying",
                  title: "Precision Metal Blending",
                  description: "Master craftsmen blend pure gold with carefully selected alloys to achieve the perfect balance of beauty and durability."
                },
                {
                  step: "Shaping",
                  title: "Artisan Handwork",
                  description: "Each piece is shaped by skilled artisans using traditional techniques passed down through generations."
                },
                {
                  step: "Finishing",
                  title: "Luxury Perfection",
                  description: "Meticulous polishing and quality control ensure every piece meets our exacting standards for luxury jewelry."
                }
              ].map((process, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-luxury-gold to-rose-gold-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="font-accent font-bold text-white text-sm">{index + 1}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-bold text-charcoal-900">{process.title}</h3>
                    <p className="font-body text-charcoal-700 leading-relaxed">{process.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-luxury-xl">
                <img 
                  src="/images/goldsmith-workshop.jpg" 
                  alt="Master goldsmith at work" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-luxury-gold/30 to-rose-gold-300/30 rounded-full floating" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-champagne/60 to-luxury-gold/20 rounded-full floating" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Investment Value Section */}
      <section className="luxury-section bg-charcoal-gradient text-white">
        <div className="luxury-container text-center space-y-12">
          <div className="space-y-6">
            <h2 className="font-display text-5xl lg:text-6xl font-bold">
              Gold as <span className="text-gradient" style={{background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #E8B4A0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Investment</span>
            </h2>
            <p className="font-body text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Beyond beauty, gold jewelry represents a tangible store of value that has maintained its worth across millennia. 
              Our pieces combine aesthetic excellence with investment potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                metric: "5000+",
                label: "Years of Value",
                description: "Gold has been a store of value since ancient civilizations"
              },
              {
                metric: "99.9%",
                label: "Purity Available",
                description: "Our 24k pieces offer maximum gold content"
              },
              {
                metric: "100%",
                label: "Ethical Sourcing",
                description: "All gold is conflict-free and responsibly sourced"
              },
              {
                metric: "∞",
                label: "Recyclable",
                description: "Gold can be refined and reused indefinitely"
              }
            ].map((stat, index) => (
              <div key={index} className="space-y-4">
                <div className="text-4xl lg:text-5xl font-display font-bold text-luxury-gold">
                  {stat.metric}
                </div>
                <h3 className="font-accent text-lg font-semibold">{stat.label}</h3>
                <p className="font-body text-white/80 text-sm leading-relaxed">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}