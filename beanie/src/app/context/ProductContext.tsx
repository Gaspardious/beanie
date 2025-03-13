"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Product = {
  id: number;
  name: string;
  thumbnail_url: string;
  external_id: string;
};

type ProductContextType = {
  selectedProducts: Product[]; // ✅ Now an array
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]); // ✅ Use array

  // ✅ Add a product to the cart
  const addProduct = (product: Product) => {
    setSelectedProducts((prev) => [...prev, product]);
  };

  // ✅ Remove a product from the cart
  const removeProduct = (productId: number) => {
    setSelectedProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  return (
    <ProductContext.Provider value={{ selectedProducts, addProduct, removeProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
}