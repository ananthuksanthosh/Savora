import { useUserStore } from '../../store/useUserStore';
import { useOrderStore } from '../../store/useOrderStore';
import { useReservationStore } from '../../store/useReservationStore';
import { useMenuStore } from '../../store/useMenuStore';
import { Users, ShoppingBag, CalendarClock, UtensilsCrossed, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const { users } = useUserStore();
  const { orders } = useOrderStore();
  const { reservations } = useReservationStore();
  const { menu } = useMenuStore();

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status !== 'Delivered').length;
  const pendingReservations = reservations.filter(r => r.status === 'Pending').length;

  const stats = [
    { title: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: <TrendingUp size={24} />, color: 'text-green-500' },
    { title: 'Total Users', value: users.length, icon: <Users size={24} />, color: 'text-blue-500' },
    { title: 'Pending Orders', value: pendingOrders, icon: <ShoppingBag size={24} />, color: 'text-yellow-500' },
    { title: 'Pending Reservations', value: pendingReservations, icon: <CalendarClock size={24} />, color: 'text-purple-500' },
    { title: 'Menu Items', value: menu.length, icon: <UtensilsCrossed size={24} />, color: 'text-primary' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-display-lg text-primary font-bold mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface-container rounded-xl p-6 border border-surface-bright flex items-center gap-4">
            <div className={`p-4 bg-surface-container-high rounded-lg border border-surface-bright ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-on-surface-variant font-label-sm uppercase text-xs">{stat.title}</p>
              <p className="text-2xl font-bold text-on-surface mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders Overview */}
        <div className="bg-surface-container rounded-xl border border-surface-bright p-6">
          <h2 className="text-xl font-headline-md text-on-surface mb-6">Recent Orders</h2>
          <div className="space-y-4">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="flex justify-between items-center p-4 bg-surface-container-high rounded-lg">
                <div>
                  <p className="font-bold text-on-surface">{order.customerName}</p>
                  <p className="text-sm text-on-surface-variant">{order.items.length} items</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">₹{order.total}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-500'}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reservations Overview */}
        <div className="bg-surface-container rounded-xl border border-surface-bright p-6">
          <h2 className="text-xl font-headline-md text-on-surface mb-6">Upcoming Reservations</h2>
          <div className="space-y-4">
            {reservations.slice(0, 5).map(res => (
              <div key={res.id} className="flex justify-between items-center p-4 bg-surface-container-high rounded-lg">
                <div>
                  <p className="font-bold text-on-surface">{res.customerName}</p>
                  <p className="text-sm text-on-surface-variant">{res.date} at {res.time}</p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <p className="font-bold text-on-surface mb-1">{res.guests} Guests</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    res.status === 'Confirmed' ? 'bg-green-500/20 text-green-400' : 
                    res.status === 'Cancelled' ? 'bg-error/20 text-error' : 'bg-primary/20 text-primary'
                  }`}>
                    {res.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
