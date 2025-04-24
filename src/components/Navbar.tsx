
import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { getTotalItems } = useCart();
  const { isAuthenticated, isAdmin } = useAuth();
  
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold font-poppins text-gray-900">
              StyleTee
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link to="/men" className="text-gray-600 hover:text-gray-900">
              Men
            </Link>
            <Link to="/women" className="text-gray-600 hover:text-gray-900">
              Women
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-gray-600 hover:text-gray-900 relative">
              <ShoppingCart size={20} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <Link to={isAdmin ? "/admin" : "/account"}>
                <Button variant="ghost" size="sm" className="flex items-center">
                  <User size={18} className="mr-2" />
                  {isAdmin ? 'Admin' : 'Account'}
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
