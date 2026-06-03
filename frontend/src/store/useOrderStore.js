import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialOrders = [
  { id: 'o1', customerId: 'user1', customerName: 'John Doe', items: [{ name: 'Chicken Biryani', quantity: 2, price: 249 }], total: 498, status: 'Preparing', date: '2026-06-02T10:00:00Z' },
  { id: 'o2', customerId: 'user2', customerName: 'Alice Smith', items: [{ name: 'Masala Dosa', quantity: 1, price: 129 }], total: 129, status: 'Delivered', date: '2026-06-01T14:30:00Z' }
];

export const useOrderStore = create(
  persist(
    (set) => ({
      orders: initialOrders,
      addOrder: (order) => set((state) => ({
        orders: [{ ...order, id: `o${Date.now()}`, status: 'Pending', date: new Date().toISOString() }, ...state.orders]
      })),
      updateStatus: (id, status) => set((state) => ({
        orders: state.orders.map(o => o.id === id ? { ...o, status } : o)
      }))
    }),
    {
      name: 'savora-orders',
    }
  )
);

