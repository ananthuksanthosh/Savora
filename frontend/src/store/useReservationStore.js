import { create } from 'zustand';

const initialReservations = [
  { id: 'r1', customerName: 'John Doe', mobile: '9876543210', date: '2026-06-10', time: '19:00', guests: 2, status: 'Confirmed', specialRequest: 'Anniversary' },
  { id: 'r2', customerName: 'Alice Smith', mobile: '9123456789', date: '2026-06-12', time: '20:30', guests: 4, status: 'Pending', specialRequest: 'Window seat' }
];

export const useReservationStore = create((set) => ({
  reservations: initialReservations,
  addReservation: (res) => set((state) => ({
    reservations: [{ ...res, id: `r${Date.now()}`, status: 'Pending' }, ...state.reservations]
  })),
  updateStatus: (id, status) => set((state) => ({
    reservations: state.reservations.map(res => 
      res.id === id ? { ...res, status } : res
    )
  })),
  deleteReservation: (id) => set((state) => ({
    reservations: state.reservations.filter(res => res.id !== id)
  }))
}));
