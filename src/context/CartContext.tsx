// context/CartContext.tsx
"use client";

import { CartItem } from "@/types/Cart";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface CartContextValue {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  cartCount: number;
  refreshCart: () => Promise<void>;
  addToCart: (productId: number) => Promise<void>;
  removeFromCart: (cardId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  updateQuantityProduct: (cartId: number, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const API = process.env.NEXT_PUBLIC_API_END_POINT || "https://e-commerce-rd5w.onrender.com";

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("accessToken");

  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/cart`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Failed to fetch cart");
      }
      const data = await res.json();
      setItems(data.carts || []);
    } catch (e: any) {
      setError(e?.message || "Cannot load cart");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId: number) => {
    setError(null);
    try {
      const res = await fetch(`${API}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
      const items = await res.json();
      setItems(items);
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Add to cart failed");
      }
      // refresh real cart to reconcile
      await fetchCart();
    } catch (e: any) {
      setError(e?.message || "Add to cart error");
      // rollback: refetch
      await fetchCart();
      throw e;
    }
  };

  const updateQuantityProduct = async (cartId: number, quantity: number) => {
    try {
      const res = await fetch(`${API}/cart/${cartId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Remove failed");
      }
      await fetchCart();
    } catch (e: any) {
      setError(e?.message || "Remove error");
    }
  };
  console.log(items, "items");

  const removeFromCart = async (cartId: number) => {
    setError(null);
    try {
      const res = await fetch(`${API}/cart/${cartId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Remove failed");
      }
      await fetchCart();
    } catch (e: any) {
      setError(e?.message || "Remove error");
    }
  };

  const clearCart = async () => {
    setError(null);
    try {
      const res = await fetch(`${API}/cart/clear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Clear cart failed");
      }
      setItems([]);
    } catch (e: any) {
      setError(e?.message || "Clear error");
    }
  };

  const value: CartContextValue = {
    items,
    loading,
    error,
    cartCount: items.length,
    refreshCart: fetchCart,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantityProduct,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
