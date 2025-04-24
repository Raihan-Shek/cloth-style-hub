import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import OrderForm from '@/components/admin/OrderForm';
import { Order } from '@/types';
import { createOrder, fetchOrders } from '@/lib/orders';
import { useQuery } from '@tanstack/react-query';

const OrdersPage = () => {
  const [showForm, setShowForm] = useState(false);
  
  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });
  
  const handleCreateOrder = async (orderData: Omit<Order, 'id' | 'createdAt'>) => {
    try {
      await createOrder(orderData);
      setShowForm(false);
      toast({
        title: "Order created",
        description: "Order created successfully",
      });
    } catch (error) {
      toast({
        title: "Error creating order",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Error loading orders. Please try again later.</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Orders</h2>
          <p className="text-gray-500 text-sm">
            Manage and track customer orders
          </p>
        </div>
        
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add New Order'}
        </Button>
      </div>
      
      {showForm ? (
        <Card className="p-6 mb-6">
          <h3 className="text-xl font-medium mb-4">Create New Order</h3>
          <OrderForm onSubmit={handleCreateOrder} />
        </Card>
      ) : null}
      
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map(order => (
            <Card key={order.id} className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Order #{order.id}</h3>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {order.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p>{order.customerName}</p>
                  <p>{order.customerEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Details</p>
                  <p>Items: {order.items.length}</p>
                  <p>Total: ${order.total.toFixed(2)}</p>
                  <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.items.map((item, index) => (
                      <tr key={`${item.product.id}-${item.size}-${index}`}>
                        <td className="px-4 py-2">{item.product.name}</td>
                        <td className="px-4 py-2">{item.size}</td>
                        <td className="px-4 py-2">{item.quantity}</td>
                        <td className="px-4 py-2">${(item.product.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-6">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium">No Orders Yet</h3>
            <p className="text-gray-500 mt-2">
              {showForm ? "Complete the form above to create your first order." : "Click 'Add New Order' to create a new order."}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default OrdersPage;
