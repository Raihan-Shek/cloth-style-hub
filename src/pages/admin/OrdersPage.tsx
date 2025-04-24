
import { Card } from '@/components/ui/card';

const OrdersPage = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Orders</h2>
        <p className="text-gray-500 text-sm">
          Manage and track customer orders
        </p>
      </div>
      
      <Card className="p-6">
        <div className="text-center py-8">
          <h3 className="text-lg font-medium">No Orders Yet</h3>
          <p className="text-gray-500 mt-2">
            When customers place orders, they will appear here.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default OrdersPage;
