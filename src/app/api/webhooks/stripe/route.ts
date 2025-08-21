import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '../../../../lib/stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session
      await handleSuccessfulPayment(session)
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  try {
    console.log('Processing successful payment:', session.id)
    
    // Create order in Printful
    const printfulOrder = await createPrintfulOrder(session)
    
    console.log('Printful order created:', printfulOrder)
    
    // Here you could also save order to your database
    // await saveOrderToDatabase(session, printfulOrder)
    
  } catch (error) {
    console.error('Error processing payment:', error)
  }
}

async function createPrintfulOrder(session: Stripe.Checkout.Session) {
  const { customer_details, line_items } = session
  
  if (!line_items?.data) {
    throw new Error('No line items found in session')
  }
  
  // Transform line items to Printful format
  const items = line_items.data.map((item: Stripe.LineItem) => {
    const product = item.price?.product
    const metadata = (product && typeof product === 'object' && 'metadata' in product) ? product.metadata : {}
    
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
    throw new Error(`Printful API error: ${error}`)
  }

  return await response.json()
}
