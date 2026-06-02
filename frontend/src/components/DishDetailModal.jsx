import Modal from './Modal.jsx'
import { formatMoney } from '../utils/money.js'

export default function DishDetailModal({ item, open, onClose, onAdd }) {
  if (!item) return null

  return (
    <Modal open={open} onClose={onClose} title={item.name}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl overflow-hidden border border-white/5 bg-surface-container-highest">
          <img
            alt={item.name}
            src={item.imageUrl}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-4">
            <div className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
              {item.tags?.[0] ? item.tags[0] : item.categoryName}
            </div>
            <div className="font-headline-md text-headline-md text-primary">
              {formatMoney(item.price)}
            </div>
          </div>

          <p className="mt-4 font-body-md text-body-md text-on-surface-variant">
            {item.description}
          </p>

          <div className="mt-6 flex gap-4">
            <button
              type="button"
              onClick={() => onAdd?.(item)}
              className="bg-primary text-on-primary font-label-sm text-label-sm px-6 py-3 rounded hover:bg-primary-container transition-colors uppercase tracking-widest"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border border-secondary/30 bg-white/5 backdrop-blur-md text-on-surface font-label-sm text-label-sm px-6 py-3 rounded uppercase tracking-widest hover:border-secondary hover:bg-white/10 transition-all"
            >
              Continue Browsing
            </button>
          </div>

          <div className="mt-8 bg-surface-container/30 backdrop-blur-md rounded-xl border border-secondary/20 p-4">
            <div className="font-label-sm text-label-sm uppercase tracking-widest text-secondary mb-2">
              Notes
            </div>
            <div className="font-body-md text-body-md text-on-surface-variant">
              Allergens and availability vary. Connect this section to backend
              dish metadata later.
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

