'use client'

import React, { useRef, useEffect, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
    OrbitControls,
    Environment,
    Float,
    useGLTF,
    Clouds,
    Cloud
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

// Mountain geometry component
const Mountain: React.FC = () => {
    const mountainRef = useRef<THREE.Mesh>(null)

    // Create mountain geometry based on your provided images
    const mountainGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry()

        // Define the mountain shape based on your 3-peak design
        const vertices = new Float32Array([
            // Base vertices (forming the base of the mountain)
            -8, 0, 4,   // left back
            8, 0, 4,    // right back
            8, 0, -4,   // right front
            -8, 0, -4,  // left front

            // First peak (left) - coordinates for the triangular peak
            -4, 6, 0,   // peak 1 top
            -6, 3, 2,   // peak 1 left
            -6, 3, -2,  // peak 1 right
            -2, 3, 2,   // peak 1 inner left
            -2, 3, -2,  // peak 1 inner right

            // Second peak (center, highest) - main peak
            0, 8, 0,    // peak 2 top (highest)
            -2, 5, 2,   // peak 2 left
            -2, 5, -2,  // peak 2 right
            2, 5, 2,    // peak 2 inner left
            2, 5, -2,   // peak 2 inner right

            // Third peak (right)
            4, 6, 0,    // peak 3 top
            2, 3, 2,    // peak 3 left
            2, 3, -2,   // peak 3 right
            6, 3, 2,    // peak 3 inner left
            6, 3, -2,   // peak 3 inner right
        ])

        // Define faces (triangles) to form the mountain
        const indices = new Uint16Array([
            // Base faces
            0, 1, 2,  0, 2, 3,

            // Left peak faces
            4, 5, 6,  4, 6, 7,  4, 7, 8,  5, 0, 6,  6, 3, 8,

            // Center peak faces
            9, 10, 11,  9, 11, 12,  9, 12, 13,  10, 5, 11,  11, 8, 12,  12, 7, 13,

            // Right peak faces
            14, 15, 16,  14, 16, 17,  14, 17, 18,  15, 7, 16,  16, 8, 17,  17, 1, 18,

            // Connection faces between peaks and base
            0, 5, 10,  5, 9, 10,  8, 13, 14,  13, 15, 14,  1, 17, 2,  17, 18, 2
        ])

        geometry.setIndex(Array.from(indices))
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
        geometry.computeVertexNormals()

        return geometry
    }, [])

    // Mountain material with icy blue texture
    const mountainMaterial = useMemo(() => {
        const material = new THREE.MeshStandardMaterial({
            color: '#87CEEB',  // Sky blue base
            roughness: 0.7,
            metalness: 0.1,
            transparent: true,
            opacity: 0.9
        })

        return material
    }, [])

    return (
        <mesh
            ref={mountainRef}
            geometry={mountainGeometry}
            material={mountainMaterial}
            position={[0, -2, 0]}
            receiveShadow
            castShadow
        >
        </mesh>
    )
}

// Collection piece component that floats on mountain peaks
const CollectionPiece: React.FC<{
    position: [number, number, number]
    productData: {
        name: string
        category: string
        modelPath: string
    }
    index: number
}> = ({ position, productData, index }) => {
    const meshRef = useRef<THREE.Mesh>(null)
    const groupRef = useRef<THREE.Group>(null)

    // Load 3D model with fallback
    const { scene } = useGLTF(productData.modelPath, true)

    // Fallback geometry based on category
    const fallbackGeometry = useMemo(() => {
        switch (productData.category) {
            case 'watch':
                return new THREE.CylinderGeometry(0.6, 0.6, 0.3, 32)
            case 'gold':
                return new THREE.TorusGeometry(0.5, 0.2, 16, 100)
            case 'diamond':
                return new THREE.OctahedronGeometry(0.4, 2)
            default:
                return new THREE.SphereGeometry(0.4, 16, 16)
        }
    }, [productData.category])

    const fallbackMaterial = useMemo(() => {
        switch (productData.category) {
            case 'watch':
                return new THREE.MeshStandardMaterial({ color: '#2C3E50', metalness: 0.8, roughness: 0.2 })
            case 'gold':
                return MaterialUtils.createRoseGoldMaterial()
            case 'diamond':
                return new THREE.MeshPhysicalMaterial({
                    color: '#FFFFFF',
                    transmission: 0.9,
                    roughness: 0.1,
                    thickness: 0.5,
                    envMapIntensity: 2
                })
            default:
                return new THREE.MeshStandardMaterial({ color: '#FFD700', metalness: 0.7, roughness: 0.3 })
        }
    }, [productData.category])

    // Animation
    useFrame((state) => {
        if (!groupRef.current) return

        const time = state.clock.getElapsedTime()

        // Floating animation with different speeds for each piece
        groupRef.current.position.y = position[1] + Math.sin(time * (0.5 + index * 0.2)) * 0.4

        // Rotation animation
        groupRef.current.rotation.y += 0.003 + index * 0.001
        groupRef.current.rotation.x = Math.sin(time * 0.4) * 0.1
    })

    // Entrance animation
    useEffect(() => {
        if (!groupRef.current) return

        gsap.fromTo(groupRef.current.scale,
            { x: 0, y: 0, z: 0 },
            {
                x: 1.5,
                y: 1.5,
                z: 1.5,
                duration: 2,
                ease: 'back.out(1.7)',
                delay: 1 + index * 0.5
            }
        )
    }, [index])

    return (
        <group ref={groupRef} position={position}>
            <Float
                speed={1.5}
                rotationIntensity={0.3}
                floatIntensity={0.3}
                floatingRange={[0, 0.3]}
            >
                {scene ? (
                    <primitive object={scene.clone()} scale={1.5} />
                ) : (
                    <mesh ref={meshRef} geometry={fallbackGeometry} material={fallbackMaterial} scale={1.5} />
                )}

                {/* Product label */}
                <group position={[0, -1.5, 0]}>
                    <mesh>
                        <planeGeometry args={[3, 0.8]} />
                        <meshBasicMaterial
                            color="#FFFFFF"
                            transparent
                            opacity={0.9}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                    {/* Text would be added here in a real implementation */}
                </group>
            </Float>
        </group>
    )
}

// Cloud overlay component
const CloudOverlay: React.FC = () => {
    const cloudRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (!cloudRef.current) return

        const time = state.clock.getElapsedTime()
        // Slow cloud movement
        cloudRef.current.position.x = Math.sin(time * 0.1) * 2
        cloudRef.current.position.z = Math.cos(time * 0.15) * 1.5
    })

    // Scroll-triggered cloud animation
    useEffect(() => {
        if (!cloudRef.current) return undefined

        gsap.timeline({
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
                onUpdate: (self) => {
                    if (!cloudRef.current) return

                    const progress = self.progress
                    // Move clouds to cover the right half of the mountain as user scrolls
                    cloudRef.current.position.x = progress * 6 - 3
                    cloudRef.current.scale.setScalar(1 + progress * 0.5)
                }
            }
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return (
        <group ref={cloudRef} position={[2, 4, 0]}>
            <Clouds material={THREE.MeshLambertMaterial}>
                <Cloud
                    seed={1}
                    scale={[4, 2, 4]}
                    volume={8}
                    color="#FFFFFF"
                    fade={10}
                    position={[0, 0, 0]}
                />
                <Cloud
                    seed={2}
                    scale={[3, 1.5, 3]}
                    volume={6}
                    color="#F0F8FF"
                    fade={8}
                    position={[2, -1, 1]}
                />
                <Cloud
                    seed={3}
                    scale={[3.5, 1.8, 3.5]}
                    volume={7}
                    color="#E6F3FF"
                    fade={9}
                    position={[-1, 0.5, -1]}
                />
            </Clouds>
        </group>
    )
}

// Particle system for magical atmosphere
const MountainParticles: React.FC = () => {
    const pointsRef = useRef<THREE.Points>(null)
    const particleCount = typeof window !== 'undefined' ? (DeviceUtils.isMobile() ? 30 : 60) : 30

    const { positions, colors } = useMemo(() => {
        const positions = new Float32Array(particleCount * 3)
        const colors = new Float32Array(particleCount * 3)

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3

            // Position particles around the mountain
            positions[i3] = (Math.random() - 0.5) * 20
            positions[i3 + 1] = Math.random() * 12 + 2
            positions[i3 + 2] = (Math.random() - 0.5) * 15

            // Sparkly colors - white to light blue
            const intensity = 0.8 + Math.random() * 0.2
            colors[i3] = intensity       // R
            colors[i3 + 1] = intensity   // G
            colors[i3 + 2] = 1           // B (blue tint)
        }

        return { positions, colors }
    }, [particleCount])

    useFrame((state) => {
        if (!pointsRef.current) return

        const time = state.clock.getElapsedTime()

        // Gentle floating motion
        const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3
            positionsArray[i3 + 1] += Math.sin(time * 0.5 + i) * 0.005
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
                size={0.03}
                vertexColors
                transparent
                opacity={0.7}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

// Main scene component
const MountainScene: React.FC = () => {
    const { camera, scene } = useThree()

    useEffect(() => {
        // Setup lighting
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
                    camera.position.y = 8 + progress * 4
                    camera.position.z = 15 - progress * 3
                    camera.lookAt(0, 2, 0)
                }
            }
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [camera, scene])

    // Featured collection pieces positioned on mountain peaks
    const collectionPieces = [
        {
            position: [-4, 8, 0] as [number, number, number],
            productData: {
                name: 'Diamond Elegance Watch',
                category: 'watch',
                modelPath: '/models/watches/watch-diamond.glb'
            }
        },
        {
            position: [0, 10, 0] as [number, number, number],
            productData: {
                name: 'Eternal Rose Ring',
                category: 'gold',
                modelPath: '/models/gold/gold-rose-ring.glb'
            }
        },
        {
            position: [4, 8, 0] as [number, number, number],
            productData: {
                name: 'Radiant Solitaire Ring',
                category: 'diamond',
                modelPath: '/models/diamonds/diamond-solitaire-ring.glb'
            }
        }
    ]

    return (
        <>
            {/* Mountain */}
            <Mountain />

            {/* Collection pieces on peaks */}
            {collectionPieces.map((piece, index) => (
                <CollectionPiece
                    key={index}
                    position={piece.position}
                    productData={piece.productData}
                    index={index}
                />
            ))}

            {/* Cloud overlay */}
            <CloudOverlay />

            {/* Particle system */}
            <MountainParticles />

            {/* Environment and lighting */}
            <Environment preset="sunset" />

            {/* Ambient lighting */}
            <ambientLight intensity={0.4} />

            {/* Key lighting for the mountain */}
            <directionalLight
                position={[10, 15, 5]}
                intensity={1.2}
                castShadow
                shadow-mapSize={[2048, 2048]}
                color="#FFF8DC"
            />

            {/* Fill lighting */}
            <directionalLight
                position={[-8, 8, -5]}
                intensity={0.4}
                color="#87CEEB"
            />
        </>
    )
}


// Main Mountain Hero Scene component
const MountainHeroScene: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <div className={`w-full h-full ${className}`}>
            <Canvas
                shadows
                camera={{ position: [0, 8, 15], fov: 60 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
                dpr={typeof window !== 'undefined' ? (DeviceUtils.isMobile() ? 1 : Math.min(window.devicePixelRatio, 2)) : 1}
            >
                <Suspense fallback={null}>
                    <MountainScene />
                    {typeof window !== 'undefined' && !DeviceUtils.isMobile() && (
                        <OrbitControls
                            enablePan={false}
                            enableZoom={false}
                            enableRotate={true}
                            maxPolarAngle={Math.PI / 2}
                            minPolarAngle={Math.PI / 6}
                            autoRotate={false}
                            target={[0, 2, 0]}
                        />
                    )}
                </Suspense>
            </Canvas>
        </div>
    )
}

export default MountainHeroScene
