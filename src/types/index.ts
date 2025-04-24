
export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type ProductCategory = 'men' | 'women';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  availableSizes: ProductSize[];
  image: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: ProductSize;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled';

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}
