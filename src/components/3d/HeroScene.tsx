'use client'

import React, { useRef, useEffect, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  Environment,
  Float,
  useGLTF
} from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MaterialUtils, LightingUtils } from '@/lib/three'
import { DeviceUtils } from '@/lib/utils'

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Floating jewelry piece component
const FloatingJewelry: React.FC<{
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  modelPath?: string
}> = ({ position, rotation, scale, modelPath = '/models/ring.glb' }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  // Load 3D model (with fallback geometry)
  const { scene } = useGLTF(modelPath, true)
  
  // Create fallback geometry if model fails to load
  const fallbackGeometry = useMemo(() => {
    // Different shapes based on model path
    if (modelPath.includes('ring')) {
      return new THREE.TorusGeometry(0.5, 0.2, 16, 100)
    } else if (modelPath.includes('watch')) {
      return new THREE.CylinderGeometry(0.6, 0.6, 0.3, 32)
    } else if (modelPath.includes('necklace')) {
      return new THREE.SphereGeometry(0.3, 16, 16)
    }
    return new THREE.TorusGeometry(0.5, 0.2, 16, 100) // default
  }, [modelPath])
  const roseGoldMaterial = useMemo(() => MaterialUtils.createRoseGoldMaterial('/textures/rose-gold.jpg'), [])

  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.getElapsedTime()
    
    // Floating animation
    groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.3
    
    // Rotation animation
    groupRef.current.rotation.y += 0.005
    groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.1
  })

  useEffect(() => {
    if (!groupRef.current) return

    // Initial animation
    gsap.fromTo(groupRef.current.scale, 
      { x: 0, y: 0, z: 0 },
      { 
        x: scale, 
        y: scale, 
        z: scale, 
        duration: 2, 
        ease: 'back.out(1.7)',
        delay: Math.random() * 2
      }
    )
  }, [scale])

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <Float
        speed={2}
        rotationIntensity={0.5}
        floatIntensity={0.5}
        floatingRange={[0, 0.5]}
      >
        {scene ? (
          <primitive object={scene.clone()} scale={scale} />
        ) : (
          <mesh ref={meshRef} geometry={fallbackGeometry} material={roseGoldMaterial} scale={scale} />
        )}
      </Float>
    </group>
  )
}

// Particle system for sparkle effects
const ParticleSystem: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = DeviceUtils.isMobile() ? 50 : 100

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Positions in a sphere around the scene
      const radius = 15 + Math.random() * 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.cos(phi)
      positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta)

      // Golden colors
      const intensity = 0.5 + Math.random() * 0.5
      colors[i3] = 1 * intensity     // R
      colors[i3 + 1] = 0.8 * intensity // G
      colors[i3 + 2] = 0.4 * intensity // B
    }

    return { positions, colors }
  }, [particleCount])

  useFrame((state) => {
    if (!pointsRef.current) return

    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.05
    
    // Twinkle effect
    const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positionsArray[i3 + 1] += Math.sin(time * 2 + i) * 0.01
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Main 3D scene component
const Scene: React.FC = () => {
  const { camera, scene } = useThree()
  
  useEffect(() => {
    // Setup luxury lighting
    LightingUtils.createLuxuryLighting(scene)
    
    // Camera animation on scroll
    gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          camera.position.y = 5 + progress * 3
          camera.position.z = 10 - progress * 2
        }
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [camera, scene])

  const jewelryPositions: Array<{
    position: [number, number, number]
    rotation: [number, number, number]
    scale: number
  }> = [
    { position: [-4, 2, -2], rotation: [0, 0, 0], scale: 0.8 },
    { position: [4, 1, -3], rotation: [0, Math.PI / 4, 0], scale: 1.2 },
    { position: [-2, -1, -1], rotation: [Math.PI / 6, 0, 0], scale: 1.0 },
    { position: [3, -2, -4], rotation: [0, -Math.PI / 3, 0], scale: 0.9 },
    { position: [0, 3, -5], rotation: [Math.PI / 4, Math.PI / 2, 0], scale: 1.1 },
  ]

  return (
    <>
      {/* Particle system */}
      <ParticleSystem />
      
      {/* Floating jewelry pieces */}
      {jewelryPositions.map((item, index) => (
        <FloatingJewelry
          key={index}
          position={item.position}
          rotation={item.rotation}
          scale={item.scale}
        />
      ))}

      {/* Environment and lighting */}
      <Environment preset="studio" />
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      
      {/* Key lighting */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      
      {/* Fill lighting */}
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.3}
        color="#8EC5FF"
      />
    </>
  )
}

// Loading fallback component
const LoadingFallback: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-rose-gold-200 border-t-rose-gold-500 rounded-full animate-spin" />
  </div>
)

// Main Hero Scene component
const HeroScene: React.FC<{ className?: string }> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-screen ${className}`}
    >
      <Canvas
        shadows
        camera={{ position: [0, 5, 10], fov: 45 }}
        gl={{ 
          antialias: !DeviceUtils.isMobile(),
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={DeviceUtils.getDevicePixelRatio()}
      >
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={!DeviceUtils.isTouchDevice()}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
      
      <Suspense fallback={<LoadingFallback />}>
        {/* This will be rendered if the main Canvas is still loading */}
      </Suspense>
    </div>
  )
}

// Preload models for better performance
useGLTF.preload('/models/ring.glb')
useGLTF.preload('/models/necklace.glb')
useGLTF.preload('/models/watch.glb')

export default HeroScene