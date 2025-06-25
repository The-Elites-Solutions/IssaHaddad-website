import * as THREE from 'three'
import { DeviceUtils } from '@/lib/utils'
import type { MaterialConfig, OptimizationSettings } from '@/types'

// Three.js configuration based on device capabilities
export class ThreeConfig {
  static getOptimizedSettings(): OptimizationSettings {
    const gpuTier = DeviceUtils.getGPUTier()
    const isMobile = DeviceUtils.isMobile()
    const pixelRatio = DeviceUtils.getDevicePixelRatio()

    switch (gpuTier) {
      case 'high':
        return {
          enableShadows: true,
          shadowMapSize: 2048,
          antialias: true,
          pixelRatio: Math.min(pixelRatio, 2),
          maxLights: 8,
          lodEnabled: false
        }
      
      case 'medium':
        return {
          enableShadows: !isMobile,
          shadowMapSize: 1024,
          antialias: !isMobile,
          pixelRatio: Math.min(pixelRatio, 1.5),
          maxLights: 4,
          lodEnabled: isMobile
        }
      
      default: // low
        return {
          enableShadows: false,
          shadowMapSize: 512,
          antialias: false,
          pixelRatio: 1,
          maxLights: 2,
          lodEnabled: true
        }
    }
  }

  static createRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
    const settings = this.getOptimizedSettings()
    
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: settings.antialias,
      alpha: true,
      powerPreference: 'high-performance'
    })

    renderer.setPixelRatio(settings.pixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    
    // Enable shadows if supported
    if (settings.enableShadows) {
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.shadowMap.autoUpdate = false
    }

    // Enable tone mapping for realistic materials
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    renderer.outputColorSpace = THREE.SRGBColorSpace

    // Enable physically correct lights
    renderer.useLegacyLights = false

    return renderer
  }

  static createCamera(aspect: number = window.innerWidth / window.innerHeight): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000)
    camera.position.set(0, 5, 10)
    return camera
  }

  static createScene(): THREE.Scene {
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x000000, 50, 200)
    return scene
  }
}

// Material creation utilities
export class MaterialUtils {
  static createRoseGoldMaterial(texturePath?: string): THREE.MeshPhysicalMaterial {
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xE8B4A0,
      metalness: 1.0,
      roughness: 0.1,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    })

    if (texturePath) {
      const textureLoader = new THREE.TextureLoader()
      const texture = textureLoader.load(texturePath)
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(1, 1)
      material.map = texture
      
      // Create normal map from the texture for added detail
      material.normalMap = texture
      material.normalScale = new THREE.Vector2(0.3, 0.3)
    }

    return material
  }

  static createGlassMaterial(): THREE.MeshPhysicalMaterial {
    return new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0,
      transmission: 0.9,
      transparent: true,
      opacity: 0.1,
      reflectivity: 0.2,
      ior: 1.52,
      thickness: 0.01,
    })
  }

  static createDiamondMaterial(): THREE.MeshPhysicalMaterial {
    return new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0,
      transmission: 0.95,
      transparent: true,
      opacity: 0.95,
      reflectivity: 1,
      ior: 2.42,
      clearcoat: 1.0,
      clearcoatRoughness: 0,
    })
  }

  static createGoldMaterial(karat: 14 | 18 | 24 = 18): THREE.MeshPhysicalMaterial {
    const colors = {
      14: 0xD4A574, // 14k gold
      18: 0xE8B4A0, // 18k gold
      24: 0xFFD700  // 24k gold
    }

    return new THREE.MeshPhysicalMaterial({
      color: colors[karat],
      metalness: 1.0,
      roughness: 0.1,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    })
  }

  static createConveyorBeltMaterial(): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial({
      color: 0x2C2C2C,
      metalness: 0.8,
      roughness: 0.3,
    })
  }

  static applyMaterialConfig(material: THREE.Material, config: MaterialConfig): void {
    if (material instanceof THREE.MeshPhysicalMaterial || material instanceof THREE.MeshStandardMaterial) {
      const props = config.properties
      
      if (props.metalness !== undefined) material.metalness = props.metalness
      if (props.roughness !== undefined) material.roughness = props.roughness
      if (props.opacity !== undefined) material.opacity = props.opacity
      if (props.transparent !== undefined) material.transparent = props.transparent
      if (props.color) material.color.setHex(parseInt(props.color.replace('#', '0x')))

      // Load textures
      const textureLoader = new THREE.TextureLoader()
      const textures = config.textures

      if (textures.map) {
        material.map = textureLoader.load(textures.map)
      }
      if (textures.normalMap) {
        material.normalMap = textureLoader.load(textures.normalMap)
      }
      if (textures.roughnessMap) {
        material.roughnessMap = textureLoader.load(textures.roughnessMap)
      }
      if (textures.metallicMap) {
        material.metalnessMap = textureLoader.load(textures.metallicMap)
      }
    }
  }
}

// Lighting setup utilities
export class LightingUtils {
  static createLuxuryLighting(scene: THREE.Scene): {
    ambientLight: THREE.AmbientLight
    mainLight: THREE.DirectionalLight
    fillLight: THREE.DirectionalLight
    rimLight: THREE.DirectionalLight
  } {
    const settings = ThreeConfig.getOptimizedSettings()

    // Ambient light for general illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3)
    scene.add(ambientLight)

    // Main directional light (key light)
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2)
    mainLight.position.set(10, 15, 5)
    mainLight.target.position.set(0, 0, 0)
    
    if (settings.enableShadows) {
      mainLight.castShadow = true
      mainLight.shadow.mapSize.width = settings.shadowMapSize
      mainLight.shadow.mapSize.height = settings.shadowMapSize
      mainLight.shadow.camera.near = 0.1
      mainLight.shadow.camera.far = 50
      mainLight.shadow.camera.left = -10
      mainLight.shadow.camera.right = 10
      mainLight.shadow.camera.top = 10
      mainLight.shadow.camera.bottom = -10
      mainLight.shadow.bias = -0.0001
    }
    
    scene.add(mainLight)
    scene.add(mainLight.target)

    // Fill light (softer, opposite side)
    const fillLight = new THREE.DirectionalLight(0x8EC5FF, 0.4)
    fillLight.position.set(-8, 5, -2)
    scene.add(fillLight)

    // Rim light (backlighting for edge definition)
    const rimLight = new THREE.DirectionalLight(0xFFE4B5, 0.6)
    rimLight.position.set(0, 8, -10)
    scene.add(rimLight)

    return { ambientLight, mainLight, fillLight, rimLight }
  }

  static createJewelrySpotlight(
    scene: THREE.Scene,
    position: THREE.Vector3,
    target: THREE.Vector3,
    intensity: number = 2
  ): THREE.SpotLight {
    const spotlight = new THREE.SpotLight(0xffffff, intensity, 30, Math.PI * 0.1, 0.5, 2)
    spotlight.position.copy(position)
    spotlight.target.position.copy(target)
    
    const settings = ThreeConfig.getOptimizedSettings()
    if (settings.enableShadows) {
      spotlight.castShadow = true
      spotlight.shadow.mapSize.width = 1024
      spotlight.shadow.mapSize.height = 1024
    }

    scene.add(spotlight)
    scene.add(spotlight.target)
    return spotlight
  }

  static createEnvironmentMap(scene: THREE.Scene): THREE.CubeTexture | null {
    // Create a simple environment map for reflections
    const loader = new THREE.CubeTextureLoader()
    
    try {
      const envMap = loader.load([
        '/textures/env/px.jpg', // positive x
        '/textures/env/nx.jpg', // negative x
        '/textures/env/py.jpg', // positive y
        '/textures/env/ny.jpg', // negative y
        '/textures/env/pz.jpg', // positive z
        '/textures/env/nz.jpg', // negative z
      ])
      
      scene.environment = envMap
      return envMap
    } catch (error) {
      console.warn('Environment map not found, using fallback')
      return null
    }
  }
}

// Geometry utilities for jewelry and conveyor
export class GeometryUtils {
  static createConveyorBelt(length: number, width: number, height: number): THREE.BoxGeometry {
    return new THREE.BoxGeometry(length, height, width)
  }

  static createGlassCase(width: number, height: number, depth: number, thickness: number = 0.1): {
    frame: THREE.BoxGeometry
    glass: THREE.PlaneGeometry[]
  } {
    const frame = new THREE.BoxGeometry(width, height, depth)
    
    // Create glass panels (front, back, left, right, top)
    const glass = [
      new THREE.PlaneGeometry(width - thickness * 2, height - thickness * 2), // front
      new THREE.PlaneGeometry(width - thickness * 2, height - thickness * 2), // back
      new THREE.PlaneGeometry(depth - thickness * 2, height - thickness * 2), // left
      new THREE.PlaneGeometry(depth - thickness * 2, height - thickness * 2), // right
      new THREE.PlaneGeometry(width - thickness * 2, depth - thickness * 2), // top
    ]

    return { frame, glass }
  }

  static createRing(innerRadius: number = 0.8, outerRadius: number = 1): THREE.RingGeometry {
    return new THREE.RingGeometry(innerRadius, outerRadius, 32, 1)
  }

  static createGemstone(radius: number = 0.3, detail: number = 2): THREE.OctahedronGeometry {
    return new THREE.OctahedronGeometry(radius, detail)
  }

  static optimizeGeometry(geometry: THREE.BufferGeometry): THREE.BufferGeometry {
    geometry.computeBoundingBox()
    geometry.computeBoundingSphere()
    geometry.computeVertexNormals()
    return geometry
  }
}

// Animation utilities for 3D objects
export class AnimationUtils3D {
  static createFloatingAnimation(
    object: THREE.Object3D,
    amplitude: number = 0.5,
    speed: number = 0.002
  ): () => void {
    const initialY = object.position.y
    let time = 0

    return () => {
      time += speed
      object.position.y = initialY + Math.sin(time) * amplitude
    }
  }

  static createRotationAnimation(
    object: THREE.Object3D,
    axis: 'x' | 'y' | 'z' = 'y',
    speed: number = 0.01
  ): () => void {
    return () => {
      object.rotation[axis] += speed
    }
  }

  static createOrbitAnimation(
    object: THREE.Object3D,
    center: THREE.Vector3,
    radius: number,
    speed: number = 0.01
  ): () => void {
    let angle = 0

    return () => {
      angle += speed
      object.position.x = center.x + Math.cos(angle) * radius
      object.position.z = center.z + Math.sin(angle) * radius
    }
  }

  static smoothLookAt(
    object: THREE.Object3D,
    target: THREE.Vector3,
    speed: number = 0.1
  ): () => void {
    const targetQuaternion = new THREE.Quaternion()
    const tempMatrix = new THREE.Matrix4()

    return () => {
      tempMatrix.lookAt(object.position, target, object.up)
      targetQuaternion.setFromRotationMatrix(tempMatrix)
      object.quaternion.slerp(targetQuaternion, speed)
    }
  }
}

// Performance monitoring utilities
export class PerformanceMonitor {
  private static frameCount = 0
  private static lastTime = 0
  private static fps = 0

  static startMonitoring(): void {
    const monitor = () => {
      this.frameCount++
      const now = performance.now()

      if (now >= this.lastTime + 1000) {
        this.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime))
        this.frameCount = 0
        this.lastTime = now

        // Log performance warnings
        if (this.fps < 30) {
          console.warn(`Low FPS detected: ${this.fps}`)
        }
      }

      requestAnimationFrame(monitor)
    }

    requestAnimationFrame(monitor)
  }

  static getFPS(): number {
    return this.fps
  }

  static getMemoryUsage(): number {
    return (performance as any).memory?.usedJSHeapSize || 0
  }
}

// LOD (Level of Detail) utilities
export class LODUtils {
  static createLOD(
    highDetailGeometry: THREE.BufferGeometry,
    mediumDetailGeometry: THREE.BufferGeometry,
    lowDetailGeometry: THREE.BufferGeometry,
    material: THREE.Material
  ): THREE.LOD {
    const lod = new THREE.LOD()

    lod.addLevel(new THREE.Mesh(highDetailGeometry, material), 0)
    lod.addLevel(new THREE.Mesh(mediumDetailGeometry, material), 10)
    lod.addLevel(new THREE.Mesh(lowDetailGeometry, material), 25)

    return lod
  }

  static simplifyGeometry(
    geometry: THREE.BufferGeometry,
    factor: number = 0.5
  ): THREE.BufferGeometry {
    // Simple decimation - in a real implementation, you'd use a proper decimation algorithm
    const indices = geometry.getIndex()

    if (!indices) return geometry

    const newIndices = []
    for (let i = 0; i < indices.count; i += Math.ceil(1 / factor)) {
      newIndices.push(indices.getX(i))
    }

    const newGeometry = geometry.clone()
    newGeometry.setIndex(newIndices)
    newGeometry.computeVertexNormals()

    return newGeometry
  }
}

// Raycasting utilities for interactions
export class RaycastUtils {
  static createRaycaster(): THREE.Raycaster {
    const raycaster = new THREE.Raycaster()
    raycaster.params.Points.threshold = 0.1
    return raycaster
  }

  static getIntersectedObject(
    mouse: THREE.Vector2,
    camera: THREE.Camera,
    objects: THREE.Object3D[]
  ): THREE.Intersection | null {
    const raycaster = this.createRaycaster()
    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObjects(objects, true)
    return intersects.length > 0 ? intersects[0] : null
  }

  static screenToWorld(
    screenPosition: THREE.Vector2,
    camera: THREE.Camera,
    distance: number = 5
  ): THREE.Vector3 {
    const vector = new THREE.Vector3(screenPosition.x, screenPosition.y, 0.5)
    vector.unproject(camera)
    vector.sub(camera.position).normalize()
    const targetDistance = distance / vector.length()
    vector.multiplyScalar(targetDistance)
    vector.add(camera.position)
    return vector
  }
}


export default ThreeConfig