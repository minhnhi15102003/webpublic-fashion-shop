"use client";

import React, { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import { ProductCategoryRs } from "@/types/ProductCategoryRs";
import useQueryParams from "../_hooks/useQueryParams";
type FilterByCategoryProps = {
  listCategory: ProductCategoryRs[];
};

const FilterByCategory = ({ listCategory }: FilterByCategoryProps) => {
  const searchParams = useSearchParams();
  const { setQueryParam, deleteQueryParam } = useQueryParams();
  const [categoryId, setCategoryId] = useState<string | null>(null);
  useEffect(() => {
    const categoryIdParam = searchParams.get("category");
    setCategoryId(categoryIdParam);
  }, [searchParams]);
  //      useEffect(() => {
  //       if (categoryId) {
  //          setCategoryName(listCategory.find((i) => i.id === categoryId)?.name);
  //       }
  //    }, [categoryId, listCategory]);
  const handleSelectedCategory = (id: string) => {
    console.log(id,'idid');
    
    setQueryParam("categoryId", id);
  };
  return (
    <>
      <h2 className="text-lg font-semibold">Category</h2>
      <ul className="mt-4 space-y-3">
        {listCategory.map((cate) => (
          <li key={cate.id} onClick={() => handleSelectedCategory(cate.id)}>
            <span className="font-medium text-black text-sm hover:text-black transition-all">
              {cate.name}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FilterByCategory;
