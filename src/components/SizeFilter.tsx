
import { ProductSize } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SizeFilterProps {
  availableSizes: ProductSize[];
  selectedSize: ProductSize | null;
  onChange: (size: ProductSize) => void;
}

const SizeFilter = ({ availableSizes, selectedSize, onChange }: SizeFilterProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Size</h3>
      <div className="flex flex-wrap gap-2">
        {availableSizes.map(size => (
          <Button
            key={size}
            variant="outline"
            className={cn(
              "h-8 w-10 font-normal",
              selectedSize === size && "bg-primary text-primary-foreground"
            )}
            onClick={() => onChange(size)}
          >
            {size}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SizeFilter;
