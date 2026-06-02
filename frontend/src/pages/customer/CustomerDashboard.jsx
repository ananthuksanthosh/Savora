import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useOrderStore } from '../../store/useOrderStore';
import { useReservationStore } from '../../store/useReservationStore';
import { User, ShoppingBag, CalendarClock } from 'lucide-react';

export default function CustomerDashboard() {
  const { user } = useAuthStore();
  const { orders } = useOrderStore();
  const { reservations } = useReservationStore();

  const [activeTab, setActiveTab] = useState('profile');

  // Filter for current user's data
  // Using user.name for mock matching instead of ID since order creation is mocked simply
  const myOrders = orders.filter(o => o.customerName === user.name);
  const myReservations = reservations.filter(r => r.customerName === user.name);

  return (
    <div className="container-max-width mx-auto px-4 lg:px-8 py-12">
      <h1 className="font-display-lg text-4xl text-primary font-bold mb-8">My Dashboard</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex flex-col gap-2">
          {[
            { id: 'profile', icon: <User size={20} />, label: 'Profile' },
            { id: 'orders', icon: <ShoppingBag size={20} />, label: 'Order History' },
            { id: 'reservations', icon: <CalendarClock size={20} />, label: 'Reservations' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl font-body-md transition-colors text-left ${
                activeTab === tab.id 
                ? 'bg-primary text-on-primary font-bold shadow-lg shadow-primary/20' 
                : 'bg-surface-container text-on-surface hover:bg-surface-bright'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-surface-container rounded-2xl border border-surface-bright p-8">
          
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-headline-md text-on-surface mb-6">Account Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-surface-container-high rounded-xl border border-surface-bright">
                  <label className="text-xs font-label-sm uppercase text-on-surface-variant block mb-1">Full Name</label>
                  <p className="font-body-lg text-on-surface">{user.name}</p>
                </div>
                <div className="p-4 bg-surface-container-high rounded-xl border border-surface-bright">
                  <label className="text-xs font-label-sm uppercase text-on-surface-variant block mb-1">Email</label>
                  <p className="font-body-lg text-on-surface">{user.email}</p>
                </div>
                <div className="p-4 bg-surface-container-high rounded-xl border border-surface-bright">
                  <label className="text-xs font-label-sm uppercase text-on-surface-variant block mb-1">Mobile Number</label>
                  <p className="font-body-lg text-on-surface">{user.mobile || 'Not Provided'}</p>
                </div>
                <div className="p-4 bg-surface-container-high rounded-xl border border-surface-bright">
                  <label className="text-xs font-label-sm uppercase text-on-surface-variant block mb-1">Account Role</label>
                  <p className="font-body-lg text-primary uppercase">{user.role}</p>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-headline-md text-on-surface mb-6">Order History</h2>
              {myOrders.length === 0 ? (
                <p className="text-on-surface-variant">You have no past orders.</p>
              ) : (
                <div className="space-y-4">
                  {myOrders.map(order => (
                    <div key={order.id} className="p-6 bg-surface-container-high rounded-xl border border-surface-bright flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold text-on-surface">Order #{order.id}</span>
                          <span className={`px-2 py-1 text-xs rounded-full font-bold uppercase ${
                            order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' : 'bg-primary/20 text-primary'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-on-surface-variant mb-2">
                          {new Date(order.date).toLocaleString()}
                        </p>
                        <div className="text-sm text-on-surface">
                          {order.items.map((item, i) => (
                            <span key={i}>{item.quantity}x {item.name}{i < order.items.length - 1 ? ', ' : ''}</span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right flex flex-col justify-center">
                        <span className="text-xs font-label-sm uppercase text-on-surface-variant">Total</span>
                        <span className="font-display-lg-mobile text-2xl text-primary font-bold">₹{order.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Reservations Tab */}
          {activeTab === 'reservations' && (
            <div>
              <h2 className="text-2xl font-headline-md text-on-surface mb-6">My Reservations</h2>
              {myReservations.length === 0 ? (
                <p className="text-on-surface-variant">You have no reservations.</p>
              ) : (
                <div className="space-y-4">
                  {myReservations.map(res => (
                    <div key={res.id} className="p-6 bg-surface-container-high rounded-xl border border-surface-bright flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold text-on-surface">{new Date(res.date).toLocaleDateString()} at {res.time}</span>
                          <span className={`px-2 py-1 text-xs rounded-full font-bold uppercase ${
                            res.status === 'Confirmed' ? 'bg-green-500/20 text-green-400' : 
                            res.status === 'Cancelled' ? 'bg-error/20 text-error' : 'bg-primary/20 text-primary'
                          }`}>
                            {res.status}
                          </span>
                        </div>
                        <p className="text-sm text-on-surface-variant mb-1">Guests: {res.guests}</p>
                        {res.specialRequest && <p className="text-sm text-on-surface-variant italic">"{res.specialRequest}"</p>}
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-on-surface-variant">Booking Ref:</span>
                        <p className="font-mono text-sm">{res.id}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
