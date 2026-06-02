import { useUserStore } from '../../store/useUserStore';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ManageUsers() {
  const { users, deleteUser } = useUserStore();

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
      toast.success('User deleted successfully');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-display-lg text-primary font-bold mb-8">Manage Users</h1>
      
      <div className="bg-surface-container rounded-xl border border-surface-bright overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-high text-on-surface-variant font-label-sm uppercase text-xs">
              <tr>
                <th className="px-6 py-4 border-b border-surface-bright">Name</th>
                <th className="px-6 py-4 border-b border-surface-bright">Email</th>
                <th className="px-6 py-4 border-b border-surface-bright">Mobile</th>
                <th className="px-6 py-4 border-b border-surface-bright">Role</th>
                <th className="px-6 py-4 border-b border-surface-bright">Registered</th>
                <th className="px-6 py-4 border-b border-surface-bright">Actions</th>
              </tr>
            </thead>
            <tbody className="text-on-surface text-sm divide-y divide-surface-bright">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-surface-container-high/50 transition-colors">
                  <td className="px-6 py-4 font-bold">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.mobile || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${user.role === 'admin' ? 'bg-primary/20 text-primary' : 'bg-surface-bright text-on-surface-variant'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">{user.registered}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleDelete(user.id)}
                      disabled={user.role === 'admin'}
                      className="text-error hover:text-error/80 disabled:opacity-20 disabled:cursor-not-allowed"
                      title={user.role === 'admin' ? "Cannot delete admin" : "Delete user"}
                    >
                      <Trash2 size={18} />
                    </button>
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
