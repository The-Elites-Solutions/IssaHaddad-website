'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { cn, URLUtils } from '@/lib/utils'

interface FooterProps {
  className?: string
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate footer elements on scroll into view
    if (footerRef.current) {
      const elements = footerRef.current.querySelectorAll('.footer-animate')
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.fromTo(elements,
                { opacity: 0, y: 30 },
                { 
                  opacity: 1, 
                  y: 0, 
                  duration: 0.6, 
                  stagger: 0.1,
                  ease: 'power2.out'
                }
              )
            }
          })
        },
        { threshold: 0.1 }
      )

      if (footerRef.current) {
        observer.observe(footerRef.current)
      }

      return () => observer.disconnect()
    }
    
    return undefined
  }, [])

  const currentYear = new Date().getFullYear()

  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/watches', label: 'Watches' },
    { href: '/gold', label: 'Gold' },
    { href: '/diamond', label: 'Diamond' },
    { href: '/about', label: 'About Us' },
  ]

  const legalLinks = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/shipping', label: 'Shipping Info' },
    { href: '/returns', label: 'Returns' },
  ]

  const certifications = [
    { name: 'GIA', description: 'Certified Gemologist' },
    { name: 'Swiss Made', description: 'Authentic Timepieces' },
    { name: 'Conflict Free', description: 'Ethical Sourcing' },
    { name: 'RJC', description: 'Responsible Jewelry' },
  ]

  const handleWhatsAppContact = () => {
    const message = "Hello! I'm interested in learning more about Luxuria's luxury jewelry collection. Could you please provide more information?"
    const whatsappURL = URLUtils.generateWhatsAppURL(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890', message)
    window.open(whatsappURL, '_blank')
  }

  return (
    <footer 
      ref={footerRef}
      className={cn(
        'bg-charcoal-gradient text-white relative overflow-hidden',
        className
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/images/luxury-pattern.svg')] bg-repeat bg-center" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="luxury-container py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6 footer-animate">
              <Link href="/" className="inline-block">
                <div className="flex items-center space-x-3 group">
                  <div className="w-12 h-12 bg-rose-gold-gradient rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <div className="w-8 h-8 bg-white rounded-full opacity-90" />
                  </div>
                  <span className="font-display text-3xl font-bold bg-rose-gold-gradient bg-clip-text text-transparent">
                    Luxuria
                  </span>
                </div>
              </Link>
              
              <p className="font-body text-white/80 leading-relaxed max-w-sm">
                Three generations of excellence in luxury jewelry, timepieces, and precious gemstones. 
                Crafting memories that last forever.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 bg-rose-gold-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">📍</span>
                  </div>
                  <span className="text-white/70">Florence, Italy • Zurich, Switzerland</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 bg-rose-gold-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">📞</span>
                  </div>
                  <span className="text-white/70">{process.env.NEXT_PUBLIC_PHONE_NUMBER || '+1 (555) 123-4567'}</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 bg-rose-gold-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✉️</span>
                  </div>
                  <span className="text-white/70">{process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@luxuria.com'}</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-6 footer-animate">
              <h3 className="font-display text-xl font-bold text-white">Collections</h3>
              <nav className="space-y-3">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block font-body text-white/70 hover:text-rose-gold-400 transition-colors duration-300 group"
                  >
                    <span className="flex items-center gap-2">
                      {link.label}
                      <svg 
                        className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Services & Support */}
            <div className="space-y-6 footer-animate">
              <h3 className="font-display text-xl font-bold text-white">Services</h3>
              <div className="space-y-3">
                {[
                  'Private Consultation',
                  'Custom Design',
                  'Repair & Restoration',
                  'Authentication',
                  'Lifetime Service',
                  'Insurance Appraisals'
                ].map((service) => (
                  <div key={service} className="font-body text-white/70">{service}</div>
                ))}
              </div>
            </div>

            {/* Contact & Social */}
            <div className="space-y-6 footer-animate">
              <h3 className="font-display text-xl font-bold text-white">Connect</h3>
              
              {/* Contact Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleWhatsAppContact}
                  className="flex items-center gap-3 w-full p-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-300 group"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.109"/>
                  </svg>
                  <span className="font-accent font-medium text-white">WhatsApp</span>
                  <svg className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                <Link
                  href="/contact"
                  className="flex items-center gap-3 w-full p-3 bg-rose-gold-600 hover:bg-rose-gold-700 rounded-lg transition-colors duration-300 group"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-accent font-medium text-white">Contact Form</span>
                  <svg className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>

              {/* Business Hours */}
              <div className="space-y-2">
                <h4 className="font-accent font-semibold text-white">Business Hours</h4>
                <div className="text-sm text-white/70 space-y-1">
                  <div>Monday - Saturday: 10:00 AM - 7:00 PM</div>
                  <div>Sunday: 12:00 PM - 5:00 PM</div>
                  <div className="text-rose-gold-400">Private appointments available</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Bar */}
        <div className="border-t border-white/10">
          <div className="luxury-container py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="footer-animate">
                <h4 className="font-accent font-semibold text-white mb-4 text-center lg:text-left">
                  Certified Excellence
                </h4>
                <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                  {certifications.map((cert, index) => (
                    <div key={index} className="text-center group">
                      <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mb-2 group-hover:bg-white/20 transition-colors duration-300">
                        <span className="font-accent font-bold text-rose-gold-400 text-sm">{cert.name}</span>
                      </div>
                      <div className="text-xs text-white/60">{cert.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="luxury-container py-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm">
              <div className="footer-animate text-white/60 text-center lg:text-left">
                © {currentYear} Luxuria Jewelry & Timepieces. All rights reserved.
              </div>
              
              <div className="footer-animate flex flex-wrap justify-center lg:justify-end gap-6">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-white/60 hover:text-rose-gold-400 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer