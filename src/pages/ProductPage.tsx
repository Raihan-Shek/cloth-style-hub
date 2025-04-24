
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import { ProductSize } from '@/types';
import SizeFilter from '@/components/SizeFilter';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, loading } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const product = getProductById(id || '');
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  const handleAddToCart = () => {
    if (!product || !selectedSize) return;
    
    addToCart(product, selectedSize, quantity);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2 bg-gray-200 rounded-lg aspect-square"></div>
          <div className="w-full lg:w-1/2">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-24 bg-gray-200 rounded w-full mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
            <div className="h-12 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">
          The product you're looking for doesn't exist or may have been removed.
        </p>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-6 hover:bg-transparent"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft size={16} className="mr-1" />
        Back
      </Button>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <div className="bg-gray-50 rounded-lg overflow-hidden aspect-square">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl font-poppins font-semibold mb-2">{product.name}</h1>
          
          <p className="text-2xl font-medium text-gray-900 mb-6">
            ${product.price.toFixed(2)}
          </p>
          
          <div className="prose max-w-none mb-8">
            <p className="text-gray-600">{product.description}</p>
          </div>
          
          <div className="mb-6">
            {product.availableSizes.length > 0 && (
              <SizeFilter
                availableSizes={product.availableSizes}
                selectedSize={selectedSize}
                onChange={setSelectedSize}
              />
            )}
          </div>
          
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-2">Quantity</h3>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>
          
          <Button 
            className="w-full mb-4"
            size="lg"
            onClick={handleAddToCart}
            disabled={!selectedSize}
          >
            Add to Cart
          </Button>
          
          <div className="border-t border-gray-200 pt-6 mt-6 text-sm text-gray-500">
            <p className="mb-2">
              <strong>Category:</strong> {product.category === 'men' ? "Men's" : "Women's"}
            </p>
            <p>
              <strong>Available Sizes:</strong> {product.availableSizes.join(', ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
