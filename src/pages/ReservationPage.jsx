import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReservations } from '../context/ReservationContext.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

const TIME_SLOTS = [
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
]

export default function ReservationPage() {
  const navigate = useNavigate()
  const reservations = useReservations()

  const today = useMemo(() => new Date().toISOString().slice(0, 10), [])

  const [guests, setGuests] = useState(2)
  const [date, setDate] = useState(today)
  const [time, setTime] = useState(TIME_SLOTS[4])
  const [notes, setNotes] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')
  const [errors, setErrors] = useState({})

  function validate() {
    const next = {}
    const guestNum = Number(guests)
    if (!guestNum || guestNum < 1) next.guests = 'Please choose a guest count.'
    if (!date) next.date = 'Please choose a date.'
    if (!time) next.time = 'Please choose a time slot.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function onSubmit(e) {
    e.preventDefault()
    setSuccess('')
    if (!validate()) return
    setSubmitting(true)
    try {
      // Simulated network delay; replace with services/api later.
      await new Promise((r) => setTimeout(r, 600))
      const res = reservations.addReservation({
        guests: Number(guests),
        date,
        time,
        notes: notes.trim(),
      })
      setSuccess(`Reservation received. Reference: ${res.id}.`)
      setNotes('')
    } catch (err) {
      setErrors({ form: 'Something went wrong. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pb-section-gap">
      <header className="pt-10 pb-8">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-3">
          Reserve Your Experience
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
          Select your party size, preferred date, and dinner service time. Your
          reservation is stored locally in frontend state and appears in your
          dashboard.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        <section className="lg:col-span-7">
          <form
            onSubmit={onSubmit}
            className="bg-surface-container/30 backdrop-blur-md rounded-xl border border-secondary/20 p-6 shadow-[0_4px_30px_rgba(184,115,51,0.05)]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                  Guest count
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="mt-2 w-full bg-surface-container/50 border-b border-secondary/30 focus:border-primary text-on-surface py-3 px-3 outline-none transition-colors rounded-t-md font-body-md backdrop-blur-sm"
                >
                  {Array.from({ length: 10 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} guest{i === 0 ? '' : 's'}
                    </option>
                  ))}
                </select>
                {errors.guests ? (
                  <div className="mt-2 font-body-md text-body-md text-error">
                    {errors.guests}
                  </div>
                ) : null}
              </div>

              <div>
                <label className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                  Date
                </label>
                <input
                  type="date"
                  min={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-2 w-full bg-surface-container/50 border-b border-secondary/30 focus:border-primary text-on-surface py-3 px-3 outline-none transition-colors rounded-t-md font-body-md backdrop-blur-sm"
                />
                {errors.date ? (
                  <div className="mt-2 font-body-md text-body-md text-error">
                    {errors.date}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-6">
              <label className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                Time slot
              </label>
              <div className="mt-3 flex flex-wrap gap-2">
                {TIME_SLOTS.map((slot) => {
                  const active = slot === time
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      className={`font-label-sm text-label-sm uppercase tracking-widest px-4 py-2 rounded-full border transition-colors ${
                        active
                          ? 'bg-primary text-on-primary border-primary'
                          : 'border-secondary/30 text-on-surface-variant hover:text-primary hover:border-secondary'
                      }`}
                    >
                      {slot}
                    </button>
                  )
                })}
              </div>
              {errors.time ? (
                <div className="mt-2 font-body-md text-body-md text-error">
                  {errors.time}
                </div>
              ) : null}
            </div>

            <div className="mt-6">
              <label className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                Special requests (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Allergies, celebrations, seating preferences…"
                className="mt-2 w-full bg-surface-container/50 border-b border-secondary/30 focus:border-primary text-on-surface py-3 px-3 outline-none transition-colors rounded-t-md font-body-md placeholder-on-surface-variant/50 backdrop-blur-sm resize-none"
              />
            </div>

            {errors.form ? (
              <div className="mt-4 font-body-md text-body-md text-error">
                {errors.form}
              </div>
            ) : null}

            {success ? (
              <div className="mt-4 bg-secondary/10 border border-secondary/20 rounded-lg p-4 font-body-md text-body-md text-on-surface">
                {success}
              </div>
            ) : null}

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="bg-primary text-on-primary font-label-sm text-label-sm px-6 py-3 rounded hover:bg-primary-container transition-colors uppercase tracking-widest disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting…' : 'Confirm Reservation'}
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
                <LoadingSpinner label="Confirming your reservation…" />
              </div>
            ) : null}
          </form>
        </section>

        <aside className="lg:col-span-5 lg:sticky lg:top-[140px]">
          <div className="bg-surface-container/30 backdrop-blur-md rounded-xl border border-secondary/20 p-6 shadow-[0_4px_30px_rgba(184,115,51,0.05)]">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
              Reservation Preview
            </h2>
            <div className="flex flex-col gap-3 font-body-md text-body-md text-on-surface-variant">
              <div className="flex justify-between">
                <span>Guests</span>
                <span className="text-on-surface">{guests}</span>
              </div>
              <div className="flex justify-between">
                <span>Date</span>
                <span className="text-on-surface">{date}</span>
              </div>
              <div className="flex justify-between">
                <span>Time</span>
                <span className="text-on-surface">{time}</span>
              </div>
              <div className="mt-4 pt-4 border-t border-secondary/10">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                  Notes
                </span>
                <div className="mt-2 text-on-surface-variant">
                  {notes.trim() ? notes.trim() : 'None'}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

