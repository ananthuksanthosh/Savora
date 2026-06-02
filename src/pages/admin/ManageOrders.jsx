import { useOrderStore } from '../../store/useOrderStore';
import { toast } from 'react-toastify';

export default function ManageOrders() {
  const { orders, updateStatus } = useOrderStore();

  const handleStatusChange = (id, newStatus) => {
    updateStatus(id, newStatus);
    toast.success(`Order marked as ${newStatus}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-display-lg text-primary font-bold mb-8">Manage Orders</h1>
      
      <div className="bg-surface-container rounded-xl border border-surface-bright overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-high text-on-surface-variant font-label-sm uppercase text-xs">
              <tr>
                <th className="px-6 py-4 border-b border-surface-bright">Order ID</th>
                <th className="px-6 py-4 border-b border-surface-bright">Customer</th>
                <th className="px-6 py-4 border-b border-surface-bright">Items</th>
                <th className="px-6 py-4 border-b border-surface-bright">Total</th>
                <th className="px-6 py-4 border-b border-surface-bright">Status</th>
                <th className="px-6 py-4 border-b border-surface-bright">Actions</th>
              </tr>
            </thead>
            <tbody className="text-on-surface text-sm divide-y divide-surface-bright">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-surface-container-high/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">{order.id}</td>
                  <td className="px-6 py-4 font-bold">{order.customerName}</td>
                  <td className="px-6 py-4">
                    {order.items.map((item, i) => (
                      <div key={i} className="text-xs">{item.quantity}x {item.name}</div>
                    ))}
                  </td>
                  <td className="px-6 py-4 font-bold text-primary">₹{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-bold uppercase ${
                      order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    {order.status === 'Pending' && (
                      <button onClick={() => handleStatusChange(order.id, 'Preparing')} className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded text-xs font-bold hover:bg-yellow-500/30">Prep</button>
                    )}
                    {order.status === 'Preparing' && (
                      <button onClick={() => handleStatusChange(order.id, 'Out for Delivery')} className="px-3 py-1 bg-blue-500/20 text-blue-500 rounded text-xs font-bold hover:bg-blue-500/30">Deliver</button>
                    )}
                    {order.status === 'Out for Delivery' && (
                      <button onClick={() => handleStatusChange(order.id, 'Delivered')} className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-xs font-bold hover:bg-green-500/30">Done</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
