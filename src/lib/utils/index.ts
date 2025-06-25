import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Vector3 } from 'three'

// Tailwind CSS utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 3D Utilities
export class Vector3Utils {
  static toArray(vector: Vector3): [number, number, number] {
    return [vector.x, vector.y, vector.z]
  }
  
  static fromArray(array: [number, number, number]): Vector3 {
    return new Vector3(array[0], array[1], array[2])
  }
  
  static lerp(start: Vector3, end: Vector3, alpha: number): Vector3 {
    return new Vector3().lerpVectors(start, end, alpha)
  }
  
  static distance(a: Vector3, b: Vector3): number {
    return a.distanceTo(b)
  }
  
  static normalize(vector: Vector3): Vector3 {
    return vector.clone().normalize()
  }
}

// Animation Utilities
export class AnimationUtils {
  static easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  }
  
  static easeOutQuart(t: number): number {
    return 1 - Math.pow(1 - t, 4)
  }
  
  static easeInOutQuart(t: number): number {
    return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
  }
  
  static spring(t: number, tension: number = 0.8): number {
    return Math.pow(2, -10 * t) * Math.sin((t - tension / 4) * (2 * Math.PI) / tension) + 1
  }
  
  static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
  }
  
  static lerp(start: number, end: number, alpha: number): number {
    return start * (1 - alpha) + end * alpha
  }
  
  static smoothstep(min: number, max: number, value: number): number {
    const x = Math.max(0, Math.min(1, (value - min) / (max - min)))
    return x * x * (3 - 2 * x)
  }
}

// Scroll Utilities
export class ScrollUtils {
  static getScrollProgress(element: HTMLElement): number {
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const elementHeight = rect.height
    
    const scrollProgress = Math.max(0, Math.min(1, 
      (windowHeight - rect.top) / (windowHeight + elementHeight)
    ))
    
    return scrollProgress
  }
  
  static isElementInViewport(element: HTMLElement, threshold: number = 0): boolean {
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth
    
    return (
      rect.top >= -threshold &&
      rect.left >= -threshold &&
      rect.bottom <= windowHeight + threshold &&
      rect.right <= windowWidth + threshold
    )
  }
  
  static smoothScrollTo(element: HTMLElement, offset: number = 0): void {
    const targetPosition = element.offsetTop - offset
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })
  }
}

// Performance Utilities
export class PerformanceUtils {
  private static lastTime = 0
  private static frameCount = 0
  private static fps = 0
  
  static measureFPS(): number {
    const now = performance.now()
    this.frameCount++
    
    if (now >= this.lastTime + 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime))
      this.frameCount = 0
      this.lastTime = now
    }
    
    return this.fps
  }
  
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null
    
    return (...args: Parameters<T>) => {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  }
  
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean = false
    
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }
  
  static requestIdleCallback(callback: () => void): void {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(callback)
    } else {
      setTimeout(callback, 1)
    }
  }
}

// Device Detection Utilities
export class DeviceUtils {
  static isMobile(): boolean {
    return typeof window !== 'undefined' && window.innerWidth < 768
  }
  
  static isTablet(): boolean {
    return typeof window !== 'undefined' && 
           window.innerWidth >= 768 && 
           window.innerWidth < 1024
  }
  
  static isDesktop(): boolean {
    return typeof window !== 'undefined' && window.innerWidth >= 1024
  }
  
  static isTouchDevice(): boolean {
    return typeof window !== 'undefined' && 
           ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }
  
  static getDevicePixelRatio(): number {
    return typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
  }
  
  static supportsWebGL(): boolean {
    if (typeof window === 'undefined') return false
    
    try {
      const canvas = document.createElement('canvas')
      return !!(window.WebGLRenderingContext && 
               (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
    } catch (e) {
      return false
    }
  }
  
  static getGPUTier(): 'low' | 'medium' | 'high' {
    if (!this.supportsWebGL()) return 'low'
    
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null
    
    if (!gl) return 'low'
    
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    if (!debugInfo) return 'medium'
    
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase()
    
    if (renderer.includes('nvidia') || renderer.includes('radeon')) {
      return 'high'
    } else if (renderer.includes('intel')) {
      return 'medium'
    }
    
    return 'medium'
  }
}

// Format Utilities
export class FormatUtils {
  static currency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount)
  }
  
  static number(num: number): string {
    return new Intl.NumberFormat('en-US').format(num)
  }
  
  static phone(phoneNumber: string): string {
    const cleaned = phoneNumber.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`
    }
    
    return phoneNumber
  }
  
  static truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }
  
  static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }
  
  static slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-')
  }
}

// Color Utilities
export class ColorUtils {
  static hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }
  
  static rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }
  
  static adjustBrightness(hex: string, percent: number): string {
    const rgb = this.hexToRgb(hex)
    if (!rgb) return hex
    
    const adjust = (color: number) => {
      const adjusted = Math.round(color * (100 + percent) / 100)
      return Math.max(0, Math.min(255, adjusted))
    }
    
    return this.rgbToHex(adjust(rgb.r), adjust(rgb.g), adjust(rgb.b))
  }
  
  static getContrastColor(hex: string): string {
    const rgb = this.hexToRgb(hex)
    if (!rgb) return '#000000'
    
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
    return brightness > 128 ? '#000000' : '#ffffff'
  }
}

// Validation Utilities
export class ValidationUtils {
  static email(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  static phone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    const cleaned = phone.replace(/[^\d\+]/g, '')
    return phoneRegex.test(cleaned)
  }
  
  static required(value: string): boolean {
    return value.trim().length > 0
  }
  
  static minLength(value: string, min: number): boolean {
    return value.length >= min
  }
  
  static maxLength(value: string, max: number): boolean {
    return value.length <= max
  }
  
  static url(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }
}

// Storage Utilities
export class StorageUtils {
  static setItem(key: string, value: any): void {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn('Failed to save to localStorage:', error)
    }
  }
  
  static getItem<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue
    
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.warn('Failed to read from localStorage:', error)
      return defaultValue
    }
  }
  
  static removeItem(key: string): void {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error)
    }
  }
  
  static clear(): void {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.clear()
    } catch (error) {
      console.warn('Failed to clear localStorage:', error)
    }
  }
}

// URL Utilities
export class URLUtils {
  static getQueryParam(param: string): string | null {
    if (typeof window === 'undefined') return null
    
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(param)
  }
  
  static setQueryParam(param: string, value: string): void {
    if (typeof window === 'undefined') return
    
    const url = new URL(window.location.href)
    url.searchParams.set(param, value)
    window.history.replaceState({}, '', url.toString())
  }
  
  static removeQueryParam(param: string): void {
    if (typeof window === 'undefined') return
    
    const url = new URL(window.location.href)
    url.searchParams.delete(param)
    window.history.replaceState({}, '', url.toString())
  }
  
  static generateWhatsAppURL(phone: string, message: string): string {
    const encodedMessage = encodeURIComponent(message)
    const cleanPhone = phone.replace(/[^\d\+]/g, '')
    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`
  }
}

// Math Utilities for 3D
export class MathUtils {
  static degToRad(degrees: number): number {
    return degrees * (Math.PI / 180)
  }
  
  static radToDeg(radians: number): number {
    return radians * (180 / Math.PI)
  }
  
  static map(value: number, start1: number, stop1: number, start2: number, stop2: number): number {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
  }
  
  static random(min: number, max: number): number {
    return Math.random() * (max - min) + min
  }
  
  static randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  
  static isPowerOfTwo(value: number): boolean {
    return (value & (value - 1)) === 0
  }
  
  static nearestPowerOfTwo(value: number): number {
    return Math.pow(2, Math.round(Math.log(value) / Math.log(2)))
  }
}

