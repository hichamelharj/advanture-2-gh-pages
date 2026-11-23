import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus } from 'lucide-react';
import { useStore } from '../lib/store';
import { CITIES } from '../config';
import { formatPrice, normalizeMoroccanPhone, productImage, shippingFor } from '../lib/format';
import { buildOrderMessage, whatsappLink } from '../lib/whatsapp';
import ProductImage from '../components/ProductImage';
import TrustBadges from '../components/TrustBadges';
import { WhatsAppIcon } from '../components/WhatsAppButton';

const EMPTY_FORM = { name: '', phone: '', city: '', address: '', note: '' };
const CUSTOMER_KEY = 'luxe_last_customer';

const readLastCustomer = () => {
  try {
    const saved = JSON.parse(window.localStorage.getItem(CUSTOMER_KEY) || 'null');
    return saved && typeof saved === 'object' ? { ...EMPTY_FORM, ...saved, note: '' } : EMPTY_FORM;
  } catch {
    return EMPTY_FORM;
  }
};

const validate = form => {
  const errors = {};
  if (form.name.trim().length < 3) errors.name = 'Entrez votre nom complet.';
  if (!normalizeMoroccanPhone(form.phone)) errors.phone = 'Numéro marocain invalide (ex : 06 12 34 56 78).';
  if (!form.city) errors.city = 'Choisissez votre ville.';
  if (form.address.trim().length < 6) errors.address = 'Entrez une adresse de livraison (quartier, rue, n°).';
  return errors;
};

const Field = ({ id, label, error, children }) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-luxe-charcoal/70">{label}</label>
    {children}
    {error && <p id={`${id}-error`} className="mt-1.5 text-xs text-luxe-copper">{error}</p>}
  </div>
);

const CartPage = () => {
  const { cart, removeFromCart, updateCartQty, placeOrder, settings } = useStore();
  const [form, setForm] = React.useState(readLastCustomer);
  const [errors, setErrors] = React.useState({});
  const [placed, setPlaced] = React.useState(null);

  const subtotal = cart.reduce((total, item) => total + item.price * item.qty, 0);
  const shipping = shippingFor(subtotal, settings);
  const total = subtotal + shipping;
  const missingForFree = settings.freeShippingThreshold - subtotal;
  const progress = Math.min(100, (subtotal / settings.freeShippingThreshold) * 100);
  const itemCount = cart.reduce((count, item) => count + item.qty, 0);

  const update = field => event => {
    setForm(previous => ({ ...previous, [field]: event.target.value }));
    if (errors[field]) setErrors(previous => ({ ...previous, [field]: undefined }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      document.getElementById(`checkout-${Object.keys(nextErrors)[0]}`)?.focus();
      return;
    }
    const customer = {
      name: form.name.trim(),
      phone: `+${normalizeMoroccanPhone(form.phone)}`,
      city: form.city,
      address: form.address.trim(),
      note: form.note.trim(),
    };
    try {
      const { note: _note, ...remembered } = customer;
      window.localStorage.setItem(CUSTOMER_KEY, JSON.stringify({ ...remembered, phone: form.phone }));
    } catch { /* not critical */ }
    const order = placeOrder(customer);
    setPlaced(order);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (placed) {
    const confirmLink = whatsappLink(settings.whatsappNumber, buildOrderMessage(placed));
    return (
      <main className="page-shell min-h-[65vh] py-16 sm:py-24">
        <div className="mx-auto max-w-2xl border-y border-luxe-beige py-12 text-center sm:py-16">
          <span className="eyebrow text-luxe-copper">Commande {placed.id}</span>
          <h1 className="mt-5 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">Merci {placed.customer.name.split(' ')[0]} !</h1>
          <p role="status" className="mx-auto mt-5 max-w-lg text-[15px] leading-7 text-luxe-charcoal/70">
            Votre commande de <strong>{formatPrice(placed.total)}</strong> est enregistrée.
            Dernière étape : envoyez-la-nous sur WhatsApp pour qu’on la confirme et la prépare.
          </p>
          <a href={confirmLink} target="_blank" rel="noreferrer" className="button-whatsapp mx-auto mt-8 w-full max-w-sm">
            <WhatsAppIcon size={20} /> Confirmer sur WhatsApp
          </a>
          <p className="mt-4 text-xs text-luxe-charcoal/55">Vous paierez {formatPrice(placed.total)} en espèces à la réception, après vérification du colis.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/commandes" className="button-outline">Mes commandes</Link>
            <Link to="/" className="button-outline">Continuer mes achats</Link>
          </div>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="page-shell flex min-h-[65vh] flex-col items-center justify-center py-20 text-center">
        <span className="eyebrow text-luxe-copper">Votre panier</span>
        <h1 className="mt-5 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">Votre panier est vide.</h1>
        <p className="mt-4 max-w-md text-sm leading-7 text-luxe-charcoal/60">Le drop 01 est disponible en quantités limitées.</p>
        <Link to="/#shop" className="button-dark mt-8">Voir la collection <span aria-hidden="true">↗</span></Link>
      </main>
    );
  }

  return (
    <main className="page-shell py-10 sm:py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-luxe-beige pb-6">
        <div>
          <span className="eyebrow text-luxe-copper">Votre panier</span>
          <h1 className="mt-3 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">Panier & commande.</h1>
        </div>
        <span className="text-xs uppercase tracking-[0.14em] text-luxe-charcoal/55">{itemCount} article{itemCount > 1 ? 's' : ''}</span>
      </div>

      <div className="grid items-start gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-10">
          <div className="border border-luxe-beige bg-white/40 p-4">
            <p className="text-sm">
              {missingForFree > 0
                ? <>Plus que <strong>{formatPrice(missingForFree)}</strong> pour la livraison gratuite.</>
                : <>🎉 Livraison <strong>gratuite</strong> débloquée.</>}
            </p>
            <div className="mt-3 h-1.5 bg-luxe-beige/60" aria-hidden="true">
              <div className="h-full bg-luxe-green transition-[width] duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <ul className="divide-y divide-luxe-beige/80 border-y border-luxe-beige/80">
            {cart.map(item => (
              <li key={item.key} className="grid grid-cols-[88px_1fr] gap-4 py-5 sm:grid-cols-[110px_1fr] sm:gap-6">
                <Link to={`/produit/${item.id}`} className="aspect-[4/5] overflow-hidden bg-luxe-beige/30">
                  <ProductImage src={productImage(item.image)} alt={item.name} category={item.category} />
                </Link>
                <div className="flex min-w-0 flex-col justify-between gap-4 py-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="font-serif text-lg leading-snug"><Link to={`/produit/${item.id}`} className="hover:text-luxe-copper">{item.name}</Link></h2>
                      <p className="mt-1 text-xs text-luxe-charcoal/60">Taille {item.size} · {formatPrice(item.price)}</p>
                    </div>
                    <span className="shrink-0 text-sm">{formatPrice(item.price * item.qty)}</span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center border border-luxe-beige">
                      <button type="button" onClick={() => updateCartQty(item.key, item.qty - 1)} className="quantity-button" aria-label={`Diminuer la quantité de ${item.name}`}><Minus size={14} /></button>
                      <span className="min-w-9 text-center text-sm">{item.qty}</span>
                      <button type="button" onClick={() => updateCartQty(item.key, item.qty + 1)} className="quantity-button" aria-label={`Augmenter la quantité de ${item.name}`}><Plus size={14} /></button>
                    </div>
                    <button type="button" onClick={() => removeFromCart(item.key)} className="text-[11px] uppercase tracking-[0.14em] text-luxe-charcoal/55 underline decoration-luxe-beige underline-offset-4 hover:text-luxe-copper">
                      Retirer
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="hidden lg:block"><TrustBadges compact /></div>
        </div>

        <aside id="checkout" className="scroll-mt-28 border border-luxe-beige bg-white/45 p-5 sm:p-7 lg:sticky lg:top-28">
          <h2 className="font-serif text-2xl">Livraison & paiement</h2>
          <p className="mt-1 text-xs text-luxe-charcoal/60">Paiement en espèces à la livraison. Aucune carte nécessaire.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <Field id="checkout-name" label="Nom complet" error={errors.name}>
              <input id="checkout-name" className="form-field" autoComplete="name" value={form.name} onChange={update('name')} aria-invalid={Boolean(errors.name)} />
            </Field>
            <Field id="checkout-phone" label="Téléphone (WhatsApp)" error={errors.phone}>
              <input id="checkout-phone" className="form-field" type="tel" inputMode="tel" autoComplete="tel" placeholder="06 12 34 56 78" value={form.phone} onChange={update('phone')} aria-invalid={Boolean(errors.phone)} />
            </Field>
            <Field id="checkout-city" label="Ville" error={errors.city}>
              <select id="checkout-city" className="form-field" value={form.city} onChange={update('city')} aria-invalid={Boolean(errors.city)}>
                <option value="">Choisir…</option>
                {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </Field>
            <Field id="checkout-address" label="Adresse" error={errors.address}>
              <textarea id="checkout-address" rows={2} className="form-field resize-none" autoComplete="street-address" placeholder="Quartier, rue, numéro, repère" value={form.address} onChange={update('address')} aria-invalid={Boolean(errors.address)} />
            </Field>
            <Field id="checkout-note" label="Note (facultatif)">
              <input id="checkout-note" className="form-field" placeholder="Ex : appeler avant de passer" value={form.note} onChange={update('note')} />
            </Field>

            <div className="space-y-3 border-y border-luxe-beige/80 py-5 text-sm">
              <div className="flex justify-between"><span className="text-luxe-charcoal/65">Sous-total</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-luxe-charcoal/65">Livraison</span><span>{shipping === 0 ? 'Gratuite' : formatPrice(shipping)}</span></div>
              <div className="flex justify-between pt-1 font-serif text-xl"><span>Total à payer</span><span>{formatPrice(total)}</span></div>
            </div>

            <button type="submit" className="button-dark w-full">
              Valider la commande · {formatPrice(total)}
            </button>
            <p className="text-center text-[11px] leading-5 text-luxe-charcoal/55">
              Après validation, vous pourrez nous envoyer la commande sur WhatsApp en un clic pour la confirmer.
            </p>
          </form>
        </aside>
      </div>
      <div className="mt-10 lg:hidden"><TrustBadges compact /></div>
    </main>
  );
};

export default CartPage;
