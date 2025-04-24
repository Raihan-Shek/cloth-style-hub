
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { useProducts } from '@/context/ProductContext';
import { Product, ProductSize, Order, CartItem } from '@/types';

interface OrderFormProps {
  onSubmit: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  initialOrder?: Order;
}

const OrderForm = ({ onSubmit, initialOrder }: OrderFormProps) => {
  const { products } = useProducts();
  const [customerName, setCustomerName] = useState(initialOrder?.customerName || '');
  const [customerEmail, setCustomerEmail] = useState(initialOrder?.customerEmail || '');
  const [items, setItems] = useState<CartItem[]>(initialOrder?.items || []);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  const handleAddItem = () => {
    if (!selectedProduct || !selectedSize) {
      toast({
        title: "Invalid item",
        description: "Please select a product and size",
        variant: "destructive"
      });
      return;
    }
    
    const newItem: CartItem = {
      product: selectedProduct,
      size: selectedSize,
      quantity
    };
    
    setItems([...items, newItem]);
    setSelectedProduct(null);
    setSelectedSize(null);
    setQuantity(1);
  };
  
  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };
  
  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName || !customerEmail) {
      toast({
        title: "Missing information",
        description: "Please add customer name and email",
        variant: "destructive"
      });
      return;
    }
    
    if (items.length === 0) {
      toast({
        title: "Empty order",
        description: "Please add at least one item to the order",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit({
      customerName,
      customerEmail,
      items,
      total: calculateTotal(),
      status: 'pending'
    });
    
    // Reset form after submission
    setCustomerName('');
    setCustomerEmail('');
    setItems([]);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Customer Name</label>
          <Input 
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter customer name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Customer Email</label>
          <Input 
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            placeholder="Enter customer email"
            required
          />
        </div>
      </div>
      
      <div className="border p-4 rounded-md">
        <h3 className="text-lg font-medium mb-4">Add Items</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product</label>
            <Select
              value={selectedProduct?.id}
              onValueChange={(value) => {
                const product = products.find(p => p.id === value);
                setSelectedProduct(product || null);
                setSelectedSize(null); // Reset size when product changes
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Size</label>
            <Select
              value={selectedSize || ''}
              onValueChange={(value) => setSelectedSize(value as ProductSize)}
              disabled={!selectedProduct}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {selectedProduct?.availableSizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <Input 
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
          </div>
          
          <div className="flex items-end">
            <Button 
              type="button" 
              onClick={handleAddItem} 
              disabled={!selectedProduct || !selectedSize}
              className="w-full"
            >
              Add Item
            </Button>
          </div>
        </div>
        
        {items.length > 0 ? (
          <div className="border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item, index) => (
                  <tr key={`${item.product.id}-${item.size}-${index}`}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${(item.product.price * item.quantity).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button variant="ghost" onClick={() => handleRemoveItem(index)} size="sm">
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-right font-medium">Total:</td>
                  <td className="px-6 py-4 font-medium">${calculateTotal().toFixed(2)}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">No items added to this order</div>
        )}
      </div>
      
      <Button type="submit" className="w-full">
        {initialOrder ? 'Update Order' : 'Create Order'}
      </Button>
    </form>
  );
};

export default OrderForm;
