import { useMemo } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useReservations } from '../context/ReservationContext.jsx'
import { menuItems } from '../data/menu.js'
import { formatMoney } from '../utils/money.js'

export default function AdminPage() {
  const auth = useAuth()
  const reservations = useReservations()

  const revenue = useMemo(() => {
    return auth.orders.reduce((sum, o) => sum + (o.totals?.total ?? 0), 0)
  }, [auth.orders])

  const topItems = useMemo(() => {
    const counts = new Map()
    for (const o of auth.orders) {
      for (const it of o.items ?? []) {
        counts.set(it.id, (counts.get(it.id) ?? 0) + it.qty)
      }
    }
    const byId = new Map(menuItems.map((m) => [m.id, m]))
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id, qty]) => ({ item: byId.get(id), qty }))
      .filter((x) => x.item)
  }, [auth.orders])

  return (
    <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pb-section-gap">
      <header className="pt-10 pb-8">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-3">
          Admin Overview
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
          This is a frontend-only admin dashboard backed by in-memory state.
          Replace metrics with backend reporting endpoints later.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container/30 backdrop-blur-md rounded-xl border border-secondary/20 p-6 shadow-[0_4px_30px_rgba(184,115,51,0.05)]">
          <div className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
            Revenue (simulated)
          </div>
          <div className="mt-2 font-display-lg-mobile text-display-lg-mobile text-primary">
            {formatMoney(revenue)}
          </div>
        </div>

        <div className="bg-surface-container/30 backdrop-blur-md rounded-xl border border-secondary/20 p-6 shadow-[0_4px_30px_rgba(184,115,51,0.05)]">
          <div className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
            Orders
          </div>
          <div className="mt-2 font-display-lg-mobile text-display-lg-mobile text-on-surface">
            {auth.orders.length}
          </div>
        </div>

        <div className="bg-surface-container/30 backdrop-blur-md rounded-xl border border-secondary/20 p-6 shadow-[0_4px_30px_rgba(184,115,51,0.05)]">
          <div className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
            Reservations
          </div>
          <div className="mt-2 font-display-lg-mobile text-display-lg-mobile text-on-surface">
            {reservations.reservations.length}
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        <section className="lg:col-span-7 bg-surface-container/30 backdrop-blur-md rounded-xl border border-secondary/20 p-6 shadow-[0_4px_30px_rgba(184,115,51,0.05)]">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-6">
            Upcoming service
          </h2>
          <div className="flex flex-col gap-4">
            {reservations.reservations.slice(0, 6).map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between gap-4 border border-secondary/10 rounded-xl p-4 bg-surface/20"
              >
                <div>
                  <div className="font-body-lg text-body-lg text-on-surface">
                    {r.date} • {r.time}
                  </div>
                  <div className="font-body-md text-body-md text-on-surface-variant">
                    {r.guests} guests • {r.status}
                  </div>
                </div>
                <div className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                  {r.id}
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="lg:col-span-5 bg-surface-container/30 backdrop-blur-md rounded-xl border border-secondary/20 p-6 shadow-[0_4px_30px_rgba(184,115,51,0.05)]">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-6">
            Top items
          </h2>
          {topItems.length ? (
            <div className="flex flex-col gap-4">
              {topItems.map(({ item, qty }) => (
                <div key={item.id} className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="font-body-md text-body-md text-on-surface truncate">
                      {item.name}
                    </div>
                    <div className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                      {formatMoney(item.price)}
                    </div>
                  </div>
                  <div className="font-headline-md text-headline-md text-primary">
                    {qty}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="font-body-md text-body-md text-on-surface-variant">
              Place a few orders to populate analytics.
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

