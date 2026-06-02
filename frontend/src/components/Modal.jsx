import { useEffect } from 'react'

export default function Modal({ open, title, onClose, children }) {
  useEffect(() => {
    if (!open) return
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-margin-mobile"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="relative w-full max-w-3xl bg-surface/50 backdrop-blur-xl border border-white/5 rounded-xl shadow-[0_20px_80px_rgba(0,0,0,0.6)] overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-secondary/20" />
        <div className="flex items-center justify-between px-6 py-5 border-b border-secondary/10">
          <div className="font-headline-md text-headline-md text-on-surface">
            {title}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-on-surface/80 hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

