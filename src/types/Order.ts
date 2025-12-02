export type Product = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
  description: string;
  price: number;
  quantity: number;
  totalSold: number;
  isBestseller: boolean;
  isNewArrival: boolean;
  star: number;
  viewerCount: number;
  discount: number;
};

export type OrderItem = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  quantity: number;
  orderId: number;
  productId: number;
  price: number;
  product: Product;
};

export type OrderDetailType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  totalPrice: string;
  paymentId: number;
  userId: number;
  status: 'WAITING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED'; 
  email: string;
  phone: string;
  delivery: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postCode: string;
  apartment: string;
  shippingMethod: string;
  orders: OrderItem[];
};
