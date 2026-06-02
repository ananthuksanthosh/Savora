import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { menuCategories, menuItems } from '../data/menu.js'
import { useCart } from '../context/CartContext.jsx'
import MenuItemCard from '../components/MenuItemCard.jsx'
import DishDetailModal from '../components/DishDetailModal.jsx'
import CartSummary from '../components/CartSummary.jsx'
import EmptyState from '../components/EmptyState.jsx'

export default function OrderPage() {
  const navigate = useNavigate()
  const cart = useCart()
  const [selected, setSelected] = useState(null)
  const [activeCategoryId, setActiveCategoryId] = useState(menuCategories[0].id)

  const items = useMemo(() => {
    const categoryById = new Map(menuCategories.map((c) => [c.id, c]))
    return menuItems.map((it) => ({
      ...it,
      categoryName: categoryById.get(it.categoryId)?.name ?? 'Menu',
    }))
  }, [])

  const filtered = useMemo(() => {
    return items.filter((it) => (activeCategoryId ? it.categoryId === activeCategoryId : true))
  }, [items, activeCategoryId])

  return (
    <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pb-section-gap">
      <header className="pt-10 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-3">
            Online Ordering
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Build your order, review the summary, and proceed to secure checkout.
          </p>
        </div>

        <div className="bg-surface-container/30 backdrop-blur-md rounded-xl border border-secondary/20 p-4 shadow-[0_4px_30px_rgba(184,115,51,0.05)] flex flex-wrap gap-2">
          {menuCategories.map((c) => {
            const active = c.id === activeCategoryId
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCategoryId(c.id)}
                className={`font-label-sm text-label-sm uppercase tracking-widest px-4 py-2 rounded-full border transition-colors ${
                  active
                    ? 'bg-primary text-on-primary border-primary'
                    : 'border-secondary/30 text-on-surface-variant hover:text-primary hover:border-secondary'
                }`}
              >
                {c.name}
              </button>
            )
          })}
          <button
            type="button"
            onClick={() => setActiveCategoryId('')}
            className={`font-label-sm text-label-sm uppercase tracking-widest px-4 py-2 rounded-full border transition-colors ${
              !activeCategoryId
                ? 'bg-primary text-on-primary border-primary'
                : 'border-secondary/30 text-on-surface-variant hover:text-primary hover:border-secondary'
            }`}
          >
            All
          </button>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        <section className="lg:col-span-8 flex flex-col gap-8">
          {filtered.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filtered.map((it) => (
                <MenuItemCard
                  key={it.id}
                  item={it}
                  onOpen={setSelected}
                  onAdd={(item) => cart.addItem(item, 1)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No items in this category"
              description="Switch categories to explore more."
            />
          )}
        </section>

        <aside className="lg:col-span-4 lg:sticky lg:top-[140px]">
          <CartSummary cart={cart} onCheckout={() => navigate('/checkout')} />
        </aside>
      </main>

      <DishDetailModal
        item={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
        onAdd={(item) => cart.addItem(item, 1)}
      />
    </div>
  )
}

