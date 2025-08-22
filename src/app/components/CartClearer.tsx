'use client'

import { useEffect, useRef } from 'react'
import { useProduct } from '../context/ProductContext'

interface CartClearerProps {
  status: string;
}

export default function CartClearer({ status }: CartClearerProps) {
  const { clearCart, multipleProducts } = useProduct()
  const hasCleared = useRef(false)

  useEffect(() => {
    if (status === 'complete') {
      clearCart()
      hasCleared.current = true
    }
  }, [status, clearCart])

  // Backup clear after a short delay
  useEffect(() => {
    if (status === 'complete') {
      const timer = setTimeout(() => {
        if (multipleProducts.length > 0) {
          clearCart()
          hasCleared.current = true
        }
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [status, clearCart, multipleProducts.length])

  return null
}
