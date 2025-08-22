import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '../../../../lib/stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get('stripe-signature')

  if (!signature) {
    console.error('Webhook signature missing')
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET not configured')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }



  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        await handleSuccessfulPayment(session)
        break
      case 'payment_intent.succeeded':
        break
      case 'payment_intent.payment_failed':
        break
      default:
        break
    }
  } catch (error) {
    console.error('Error processing webhook event:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  try {
    
    // Create order in Printful
    const printfulOrder = await createPrintfulOrder(session)
    
    // Here you could also save order to your database
    // await saveOrderToDatabase(session, printfulOrder)
    
    // Note: Cart will be cleared on the client side after successful payment
    // The cart state is managed in localStorage and will be cleared when user
    // completes the checkout flow
    
  } catch (error) {
    console.error('Error processing payment:', error)
    throw error // Re-throw to ensure webhook fails
  }
}

async function createPrintfulOrder(session: Stripe.Checkout.Session) {
  const { customer_details, line_items } = session
  
  if (!line_items?.data) {
    throw new Error('No line items found in session')
  }
  
  // Transform line items to Printful format
  const items = line_items.data.map((item: Stripe.LineItem) => {
    // Get metadata from the price's product
    let metadata = {}
    if (item.price?.product && typeof item.price.product === 'object' && 'metadata' in item.price.product) {
      metadata = (item.price.product as any).metadata
    }
    
    return {
      sync_product_id: metadata.printful_product_id || metadata.external_id || 'default',
      quantity: item.quantity || 1,
      retail_price: ((item.amount_total || 0) / 100).toFixed(2), // Convert from cents
      variant_id: metadata.printful_variant_id || '1'
    }
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
    external_id: session.id // Use Stripe session ID as external reference
  }



  if (!process.env.PRINTFUL_API_KEY) {
    throw new Error('Printful API key not configured')
  }

  const response = await fetch('https://api.printful.com/orders', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Printful API error: ${response.status} - ${error}`)
  }

  return await response.json()
}
