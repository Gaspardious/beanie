import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  console.log('🔔 Test webhook received!')
  console.log('📝 Headers:', Object.fromEntries(req.headers.entries()))
  
  const body = await req.text()
  console.log('📦 Body length:', body.length)
  console.log('📋 Body preview:', body.substring(0, 200))
  
  return NextResponse.json({ 
    received: true, 
    timestamp: new Date().toISOString(),
    bodyLength: body.length
  })
}

export async function GET() {
  return NextResponse.json({ 
    status: 'webhook test endpoint ready',
    timestamp: new Date().toISOString()
  })
}
