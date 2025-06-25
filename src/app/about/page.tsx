'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '@/components/ui/Button'
import { GSAPUtils, LuxuryAnimations } from '@/lib/gsap'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      const h1Element = heroRef.current.querySelector('h1')
      if (h1Element) {
        LuxuryAnimations.luxuryTextReveal(h1Element)
      }
      GSAPUtils.fadeInUp('.hero-content > *', { stagger: 0.3, delay: 0.5 })
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

    // Timeline animation - TODO: Fix type compatibility  
    // const timelineItems = document.querySelectorAll('.timeline-item')
    // timelineItems.forEach((item) => {
    //   GSAPUtils.scrollTriggerAnimation(
    //     item,
    //     GSAPUtils.fadeInLeft(item, { delay: 0.2 }),
    //     {
    //       trigger: item,
    //       start: 'top 85%',
    //       scrub: false
    //     }
    //   )
    // })

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
    <div ref={pageRef} className="min-h-screen bg-pearl">
      {/* Hero Section */}
      <section className="pt-32 pb-16 luxury-container">
        <div ref={heroRef} className="text-center space-y-8 max-w-5xl mx-auto">
          <h1 className="font-display text-6xl lg:text-8xl font-bold text-charcoal-900">
            Our <span className="text-gradient-rose">Story</span>
          </h1>
          
          <div className="w-32 h-1 bg-rose-gold-gradient rounded-full mx-auto" />
          
          <p className="font-body text-xl lg:text-2xl text-charcoal-700 leading-relaxed">
            Founded on the principles of <strong className="text-rose-gold-600">authenticity</strong>, 
            <strong className="text-rose-gold-600"> luxury</strong>, and 
            <strong className="text-rose-gold-600"> honesty</strong>, Luxuria represents three generations 
            of passion for exceptional jewelry and timepieces.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section 
        ref={(el) => addToRefs(el, 0)}
        className="luxury-section bg-white"
      >
        <div className="luxury-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="font-display text-5xl font-bold text-charcoal-900">
                  Our <span className="text-gradient-rose">Mission</span>
                </h2>
                <div className="w-24 h-1 bg-rose-gold-gradient rounded-full" />
              </div>
              
              <div className="space-y-6 font-body text-lg text-charcoal-700 leading-relaxed">
                <p>
                  At Luxuria, we believe that true luxury transcends mere material possession. 
                  It represents a commitment to excellence, a dedication to craftsmanship, 
                  and an unwavering pursuit of perfection.
                </p>
                <p>
                  Every piece in our collection tells a story—not just of the precious metals 
                  and gemstones from which it&apos;s crafted, but of the master artisans who breathe 
                  life into each design, and the moments of joy it will create for generations to come.
                </p>
                <p>
                  We are not just jewelry makers; we are custodians of dreams, creators of heirlooms, 
                  and guardians of traditions that span centuries.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-luxury-xl">
                <Image 
                  src="/images/about/mission-workshop.jpg" 
                  alt="Master craftsman at work" 
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-rose-gold-200 rounded-full opacity-80 floating" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-champagne rounded-full opacity-60 floating" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section 
        ref={(el) => addToRefs(el, 1)}
        className="luxury-section bg-charcoal-gradient text-white"
      >
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="text-gradient-rose">Journey</span>
            </h2>
            <p className="font-body text-xl text-white/90 max-w-3xl mx-auto">
              Three generations of excellence, innovation, and unwavering commitment to luxury.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-rose-gold-gradient hidden lg:block" />

            <div className="space-y-16">
              {[
                {
                  year: "1954",
                  title: "The Foundation",
                  description: "Giuseppe Luxuria, a master goldsmith from Florence, establishes the first Luxuria atelier with a vision to create timeless pieces that transcend generations.",
                  image: "/images/about/timeline-1954.jpg",
                  achievement: "First luxury boutique opened"
                },
                {
                  year: "1978",
                  title: "Swiss Expansion",
                  description: "Second generation Antonio Luxuria expands operations to Switzerland, establishing partnerships with prestigious Swiss watchmakers and introducing timepieces to our collection.",
                  image: "/images/about/timeline-1978.jpg",
                  achievement: "Swiss partnerships established"
                },
                {
                  year: "1995",
                  title: "Diamond Expertise",
                  description: "Maria Luxuria-Chen revolutionizes our diamond selection process, implementing the highest standards for cut, color, clarity, and carat weight.",
                  image: "/images/about/timeline-1995.jpg",
                  achievement: "GIA partnership formed"
                },
                {
                  year: "2010",
                  title: "Global Recognition",
                  description: "Luxuria receives international acclaim, winning the World Luxury Award for Excellence in Jewelry Design and establishing a global presence.",
                  image: "/images/about/timeline-2010.jpg",
                  achievement: "World Luxury Award winner"
                },
                {
                  year: "2024",
                  title: "Digital Innovation",
                  description: "Third generation Alessandro Luxuria launches our revolutionary digital experience, combining traditional craftsmanship with cutting-edge technology.",
                  image: "/images/about/timeline-2024.jpg",
                  achievement: "Digital transformation complete"
                }
              ].map((milestone, index) => (
                <div key={index} className="timeline-item flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
                  {/* Year Marker */}
                  <div className="flex items-center gap-4 lg:gap-8">
                    <div className="w-16 h-16 bg-rose-gold-gradient rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                      <span className="font-accent font-bold text-white">{milestone.year}</span>
                    </div>
                    <div className="lg:hidden w-full h-1 bg-rose-gold-gradient rounded-full" />
                  </div>

                  {/* Content */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
                    <div className="space-y-4">
                      <h3 className="font-display text-3xl font-bold">{milestone.title}</h3>
                      <p className="font-body text-white/90 leading-relaxed">{milestone.description}</p>
                      <div className="inline-flex items-center gap-2 bg-rose-gold-500/20 text-rose-gold-300 px-4 py-2 rounded-full text-sm font-accent">
                        <div className="w-2 h-2 bg-rose-gold-400 rounded-full" />
                        {milestone.achievement}
                      </div>
                    </div>
                    
                    <div className="aspect-video rounded-xl overflow-hidden shadow-luxury">
                      <Image 
                        src={milestone.image} 
                        alt={milestone.title}
                        width={600}
                        height={338}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section 
        ref={(el) => addToRefs(el, 2)}
        className="luxury-section bg-pearl"
      >
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl lg:text-6xl font-bold text-charcoal-900 mb-6">
              Our <span className="text-gradient-rose">Values</span>
            </h2>
            <p className="font-body text-xl text-charcoal-700 max-w-3xl mx-auto">
              Three core principles guide everything we do, from sourcing materials to crafting the final piece.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                value: "Authenticity",
                icon: "🏆",
                description: "Every piece is genuine, every story is real, every promise is kept. We believe in transparency and truth in all our dealings.",
                features: ["Certified materials", "Verified provenance", "Honest communication", "Transparent pricing"]
              },
              {
                value: "Luxury",
                icon: "💎",
                description: "We define luxury not by price, but by the uncompromising quality, exclusivity, and emotional connection each piece creates.",
                features: ["Premium materials", "Exclusive designs", "Master craftsmanship", "Personalized service"]
              },
              {
                value: "Honesty",
                icon: "🤝",
                description: "Our relationships are built on trust, integrity, and honest expertise. We guide our clients with genuine care and knowledge.",
                features: ["Expert guidance", "Ethical sourcing", "Fair practices", "Lifetime support"]
              }
            ].map((value, index) => (
              <div key={index} className="luxury-card text-center group hover:shadow-gold-glow transition-all duration-500">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                
                <h3 className="font-display text-3xl font-bold text-charcoal-900 mb-4">
                  {value.value}
                </h3>
                
                <p className="font-body text-charcoal-700 leading-relaxed mb-6">
                  {value.description}
                </p>
                
                <div className="space-y-2">
                  {value.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center justify-center gap-2 text-sm font-body text-charcoal-600">
                      <div className="w-1.5 h-1.5 bg-rose-gold-400 rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        ref={(el) => addToRefs(el, 3)}
        className="luxury-section bg-white"
      >
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl lg:text-6xl font-bold text-charcoal-900 mb-6">
              Meet Our <span className="text-gradient-rose">Artisans</span>
            </h2>
            <p className="font-body text-xl text-charcoal-700 max-w-3xl mx-auto">
              The skilled hands and passionate hearts behind every Luxuria masterpiece.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alessandro Luxuria",
                role: "Master Designer & CEO",
                experience: "25 years",
                specialty: "Contemporary luxury design",
                image: "/images/team/alessandro.jpg",
                bio: "Third-generation Luxuria, Alessandro combines traditional Italian craftsmanship with modern innovation."
              },
              {
                name: "Maria Chen-Luxuria",
                role: "Chief Gemologist",
                experience: "30 years",
                specialty: "Diamond evaluation & sourcing",
                image: "/images/team/maria.jpg",
                bio: "GIA-certified gemologist with expertise in rare diamonds and precious stones."
              },
              {
                name: "Henrik Zimmerman",
                role: "Master Watchmaker",
                experience: "35 years",
                specialty: "Swiss mechanical movements",
                image: "/images/team/henrik.jpg",
                bio: "Swiss-trained master craftsman specializing in complications and restoration."
              },
              {
                name: "Sofia Rosetti",
                role: "Head of Design",
                experience: "20 years",
                specialty: "Bridal & engagement jewelry",
                image: "/images/team/sofia.jpg",
                bio: "Award-winning designer known for creating emotionally meaningful pieces."
              },
              {
                name: "James Morrison",
                role: "Ethical Sourcing Director",
                experience: "22 years",
                specialty: "Responsible supply chain",
                image: "/images/team/james.jpg",
                bio: "Ensures all materials meet the highest ethical and environmental standards."
              },
              {
                name: "Elena Petrov",
                role: "Master Goldsmith",
                experience: "28 years",
                specialty: "Hand engraving & finishing",
                image: "/images/team/elena.jpg",
                bio: "European-trained artisan specializing in traditional hand-engraving techniques."
              }
            ].map((member, index) => (
              <div key={index} className="luxury-card group text-center">
                <div className="relative mb-6">
                  <div className="aspect-square rounded-xl overflow-hidden mx-auto w-48">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      width={192}
                      height={192}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-rose-gold-gradient rounded-full flex items-center justify-center">
                    <span className="text-white font-accent font-bold text-sm">{member.experience.split(' ')[0]}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-display text-2xl font-bold text-charcoal-900">{member.name}</h3>
                  <p className="font-accent text-lg font-semibold text-rose-gold-600">{member.role}</p>
                  <p className="font-body text-sm text-charcoal-600 italic">{member.specialty}</p>
                  <p className="font-body text-charcoal-700 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Partnerships */}
      <section 
        ref={(el) => addToRefs(el, 4)}
        className="luxury-section bg-gradient-to-r from-charcoal-900 to-charcoal-800 text-white"
      >
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl lg:text-6xl font-bold mb-6">
              Trusted <span className="text-gradient-rose">Partnerships</span>
            </h2>
            <p className="font-body text-xl text-white/90 max-w-3xl mx-auto">
              Our commitment to excellence is validated by prestigious certifications and partnerships 
              with world-renowned institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Certifications */}
            <div className="space-y-8">
              <h3 className="font-display text-3xl font-bold text-center">Certifications</h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { name: "GIA", desc: "Gemological Institute of America", logo: "/images/certifications/gia.png" },
                  { name: "SSEF", desc: "Swiss Gemmological Institute", logo: "/images/certifications/ssef.png" },
                  { name: "Gübelin", desc: "Gübelin Gem Lab", logo: "/images/certifications/gubelin.png" },
                  { name: "RJC", desc: "Responsible Jewellery Council", logo: "/images/certifications/rjc.png" }
                ].map((cert, index) => (
                  <div key={index} className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm group hover:bg-white/20 transition-all duration-300">
                    <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="font-accent font-bold text-lg text-rose-gold-300">{cert.name}</span>
                    </div>
                    <h4 className="font-accent font-semibold text-white mb-2">{cert.name}</h4>
                    <p className="font-body text-xs text-white/70">{cert.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div className="space-y-8">
              <h3 className="font-display text-3xl font-bold text-center">Awards & Recognition</h3>
              <div className="space-y-4">
                {[
                  { year: "2024", award: "Digital Innovation Excellence", organization: "Luxury Technology Awards" },
                  { year: "2023", award: "Best Luxury Jewelry Brand", organization: "World Luxury Awards" },
                  { year: "2022", award: "Sustainable Luxury Leadership", organization: "Green Luxury Council" },
                  { year: "2021", award: "Craftsmanship Excellence", organization: "European Luxury Guild" },
                  { year: "2020", award: "Heritage Brand of the Year", organization: "Luxury Heritage Foundation" }
                ].map((award, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                    <div className="w-12 h-12 bg-rose-gold-gradient rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-accent font-bold text-white text-sm">{award.year}</span>
                    </div>
                    <div>
                      <h4 className="font-accent font-semibold text-white">{award.award}</h4>
                      <p className="font-body text-sm text-white/70">{award.organization}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section 
        ref={(el) => addToRefs(el, 5)}
        className="luxury-section bg-rose-gold-gradient text-white"
      >
        <div className="luxury-container text-center space-y-8">
          <h2 className="font-display text-5xl lg:text-6xl font-bold">
            Begin Your Journey
          </h2>
          
          <p className="font-body text-xl max-w-3xl mx-auto opacity-90 leading-relaxed">
            Ready to discover your perfect piece? Our master craftsmen and gemologists 
            are waiting to guide you through our exclusive collection and create 
            something truly extraordinary.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Private Consultation",
                description: "One-on-one session with our experts",
                action: "Schedule Now"
              },
              {
                title: "Virtual Viewing",
                description: "Explore our collection from home",
                action: "Start Virtual Tour"
              },
              {
                title: "Custom Design",
                description: "Create your unique masterpiece",
                action: "Begin Design"
              }
            ].map((service, index) => (
              <div key={index} className="text-center">
                <h3 className="font-display text-2xl font-bold mb-3">{service.title}</h3>
                <p className="font-body mb-6 opacity-90">{service.description}</p>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="bg-white text-charcoal-900 hover:bg-pearl"
                >
                  {service.action}
                </Button>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-sm font-accent opacity-90">
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>Florence, Italy • Zurich, Switzerland</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📞</span>
                <span>+39 055 123 4567 • +41 44 987 6543</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✉️</span>
                <span>concierge@luxuria.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
              