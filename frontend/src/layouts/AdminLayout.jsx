import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { LayoutDashboard, Users, UtensilsCrossed, CalendarClock, ShoppingBag, MessageSquare, LogOut } from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Users', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'Menu', path: '/admin/food', icon: <UtensilsCrossed size={20} /> },
    { name: 'Reservations', path: '/admin/reservations', icon: <CalendarClock size={20} /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingBag size={20} /> },
    { name: 'Reviews', path: '/admin/reviews', icon: <MessageSquare size={20} /> },
  ];

  return (
    <aside className="w-64 bg-surface-container-low border-r border-surface-bright flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-surface-bright flex items-center justify-center">
        <h1 className="text-2xl font-headline-md text-primary font-bold">SAVORA ADMIN</h1>
      </div>
      <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-body-md transition-colors ${
                isActive 
                ? 'bg-primary/10 text-primary border border-primary/20' 
                : 'text-on-surface-variant hover:bg-surface-bright hover:text-on-surface'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          )
        })}
      </div>
      <div className="p-4 border-t border-surface-bright">
        <div className="mb-4 px-2">
          <p className="text-sm text-on-surface-variant">Logged in as:</p>
          <p className="font-semibold text-on-surface">{user?.name}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-error hover:bg-error/10 rounded-lg transition-colors font-body-md"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-background text-on-background flex">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto bg-surface p-8">
        <Outlet />
      </main>
    </div>
  );
}
