import { useReservationStore } from '../../store/useReservationStore';
import { toast } from 'react-toastify';

export default function ManageReservations() {
  const { reservations, updateStatus } = useReservationStore();

  const handleStatusChange = (id, newStatus) => {
    updateStatus(id, newStatus);
    toast.success(`Reservation marked as ${newStatus}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-display-lg text-primary font-bold mb-8">Manage Reservations</h1>
      
      <div className="bg-surface-container rounded-xl border border-surface-bright overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-high text-on-surface-variant font-label-sm uppercase text-xs">
              <tr>
                <th className="px-6 py-4 border-b border-surface-bright">ID</th>
                <th className="px-6 py-4 border-b border-surface-bright">Customer</th>
                <th className="px-6 py-4 border-b border-surface-bright">Date & Time</th>
                <th className="px-6 py-4 border-b border-surface-bright">Guests</th>
                <th className="px-6 py-4 border-b border-surface-bright">Status</th>
                <th className="px-6 py-4 border-b border-surface-bright">Actions</th>
              </tr>
            </thead>
            <tbody className="text-on-surface text-sm divide-y divide-surface-bright">
              {reservations.map((res) => (
                <tr key={res.id} className="hover:bg-surface-container-high/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">{res.id}</td>
                  <td className="px-6 py-4 font-bold">
                    {res.customerName}
                    <div className="text-xs font-normal text-on-surface-variant">{res.mobile}</div>
                  </td>
                  <td className="px-6 py-4">{res.date} <br/><span className="text-primary">{res.time}</span></td>
                  <td className="px-6 py-4">{res.guests}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-bold uppercase ${
                      res.status === 'Confirmed' ? 'bg-green-500/20 text-green-400' : 
                      res.status === 'Cancelled' ? 'bg-error/20 text-error' : 'bg-primary/20 text-primary'
                    }`}>
                      {res.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    {res.status === 'Pending' && (
                      <button onClick={() => handleStatusChange(res.id, 'Confirmed')} className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-xs font-bold hover:bg-green-500/30">Confirm</button>
                    )}
                    {res.status !== 'Cancelled' && (
                      <button onClick={() => handleStatusChange(res.id, 'Cancelled')} className="px-3 py-1 bg-error/20 text-error rounded text-xs font-bold hover:bg-error/30">Cancel</button>
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
