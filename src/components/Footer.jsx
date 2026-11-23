import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import { whatsappLink } from '../lib/whatsapp';

const Footer = () => {
  const { settings } = useStore();
  const [year] = React.useState(() => new Date().getFullYear());

  return (
    <footer className="bg-luxe-charcoal text-luxe-ivory">
      <div className="page-shell py-16 sm:py-20">
        <div className="grid gap-12 border-b border-luxe-ivory/15 pb-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12">
          <div className="max-w-sm">
            <Link to="/" className="wordmark wordmark-light">
              {settings.storeName}
              <span>ATELIER STREETWEAR MAROC</span>
            </Link>
            <p className="mt-6 text-sm leading-7 text-luxe-ivory/60">
              Des basiques heavyweight pensés à Casablanca, faits pour durer — et pour être portés tous les jours.
            </p>
          </div>

          <div>
            <h2 className="eyebrow text-luxe-beige">Boutique</h2>
            <ul className="mt-5 space-y-3 text-sm text-luxe-ivory/70">
              <li><Link to="/#shop" className="footer-link">Toute la collection</Link></li>
              <li><Link to="/journal" className="footer-link">Journal</Link></li>
              <li><Link to="/panier" className="footer-link">Panier</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-luxe-beige">Aide</h2>
            <ul className="mt-5 space-y-3 text-sm text-luxe-ivory/70">
              <li><Link to="/infos#livraison" className="footer-link">Livraison</Link></li>
              <li><Link to="/infos#retours" className="footer-link">Échanges & retours</Link></li>
              <li><Link to="/infos#tailles" className="footer-link">Guide des tailles</Link></li>
              <li><Link to="/commandes" className="footer-link">Mes commandes</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-luxe-beige">Contact</h2>
            <ul className="mt-5 space-y-3 text-sm text-luxe-ivory/70">
              <li><a href={whatsappLink(settings.whatsappNumber)} target="_blank" rel="noreferrer" className="footer-link">WhatsApp</a></li>
              <li><a href={`https://instagram.com/${settings.instagram}`} target="_blank" rel="noreferrer" className="footer-link">Instagram @{settings.instagram}</a></li>
              <li><a href={`mailto:${settings.email}`} className="footer-link">{settings.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-[10px] uppercase tracking-[0.15em] text-luxe-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} {settings.storeName} — Tous droits réservés</span>
          <span>Paiement à la livraison · Maroc</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
