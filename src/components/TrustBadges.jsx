import { Truck, Banknote, PackageCheck, RefreshCw } from 'lucide-react';

const badges = [
  { icon: Truck, title: 'Livraison 24–72h', text: 'Partout au Maroc' },
  { icon: Banknote, title: 'Paiement à la livraison', text: 'Cash, sans carte' },
  { icon: PackageCheck, title: 'Vérifiez avant de payer', text: 'Ouvrez le colis devant le livreur' },
  { icon: RefreshCw, title: 'Échange sous 7 jours', text: 'Taille pas bonne ? On échange' },
];

const TrustBadges = ({ compact = false }) => (
  <div className={compact ? 'grid gap-4 sm:grid-cols-2' : 'border-y border-luxe-beige/60 bg-luxe-beige/20'}>
    <div className={compact ? 'contents' : 'page-shell grid grid-cols-2 gap-x-6 gap-y-6 py-7 lg:grid-cols-4'}>
      {badges.map(({ icon: Icon, title, text }) => (
        <div key={title} className="flex items-start gap-3">
          <span className="mt-0.5 text-luxe-copper"><Icon size={20} strokeWidth={1.5} /></span>
          <span>
            <span className="block text-[13px] font-medium">{title}</span>
            <span className="block text-xs text-luxe-charcoal/60">{text}</span>
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default TrustBadges;
