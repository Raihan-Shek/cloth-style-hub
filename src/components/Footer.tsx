
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">StyleTee</h3>
            <p className="text-gray-600 text-sm">
              Premium quality t-shirts for men and women.
              Designed for comfort and style.
            </p>
          </div>
          
          <div>
            <h4 className="font-poppins font-medium text-sm uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/men" className="text-gray-600 hover:text-gray-900">Men's Collection</Link></li>
              <li><Link to="/women" className="text-gray-600 hover:text-gray-900">Women's Collection</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-gray-900">New Arrivals</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-gray-900">Featured</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-poppins font-medium text-sm uppercase tracking-wider mb-4">Help</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="text-gray-600 hover:text-gray-900">Customer Support</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-gray-900">Shipping Information</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-gray-900">Returns & Exchanges</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-gray-900">Sizing Guide</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-poppins font-medium text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600">Email: info@styletee.com</li>
              <li className="text-gray-600">Phone: (123) 456-7890</li>
              <li className="text-gray-600">Hours: Mon-Fri, 9am-5pm</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} StyleTee. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
