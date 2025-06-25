import { Vector3, Object3D, Material } from 'three'

// Product Types
export interface JewelryProduct {
  id: string
  name: string
  category: 'watch' | 'gold' | 'diamond'
  subcategory?: string
  brand: string
  description: string
  specifications: ProductSpecifications
  model3D: Model3DConfig
  images: ProductImage[]
  price: PriceInfo
  availability: 'in-stock' | 'made-to-order' | 'sold-out'
  featured: boolean
  newArrival: boolean
  bestSeller: boolean
  certifications?: string[]
  tags: string[]
  whatsappInquiry: string
}

export interface ProductSpecifications {
  material: string
  weight?: string
  dimensions?: string
  gemstones?: GemstoneSpec[]
  movement?: string // for watches
  waterResistance?: string // for watches
  warranty?: string
}

export interface GemstoneSpec {
  type: string
  cut?: string
  carat?: number
  clarity?: string
  color?: string
  certification?: string
}

export interface Model3DConfig {
  path: string
  scale: Vector3 | [number, number, number]
  position: Vector3 | [number, number, number]
  rotation: Vector3 | [number, number, number]
  materials?: MaterialConfig[]
  animations?: AnimationConfig[]
  thumbnail?: string
}

export interface MaterialConfig {
  name: string
  type: 'metal' | 'gemstone' | 'glass' | 'leather'
  textures: {
    map?: string
    normalMap?: string
    roughnessMap?: string
    metallicMap?: string
    envMap?: string
  }
  properties: {
    metalness?: number
    roughness?: number
    opacity?: number
    transparent?: boolean
    color?: string
  }
}

export interface AnimationConfig {
  name: string
  duration: number
  loop: boolean
  autoplay: boolean
}

export interface ProductImage {
  url: string
  alt: string
  type: 'main' | 'detail' | 'lifestyle' | 'certificate'
  order: number
}

export interface PriceInfo {
  currency: string
  showPrice: boolean
  priceRange?: string
  inquiryOnly: boolean
}

// 3D Scene Types
export interface ConveyorBeltConfig {
  beltLength: number
  beltWidth: number
  beltHeight: number
  speed: number
  caseCount: number
  caseSpacing: number
}

export interface GlassCaseConfig {
  width: number
  height: number
  depth: number
  glassThickness: number
  frameColor: string
  lighting: LightingConfig
}

export interface LightingConfig {
  intensity: number
  color: string
  position: Vector3 | [number, number, number]
  castShadow: boolean
  shadowMapSize?: number
}

// Animation Types
export interface ScrollAnimationConfig {
  trigger: string
  start: string
  end: string
  scrub: boolean | number
  pin?: boolean
  anticipatePin?: number
  onEnter?: () => void
  onLeave?: () => void
  onUpdate?: (self: any) => void
}

export interface GSAPTimelineConfig {
  paused?: boolean
  repeat?: number
  yoyo?: boolean
  delay?: number
  onComplete?: () => void
  onUpdate?: () => void
}

// UI Component Types
export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost'
  size: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

// Store Types (Zustand)
export interface AppStore {
  // Current state
  currentProduct: JewelryProduct | null
  activeCategory: 'watch' | 'gold' | 'diamond' | null
  isLoading: boolean
  error: string | null
  
  // 3D Scene state
  cameraPosition: Vector3 | [number, number, number]
  cameraTarget: Vector3 | [number, number, number]
  conveyorPosition: number
  activeCase: number
  
  // UI state
  mobileMenuOpen: boolean
  productModalOpen: boolean
  filterPanelOpen: boolean
  
  // Actions
  setCurrentProduct: (product: JewelryProduct | null) => void
  setActiveCategory: (category: 'watch' | 'gold' | 'diamond' | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setCameraPosition: (position: Vector3 | [number, number, number]) => void
  setCameraTarget: (target: Vector3 | [number, number, number]) => void
  setConveyorPosition: (position: number) => void
  setActiveCase: (caseIndex: number) => void
  toggleMobileMenu: () => void
  toggleProductModal: () => void
  toggleFilterPanel: () => void
  reset: () => void
}

// Utility Types
export interface PageProps {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export interface LayoutProps {
  children: React.ReactNode
}

// Three.js Extended Types
export interface ExtendedObject3D extends Object3D {
  material?: Material | Material[]
  geometry?: any
  userData: {
    productId?: string
    caseIndex?: number
    originalPosition?: Vector3
    originalScale?: Vector3
    isActive?: boolean
    [key: string]: any
  }
}

// Form Types
export interface ContactForm {
  name: string
  email: string
  phone: string
  message: string
  productInterest?: string
  preferredContact: 'email' | 'phone' | 'whatsapp'
}

export interface InquiryForm {
  productId: string
  productName: string
  customerName: string
  customerEmail: string
  customerPhone: string
  message: string
  urgency: 'low' | 'medium' | 'high'
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ProductsResponse {
  products: JewelryProduct[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Filter Types
export interface ProductFilters {
  category?: 'watch' | 'gold' | 'diamond'
  brand?: string[]
  priceRange?: [number, number]
  material?: string[]
  availability?: ('in-stock' | 'made-to-order')[]
  featured?: boolean
  newArrival?: boolean
  bestSeller?: boolean
  sortBy?: 'name' | 'price' | 'date' | 'popularity'
  sortOrder?: 'asc' | 'desc'
}

// Responsive Design Types
export interface BreakpointConfig {
  mobile: number
  tablet: number
  desktop: number
  wide: number
}

// Performance Types
export interface PerformanceMetrics {
  fps: number
  renderTime: number
  memoryUsage: number
  loadTime: number
}

export interface OptimizationSettings {
  enableShadows: boolean
  shadowMapSize: number
  antialias: boolean
  pixelRatio: number
  maxLights: number
  lodEnabled: boolean
}