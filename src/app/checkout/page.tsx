"use client";
import { useProduct } from "../../app/context/ProductContext";
import Image from "next/image";
import { useState } from "react";

const CheckoutPage = () => {
  const { checkoutProducts } = useProduct();
  const [currentStep, setCurrentStep] = useState(1);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
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

  const calculateTotal = () => {
    return checkoutProducts.reduce((total, product) => total + (product.quantity * product.price), 0);
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

  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black pt-[120px]">
      {/* Mobile Order Summary Toggle */}
      <div className="md:hidden border-b border-gray-200">
        <button 
          onClick={() => setShowOrderSummary(!showOrderSummary)}
          className="flex items-center justify-between w-full p-4 text-sm"
        >
          <span>SHOW ORDER SUMMARY</span>
          <div className="flex items-center">
            <span className="mr-2">TOTAL {calculateTotal()} SEK</span>
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
                      <span className="text-sm">−</span>
                      <span className="w-8 text-center text-sm">{product.quantity}</span>
                      <span className="text-sm">+</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{product.price} SEK</p>
                  </div>
                </div>
              ))}
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
              <div className="flex items-center px-4 py-3">
                <div className="flex items-center gap-2 flex-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${currentStep >= 1 ? 'bg-black text-white' : 'bg-gray-200'}`}>
                    1
                  </div>
                  <span className="text-xs uppercase">Info</span>
                </div>
                <div className="h-px bg-gray-200 flex-1" />
                <div className="flex items-center gap-2 flex-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${currentStep >= 2 ? 'bg-black text-white' : 'bg-gray-200'}`}>
                    2
                  </div>
                  <span className="text-xs uppercase">Shipping</span>
                </div>
                <div className="h-px bg-gray-200 flex-1" />
                <div className="flex items-center gap-2 flex-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${currentStep === 3 ? 'bg-black text-white' : 'bg-gray-200'}`}>
                    3
                  </div>
                  <span className="text-xs uppercase">Payment</span>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xs font-medium mb-4 uppercase">Contact</h2>
                  <div className="space-y-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-gray-100 text-black placeholder-black/60"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-gray-100 text-black placeholder-black/60"
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
                      <div className="flex gap-4 mt-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="preferences.menswear"
                            checked={formData.preferences.menswear}
                            onChange={handleInputChange}
                          />
                          <span className="text-xs">Menswear</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="preferences.womenswear"
                            checked={formData.preferences.womenswear}
                            onChange={handleInputChange}
                          />
                          <span className="text-xs">Womenswear</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="preferences.both"
                            checked={formData.preferences.both}
                            onChange={handleInputChange}
                          />
                          <span className="text-xs">Both</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-xs font-medium mt-6 mb-4 uppercase">Delivery Address</h2>
                  <div className="space-y-4">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-gray-100 appearance-none text-black"
                      style={{
                        backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')",
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        backgroundSize: '0.65rem auto'
                      }}
                    >
                      <option value="Sweden">Sweden</option>
                    </select>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-gray-100 text-black placeholder-black/60"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-gray-100 text-black placeholder-black/60"
                    />
                    <input
                      type="text"
                      name="street"
                      placeholder="Street name and number"
                      value={formData.street}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-gray-100 text-black placeholder-black/60"
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
                      />
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-1/2 p-4 bg-gray-100 text-black placeholder-black/60"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleContinue}
                    className="w-full bg-black text-white py-4 mt-8 uppercase text-sm"
                  >
                    Continue
                  </button>

                  <p className="text-[10px] text-center mt-4">
                    By continuing, you agree to our <a href="#" className="underline">Terms & Conditions</a>
                  </p>
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
                        <button className="px-3 py-1 text-sm">−</button>
                        <span className="px-3 py-1 text-sm border-l border-r border-gray-200">{product.quantity}</span>
                        <button className="px-3 py-1 text-sm">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between mb-2">
                <span className="text-sm">Subtotal</span>
                <span className="text-sm">{calculateTotal()} SEK</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-sm uppercase">Total incl. VAT & Duties</span>
                <span className="text-sm">{calculateTotal()} SEK</span>
              </div>
            </div>

            <button className="flex items-center gap-2 w-full justify-between border-t border-gray-200 pt-4 mt-6">
              <span className="text-sm uppercase">+ Add Promotion Code</span>
            </button>

            <div className="mt-8">
              <button className="flex items-center gap-2 w-full justify-between text-sm uppercase">
                <span>Need Help?</span>
                <span>+</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;