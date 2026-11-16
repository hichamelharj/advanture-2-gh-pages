import React from 'react';
import { Link } from 'react-router-dom';
import StoreContext from '../components/StoreContext';

const AccountPage = () => {
  const { orders } = React.useContext(StoreContext);

  return (
    <main className="page-shell min-h-[65vh] py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <span className="eyebrow text-luxe-copper">Guest shopping</span>
        <h1 className="editorial-heading mt-4">A place for your orders.</h1>
        <p className="mt-5 max-w-xl text-sm leading-7 text-luxe-charcoal/65">
          This demo does not create customer accounts. Your simulated orders
          and any newsletter address stay in this browser only; no account or
          sign-in is required, and no email is sent.
        </p>

        <div className="mt-12 border-y border-luxe-beige/80">
          {orders.length === 0 ? (
            <div className="py-10">
              <p className="font-serif text-xl">Nothing here just yet.</p>
              <p className="mt-2 text-sm text-luxe-charcoal/60">
                Your completed demo orders will appear on this device.
              </p>
              <Link to="/" className="text-link mt-5 inline-flex">
                Explore the collection <span aria-hidden="true">↗</span>
              </Link>
            </div>
          ) : (
            <ul>
              {orders.map(order => (
                <li key={order.id} className="flex flex-col gap-3 border-b border-luxe-beige/60 py-6 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-serif text-lg">{order.id}</p>
                    <p className="mt-1 text-xs text-luxe-charcoal/55">
                      {order.date} · {order.items.reduce((count, item) => count + item.qty, 0)} pieces
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-6 sm:justify-end">
                    <span className="text-xs uppercase tracking-[0.12em] text-luxe-green">{order.status}</span>
                    <span className="font-serif text-lg">${order.total.toFixed(2)}</span>
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
