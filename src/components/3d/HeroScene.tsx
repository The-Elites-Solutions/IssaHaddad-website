'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MountainHeroScene from '@/components/3d/MountainHeroScene'
import Button from '@/components/ui/Button'
import { GSAPUtils, LuxuryAnimations } from '@/lib/gsap'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const HeroSection: React.FC = () => {
  const heroTextRef = useRef<HTMLDivElement>(null)
  const heroSubtextRef = useRef<HTMLDivElement>(null)
  const heroButtonsRef = useRef<HTMLDivElement>(null)
  const collectionIndicatorsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hero text animations
    if (heroTextRef.current) {
      LuxuryAnimations.luxuryTextReveal(heroTextRef.current)
    }

    if (heroSubtextRef.current) {
      GSAPUtils.fadeInUp(heroSubtextRef.current, { delay: 0.8 })
    }

    if (heroButtonsRef.current) {
      GSAPUtils.fadeInUp(heroButtonsRef.current, { delay: 1.2 })
    }

    if (collectionIndicatorsRef.current) {
      GSAPUtils.fadeInUp(collectionIndicatorsRef.current, { delay: 1.6 })
    }

    // Parallax effects for text content
    gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress

          // Move text content with parallax effect
          if (heroTextRef.current) {
            heroTextRef.current.style.transform = `translateY(${progress * 50}px)`
            heroTextRef.current.style.opacity = `${1 - progress * 0.8}`
          }
          if (heroSubtextRef.current) {
            heroSubtextRef.current.style.transform = `translateY(${progress * 30}px)`
            heroSubtextRef.current.style.opacity = `${1 - progress * 0.6}`
          }
          if (heroButtonsRef.current) {
            heroButtonsRef.current.style.transform = `translateY(${progress * 20}px)`
            heroButtonsRef.current.style.opacity = `${1 - progress * 0.4}`
          }
        }
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
      <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden">
        {/* Mountain 3D Background */}
        <div className="absolute inset-0 z-0">
          <MountainHeroScene />
        </div>

        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-10" />

        {/* Aurora effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-cyan-500/10 z-10 animate-pulse" />

        {/* Hero Content */}
        <div className="relative z-20 text-center text-white max-w-6xl mx-auto px-6">
          <div ref={heroTextRef} className="hero-text mb-6">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none mb-4">
              <span className="block mb-2">New</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-400 mb-2">
              Collections
            </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Summit
            </span>
            </h1>
          </div>

          <div ref={heroSubtextRef} className="opacity-0 mb-8">
            <p className="font-body text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed text-white/90">
              Discover our latest arrivals positioned at the peaks of luxury.
              Three exceptional collections showcasing the pinnacle of craftsmanship,
              beauty, and timeless elegance.
            </p>
          </div>

          <div ref={heroButtonsRef} className="opacity-0 mb-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                  variant="primary"
                  size="lg"
                  className="bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 text-white shadow-xl"
              >
                <Link href="/collections" className="flex items-center">
                  Explore Collections
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </Button>

              <Button
                  variant="outline"
                  size="lg"
                  className="border-white/40 text-white hover:bg-white/10 backdrop-blur-md"
              >
                <Link href="/about">
                  Our Story
                </Link>
              </Button>
            </div>
          </div>

          {/* Collection Indicators */}
          <div ref={collectionIndicatorsRef} className="opacity-0">
            <div className="flex justify-center space-x-8 text-center">
              <div className="group cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-3 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M12 1v6m0 6v6"></path>
                    <path d="m21 12-6-6-6 6-6-6"></path>
                  </svg>
                </div>
                <p className="text-sm font-accent text-white/80 group-hover:text-white transition-colors">
                  Timepieces
                </p>
              </div>

              <div className="group cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-3 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <p className="text-sm font-accent text-white/80 group-hover:text-white transition-colors">
                  Gold Jewelry
                </p>
              </div>

              <div className="group cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-3 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M6 3h12l4 6-10 13L2 9l4-6z"></path>
                    <path d="M11 3L8 9l4 13 4-13-3-6"></path>
                  </svg>
                </div>
                <p className="text-sm font-accent text-white/80 group-hover:text-white transition-colors">
                  Diamonds
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center animate-bounce">
            <p className="text-white/60 text-sm font-accent mb-2">Scroll to explore</p>
            <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* Collection labels positioned over mountain peaks */}
        <div className="absolute inset-0 z-15 pointer-events-none">
          {/* Left peak label - Timepieces */}
          <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-black/40 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20">
              <p className="text-white font-accent text-sm text-center">Diamond Elegance</p>
              <p className="text-white/70 text-xs text-center">Swiss Timepiece</p>
            </div>
          </div>

          {/* Center peak label - Gold */}
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-black/40 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20">
              <p className="text-white font-accent text-sm text-center">Eternal Rose</p>
              <p className="text-white/70 text-xs text-center">18k Rose Gold</p>
            </div>
          </div>

          {/* Right peak label - Diamonds */}
          <div className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2">
            <div className="bg-black/40 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20">
              <p className="text-white font-accent text-sm text-center">Radiant Solitaire</p>
              <p className="text-white/70 text-xs text-center">2.5ct Diamond</p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default HeroSection
