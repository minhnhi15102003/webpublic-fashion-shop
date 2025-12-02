export type ProductImage = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  url: string;
  alt: string | null;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  discount: number;
  images: ProductImage[];
};

export type CartItem = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  quantity: number;
  userId: number;
  productId: number;
  product: Product;
  price:number;
};