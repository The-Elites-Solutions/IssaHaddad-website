'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Button from '@/components/ui/Button'
import { cn, URLUtils, FormatUtils } from '@/lib/utils'
import { useCurrentProduct } from '@/lib/store/app-store'

interface ProductDetailPanelProps {
  className?: string
  position?: 'left' | 'right' | 'bottom'
  compact?: boolean
}

const ProductDetailPanel: React.FC<ProductDetailPanelProps> = ({ 
  className,
  position = 'right',
  compact = false
}) => {
  const product = useCurrentProduct()
  const panelRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Animate panel when product changes
  useEffect(() => {
    if (!panelRef.current || !contentRef.current) return

    if (product) {
      // Slide in animation
      gsap.fromTo(panelRef.current,
        { 
          opacity: 0, 
          x: position === 'right' ? 50 : position === 'left' ? -50 : 0,
          y: position === 'bottom' ? 50 : 0 
        },
        { 
          opacity: 1, 
          x: 0, 
          y: 0, 
          duration: 0.6, 
          ease: 'power3.out' 
        }
      )

      // Stagger content animation
      gsap.fromTo(contentRef.current.children,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4, 
          stagger: 0.1, 
          delay: 0.2,
          ease: 'power2.out' 
        }
      )
    } else {
      // Slide out animation
      gsap.to(panelRef.current, {
        opacity: 0,
        x: position === 'right' ? 50 : position === 'left' ? -50 : 0,
        y: position === 'bottom' ? 50 : 0,
        duration: 0.3,
        ease: 'power2.in'
      })
    }
  }, [product, position])

  const handleWhatsAppInquiry = () => {
    if (!product) return

    const message = `Hello! I'm interested in the ${product.name} from your ${product.category} collection. Could you please provide more information about pricing and availability?

Product Details:
- Name: ${product.name}
- Brand: ${product.brand}
- Category: ${FormatUtils.capitalize(product.category)}
- Material: ${product.specifications.material}

Thank you!`

    const whatsappURL = URLUtils.generateWhatsAppURL(product.whatsappInquiry, message)
    window.open(whatsappURL, '_blank')
  }

  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'watch':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'gold':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'diamond':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (!product) {
    return (
      <div className={cn(
        'flex items-center justify-center p-8 text-center',
        className
      )}>
        <div className="space-y-4">
          <div className="w-16 h-16 bg-rose-gold-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-rose-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-charcoal-900 mb-2">
              Explore Our Collection
            </h3>
            <p className="font-body text-charcoal-600">
              Scroll to discover our exquisite pieces and see detailed information here.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={panelRef}
      className={cn(
        'bg-white rounded-2xl shadow-luxury border border-pearl p-6 lg:p-8',
        'transform transition-all duration-300',
        compact ? 'max-w-sm' : 'max-w-md',
        className
      )}
    >
      <div ref={contentRef} className="space-y-6">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className={cn(
              'px-3 py-1 rounded-full text-xs font-accent font-medium border',
              getBadgeColor(product.category)
            )}>
              {FormatUtils.capitalize(product.category)}
            </span>
            
            {product.featured && (
              <span className="px-3 py-1 rounded-full text-xs font-accent font-medium bg-rose-gold-100 text-rose-gold-800 border border-rose-gold-200">
                Featured
              </span>
            )}
            
            {product.newArrival && (
              <span className="px-3 py-1 rounded-full text-xs font-accent font-medium bg-green-100 text-green-800 border border-green-200">
                New
              </span>
            )}
          </div>

          <h2 className="font-display text-2xl lg:text-3xl font-bold text-charcoal-900">
            {product.name}
          </h2>
          
          <p className="font-accent text-lg font-medium text-rose-gold-600">
            {product.brand}
          </p>
        </div>

        {/* Description */}
        <p className="font-body text-charcoal-700 leading-relaxed">
          {product.description}
        </p>

        {/* Specifications */}
        <div className="space-y-4">
          <h3 className="font-accent text-lg font-semibold text-charcoal-900">
            Specifications
          </h3>
          
          <div className="grid grid-cols-1 gap-3">
            <div className="flex justify-between py-2 border-b border-pearl">
              <span className="font-body text-charcoal-600">Material</span>
              <span className="font-body font-medium text-charcoal-900">
                {product.specifications.material}
              </span>
            </div>
            
            {product.specifications.weight && (
              <div className="flex justify-between py-2 border-b border-pearl">
                <span className="font-body text-charcoal-600">Weight</span>
                <span className="font-body font-medium text-charcoal-900">
                  {product.specifications.weight}
                </span>
              </div>
            )}
            
            {product.specifications.dimensions && (
              <div className="flex justify-between py-2 border-b border-pearl">
                <span className="font-body text-charcoal-600">Dimensions</span>
                <span className="font-body font-medium text-charcoal-900">
                  {product.specifications.dimensions}
                </span>
              </div>
            )}

            {/* Watch-specific specs */}
            {product.category === 'watch' && (
              <>
                {product.specifications.movement && (
                  <div className="flex justify-between py-2 border-b border-pearl">
                    <span className="font-body text-charcoal-600">Movement</span>
                    <span className="font-body font-medium text-charcoal-900">
                      {product.specifications.movement}
                    </span>
                  </div>
                )}
                
                {product.specifications.waterResistance && (
                  <div className="flex justify-between py-2 border-b border-pearl">
                    <span className="font-body text-charcoal-600">Water Resistance</span>
                    <span className="font-body font-medium text-charcoal-900">
                      {product.specifications.waterResistance}
                    </span>
                  </div>
                )}
              </>
            )}

            {/* Gemstone specs */}
            {product.specifications.gemstones && product.specifications.gemstones.length > 0 && (
              <div className="py-2">
                <span className="font-body text-charcoal-600 block mb-2">Gemstones</span>
                <div className="space-y-1">
                  {product.specifications.gemstones.map((gem, index) => (
                    <div key={index} className="font-body text-sm text-charcoal-800">
                      {gem.type} {gem.carat && `(${gem.carat}ct)`} {gem.cut && `- ${gem.cut} cut`}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Certifications */}
        {product.certifications && product.certifications.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-accent text-lg font-semibold text-charcoal-900">
              Certifications
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.certifications.map((cert, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-charcoal-100 text-charcoal-700 rounded-lg text-sm font-body"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Availability */}
        <div className="flex items-center gap-3">
          <div className={cn(
            'w-3 h-3 rounded-full',
            product.availability === 'in-stock' ? 'bg-green-500' :
            product.availability === 'made-to-order' ? 'bg-yellow-500' : 'bg-red-500'
          )} />
          <span className="font-body text-charcoal-700">
            {product.availability === 'in-stock' ? 'Available Now' :
             product.availability === 'made-to-order' ? 'Made to Order' : 'Currently Unavailable'}
          </span>
        </div>

        {/* Price Information */}
        <div className="bg-pearl rounded-xl p-4">
          <div className="text-center">
            {product.price.showPrice && product.price.priceRange ? (
              <div className="font-display text-2xl font-bold text-charcoal-900 mb-2">
                {product.price.priceRange}
              </div>
            ) : (
              <div className="font-accent font-medium text-charcoal-700 mb-2">
                Price Available Upon Request
              </div>
            )}
            <p className="font-body text-sm text-charcoal-600">
              {product.price.currency} • Exclusive consultation required
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleWhatsAppInquiry}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.109"/>
            </svg>
            Inquire on WhatsApp
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="w-full"
          >
            Schedule Private Viewing
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPanel