'use server';

import { ProductCategoryRs } from "../../types/ProductCategoryRs";



async function getCategories() {
    const apiEndPoint = process.env.API_END_POINT;
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
