'use server';

import { ProductCategoryRs } from "../../types/ProductCategoryRs";



async function getCategories() {
    const apiEndPoint = process.env.NEXT_PUBLIC_API_END_POINT || "https://e-commerce-rd5w.onrender.com";
    console.log(apiEndPoint,'apiEndPoint');
    
    const rsCategory = await fetch(apiEndPoint + '/product/categories');

    let categories: ProductCategoryRs[] = [];
    if (rsCategory.status === 200) {
        const data = await rsCategory.json()
        categories = data.categories;
    }
    console.log(categories,'categories');
    
    return categories;
}

export default getCategories;
