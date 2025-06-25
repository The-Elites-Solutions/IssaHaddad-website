import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import type { ScrollAnimationConfig, GSAPTimelineConfig } from '@/types'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin, MorphSVGPlugin)
}

// Global GSAP settings
gsap.config({
  force3D: true,
  nullTargetWarn: false,
})

// Custom GSAP utilities
export class GSAPUtils {
  // Initialize scroll-based animations
  static initScrollAnimations(): void {
    ScrollTrigger.refresh()
  }

  // Create a luxury fade-in animation
  static fadeInUp(
    element: string | Element,
    options: {
      delay?: number
      duration?: number
      y?: number
      ease?: string
      stagger?: number
    } = {}
  ): gsap.core.Tween {
    const {
      delay = 0,
      duration = 0.8,
      y = 50,
      ease = "power3.out",
      stagger = 0.1
    } = options

    return gsap.fromTo(element, 
      {
        opacity: 0,
        y: y,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration,
        delay,
        ease,
        stagger
      }
    )
  }

  // Create a luxury fade-in from left
  static fadeInLeft(
    element: string | Element,
    options: {
      delay?: number
      duration?: number
      x?: number
      ease?: string
      stagger?: number
    } = {}
  ): gsap.core.Tween {
    const {
      delay = 0,
      duration = 0.8,
      x = -100,
      ease = "power3.out",
      stagger = 0.1
    } = options

    return gsap.fromTo(element,
      {
        opacity: 0,
        x: x,
        scale: 0.95
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration,
        delay,
        ease,
        stagger
      }
    )
  }

  // Create a luxury scale animation
  static scaleIn(
    element: string | Element,
    options: {
      delay?: number
      duration?: number
      scale?: number
      ease?: string
    } = {}
  ): gsap.core.Tween {
    const {
      delay = 0,
      duration = 0.6,
      scale = 0.8,
      ease = "back.out(1.7)"
    } = options

    return gsap.fromTo(element,
      {
        opacity: 0,
        scale: scale
      },
      {
        opacity: 1,
        scale: 1,
        duration,
        delay,
        ease
      }
    )
  }

  // Create a luxury text reveal animation
  static textReveal(
    element: string | Element,
    options: {
      delay?: number
      duration?: number
      ease?: string
      stagger?: number
    } = {}
  ): gsap.core.Tween {
    const {
      delay = 0,
      duration = 0.8,
      ease = "power3.out",
      stagger = 0.05
    } = options

    // Split text into characters for animation
    const chars = (element as HTMLElement).textContent?.split('') || []
    const charElements = chars.map((char) => {
      const span = document.createElement('span')
      span.textContent = char === ' ' ? '\u00A0' : char
      span.style.display = 'inline-block'
      return span
    });

    (element as HTMLElement).innerHTML = ''
    charElements.forEach(span => (element as HTMLElement).appendChild(span))

    return gsap.fromTo(charElements,
      {
        opacity: 0,
        y: 50,
        rotationX: -90
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration,
        delay,
        ease,
        stagger
      }
    )
  }

  // Create scroll-triggered animation
  static scrollTriggerAnimation(
    element: string | Element,
    animation: gsap.core.Tween | gsap.core.Timeline,
    config: ScrollAnimationConfig
  ): ScrollTrigger {
    return ScrollTrigger.create({
      trigger: element,
      start: config.start,
      end: config.end,
      scrub: config.scrub,
      pin: config.pin,
      anticipatePin: config.anticipatePin,
      animation: animation,
      onEnter: config.onEnter,
      onLeave: config.onLeave,
      onUpdate: config.onUpdate,
    })
  }

  // Create conveyor belt scroll animation
  static conveyorScrollAnimation(
    conveyorElement: string | Element,
    options: {
      distance: number
      ease?: string
      onUpdate?: (progress: number) => void
    }
  ): ScrollTrigger {
    const { distance, ease = "none", onUpdate } = options

    const tl = gsap.timeline()
    tl.to(conveyorElement, {
      x: -distance,
      ease: ease,
      duration: 1
    })

    return ScrollTrigger.create({
      trigger: conveyorElement,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      animation: tl,
      onUpdate: (self) => {
        if (onUpdate) {
          onUpdate(self.progress)
        }
      }
    })
  }

  // Create floating animation for jewelry
  static floatingAnimation(
    element: string | Element,
    options: {
      amplitude?: number
      duration?: number
      ease?: string
      rotation?: boolean
    } = {}
  ): gsap.core.Timeline {
    const {
      amplitude = 20,
      duration = 4,
      ease = "sine.inOut",
      rotation = true
    } = options

    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    
    tl.to(element, {
      y: amplitude,
      duration: duration,
      ease: ease
    })

    if (rotation) {
      gsap.to(element, {
        rotation: 360,
        duration: duration * 4,
        repeat: -1,
        ease: "none"
      })
    }

    return tl
  }

  // Create particle effect animation
  static particleAnimation(
    particles: (string | Element)[],
    options: {
      spread?: number
      duration?: number
      ease?: string
      stagger?: number
    } = {}
  ): gsap.core.Timeline {
    const {
      spread = 200,
      duration = 2,
      ease = "power2.out",
      stagger = 0.1
    } = options

    const tl = gsap.timeline()

    particles.forEach((particle, i) => {
      const angle = (i / particles.length) * Math.PI * 2
      const x = Math.cos(angle) * spread
      const y = Math.sin(angle) * spread

      tl.fromTo(particle,
        {
          opacity: 0,
          scale: 0,
          x: 0,
          y: 0
        },
        {
          opacity: 1,
          scale: 1,
          x: x,
          y: y,
          duration: duration,
          ease: ease
        },
        i * stagger
      )
    })

    return tl
  }

  // Create luxury button hover animation
  static buttonHover(element: string | Element): void {
    const btn = typeof element === 'string' ? document.querySelector(element) : element
    if (!btn) return

    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        scale: 1.05,
        y: -2,
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        duration: 0.3,
        ease: "power2.out"
      })
    })

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        scale: 1,
        y: 0,
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        duration: 0.3,
        ease: "power2.out"
      })
    })
  }

  // Create page transition
  static pageTransition(
    outElement: string | Element,
    inElement: string | Element,
    options: {
      duration?: number
      ease?: string
      onComplete?: () => void
    } = {}
  ): gsap.core.Timeline {
    const { duration = 0.8, ease = "power2.inOut", onComplete } = options

    const tl = gsap.timeline({ onComplete })

    // Fade out current page
    tl.to(outElement, {
      opacity: 0,
      y: -50,
      duration: duration / 2,
      ease: ease
    })

    // Fade in new page
    tl.fromTo(inElement,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: duration / 2,
        ease: ease
      }
    )

    return tl
  }

  // Create timeline with luxury defaults
  static createTimeline(config: GSAPTimelineConfig = {}): gsap.core.Timeline {
    return gsap.timeline({
      paused: config.paused || false,
      repeat: config.repeat || 0,
      yoyo: config.yoyo || false,
      delay: config.delay || 0,
      onComplete: config.onComplete,
      onUpdate: config.onUpdate
    })
  }

  // Cleanup all GSAP animations and ScrollTriggers
  static cleanup(): void {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    gsap.globalTimeline.clear()
  }

  // Refresh ScrollTrigger (useful for dynamic content)
  static refresh(): void {
    ScrollTrigger.refresh()
  }

  // Kill specific ScrollTrigger
  static killScrollTrigger(trigger: string | Element): void {
    ScrollTrigger.getById(trigger as string)?.kill()
  }
}

// Animation presets for common luxury effects
export const LuxuryAnimations = {
  // Jewelry showcase entrance
  jewelryEntrance: (element: string | Element) => {
    return GSAPUtils.createTimeline()
      .fromTo(element,
        {
          opacity: 0,
          scale: 0.8,
          rotationY: 180,
          z: -100
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          z: 0,
          duration: 1.2,
          ease: "back.out(1.7)"
        }
      )
      .to(element, {
        boxShadow: "0 20px 40px rgba(212, 175, 116, 0.3)",
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.5")
  },

  // Text reveal with luxury feel
  luxuryTextReveal: (element: string | Element) => {
    return GSAPUtils.textReveal(element, {
      duration: 1,
      ease: "power3.out",
      stagger: 0.03
    })
  },

  // Card flip animation
  cardFlip: (card: string | Element, front: string | Element, back: string | Element) => {
    const tl = GSAPUtils.createTimeline()
    
    tl.to(card, {
      rotationY: 90,
      duration: 0.3,
      ease: "power2.in"
    })
    .set(front, { display: "none" })
    .set(back, { display: "block" })
    .to(card, {
      rotationY: 0,
      duration: 0.3,
      ease: "power2.out"
    })

    return tl
  },

  // Luxury loading animation
  luxuryLoader: (element: string | Element) => {
    return gsap.to(element, {
      rotation: 360,
      duration: 2,
      repeat: -1,
      ease: "none",
      transformOrigin: "center center"
    })
  }
}

export { gsap, ScrollTrigger }
export default GSAPUtils