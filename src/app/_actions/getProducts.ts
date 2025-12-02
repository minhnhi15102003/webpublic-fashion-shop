'use server';

import { Product } from "@/types/ProductRes";


export interface GetListProductOpts {
    offset?: number;
    limit?: number;
    search?: string;
    isNewArrival?: number;
    isBestseller?: number;
    categoryId?: string | number;
    sort?: "PRICE_ASC" | "PRICE_DESC" | string;
}

export interface ProductResponse {
    success: boolean;
    products: Product[];
    total: number;
}

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 10;

async function getListProduct({
    offset = DEFAULT_OFFSET,
    limit = DEFAULT_LIMIT,
    search,
    isNewArrival,
    isBestseller,
    categoryId,
    sort,
}: GetListProductOpts): Promise<Product[]> {
    const apiEndPoint = process.env.API_END_POINT;
    if (!apiEndPoint) {
        throw new Error("API_END_POINT is not defined in environment");
    }

    const url = new URL("/product", apiEndPoint);
    const params = url.searchParams;

    // luôn có offset/limit (với default)
    params.set("offset", String(offset));
    params.set("limit", String(limit));

    // chỉ thêm nếu không undefined / không rỗng
    if (search && search.trim() !== "") {
        params.set("search", search);
    }
    if (typeof isNewArrival === "number") {
        params.set("isNewArrival", String(isNewArrival));
    }
    if (typeof isBestseller === "number") {
        params.set("isBestseller", String(isBestseller));
    }
    if (categoryId !== undefined && categoryId !== null && String(categoryId).trim() !== "") {
        params.set("categoryId", String(categoryId));
    }
    if (sort && sort.trim() !== "") {
        params.set("sort", sort);
    }
    console.log(params, 'params',url.toString());


    const res = await fetch(`${url.toString()}`, {
        next: { revalidate: 60 },
        //  cache: "no-cache"
    });
    console.log(res,'resres');
    

    if (!res.ok) {
        // có thể ném lỗi cụ thể hơn tùy cần
        throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
    }

    // giả sử API trả về shape { success, products, total }
    const data = (await res.json()) as ProductResponse;
    console.log(data,'data');
    
    const listProduct = data.products
    console.log(listProduct,'listProduct');
    
    return listProduct;
}

export default getListProduct;