import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import type { ContactForm } from '@/types'

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Simple rate limiting function
function rateLimit(ip: string, maxRequests: number = 5, windowMs: number = 15 * 60 * 1000) {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

// Validation function
function validateContactForm(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long')
  }

  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required')
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      errors.push('Invalid email format')
    }
  }

  if (data.phone && typeof data.phone === 'string') {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    const cleanPhone = data.phone.replace(/[^\d\+]/g, '')
    if (!phoneRegex.test(cleanPhone)) {
      errors.push('Invalid phone number format')
    }
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long')
  }

  if (data.message && data.message.length > 2000) {
    errors.push('Message must be less than 2000 characters')
  }

  return { isValid: errors.length === 0, errors }
}

// Sanitize input to prevent injection
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .trim()
}

// Send email notification (implement with your preferred service)
async function sendContactNotification(formData: ContactForm): Promise<boolean> {
  try {
    // Example using EmailJS, Resend, or SendGrid
    // Replace this with your actual email service implementation
    
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      // Example with nodemailer (you'd need to install it)
      // const nodemailer = require('nodemailer')
      // const transporter = nodemailer.createTransporter({...})
      // await transporter.sendMail({...})
    }

    // For now, just log the form data (remove in production)
    console.log('Contact form submission:', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      productInterest: formData.productInterest,
      preferredContact: formData.preferredContact,
      timestamp: new Date().toISOString()
    })

    return true
  } catch (error) {
    console.error('Email sending failed:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const headersList = headers()
    const forwarded = headersList.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown'

    // Apply rate limiting
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many requests. Please try again later.' 
        },
        { status: 429 }
      )
    }

    // Parse and validate request body
    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid JSON in request body' 
        },
        { status: 400 }
      )
    }

    // Validate form data
    const { isValid, errors } = validateContactForm(body)
    if (!isValid) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: errors 
        },
        { status: 400 }
      )
    }

    // Sanitize form data
    const sanitizedData: ContactForm = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      phone: body.phone ? sanitizeInput(body.phone) : '',
      message: sanitizeInput(body.message),
      productInterest: body.productInterest ? sanitizeInput(body.productInterest) : '',
      preferredContact: body.preferredContact || 'email'
    }

    // Send notification email
    const emailSent = await sendContactNotification(sanitizedData)

    if (!emailSent) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send notification. Please try again or contact us directly.' 
        },
        { status: 500 }
      )
    }

    // Log successful submission (optional)
    console.log(`Contact form submitted successfully by ${sanitizedData.email}`)

    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message. We will get back to you within 24 hours.' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form API error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { 
      success: false, 
      error: 'Method not allowed' 
    },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { 
      success: false, 
      error: 'Method not allowed' 
    },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { 
      success: false, 
      error: 'Method not allowed' 
    },
    { status: 405 }
  )
}