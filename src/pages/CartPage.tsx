
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';
import CartSummary from '@/components/CartSummary';
import { ShoppingCart } from 'lucide-react';

const CartPage = () => {
  const { cart } = useCart();
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex justify-center mb-4">
          <ShoppingCart size={48} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Button asChild>
          <Link to="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-poppins font-semibold mb-8">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <CartItem key={`${item.product.id}-${item.size}`} item={item} />
              ))}
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button asChild variant="outline">
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
