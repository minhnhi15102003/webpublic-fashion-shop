import React from "react";
import img_product_list_banner from "../../assets/images/img_product_list_banner.webp";
import Image from "next/image";
import getCategories from "../_actions/getCategories";
import ListProduct from "../_components/ListProduct";
import getListProduct from "../_actions/getProducts";
import FilterByCategory from "../_components/FilterByCategory";
type Props = {
  searchParams?: {
    page?: string;
    category?: string;
  };
};
const ProductList = async ({ searchParams }: Props) => {
  const page = Number(searchParams?.page || 1);
  const categoryId = searchParams?.category
    ? Number(searchParams.category)
    : undefined;
  const listCategory = await getCategories();
  const listProduct = await getListProduct({
    offset: page,
    categoryId,
  });

  console.log(listProduct, "nghiemmmmmmmmm");

  return (
    <>
      <section className="relative">
        <Image src={img_product_list_banner ?? ""} alt="" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-4xl font-semibold">Products</h2>
          <ul className="flex items-center gap-3 justify-center mt-2">
            <li>
              <a href="index.html">Home / </a>
            </li>
            <li>
              <a href="index.html">Products</a>
            </li>
          </ul>
        </div>
      </section>
      <section className="pt-12 pb-12">
        <div className="container">
          <div className="lg:grid grid-cols-5">
            <div className="col-span-1 p-0 lg:p-4">
              <FilterByCategory listCategory={listCategory} />
            </div>
            <div className="col-span-4 mt-6 lg:mt-0">
              <ListProduct
                initialListProduct={listProduct}
                categoryId={categoryId}
                page={page || 1}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductList;
