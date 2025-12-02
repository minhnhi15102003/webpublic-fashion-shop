'use server';

import { Product } from "@/types/ProductRes";

export default async function getProductById(id: string): Promise<Product | null> {
  const apiEndpoint = process.env.API_END_POINT ?? "http://localhost:3001";

  const res = await fetch(`${apiEndpoint}/product/${id}`, {
    cache: "no-store", 
  });

  if (!res.ok) return null;

  return res.json();
}
