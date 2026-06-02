import { formatMoney } from '../utils/money.js'

export default function MenuItemCard({ item, onOpen, onAdd }) {
  return (
    <article className="group relative overflow-hidden rounded-xl bg-surface-container/20 backdrop-blur-xl border-t border-secondary/20 transition-all duration-500 hover:bg-surface-container/40 flex flex-col">
      <button
        type="button"
        onClick={() => onOpen?.(item)}
        className="text-left"
        aria-label={`View ${item.name}`}
      >
        <div className="relative w-full aspect-video md:aspect-[4/3] overflow-hidden bg-surface-container-highest">
          <img
            alt={item.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            src={item.imageUrl}
            loading="lazy"
          />
          {item.tags?.includes("Chef's Choice") ? (
            <div className="absolute top-4 left-4 bg-surface/80 backdrop-blur-md border border-secondary/30 px-3 py-1.5 rounded-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px] text-secondary icon-fill">
                stars
              </span>
              <span className="font-label-sm text-label-sm uppercase text-secondary">
                Chef Recommended
              </span>
            </div>
          ) : null}
        </div>
      </button>

      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex justify-between items-start mb-2 gap-4">
            <button
              type="button"
              onClick={() => onOpen?.(item)}
              className="text-left"
            >
              <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">
                {item.name}
              </h3>
            </button>
            <span className="font-headline-md text-headline-md text-primary shrink-0">
              {formatMoney(item.price)}
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-4">
            {item.description}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onAdd?.(item)}
          className="self-start font-label-sm text-label-sm uppercase tracking-widest text-secondary border-b border-secondary/30 hover:border-secondary pb-1 transition-colors flex items-center gap-2"
        >
          Add to Order
          <span className="material-symbols-outlined text-[16px]">add</span>
        </button>
      </div>
    </article>
  )
}

