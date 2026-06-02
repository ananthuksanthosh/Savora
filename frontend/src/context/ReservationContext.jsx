import { createContext, useContext, useMemo, useState } from 'react'
import { createId } from '../utils/id.js'

const ReservationContext = createContext(null)

const initialReservations = [
  {
    id: 'res_001',
    createdAt: '2026-05-24T16:10:00.000Z',
    date: '2026-06-10',
    time: '7:30 PM',
    guests: 2,
    notes: 'Window seat if available.',
    status: 'Confirmed',
  },
]

export function ReservationProvider({ children }) {
  const [reservations, setReservations] = useState(initialReservations)

  const value = useMemo(() => {
    return {
      reservations,
      addReservation(draft) {
        const reservation = {
          id: createId('res'),
          createdAt: new Date().toISOString(),
          status: 'Pending Confirmation',
          ...draft,
        }
        setReservations((r) => [reservation, ...r])
        return reservation
      },
      cancelReservation(id) {
        setReservations((r) =>
          r.map((res) => (res.id === id ? { ...res, status: 'Cancelled' } : res)),
        )
      },
    }
  }, [reservations])

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  )
}

export function useReservations() {
  const ctx = useContext(ReservationContext)
  if (!ctx) throw new Error('useReservations must be used within ReservationProvider')
  return ctx
}

