"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { formatBigNumber } from "@/utils/formatBigNumber";
import type { OrderDetailType } from "@/types/Order";

export default function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id: orderId } = params;

  const router = useRouter();

  const [order, setOrder] = useState<OrderDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_END_POINT}/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        if (!res.ok) {
          router.push("/not-found");
          return;
        }

        const data = await res.json();
        setOrder(data.order);
      } catch (err) {
        console.error(err);
        router.push("/not-found");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, router]);

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>Không tìm thấy đơn hàng</p>;

  return (
    <section>
      <div className="pt-16">
        <h2 className="text-3xl font-semibold text-center">Order Detail</h2>

        <div className="container pb-10">
          <p className="font-bold">#{order.id}</p>

          <div className="mt-4">
            <p>Ngày: {dayjs(order.createdAt).format("YYYY-MM-DD HH:mm")}</p>

            <ul className="mt-4 space-y-3">
              {order.orders.map((i) => (
                <li key={i.id}>
                  {i.product.name} × {i.quantity} —{" "}
                  {formatBigNumber(i.price * i.quantity, true)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
