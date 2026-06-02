import { formatMoney } from '../utils/money.js'
import EmptyState from './EmptyState.jsx'

export default function CartSummary({ cart, onCheckout }) {
  if (!cart.items.length) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Add a few items from the menu to begin your order."
      />
    )
  }

  return (
    <div className="bg-surface-container/30 backdrop-blur-md rounded-xl border border-secondary/20 p-6 shadow-[0_4px_30px_rgba(184,115,51,0.05)]">
      <h2 className="font-headline-md text-headline-md text-on-surface mb-6">
        Your Order
      </h2>

      <div className="flex flex-col gap-4">
        {cart.items.map((it) => (
          <div key={it.id} className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-lg overflow-hidden border border-white/5 bg-surface-container-highest shrink-0">
              {it.imageUrl ? (
                <img
                  alt={it.name}
                  src={it.imageUrl}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : null}
            </div>

            <div className="flex-1 min-w-0">
              <div className="font-body-md text-body-md text-on-surface truncate">
                {it.name}
              </div>
              <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                {formatMoney(it.price)} each
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={it.qty}
                onChange={(e) => cart.setQty(it.id, e.target.value)}
                className="w-16 bg-surface-container/50 border-b border-secondary/30 focus:border-primary text-on-surface py-2 px-2 outline-none transition-colors rounded-t-md font-body-md backdrop-blur-sm text-center"
                aria-label={`Quantity for ${it.name}`}
              />
              <button
                type="button"
                onClick={() => cart.removeItem(it.id)}
                className="text-on-surface/80 hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5"
                aria-label={`Remove ${it.name}`}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
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

      <div className="mt-8 flex gap-4">
        <button
          type="button"
          onClick={onCheckout}
          className="bg-primary text-on-primary font-label-sm text-label-sm px-6 py-3 rounded hover:bg-primary-container transition-colors uppercase tracking-widest flex-1"
        >
          Checkout
        </button>
        <button
          type="button"
          onClick={cart.clear}
          className="border border-secondary/30 bg-white/5 backdrop-blur-md text-on-surface font-label-sm text-label-sm px-6 py-3 rounded uppercase tracking-widest hover:border-secondary hover:bg-white/10 transition-all"
        >
          Clear
        </button>
      </div>
    </div>
  )
}

