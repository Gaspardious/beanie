import { NextResponse } from 'next/server'

export async function GET() {
  const envCheck = {
    stripe: {
      publishableKey: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      secretKey: !!process.env.STRIPE_SECRET_KEY,
      webhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
    },
    printful: {
      apiKey: !!process.env.PRINTFUL_API_KEY,
    },
    site: {
      url: process.env.NEXT_PUBLIC_SITE_URL || 'Not set',
    },
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  }

  return NextResponse.json(envCheck)
}
