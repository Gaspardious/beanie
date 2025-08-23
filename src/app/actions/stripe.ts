'use server'

import { headers } from 'next/headers'

import { stripe } from '../../lib/stripe'

interface Product {
  id: number;
  name: string;
  thumbnail_url: string;
  price: number;
  quantity: number;
  external_id?: string;
  printful_variant_id?: string;
  printful_product_id?: string;
}

export async function fetchClientSecret(products: Product[]) {
  const origin = (await headers()).get('origin')

  // Transform products to Stripe line items format
  const lineItems = products.map(product => {
    console.log('🛒 Processing product for Stripe:', {
      name: product.name,
      id: product.id,
      price: product.price,
      quantity: product.quantity,
      printful_variant_id: product.printful_variant_id,
      printful_product_id: product.printful_product_id
    });
    
    return {
      price_data: {
        currency: 'sek',
        product_data: {
          name: product.name,
          images: [product.thumbnail_url],
          metadata: {
            printful_product_id: product.printful_product_id || product.external_id || product.id.toString(),
            printful_variant_id: product.printful_variant_id || '1',
            external_id: product.external_id || product.id.toString(),
            // Add sync_variant_id for Printful API
            sync_variant_id: product.printful_variant_id || '1'
          }
        },
        unit_amount: product.price * 100, // Convert to cents
      },
      quantity: product.quantity,
    };
  });

  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: lineItems,
    mode: 'payment',
    return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
    currency: 'sek',
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    shipping_address_collection: {
      allowed_countries: ['SE', 'NO', 'DK', 'FI'],
    },
    // Add metadata to the session for webhook processing
    metadata: {
      source: 'beanie_shop',
      products: JSON.stringify(products.map(p => ({ 
        id: p.id, 
        external_id: p.external_id,
        printful_variant_id: p.printful_variant_id,
        printful_product_id: p.printful_product_id
      })))
    },
    // Enable automatic tax calculation if needed
    automatic_tax: { enabled: true },
    // Add customer creation
    customer_creation: 'always',
  })

  return session.client_secret!
}