"use client";
import { useProduct } from "../../../app/context/ProductContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { DEFAULT_PRODUCT_DETAILS } from "../../../../components/ProductDetails/ProductDetails";

const ProductPage = () => {
  const { singleProduct, addProduct, setCartOpen } = useProduct();
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const buttonRef = useRef(null);
  const router = useRouter();

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



  if (!singleProduct) {
    return <p>Loading...</p>;
  }

  return (
    <div className=" container mx-auto p-10">
      <button className="mb-4 px-4 py-2 bg-black rounded" onClick={() => router.push("/shop")}>
        ← Back to Shop
      </button>

      <div className="flex flex-col items-start gap-6 lg:flex-row">

        <section className="flex flex-col ">
        <Image 
          src={singleProduct.thumbnail_url} 
          alt={singleProduct.name} 
          width={500} 
          height={500} 
          className="w-auto h-auto object-cover rounded" 
        />
        <h1 className=" hidden text-[80px] text-center font-bold text-white/90  lg:block">GET IT NOW!</h1>
      </section>

        <div className="flex flex-col w-full gap-4">

          <h1 className="text-5xl font-bold text-black py-5">{singleProduct.name}</h1>
            <section className=" bg-white/90 p-5 rounded-lg">
              <p className="text-black text-lg py-2 text-center">{DEFAULT_PRODUCT_DETAILS.description}</p>
              <p className="text-black py-10">Features: {DEFAULT_PRODUCT_DETAILS.features.map((feature, index) => <li key={index}>{feature}</li>)}</p>
     
              <button 
                ref={buttonRef}
                className=" w-full px-4 lg:w-1/2 font-bold py-2 bg-black rounded cursor-pointer" 
                onClick={() => {
                  addProduct(singleProduct);
                  setCartOpen(true); // ✅ Open cart when clicked
                }}
              >
                Add to Cart
              </button>
              <p className="text-black py-0 text-sm">Made on demand</p>
            </section>
        </div>
      </div>
      {!isButtonVisible && (
        <div className="fixed bottom-0 left-0 w-full bg-transparent text-white p-4 flex justify-center">
            <button
              className="w-full px-4 lg:w-1/2 font-bold py-2 bg-black rounded cursor-pointer"
              onClick={() => {
                addProduct(singleProduct);
                setCartOpen(true); // ✅ Open cart when clicked
              }}
            >
              Add to Cart
            </button>
        </div>
      )}
      
    </div>
  );
};

export default ProductPage;