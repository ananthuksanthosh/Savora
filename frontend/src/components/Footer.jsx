import { NavLink } from 'react-router-dom'
import { restaurant } from '../data/restaurant.js'

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest w-full py-section-gap border-t border-secondary/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto">
        <div className="col-span-1 flex flex-col items-start gap-4">
          <div className="font-headline-lg text-headline-lg text-primary italic">
            {restaurant.name}
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mt-4">
            {restaurant.description}
          </p>
        </div>

        <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-12 justify-center">
          <div className="flex flex-col gap-4">
            <span className="font-label-sm text-label-sm uppercase tracking-tighter text-on-surface mb-2">
              Explore
            </span>
            <NavLink
              className="font-label-sm text-label-sm uppercase tracking-tighter text-on-tertiary-container hover:text-primary transition-colors hover:opacity-80"
              to="/menu"
            >
              Menu
            </NavLink>
            <NavLink
              className="font-label-sm text-label-sm uppercase tracking-tighter text-on-tertiary-container hover:text-primary transition-colors hover:opacity-80"
              to="/reserve"
            >
              Reservations
            </NavLink>
            <NavLink
              className="font-label-sm text-label-sm uppercase tracking-tighter text-on-tertiary-container hover:text-primary transition-colors hover:opacity-80"
              to="/order"
            >
              Order Online
            </NavLink>
            <NavLink
              className="font-label-sm text-label-sm uppercase tracking-tighter text-on-tertiary-container hover:text-primary transition-colors hover:opacity-80"
              to="/reviews"
            >
              Reviews
            </NavLink>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-label-sm text-label-sm uppercase tracking-tighter text-on-surface mb-2">
              Account
            </span>
            <NavLink
              className="font-label-sm text-label-sm uppercase tracking-tighter text-on-tertiary-container hover:text-primary transition-colors hover:opacity-80"
              to="/dashboard"
            >
              Dashboard
            </NavLink>
            <NavLink
              className="font-label-sm text-label-sm uppercase tracking-tighter text-on-tertiary-container hover:text-primary transition-colors hover:opacity-80"
              to="/admin"
            >
              Admin
            </NavLink>
          </div>
        </div>

        <div className="col-span-1 flex flex-col justify-end md:items-end mt-8 md:mt-0">
          <span className="font-label-sm text-label-sm uppercase tracking-tighter text-tertiary-fixed-dim">
            © {new Date().getFullYear()} {restaurant.name} Excellence. All rights
            reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}

