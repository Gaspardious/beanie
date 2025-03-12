"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProduct } from "../context/ProductContext";
import Image from "next/image";

const Shop = () => {
  const [products, setProducts] = useState<{ id: number; name: string; thumbnail_url: string; external_id: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setSelectedProduct } = useProduct();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        console.log("Fetched Products:", data);
        setProducts(data.map((product: { id: number; name: string; thumbnail_url: string; external_id?: string }) => ({
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

  return (
    <div className="w-full pb-10 bg-blue-50 relative">
      <h1 className="text-3xl mt-10 sm:text-6xl font-extrabold text-black text-center">
        Shop
      </h1>

      <div className="container mx-auto p-5 mt-20">
        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <li
                key={product.id}
                className="p-4 border border-gray-300 rounded shadow bg-white flex flex-col items-center cursor-pointer"
                onClick={() => {
                  setSelectedProduct(product);
                  router.push(`/shop/${product.id}`); // Navigate to product page
                }}
              >
                <Image src={product.thumbnail_url} alt={product.name} width={500} height={500} className="w-auto h-auto object-cover rounded mb-2" />
                <h2 className="text-lg font-bold text-center text-black">{product.name}</h2>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Shop;