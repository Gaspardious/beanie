"use client";
import { useProduct } from "../../app/context/ProductContext";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';


const CheckoutPage = () => {
  const router = useRouter();
  const { checkoutProducts, setCheckoutProducts } = useProduct();
  const [currentStep, setCurrentStep] = useState(1);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    newsletter: true,
    preferences: {
      menswear: false,
      womenswear: false,
      both: false
    },
    country: "Sweden",
    firstName: "",
    lastName: "",
    street: "",
    apartment: "",
    postalCode: "",
    city: ""
  });

  const europeanCountries = [
    "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
    "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary",
    "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands",
    "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden"
  ];

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      if (name.startsWith('preferences.')) {
        const preference = name.split('.')[1];
        setFormData(prev => ({
          ...prev,
          preferences: {
            ...prev.preferences,
            [preference]: checkbox.checked
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checkbox.checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleQuantityChange = (cartItemId: string, change: number) => {
    const product = checkoutProducts.find(p => p.cartItemId === cartItemId);
    if (!product) return;
    
    if (product.quantity + change < 1) {
      const newProducts = checkoutProducts.filter(p => p.cartItemId !== cartItemId);
      setCheckoutProducts(newProducts);
    } else {
      const newProducts = checkoutProducts.map(p => 
        p.cartItemId === cartItemId 
          ? { ...p, quantity: p.quantity + change }
          : p
      );
      setCheckoutProducts(newProducts);
    }
  };

  const handleContinue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Check if all required fields are filled
    const requiredFields = {
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      firstName: formData.firstName,
      lastName: formData.lastName,
      street: formData.street,
      postalCode: formData.postalCode,
      city: formData.city
    };

    const emptyFields = Object.entries(requiredFields)
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      alert(`Please fill in all required fields: ${emptyFields.join(', ')}`);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^\+?[\d\s-]{8,}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert('Please enter a valid phone number');
      return;
    }

    // Postal code validation (basic)
    const postalRegex = /^[\d\s-]{4,}$/;
    if (!postalRegex.test(formData.postalCode)) {
      alert('Please enter a valid postal code');
      return;
    }

    if (currentStep < 2) {
      setCurrentStep(prev => prev + 1);
    }
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
              <div className="mt-2 text-xs text-gray-500">
                Base shipping: 41 SEK for first item<br />
                Additional items: +13 SEK each<br />
                Free shipping on orders over 399 SEK
              </div>
            </div>

            {/* Mobile Promotion Code */}
            <div className="mt-6">
              <button 
                onClick={() => setShowPromoCode(!showPromoCode)} 
                className="flex items-center gap-2 w-full justify-between text-sm uppercase"
              >
                + Add Promotion Code
              </button>
              {showPromoCode && (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Enter promotion code"
                    className="w-full p-2 border border-gray-200"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  {promoCode && (
                    <p className="text-red-500 text-sm mt-2">Discount code is not valid</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Main Content */}
          <div className="flex-1 md:max-w-[800px]">
            {/* Progress Steps */}
            <div className="border-b border-gray-200">
              <div className="container mx-auto max-w-2xl px-4">
                <div className="flex items-center justify-center py-6">
                  <div className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${currentStep >= 1 ? 'bg-black text-white' : 'bg-gray-200'}`}>
                        1
                      </div>
                      <span className="text-xs uppercase mt-2 font-medium">Info</span>
                    </div>
                    <div className="w-32 h-px bg-gray-200 mx-4" />
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${currentStep === 2 ? 'bg-black text-white' : 'bg-gray-200'}`}>
                        2
                      </div>
                      <span className="text-xs uppercase mt-2 font-medium">Payment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {currentStep === 1 && (
                <form onSubmit={(e: React.FormEvent) => {
                  e.preventDefault();
                  handleContinue(e as React.MouseEvent<HTMLButtonElement>);
                }}>
                  <h2 className="text-xs font-medium mb-4 uppercase">Contact</h2>
                  <div className="space-y-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-gray-100 text-black placeholder-black/60"
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-gray-100 text-black placeholder-black/60"
                      required
                    />
                    <div className="border border-gray-200 p-4">
                      <label className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          name="newsletter"
                          checked={formData.newsletter}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                        <span className="text-xs">
                          Subscribe to our newsletter for exclusive updates on drops, sales & events.
                        </span>
                      </label>
  
                    </div>
                  </div>

                  <h2 className="text-xs font-medium mt-6 mb-4 uppercase">Delivery Address</h2>
                  <div className="space-y-4">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-gray-100 appearance-none text-black relative z-10"
                      style={{
                        backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')",
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        backgroundSize: '0.65rem auto'
                      }}
                      required
                    >
                      <option value="">Select a country</option>
                      {europeanCountries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-gray-100 text-black placeholder-black/60"
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-gray-100 text-black placeholder-black/60"
                      required
                    />
                    <input
                      type="text"
                      name="street"
                      placeholder="Street name and number"
                      value={formData.street}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-gray-100 text-black placeholder-black/60"
                      required
                    />
                    <input
                      type="text"
                      name="apartment"
                      placeholder="Apartment, suite, etc. (optional)"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-gray-100 text-black placeholder-black/60"
                    />
                    <div className="flex gap-4">
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal code"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-1/2 p-4 bg-gray-100 text-black placeholder-black/60"
                        required
                      />
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-1/2 p-4 bg-gray-100 text-black placeholder-black/60"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-4 mt-8 uppercase text-sm"
                  >
                    Continue
                  </button>

                  <p className="text-[10px] text-center mt-4">
                    By continuing, you agree to our <Link href="/integritetspolicy" className="underline">Terms & Conditions</Link>
                  </p>
                </form>
              )}

              {currentStep === 2 && (
                <div className="p-6">
                  <h2 className="text-xs font-medium mb-4 uppercase">Payment Details</h2>
                  <div className="text-sm mb-6">
                    All transactions are secure and encrypted.
                  </div>

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

            <button 
              onClick={() => setShowPromoCode(!showPromoCode)} 
              className="flex items-center gap-2 w-full justify-between border-t border-gray-200 pt-4 mt-6"
            >
              <span className="text-sm uppercase">+ Add Promotion Code</span>
            </button>
            {showPromoCode && (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Enter promotion code"
                  className="w-full p-2 border border-gray-200"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                {promoCode && (
                  <p className="text-red-500 text-sm mt-2">Discount code is not valid</p>
                )}
              </div>
            )}

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