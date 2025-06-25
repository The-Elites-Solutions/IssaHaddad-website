import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import type { ButtonProps } from '@/types'

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, disabled, loading, children, onClick, type = 'button', ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center rounded-lg font-accent font-medium 
      transition-all duration-300 ease-out transform focus:outline-none focus:ring-2 
      focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
      hover:scale-105 active:scale-95 relative overflow-hidden
    `

    const variants = {
      primary: `
        bg-rose-gold-gradient text-white shadow-luxury 
        hover:shadow-gold-glow focus:ring-rose-gold-400
        before:absolute before:inset-0 before:bg-luxury-shimmer 
        before:translate-x-[-100%] hover:before:translate-x-[100%] 
        before:transition-transform before:duration-700
      `,
      secondary: `
        bg-charcoal-gradient text-white shadow-luxury 
        hover:bg-charcoal-800 focus:ring-charcoal-400
        border border-charcoal-600 hover:border-charcoal-500
      `,
      outline: `
        border-2 border-rose-gold-400 text-rose-gold-400 bg-transparent 
        hover:bg-rose-gold-400 hover:text-white focus:ring-rose-gold-400
        shadow-inner-luxury hover:shadow-gold-glow
      `,
      ghost: `
        text-charcoal-700 bg-transparent hover:bg-pearl 
        focus:ring-charcoal-300 hover:text-charcoal-900
      `
    }

    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-6 text-base',
      lg: 'h-12 px-8 text-lg',
      xl: 'h-14 px-10 text-xl'
    }

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          loading && 'cursor-wait',
          className
        )}
        disabled={disabled || loading}
        onClick={onClick}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <span className={cn('flex items-center gap-2', loading && 'opacity-0')}>
          {children}
        </span>
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button