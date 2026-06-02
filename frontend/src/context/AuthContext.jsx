import { createContext, useContext, useMemo, useState } from 'react'
import { initialUser } from '../data/user.js'
import { createId } from '../utils/id.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [user, setUser] = useState(initialUser)
  const [orders, setOrders] = useState([])

  const value = useMemo(() => {
    return {
      isAuthenticated,
      user,
      orders,
      login() {
        setIsAuthenticated(true)
      },
      logout() {
        setIsAuthenticated(false)
      },
      updateProfile(patch) {
        setUser((u) => ({ ...u, ...patch }))
      },
      addOrder(orderDraft) {
        const order = {
          id: createId('order'),
          createdAt: new Date().toISOString(),
          status: 'Confirmed',
          ...orderDraft,
        }
        setOrders((o) => [order, ...o])
        return order
      },
    }
  }, [isAuthenticated, user, orders])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

