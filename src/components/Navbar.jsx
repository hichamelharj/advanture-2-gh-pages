import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useStore } from '../lib/store';
import { formatPrice } from '../lib/format';

const links = [
  { to: '/', label: 'Boutique', end: true },
  { to: '/journal', label: 'Journal' },
  { to: '/infos', label: 'Livraison & retours' },
  { to: '/commandes', label: 'Mes commandes' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { cart, settings } = useStore();
  const { pathname } = useLocation();
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  const [previousPathname, setPreviousPathname] = React.useState(pathname);
  if (previousPathname !== pathname) {
    setPreviousPathname(pathname);
    setIsOpen(false);
  }

  return (
    <>
      <div className="announcement-bar">
        <span>Livraison gratuite dès {formatPrice(settings.freeShippingThreshold)}</span>
        <span aria-hidden="true" className="hidden sm:inline">·</span>
        <span className="hidden sm:inline">Paiement à la livraison partout au Maroc</span>
        <span aria-hidden="true" className="hidden md:inline">·</span>
        <span className="hidden md:inline">Vérifiez avant de payer</span>
      </div>
      <header className="sticky top-0 z-50 border-b border-luxe-beige/70 bg-luxe-ivory/95 backdrop-blur">
        <nav className="page-shell flex h-[72px] items-center justify-between gap-4 sm:h-[84px]" aria-label="Navigation principale">
          <button
            type="button"
            onClick={() => setIsOpen(open => !open)}
            className="icon-button lg:hidden"
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X size={22} strokeWidth={1.4} /> : <Menu size={22} strokeWidth={1.4} />}
          </button>

          <Link to="/" className="wordmark lg:items-start" aria-label={`${settings.storeName} — accueil`}>
            {settings.storeName}
            <span>ATELIER STREETWEAR MAROC</span>
          </Link>

          <div className="hidden items-center gap-9 lg:flex">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <Link
            to="/panier"
            className="flex items-center gap-2 text-luxe-charcoal transition-colors hover:text-luxe-copper"
            aria-label={`Panier, ${cartCount} article${cartCount > 1 ? 's' : ''}`}
          >
            <span className="hidden text-[11px] uppercase tracking-[0.16em] sm:inline">Panier</span>
            <span className="relative inline-flex">
              <ShoppingBag size={21} strokeWidth={1.35} />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </span>
          </Link>
        </nav>

        {isOpen && (
          <div id="mobile-navigation" className="mobile-menu lg:hidden">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `mobile-menu-link${isActive ? ' text-luxe-copper' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/panier" className="mobile-menu-link flex items-center gap-3">
              <ShoppingBag size={17} strokeWidth={1.4} /> Panier ({cartCount})
            </Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
