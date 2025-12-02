// app/components/BoxProduct.tsx
"use client";

import Link from "next/link";
import React from "react";
import { Product } from "../../types/ProductRes";
import Image from "next/image";
import ico_heart from "../../assets/images/ico_heart.png";
import ico_search from "../../assets/images/ico_search.png";
import ico_reload from "../../assets/images/ico_reload.png";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import { formatBigNumber } from "@/utils/formatBigNumber";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export const BoxProduct = ({ product }: { product: Product }) => {
  const {isAuthenticated} = useAuth();
  const router = useRouter();
  const { addToCart, cartCount, error, loading: cartLoading } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    try {
      await addToCart(product.id);
      toast.success("Thêm sản phẩm thành công!");
    } catch {
      toast.error("Thêm sản phẩm thất bại!");
    }
  };

  const isAdding = cartLoading; // hoặc refine theo trạng thái cụ thể
  return (
    <li className="mt-6 md:mt-0 text-center group relative list-none bg-white p-2.5 rounded-md shadow-sm">
      <Link href={`/product/${product.id}`} className="block">
        {!product.quantity ? (
          <span className="absolute py-1 text-xs px-2 top-3 left-3 bg-black text-white rounded-xl">
            Out of stock
          </span>
        ) : ""}

        {product.discount ? (
          <span className="absolute py-1 text-xs px-2 top-3 left-3 bg-red-600 text-white rounded-xl">
            -{product.discount}%
          </span>
        ) : ""}

        <ul className="absolute bottom-28 left-4 z-10 flex flex-col gap-3">
          <li className="opacity-0 translate-y-4 duration-200 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
            <button
              type="button"
              className="shadow-lg p-3 rounded-full bg-white hover:bg-slate-200 transition-all"
              aria-label="Favorite"
            >
              <Image src={ico_heart} alt="heart" className="w-5 h-5" />
            </button>
          </li>
          <li className="opacity-0 translate-y-4 duration-200 group-hover:opacity-100 group-hover:translate-y-0 transition-all delay-100">
            <button
              type="button"
              className="shadow-lg p-3 rounded-full bg-white hover:bg-slate-200 transition-all"
              aria-label="Reload"
            >
              <Image src={ico_reload} alt="reload" className="w-5 h-5" />
            </button>
          </li>
          <li className="opacity-0 translate-y-4 duration-200 group-hover:opacity-100 group-hover:translate-y-0 transition-all delay-200">
            <button
              type="button"
              className="shadow-lg p-3 rounded-full bg-white hover:bg-slate-200 transition-all"
              aria-label="Search"
            >
              <Image src={ico_search} alt="search" className="w-5 h-5" />
            </button>
          </li>
        </ul>

        <div className="rounded-xl overflow-hidden bg-white lg:h-[385px]">
          <img
            className="block w-full h-full object-cover"
            src={product.images[0]?.url ?? ""}
            alt={product.name}
          />
        </div>
        <h3 className="text-base font-medium mt-2 line-clamp-2">
          {product.name}
        </h3>
      </Link>

      <div className="mt-2 relative h-5 overflow-hidden">
        <div className="absolute inset-x-0 -bottom-5 flex flex-col items-center justify-center group-hover:bottom-0 transition-all duration-300">
          <div className="flex items-center justify-center font-bold text-sm text-center">
            <span>{formatBigNumber(+product.price, true)}</span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.quantity}
            className="mt-2 uppercase text-xs font-medium tracking-widest relative before:absolute before:bottom-0 before:w-0 before:h-[1px] before:bg-black before:left-0 hover:before:w-full before:transition-all before:duration-500 disabled:opacity-50"
          >
            Add to cart
          </button>
          {/* {error && <p className="text-xs text-red-600 mt-1">{error}</p>} */}
        </div>
      </div>
    </li>
  );
};
