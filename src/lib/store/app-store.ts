import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { Vector3 } from 'three'
import type { AppStore, JewelryProduct } from '@/types'

interface AppStoreState extends AppStore {}

export const useAppStore = create<AppStoreState>()(
  devtools(
    subscribeWithSelector((set) => ({
      // Current state
      currentProduct: null,
      activeCategory: null,
      isLoading: false,
      error: null,
      
      // 3D Scene state
      cameraPosition: [0, 5, 10] as [number, number, number],
      cameraTarget: [0, 0, 0] as [number, number, number],
      conveyorPosition: 0,
      activeCase: 0,
      
      // UI state
      mobileMenuOpen: false,
      productModalOpen: false,
      filterPanelOpen: false,
      
      // Actions
      setCurrentProduct: (product: JewelryProduct | null) => {
        set(() => ({
          currentProduct: product,
          productModalOpen: product !== null,
        }), false, 'setCurrentProduct')
      },
      
      setActiveCategory: (category: 'watch' | 'gold' | 'diamond' | null) => {
        set(() => ({
          activeCategory: category,
          // Reset 3D scene when category changes
          conveyorPosition: 0,
          activeCase: 0,
        }), false, 'setActiveCategory')
      },
      
      setLoading: (loading: boolean) => {
        set((state) => ({
          isLoading: loading,
          error: loading ? null : state.error, // Clear error when starting to load
        }), false, 'setLoading')
      },
      
      setError: (error: string | null) => {
        set(() => ({
          error,
          isLoading: false, // Stop loading when error occurs
        }), false, 'setError')
      },
      
      setCameraPosition: (position: Vector3 | [number, number, number]) => {
        const pos = Array.isArray(position) ? position : [position.x, position.y, position.z]
        set(() => ({
          cameraPosition: pos as [number, number, number],
        }), false, 'setCameraPosition')
      },
      
      setCameraTarget: (target: Vector3 | [number, number, number]) => {
        const tgt = Array.isArray(target) ? target : [target.x, target.y, target.z]
        set(() => ({
          cameraTarget: tgt as [number, number, number],
        }), false, 'setCameraTarget')
      },
      
      setConveyorPosition: (position: number) => {
        set(() => ({
          conveyorPosition: position,
        }), false, 'setConveyorPosition')
      },
      
      setActiveCase: (caseIndex: number) => {
        set(() => ({
          activeCase: caseIndex,
        }), false, 'setActiveCase')
      },
      
      toggleMobileMenu: () => {
        set((state) => ({
          mobileMenuOpen: !state.mobileMenuOpen,
        }), false, 'toggleMobileMenu')
      },
      
      toggleProductModal: () => {
        set((state) => ({
          productModalOpen: !state.productModalOpen,
          currentProduct: state.productModalOpen ? null : state.currentProduct,
        }), false, 'toggleProductModal')
      },
      
      toggleFilterPanel: () => {
        set((state) => ({
          filterPanelOpen: !state.filterPanelOpen,
        }), false, 'toggleFilterPanel')
      },
      
      reset: () => {
        set(() => ({
          currentProduct: null,
          activeCategory: null,
          isLoading: false,
          error: null,
          cameraPosition: [0, 5, 10] as [number, number, number],
          cameraTarget: [0, 0, 0] as [number, number, number],
          conveyorPosition: 0,
          activeCase: 0,
          mobileMenuOpen: false,
          productModalOpen: false,
          filterPanelOpen: false,
        }), false, 'reset')
      },
    })),
    {
      name: 'luxury-jewelry-store',
      serialize: {
        options: {
          set: new Set(['cameraPosition', 'cameraTarget']), // Don't serialize Vector3 objects
        },
      },
    }
  )
)

// Utility hooks for specific store slices
export const useCurrentProduct = () => useAppStore((state) => state.currentProduct)
export const useActiveCategory = () => useAppStore((state) => state.activeCategory)
export const useLoading = () => useAppStore((state) => state.isLoading)
export const useError = () => useAppStore((state) => state.error)

// 3D Scene hooks
export const useCameraState = () => useAppStore((state) => ({
  position: state.cameraPosition,
  target: state.cameraTarget,
  setPosition: state.setCameraPosition,
  setTarget: state.setCameraTarget,
}))

export const useConveyorState = () => useAppStore((state) => ({
  position: state.conveyorPosition,
  activeCase: state.activeCase,
  setPosition: state.setConveyorPosition,
  setActiveCase: state.setActiveCase,
}))

// UI state hooks
export const useUIState = () => useAppStore((state) => ({
  mobileMenuOpen: state.mobileMenuOpen,
  productModalOpen: state.productModalOpen,
  filterPanelOpen: state.filterPanelOpen,
  toggleMobileMenu: state.toggleMobileMenu,
  toggleProductModal: state.toggleProductModal,
  toggleFilterPanel: state.toggleFilterPanel,
}))

// Subscribe to store changes for debugging
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  useAppStore.subscribe(
    (state) => state.activeCase,
    (activeCase, previousActiveCase) => {
      console.log('Active case changed:', { previousActiveCase, activeCase })
    }
  )
  
  useAppStore.subscribe(
    (state) => state.conveyorPosition,
    (position, previousPosition) => {
      if (Math.abs(position - previousPosition) > 0.1) {
        console.log('Conveyor position changed:', { previousPosition, position })
      }
    }
  )
}