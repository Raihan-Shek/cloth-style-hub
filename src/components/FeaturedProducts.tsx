
import { useProducts } from '@/context/ProductContext';
import ProductGrid from '@/components/ProductGrid';

const FeaturedProducts = () => {
  const { featuredProducts, loading } = useProducts();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-poppins font-semibold mb-8">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {[...Array(4)].map((_, i) => (
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
    <div className="container mx-auto px-4 py-12">
      <ProductGrid products={featuredProducts} title="Featured Products" />
    </div>
  );
};

export default FeaturedProducts;
