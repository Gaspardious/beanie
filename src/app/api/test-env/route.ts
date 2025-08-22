import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    stripe_secret_key: !!process.env.STRIPE_SECRET_KEY,
    stripe_webhook_secret: !!process.env.STRIPE_WEBHOOK_SECRET,
    printful_api_key: !!process.env.PRINTFUL_API_KEY,
    stripe_publishable_key: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  })
}
