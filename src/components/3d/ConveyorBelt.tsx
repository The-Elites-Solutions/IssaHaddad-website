'use client'

import React, { useRef, useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Box, Cylinder } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MaterialUtils, GeometryUtils, LightingUtils } from '@/lib/three'
import { useConveyorState, useAppStore } from '@/lib/store/app-store'
import { AnimationUtils } from '@/lib/utils'
import type { JewelryProduct, ConveyorBeltConfig, GlassCaseConfig } from '@/types'

interface ConveyorBeltProps {
  products: JewelryProduct[]
  category: 'watch' | 'gold' | 'diamond'
  config?: Partial<ConveyorBeltConfig>
}

// Glass Case Component
const GlassCase: React.FC<{
  position: [number, number, number]
  product: JewelryProduct
  isActive: boolean
  caseIndex: number
  onActivate: (index: number) => void
}> = ({ position, product, isActive, caseIndex, onActivate }) => {
  const groupRef = useRef<THREE.Group>(null)
  const frameRef = useRef<THREE.Mesh>(null)
  const glassRef = useRef<THREE.Mesh[]>([])
  const productRef = useRef<THREE.Group>(null)
  const lightRef = useRef<THREE.SpotLight>(null)

  // Materials
  const frameMaterial = useMemo(() => MaterialUtils.createRoseGoldMaterial('/textures/rose-gold.jpg'), [])
  const glassMaterial = useMemo(() => MaterialUtils.createGlassMaterial(), [])

  // Glass case geometry
  const caseGeometry = useMemo(() => {
    const config: GlassCaseConfig = {
      width: 3,
      height: 4,
      depth: 3,
      glassThickness: 0.1,
      frameColor: '#E8B4A0',
      lighting: {
        intensity: 2,
        color: '#ffffff',
        position: [0, 3, 0],
        castShadow: true
      }
    }
    return GeometryUtils.createGlassCase(config.width, config.height, config.depth, config.glassThickness)
  }, [])

  // Load product 3D model
  const { scene: productScene } = useGLTF(product.model3D.path, true)

  useFrame((state) => {
    if (!groupRef.current || !productRef.current || !lightRef.current) return

    const time = state.clock.getElapsedTime()

    if (isActive) {
      // Active case animations
      groupRef.current.scale.setScalar(AnimationUtils.lerp(groupRef.current.scale.x, 1.2, 0.05))
      
      // Product rotation
      productRef.current.rotation.y = time * 0.5
      
      // Enhanced lighting
      lightRef.current.intensity = AnimationUtils.lerp(lightRef.current.intensity, 3, 0.1)
      
      // Gentle floating
      productRef.current.position.y = Math.sin(time * 2) * 0.1
    } else {
      // Inactive case animations
      groupRef.current.scale.setScalar(AnimationUtils.lerp(groupRef.current.scale.x, 1, 0.05))
      
      // Slower rotation
      productRef.current.rotation.y = time * 0.2
      
      // Standard lighting
      lightRef.current.intensity = AnimationUtils.lerp(lightRef.current.intensity, 1.5, 0.1)
      
      // Reset position
      productRef.current.position.y = AnimationUtils.lerp(productRef.current.position.y, 0, 0.1)
    }
  })

  // Handle mouse interactions
  const handlePointerOver = () => {
    if (!isActive && groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: 1.1,
        y: 1.1,
        z: 1.1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }

  const handlePointerOut = () => {
    if (!isActive && groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }

  const handleClick = () => {
    onActivate(caseIndex)
  }

  return (
    <group 
      ref={groupRef} 
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {/* Case Frame */}
      <Box
        ref={frameRef}
        args={[3.2, 4.2, 3.2]}
        material={frameMaterial}
        position={[0, 0, 0]}
      />

      {/* Glass Panels */}
      {caseGeometry.glass.map((geometry, index) => {
        const positions: [number, number, number][] = [
          [0, 0, 1.5],   // front
          [0, 0, -1.5],  // back
          [-1.5, 0, 0],  // left
          [1.5, 0, 0],   // right
          [0, 2, 0],     // top
        ]
        
        const rotations: [number, number, number][] = [
          [0, 0, 0],           // front
          [0, Math.PI, 0],     // back
          [0, Math.PI / 2, 0], // left
          [0, -Math.PI / 2, 0], // right
          [Math.PI / 2, 0, 0], // top
        ]

        return (
          <mesh
            key={index}
            ref={(el) => {
              if (el) glassRef.current[index] = el
            }}
            geometry={geometry}
            material={glassMaterial}
            position={positions[index]}
            rotation={rotations[index]}
          />
        )
      })}

      {/* Product Display */}
      <group ref={productRef} position={[0, -1, 0]}>
        {productScene ? (
          <primitive 
            object={productScene.clone()} 
            scale={product.model3D.scale}
            position={product.model3D.position}
            rotation={product.model3D.rotation}
          />
        ) : (
          <mesh>
            {product.category === 'watch' && <cylinderGeometry args={[0.6, 0.6, 0.3, 32]} />}
            {product.category === 'gold' && product.subcategory === 'rings' && <torusGeometry args={[0.5, 0.2, 16, 100]} />}
            {product.category === 'gold' && product.subcategory === 'necklaces' && <sphereGeometry args={[0.3, 16, 16]} />}
            {product.category === 'gold' && product.subcategory === 'bracelets' && <torusGeometry args={[0.4, 0.15, 12, 50]} />}
            {product.category === 'diamond' && <octahedronGeometry args={[0.4, 2]} />}
            {(!product.category || (product.category === 'gold' && !['rings', 'necklaces', 'bracelets'].includes(product.subcategory))) && <boxGeometry args={[0.5, 0.5, 0.5]} />}
            <meshPhysicalMaterial 
              color={product.category === 'gold' ? '#D4AF37' : product.category === 'diamond' ? '#ffffff' : '#333333'}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        )}
      </group>

      {/* Spotlight for product */}
      <spotLight
        ref={lightRef}
        position={[0, 3, 0]}
        target={productRef.current || undefined}
        intensity={isActive ? 3 : 1.5}
        angle={Math.PI * 0.15}
        penumbra={0.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Interior lighting */}
      <pointLight
        position={[0, 1, 0]}
        intensity={0.5}
        color="#F7E7CE"
        distance={4}
      />
    </group>
  )
}

// Main Conveyor Belt Component
const ConveyorBelt: React.FC<ConveyorBeltProps> = ({ 
  products, 
  category,
  config = {}
}) => {
  const conveyorRef = useRef<THREE.Group>(null)
  const beltRef = useRef<THREE.Mesh>(null)
  const { camera, scene } = useThree()
  const { activeCase, setPosition, setActiveCase } = useConveyorState()
  const setCurrentProduct = useAppStore((state) => state.setCurrentProduct)

  // Conveyor configuration
  const beltConfig: ConveyorBeltConfig = {
    beltLength: products.length * 8,
    beltWidth: 12,
    beltHeight: 0.5,
    speed: 1,
    caseCount: products.length,
    caseSpacing: 8,
    ...config
  }

  // Belt material based on category
  const beltMaterial = useMemo(() => {
    const baseColor = category === 'gold' ? '#2C2C2C' : category === 'diamond' ? '#1A1A1A' : '#333333'
    return new THREE.MeshStandardMaterial({
      color: baseColor,
      metalness: 0.8,
      roughness: 0.3,
    })
  }, [category])

  // Setup scroll-based animation
  useEffect(() => {
    if (!conveyorRef.current) return undefined

    const scrollTrigger = ScrollTrigger.create({
      trigger: '.conveyor-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress
        const newPosition = progress * beltConfig.beltLength * 0.8
        setPosition(newPosition)

        // Calculate active case based on position
        const newActiveCase = Math.floor((newPosition / beltConfig.caseSpacing) + 0.5) % products.length
        if (newActiveCase !== activeCase && newActiveCase >= 0) {
          setActiveCase(newActiveCase)
          setCurrentProduct(products[newActiveCase])
        }

        // Update conveyor position
        if (conveyorRef.current) {
          conveyorRef.current.position.x = -newPosition
        }

        // Camera following
        camera.position.x = AnimationUtils.lerp(camera.position.x, -newPosition * 0.1, 0.1)
      }
    })

    return () => {
      scrollTrigger.kill()
    }
  }, [products, activeCase, beltConfig, camera, setPosition, setActiveCase, setCurrentProduct])

  // Lighting setup based on category
  useEffect(() => {
    const lights = LightingUtils.createLuxuryLighting(scene)
    
    // Category-specific lighting adjustments
    if (category === 'diamond') {
      // Enhance lighting for diamonds
      lights.mainLight.intensity = 1.5
      lights.rimLight.intensity = 0.8
    } else if (category === 'gold') {
      // Warm lighting for gold
      lights.mainLight.color.setHex(0xFFE4B5)
      lights.fillLight.intensity = 0.6
    }

    return () => {
      // Cleanup lights if needed
    }
  }, [category, scene])

  // Handle case activation
  const handleCaseActivation = (caseIndex: number) => {
    setActiveCase(caseIndex)
    setCurrentProduct(products[caseIndex])
    
    // Smooth scroll to active case
    const targetPosition = caseIndex * beltConfig.caseSpacing
    if (conveyorRef.current) {
      gsap.to(conveyorRef.current.position, {
        x: -targetPosition,
        duration: 1,
        ease: 'power2.out'
      })
    }
  }

  // Generate case positions
  const casePositions = useMemo(() => {
    return products.map((_, index) => {
      return [
        index * beltConfig.caseSpacing,
        beltConfig.beltHeight + 2,
        0
      ] as [number, number, number]
    })
  }, [products.length, beltConfig])

  return (
    <group ref={conveyorRef}>
      {/* Conveyor Belt Base */}
      <Box
        ref={beltRef}
        args={[beltConfig.beltLength, beltConfig.beltHeight, beltConfig.beltWidth]}
        material={beltMaterial}
        position={[beltConfig.beltLength / 2 - beltConfig.caseSpacing, 0, 0]}
        receiveShadow
      />

      {/* Belt Support Structure */}
      <Cylinder
        args={[0.3, 0.3, beltConfig.beltWidth + 2]}
        material={beltMaterial}
        position={[0, -1, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />
      
      <Cylinder
        args={[0.3, 0.3, beltConfig.beltWidth + 2]}
        material={beltMaterial}
        position={[beltConfig.beltLength - beltConfig.caseSpacing, -1, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />

      {/* Glass Cases with Products */}
      {products.map((product, index) => (
        <GlassCase
          key={product.id}
          position={casePositions[index]}
          product={product}
          isActive={index === activeCase}
          caseIndex={index}
          onActivate={handleCaseActivation}
        />
      ))}

      {/* Environmental Lighting */}
      <ambientLight intensity={0.3} />
      
      {/* Category-specific accent lighting */}
      {category === 'diamond' && (
        <>
          <pointLight position={[10, 10, 5]} intensity={0.5} color="#E0E7FF" />
          <pointLight position={[-10, 10, -5]} intensity={0.5} color="#E0E7FF" />
        </>
      )}
      
      {category === 'gold' && (
        <>
          <pointLight position={[10, 10, 5]} intensity={0.4} color="#FFE4B5" />
          <pointLight position={[-10, 10, -5]} intensity={0.4} color="#FFE4B5" />
        </>
      )}
    </group>
  )
}

// Preload common jewelry models
useGLTF.preload('/models/watch-1.glb')
useGLTF.preload('/models/gold-ring.glb')
useGLTF.preload('/models/diamond-earrings.glb')

export default ConveyorBelt