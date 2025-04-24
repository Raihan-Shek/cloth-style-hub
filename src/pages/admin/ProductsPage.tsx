
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import ProductsTable from '@/components/admin/ProductsTable';
import ProductForm from '@/components/admin/ProductForm';
import { useProducts } from '@/context/ProductContext';

const ProductsPage = () => {
  const { products } = useProducts();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Products</h2>
          <p className="text-gray-500 text-sm">
            Manage your t-shirt products ({products.length})
          </p>
        </div>
        
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus size={16} className="mr-1" />
          Add Product
        </Button>
      </div>
      
      <ProductsTable />
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Create a new product by filling out the form below.
            </DialogDescription>
          </DialogHeader>
          <ProductForm 
            onComplete={() => setIsAddDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsPage;
