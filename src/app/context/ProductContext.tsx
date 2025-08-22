"use client";
import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";

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
  updateCheckoutQuantity: (cartItemId: string, change: number) => void;
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
      
      if (savedCart) {
        try {
          const cartData = JSON.parse(savedCart);
          setMultipleProducts(cartData);
          setCheckoutProducts(cartData); // Initialize checkout with same data
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
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
    const updateProducts = (products: Product[]) => {
      return products
        .map((product) =>
          product.cartItemId === cartItemId
            ? { ...product, quantity: product.quantity - 1 } // ✅ Reduce quantity
            : product
        )
        .filter((product) => product.quantity > 0); // ✅ Remove only if quantity is 0
    };

    setMultipleProducts(updateProducts);
    setCheckoutProducts(updateProducts);
  };

  const removeProductFromCheckout = (cartItemId: string) => {
    const filterProducts = (products: Product[]) => {
      return products.filter((product) => product.cartItemId !== cartItemId);
    };

    setCheckoutProducts(filterProducts);
    setMultipleProducts(filterProducts);
  };

  const clearCart = useCallback(() => {
    setMultipleProducts([]);
    setCheckoutProducts([]);
  }, []);

  const updateCheckoutQuantity = (cartItemId: string, change: number) => {
    // Update both cart and checkout simultaneously
    const updateProducts = (products: Product[]) => {
      return products
        .map((product) =>
          product.cartItemId === cartItemId ? { ...product, quantity: product.quantity + change } : product
        )
        .filter((product) => product.quantity > 0); // Remove if quantity becomes 0
    };

    setMultipleProducts(updateProducts);
    setCheckoutProducts(updateProducts);
  };

  return (
    <ProductContext.Provider value={{ multipleProducts, setMultipleProducts, singleProduct, setSingleProduct, addProduct, removeProduct, menuCart, checkoutProducts, setCheckoutProducts, setCartOpen, removeProductFromCheckout, clearCart, updateCheckoutQuantity }}>
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