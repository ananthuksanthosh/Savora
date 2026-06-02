import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout.jsx'
import LandingPage from '../pages/LandingPage.jsx'
import MenuPage from '../pages/MenuPage.jsx'
import OrderPage from '../pages/OrderPage.jsx'
import ReservationPage from '../pages/ReservationPage.jsx'
import CheckoutPage from '../pages/CheckoutPage.jsx'
import DashboardPage from '../pages/DashboardPage.jsx'
import ReviewsPage from '../pages/ReviewsPage.jsx'
import AdminPage from '../pages/AdminPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/reserve" element={<ReservationPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

