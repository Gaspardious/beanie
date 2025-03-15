"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Product = {
  id: number;
  name: string;
  thumbnail_url: string;
  external_id: string;
};

type ProductContextType = {
  singleProduct: Product | null; 
  setSingleProduct: React.Dispatch<React.SetStateAction<Product | null>>; 
  multipleProducts: Product[];
  setMultipleProducts: React.Dispatch<React.SetStateAction<Product[]>>; 
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
  menuCart: boolean;
  setCartOpen: (value: boolean) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [multipleProducts, setMultipleProducts] = useState<Product[]>([]);
  const [singleProduct, setSingleProduct] = useState<Product | null>(null); 
  const [menuCart, setCartOpen] = useState(false);

  // ✅ Add a product to the cart
  const addProduct = (product: Product) => {
    setMultipleProducts((prev) => [...prev, product]);
  };

  // ✅ Remove a product from the cart
  const removeProduct = (productId: number) => {
    setMultipleProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  return (
    <ProductContext.Provider value={{ multipleProducts, setMultipleProducts, singleProduct, setSingleProduct, addProduct, removeProduct, menuCart, setCartOpen }}>
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