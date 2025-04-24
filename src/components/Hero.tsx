
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative bg-gray-900 text-white">
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          opacity: 0.6
        }}
      ></div>
      
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins mb-4">
            Premium Quality T-Shirts
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Discover the perfect blend of comfort, style, and durability.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button asChild size="lg" className="px-8">
              <Link to="/men">Shop Men</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 bg-transparent text-white border-white hover:bg-white hover:text-black">
              <Link to="/women">Shop Women</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
