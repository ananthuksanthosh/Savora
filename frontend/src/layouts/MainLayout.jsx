import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { Utensils, ShoppingBag, User, LogOut, Menu as MenuIcon, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { items } = useCartStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-surface/90 backdrop-blur-md sticky top-0 z-50 border-b border-surface-bright">
      <div className="container-max-width mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary">
          <Utensils size={28} />
          <span className="font-headline-md text-2xl font-bold tracking-wide">SAVORA</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-on-surface hover:text-primary transition-colors font-body-md">Home</Link>
          <Link to="/menu" className="text-on-surface hover:text-primary transition-colors font-body-md">Menu</Link>
          <Link to="/reserve" className="text-on-surface hover:text-primary transition-colors font-body-md">Reservations</Link>
          
          <div className="flex items-center gap-4 ml-4">
            <Link to="/menu" className="relative text-on-surface hover:text-primary transition-colors">
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-error text-on-error text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center gap-2 text-on-surface hover:text-primary transition-colors">
                  <User size={24} />
                  <span className="font-body-md hidden lg:block">{user.name}</span>
                </Link>
                <button onClick={handleLogout} className="text-on-surface-variant hover:text-error transition-colors">
                  <LogOut size={24} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-sm uppercase hover:bg-primary-fixed-dim transition-colors">
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-on-surface" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface-container absolute top-full left-0 w-full border-b border-surface-bright flex flex-col p-4 gap-4 shadow-lg">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-on-surface font-body-lg">Home</Link>
          <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)} className="text-on-surface font-body-lg">Menu</Link>
          <Link to="/reserve" onClick={() => setIsMobileMenuOpen(false)} className="text-on-surface font-body-lg">Reservations</Link>
          {isAuthenticated ? (
             <>
               <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setIsMobileMenuOpen(false)} className="text-on-surface font-body-lg">Dashboard</Link>
               <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="text-left text-error font-body-lg">Logout</button>
             </>
          ) : (
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-primary font-body-lg">Sign In</Link>
          )}
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-surface-container-lowest py-12 mt-auto border-t border-surface-bright text-on-surface-variant">
    <div className="container-max-width mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="font-headline-md text-primary mb-4 text-xl">SAVORA</h3>
        <p className="font-body-md opacity-80">Experience the authentic taste of India in a premium, modern setting. Spice up your life.</p>
      </div>
      <div>
        <h4 className="font-label-sm text-on-surface uppercase mb-4">Quick Links</h4>
        <ul className="space-y-2 font-body-md">
          <li><Link to="/menu" className="hover:text-primary transition-colors">Our Menu</Link></li>
          <li><Link to="/reserve" className="hover:text-primary transition-colors">Book a Table</Link></li>
          <li><Link to="/login" className="hover:text-primary transition-colors">Customer Login</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-label-sm text-on-surface uppercase mb-4">Contact Us</h4>
        <ul className="space-y-2 font-body-md">
          <li>123 Culinary Ave, Food District</li>
          <li>contact@savora.com</li>
          <li>+91 98765 43210</li>
        </ul>
      </div>
    </div>
    <div className="text-center mt-12 text-sm opacity-60">
      &copy; {new Date().getFullYear()} Savora Premium Dining. All rights reserved.
    </div>
  </footer>
);

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background font-body-md selection:bg-primary/30 selection:text-primary">
      <Navbar />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
