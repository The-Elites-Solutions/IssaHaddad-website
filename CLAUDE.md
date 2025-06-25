# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks
- `npm run type-check` - Run TypeScript validation

### Before Committing
Always run both `npm run lint` and `npm run type-check` to ensure code quality and type safety.

### Known Issues Fixed
- Fixed `border-border` CSS class error by replacing with `border-color: theme('colors.charcoal.200')`
- Fixed missing critters module by removing `optimizeCss: true` from next.config.js
- Fixed corrupted diamond page by rewriting it with proper JSX structure
- Fixed ESLint configuration with `.eslintrc.json`
- ProductDetailPanel component gets product from store, not props

## Architecture Overview

This is a luxury jewelry website built with Next.js 14 featuring an innovative **3D conveyor belt system** for showcasing jewelry collections. The architecture is designed for award-winning performance and visual excellence.

### Core Technologies
- **Framework**: Next.js 14 with App Router
- **3D Graphics**: Three.js + React Three Fiber (@react-three/fiber, @react-three/drei)
- **Animations**: GSAP + ScrollTrigger for scroll-controlled 3D interactions
- **State Management**: Zustand with persistence and devtools
- **Styling**: Tailwind CSS with custom luxury design system
- **Language**: TypeScript with strict mode

### Key Components Architecture

#### 3D System (`src/components/3d/`)
- **ConveyorBelt.tsx**: Main 3D conveyor belt component with glass cases
- **HeroScene.tsx**: Landing page 3D hero section
- All 3D components use Three.js materials and custom lighting systems

#### State Management (`src/lib/store/`)
- **app-store.ts**: Central Zustand store managing:
  - Product selection and category state
  - 3D scene state (camera position, conveyor position, active case)
  - UI state (modals, mobile menu, loading states)
  - Provides utility hooks for specific store slices

#### Utilities (`src/lib/`)
- **three/**: Three.js utilities for materials, geometry, and lighting
- **gsap/**: Animation configurations and scroll triggers
- **data/**: Product data and configurations
- **utils/**: General utility functions

### 3D Conveyor Belt System

The revolutionary conveyor belt is scroll-controlled and features:
- Glass cases that house individual jewelry pieces
- Scroll-triggered animations moving the belt horizontally
- Active case highlighting with enhanced lighting and rotation
- Category-specific lighting (diamond = cool blue, gold = warm amber)
- Performance optimized for 60fps on mobile

### Design System

Luxury color palette configured in `tailwind.config.ts`:
- **Rose Gold**: Primary luxury accent (#D4A574, #C49960)
- **Charcoal**: Primary dark (#2C2C2C)
- **Typography**: Playfair Display (display), Inter (body), Montserrat (accent)

### File Structure Patterns
- **Pages**: App Router structure in `src/app/`
- **Components**: Organized by type (3d, ui, layout, forms, animations)
- **Assets**: 3D models (`.glb`), textures, and images in `public/`
- **Path Aliases**: All imports use `@/` prefix for clean module resolution

### Environment Configuration

Required environment variables:
```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CONTACT_EMAIL=info@yourdomain.com
NEXT_PUBLIC_WHATSAPP_NUMBER=+1234567890
```

Optional analytics:
```bash
NEXT_PUBLIC_GA_TRACKING_ID=GA_MEASUREMENT_ID
NEXT_PUBLIC_HOTJAR_ID=HOTJAR_SITE_ID
```

### Performance Optimizations
- 3D model preloading and compression
- Code splitting with vendor chunks for Three.js and GSAP
- Image optimization with Next.js Image component
- Service worker for PWA functionality
- Advanced caching headers for static assets

### Development Notes
- TypeScript strict mode with comprehensive type definitions
- 3D materials use rose gold textures from `/public/textures/rose-gold.jpg`
- GSAP animations are scroll-triggered and performance optimized
- Zustand store includes development-only logging for debugging
- All 3D scenes include proper cleanup and memory management