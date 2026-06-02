import { useMemo, useState } from 'react'
import { initialReviews } from '../data/reviews.js'
import StarRating from '../components/StarRating.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { createId } from '../utils/id.js'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews)
  const [author, setAuthor] = useState('')
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')

  const avg = useMemo(() => {
    if (!reviews.length) return 0
    return (
      reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) / reviews.length
    )
  }, [reviews])

  function validate() {
    const next = {}
    if (!author.trim()) next.author = 'Your name is required.'
    if (!rating || rating < 1 || rating > 5) next.rating = 'Select 1–5 stars.'
    if (!text.trim() || text.trim().length < 20)
      next.text = 'Your review must be at least 20 characters.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function onSubmit(e) {
    e.preventDefault()
    setSuccess('')
    if (!validate()) return
    const review = {
      id: createId('rev'),
      author: author.trim(),
      rating,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    }
    setReviews((r) => [review, ...r])
    setAuthor('')
    setRating(5)
    setText('')
    setErrors({})
    setSuccess('Review submitted. Thank you for sharing your experience.')
    setTimeout(() => setSuccess(''), 1800)
  }

  return (
    <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pb-section-gap">
      <header className="pt-10 pb-8">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-3">
          Reviews
        </h1>
        <div className="flex items-center gap-4">
          <StarRating value={Math.round(avg)} size={22} />
          <div className="font-body-md text-body-md text-on-surface-variant">
            {reviews.length ? `${avg.toFixed(1)} average • ${reviews.length} reviews` : 'No reviews yet'}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        <section className="lg:col-span-7">
          {reviews.length ? (
            <div className="flex flex-col gap-6">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="bg-surface/50 backdrop-blur-xl border border-white/5 p-6 rounded-lg relative overflow-hidden group hover:border-secondary/30 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                >
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-secondary/10 group-hover:bg-secondary/40 transition-colors" />
                  <StarRating value={r.rating} size={20} />
                  <p className="mt-4 font-body-md text-body-md text-on-surface italic">
                    “{r.text}”
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                      {r.author}
                    </div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No reviews yet"
              description="Be the first to share your experience."
            />
          )}
        </section>

        <aside className="lg:col-span-5 lg:sticky lg:top-[140px]">
          <form
            onSubmit={onSubmit}
            className="bg-surface-container/30 backdrop-blur-md rounded-xl border border-secondary/20 p-6 shadow-[0_4px_30px_rgba(184,115,51,0.05)]"
          >
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
              Add a review
            </h2>

            <div>
              <label className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                Your name
              </label>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="mt-2 w-full bg-surface-container/50 border-b border-secondary/30 focus:border-primary text-on-surface py-3 px-3 outline-none transition-colors rounded-t-md font-body-md backdrop-blur-sm"
              />
              {errors.author ? (
                <div className="mt-2 font-body-md text-body-md text-error">
                  {errors.author}
                </div>
              ) : null}
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between gap-4">
                <label className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                  Rating
                </label>
                <StarRating value={rating} onChange={setRating} size={22} />
              </div>
              {errors.rating ? (
                <div className="mt-2 font-body-md text-body-md text-error">
                  {errors.rating}
                </div>
              ) : null}
            </div>

            <div className="mt-6">
              <label className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                Review
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={5}
                placeholder="What stood out? What would you recommend?"
                className="mt-2 w-full bg-surface-container/50 border-b border-secondary/30 focus:border-primary text-on-surface py-3 px-3 outline-none transition-colors rounded-t-md font-body-md placeholder-on-surface-variant/50 backdrop-blur-sm resize-none"
              />
              {errors.text ? (
                <div className="mt-2 font-body-md text-body-md text-error">
                  {errors.text}
                </div>
              ) : null}
            </div>

            {success ? (
              <div className="mt-6 bg-secondary/10 border border-secondary/20 rounded-lg p-4 font-body-md text-body-md text-on-surface">
                {success}
              </div>
            ) : null}

            <div className="mt-8">
              <button
                type="submit"
                className="bg-primary text-on-primary font-label-sm text-label-sm px-6 py-3 rounded hover:bg-primary-container transition-colors uppercase tracking-widest w-full"
              >
                Submit review
              </button>
            </div>
          </form>
        </aside>
      </div>
    </div>
  )
}

