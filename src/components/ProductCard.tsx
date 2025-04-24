
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const { id, name, price, image, category } = product;
  
  return (
    <div className={cn("group animate-fade-in", className)}>
      <Link to={`/product/${id}`}>
        <div className="aspect-[3/4] overflow-hidden bg-gray-100 rounded-md mb-3">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        <div>
          <h3 className="font-medium text-gray-900">{name}</h3>
          <div className="mt-1 flex items-center justify-between">
            <p className="text-gray-500 text-sm">{category === 'men' ? "Men's" : "Women's"}</p>
            <p className="font-medium">${price.toFixed(2)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
