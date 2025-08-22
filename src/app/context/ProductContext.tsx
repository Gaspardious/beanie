"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Product = {
  id: number;
  name: string;
  thumbnail_url: string;
  external_id: string;
  cartItemId: string;
  quantity: number;
  price: number;
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
  clearCart: () => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [multipleProducts, setMultipleProducts] = useState<Product[]>([]);
  const [singleProduct, setSingleProduct] = useState<Product | null>(null); 
  const [checkoutProducts, setCheckoutProducts] = useState<Product[]>([]);
  const [menuCart, setCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('beanie-cart');
      const savedCheckout = localStorage.getItem('beanie-checkout');
      
      if (savedCart) {
        try {
          setMultipleProducts(JSON.parse(savedCart));
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
        }
      }
      
      if (savedCheckout) {
        try {
          setCheckoutProducts(JSON.parse(savedCheckout));
        } catch (error) {
          console.error('Error loading checkout from localStorage:', error);
        }
      }
      
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('beanie-cart', JSON.stringify(multipleProducts));
    }
  }, [multipleProducts, isLoaded]);

  // Save checkout to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('beanie-checkout', JSON.stringify(checkoutProducts));
    }
  }, [checkoutProducts, isLoaded]);

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

  const clearCart = () => {
    setMultipleProducts([]);
    setCheckoutProducts([]);
  };

  return (
    <ProductContext.Provider value={{ multipleProducts, setMultipleProducts, singleProduct, setSingleProduct, addProduct, removeProduct, menuCart, checkoutProducts, setCheckoutProducts, setCartOpen, removeProductFromCheckout, clearCart }}>
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