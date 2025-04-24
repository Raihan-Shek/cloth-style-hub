
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import ProductGrid from '@/components/ProductGrid';
import CategoryFilter from '@/components/CategoryFilter';
import { ProductCategory, ProductSize } from '@/types';
import SizeFilter from '@/components/SizeFilter';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { getProductsByCategory, loading } = useProducts();
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  
  const validCategory = (category === 'men' || category === 'women') 
    ? category 
    : 'men';
    
  const products = getProductsByCategory(validCategory as ProductCategory)
    .filter(product => selectedSize === null || product.availableSizes.includes(selectedSize));
    
  // Get all available sizes for this category
  const allSizesInCategory = Array.from(
    new Set(
      getProductsByCategory(validCategory as ProductCategory)
        .flatMap(p => p.availableSizes)
    )
  ).sort((a, b) => {
    const sizeOrder: Record<ProductSize, number> = { 
      'XS': 0, 'S': 1, 'M': 2, 'L': 3, 'XL': 4, 'XXL': 5 
    };
    return sizeOrder[a] - sizeOrder[b];
  }) as ProductSize[];
  
  const handleSizeChange = (size: ProductSize) => {
    if (selectedSize === size) {
      setSelectedSize(null);
    } else {
      setSelectedSize(size);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse h-8 bg-gray-200 w-48 mb-8 rounded"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-md aspect-[3/4] mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-poppins font-bold mb-4">
          {validCategory === 'men' ? "Men's" : "Women's"} T-Shirts
        </h1>
        <p className="text-gray-600">
          Explore our collection of premium quality t-shirts for {validCategory}.
        </p>
      </div>
      
      <CategoryFilter />
      
      <div className="mb-8">
        <SizeFilter 
          availableSizes={allSizesInCategory} 
          selectedSize={selectedSize} 
          onChange={handleSizeChange}
        />
      </div>
      
      <ProductGrid products={products} />
    </div>
  );
};

export default CategoryPage;
