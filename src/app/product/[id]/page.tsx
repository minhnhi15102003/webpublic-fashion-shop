import React from "react";
import Image from "next/image";
import ico_star_active from "../../../assets/images/ico_star_active.png";
import ico_eye from "../../../assets/images/ico_eye.png";
import ico_fire from "../../../assets/images/ico_fire.png";
import ico_checked from "../../../assets/images/ico_checked.png";
import ico_reload from "../../../assets/images/ico_reload.png";
import ico_question from "../../../assets/images/ico_question.png";
import ico_shipping from "../../../assets/images/ico_shipping.png";
import ico_share from "../../../assets/images/ico_share.png";
import ico_shipping2 from "../../../assets/images/ico_shipping2.png";
import ico_check from "../../../assets/images/ico_check.png";

import getListProduct from "../../_actions/getProducts";
import { BoxProduct } from "../../_components/BoxProduct";
import ActionDetailProductAddToCart from "../../_components/ActionDetailProductAddToCart";
import { formatBigNumber } from "@/utils/formatBigNumber";
import getProductById from "@/app/_actions/getProductById";

interface Props {
  params: { id: string };
}
const ProductDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const detailProduct = await getProductById(id);
//   const getProductByCategory = await getListProduct({
//     limit:10,
//     offset:0,
//     categoryId:detailProduct?.category.id
//   })
  console.log(detailProduct, "detailProduct");

  return (
    <div className="container">
      <ul className="flex gap-2 items-center py-4">
        <li>
          <a className="text-sm" href="#none">
            Home /{" "}
          </a>
        </li>
        <li>
          <a className="text-sm" href="#none">
            {/* {detailProduct?.category.name} /{" "} */}
          </a>
        </li>
        <li>
          <a className="text-sm">{detailProduct?.name}</a>
        </li>
      </ul>
      {detailProduct && (
        <div className="lg:grid grid-cols-5 gap-7 mt-4">
          <div className="col-span-3 flex gap-3">
            <ul className="flex flex-col gap-4">
              {detailProduct.images.map((i) => (
                <li
                  key={i.id}
                  className="w-[82px] cursor-pointer p-[10px] rounded-md border border-black hover:border-black transition-all"
                >
                  <img className="image" src={i.url} alt="" />
                </li>
              ))}
            </ul>
            <div className="overflow-hidden">
              <div className="rounded-xl overflow-hidden">
                <img
                  src={detailProduct.images[0]?.url ?? ""}
                  className="image"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="col-span-2 mt-6">
            <h2 className="text-xl lg:text-3xl font-semibold">
             {detailProduct.name}
            </h2>
            <ul className="flex items-center gap-1 mt-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <li key={i}>
                  <Image className="size-[16px]" src={ico_star_active} alt="" />
                </li>
              ))}
            </ul>

            <p className="mt-3 text-xl font-semibold">
              {formatBigNumber(Number(detailProduct.price), true)}
            </p>

            <div className="mt-2 pt-2 border-t border-gray">
              <p className="flex items-center gap-2 mt-2">
                <Image
                  className="w-5 block animate-flicker"
                  src={ico_eye}
                  alt=""
                />
                <span className="font-medium text-sm">
                  {detailProduct.viewerCount} people are viewing this right now
                </span>
              </p>
              <p className="flex items-center gap-2 mt-4">
                <Image
                  className="w-5 block animate-zoomInOut"
                  src={ico_fire}
                  alt=""
                />
                <span className="text-red-600 font-medium text-sm">
                  {detailProduct.totalSold} sold in last 18 hours
                </span>
              </p>
              <p className="flex items-center gap-2 mt-6">
                <Image className="w-5 block" src={ico_checked} alt="" />{" "}
                <span className="text-green font-medium text-sm">In stock</span>
              </p>

              <p className="mt-5 text-midGray">{detailProduct.description}</p>

              {/* <div className="mt-6 flex items-center gap-3">
                <div className="flex items-center w-max relative">
                  <button
                    type="button"
                    className="text-lg block text-[0px] absolute left-4"
                  >
                    <span className="text-2xl leading-[24px]">-</span>
                  </button>
                  <input
                    type="text"
                    className="w-[120px] h-[50px] border px-10 border-gray rounded-full text-center"
                    value="1"
                  />
                  <button
                    type="button"
                    className="text-lg block text-[0px] absolute right-4"
                  >
                    <span className="text-2xl leading-[24px]">+</span>
                  </button>
                </div>

                <button
                  type="button"
                  className="h-[50px] bg-black text-white font-semibold text-sm px-4 flex-1 rounded-full hover:bg hover:bg-white border hover:border-black hover:text-black transition-all"
                >
                  Add To Cart
                </button>
                <button
                  type="button"
                  className="p-4 bg-white border border-[#e6e6e6] rounded-full"
                >
                  <Image className="w-4" src={ico_heart} alt="" />
                </button>
              </div> */}
              <ActionDetailProductAddToCart productId={detailProduct.id} />

              <ul className="flex items-center gap-4 mt-6">
                <li>
                  <button
                    type="button"
                    className="flex items-center gap-4 text-sm font-medium"
                  >
                    <Image className="w-4" src={ico_reload} alt="" />
                    Compare
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex items-center gap-4 text-sm font-medium"
                  >
                    <Image className="w-4" src={ico_question} alt="" />
                    Question
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex items-center gap-4 text-sm font-medium"
                  >
                    <Image className="w-4" src={ico_shipping} alt="" />
                    Shipping info
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex items-center gap-4 text-sm font-medium"
                  >
                    <Image className="w-4" src={ico_share} alt="" />
                    Share
                  </button>
                </li>
              </ul>

              <div className="flex items-center mt-6 mb-6 pt-6 pb-6 border-t border-b border-b-gray border-t-gray">
                <div>
                  <Image className="block w-9" src={ico_shipping2} alt="" />
                </div>
                <p className="flex-1 ml-4 pl-4 border-l border-l-[#d9d9d9] text-sm">
                  Order in the next 22 hours 45 minutes to get it between <br />
                  <span className="font-semibold underline">
                    Tuesday, Oct 22{" "}
                  </span>{" "}
                  <span className="mx-2">and</span>
                  <span className="font-semibold underline">
                    {" "}
                    Saturday, Oct 26
                  </span>
                </p>
              </div>

              <div className="p-[15px] rounded-xl border border-[#dedede] flex items-start gap-3">
                <div>
                  <Image src={ico_check} className="w-6 block" alt="" />
                </div>
                <div className="text-sm">
                  <p className="text-lightGray">
                    Pickup available at{" "}
                    <span className="font-semibold text-black">
                      {" "}
                      Akaze store
                    </span>
                  </p>
                  <p className="text-xs text-lightGray mt-1">
                    Usually ready in 24 hours
                  </p>
                  <button type="button" className="underline text-xs mt-4">
                    View store information
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-9 lg:mt-24">
        <h2 className="text-center text-lg lg:text-3xl font-semibold">
          You may also like
        </h2>
      </div>
      <ul className="mt-8 lg:grid grid-cols-4 gap-7 pb-8">
        {/* {
          getProductByCategory.map(i => <BoxProduct product={i} key={i.id} />)
        } */}
      </ul>
    </div>
  );
};

export default ProductDetailPage;





// "use client";
// import { useParams } from "next/navigation";

// export default function Page() {
//   const { id } = useParams();
//   return <div>Sản phẩm ID: {id}</div>;
// }