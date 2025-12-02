"use client";
import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

const ActionDetailProductAddToCart = ({ productId }: { productId: number }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, updateQuantityProduct } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  return (
    <div className="mt-6 flex items-center gap-3">
      <div className="flex items-center w-max relative">
        <button
          // onClick={() => {
          //     updateQuantityProduct()
          // }}
          type="button"
          className="text-lg block text-[0px] absolute left-4"
        >
          <span className="text-2xl leading-[24px]">-</span>
        </button>
        <input
          type="text"
          className="w-[120px] h-[50px] border px-10 border-gray rounded-full text-center"
          value={quantity}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setQuantity(Number(e.target.value))
          }
        />
        <button
          onClick={() => {
            setQuantity(quantity + 1);
            addToCart(productId);
            toast.success("Thêm sản phẩm thành công!");
          }}
          type="button"
          className="text-lg block text-[0px] absolute right-4"
        >
          <span className="text-2xl leading-[24px]">+</span>
        </button>
      </div>

      <button
        onClick={() => {
          if (isAuthenticated) {
            addToCart(productId);
            // toast.success("Thêm sản phẩm thành công!");
            return;
          }
          router.push("/login")
        }}
        type="button"
        className="h-[50px] bg-black text-white font-semibold text-sm px-4 flex-1 rounded-full hover:bg hover:bg-white border hover:border-black hover:text-black transition-all"
      >
        Add To Cart
      </button>
      {/* <button
                  type="button"
                  className="p-4 bg-white border border-[#e6e6e6] rounded-full"
                >
                  <Image className="w-4" src={ico_heart} alt="" />
                </button> */}
    </div>
  );
};

export default ActionDetailProductAddToCart;
