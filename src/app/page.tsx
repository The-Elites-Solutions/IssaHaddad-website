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

export default function HomePage() {
  const heroTextRef = useRef<HTMLDivElement>(null)
  const heroSubtextRef = useRef<HTMLDivElement>(null)
  const heroButtonsRef = useRef<HTMLDivElement>(null)
  const collectionsGridRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

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

    // Collections grid animation
    if (collectionsGridRef.current) {
      gsap.timeline({
        scrollTrigger: {
          trigger: collectionsGridRef.current,
          start: 'top 80%',
          onEnter: () => {
            GSAPUtils.fadeInUp('.collection-card', { stagger: 0.2 })
          }
        }
      })
    }

    // Features section animation
    if (featuresRef.current) {
      gsap.timeline({
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
          onEnter: () => {
            GSAPUtils.fadeInLeft('.feature-item', { stagger: 0.15 })
          }
        }
      })
    }

    // Parallax effects
    gsap.utils.toArray('.parallax-slow').forEach((element: any) => {
      gsap.to(element, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })
    })

    // Hero content scroll parallax
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
      <div className="relative overflow-hidden">
        {/* Mountain Hero Section */}
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
            <div className="opacity-0 collection-indicators">
              <div className="flex justify-center space-x-8 text-center">
                <Link href="/watches" className="group cursor-pointer">
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
                </Link>

                <Link href="/gold" className="group cursor-pointer">
                  <div className="w-16 h-16 mx-auto mb-3 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </div>
                  <p className="text-sm font-accent text-white/80 group-hover:text-white transition-colors">
                    Gold Jewelry
                  </p>
                </Link>

                <Link href="/diamond" className="group cursor-pointer">
                  <div className="w-16 h-16 mx-auto mb-3 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M6 3h12l4 6-10 13L2 9l4-6z"></path>
                      <path d="M11 3L8 9l4 13 4-13-3-6"></path>
                    </svg>
                  </div>
                  <p className="text-sm font-accent text-white/80 group-hover:text-white transition-colors">
                    Diamonds
                  </p>
                </Link>
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

        {/* Collections Grid Section */}
        <section
            ref={collectionsGridRef}
            className="py-20 lg:py-32 bg-gradient-to-b from-pearl to-white relative"
        >
          <div className="luxury-container">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-6xl font-bold text-charcoal-900 mb-6">
                Signature <span className="text-gradient-rose">Collections</span>
              </h2>
              <p className="font-body text-xl text-charcoal-700 max-w-3xl mx-auto">
                Each collection represents decades of expertise, featuring handpicked pieces
                that define modern luxury and timeless sophistication.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {/* Timepieces Collection */}
              <div className="collection-card opacity-0 group">
                <Link href="/watches">
                  <div className="luxury-card h-full text-center group-hover:shadow-gold-glow transition-all duration-500">
                    <div className="w-20 h-20 bg-gradient-to-br from-charcoal-600 to-charcoal-800 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M12 1v6m0 6v6"></path>
                        <path d="m21 12-6-6-6 6-6-6"></path>
                      </svg>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-charcoal-900 mb-4">
                      Swiss Timepieces
                    </h3>
                    <p className="font-body text-charcoal-700 leading-relaxed mb-6">
                      Precision-crafted luxury watches that combine traditional
                      Swiss watchmaking with contemporary design excellence.
                    </p>
                    <div className="text-rose-gold-500 font-accent font-medium group-hover:text-rose-gold-600 transition-colors">
                      Explore Watches →
                    </div>
                  </div>
                </Link>
              </div>

              {/* Gold Collection */}
              <div className="collection-card opacity-0 group">
                <Link href="/gold">
                  <div className="luxury-card h-full text-center group-hover:shadow-gold-glow transition-all duration-500">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-charcoal-900 mb-4">
                      Pure Gold
                    </h3>
                    <p className="font-body text-charcoal-700 leading-relaxed mb-6">
                      Exquisite jewelry crafted from the finest 14k, 18k, and 24k gold,
                      representing generations of goldsmithing mastery.
                    </p>
                    <div className="text-rose-gold-500 font-accent font-medium group-hover:text-rose-gold-600 transition-colors">
                      Explore Gold →
                    </div>
                  </div>
                </Link>
              </div>

              {/* Diamond Collection */}
              <div className="collection-card opacity-0 group">
                <Link href="/diamond">
                  <div className="luxury-card h-full text-center group-hover:shadow-gold-glow transition-all duration-500">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M6 3h12l4 6-10 13L2 9l4-6z"></path>
                        <path d="M11 3L8 9l4 13 4-13-3-6"></path>
                      </svg>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-charcoal-900 mb-4">
                      Certified Diamonds
                    </h3>
                    <p className="font-body text-charcoal-700 leading-relaxed mb-6">
                      Exceptional diamonds selected for their brilliance, fire, and
                      scintillation, each certified for authenticity and quality.
                    </p>
                    <div className="text-rose-gold-500 font-accent font-medium group-hover:text-rose-gold-600 transition-colors">
                      Explore Diamonds →
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
            ref={featuresRef}
            className="py-20 lg:py-32 bg-gradient-to-b from-white to-champagne relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/images/patterns/luxury-pattern.svg')] opacity-5" />

          <div className="luxury-container relative">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-6xl font-bold text-charcoal-900 mb-6">
                Why Choose <span className="text-gradient-rose">Luxuria</span>
              </h2>
              <p className="font-body text-xl text-charcoal-700 max-w-3xl mx-auto">
                Three generations of excellence in luxury jewelry and timepieces,
                built on trust, authenticity, and uncompromising quality.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="feature-item opacity-0 text-center">
                <div className="w-16 h-16 bg-rose-gold-gradient rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-charcoal-900 mb-3">
                  Authenticated
                </h3>
                <p className="font-body text-charcoal-700">
                  Every piece comes with certification and authenticity guarantee
                </p>
              </div>

              <div className="feature-item opacity-0 text-center">
                <div className="w-16 h-16 bg-rose-gold-gradient rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-charcoal-900 mb-3">
                  Handcrafted
                </h3>
                <p className="font-body text-charcoal-700">
                  Master artisans create each piece with meticulous attention to detail
                </p>
              </div>

              <div className="feature-item opacity-0 text-center">
                <div className="w-16 h-16 bg-rose-gold-gradient rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-charcoal-900 mb-3">
                  Lifetime Warranty
                </h3>
                <p className="font-body text-charcoal-700">
                  Comprehensive protection and maintenance for your investment
                </p>
              </div>

              <div className="feature-item opacity-0 text-center">
                <div className="w-16 h-16 bg-rose-gold-gradient rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-charcoal-900 mb-3">
                  Heritage
                </h3>
                <p className="font-body text-charcoal-700">
                  Three generations of passion for exceptional jewelry and timepieces
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-charcoal-900 to-charcoal-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/patterns/starfield.svg')] opacity-20" />

          <div className="luxury-container relative text-center">
            <h2 className="font-display text-4xl lg:text-6xl font-bold text-white mb-6">
              Begin Your <span className="text-gradient-rose">Luxury Journey</span>
            </h2>
            <p className="font-body text-xl text-white/80 max-w-3xl mx-auto mb-12">
              Discover pieces that will become part of your story, crafted with passion
              and designed to be treasured for generations.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button variant="primary" size="lg">
                <Link href="/collections">
                  Explore All Collections
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-charcoal-900">
                <Link href="/contact">
                  Schedule Consultation
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
  )
}
