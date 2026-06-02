import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pb-section-gap">
      <div className="pt-16">
        <div className="bg-surface-container/30 backdrop-blur-md rounded-xl border border-secondary/20 p-6 shadow-[0_4px_30px_rgba(184,115,51,0.05)]">
          <div className="font-headline-lg text-headline-lg text-on-surface">
            Page not found
          </div>
          <div className="mt-3 font-body-md text-body-md text-on-surface-variant">
            The page you are looking for does not exist.
          </div>
          <div className="mt-8 flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-primary text-on-primary font-label-sm text-label-sm px-6 py-3 rounded hover:bg-primary-container transition-colors uppercase tracking-widest"
            >
              Go home
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="border border-secondary/30 bg-white/5 backdrop-blur-md text-on-surface font-label-sm text-label-sm px-6 py-3 rounded uppercase tracking-widest hover:border-secondary hover:bg-white/10 transition-all"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

