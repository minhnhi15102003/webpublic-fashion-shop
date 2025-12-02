'use server';

import { Product } from "@/types/ProductRes";

export default async function getProductById(id: string): Promise<Product | null> {
  const apiEndpoint = process.env.NEXT_PUBLIC_API_END_POINT || "https://e-commerce-rd5w.onrender.com";

  const res = await fetch(`${apiEndpoint}/product/${id}`, {
    cache: "no-store", 
  });

  if (!res.ok) return null;

  return res.json();
}
