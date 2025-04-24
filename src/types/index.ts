
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
