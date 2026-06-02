export default function StarRating({ value, onChange, size = 20 }) {
  const stars = [1, 2, 3, 4, 5]
  return (
    <div className="flex items-center gap-1 text-primary">
      {stars.map((n) => {
        const filled = n <= value
        return (
          <button
            key={n}
            type="button"
            onClick={onChange ? () => onChange(n) : undefined}
            className={onChange ? 'cursor-pointer' : 'cursor-default'}
            aria-label={`${n} star`}
          >
            <span
              className={`material-symbols-outlined ${filled ? 'icon-fill' : ''}`}
              style={{
                fontSize: size,
                fontVariationSettings: filled
                  ? "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24"
                  : undefined,
              }}
            >
              star
            </span>
          </button>
        )
      })}
    </div>
  )
}

