import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { useStore } from '../lib/store';

const CartToast = () => {
  const { cartNotice, dismissCartNotice } = useStore();

  React.useEffect(() => {
    if (!cartNotice) return undefined;
    const timer = window.setTimeout(dismissCartNotice, 4000);
    return () => window.clearTimeout(timer);
  }, [cartNotice, dismissCartNotice]);

  if (!cartNotice) return null;

  return (
    <div role="status" className="cart-toast">
      <span className="grid h-8 w-8 shrink-0 place-items-center bg-luxe-green text-luxe-ivory"><Check size={16} /></span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm">{cartNotice.name}</p>
        <p className="text-[11px] text-luxe-charcoal/60">Taille {cartNotice.size} · ajouté au panier</p>
      </div>
      <Link to="/panier" onClick={dismissCartNotice} className="text-link shrink-0">Voir le panier</Link>
      <button type="button" onClick={dismissCartNotice} aria-label="Fermer" className="text-luxe-charcoal/50 hover:text-luxe-charcoal"><X size={16} /></button>
    </div>
  );
};

export default CartToast;
