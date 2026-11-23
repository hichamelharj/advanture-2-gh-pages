import { Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import { formatPrice } from '../lib/format';
import { buildOrderMessage, whatsappLink } from '../lib/whatsapp';

const dateFormat = new Intl.DateTimeFormat('fr-MA', { dateStyle: 'medium' });

const AccountPage = () => {
  const { orders, settings } = useStore();

  return (
    <main className="page-shell min-h-[65vh] py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <span className="eyebrow text-luxe-copper">Sans compte, sans mot de passe</span>
        <h1 className="editorial-heading mt-4">Mes commandes.</h1>
        <p className="mt-5 max-w-xl text-sm leading-7 text-luxe-charcoal/65">
          Les commandes passées depuis ce téléphone ou cet ordinateur apparaissent ici.
          Pour suivre une livraison, écrivez-nous sur WhatsApp avec votre numéro de commande.
        </p>

        <div className="mt-12 border-y border-luxe-beige/80">
          {orders.length === 0 ? (
            <div className="py-10">
              <p className="font-serif text-xl">Aucune commande pour l’instant.</p>
              <Link to="/#shop" className="text-link mt-5 inline-flex">Voir la collection <span aria-hidden="true">↗</span></Link>
            </div>
          ) : (
            <ul>
              {orders.map(order => (
                <li key={order.id} className="flex flex-col gap-3 border-b border-luxe-beige/60 py-6 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-serif text-lg">{order.id}</p>
                    <p className="mt-1 text-xs text-luxe-charcoal/55">
                      {order.createdAt ? dateFormat.format(new Date(order.createdAt)) : order.date} · {order.items.reduce((count, item) => count + item.qty, 0)} article(s)
                    </p>
                    <p className="mt-1 text-xs text-luxe-charcoal/55">{order.items.map(item => `${item.name} (${item.size})`).join(', ')}</p>
                  </div>
                  <div className="flex items-center justify-between gap-5 sm:justify-end">
                    <span className="status-pill">{order.status}</span>
                    <span className="font-serif text-lg">{formatPrice(order.total)}</span>
                    {order.customer && (
                      <a className="text-link" target="_blank" rel="noreferrer" href={whatsappLink(settings.whatsappNumber, buildOrderMessage(order))}>WhatsApp</a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
};

export default AccountPage;
