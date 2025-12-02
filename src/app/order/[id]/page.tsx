"use clinet"
import { notFound } from "next/navigation";
import React from "react";
import { cookies } from "next/headers";
import dayjs from "dayjs";
import { formatBigNumber } from "@/utils/formatBigNumber";
import { OrderDetailType } from "@/types/Order";
type Props = {
  params: {
    id: string;
  };
};
const OrderDetail = async ({ params }: Props) => {
  const orderId = params.id;

  const token = localStorage.getItem("accessToken");
  console.log(token, "token");
  const res = await fetch(`http://localhost:3001/orders/${orderId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 👈 thêm token vào đây
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound(); // nếu không tìm thấy đơn hàng thì trả về 404
  }

  const data: { success: boolean; order: OrderDetailType } = await res.json();
  console.log(data, "datadata");

  const order: OrderDetailType = data.order;

  console.log(order, "xxxxxxxxxx");

  return (
    <section>
      <div className="pt-16">
        <h2 className="text-3xl font-semibold text-center">Order Detail</h2>

        <div className="container pb-10">
          {order ? (
            <div className="lg:grid grid-cols-5 gap-10 mt-20">
              <div className="col-span-3">
                <div className="flex items-center gap-3">
                  <p className="font-bold">#{order.id}</p>
                  <span className="py-1 px-3 font-semibold text-xs rounded-lg border border-purple-600 text-purple-600">
                    Waiting for confirmation
                  </span>
                </div>

                <div className="mt-6">
                  <div>
                    <p className="font-semibold py-5 border-b border-b-gray">
                      Order detail
                    </p>
                    <ul className="flex items-start mt-6">
                      <li className="flex-1">
                        <p className="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:size-3 before:rounded-full before:bg-purple-600 w-full border-b border-dashed border-b-lightGray"></p>
                        <p className="mt-4 text-[14px] text-purple-600">
                          Waiting for confirmation
                        </p>
                        <p className="mt-2 text-xs text-purple-600">
                          Waiting for confirmation
                        </p>
                        <p className="mt-2 text-xs text-lightGray">
                          {dayjs(order.createdAt).format("YYYY-MM-DD HH:mm")}
                        </p>
                      </li>
                      <li className="flex-1">
                        <p className="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:size-3 before:rounded-full before:bg-lightGray w-full border-b border-dashed border-b-lightGray"></p>
                        <p className="mt-4 text-[14px] text-lightGray">
                          Packing
                        </p>
                      </li>
                      <li className="flex-1">
                        <p className="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:size-3 before:rounded-full before:bg-lightGray w-full border-b border-dashed border-b-lightGray"></p>
                        <p className="mt-4 text-[14px] text-lightGray">
                          Delivery
                        </p>
                      </li>
                      <li className="flex-1">
                        <p className="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:size-3 before:rounded-full before:bg-lightGray w-full border-b-lightGray"></p>
                        <p className="mt-4 text-[14px] text-lightGray">
                          Complete
                        </p>
                      </li>
                    </ul>

                    <div className="mt-6 p-3 bg-yellow-50 rounded-lg">
                      <p className="font-semibold">Customer Note</p>
                      <p className="mt-3 text-[14px]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ab minima illo enim nisi laborum quam sed neque, quasi
                        quia necessitatibus exercitationem architecto laboriosam
                        repellendus alias ad aliquid consectetur officiis quas!
                      </p>
                    </div>

                    <div className="mt-6">
                      <ul className="space-y-3">
                        {order.orders.map((i) => (
                          <li key={i.id} className="flex items-center gap-3">
                            {/* <div className="size-16 border border-gray rounded-md overflow-hidden">
                          <img
                            className="image"
                            src={i.product.i}
                            alt=""
                          />
                        </div> */}
                            <p className="flex flex-col">
                              <span className="font-semibold">
                                {i.product.name}
                              </span>
                              <span className="mt-2 text-xs">
                                X{i.product.quantity}
                              </span>
                            </p>
                            <span className="ml-auto">
                              {formatBigNumber(
                                i.product.quantity * i.product.price,
                                true
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2 mt-9 lg-mt-0">
                <div className="p-5 rounded-lg bg-slate-50">
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between">
                      <span className="text-[14px]">Customer</span>
                      <span className="text-[14px]">
                        {order.firstName + " " + order.lastName}
                      </span>
                    </li>

                    <li className="flex items-center justify-between">
                      <span className="text-[14px]">Phone</span>
                      <span className="text-[14px]">{order.phone}</span>
                    </li>

                    <li className="flex items-center justify-between">
                      <span className="text-[14px]">Email</span>
                      <span className="text-[14px]">{order.email}</span>
                    </li>

                    <li className="flex items-center justify-between">
                      <span className="text-[14px]">Address</span>
                      <span className="text-[14px]">{order.address}</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-lg bg-slate-50 mt-6">
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-center justify-between">
                      <span className="text-[14px]">
                        Subtotal • {order.orders.length} items
                      </span>
                      <span className="text-[14px]">
                        {formatBigNumber(
                          order.orders.reduce(
                            (a, b) => a + b.price * b.quantity,
                            0
                          )
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
                          order.orders.reduce(
                            (a, b) => a + b.price * b.quantity,
                            0
                          )
                        )}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            "Không Xem được hoặc có lỗi"
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;
