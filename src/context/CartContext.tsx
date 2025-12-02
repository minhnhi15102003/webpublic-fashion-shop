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
const API = process.env.NEXT_PUBLIC_API_END_POINT;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Đọc token sau khi client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

  const fetchCart = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API}/cart`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setItems(data.carts || []);
    } catch (e: any) {
      setError(e.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchCart();
  }, [token, fetchCart]);

  const addToCart = async (productId: number) => {
    if (!token) return;

    await fetch(`${API}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });

    await fetchCart();
  };

  const updateQuantityProduct = async (cartId: number, quantity: number) => {
    if (!token) return;

    await fetch(`${API}/cart/${cartId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    });

    await fetchCart();
  };

  const removeFromCart = async (cartId: number) => {
    if (!token) return;

    await fetch(`${API}/cart/${cartId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await fetchCart();
  };

  const clearCart = async () => {
    if (!token) return;

    await fetch(`${API}/cart/clear`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        error,
        cartCount: items.length,
        refreshCart: fetchCart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantityProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
