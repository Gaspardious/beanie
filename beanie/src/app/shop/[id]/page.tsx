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
        <div className=" pb-10 bg-white/50 relative">
    <div className="relative h-[300px] w-full bg-cover bg-center bg-no-repeat bg-[url('/beanie.webp')]"> 
        <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <h1 className="text-3xl mt-10 sm:text-6xl font-extrabold text-white absolute top-20 left-1/2 transform -translate-x-1/2">Shop</h1>
        <p className="text-1xl w-5/6 sm:text-2xl text-center  mt-20 sm:mt-20 font-extrabold text-white absolute top-30 left-1/2 transform -translate-x-1/2">{singleProduct.name}</p>
       

      <section className="flex flex-row items-center gap-5">
        <button className="mb-4 px-4 py-2 bg-black rounded" onClick={() => router.push("/shop")}>
          ← Back to Shop
        </button>
        <h1 className="  text-[11vw] text-center font-bold text-white/90 pb-2 lg:hidden">GET IT NOW!</h1>
      </section>
      <div className="flex flex-col items-start gap-6 lg:flex-row">

        <section className="flex flex-col items-center gap-4 w-full">
        <Image 
          src={singleProduct.thumbnail_url} 
          alt={singleProduct.name} 
          width={500} 
          height={500} 
          className="w-auto h-auto object-cover rounded" 
        />
        <h1 className=" hidden text-[76px] text-center font-bold text-white/90  lg:block">GET IT NOW!</h1>
      </section>

        <div className="flex flex-col w-full gap-4">

          <h1 className="text-[50px] text-center font-bold text-black py-5 uppercase">{singleProduct.name}</h1>
     
            <section className=" bg-white/90 p-5 rounded-lg">
              <p className="text-black text-lg py-2 text-center">{DEFAULT_PRODUCT_DETAILS.description}</p>
              <div className="flex flex-row justify-between items-center gap-4">
              <p className="text-black py-10"> <span className="font-bold text-xl">Features:</span> {DEFAULT_PRODUCT_DETAILS.features.map((feature, index) => <li key={index}>{feature}</li>)}</p>
              <p className=" bg-black p-5 rounded-3xl w-content h-content text-white text-4xl font-oswald text-center mr-10">{DEFAULT_PRODUCT_DETAILS.price} SEK </p>
              </div>
              <p className="text-black py-0 text-sm">Made on demand</p>
              <button 
                ref={buttonRef}
                className=" w-full px-4 lg:w-1/2 font-bold py-2 bg-black rounded cursor-pointer" 
                onClick={() => {
                  addProduct(singleProduct);
                  setCartOpen(true); 
                }}
              >
                Add to Cart
              </button>
              <p className="text-red-500 font-bold py-0 text-sm">PAYMENT OPTIONS IMAGES</p>

            </section>
        </div>
      </div>
      {!isButtonVisible && (
        <div className="fixed bottom-0 left-0 w-full bg-transparent text-white p-4 flex justify-center">
            <button
              className="w-full px-4 lg:w-1/2 font-bold py-2 bg-black rounded cursor-pointer"
              onClick={() => {
                addProduct(singleProduct);
                setCartOpen(true); 
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