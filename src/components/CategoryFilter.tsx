
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const CategoryFilter = () => {
  const { pathname } = useLocation();
  
  return (
    <div className="mb-8 border-b border-gray-200">
      <div className="flex space-x-8">
        <Link 
          to="/men" 
          className={cn(
            "py-4 text-sm font-medium relative",
            pathname === "/men" 
              ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-900" 
              : "text-gray-500 hover:text-gray-900"
          )}
        >
          Men
        </Link>
        <Link 
          to="/women" 
          className={cn(
            "py-4 text-sm font-medium relative",
            pathname === "/women" 
              ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-900" 
              : "text-gray-500 hover:text-gray-900"
          )}
        >
          Women
        </Link>
      </div>
    </div>
  );
};

export default CategoryFilter;
