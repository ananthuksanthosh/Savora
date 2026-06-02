export default function LoadingSpinner({ label = 'Loading…' }) {
  return (
    <div className="flex items-center gap-3 text-on-surface-variant">
      <div className="h-4 w-4 rounded-full border border-secondary/40 border-t-primary animate-spin" />
      <span className="font-body-md text-body-md">{label}</span>
    </div>
  )
}

