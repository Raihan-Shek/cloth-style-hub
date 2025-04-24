
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { product, quantity, size } = item;
  const { updateQuantity, removeFromCart } = useCart();
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(product.id, size, newQuantity);
    }
  };

  return (
    <div className="flex py-6 border-b border-gray-200">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        <img 
          src={product.image} 
          alt={product.name}
          className="h-full w-full object-cover" 
        />
      </div>
      
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <Link to={`/product/${product.id}`}>
              <h3 className="text-base font-medium text-gray-900 hover:underline">
                {product.name}
              </h3>
            </Link>
            <p className="mt-1 text-sm text-gray-500">Size: {size}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">
            ${(product.price * quantity).toFixed(2)}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border border-gray-200 rounded">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus size={14} />
            </Button>
            <span className="px-2 text-gray-900">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              <Plus size={14} />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeFromCart(product.id, size)}
            className="text-gray-500 hover:text-gray-700"
          >
            <Trash2 size={16} className="mr-1" />
            <span className="text-sm">Remove</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
