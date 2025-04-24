
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const AdminLayout = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect if not an admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  return (
    <div className="flex">
      <AdminSidebar />
      
      <div className="flex-1 min-h-screen">
        <div className="border-b border-gray-200 bg-white">
          <div className="flex justify-between items-center h-16 px-6">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <Button variant="ghost" onClick={() => {
              logout();
              navigate('/');
            }}>
              Log out
            </Button>
          </div>
        </div>
        
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
