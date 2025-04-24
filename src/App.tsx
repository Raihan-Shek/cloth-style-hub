
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

// Layout Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Public Pages
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLayout from "./pages/admin/AdminLayout";
import ProductsPage from "./pages/admin/ProductsPage";
import OrdersPage from "./pages/admin/OrdersPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<ProductsPage />} />
                  <Route path="orders" element={<OrdersPage />} />
                  {/* Add more admin routes here */}
                </Route>

                {/* Public Routes */}
                <Route
                  path="/"
                  element={
                    <>
                      <Navbar />
                      <HomePage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/men"
                  element={
                    <>
                      <Navbar />
                      <div className="min-h-[calc(100vh-64px-300px)]">
                        <CategoryPage />
                      </div>
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/women"
                  element={
                    <>
                      <Navbar />
                      <div className="min-h-[calc(100vh-64px-300px)]">
                        <CategoryPage />
                      </div>
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <>
                      <Navbar />
                      <div className="min-h-[calc(100vh-64px-300px)]">
                        <ProductPage />
                      </div>
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <>
                      <Navbar />
                      <div className="min-h-[calc(100vh-64px-300px)]">
                        <CartPage />
                      </div>
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <>
                      <Navbar />
                      <LoginPage />
                      <Footer />
                    </>
                  }
                />

                {/* 404 Not Found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
