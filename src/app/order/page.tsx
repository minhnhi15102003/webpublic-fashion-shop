"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { CartItem } from "@/types/Cart";
import { formatBigNumber } from "@/utils/formatBigNumber";

export default function OrdersPage() {
  const [orders, setOrders] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/orders`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setOrders(data.orders || []);
      setLoading(false);
    };

    fetchOrders();
  }, [token]);


  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 pb-7">
        🛒 Danh sách đơn hàng
      </h1>

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {orders.map((order) => (
          <li
            key={order.id}
            className="border border-gray-200 p-6 rounded-xl shadow-md bg-white hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Mã đơn</span>
              <span className="text-sm font-medium text-gray-900">
                #{order.id}
              </span>
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Trạng thái</span>
              <span className="px-2 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded">
                Đang chờ
              </span>
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Số lượng</span>
              <span className="text-sm font-medium">{order.quantity}</span>
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Tổng tiền</span>
              <span className="text-sm font-bold text-green-600">
                {formatBigNumber(order.price * order.quantity, true)}
              </span>
            </div>

            <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
              <span>Ngày tạo</span>
              <span>{dayjs(order.createdAt).format("YYYY-MM-DD HH:mm")}</span>
            </div>

            <Link
              href={`/order/${order.id}`}
              className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Xem chi tiết
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
