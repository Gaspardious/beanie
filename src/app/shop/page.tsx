"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProduct } from "../context/ProductContext";
import Image from "next/image";

const Shop = () => {
  const [products, setProducts] = useState<{ id: number; name: string; thumbnail_url: string; external_id: string, description: string, price: number}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setSingleProduct } = useProduct();

  const handleProductClick = (product: { id: number; name: string; thumbnail_url: string; external_id: string; description: string; price: number }) => {
    setSingleProduct({
      ...product,
      cartItemId: crypto.randomUUID(), 
      quantity: 1,
    });
  
    router.push(`/shop/${product.id}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        console.log("Fetched Products:", data);
        setProducts(data.map((product: { id: number; name: string; thumbnail_url: string; external_id?: string, description: string, price: number }) => ({
          ...product,
          external_id: product.external_id || ""
        })));
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
      
    };

    fetchProducts();
  }, []);

  const ProductSkeleton = () => (
    <div className="p-4 border-2 border-gray-300 rounded-lg shadow-lg bg-white flex flex-col items-center">
      <div className="w-full h-64 bg-gray-200 animate-pulse rounded mb-2"></div>
      <div className="w-3/4 h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
      <div className="w-1/4 h-4 bg-gray-200 animate-pulse rounded"></div>
    </div>
  );

  return (
    <div className="w-full pb-10 bg-white/50 relative">
      <div className="relative h-[300px] w-full bg-cover bg-center bg-no-repeat bg-[url('/beanie.webp')]"> 
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="text-3xl sm:text-6xl font-extrabold text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Shop</h1>
        <p className="text-1xl w-5/6 sm:text-2xl text-center font-extrabold text-white absolute bottom-6 left-1/2 transform -translate-x-1/2">Browse our fine collection of beanies</p>
      </div>
       
      <p className="text-lg pt-6 sm:text-2xl font-thin text-black text-center p-4">
        Our collection of beanies are made with the finest materials and are perfect for any occasion.
      </p>

      <div className="container mx-auto p-4">
        {error && <p className="text-red-500">{error}</p>}
        <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {loading ? (
            [...Array(8)].map((_, index) => (
              <li key={index}>
                <ProductSkeleton />
              </li>
            ))
          ) : (
            products.map((product) => (
              <li
                key={product.id}
                className="p-4 border-2 border-gray-300 rounded-lg shadow-lg bg-white flex flex-col items-center cursor-pointer hover:border-gray-700 transition-all duration-200"
                onClick={() => {handleProductClick(product); 
                }}
              >
                <Image src={product.thumbnail_url} alt={product.name} width={500} height={500} className="w-auto h-auto object-cover rounded mb-2" />
                <h2 className="text-lg font-bold text-center text-black">{product.name}</h2>
                <p className="text-black">{typeof product.price === 'number' ? `${product.price} SEK` : '0 SEK'}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Shop;