
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/use-toast';
import { useProducts } from '@/context/ProductContext';
import { Order } from '@/types';

const CartSummary = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Create a new order object
    const order: Omit<Order, 'id' | 'createdAt'> = {
      customerName: 'Guest User', // In a real app, this would come from authenticated user
      customerEmail: 'guest@example.com', // In a real app, this would come from authenticated user
      items: cart,
      total: getTotalPrice(),
      status: 'pending'
    };
    
    // Simulate API call
    setTimeout(() => {
      // Store the order in localStorage
      const orders = JSON.parse(localStorage.getItem('adminOrders') || '[]');
      const newOrder = {
        ...order,
        id: `order-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      orders.push(newOrder);
      localStorage.setItem('adminOrders', JSON.stringify(orders));
      
      // Clear cart and show success message
      clearCart();
      setIsCheckingOut(false);
      toast({
        title: "Order placed successfully!",
        description: "Your order has been created and is pending review.",
      });
    }, 1500);
  };
  
  const subtotal = getTotalPrice();
  const shipping = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shipping;
  
  if (cart.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      
      <div className="mt-6 space-y-4">
        <div className="flex justify-between">
          <p className="text-gray-600">Subtotal</p>
          <p className="text-gray-900">${subtotal.toFixed(2)}</p>
        </div>
        
        <div className="flex justify-between">
          <p className="text-gray-600">Shipping</p>
          <p className="text-gray-900">${shipping.toFixed(2)}</p>
        </div>
        
        <div className="border-t border-gray-200 pt-4 flex justify-between font-medium">
          <p className="text-gray-900">Total</p>
          <p className="text-gray-900">${total.toFixed(2)}</p>
        </div>
      </div>
      
      <Button 
        className="mt-6 w-full"
        onClick={handleCheckout}
        disabled={isCheckingOut}
      >
        {isCheckingOut ? "Processing..." : "Checkout"}
      </Button>
      
      <div className="mt-4 text-center">
        <Button 
          variant="ghost" 
          onClick={clearCart}
          className="text-sm text-gray-500"
        >
          Clear Cart
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
