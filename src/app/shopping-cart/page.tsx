"use client";
import React, { useState } from "react";
import ico_trash from "../../assets/images/ico_trash.png";
import Image from "next/image";
import { toast } from "react-toastify";
import { formatBigNumber } from "@/utils/formatBigNumber";
import { useCart } from "@/context/CartContext";
const ShoppingCart = () => {
  const { items, addToCart, updateQuantityProduct, removeFromCart } = useCart();
  const handleAddToCart = async (productId: number) => {
    await addToCart(productId);
    toast.success("Cập nhật sản phẩm thành công!");
  };
  const handleRemoveCartItem = (cardId: number) => {
    removeFromCart(cardId);
    toast.error("Xóa sản phẩm thành công!");
  };
  const handleQuantityProduct = (cardId: number, quantity: number) => {
    updateQuantityProduct(cardId, quantity);
    toast.success("Cập nhật sản phẩm thành công!");
  };
  return (
    <section className="">
      <div className="pt-20">
        <h2 className="text-3xl font-semibold text-center">Shopping Cart</h2>

        <div className="container">
          <div className="grid grid-cols-6 mt-10 gap-8">
            <div className="col-span-4">
              <div className="border border-gray rounded-lg">
                <div className="flex">
                  <div className="p-5 border border-gray w-2/4 flex items-center justify-center">
                    Product
                  </div>
                  <div className="p-5 border border-gray w-1/4 flex items-center justify-center">
                    Quantity
                  </div>
                  <div className="p-5 border border-gray w-1/4 flex items-center justify-center">
                    Total
                  </div>
                  <div className="p-5 border border-gray w-1/4 flex items-center justify-center"></div>
                </div>

                {items.length > 0 &&
                  items.map((i) => (
                    <div key={i.id} className="flex">
                      <div className="p-5 border border-gray w-2/4">
                        <div className="flex items-center gap-3">
                          <div className="w-32 overflow-hidden">
                            <img
                              className="image"
                              src={i.product.images[0]?.url ?? ""}
                              alt=""
                            />
                          </div>
                          <div>
                            <p className="text-xs uppercase">
                              {i.product.name}
                            </p>
                            <span className="text-xs">
                              {formatBigNumber(i.product.price, true)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-5 border border-gray w-1/4 flex justify-center">
                        <div className="flex items-center w-max relative">
                          <button
                            type="button"
                            className="text-lg block text-[0px] absolute left-4"
                            onClick={() =>
                              handleQuantityProduct(i.id, i.quantity - 1)
                            }
                            disabled={i.quantity === 1}
                          >
                            <span className="text-2xl leading-[24px]">-</span>
                          </button>
                          <input
                            type="text"
                            className="w-[120px] h-[40px] border px-10 border-black rounded-full text-center"
                            value={i.quantity}
                            onChange={() => {}}
                          />
                          <button
                            type="button"
                            className="text-lg block text-[0px] absolute right-4"
                            onClick={() => handleAddToCart(i.productId)}
                          >
                            <span className="text-2xl leading-[24px]">+</span>
                          </button>
                        </div>
                      </div>
                      <div className="p-5 border border-gray w-1/4 flex items-center justify-center">
                        {formatBigNumber(i.quantity * i.product.price, true)}
                      </div>
                      <div className="p-5 border border-gray w-1/4 flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveCartItem(i.id)}
                        >
                          <Image
                            className="block size-5"
                            src={ico_trash ?? ""}
                            alt=""
                          />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="mt-9">
                <p className="text-md">Special instructions for seller</p>

                <textarea
                  name=""
                  id=""
                  placeholder="how can we help you?"
                  className="text-md mt-3 border border-gray p-5 w-full"
                  rows={5}
                ></textarea>
              </div>
            </div>
            <div className="col-span-2">
              <div className="p-7 bg-[#f7f4ef] rounded-lg">
                <h3 className="uppercase font-medium text-sm">
                  FREE SHIPPING ON ORDERS $100.00
                </h3>
                <p className="text-sm mt-2">
                  Congratulations , you've got free shipping!
                </p>
                <p className="bg-[#14c100] w-full h-1 mt-5"></p>
              </div>

              <div className="p-6 mt-4 bg-[#f6f6f6] rounded-lg">
                <span>Coupon</span>
                <p className="mt-2 mb-6 text-md text-lightGray">
                  * Discount will be calculated and applied at checkout
                </p>
                <input
                  type="text"
                  className="h-10 px-6 text-sm border border-gray rounded-md w-full"
                  placeholder="Coupon code"
                />
                <p className="mt-6 font-semibold">
                  Total:{" "}
                  {items.length > 0 &&
                    formatBigNumber(
                      items.reduce(
                        (a, b) => a + b.quantity * b.product.price,
                        0
                      ),
                      true
                    )}
                </p>

                <a
                  href="/payment-order"
                  className="flex items-center justify-center h-[50px] mt-6 bg-black w-full text-white font-semibold text-sm px-4 flex-1 rounded-full hover:bg hover:bg-white border hover:border-black hover:text-black transition-all"
                >
                  Check out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
