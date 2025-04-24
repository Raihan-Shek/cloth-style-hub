
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductCategory, ProductSize } from '@/types';

// Mock data - in a real app, this would come from an API
import { mockProducts } from '@/data/mockProducts';

interface ProductContextType {
  products: Product[];
  featuredProducts: Product[];
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: ProductCategory) => Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  loading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd fetch from an API
    const storedProducts = localStorage.getItem('products');
    
    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts));
      } catch (e) {
        console.error('Failed to parse products from localStorage', e);
        setProducts(mockProducts);
      }
    } else {
      setProducts(mockProducts);
    }
    
    setLoading(false);
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products, loading]);

  const featuredProducts = products.filter(product => product.featured);

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category: ProductCategory) => {
    return products.filter(product => product.category === category);
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: `product-${Date.now()}`,
    };
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prevProducts => 
      prevProducts.filter(product => product.id !== id)
    );
  };

  return (
    <ProductContext.Provider value={{
      products,
      featuredProducts,
      getProductById,
      getProductsByCategory,
      addProduct,
      updateProduct,
      deleteProduct,
      loading
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
