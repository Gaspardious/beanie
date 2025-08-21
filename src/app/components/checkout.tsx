'use client'

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useProduct } from '../context/ProductContext'

import { fetchClientSecret } from '../actions/stripe'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

console.log('Stripe publishable key:', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'Present' : 'Missing')

export default function Checkout() {
  const { checkoutProducts } = useProduct()

  console.log('Checkout component rendered with products:', checkoutProducts)

  const fetchClientSecretWithProducts = async () => {
    try {
      console.log('Fetching client secret for products:', checkoutProducts)
      const clientSecret = await fetchClientSecret(checkoutProducts)
      console.log('Client secret received:', clientSecret ? 'Success' : 'Failed')
      return clientSecret
    } catch (error) {
      console.error('Error fetching client secret:', error)
      throw error
    }
  }

  if (!checkoutProducts || checkoutProducts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">No products in cart</p>
        <p className="text-sm text-gray-500">Please add products to your cart to continue.</p>
      </div>
    )
  }

  return (
    <div id="checkout">
      <div className="mb-4">
        <p className="text-sm text-gray-600">Loading secure payment form...</p>
      </div>
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret: fetchClientSecretWithProducts }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}