export default function EmptyState({ title, description, action }) {
  return (
    <div className="bg-surface-container/30 backdrop-blur-md rounded-xl border border-secondary/20 p-6 shadow-[0_4px_30px_rgba(184,115,51,0.05)]">
      <div className="font-headline-md text-headline-md text-on-surface mb-2">
        {title}
      </div>
      {description ? (
        <div className="font-body-md text-body-md text-on-surface-variant">
          {description}
        </div>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  )
}

