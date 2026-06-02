import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // { id, name, price, qty, imageUrl }

  const value = useMemo(() => {
    const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0)
    const serviceFee = subtotal ? Math.round(subtotal * 0.08) : 0
    const total = subtotal + serviceFee

    return {
      items,
      subtotal,
      serviceFee,
      total,
      addItem(menuItem, qty = 1) {
        setItems((prev) => {
          const existing = prev.find((p) => p.id === menuItem.id)
          if (existing) {
            return prev.map((p) =>
              p.id === menuItem.id ? { ...p, qty: p.qty + qty } : p,
            )
          }
          return [
            ...prev,
            {
              id: menuItem.id,
              name: menuItem.name,
              price: menuItem.price,
              imageUrl: menuItem.imageUrl,
              qty,
            },
          ]
        })
      },
      removeItem(id) {
        setItems((prev) => prev.filter((p) => p.id !== id))
      },
      setQty(id, qty) {
        const nextQty = Math.max(1, Number(qty || 1))
        setItems((prev) =>
          prev.map((p) => (p.id === id ? { ...p, qty: nextQty } : p)),
        )
      },
      clear() {
        setItems([])
      },
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

