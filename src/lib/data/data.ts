import type { JewelryProduct } from '@/types'

// ============================================
// WATCHES COLLECTION
// ============================================
export const watchesData: JewelryProduct[] = [
  {
    id: 'watch-001',
    name: 'Royal Chronograph',
    category: 'watch',
    subcategory: 'chronograph',
    brand: 'Luxuria Swiss',
    description: 'A masterpiece of horological engineering featuring a precise Swiss movement, rose gold case, and sapphire crystal. This timepiece represents the pinnacle of luxury watchmaking with its intricate chronograph complications and hand-finished details.',
    specifications: {
      material: '18k Rose Gold',
      weight: '180g',
      dimensions: '42mm diameter, 12mm thickness',
      movement: 'Swiss Automatic Chronograph, 42-hour power reserve',
      waterResistance: '100m',
      warranty: '5 years international warranty'
    },
    model3D: {
      path: '/models/watches/watch-chronograph.glb',
      scale: [1, 1, 1],
      position: [0, 0, 0],
      rotation: [0, 0, 0]
    },
    images: [
      {
        url: '/images/watches/royal-chronograph-main.jpg',
        alt: 'Royal Chronograph luxury watch main view',
        type: 'main',
        order: 1
      },
      {
        url: '/images/watches/royal-chronograph-detail.jpg',
        alt: 'Royal Chronograph dial detail',
        type: 'detail',
        order: 2
      }
    ],
    price: {
      currency: 'USD',
      showPrice: false,
      priceRange: '$25,000 - $35,000',
      inquiryOnly: true
    },
    availability: 'in-stock',
    featured: true,
    newArrival: false,
    bestSeller: true,
    certifications: ['Swiss Made', 'COSC Certified', 'Luxuria Authenticated'],
    tags: ['luxury', 'swiss', 'chronograph', 'rose-gold', 'automatic'],
    whatsappInquiry: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890'
  },
  {
    id: 'watch-002',
    name: 'Diamond Elegance',
    category: 'watch',
    subcategory: 'dress',
    brand: 'Luxuria Collection',
    description: 'An exquisite dress watch adorned with carefully selected diamonds, featuring a mother-of-pearl dial and Swiss quartz movement for unmatched precision and feminine elegance.',
    specifications: {
      material: '18k White Gold with Diamonds (1.2ct total)',
      weight: '95g',
      dimensions: '32mm diameter, 8mm thickness',
      movement: 'Swiss Quartz, battery life 3+ years',
      waterResistance: '30m',
      warranty: '3 years international warranty'
    },
    model3D: {
      path: '/models/watches/watch-diamond.glb',
      scale: [0.9, 0.9, 0.9],
      position: [0, 0, 0],
      rotation: [0, 0, 0]
    },
    images: [
      {
        url: '/images/watches/diamond-elegance-main.jpg',
        alt: 'Diamond Elegance luxury watch',
        type: 'main',
        order: 1
      }
    ],
    price: {
      currency: 'USD',
      showPrice: false,
      priceRange: '$18,000 - $28,000',
      inquiryOnly: true
    },
    availability: 'made-to-order',
    featured: true,
    newArrival: true,
    bestSeller: false,
    certifications: ['Swiss Made', 'Diamond Certified', 'Luxuria Authenticated'],
    tags: ['luxury', 'diamonds', 'dress-watch', 'white-gold', 'quartz'],
    whatsappInquiry: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890'
  },
  {
    id: 'watch-003',
    name: 'Heritage Automatic',
    category: 'watch',
    subcategory: 'automatic',
    brand: 'Luxuria Heritage',
    description: 'A tribute to classical watchmaking with modern refinements. Features an exhibition caseback showcasing the intricate automatic movement and traditional craftsmanship.',
    specifications: {
      material: '18k Yellow Gold',
      weight: '165g',
      dimensions: '40mm diameter, 11mm thickness',
      movement: 'Swiss Automatic, 38-hour power reserve',
      waterResistance: '50m',
      warranty: '5 years international warranty'
    },
    model3D: {
      path: '/models/watches/watch-heritage.glb',
      scale: [1.1, 1.1, 1.1],
      position: [0, 0, 0],
      rotation: [0, 0, 0]
    },
    images: [
      {
        url: '/images/watches/heritage-automatic-main.jpg',
        alt: 'Heritage Automatic luxury watch',
        type: 'main',
        order: 1
      }
    ],
    price: {
      currency: 'USD',
      showPrice: false,
      priceRange: '$22,000 - $32,000',
      inquiryOnly: true
    },
    availability: 'in-stock',
    featured: false,
    newArrival: false,
    bestSeller: true,
    certifications: ['Swiss Made', 'Luxuria Heritage Collection'],
    tags: ['luxury', 'automatic', 'heritage', 'yellow-gold', 'exhibition-back'],
    whatsappInquiry: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890'
  }
]

// ============================================
// GOLD COLLECTION
// ============================================
export const goldData: JewelryProduct[] = [
  {
    id: 'gold-001',
    name: 'Eternal Rose Ring',
    category: 'gold',
    subcategory: 'rings',
    brand: 'Luxuria Classics',
    description: 'A stunning solitaire ring crafted from 18k rose gold, featuring intricate floral engravings that symbolize eternal love and commitment. Each petal is hand-engraved by master artisans.',
    specifications: {
      material: '18k Rose Gold (75% pure gold)',
      weight: '12g',
      dimensions: 'Ring size 6 (adjustable 4-8)',
      warranty: '3 years craftsmanship warranty'
    },
    model3D: {
      path: '/models/gold/gold-rose-ring.glb',
      scale: [2, 2, 2],
      position: [0, 0, 0],
      rotation: [0, 0, 0]
    },
    images: [
      {
        url: '/images/gold/eternal-rose-ring.jpg',
        alt: 'Eternal Rose Ring in 18k rose gold',
        type: 'main',
        order: 1
      }
    ],
    price: {
      currency: 'USD',
      showPrice: false,
      priceRange: '$2,800 - $4,200',
      inquiryOnly: true
    },
    availability: 'in-stock',
    featured: true,
    newArrival: false,
    bestSeller: true,
    certifications: ['18k Gold Certified', 'Handcrafted', 'Luxuria Authentic'],
    tags: ['engagement', 'rose-gold', 'solitaire', 'handcrafted', 'floral'],
    whatsappInquiry: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890'
  },
  {
    id: 'gold-002',
    name: 'Byzantine Chain Necklace',
    category: 'gold',
    subcategory: 'necklaces',
    brand: 'Luxuria Heritage',
    description: 'An exquisite 24k gold chain featuring the ancient Byzantine weave pattern, representing luxury and sophistication in its purest form. A timeless investment piece.',
    specifications: {
      material: '24k Pure Gold (99.9% pure)',
      weight: '85g',
      dimensions: '60cm length, 8mm width',
      warranty: 'Lifetime authenticity guarantee'
    },
    model3D: {
      path: '/models/gold/gold-byzantine-chain.glb',
      scale: [1.5, 1.5, 1.5],
      position: [0, 0, 0],
      rotation: [0, 0, 0]
    },
    images: [
      {
        url: '/images/gold/byzantine-chain.jpg',
        alt: 'Byzantine Chain Necklace in 24k gold',
        type: 'main',
        order: 1
      }
    ],
    price: {
      currency: 'USD',
      showPrice: false,
      priceRange: '$8,500 - $12,000',
      inquiryOnly: true
    },
    availability: 'made-to-order',
    featured: true,
    newArrival: true,
    bestSeller: false,
    certifications: ['24k Gold Certified', 'Artisan Made', 'Investment Grade'],
    tags: ['necklace', '24k-gold', 'byzantine', 'luxury', 'investment'],
    whatsappInquiry: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890'
  }
]

// ============================================
// DIAMOND COLLECTION
// ============================================
export const diamondData: JewelryProduct[] = [
  {
    id: 'diamond-001',
    name: 'Radiant Solitaire Ring',
    category: 'diamond',
    subcategory: 'engagement-rings',
    brand: 'Luxuria Diamonds',
    description: 'A breathtaking 2.5-carat round brilliant diamond set in platinum, showcasing exceptional fire and brilliance. Certified for maximum sparkle and clarity with perfect proportions.',
    specifications: {
      material: 'Platinum 950',
      weight: '8g',
      dimensions: 'Ring size 6 (adjustable 4-9)',
      gemstones: [
        {
          type: 'Diamond',
          cut: 'Round Brilliant',
          carat: 2.5,
          clarity: 'VVS1',
          color: 'D',
          certification: 'GIA Certified #1234567890'
        }
      ],
      warranty: '5 years craftsmanship warranty'
    },
    model3D: {
      path: '/models/diamonds/diamond-solitaire-ring.glb',
      scale: [2.2, 2.2, 2.2],
      position: [0, 0, 0],
      rotation: [0, 0, 0]
    },
    images: [
      {
        url: '/images/diamonds/radiant-solitaire.jpg',
        alt: 'Radiant Solitaire Diamond Ring',
        type: 'main',
        order: 1
      },
      {
        url: '/images/diamonds/radiant-solitaire-certificate.jpg',
        alt: 'GIA Certificate for Radiant Solitaire',
        type: 'certificate',
        order: 2
      }
    ],
    price: {
      currency: 'USD',
      showPrice: false,
      priceRange: '$45,000 - $65,000',
      inquiryOnly: true
    },
    availability: 'in-stock',
    featured: true,
    newArrival: false,
    bestSeller: true,
    certifications: ['GIA Certified', 'Conflict-Free', 'Platinum Hallmarked'],
    tags: ['engagement', 'solitaire', 'round-brilliant', 'platinum', 'vvs1'],
    whatsappInquiry: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890'
  }
]

// ============================================
// COMBINED COLLECTIONS
// ============================================
export const allProducts: JewelryProduct[] = [
  ...watchesData,
  ...goldData,
  ...diamondData
]

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get products by category
 */
export const getProductsByCategory = (category: 'watch' | 'gold' | 'diamond'): JewelryProduct[] => {
  switch (category) {
    case 'watch':
      return watchesData
    case 'gold':
      return goldData
    case 'diamond':
      return diamondData
    default:
      return []
  }
}

/**
 * Get featured products across all categories
 */
export const getFeaturedProducts = (): JewelryProduct[] => {
  return allProducts.filter(product => product.featured)
}

/**
 * Get new arrivals across all categories
 */
export const getNewArrivals = (): JewelryProduct[] => {
  return allProducts.filter(product => product.newArrival)
}

/**
 * Get best sellers across all categories
 */
export const getBestSellers = (): JewelryProduct[] => {
  return allProducts.filter(product => product.bestSeller)
}

/**
 * Get product by ID
 */
export const getProductById = (id: string): JewelryProduct | undefined => {
  return allProducts.find(product => product.id === id)
}

/**
 * Search products by name, brand, or tags
 */
export const searchProducts = (query: string): JewelryProduct[] => {
  const lowercaseQuery = query.toLowerCase()
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

/**
 * Filter products by availability
 */
export const getAvailableProducts = (): JewelryProduct[] => {
  return allProducts.filter(product => 
    product.availability === 'in-stock' || product.availability === 'made-to-order'
  )
}

/**
 * Get products by brand
 */
export const getProductsByBrand = (brand: string): JewelryProduct[] => {
  return allProducts.filter(product => 
    product.brand.toLowerCase() === brand.toLowerCase()
  )
}

/**
 * Get products by subcategory
 */
export const getProductsBySubcategory = (subcategory: string): JewelryProduct[] => {
  return allProducts.filter(product => product.subcategory === subcategory)
}

/**
 * Get collection statistics
 */
export const getCollectionStats = () => {
  return {
    total: allProducts.length,
    watches: watchesData.length,
    gold: goldData.length,
    diamonds: diamondData.length,
    featured: getFeaturedProducts().length,
    newArrivals: getNewArrivals().length,
    bestSellers: getBestSellers().length,
    inStock: allProducts.filter(p => p.availability === 'in-stock').length,
    madeToOrder: allProducts.filter(p => p.availability === 'made-to-order').length
  }
}

/**
 * Get unique brands
 */
export const getAllBrands = (): string[] => {
  const brands = allProducts.map(product => product.brand)
  return Array.from(new Set(brands)).sort()
}

/**
 * Get unique tags
 */
export const getAllTags = (): string[] => {
  const tags = allProducts.flatMap(product => product.tags)
  return Array.from(new Set(tags)).sort()
}

// ============================================
// SAMPLE DATA STRUCTURE FOR EXPANSION
// ============================================

/**
 * Template for adding new products
 */
export const productTemplate: Partial<JewelryProduct> = {
  id: '', // Format: category-XXX (e.g., 'watch-004')
  name: '',
  category: 'watch', // 'watch' | 'gold' | 'diamond'
  subcategory: '',
  brand: '',
  description: '',
  specifications: {
    material: '',
    weight: '',
    dimensions: '',
    warranty: ''
  },
  model3D: {
    path: '/models/category/filename.glb',
    scale: [1, 1, 1],
    position: [0, 0, 0],
    rotation: [0, 0, 0]
  },
  images: [
    {
      url: '/images/category/product-main.jpg',
      alt: '',
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
  bestSeller: false,
  certifications: [],
  tags: [],
  whatsappInquiry: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890'
}

const jewelryData = {
  watchesData,
  goldData,
  diamondData,
  allProducts,
  getProductsByCategory,
  getFeaturedProducts,
  getNewArrivals,
  getBestSellers,
  getProductById,
  searchProducts,
  getCollectionStats
}

export default jewelryData
    