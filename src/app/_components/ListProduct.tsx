"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../../types/ProductRes";
import getListProduct from "../_actions/getProducts";
import { BoxProduct } from "./BoxProduct";
type ListProductProps = {
  initialListProduct: Product[];
  categoryId?: string | number;
  page: number;
};
export const LIMIT_PRODUCT_PER_PAGE = 16;

const ListProduct = ({
  initialListProduct,
  categoryId,
  page,
}: ListProductProps) => {
  //
  const [listProduct, setListProduct] = useState<Product[]>(initialListProduct);
  const [currentPage, setCurrentPage] = useState(page + 1);
  const [hasLoadMore, setHasLoadMore] = useState(true);
  useEffect(() => {
    const pageNumber = page;
    if (pageNumber) {
      setCurrentPage(pageNumber + 1);
    }
  }, [page]);

  useEffect(() => {
    if (initialListProduct.length < LIMIT_PRODUCT_PER_PAGE) {
      setHasLoadMore(false);
    } else {
      setHasLoadMore(true);
    }
  }, [initialListProduct]);
  const loadMoreUsers = async () => {
    const apiListProduct = await getListProduct({
      offset: (currentPage - 1) * LIMIT_PRODUCT_PER_PAGE,
      limit: LIMIT_PRODUCT_PER_PAGE,
      categoryId,
    });
    setListProduct((listProduct) => [...listProduct, ...apiListProduct]);
    setCurrentPage(currentPage + 1);
    if (apiListProduct.length < LIMIT_PRODUCT_PER_PAGE) {
      setHasLoadMore(false);
    } else {
      setHasLoadMore(true);
    }
  };

  return listProduct.length ? (
    <ul className="lg:grid grid-cols-3 gap-5 mt-9 space-y-3 lg:space-y-0">
      {listProduct.map((product) => (
        <BoxProduct product={product} key={product.id} />
      ))}
    </ul>
  ) : (
    <>
      {" "}
      <div className="j-mt-28 j-flex j-flex-col j-items-center j-justify-center">
        {/* <Image src='/assets/images/no_data.png' alt='No product avaliable' height={230} width={360} /> */}
        <div className="j-text-center">
          <h2 className="j-text-2xl j-font-bold j-text-text-sub">
            Không tìm thấy sản phẩm
          </h2>
          <div className="j-pt-3 j-text-base j-text-text-sub">
            Không có sản phẩm nào trong bộ lọc sản phẩm mà bạn đang tìm kiếm
          </div>
        </div>
      </div>
    </>
  );
};

export default ListProduct;
