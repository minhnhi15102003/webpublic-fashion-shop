export interface ProductResponse {
    success: boolean;
    products: Product[];
    total: number;
}

export interface Product {
    id: number;
    createdAt: string; // ISO Date
    updatedAt: string; // ISO Date
    deletedAt: string | null;
    name: string;
    description: string;
    price: string; // vì bạn trả về dạng "300000.00", vẫn là string
    quantity: number;
    totalSold: number;
    isBestseller: boolean;
    isNewArrival: boolean;
    star: number;
    viewerCount: number;
    discount: number;
    images: ProductImage[];
    category: Category;
}

export interface ProductImage {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    url: string;
    alt: string | null;
}

export interface Category {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    name: string;
    image: string;
}
