"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Product = {
  id: number;
  name: string;
  thumbnail_url: string;
  external_id: string;
  cartItemId: string;
  quantity: number;
};

type ProductContextType = {
  singleProduct: Product | null; 
  setSingleProduct: React.Dispatch<React.SetStateAction<Product | null>>; 
  multipleProducts: Product[];
  setMultipleProducts: React.Dispatch<React.SetStateAction<Product[]>>; 
  checkoutProducts: Product[];
  setCheckoutProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  addProduct: (product: Product) => void;
  removeProduct: (cartItemId: string) => void;
  menuCart: boolean;
  setCartOpen: (value: boolean) => void;
  removeProductFromCheckout: (cartItemId: string) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [multipleProducts, setMultipleProducts] = useState<Product[]>([]);
  const [singleProduct, setSingleProduct] = useState<Product | null>(null); 
  const [checkoutProducts, setCheckoutProducts] = useState<Product[]>([]);
  const [menuCart, setCartOpen] = useState(false);

  // ✅ Add a product to the cart
  const addProduct = (product: Product) => {
    setMultipleProducts((prev) => {
      const existingProduct = prev.find((p) => p.id === product.id);
  
      if (existingProduct) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...product, cartItemId: crypto.randomUUID(), quantity: 1 }];
      }
    });
  };

  // ✅ Remove a product from the cart
  const removeProduct = (cartItemId: string) => {
    setMultipleProducts((prev) =>
      prev
        .map((product) =>
          product.cartItemId === cartItemId
            ? { ...product, quantity: product.quantity - 1 } // ✅ Reduce quantity
            : product
        )
        .filter((product) => product.quantity > 0) // ✅ Remove only if quantity is 0
    );
  
    // ✅ Also remove from checkout
    setCheckoutProducts((prev) =>
      prev
        .map((product) =>
          product.cartItemId === cartItemId
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
        .filter((product) => product.quantity > 0) // ✅ Sync with checkout
    );
  };

  const removeProductFromCheckout = (cartItemId: string) => {
    setCheckoutProducts((prev) => prev.filter((product) => product.cartItemId !== cartItemId));
  };

  return (
    <ProductContext.Provider value={{ multipleProducts, setMultipleProducts, singleProduct, setSingleProduct, addProduct, removeProduct, menuCart, checkoutProducts, setCheckoutProducts, setCartOpen, removeProductFromCheckout }}>
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