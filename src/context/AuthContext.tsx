// context/AuthContext.tsx
"use client";

import { User } from "@/types/User";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    userName: string,
    phone: string,
    name: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  // refreshUser: () => Promise<void>;
}
const API = process.env.NEXT_PUBLIC_API_END_POINT || "https://e-commerce-rd5w.onrender.com";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [bootstrapped, setBootstrapped] = useState(false); // tránh gọi nhiều lần

  // mount: cố gắng lấy session
  useEffect(() => {
    if (bootstrapped) return;
    let aborted = false;
    (async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        console.log(token,'token');
        
        const res = await fetch(`${API}/users`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("not authenticated");
        const data = await res.json();
        if (!aborted) setUser(data.user);
      } catch {
        if (!aborted) setUser(null);
      } finally {
        if (!aborted) {
          setLoading(false);
          setBootstrapped(true);
        }
      }
    })();
    return () => {
      aborted = true;
    };
  }, [API, bootstrapped]);

  const login = async (email: string, password: string, role = "USER") => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Login failed");
      }
      const data = await res.json();
      console.log(data, "data");
      localStorage.setItem("accessToken", data.accessToken);
      setUser(data.user);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (
    email: string,
    password: string,
    userName: string,
    phone: string,
    name: string
  ) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, userName, phone, name }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Signup failed");
      }
      const data = await res.json();
      setUser(data.user);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await fetch(`${API}/auth/log-out`, {
        method: "POST",
      });
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextValue = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    // refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
