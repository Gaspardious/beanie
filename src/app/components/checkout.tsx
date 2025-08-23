'use client'

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { useProduct } from '../context/ProductContext'
import { useEffect, useState } from 'react'

import { fetchClientSecret } from '../actions/stripe'

// Simple Stripe loader
const getStripe = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
}

export default function Checkout() {
  const { checkoutProducts } = useProduct()
  const [stripe, setStripe] = useState<Stripe | null>(null)
  const [loading, setLoading] = useState(true)
  const [cartKey, setCartKey] = useState(0) // Force re-render when cart changes

  // Update cart key when checkout products change to force Stripe refresh
  useEffect(() => {
    setCartKey(prev => prev + 1)
  }, [checkoutProducts])

  // Clear cart when component unmounts (after successful payment)
  useEffect(() => {
    return () => {
      // This runs when the component unmounts (user completes checkout)
      // Don't clear here - let the CartClearer handle it after payment
    }
  }, [])

  // Load Stripe
  useEffect(() => {
    const loadStripeInstance = async () => {
      try {
        const stripeInstance = await getStripe()
        setStripe(stripeInstance)
        setLoading(false)
      } catch (error) {
        console.error('Failed to load Stripe:', error)
        setLoading(false)
      }
    }

    // Small delay to ensure Stripe script is loaded
    const timer = setTimeout(() => {
      loadStripeInstance()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const fetchClientSecretWithProducts = async () => {
    try {
      const clientSecret = await fetchClientSecret(checkoutProducts)
      return clientSecret
    } catch (error) {
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

  if (loading || !stripe) {
    return (
      <div className="text-center py-8">
        <div className="mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        </div>
        <p className="text-gray-600">Loading secure payment form...</p>
        <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
      </div>
    )
  }

  return (
    <div id="checkout">
      <div className="mb-4">
        <p className="text-sm text-gray-600">Loading secure payment form...</p>
      </div>
      <EmbeddedCheckoutProvider
        key={cartKey} // Force re-render when cart changes
        stripe={stripe}
        options={{ fetchClientSecret: fetchClientSecretWithProducts }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}