
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Package, Tag, Users, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    {
      name: 'Products',
      href: '/admin',
      icon: Package,
      active: currentPath === '/admin'
    },
    {
      name: 'Orders',
      href: '/admin/orders',
      icon: ShoppingBag,
      active: currentPath === '/admin/orders'
    },
    {
      name: 'Categories',
      href: '/admin/categories',
      icon: Tag,
      active: currentPath === '/admin/categories'
    },
    {
      name: 'Customers',
      href: '/admin/customers',
      icon: Users,
      active: currentPath === '/admin/customers'
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: Settings,
      active: currentPath === '/admin/settings'
    }
  ];
  
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <Link to="/admin" className="font-bold font-poppins text-xl">
          Admin Panel
        </Link>
      </div>
      
      <nav className="px-4 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={cn(
                  'flex items-center py-2 px-3 rounded-md text-sm font-medium',
                  item.active 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <item.icon size={18} className="mr-3" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
