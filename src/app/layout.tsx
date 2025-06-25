import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display, Inter, Montserrat } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { cn } from '@/lib/utils'

// Font configurations
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-accent',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Luxuria - Exquisite Jewelry & Timepieces',
    template: '%s | Luxuria'
  },
  description: 'Discover our exclusive collection of luxury jewelry, watches, gold, and diamond pieces. Crafted with precision and designed for elegance.',
  keywords: ['luxury jewelry', 'watches', 'gold', 'diamonds', 'timepieces', 'fine jewelry', 'luxury accessories'],
  authors: [{ name: 'Luxuria Jewelry' }],
  creator: 'Luxuria Jewelry',
  publisher: 'Luxuria Jewelry',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://luxuria-jewelry.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://luxuria-jewelry.com',
    title: 'Luxuria - Exquisite Jewelry & Timepieces',
    description: 'Discover our exclusive collection of luxury jewelry, watches, gold, and diamond pieces.',
    siteName: 'Luxuria Jewelry',
    images: [
      {
        url: '/images/social/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxuria Jewelry Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxuria - Exquisite Jewelry & Timepieces',
    description: 'Discover our exclusive collection of luxury jewelry, watches, gold, and diamond pieces.',
    images: ['/images/social/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE,
  },
  icons: {
    icon: [
      { url: '/icons/favicon.ico', sizes: 'any' },
      { url: '/icons/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icons/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/manifest.json',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="en" 
      className={cn(
        playfair.variable,
        inter.variable,
        montserrat.variable,
        'scroll-smooth'
      )}
    >
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/playfair-display.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Theme and color configuration */}
        <meta name="theme-color" content="#E8B4A0" />
        <meta name="color-scheme" content="light" />
        <meta name="msapplication-TileColor" content="#E8B4A0" />
        
        {/* Performance hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Analytics (Google Analytics) */}
        {process.env.NEXT_PUBLIC_GA_TRACKING_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Hotjar Analytics */}
        {process.env.NEXT_PUBLIC_HOTJAR_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
              `,
            }}
          />
        )}
      </head>
      
      <body className="min-h-screen bg-pearl font-body text-charcoal-900 antialiased">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-rose-gold-500 text-white px-4 py-2 rounded-lg font-accent font-medium transition-all duration-300"
        >
          Skip to main content
        </a>

        {/* Header */}
        <Header />

        {/* Main Content */}
        <main 
          id="main-content"
          className="relative"
          role="main"
        >
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Global Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Disable right-click on production
              if (${process.env.NODE_ENV === 'production'}) {
                document.addEventListener('contextmenu', e => e.preventDefault());
              }
              
              // Performance monitoring
              if (typeof window !== 'undefined' && ${process.env.NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING === 'true'}) {
                window.addEventListener('load', () => {
                  // Log load performance
                  const perfData = performance.getEntriesByType('navigation')[0];
                  if (perfData && ${process.env.NEXT_PUBLIC_DEV_MODE === 'true'}) {
                    console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                  }
                });
              }

              // Smooth scroll polyfill for older browsers
              if (!('scrollBehavior' in document.documentElement.style)) {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
                document.head.appendChild(script);
              }
            `,
          }}
        />

        {/* Service Worker Registration for PWA */}
        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js').then(function(registration) {
                      console.log('ServiceWorker registration successful');
                    }, function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    });
                  });
                }
              `,
            }}
          />
        )}
      </body>
    </html>
  )
}