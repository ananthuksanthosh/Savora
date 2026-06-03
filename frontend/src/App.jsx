import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import ReservationPage from './pages/customer/ReservationPage';
import CheckoutPage from './pages/CheckoutPage';

import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageFood from './pages/admin/ManageFood';
import ManageReservations from './pages/admin/ManageReservations';
import ManageOrders from './pages/admin/ManageOrders';
import ManageReviews from './pages/admin/ManageReviews';

import { useAuthStore } from './store/useAuthStore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (useAuthStore.persist?.hasHydrated()) {
      setIsHydrated(true);
    } else {
      const unsub = useAuthStore.persist?.onFinishHydration(() => {
        setIsHydrated(true);
      });
      return () => unsub?.();
    }
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-primary font-body-md">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span>Synchronizing session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (requireAdmin && !isAdmin) return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public / Customer Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          
          {/* Protected Customer Routes */}
          <Route path="dashboard" element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>} />
          <Route path="reserve" element={<ProtectedRoute><ReservationPage /></ProtectedRoute>} />
          <Route path="checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="food" element={<ManageFood />} />
          <Route path="reservations" element={<ManageReservations />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="reviews" element={<ManageReviews />} />
        </Route>
      </Routes>
      <ToastContainer theme="dark" position="bottom-right" />
    </Router>
  );
}

export default App;
