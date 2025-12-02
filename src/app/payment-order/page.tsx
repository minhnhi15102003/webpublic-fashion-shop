"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useCart } from "@/context/CartContext";
import { formatBigNumber } from "@/utils/formatBigNumber";

const API =
  process.env.NEXT_PUBLIC_API_END_POINT || "http://localhost:3001";

const Order = () => {
  const { items, refreshCart } = useCart();
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [form, setForm] = useState({
    phone: "",
    email: "",
    delivery: "SHIP",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postCode: "",
  });

  // Lấy token từ localStorage CHỈ trên client sau khi mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const t = window.localStorage.getItem("accessToken");
      setToken(t);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!token) {
      toast.error("Bạn cần đăng nhập trước khi đặt hàng");
      return;
    }

    try {
      const res = await fetch(`${API}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to submit order");

      const data = await res.json();
      console.log("Order success:", data);

      await refreshCart();
      toast.success("Order placed successfully!");
      router.push("/order");
    } catch (err) {
      console.error(err);
      toast.error("Order failed.");
    }
  };

  return (
    <section>
      <div className="py-16">
        <h2 className="text-3xl font-semibold text-center">Payment Order</h2>
        <div className="container">
          <div className="lg:grid grid-cols-2 mt-10 gap-8">
            <div>
              <form className="space-y-6">
                <input
                  name="email"
                  type="text"
                  onChange={handleChange}
                  placeholder="Email or mobile phone number"
                  className="mt-2 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                />
                <input
                  name="phone"
                  type="text"
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="mt-2 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                />

                <div className="flex gap-4">
                  <input
                    name="firstName"
                    type="text"
                    onChange={handleChange}
                    placeholder="First name"
                    className="mt-2 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                  />
                  <input
                    name="lastName"
                    type="text"
                    onChange={handleChange}
                    placeholder="Last name"
                    className="mt-2 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                  />
                </div>

                <input
                  name="address"
                  type="text"
                  onChange={handleChange}
                  placeholder="Address"
                  className="mt-2 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                />

                <input
                  name="apartment"
                  type="text"
                  onChange={handleChange}
                  placeholder="Apartment (optional)"
                  className="mt-2 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                />

                <div className="flex gap-4">
                  <input
                    name="city"
                    type="text"
                    onChange={handleChange}
                    placeholder="City"
                    className="mt-2 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                  />
                  <input
                    name="postCode"
                    type="text"
                    onChange={handleChange}
                    placeholder="Postal code"
                    className="mt-2 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full uppercase h-[55px] bg-black text-white font-semibold text-sm px-4 rounded-lg hover:bg-white border hover:border-black hover:text-black transition-all"
                >
                  Pay now
                </button>
              </form>
            </div>

            <div className="lg:p-10 mt-10 lg:mt-0">
              <div className="md:px-5">
                <ul className="space-y-3">
                  {!!items.length &&
                    items.map((i) => (
                      <li key={i.id} className="flex items-center gap-3">
                        <div className="size-16 border border-gray rounded-md overflow-hidden">
                          <img
                            className="image"
                            src={i.product.images[0]?.url}
                            alt=""
                          />
                        </div>
                        <p>
                          {i.product.name} x <b>{i.quantity}</b>
                        </p>
                        <span className="ml-auto">
                          {formatBigNumber(i.product.price, true)}
                        </span>
                      </li>
                    ))}
                </ul>

                <ul className="mt-6 space-y-4">
                  <li className="flex items-center justify-between">
                    <span className="text-[14px]">
                      Subtotal • {items.length} items
                    </span>
                    <span className="text-[14px]">
                      {formatBigNumber(
                        items.reduce(
                          (a, b) => a + b.product.price * b.quantity,
                          0
                        ),
                        true
                      )}
                    </span>
                  </li>

                  <li className="flex items-center justify-between">
                    <span className="text-[14px]">Shipping</span>
                    <span className="text-[14px]">Free</span>
                  </li>

                  <li className="flex items-center justify-between">
                    <span className="text-[14px]">Estimated taxes</span>
                    <span className="text-[14px]">0đ</span>
                  </li>

                  <li className="flex items-center justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold">
                      {formatBigNumber(
                        items.reduce(
                          (a, b) => a + b.product.price * b.quantity,
                          0
                        ),
                        true
                      )}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
