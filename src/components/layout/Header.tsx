'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'
import { useUIState } from '@/lib/store/app-store'
import Button from '@/components/ui/Button'

interface HeaderProps {
  className?: string
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const pathname = usePathname()
  const { mobileMenuOpen, toggleMobileMenu } = useUIState()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Navigation items
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/watches', label: 'Watches' },
    { href: '/gold', label: 'Gold' },
    { href: '/diamond', label: 'Diamond' },
    { href: '/about', label: 'About Us' },
  ]

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show/hide header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      // Add background when scrolled
      setIsScrolled(currentScrollY > 50)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Animate header on mount
  useEffect(() => {
    gsap.fromTo('.header-main',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )

    gsap.fromTo('.nav-item',
      { y: -20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.1, 
        delay: 0.3,
        ease: 'power2.out' 
      }
    )
  }, [])

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuOpen) {
      gsap.fromTo('.mobile-menu',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      )
      
      gsap.fromTo('.mobile-nav-item',
        { x: -50, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.4, 
          stagger: 0.1, 
          delay: 0.1,
          ease: 'power2.out' 
        }
      )
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header
        className={cn(
          'header-main fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isVisible ? 'translate-y-0' : '-translate-y-full',
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-luxury border-b border-pearl' 
            : 'bg-transparent',
          className
        )}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              href="/"
              className="flex items-center space-x-3 group"
            >
              <div className="w-10 h-10 bg-rose-gold-gradient rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <div className="w-6 h-6 bg-white rounded-full opacity-90" />
              </div>
              <span className="font-display text-2xl font-bold bg-rose-gold-gradient bg-clip-text text-transparent">
                Luxuria
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'nav-item relative font-accent font-medium transition-all duration-300',
                    'hover:text-rose-gold-500 group py-2',
                    pathname === item.href
                      ? 'text-rose-gold-500'
                      : isScrolled
                      ? 'text-charcoal-700'
                      : 'text-white'
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      'absolute bottom-0 left-0 h-0.5 bg-rose-gold-gradient transition-all duration-300',
                      pathname === item.href
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
                    )}
                  />
                </Link>
              ))}
            </nav>

            {/* Contact Button & Mobile Menu Toggle */}
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="md"
                className="hidden sm:inline-flex"
              >
                Contact Us
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg transition-colors duration-300 hover:bg-pearl"
                aria-label="Toggle mobile menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span
                    className={cn(
                      'block h-0.5 bg-current transition-all duration-300 origin-center',
                      mobileMenuOpen ? 'rotate-45 translate-y-2' : '',
                      isScrolled ? 'bg-charcoal-700' : 'bg-white'
                    )}
                  />
                  <span
                    className={cn(
                      'block h-0.5 bg-current transition-all duration-300',
                      mobileMenuOpen ? 'opacity-0' : 'opacity-100',
                      isScrolled ? 'bg-charcoal-700' : 'bg-white'
                    )}
                  />
                  <span
                    className={cn(
                      'block h-0.5 bg-current transition-all duration-300 origin-center',
                      mobileMenuOpen ? '-rotate-45 -translate-y-2' : '',
                      isScrolled ? 'bg-charcoal-700' : 'bg-white'
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu lg:hidden bg-white shadow-luxury border-t border-pearl">
            <div className="container mx-auto px-6 py-6">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={toggleMobileMenu}
                    className={cn(
                      'mobile-nav-item font-accent font-medium text-lg transition-colors duration-300',
                      'hover:text-rose-gold-500 py-2 border-b border-pearl last:border-b-0',
                      pathname === item.href
                        ? 'text-rose-gold-500'
                        : 'text-charcoal-700'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                
                <div className="pt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={toggleMobileMenu}
                  >
                    Contact Us
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  )
}

export default Header