import { useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useReservations } from '../context/ReservationContext.jsx'
import { formatMoney } from '../utils/money.js'
import EmptyState from '../components/EmptyState.jsx'

export default function DashboardPage() {
  const auth = useAuth()
  const reservations = useReservations()
  const [tab, setTab] = useState('profile')
  const [profileDraft, setProfileDraft] = useState(auth.user)
  const [profileSaved, setProfileSaved] = useState(false)

  const totals = useMemo(() => {
    return auth.orders.reduce(
      (acc, o) => {
        acc.orders += 1
        acc.spend += o.totals?.total ?? 0
        return acc
      },
      { orders: 0, spend: 0 },
    )
  }, [auth.orders])

  function saveProfile(e) {
    e.preventDefault()
    auth.updateProfile({
      name: profileDraft.name.trim(),
      email: profileDraft.email.trim(),
      phone: profileDraft.phone.trim(),
    })
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 1200)
  }

  return (
    <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pb-section-gap">
      <header className="pt-10 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-3">
            Your Space
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Manage your profile, view reservation history, and track orders.
          </p>
        </div>

        <div className="bg-surface-container/30 backdrop-blur-md rounded-xl border border-secondary/20 p-4 shadow-[0_4px_30px_rgba(184,115,51,0.05)] flex gap-6">
          <div>
            <div className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
              Tier
            </div>
            <div className="font-headline-md text-headline-md text-on-surface">
              {auth.user.tier}
            </div>
          </div>
          <div>
            <div className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
              Orders
            </div>
            <div className="font-headline-md text-headline-md text-on-surface">
              {totals.orders}
            </div>
          </div>
          <div>
            <div className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
              Spend
            </div>
            <div className="font-headline-md text-headline-md text-primary">
              {formatMoney(totals.spend)}
            </div>
          </div>
        </div>
      </header>

      <div className="bg-surface-container/30 backdrop-blur-md rounded-xl border border-secondary/20 p-2 shadow-[0_4px_30px_rgba(184,115,51,0.05)] flex flex-wrap gap-2">
        {[
          { id: 'profile', label: 'Profile' },
          { id: 'reservations', label: 'Reservations' },
          { id: 'orders', label: 'Orders' },
        ].map((t) => {
          const active = t.id === tab
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`font-label-sm text-label-sm uppercase tracking-widest px-4 py-2 rounded-full border transition-colors ${
                active
                  ? 'bg-primary text-on-primary border-primary'
                  : 'border-secondary/30 text-on-surface-variant hover:text-primary hover:border-secondary'
              }`}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      <div className="mt-8">
        {tab === 'profile' ? (
          <form
            onSubmit={saveProfile}
            className="bg-surface-container/30 backdrop-blur-md rounded-xl border border-secondary/20 p-6 shadow-[0_4px_30px_rgba(184,115,51,0.05)]"
          >
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6">
              Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                  Name
                </label>
                <input
                  value={profileDraft.name}
                  onChange={(e) =>
                    setProfileDraft((p) => ({ ...p, name: e.target.value }))
                  }
                  className="mt-2 w-full bg-surface-container/50 border-b border-secondary/30 focus:border-primary text-on-surface py-3 px-3 outline-none transition-colors rounded-t-md font-body-md backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                  Email
                </label>
                <input
                  value={profileDraft.email}
                  onChange={(e) =>
                    setProfileDraft((p) => ({ ...p, email: e.target.value }))
                  }
                  className="mt-2 w-full bg-surface-container/50 border-b border-secondary/30 focus:border-primary text-on-surface py-3 px-3 outline-none transition-colors rounded-t-md font-body-md backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                  Phone
                </label>
                <input
                  value={profileDraft.phone}
                  onChange={(e) =>
                    setProfileDraft((p) => ({ ...p, phone: e.target.value }))
                  }
                  className="mt-2 w-full bg-surface-container/50 border-b border-secondary/30 focus:border-primary text-on-surface py-3 px-3 outline-none transition-colors rounded-t-md font-body-md backdrop-blur-sm"
                />
              </div>
            </div>

            {profileSaved ? (
              <div className="mt-6 bg-secondary/10 border border-secondary/20 rounded-lg p-4 font-body-md text-body-md text-on-surface">
                Profile updated.
              </div>
            ) : null}

            <div className="mt-8">
              <button
                type="submit"
                className="bg-primary text-on-primary font-label-sm text-label-sm px-6 py-3 rounded hover:bg-primary-container transition-colors uppercase tracking-widest"
              >
                Save changes
              </button>
            </div>
          </form>
        ) : null}

        {tab === 'reservations' ? (
          <div className="bg-surface-container/30 backdrop-blur-md rounded-xl border border-secondary/20 p-6 shadow-[0_4px_30px_rgba(184,115,51,0.05)]">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6">
              Reservation history
            </h2>

            {reservations.reservations.length ? (
              <div className="flex flex-col gap-4">
                {reservations.reservations.map((r) => (
                  <div
                    key={r.id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-secondary/10 rounded-xl p-4 bg-surface/20"
                  >
                    <div>
                      <div className="font-headline-md text-headline-md text-on-surface">
                        {r.date} • {r.time}
                      </div>
                      <div className="font-body-md text-body-md text-on-surface-variant">
                        {r.guests} guests
                        {r.notes ? ` • ${r.notes}` : ''}
                      </div>
                      <div className="font-label-sm text-label-sm uppercase tracking-widest text-secondary mt-2">
                        {r.status}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => reservations.cancelReservation(r.id)}
                        disabled={r.status === 'Cancelled'}
                        className="border border-secondary/30 bg-white/5 backdrop-blur-md text-on-surface font-label-sm text-label-sm px-5 py-3 rounded uppercase tracking-widest hover:border-secondary hover:bg-white/10 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No reservations yet"
                description="Your saved reservations will appear here."
              />
            )}
          </div>
        ) : null}

        {tab === 'orders' ? (
          <div className="bg-surface-container/30 backdrop-blur-md rounded-xl border border-secondary/20 p-6 shadow-[0_4px_30px_rgba(184,115,51,0.05)]">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6">
              Order history
            </h2>

            {auth.orders.length ? (
              <div className="flex flex-col gap-4">
                {auth.orders.map((o) => (
                  <div
                    key={o.id}
                    className="border border-secondary/10 rounded-xl p-4 bg-surface/20"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="font-headline-md text-headline-md text-on-surface">
                          {o.id}
                        </div>
                        <div className="font-body-md text-body-md text-on-surface-variant">
                          {new Date(o.createdAt).toLocaleString()} • {o.status}
                        </div>
                      </div>
                      <div className="font-headline-md text-headline-md text-primary">
                        {formatMoney(o.totals?.total ?? 0)}
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {o.items?.map((it) => (
                        <div
                          key={`${o.id}_${it.id}`}
                          className="flex justify-between gap-4 font-body-md text-body-md text-on-surface-variant"
                        >
                          <span className="truncate">
                            {it.name} × {it.qty}
                          </span>
                          <span>{formatMoney(it.price * it.qty)}</span>
                        </div>
                      ))}
                    </div>
                    {o.reservationId ? (
                      <div className="mt-4 font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                        Linked reservation: {o.reservationId}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No orders yet"
                description="Complete a checkout to see orders here."
              />
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

