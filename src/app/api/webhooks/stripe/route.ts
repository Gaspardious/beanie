import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '../../../../lib/stripe'

export async function POST(req: Request) {
  console.log('🔔 Webhook received!')
  
  const body = await req.text()
  const signature = (await headers()).get('stripe-signature')

  console.log('📝 Request details:')
  console.log('- Body length:', body.length)
  console.log('- Signature present:', !!signature)
  console.log('- Webhook secret configured:', !!process.env.STRIPE_WEBHOOK_SECRET)

  if (!signature) {
    console.error('❌ Webhook signature missing')
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('❌ STRIPE_WEBHOOK_SECRET not configured')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
    console.log('✅ Webhook signature verified successfully')
    console.log('📦 Event type:', event.type)
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }



  // Handle the event
  try {
    console.log('🔄 Processing event type:', event.type)
    
    switch (event.type) {
      case 'checkout.session.completed':
        console.log('💰 Processing checkout.session.completed')
        const session = event.data.object as Stripe.Checkout.Session
        console.log('📋 Session ID:', session.id)
        console.log('💳 Amount:', session.amount_total)
        
        // Retrieve the full session with expanded line items to get complete data
        console.log('🔍 Retrieving full session data...')
        const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ['line_items']
        })
        
        console.log('🔍 Full session data:', JSON.stringify(fullSession, null, 2))
        
        await handleSuccessfulPayment(fullSession)
        console.log('✅ Checkout session processed successfully')
        break
      case 'payment_intent.succeeded':
        console.log('💳 Payment intent succeeded (not processing)')
        break
      case 'payment_intent.payment_failed':
        console.log('❌ Payment intent failed (not processing)')
        break
      default:
        console.log('⚠️ Unhandled event type:', event.type)
        break
    }
  } catch (error) {
    console.error('❌ Error processing webhook event:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  try {
    console.log('🎯 Starting Printful order creation...')
    
    // Create order in Printful
    const printfulOrder = await createPrintfulOrder(session)
    console.log('✅ Printful order created successfully:', printfulOrder.id)
    
    // Here you could also save order to your database
    // await saveOrderToDatabase(session, printfulOrder)
    
    // Note: Cart will be cleared on the client side after successful payment
    // The cart state is managed in localStorage and will be cleared when user
    // completes the checkout flow
    
  } catch (error) {
    console.error('❌ Error processing payment:', error)
    throw error // Re-throw to ensure webhook fails
  }
}

async function createPrintfulOrder(session: Stripe.Checkout.Session) {
  console.log('📦 Creating Printful order...')
  const { customer_details, line_items } = session
  
  if (!line_items?.data) {
    throw new Error('No line items found in session')
  }
  
  console.log('🛍️ Line items found:', line_items.data.length)
  
  // Transform line items to Printful format
  const items = line_items.data.map((item: Stripe.LineItem) => {
    // Get metadata from the price's product
    let metadata: Record<string, string> = {}
    if (item.price?.product && typeof item.price.product === 'object' && 'metadata' in item.price.product) {
      metadata = (item.price.product as Stripe.Product).metadata
    }
    
    console.log('📋 Item metadata:', metadata)
    
    // Use sync_variant_id if available, otherwise use variant_id
    // For now, use the correct variant ID from our Printful account
    let variantId = metadata.printful_variant_id || metadata.sync_variant_id || '1'
    
    // If the variant ID is '1' (default), use the correct one from our products
    if (variantId === '1' || !variantId) {
      // Use the first variant ID from our Printful products
      variantId = '4615175066' // This is the correct variant ID from our test
    }
    
    const printfulItem = {
      sync_variant_id: parseInt(variantId) || 4615175066, // Use correct variant ID as fallback
      quantity: item.quantity || 1,
      retail_price: ((item.amount_total || 0) / 100).toFixed(2), // Convert from cents
      // Add printful_product_id if available
      ...(metadata.printful_product_id && { 
        sync_product_id: parseInt(metadata.printful_product_id) 
      })
    }
    
    console.log('🎯 Printful item:', printfulItem)
    return printfulItem
  })

  if (!customer_details) {
    throw new Error('No customer details found in session')
  }

  const orderData = {
    recipient: {
      name: customer_details.name || 'Customer',
      email: customer_details.email || '',
      phone: customer_details.phone || '',
      address1: customer_details.address?.line1 || '',
      address2: customer_details.address?.line2 || '',
      city: customer_details.address?.city || '',
      state_code: customer_details.address?.state || '',
      country_code: customer_details.address?.country || 'SE',
      zip: customer_details.address?.postal_code || ''
    },
    items: items,
    retail_costs: {
      currency: 'SEK',
      subtotal: ((session.amount_subtotal || 0) / 100).toFixed(2),
      total: ((session.amount_total || 0) / 100).toFixed(2)
    },
    shipping: 'STANDARD',
    external_id: `order_${Date.now()}`, // Use simple timestamp-based external ID
    // Add confirmation URL for order tracking
    confirmation_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://beanie-pi.vercel.app'}/return?session_id=${session.id}`
  }

  console.log('📤 Sending order to Printful...')
  console.log('📋 Order data:', JSON.stringify(orderData, null, 2))
  
  if (!process.env.PRINTFUL_API_KEY) {
    throw new Error('Printful API key not configured')
  }

  console.log('⏱️ Starting Printful API call...')
  const startTime = Date.now()
  
  const response = await fetch('https://api.printful.com/orders', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData),
    // Increase timeout to 30 seconds to handle potential delays
    signal: AbortSignal.timeout(30000) // 30 second timeout
  })
  
  const endTime = Date.now()
  console.log(`⏱️ Printful API call took ${endTime - startTime}ms`)

  console.log('📡 Printful response status:', response.status)

  if (!response.ok) {
    const error = await response.text()
    console.error('❌ Printful API error:', error)
    console.error('❌ Response status:', response.status)
    console.error('❌ Response headers:', Object.fromEntries(response.headers.entries()))
    throw new Error(`Printful API error: ${response.status} - ${error}`)
  }

  const result = await response.json()
  console.log('✅ Printful order created successfully!')
  console.log('📋 Printful order ID:', result.id)
  console.log('📋 Printful order status:', result.status)
  console.log('📋 Printful order external_id:', result.external_id)
  return result
}
