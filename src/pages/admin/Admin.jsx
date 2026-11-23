import React from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut, ExternalLink } from 'lucide-react';
import { useStore } from '../../lib/store';
import { CITIES, DEFAULT_SETTINGS, ORDER_STATUSES } from '../../config';
import { INITIAL_PRODUCTS } from '../../data/products';
import { formatPrice, productImage } from '../../lib/format';
import { whatsappLink } from '../../lib/whatsapp';
import ProductForm from '../../components/admin/ProductForm';
import { readSubscribers } from '../../lib/subscribers';

const SESSION_KEY = 'luxe_admin_ok';
const dateTime = new Intl.DateTimeFormat('fr-MA', { dateStyle: 'short', timeStyle: 'short' });

const DemoNotice = () => (
  <p className="admin-notice">
    Mode démo : produits, commandes et réglages sont enregistrés <strong>dans ce navigateur uniquement</strong>.
    Les commandes de vos clients vous arrivent par WhatsApp ; cette liste ne montre que celles passées sur cet appareil.
  </p>
);

const Gate = ({ onUnlock }) => {
  const { settings } = useStore();
  const [pin, setPin] = React.useState('');
  const [error, setError] = React.useState(false);
  const submit = event => {
    event.preventDefault();
    if (pin === String(settings.adminPin)) onUnlock();
    else setError(true);
  };
  return (
    <main className="grid min-h-screen place-items-center bg-luxe-green p-6">
      <form onSubmit={submit} className="w-full max-w-sm bg-luxe-ivory p-8">
        <p className="wordmark items-start">{settings.storeName}<span>ESPACE ADMIN</span></p>
        <label htmlFor="admin-pin" className="mt-8 block text-[11px] uppercase tracking-[0.14em]">Code d’accès</label>
        <input id="admin-pin" type="password" inputMode="numeric" autoFocus className="form-field mt-2" value={pin} onChange={event => { setPin(event.target.value); setError(false); }} />
        {error && <p role="alert" className="mt-2 text-xs text-luxe-copper">Code incorrect.</p>}
        <button type="submit" className="button-dark mt-5 w-full">Entrer</button>
        <p className="mt-4 text-[11px] leading-5 text-luxe-charcoal/55">Code démo par défaut : 1234 (à changer dans Paramètres). Ce code protège l’écran, pas les données.</p>
        <Link to="/" className="text-link mt-6">← Retour à la boutique</Link>
      </form>
    </main>
  );
};

const Stat = ({ label, value, hint }) => (
  <div className="admin-card">
    <p className="text-[11px] uppercase tracking-[0.14em] text-luxe-charcoal/55">{label}</p>
    <p className="mt-2 font-serif text-3xl">{value}</p>
    {hint && <p className="mt-1 text-xs text-luxe-charcoal/55">{hint}</p>}
  </div>
);

const Dashboard = () => {
  const { products, orders } = useStore();
  const active = orders.filter(order => order.status !== 'Annulée');
  const revenue = active.reduce((sum, order) => sum + order.total, 0);
  const lowStock = products.filter(product => product.stock <= 5).sort((a, b) => a.stock - b.stock);
  const stockValue = products.reduce((sum, product) => sum + product.price * product.stock, 0);
  const sold = {};
  active.forEach(order => order.items.forEach(item => { sold[item.name] = (sold[item.name] || 0) + item.qty; }));
  const best = Object.entries(sold).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <>
      <h1 className="admin-title">Tableau de bord</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Chiffre d’affaires" value={formatPrice(revenue)} hint={`${active.length} commande(s) hors annulées`} />
        <Stat label="À traiter" value={orders.filter(order => order.status === 'Nouvelle').length} hint="Commandes « Nouvelle »" />
        <Stat label="Panier moyen" value={formatPrice(active.length ? revenue / active.length : 0)} />
        <Stat label="Valeur du stock" value={formatPrice(stockValue)} hint={`${products.reduce((sum, product) => sum + product.stock, 0)} pièces`} />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="admin-card">
          <h2 className="font-serif text-xl">Stock faible</h2>
          {lowStock.length === 0 ? <p className="mt-3 text-sm text-luxe-charcoal/60">Rien à signaler.</p> : (
            <ul className="mt-3 divide-y divide-luxe-beige/70 text-sm">
              {lowStock.map(product => (
                <li key={product.id} className="flex justify-between gap-3 py-2">
                  <span className="truncate">{product.name}</span>
                  <span className={product.stock === 0 ? 'text-luxe-copper' : ''}>{product.stock === 0 ? 'Épuisé' : `${product.stock} restant(s)`}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="admin-card">
          <h2 className="font-serif text-xl">Meilleures ventes</h2>
          {best.length === 0 ? <p className="mt-3 text-sm text-luxe-charcoal/60">Pas encore de ventes.</p> : (
            <ul className="mt-3 divide-y divide-luxe-beige/70 text-sm">
              {best.map(([name, qty]) => <li key={name} className="flex justify-between gap-3 py-2"><span className="truncate">{name}</span><span>{qty} vendu(s)</span></li>)}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

const Products = () => {
  const { products, setProducts } = useStore();
  const [editing, setEditing] = React.useState(null); // null | 'new' | product
  const [query, setQuery] = React.useState('');
  const existingCategories = [...new Set(products.map(product => product.category))];
  const shown = products.filter(product => `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase()));

  const save = product => {
    try {
      if (editing === 'new') {
        const nextId = Math.max(0, ...products.map(item => Number(item.id) || 0)) + 1;
        setProducts(previous => [...previous, { ...product, id: nextId, createdAt: new Date().toISOString() }]);
      } else {
        setProducts(previous => previous.map(item => item.id === product.id ? product : item));
      }
      setEditing(null);
    } catch (error) {
      window.alert?.(`Enregistrement impossible : ${error.message}`);
    }
  };

  const setStock = (id, stock) => setProducts(previous => previous.map(item => item.id === id ? { ...item, stock: Math.max(0, stock) } : item));
  const remove = product => {
    if (window.confirm(`Supprimer « ${product.name} » ?`)) setProducts(previous => previous.filter(item => item.id !== product.id));
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="admin-title !mb-0">Produits & stock</h1>
        {!editing && <button type="button" className="button-dark" onClick={() => setEditing('new')}>+ Nouveau produit</button>}
      </div>
      {editing && (
        <div className="mb-8">
          <ProductForm key={editing === 'new' ? 'new' : editing.id} initial={editing === 'new' ? null : editing} existingCategories={existingCategories} onSave={save} onCancel={() => setEditing(null)} />
        </div>
      )}
      <input className="form-field mb-4 max-w-sm" placeholder="Rechercher un produit" value={query} onChange={event => setQuery(event.target.value)} />
      <div className="admin-card overflow-x-auto !p-0">
        <table className="admin-table">
          <thead><tr><th>Produit</th><th>Catégorie</th><th>Prix</th><th>Stock</th><th /></tr></thead>
          <tbody>
            {shown.map(product => (
              <tr key={product.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <img src={productImage(product.image)} alt="" className="h-14 w-11 shrink-0 object-cover" />
                    <div className="min-w-0">
                      <p className="truncate font-medium">{product.name}</p>
                      <p className="text-xs text-luxe-charcoal/55">{product.sizes.join(' · ')}{product.featured ? ' · ★ en avant' : ''}</p>
                    </div>
                  </div>
                </td>
                <td className="text-xs">{product.category}</td>
                <td className="whitespace-nowrap">{formatPrice(product.price)}</td>
                <td>
                  <div className="flex items-center gap-1">
                    <button type="button" className="stock-btn" onClick={() => setStock(product.id, product.stock - 1)} aria-label="Retirer 1">−</button>
                    <input type="number" min="0" className="w-14 border border-luxe-beige bg-white px-1 py-1 text-center text-sm" value={product.stock} onChange={event => setStock(product.id, Math.floor(Number(event.target.value) || 0))} aria-label={`Stock de ${product.name}`} />
                    <button type="button" className="stock-btn" onClick={() => setStock(product.id, product.stock + 1)} aria-label="Ajouter 1">+</button>
                  </div>
                  {product.stock === 0 && <span className="text-[11px] text-luxe-copper">Épuisé</span>}
                </td>
                <td className="whitespace-nowrap text-right">
                  <button type="button" className="text-link mr-4" onClick={() => { setEditing(product); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Modifier</button>
                  <button type="button" className="text-link !text-luxe-copper" onClick={() => remove(product)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const toCsv = rows => rows.map(row => row.map(cell => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(';')).join('\n');

const downloadCsv = (name, rows) => {
  const blob = new Blob([`﻿${toCsv(rows)}`], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
};

const Orders = () => {
  const { orders, setOrders, setProducts } = useStore();
  const [filter, setFilter] = React.useState('Toutes');
  const shown = filter === 'Toutes' ? orders : orders.filter(order => order.status === filter);

  const setStatus = (order, status) => {
    // Cancelling gives the stock back; un-cancelling takes it again.
    if ((status === 'Annulée') !== (order.status === 'Annulée')) {
      const sign = status === 'Annulée' ? 1 : -1;
      setProducts(previous => previous.map(product => {
        const qty = order.items.filter(item => item.id === product.id).reduce((sum, item) => sum + item.qty, 0);
        return qty ? { ...product, stock: Math.max(0, product.stock + sign * qty) } : product;
      }));
    }
    setOrders(previous => previous.map(item => item.id === order.id ? { ...item, status } : item));
  };

  const exportCsv = () => downloadCsv('commandes.csv', [
    ['Commande', 'Date', 'Statut', 'Client', 'Téléphone', 'Ville', 'Adresse', 'Articles', 'Total (DH)'],
    ...orders.map(order => [
      order.id, order.createdAt, order.status, order.customer?.name, order.customer?.phone, order.customer?.city, order.customer?.address,
      order.items.map(item => `${item.name} (${item.size}) x${item.qty}`).join(' | '), order.total,
    ]),
  ]);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="admin-title !mb-0">Commandes</h1>
        <button type="button" className="button-outline" onClick={exportCsv} disabled={!orders.length}>Exporter (Excel / CSV)</button>
      </div>
      <div className="mb-5 flex flex-wrap gap-2">
        {['Toutes', ...ORDER_STATUSES].map(status => (
          <button key={status} type="button" onClick={() => setFilter(status)} className={`filter-chip${filter === status ? ' filter-chip-active' : ''}`}>
            {status} ({status === 'Toutes' ? orders.length : orders.filter(order => order.status === status).length})
          </button>
        ))}
      </div>
      {shown.length === 0 ? <p className="admin-card text-sm text-luxe-charcoal/60">Aucune commande.</p> : (
        <div className="space-y-4">
          {shown.map(order => (
            <div key={order.id} className="admin-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-xl">{order.id} · {formatPrice(order.total)}</p>
                  <p className="text-xs text-luxe-charcoal/55">{order.createdAt ? dateTime.format(new Date(order.createdAt)) : order.date}</p>
                </div>
                <select className="form-field !w-auto" value={order.status} onChange={event => setStatus(order, event.target.value)} aria-label={`Statut de ${order.id}`}>
                  {ORDER_STATUSES.map(status => <option key={status}>{status}</option>)}
                </select>
              </div>
              <div className="mt-4 grid gap-4 text-sm md:grid-cols-2">
                <ul className="space-y-1">
                  {order.items.map(item => <li key={`${item.id}-${item.size}`}>{item.qty} × {item.name} <span className="text-luxe-charcoal/55">({item.size})</span></li>)}
                  <li className="pt-1 text-xs text-luxe-charcoal/55">Livraison : {order.shipping ? formatPrice(order.shipping) : 'gratuite'}</li>
                </ul>
                {order.customer && (
                  <div>
                    <p className="font-medium">{order.customer.name}</p>
                    <p>{order.customer.phone}</p>
                    <p className="text-luxe-charcoal/70">{order.customer.city} — {order.customer.address}</p>
                    {order.customer.note && <p className="mt-1 text-xs italic text-luxe-charcoal/60">« {order.customer.note} »</p>}
                    {order.customer.phone && (
                      <a className="text-link mt-3" target="_blank" rel="noreferrer" href={whatsappLink(order.customer.phone, `Salam ${order.customer.name.split(' ')[0]} 👋 C'est ${'LUXEBRAND.MA'}. On confirme votre commande ${order.id} (${formatPrice(order.total)}) pour livraison à ${order.customer.city} ?`)}>
                        Confirmer avec le client sur WhatsApp
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const Subscribers = () => {
  const [list] = React.useState(readSubscribers);
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="admin-title !mb-0">Liste VIP (WhatsApp)</h1>
        <button type="button" className="button-outline" disabled={!list.length} onClick={() => downloadCsv('liste-vip.csv', [['Téléphone', 'Inscrit le'], ...list.map(entry => [`+${entry.phone}`, entry.at])])}>Exporter</button>
      </div>
      <p className="mb-4 max-w-2xl text-sm text-luxe-charcoal/65">Numéros laissés dans le bloc « Liste VIP » de l’accueil. Ajoutez-les à une liste de diffusion WhatsApp Business pour annoncer vos drops.</p>
      {list.length === 0 ? <p className="admin-card text-sm text-luxe-charcoal/60">Aucun inscrit pour l’instant.</p> : (
        <ul className="admin-card divide-y divide-luxe-beige/70 text-sm">
          {list.map(entry => <li key={entry.phone} className="flex justify-between py-2"><span>+{entry.phone}</span><span className="text-luxe-charcoal/55">{dateTime.format(new Date(entry.at))}</span></li>)}
        </ul>
      )}
    </>
  );
};

const SettingsPage = () => {
  const { settings, setSettings, setProducts, setOrders, clearCart } = useStore();
  const [form, setForm] = React.useState(settings);
  const [saved, setSaved] = React.useState(false);
  const set = field => event => { setForm(previous => ({ ...previous, [field]: event.target.value })); setSaved(false); };

  const save = event => {
    event.preventDefault();
    setSettings({
      ...form,
      whatsappNumber: String(form.whatsappNumber).replace(/[^\d]/g, ''),
      freeShippingThreshold: Math.max(0, Number(form.freeShippingThreshold) || 0),
      deliveryFee: Math.max(0, Number(form.deliveryFee) || 0),
      instagram: String(form.instagram).replace(/^@/, ''),
    });
    setSaved(true);
  };

  const resetDemo = () => {
    if (!window.confirm('Remettre le catalogue d’origine et effacer toutes les commandes de ce navigateur ?')) return;
    setProducts(INITIAL_PRODUCTS);
    setOrders([]);
    clearCart();
    setSettings(DEFAULT_SETTINGS);
    setForm(DEFAULT_SETTINGS);
  };

  return (
    <>
      <h1 className="admin-title">Paramètres</h1>
      <form onSubmit={save} className="admin-card grid max-w-2xl gap-4 sm:grid-cols-2">
        <label className="admin-label sm:col-span-2">Nom de la boutique<input className="form-field" value={form.storeName} onChange={set('storeName')} /></label>
        <label className="admin-label">Numéro WhatsApp (ex : 212612345678)<input className="form-field" value={form.whatsappNumber} onChange={set('whatsappNumber')} /></label>
        <label className="admin-label">Instagram<input className="form-field" value={form.instagram} onChange={set('instagram')} /></label>
        <label className="admin-label">E-mail<input className="form-field" type="email" value={form.email} onChange={set('email')} /></label>
        <label className="admin-label">Code admin<input className="form-field" value={form.adminPin} onChange={set('adminPin')} /></label>
        <label className="admin-label">Frais de livraison (DH)<input className="form-field" type="number" min="0" value={form.deliveryFee} onChange={set('deliveryFee')} /></label>
        <label className="admin-label">Livraison gratuite dès (DH)<input className="form-field" type="number" min="0" value={form.freeShippingThreshold} onChange={set('freeShippingThreshold')} /></label>
        <div className="flex items-center gap-4 sm:col-span-2">
          <button type="submit" className="button-dark">Enregistrer</button>
          {saved && <span role="status" className="text-sm text-luxe-green">Enregistré ✓</span>}
        </div>
        <p className="text-xs leading-5 text-luxe-charcoal/55 sm:col-span-2">
          Ces réglages ne valent que pour ce navigateur. Pour que tous vos clients voient votre vrai numéro, modifiez aussi <code>src/config.js</code> avant de publier.
        </p>
      </form>
      <div className="admin-card mt-6 max-w-2xl">
        <h2 className="font-serif text-xl">Réinitialiser la démo</h2>
        <p className="mt-2 text-sm text-luxe-charcoal/65">Remet le catalogue d’origine et efface les commandes enregistrées dans ce navigateur.</p>
        <button type="button" className="button-outline mt-4" onClick={resetDemo}>Réinitialiser</button>
      </div>
      <p className="mt-6 text-xs text-luxe-charcoal/45">Villes proposées au paiement : {CITIES.length}. Modifiables dans <code>src/config.js</code>.</p>
    </>
  );
};

const NAV = [
  { to: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, end: true },
  { to: '/admin/produits', label: 'Produits & stock', icon: Package },
  { to: '/admin/commandes', label: 'Commandes', icon: ShoppingBag },
  { to: '/admin/vip', label: 'Liste VIP', icon: Users },
  { to: '/admin/parametres', label: 'Paramètres', icon: Settings },
];

const AdminPage = () => {
  const { settings, orders } = useStore();
  const [unlocked, setUnlocked] = React.useState(() => {
    try { return window.sessionStorage.getItem(SESSION_KEY) === '1'; } catch { return false; }
  });

  React.useEffect(() => {
    document.title = `Admin | ${settings.storeName}`;
  }, [settings.storeName]);

  const unlock = () => {
    try { window.sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* ignore */ }
    setUnlocked(true);
  };
  const lock = () => {
    try { window.sessionStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
    setUnlocked(false);
  };

  if (!unlocked) return <Gate onUnlock={unlock} />;
  const pending = orders.filter(order => order.status === 'Nouvelle').length;

  return (
    <div className="min-h-screen bg-[#F0EADF] lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="bg-luxe-charcoal text-luxe-ivory lg:sticky lg:top-0 lg:h-screen">
        <div className="flex items-center justify-between p-5 lg:block lg:p-7">
          <p className="wordmark wordmark-light">{settings.storeName}<span>ESPACE ADMIN</span></p>
          <button type="button" onClick={lock} className="flex items-center gap-2 text-xs text-luxe-ivory/60 hover:text-luxe-ivory lg:hidden"><LogOut size={14} /> Quitter</button>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:px-4" aria-label="Admin">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `admin-nav-link${isActive ? ' admin-nav-link-active' : ''}`}>
              <Icon size={16} strokeWidth={1.6} /> {label}
              {to === '/admin/commandes' && pending > 0 && <span className="ml-auto rounded-full bg-luxe-copper px-1.5 text-[10px]">{pending}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="hidden space-y-3 p-7 text-xs text-luxe-ivory/60 lg:absolute lg:bottom-0 lg:block">
          <Link to="/" className="flex items-center gap-2 hover:text-luxe-ivory"><ExternalLink size={14} /> Voir la boutique</Link>
          <button type="button" onClick={lock} className="flex items-center gap-2 hover:text-luxe-ivory"><LogOut size={14} /> Se déconnecter</button>
        </div>
      </aside>
      <main className="min-w-0 p-5 sm:p-8 lg:p-10">
        <DemoNotice />
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="produits" element={<Products />} />
          <Route path="commandes" element={<Orders />} />
          <Route path="vip" element={<Subscribers />} />
          <Route path="parametres" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminPage;
