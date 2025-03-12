"use client";
import { useProduct } from "../../../app/context/ProductContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";

const ProductPage = () => {
  const { selectedProduct } = useProduct();
  const router = useRouter();

  useEffect(() => {
    if (!selectedProduct) {
      router.push("/shop"); // Redirect if no product is selected
    }
  }, [selectedProduct, router]);

  if (!selectedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-10">
      <button className="mb-4 px-4 py-2 bg-gray-200 rounded" onClick={() => router.push("/shop")}>
        ← Back to Shop
      </button>

      <div className="flex flex-col items-center">
        <Image src={selectedProduct.thumbnail_url} alt={selectedProduct.name} width={500} height={500} className="w-auto h-auto object-cover rounded mb-5" />
        <h1 className="text-3xl font-bold">{selectedProduct.name}</h1>
      </div>
    </div>
  );
};

export default ProductPage;