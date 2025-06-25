'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroScene from '@/components/3d/HeroScene'
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
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

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

    // Section animations - TODO: Fix type compatibility
    // sectionsRef.current.forEach((section) => {
    //   if (section) {
    //     GSAPUtils.scrollTriggerAnimation(
    //       section,
    //       GSAPUtils.fadeInUp('.section-content > *', { stagger: 0.2 }),
    //       {
    //         trigger: section,
    //         start: 'top 80%',
    //         end: 'bottom 20%',
    //         scrub: false
    //       }
    //     )
    //   }
    // })

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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const addToRefs = (el: HTMLElement | null, index: number) => {
    if (el) {
      sectionsRef.current[index] = el
    }
  }

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <HeroScene />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10" />

        {/* Hero Content */}
        <div className="relative z-20 text-center text-white max-w-6xl mx-auto px-6">
          <div ref={heroTextRef} className="hero-text mb-6">
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-none mb-4">
              <span className="block">Exquisite</span>
              <span className="block text-gradient-rose">Luxury</span>
              <span className="block">Redefined</span>
            </h1>
          </div>

          <div ref={heroSubtextRef} className="opacity-0">
            <p className="font-body text-xl md:text-2xl lg:text-3xl mb-8 max-w-3xl mx-auto leading-relaxed text-white/90">
              Discover our exclusive collection of handcrafted jewelry, premium timepieces, 
              and precious gemstones that define sophistication.
            </p>
          </div>

          <div ref={heroButtonsRef} className="opacity-0 flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="primary" size="xl" className="text-lg px-12">
              Explore Collection
            </Button>
            <Button variant="outline" size="xl" className="text-lg px-12 border-white text-white hover:bg-white hover:text-charcoal-900">
              Watch Our Story
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center text-white/70 animate-bounce">
            <span className="font-accent text-sm mb-2">Scroll to Discover</span>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section 
        ref={(el) => addToRefs(el, 0)}
        className="luxury-section bg-gradient-to-b from-pearl to-white"
      >
        <div className="luxury-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="font-display text-5xl lg:text-6xl font-bold text-charcoal-900">
                  Our <span className="text-gradient-rose">Philosophy</span>
                </h2>
                <div className="w-24 h-1 bg-rose-gold-gradient rounded-full" />
              </div>
              
              <div className="space-y-6 text-lg text-charcoal-700 font-body leading-relaxed">
                <p>
                  At Luxuria, we believe that true luxury lies in the perfect harmony of 
                  <strong className="text-rose-gold-600"> authenticity</strong>, 
                  <strong className="text-rose-gold-600"> craftsmanship</strong>, and 
                  <strong className="text-rose-gold-600"> honesty</strong>.
                </p>
                <p>
                  Every piece in our collection tells a story of meticulous attention to detail, 
                  sourced from the finest materials and crafted by master artisans who understand 
                  that luxury is not just about appearance—it&apos;s about legacy.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-rose-gold-gradient rounded-full" />
                  <span className="font-accent font-medium text-charcoal-800">Authentic Materials</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-rose-gold-gradient rounded-full" />
                  <span className="font-accent font-medium text-charcoal-800">Master Craftsmanship</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-rose-gold-gradient rounded-full" />
                  <span className="font-accent font-medium text-charcoal-800">Honest Practices</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="parallax-slow">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-luxury-xl">
                  <div className="absolute inset-0 bg-rose-gold-gradient opacity-20" />
                  <img 
                    src="/images/craftsmanship.jpg" 
                    alt="Master craftsman at work" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-champagne rounded-full opacity-80 floating" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-rose-gold-200 rounded-full opacity-60 floating" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section 
        ref={(el) => addToRefs(el, 1)}
        className="luxury-section bg-charcoal-gradient text-white"
      >
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl lg:text-6xl font-bold mb-6">
              Featured <span className="text-gradient-rose">Collections</span>
            </h2>
            <p className="font-body text-xl text-white/80 max-w-3xl mx-auto">
              Explore our signature collections, each piece carefully curated to represent 
              the pinnacle of luxury and sophistication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Watches Collection */}
            <Link href="/watches" className="group">
              <div className="luxury-card bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-500">
                <div className="aspect-square mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-rose-gold-400/20 to-champagne/20">
                  <img 
                    src="/images/watches-preview.jpg" 
                    alt="Luxury Watches Collection" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4 text-white">Timepieces</h3>
                <p className="font-body text-white/80 mb-6">
                  Precision meets elegance in our collection of luxury watches from renowned Swiss manufacturers.
                </p>
                <div className="flex items-center text-rose-gold-400 group-hover:text-rose-gold-300 transition-colors">
                  <span className="font-accent font-medium">Explore Watches</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Gold Collection */}
            <Link href="/gold" className="group">
              <div className="luxury-card bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-500">
                <div className="aspect-square mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-luxury-gold/20 to-rose-gold-400/20">
                  <img 
                    src="/images/gold-preview.jpg" 
                    alt="Gold Jewelry Collection" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4 text-white">Gold</h3>
                <p className="font-body text-white/80 mb-6">
                  Exquisite gold jewelry crafted from the finest 14k, 18k, and 24k gold in timeless designs.
                </p>
                <div className="flex items-center text-rose-gold-400 group-hover:text-rose-gold-300 transition-colors">
                  <span className="font-accent font-medium">Explore Gold</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Diamond Collection */}
            <Link href="/diamond" className="group">
              <div className="luxury-card bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-500">
                <div className="aspect-square mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-white/20 to-pearl/20">
                  <img 
                    src="/images/diamond-preview.jpg" 
                    alt="Diamond Jewelry Collection" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4 text-white">Diamonds</h3>
                <p className="font-body text-white/80 mb-6">
                  Brilliant diamonds and precious gemstones, each piece certified and ethically sourced.
                </p>
                <div className="flex items-center text-rose-gold-400 group-hover:text-rose-gold-300 transition-colors">
                  <span className="font-accent font-medium">Explore Diamonds</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Craftsmanship Process */}
      <section 
        ref={(el) => addToRefs(el, 2)}
        className="luxury-section bg-pearl"
      >
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl lg:text-6xl font-bold text-charcoal-900 mb-6">
              The Art of <span className="text-gradient-rose">Creation</span>
            </h2>
            <p className="font-body text-xl text-charcoal-700 max-w-3xl mx-auto">
              Witness the meticulous process behind every masterpiece, where tradition meets innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Design",
                description: "Conceptualizing timeless pieces that blend classical elegance with contemporary appeal."
              },
              {
                step: "02", 
                title: "Sourcing",
                description: "Selecting only the finest materials from trusted suppliers worldwide."
              },
              {
                step: "03",
                title: "Crafting",
                description: "Master artisans bring each design to life with decades of expertise."
              },
              {
                step: "04",
                title: "Perfection",
                description: "Rigorous quality control ensures every piece meets our exacting standards."
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-rose-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="font-display text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-charcoal-900 mb-4">{item.title}</h3>
                <p className="font-body text-charcoal-700 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section 
        ref={(el) => addToRefs(el, 3)}
        className="luxury-section bg-white"
      >
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl lg:text-6xl font-bold text-charcoal-900 mb-6">
              Awards & <span className="text-gradient-rose">Recognition</span>
            </h2>
            <p className="font-body text-xl text-charcoal-700 max-w-3xl mx-auto">
              Our commitment to excellence has been recognized by industry leaders worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {[
              { name: "Luxury Awards 2024", image: "/images/award-1.png" },
              { name: "Jewelry Excellence", image: "/images/award-2.png" },
              { name: "Craft Masters Guild", image: "/images/award-3.png" },
              { name: "Innovation Prize", image: "/images/award-4.png" }
            ].map((award, index) => (
              <div key={index} className="text-center group">
                <div className="w-24 h-24 mx-auto mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">
                  <img src={award.image} alt={award.name} className="w-full h-full object-contain" />
                </div>
                <span className="font-accent text-sm text-charcoal-600">{award.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section 
        ref={(el) => addToRefs(el, 4)}
        className="luxury-section bg-rose-gold-gradient text-white"
      >
        <div className="luxury-container text-center">
          <h2 className="font-display text-5xl lg:text-6xl font-bold mb-6">
            Begin Your Journey
          </h2>
          <p className="font-body text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Experience luxury redefined. Connect with our specialists to discover 
            the perfect piece for your collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="secondary" size="xl" className="text-lg px-12 bg-white text-charcoal-900 hover:bg-pearl">
              Schedule Consultation
            </Button>
            <Button variant="outline" size="xl" className="text-lg px-12 border-white text-white hover:bg-white hover:text-charcoal-900">
              Contact via WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}