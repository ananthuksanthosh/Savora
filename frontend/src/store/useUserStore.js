import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialUsers = [
  { id: 'user1', name: 'John Doe', email: 'john@example.com', role: 'customer', mobile: '9876543210', registered: '2026-01-15' },
  { id: 'user2', name: 'Alice Smith', email: 'alice@example.com', role: 'customer', mobile: '9123456789', registered: '2026-03-22' },
  { id: 'admin1', name: 'Restaurant Admin', email: 'admin@savora.com', role: 'admin', mobile: '9999999999', registered: '2025-12-01' }
];

export const useUserStore = create(
  persist(
    (set) => ({
      users: initialUsers,
      addUser: (user) => set((state) => ({
        users: [...state.users, { ...user, id: `u${Date.now()}`, registered: new Date().toISOString().split('T')[0] }]
      })),
      updateUser: (id, updates) => set((state) => ({
        users: state.users.map(u => u.id === id ? { ...u, ...updates } : u)
      })),
      deleteUser: (id) => set((state) => ({
        users: state.users.filter(u => u.id !== id)
      }))
    }),
    {
      name: 'savora-users',
    }
  )
);

