import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useReservations } from '../context/ReservationContext.jsx'
import { formatMoney } from '../utils/money.js'
import EmptyState from '../components/EmptyState.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const cart = useCart()
  const auth = useAuth()
  const reservations = useReservations()

  const latestReservation = useMemo(
    () => reservations.reservations[0] ?? null,
    [reservations.reservations],
  )

  const [billingName, setBillingName] = useState(auth.user.name)
  const [billingEmail, setBillingEmail] = useState(auth.user.email)
  const [cardNumber, setCardNumber] = useState('')
  const [exp, setExp] = useState('')
  const [cvc, setCvc] = useState('')

  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')

  function validate() {
    const next = {}
    if (!billingName.trim()) next.billingName = 'Billing name is required.'
    if (!billingEmail.trim() || !billingEmail.includes('@'))
      next.billingEmail = 'A valid email is required.'
    if (!cardNumber.replace(/\s/g, '').match(/^\d{12,19}$/))
      next.cardNumber = 'Enter a valid card number.'
    if (!exp.trim().match(/^\d{2}\/\d{2}$/))
      next.exp = 'Use MM/YY.'
    if (!cvc.trim().match(/^\d{3,4}$/)) next.cvc = 'Enter a valid CVC.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function onSubmit(e) {
    e.preventDefault()
    setSuccess('')
    if (!cart.items.length) return
    if (!validate()) return

    setSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 700))
      const order = auth.addOrder({
        items: cart.items,
        totals: {
          subtotal: cart.subtotal,
          serviceFee: cart.serviceFee,
          total: cart.total,
        },
        reservationId: latestReservation?.id ?? null,
      })
      cart.clear()
      setSuccess(`Payment authorized. Order ${order.id} is confirmed.`)
    } catch {
      setErrors({ form: 'Checkout failed. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (!cart.items.length) {
    return (
      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pb-section-gap">
        <header className="pt-10 pb-8">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-3">
            Secure Checkout
          </h1>
        </header>
        <EmptyState
          title="No items to checkout"
          description="Your cart is empty. Add items to your order first."
          action={
            <button
              type="button"
              onClick={() => navigate('/order')}
              className="bg-primary text-on-primary font-label-sm text-label-sm px-6 py-3 rounded hover:bg-primary-container transition-colors uppercase tracking-widest"
            >
              Start an Order
            </button>
          }
        />
      </div>
    )
  }

  return (
    <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pb-section-gap">
      <header className="pt-10 pb-8">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-3">
          Secure Checkout
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
          This is a functional frontend checkout flow. Replace the validation
          and simulated delay with your payment + order APIs later.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        <section className="lg:col-span-7">
          <form
            onSubmit={onSubmit}
            className="bg-surface-container/30 backdrop-blur-md rounded-xl border border-secondary/20 p-6 shadow-[0_4px_30px_rgba(184,115,51,0.05)]"
          >
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
              Billing
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                  Full name
                </label>
                <input
                  value={billingName}
                  onChange={(e) => setBillingName(e.target.value)}
                  className="mt-2 w-full bg-surface-container/50 border-b border-secondary/30 focus:border-primary text-on-surface py-3 px-3 outline-none transition-colors rounded-t-md font-body-md backdrop-blur-sm"
                />
                {errors.billingName ? (
                  <div className="mt-2 font-body-md text-body-md text-error">
                    {errors.billingName}
                  </div>
                ) : null}
              </div>
              <div className="md:col-span-2">
                <label className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                  Email
                </label>
                <input
                  value={billingEmail}
                  onChange={(e) => setBillingEmail(e.target.value)}
                  className="mt-2 w-full bg-surface-container/50 border-b border-secondary/30 focus:border-primary text-on-surface py-3 px-3 outline-none transition-colors rounded-t-md font-body-md backdrop-blur-sm"
                />
                {errors.billingEmail ? (
                  <div className="mt-2 font-body-md text-body-md text-error">
                    {errors.billingEmail}
                  </div>
                ) : null}
              </div>
            </div>

            <h2 className="mt-10 font-headline-md text-headline-md text-on-surface mb-4">
              Payment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                  Card number
                </label>
                <input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="4242 4242 4242 4242"
                  className="mt-2 w-full bg-surface-container/50 border-b border-secondary/30 focus:border-primary text-on-surface py-3 px-3 outline-none transition-colors rounded-t-md font-body-md placeholder-on-surface-variant/50 backdrop-blur-sm"
                />
                {errors.cardNumber ? (
                  <div className="mt-2 font-body-md text-body-md text-error">
                    {errors.cardNumber}
                  </div>
                ) : null}
              </div>
              <div>
                <label className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                  Expiry (MM/YY)
                </label>
                <input
                  value={exp}
                  onChange={(e) => setExp(e.target.value)}
                  placeholder="08/28"
                  className="mt-2 w-full bg-surface-container/50 border-b border-secondary/30 focus:border-primary text-on-surface py-3 px-3 outline-none transition-colors rounded-t-md font-body-md placeholder-on-surface-variant/50 backdrop-blur-sm"
                />
                {errors.exp ? (
                  <div className="mt-2 font-body-md text-body-md text-error">
                    {errors.exp}
                  </div>
                ) : null}
              </div>
              <div>
                <label className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                  CVC
                </label>
                <input
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  placeholder="123"
                  className="mt-2 w-full bg-surface-container/50 border-b border-secondary/30 focus:border-primary text-on-surface py-3 px-3 outline-none transition-colors rounded-t-md font-body-md placeholder-on-surface-variant/50 backdrop-blur-sm"
                />
                {errors.cvc ? (
                  <div className="mt-2 font-body-md text-body-md text-error">
                    {errors.cvc}
                  </div>
                ) : null}
              </div>
            </div>

            {errors.form ? (
              <div className="mt-6 font-body-md text-body-md text-error">
                {errors.form}
              </div>
            ) : null}

            {success ? (
              <div className="mt-6 bg-secondary/10 border border-secondary/20 rounded-lg p-4 font-body-md text-body-md text-on-surface">
                {success}
              </div>
            ) : null}

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="bg-primary text-on-primary font-label-sm text-label-sm px-6 py-3 rounded hover:bg-primary-container transition-colors uppercase tracking-widest disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Processing…' : 'Pay & Confirm'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="border border-secondary/30 bg-white/5 backdrop-blur-md text-on-surface font-label-sm text-label-sm px-6 py-3 rounded uppercase tracking-widest hover:border-secondary hover:bg-white/10 transition-all"
              >
                View Dashboard
              </button>
            </div>

            {submitting ? (
              <div className="mt-5">
                <LoadingSpinner label="Authorizing payment…" />
              </div>
            ) : null}
          </form>
        </section>

        <aside className="lg:col-span-5 lg:sticky lg:top-[140px]">
          <div className="bg-surface-container/30 backdrop-blur-md rounded-xl border border-secondary/20 p-6 shadow-[0_4px_30px_rgba(184,115,51,0.05)]">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
              Order Summary
            </h2>
            <div className="flex flex-col gap-4">
              {cart.items.map((it) => (
                <div key={it.id} className="flex justify-between gap-4">
                  <div className="min-w-0">
                    <div className="font-body-md text-body-md text-on-surface truncate">
                      {it.name}
                    </div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                      Qty {it.qty}
                    </div>
                  </div>
                  <div className="font-body-md text-body-md text-on-surface-variant">
                    {formatMoney(it.price * it.qty)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-secondary/10 pt-6 flex flex-col gap-3">
              <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                <span>Subtotal</span>
                <span>{formatMoney(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                <span>Service fee</span>
                <span>{formatMoney(cart.serviceFee)}</span>
              </div>
              <div className="flex justify-between font-headline-md text-headline-md text-on-surface mt-1">
                <span>Total</span>
                <span className="text-primary">{formatMoney(cart.total)}</span>
              </div>
            </div>

            <div className="mt-8 bg-surface/20 border border-secondary/20 rounded-xl p-4">
              <div className="font-label-sm text-label-sm uppercase tracking-widest text-secondary mb-2">
                Reservation linkage
              </div>
              <div className="font-body-md text-body-md text-on-surface-variant">
                {latestReservation
                  ? `This order will be associated with reservation ${latestReservation.id}.`
                  : 'No reservation found yet. Make a reservation to link the experience.'}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

