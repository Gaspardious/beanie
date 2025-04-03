"use client";
import { useProduct } from "../../../app/context/ProductContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { DEFAULT_PRODUCT_DETAILS } from "../../../../components/ProductDetails/ProductDetails";
import Link from "next/link";

// Define Product type to match the one in ProductContext
type Product = {
  id: number;
  name: string;
  thumbnail_url: string;
  external_id: string;
  cartItemId: string;
  quantity: number;
  price: number;
};

// Define type for API product data that might be missing some fields
type APIProduct = {
  id: number;
  name: string;
  thumbnail_url: string;
  external_id?: string;
  price: number;
  description?: string;
};

const ProductPage = () => {
  const { singleProduct, addProduct, setCartOpen, multipleProducts, setSingleProduct: setContextSingleProduct } = useProduct();
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const buttonRef = useRef(null);
  const router = useRouter();
  
  // Mock product images - in a real app, these would come from the product data
  const productImages = [
    { url: singleProduct?.thumbnail_url || '', alt: singleProduct?.name || '' },
  ];

  useEffect(() => {
    if (!singleProduct) {
      router.push("/shop");
    }
  }, [singleProduct, router]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsButtonVisible(entry.isIntersecting),
      { threshold: 1 }
    );

    const currentButtonRef = buttonRef.current;
    if (currentButtonRef) {
      observer.observe(currentButtonRef);
    }

    return () => {
      if (currentButtonRef) {
        observer.unobserve(currentButtonRef);
      }
    };
  }, []);

  // Get similar products
  useEffect(() => {
    if (multipleProducts.length > 0 && singleProduct) {
      const filtered = multipleProducts
        .filter(product => product.id !== singleProduct.id)
        .slice(0, 4); // Limit to 4 similar products
      setSimilarProducts(filtered);
    }
    
    // Fallback: Fetch products if not available in context
    if (multipleProducts.length === 0) {
      fetch('/api/products')
        .then(res => res.json())
        .then(data => {
          if (singleProduct) {
            const filtered = data
              .filter((product: APIProduct) => product.id !== singleProduct.id)
              .slice(0, 4)
              .map((product: APIProduct) => ({
                ...product,
                external_id: product.external_id || '',
                cartItemId: '',
                quantity: 0
              }));
            setSimilarProducts(filtered);
          }
        })
        .catch(err => console.error('Error fetching similar products:', err));
    }
  }, [multipleProducts, singleProduct]);

  if (!singleProduct) {
    return <p>Loading...</p>;
  }

  // Handle product click for similar products
  const handleSimilarProductClick = (product: Product) => {
    const enhancedProduct = {
      ...product,
      cartItemId: product.cartItemId || crypto.randomUUID(),
      quantity: product.quantity || 1
    };
    setContextSingleProduct(enhancedProduct);
    router.push(`/shop/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-[120px]">
      <div className="max-w-[1240px] mx-auto bg-white p-4">
        {/* Breadcrumb navigation */}
        <div className="py-2 text-xs">
          <Link
            href="/shop"
            className="text-white hover:underline px-3 py-1 bg-black/80 "
          >
            Back to Shop
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side - Product images */}
          <div className="md:w-2/3">
            <div className="mb-6">
              <Image 
                src={productImages[selectedImage].url} 
                alt={productImages[selectedImage].alt} 
                width={700} 
                height={700} 
                className="w-full h-auto object-contain bg-gray-50" 
              />
            </div>
            
            {/* Thumbnail images */}
            <div className="flex space-x-2">
              {productImages.map((image, index) => (
                <div 
                  key={index}
                  className={`border-2 ${selectedImage === index ? 'border-black' : 'border-gray-200'} cursor-pointer`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image 
                    src={image.url} 
                    alt={`Thumbnail ${index + 1}`} 
                    width={80} 
                    height={80} 
                    className="w-20 h-20 object-cover" 
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Right side - Product info */}
          <div className="md:w-1/3">
            <div className="mb-6">
              <h2 className="text-sm uppercase text-gray-500 mb-2">ABOUT</h2>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{singleProduct.name}</h1>
              <p className="text-2xl font-medium text-gray-900">{singleProduct.price} SEK</p>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700">{DEFAULT_PRODUCT_DETAILS.description}</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-sm uppercase text-gray-500 mb-2">Features</h2>
              <ul className="list-disc pl-5 text-gray-700">
                {DEFAULT_PRODUCT_DETAILS.features.map((feature, index) => (
                  <li key={index} className="mb-1">{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <button 
                ref={buttonRef}
                className="w-full bg-black text-white py-3 font-medium hover:bg-gray-800 transition" 
                onClick={() => {
                  addProduct(singleProduct);
                  setCartOpen(true); 
                }}
              >
                Add to Cart
              </button>
            </div>
            
            {/* Payment options */}
            <div className="mb-6 text-center">
              <p className="text-sm text-gray-500 mb-2">Payment options:</p>
              <div className="flex justify-center space-x-2">
                <div className="w-10 h-6 bg-gray-200 rounded">
                <Image 
                  src="/images/visa.svg" 
                  alt="Hero Beanie" 
                  width={50} 
                  height={50} 
                  priority 
                  className="object-cover w-full h-full"
                />
                </div>
                <div className="w-10 h-6 bg-gray-200 rounded">
                <Image 
                  src="/images/klarna.svg" 
                  alt="Hero Beanie" 
                  width={50} 
                  height={50} 
                  priority 
                  className="object-cover w-full h-full"
                />
                </div>
                <div className="w-10 h-6 bg-gray-200 rounded">

                <Image 
                  src="/images/mastercard.svg" 
                  alt="Hero Beanie" 
                  width={50} 
                  height={50} 
                  priority 
                  className="object-cover w-full h-full"
                />
                </div>
              </div>
            </div>
            
            {/* Why shop at Beanify section */}
            <div className="bg-gray-100 p-4 rounded">
              <h2 className="font-semibold mb-2 text-gray-900">Why shop at Beanify:</h2>
              <ul className="text-sm space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">●</span>
                  Quality products
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">●</span>
                  Free shipping over 399 kr
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">●</span>
                  Free returns
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">●</span>
                  Secure payment
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Alternative products section */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-semibold mb-6 border-b pb-2 text-gray-900">You might also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {similarProducts.map((product: Product) => (
                <div 
                  key={product.id} 
                  className="border border-gray-200 bg-white p-2 cursor-pointer hover:shadow-md transition"
                  onClick={() => handleSimilarProductClick(product)}
                >
                  <div className="bg-gray-50 mb-2">
                    <Image 
                      src={product.thumbnail_url} 
                      alt={product.name} 
                      width={200} 
                      height={200} 
                      className="w-full h-40 object-contain" 
                    />
                  </div>
                  <h3 className="font-medium text-sm text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-900">{product.price} SEK</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Sticky add to cart button */}
      {!isButtonVisible && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md p-4 flex justify-center z-40">
          <button
            className="w-full max-w-md bg-black text-white py-3 font-medium"
            onClick={() => {
              addProduct(singleProduct);
              setCartOpen(true); 
            }}
          >
            Add to Cart SEK
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductPage;