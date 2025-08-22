"use client";
import { useProduct } from "../../app/context/ProductContext";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Checkout from '../components/checkout';

const CheckoutPage = () => {
  const router = useRouter();
  const { checkoutProducts, updateCheckoutQuantity } = useProduct();
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const calculateTotal = () => {
    const subtotal = checkoutProducts.reduce((total, product) => total + (product.quantity * product.price), 0);
    const shipping = calculateShipping();
    return subtotal + shipping;
  };

  const calculateShipping = () => {
    const subtotal = checkoutProducts.reduce((total, product) => total + (product.quantity * product.price), 0);
    
    // Free shipping for orders over 399 SEK
    if (subtotal >= 399) {
      return 0;
    }

    const baseShippingPrice = 41;
    const additionalItemPrice = 13;
    
    const totalItems = checkoutProducts.reduce((sum, product) => sum + product.quantity, 0);
    
    if (totalItems === 0) return 0;
    if (totalItems === 1) return baseShippingPrice;
    
    return baseShippingPrice + (additionalItemPrice * (totalItems - 1));
  };

  const handleQuantityChange = (cartItemId: string, change: number) => {
    const product = checkoutProducts.find(p => p.cartItemId === cartItemId);
    if (!product) return;
    
    // Use the context function to keep cart and checkout in sync
    updateCheckoutQuantity(cartItemId, change);
  };

  return (
    <div className="min-h-screen bg-white text-black pt-[120px]">
      <Image src="/logo_black.png" alt="black-logo" width={70} height={70} className="absolute top-15 left-1/2 -translate-x-1/2" onClick={() => router.push("/")} />
      
      {/* Mobile Order Summary Toggle */}
      <div className="md:hidden border-b border-gray-200">
        <button 
          onClick={() => setShowOrderSummary(!showOrderSummary)}
          className="flex items-center justify-between w-full p-4 text-sm"
        >
          <span>SHOW ORDER SUMMARY</span>
          <div className="flex items-center">
            <span className="mr-2">{calculateTotal()} SEK</span>
            <span>{showOrderSummary ? '▼' : '▶'}</span>
          </div>
        </button>

        {showOrderSummary && (
          <div className="p-4 bg-gray-50">
            <div className="space-y-4">
              {checkoutProducts.map((product) => (
                <div key={product.cartItemId} className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-50">
                    <Image
                      src={product.thumbnail_url}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium uppercase">{product.name}</h3>
                    <p className="text-sm">Beige/Beige</p>
                    <div className="flex items-center gap-4 mt-2">
                      <button 
                        onClick={() => handleQuantityChange(product.cartItemId, -1)}
                        className="text-sm"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm">{product.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(product.cartItemId, 1)}
                        className="text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{product.price} SEK</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Cost Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between mb-2">
                <span className="text-sm">Subtotal</span>
                <span className="text-sm">
                  {checkoutProducts.reduce((total, product) => total + (product.quantity * product.price), 0)} SEK
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Shipping</span>
                {calculateTotal() >= 399 ? (
                  <span className="text-sm text-green-600 font-medium">FREE SHIPPING</span>
                ) : (
                  <span className="text-sm">{calculateShipping()} SEK</span>
                )}
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-sm uppercase">Total incl. VAT & Duties</span>
                <span className="text-sm">{calculateTotal()} SEK</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Main Content - Stripe Checkout */}
          <div className="flex-1 md:max-w-[800px]">
            <div className="p-6">
              <h2 className="text-xs font-medium mb-4 uppercase">Payment Details</h2>
              <div className="text-sm mb-6">
                All transactions are secure and encrypted.
              </div>
              
              {checkoutProducts.length > 0 ? (
                <Checkout />
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No products in cart</p>
                  <Link 
                    href="/shop" 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800"
                  >
                    Continue Shopping
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Order Summary */}
          <div className="hidden md:block w-[400px] bg-gray-50 p-8">
            <h2 className="text-sm font-medium mb-6 uppercase">Order Summary</h2>
            <div className="space-y-6">
              {checkoutProducts.map((product) => (
                <div key={product.cartItemId} className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-50">
                    <Image
                      src={product.thumbnail_url}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium uppercase">{product.name}</h3>
                        <p className="text-sm">Beige/Beige</p>
                      </div>
                      <p className="text-sm">{product.price} SEK</p>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center border border-gray-200">
                        <button 
                          onClick={() => handleQuantityChange(product.cartItemId, -1)}
                          className="px-3 py-1 text-sm"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 text-sm border-l border-r border-gray-200">
                          {product.quantity}
                        </span>
                        <button 
                          onClick={() => handleQuantityChange(product.cartItemId, 1)}
                          className="px-3 py-1 text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between mb-2">
                <span className="text-sm">Subtotal</span>
                <span className="text-sm">
                  {checkoutProducts.reduce((total, product) => total + (product.quantity * product.price), 0)} SEK
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Shipping</span>
                {calculateTotal() >= 399 ? (
                  <span className="text-sm text-green-600 font-medium">FREE SHIPPING</span>
                ) : (
                  <span className="text-sm">{calculateShipping()} SEK</span>
                )}
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-sm uppercase">Total incl. VAT & Duties</span>
                <span className="text-sm">{calculateTotal()} SEK</span>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Base shipping: 41 SEK for first item<br />
                Additional items: +13 SEK each<br />
                Free shipping on orders over 399 SEK
              </div>
            </div>

            <div className="mt-8">
              <button 
                onClick={() => setShowHelp(!showHelp)} 
                className="flex items-center gap-2 w-full justify-between text-sm uppercase"
              >
                <span>Need Help?</span>
                <span>{showHelp ? '-' : '+'}</span>
              </button>
              {showHelp && (
                <div className="mt-4 space-y-4 text-sm">
                  <div>
                    <a href="mailto:dejan.gaspar@gmail.com" className="hover:underline">
                      Email: dejan.gaspar@gmail.com
                    </a>
                  </div>
                  <div>
                    <Link href="/faq" className="hover:underline">
                      FAQ
                    </Link>
                  </div>
                  <div>
                    <Link href="/contact" className="hover:underline">
                      Contact Form
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;