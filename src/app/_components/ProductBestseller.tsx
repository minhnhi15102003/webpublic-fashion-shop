import React from "react";
import getListProduct from "../_actions/getProducts";
import { Fade } from "@mui/material";
import { BoxProduct } from "./BoxProduct";
export const LIMIT_PRODUCT_PER_PAGE = 16;
export const ProductBestseller = async () => {
  const listProduct = await getListProduct({
    offset: 0,
    limit: LIMIT_PRODUCT_PER_PAGE,
    isBestseller: 1,
  });
  console.log(listProduct,'listProduct');
  

  return (
    <section className="mt-12 lg:mt-12 pt-6 pb-8 bg-gray">
      <div className="container">
        <div className="lg:flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold">Bestseller</h2>
            <p className="mt-2 text-lightGray">
              Experience the best products at our store!
            </p>
          </div>
          <a
            href="#none"
            className="mt-6 lg:mt-0 h-9 border border-black px-7 inline-flex items-center font-semibold text-black rounded-full text-[15px] hover:bg-black hover:text-white transition-all duration-300"
          >
            View All
          </a>
        </div>

        <ul className="mt-8 lg:grid grid-cols-4 gap-7">
          {listProduct &&
            listProduct.map((product) => {
              return (
                // <Fade key={product.id} in={true} timeout={300}>
                 
                // </Fade>
                 <BoxProduct product={product} key={product.id} />
              );
            })}
        </ul>
      </div>
    </section>
  );
};
