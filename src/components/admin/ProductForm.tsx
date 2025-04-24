
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Product, ProductSize, ProductCategory } from '@/types';
import { useProducts } from '@/context/ProductContext';

interface ProductFormProps {
  product?: Product;
  onComplete: () => void;
}

const availableSizes: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const ProductForm = ({ product, onComplete }: ProductFormProps) => {
  const { addProduct, updateProduct } = useProducts();
  const [selectedSizes, setSelectedSizes] = useState<ProductSize[]>(
    product?.availableSizes || []
  );
  
  const form = useForm({
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price ? product.price.toString() : '',
      category: product?.category || 'men',
      image: product?.image || '',
      featured: product?.featured || false,
    },
  });
  
  const handleSizeToggle = (size: ProductSize) => {
    setSelectedSizes(prev => 
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };
  
  const onSubmit = (data: any) => {
    if (selectedSizes.length === 0) {
      toast({
        title: "Size selection required",
        description: "Please select at least one available size",
        variant: "destructive"
      });
      return;
    }

    try {
      const productData = {
        ...data,
        price: parseFloat(data.price),
        availableSizes: selectedSizes,
      };
      
      if (product) {
        updateProduct({
          ...productData,
          id: product.id,
        });
        toast({
          title: "Product updated",
          description: "The product has been updated successfully.",
        });
      } else {
        addProduct(productData);
        form.reset({
          name: '',
          description: '',
          price: '',
          category: 'men',
          image: '',
          featured: false,
        });
        setSelectedSizes([]);
        toast({
          title: "Product added",
          description: "The product has been added successfully.",
        });
      }
      onComplete();
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving the product.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "Product name is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter product name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="Enter product description" 
                  rows={3} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="price"
            rules={{ 
              required: "Price is required",
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Please enter a valid price"
              } 
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="number" 
                    step="0.01" 
                    placeholder="29.99" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category"
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="men">Men</SelectItem>
                    <SelectItem value="women">Women</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="image"
          rules={{ required: "Image URL is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="https://example.com/image.jpg" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormItem>
          <FormLabel>Available Sizes</FormLabel>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-1">
            {availableSizes.map(size => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={`size-${size}`}
                  checked={selectedSizes.includes(size)}
                  onCheckedChange={() => handleSizeToggle(size)}
                />
                <label
                  htmlFor={`size-${size}`}
                  className="text-sm cursor-pointer"
                >
                  {size}
                </label>
              </div>
            ))}
          </div>
          {selectedSizes.length === 0 && (
            <p className="text-sm font-medium text-destructive mt-2">
              Please select at least one size
            </p>
          )}
        </FormItem>
        
        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Featured Product
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onComplete}>
            Cancel
          </Button>
          <Button type="submit">
            {product ? 'Update Product' : 'Add Product'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
