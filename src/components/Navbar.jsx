import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import StoreContext from './StoreContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { cart } = React.useContext(StoreContext);
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const links = [
    { to: '/', label: 'Shop' },
    { to: '/journal', label: 'Journal' },
    { to: '/account', label: 'Account' },
  ];

  return (
    <>
      <div className="bg-luxe-green px-4 py-2 text-center text-[8px] uppercase tracking-[0.18em] text-luxe-ivory/80 sm:text-[9px]">
        Complimentary delivery on orders over $100
      </div>
      <header className="sticky top-0 z-50 border-b border-luxe-beige/70 bg-luxe-ivory/95 backdrop-blur">
        <nav className="page-shell flex h-[76px] items-center justify-between gap-4 sm:h-[88px]" aria-label="Main navigation">
          <button
            type="button"
            onClick={() => setIsOpen(open => !open)}
            className="icon-button order-1 md:hidden"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X size={21} strokeWidth={1.4} /> : <Menu size={21} strokeWidth={1.4} />}
          </button>

          <div className="order-2 flex flex-1 justify-center md:order-1 md:flex-none md:justify-start">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="wordmark"
              aria-label="LUXEBRAND home"
            >
              LUXEBRAND
              <span>OBJECTS FOR THE EVERYDAY</span>
            </Link>
          </div>

          <div className="order-3 hidden items-center gap-8 md:flex lg:gap-11">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <Link
            to="/cart"
            className="order-3 flex items-center gap-2 text-luxe-charcoal transition-colors hover:text-luxe-copper md:order-4"
            aria-label={`Shopping bag, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
            onClick={() => setIsOpen(false)}
          >
            <span className="hidden text-[10px] uppercase tracking-[0.18em] sm:inline">Bag</span>
            <span className="relative inline-flex">
              <ShoppingCart size={20} strokeWidth={1.35} />
              <span className="cart-count">{cartCount}</span>
            </span>
          </Link>
        </nav>

        {isOpen && (
          <div id="mobile-navigation" className="mobile-menu md:hidden">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `mobile-menu-link${isActive ? ' text-luxe-copper' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/cart" onClick={() => setIsOpen(false)} className="mobile-menu-link flex items-center gap-3">
              <ShoppingCart size={17} strokeWidth={1.4} /> Shopping bag ({cartCount})
            </Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;