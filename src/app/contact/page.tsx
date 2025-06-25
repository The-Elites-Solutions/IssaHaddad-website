'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '@/components/ui/Button'
import { GSAPUtils } from '@/lib/gsap'
import { cn, URLUtils, ValidationUtils } from '@/lib/utils'
import type { ContactForm } from '@/types'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    message: '',
    productInterest: '',
    preferredContact: 'email'
  })

  const [errors, setErrors] = useState<Partial<ContactForm>>({})

  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      GSAPUtils.fadeInUp('.hero-content > *', { stagger: 0.3, delay: 0.5 })
    }

    // Form animation - TODO: Fix type compatibility
    // if (formRef.current) {
    //   GSAPUtils.scrollTriggerAnimation(
    //     formRef.current,
    //     GSAPUtils.fadeInUp('.contact-form > *', { stagger: 0.1 }),
    //     {
    //       trigger: formRef.current,
    //       start: 'top 80%',
    //       scrub: false
    //     }
    //   )
    // }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {}

    if (!ValidationUtils.required(formData.name)) {
      newErrors.name = 'Name is required'
    }

    if (!ValidationUtils.required(formData.email)) {
      newErrors.email = 'Email is required'
    } else if (!ValidationUtils.email(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (formData.phone && !ValidationUtils.phone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!ValidationUtils.required(formData.message)) {
      newErrors.message = 'Message is required'
    } else if (!ValidationUtils.minLength(formData.message, 10)) {
      newErrors.message = 'Message must be at least 10 characters long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when user starts typing
    if (errors[name as keyof ContactForm]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate API call - replace with your actual API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          productInterest: '',
          preferredContact: 'email'
        })
        
        // Success animation
        gsap.to(formRef.current, {
          scale: 0.95,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out'
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Contact form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsAppContact = () => {
    const message = `Hello! I'm interested in contacting Luxuria Jewelry.

Name: ${formData.name || '[Not provided]'}
Email: ${formData.email || '[Not provided]'}
Phone: ${formData.phone || '[Not provided]'}
Product Interest: ${formData.productInterest || 'General inquiry'}

Message: ${formData.message || 'I would like to learn more about your luxury jewelry collection.'}`

    const whatsappURL = URLUtils.generateWhatsAppURL(
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890', 
      message
    )
    window.open(whatsappURL, '_blank')
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-b from-pearl via-white to-pearl">
      {/* Hero Section */}
      <section className="pt-32 pb-16 luxury-container">
        <div ref={heroRef} className="text-center space-y-8 max-w-4xl mx-auto">
          <h1 className="font-display text-6xl lg:text-8xl font-bold text-charcoal-900">
            Contact <span className="text-gradient-rose">Us</span>
          </h1>
          
          <div className="w-32 h-1 bg-rose-gold-gradient rounded-full mx-auto" />
          
          <p className="font-body text-xl lg:text-2xl text-charcoal-700 leading-relaxed">
            Begin your journey with Luxuria. Our master craftsmen and gemologists 
            are ready to help you discover the perfect piece for your collection.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="luxury-section bg-white">
        <div className="luxury-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: '📞',
                title: 'Phone',
                subtitle: 'Speak with our specialists',
                content: process.env.NEXT_PUBLIC_PHONE_NUMBER || '+1 (555) 123-4567',
                description: 'Monday - Saturday: 10:00 AM - 7:00 PM',
                action: () => window.open(`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`)
              },
              {
                icon: '✉️',
                title: 'Email',
                subtitle: 'Send us a message',
                content: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@luxuria.com',
                description: 'We respond within 24 hours',
                action: () => window.open(`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`)
              },
              {
                icon: '💬',
                title: 'WhatsApp',
                subtitle: 'Instant luxury consultation',
                content: 'Chat with us now',
                description: 'Available during business hours',
                action: handleWhatsAppContact
              }
            ].map((method, index) => (
              <div key={index} className="luxury-card text-center group cursor-pointer" onClick={method.action}>
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {method.icon}
                </div>
                <h3 className="font-display text-2xl font-bold text-charcoal-900 mb-2">
                  {method.title}
                </h3>
                <p className="font-accent text-rose-gold-600 mb-3">{method.subtitle}</p>
                <p className="font-body font-semibold text-charcoal-800 mb-2">{method.content}</p>
                <p className="font-body text-sm text-charcoal-600">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="luxury-section">
        <div className="luxury-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Form */}
            <div>
              <div className="mb-8">
                <h2 className="font-display text-4xl font-bold text-charcoal-900 mb-4">
                  Send us a <span className="text-gradient-rose">Message</span>
                </h2>
                <p className="font-body text-charcoal-700">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block font-accent font-medium text-charcoal-800 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={cn(
                      'luxury-input',
                      errors.name && 'border-red-500 focus:ring-red-400'
                    )}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block font-accent font-medium text-charcoal-800 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={cn(
                      'luxury-input',
                      errors.email && 'border-red-500 focus:ring-red-400'
                    )}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block font-accent font-medium text-charcoal-800 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={cn(
                      'luxury-input',
                      errors.phone && 'border-red-500 focus:ring-red-400'
                    )}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                {/* Product Interest */}
                <div>
                  <label htmlFor="productInterest" className="block font-accent font-medium text-charcoal-800 mb-2">
                    Product Interest
                  </label>
                  <select
                    id="productInterest"
                    name="productInterest"
                    value={formData.productInterest}
                    onChange={handleInputChange}
                    className="luxury-input"
                  >
                    <option value="">Select a category</option>
                    <option value="watches">Luxury Timepieces</option>
                    <option value="gold">Gold Jewelry</option>
                    <option value="diamonds">Diamond Collections</option>
                    <option value="custom">Custom Design</option>
                    <option value="consultation">Private Consultation</option>
                    <option value="repair">Repair & Restoration</option>
                    <option value="appraisal">Insurance Appraisal</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block font-accent font-medium text-charcoal-800 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={cn(
                      'luxury-input resize-none',
                      errors.message && 'border-red-500 focus:ring-red-400'
                    )}
                    placeholder="Tell us about your jewelry interests, specific pieces you'd like to learn about, or any questions you have..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block font-accent font-medium text-charcoal-800 mb-3">
                    Preferred Contact Method
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { value: 'email', label: 'Email', icon: '✉️' },
                      { value: 'phone', label: 'Phone', icon: '📞' },
                      { value: 'whatsapp', label: 'WhatsApp', icon: '💬' }
                    ].map((method) => (
                      <label key={method.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContact"
                          value={method.value}
                          checked={formData.preferredContact === method.value}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-rose-gold-500 border-charcoal-300 focus:ring-rose-gold-400"
                        />
                        <span className="text-lg">{method.icon}</span>
                        <span className="font-body text-charcoal-700">{method.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                  >
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  </Button>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✅</span>
                      <p className="font-accent text-green-800">
                        Thank you! Your message has been sent successfully. We&apos;ll get back to you within 24 hours.
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-red-600">❌</span>
                      <p className="font-accent text-red-800">
                        Sorry, there was an error sending your message. Please try again or contact us directly.
                      </p>
                    </div>
                  </div>
                )}

                {/* Alternative Contact */}
                <div className="pt-6 border-t border-charcoal-200">
                  <p className="font-body text-sm text-charcoal-600 text-center mb-4">
                    Prefer instant communication?
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    className="w-full"
                    onClick={handleWhatsAppContact}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.109"/>
                    </svg>
                    Contact via WhatsApp
                  </Button>
                </div>
              </form>
            </div>

            {/* Contact Information & Map */}
            <div className="space-y-8">
              {/* Business Hours */}
              <div className="luxury-card">
                <h3 className="font-display text-2xl font-bold text-charcoal-900 mb-4">
                  Visit Our <span className="text-gradient-rose">Ateliers</span>
                </h3>
                
                <div className="space-y-6">
                  {[
                    {
                      location: 'Florence, Italy',
                      address: 'Via del Luxury, 123\n50100 Florence, Italy',
                      phone: '+39 055 123 4567',
                      specialty: 'Heritage Collection & Custom Design'
                    },
                    {
                      location: 'Zurich, Switzerland',
                      address: 'Bahnhofstrasse, 456\n8001 Zurich, Switzerland',
                      phone: '+41 44 987 6543',
                      specialty: 'Swiss Timepieces & Diamond Certification'
                    }
                  ].map((location, index) => (
                    <div key={index} className="p-4 bg-pearl rounded-lg">
                      <h4 className="font-accent font-bold text-charcoal-900 mb-2">{location.location}</h4>
                      <div className="space-y-2 text-sm">
                        <p className="font-body text-charcoal-700 whitespace-pre-line">{location.address}</p>
                        <p className="font-body text-charcoal-700">{location.phone}</p>
                        <p className="font-accent text-rose-gold-600 italic">{location.specialty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="luxury-card">
                <h3 className="font-display text-2xl font-bold text-charcoal-900 mb-4">
                  Business Hours
                </h3>
                
                <div className="space-y-3">
                  {[
                    { days: 'Monday - Friday', hours: '10:00 AM - 7:00 PM' },
                    { days: 'Saturday', hours: '10:00 AM - 6:00 PM' },
                    { days: 'Sunday', hours: '12:00 PM - 5:00 PM' }
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-charcoal-100 last:border-b-0">
                      <span className="font-accent font-medium text-charcoal-800">{schedule.days}</span>
                      <span className="font-body text-charcoal-600">{schedule.hours}</span>
                    </div>
                  ))}
                  
                  <div className="pt-3 mt-3 border-t border-charcoal-200">
                    <p className="font-body text-sm text-rose-gold-600 italic">
                      Private appointments available outside business hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="luxury-card">
                <h3 className="font-display text-2xl font-bold text-charcoal-900 mb-4">
                  Our Services
                </h3>
                
                <div className="grid grid-cols-1 gap-3">
                  {[
                    'Private Jewelry Consultation',
                    'Custom Design & Creation',
                    'Watch Repair & Restoration',
                    'Diamond Authentication & Certification',
                    'Insurance Appraisals',
                    'Vintage Jewelry Restoration',
                    'Engraving & Personalization',
                    'Collection Management'
                  ].map((service, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-rose-gold-400 rounded-full" />
                      <span className="font-body text-charcoal-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="luxury-section bg-white">
        <div className="luxury-container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal-900 mb-4">
              Frequently Asked <span className="text-gradient-rose">Questions</span>
            </h2>
            <p className="font-body text-xl text-charcoal-700 max-w-3xl mx-auto">
              Find answers to common questions about our luxury jewelry and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'Do you offer custom jewelry design?',
                answer: 'Yes, we specialize in creating unique, custom jewelry pieces. Our master craftsmen work closely with you to bring your vision to life using the finest materials and traditional techniques.'
              },
              {
                question: 'Are your diamonds certified?',
                answer: 'All our diamonds come with certificates from leading gemological institutes including GIA, AGS, and Gübelin. We guarantee all diamonds are conflict-free and ethically sourced.'
              },
              {
                question: 'What warranty do you provide?',
                answer: 'We offer comprehensive warranties ranging from 2-5 years depending on the piece. All Luxuria jewelry includes lifetime authenticity guarantee and complimentary annual inspections.'
              },
              {
                question: 'Can you repair vintage jewelry?',
                answer: 'Absolutely. Our skilled artisans specialize in restoring vintage and antique jewelry while preserving their historical integrity. We use period-appropriate techniques and materials.'
              },
              {
                question: 'Do you offer financing options?',
                answer: 'We provide flexible payment plans for qualified customers. Contact our specialists to discuss financing options that suit your needs for luxury jewelry purchases.'
              },
              {
                question: 'How do I schedule a private appointment?',
                answer: 'Private appointments can be scheduled by calling us, sending an email, or using WhatsApp. We offer exclusive after-hours consultations for our discerning clientele.'
              }
            ].map((faq, index) => (
              <div key={index} className="luxury-card">
                <h3 className="font-accent font-bold text-charcoal-900 mb-3">{faq.question}</h3>
                <p className="font-body text-charcoal-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}