import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'

const linkBase =
  'font-label-sm text-label-sm text-on-surface/80 hover:text-primary transition-colors uppercase tracking-widest'

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? 'font-label-sm text-label-sm uppercase text-primary border-b border-primary pb-1'
          : linkBase
      }
    >
      {children}
    </NavLink>
  )
}

export default function Navbar() {
  const navigate = useNavigate()
  const cart = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="bg-surface/10 dark:bg-surface/10 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-secondary/20 shadow-[0_4px_30px_rgba(184,115,51,0.15)]">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-6 max-w-container-max-width mx-auto">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="font-headline-md text-headline-md tracking-widest text-primary uppercase"
          aria-label="Go to home"
        >
          Savora
        </button>

        <nav className="hidden md:flex gap-gutter items-center">
          <NavItem to="/menu">Menu</NavItem>
          <NavItem to="/reserve">Reservations</NavItem>
          <NavItem to="/order">Online Ordering</NavItem>
          <NavItem to="/reviews">Reviews</NavItem>
        </nav>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/order')}
              className="text-on-surface/80 hover:text-primary transition-colors hover:bg-white/5 transition-all duration-300 p-2 rounded-full scale-95 duration-200 ease-in-out relative"
              aria-label="Open ordering"
            >
              <span className="material-symbols-outlined">shopping_bag</span>
              {cart.items.length ? (
                <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-primary text-on-primary text-[11px] flex items-center justify-center">
                  {cart.items.reduce((s, it) => s + it.qty, 0)}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="text-on-surface/80 hover:text-primary transition-colors hover:bg-white/5 transition-all duration-300 p-2 rounded-full scale-95 duration-200 ease-in-out"
              aria-label="Open dashboard"
            >
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => navigate('/reserve')}
            className="bg-primary text-on-primary font-label-sm text-label-sm px-6 py-3 rounded hover:bg-primary-container transition-colors uppercase tracking-widest hidden md:block"
          >
            Book a Table
          </button>

          <button
            type="button"
            className="md:hidden text-primary"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="material-symbols-outlined">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="md:hidden px-margin-mobile pb-6">
          <div className="bg-surface-container/30 backdrop-blur-md rounded-xl border border-secondary/20 p-4 shadow-[0_4px_30px_rgba(184,115,51,0.05)]">
            <div className="flex flex-col gap-4">
              <NavLink
                to="/menu"
                onClick={() => setMobileOpen(false)}
                className={linkBase}
              >
                Menu
              </NavLink>
              <NavLink
                to="/reserve"
                onClick={() => setMobileOpen(false)}
                className={linkBase}
              >
                Reservations
              </NavLink>
              <NavLink
                to="/order"
                onClick={() => setMobileOpen(false)}
                className={linkBase}
              >
                Online Ordering
              </NavLink>
              <NavLink
                to="/reviews"
                onClick={() => setMobileOpen(false)}
                className={linkBase}
              >
                Reviews
              </NavLink>
              <NavLink
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className={linkBase}
              >
                Dashboard
              </NavLink>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false)
                  navigate('/reserve')
                }}
                className="bg-primary text-on-primary font-label-sm text-label-sm px-6 py-3 rounded hover:bg-primary-container transition-colors uppercase tracking-widest text-left"
              >
                Book a Table
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

