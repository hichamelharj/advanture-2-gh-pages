import React from 'react';
import { Link } from 'react-router-dom';
import StoreContext from '../components/StoreContext';
import ProductImage from '../components/ProductImage';

const CartPage = () => {
  const { products, setProducts, cart, removeFromCart, updateCartQty, setOrders, clearCart } = React.useContext(StoreContext);
  const [orderPlaced, setOrderPlaced] = React.useState(false);
  const [checkoutError, setCheckoutError] = React.useState('');
  const subtotal = cart.reduce((total, item) => total + item.price * item.qty, 0);
  const shipping = subtotal > 100 ? 0 : cart.length > 0 ? 15 : 0;
  const total = subtotal + shipping;

  const handleCheckout = event => {
    event.preventDefault();
    const inventoryChanged = cart.some(item => {
      const product = products.find(candidate => candidate.id === item.id);
      return !product || product.stock < item.qty;
    });

    if (inventoryChanged) {
      setCheckoutError('Some pieces are no longer available in the requested quantity. Please review your bag.');
      return;
    }

    setCheckoutError('');
    const formData = new FormData(event.currentTarget);
    const customer = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      address: String(formData.get('address') || '').trim(),
    };

    setProducts(previousProducts => previousProducts.map(product => {
      const orderedItem = cart.find(item => item.id === product.id);
      return orderedItem ? { ...product, stock: product.stock - orderedItem.qty } : product;
    }));
    setOrders(previousOrders => [{
      id: `ORD-${Date.now()}`,
      items: cart,
      total,
      date: new Date().toLocaleDateString(),
      status: 'Demo order',
      customer,
    }, ...previousOrders]);
    clearCart();
    setOrderPlaced(true);
    event.currentTarget.reset();
  };

  if (orderPlaced) {
    return (
      <main className="page-shell min-h-[65vh] py-20 sm:py-28">
        <div className="mx-auto max-w-2xl border-y border-luxe-beige py-12 text-center sm:py-16">
          <span className="eyebrow text-luxe-copper">Order received · Demo</span>
          <h1 className="mt-5 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">Thank you.</h1>
          <p role="status" className="mx-auto mt-5 max-w-lg text-sm leading-7 text-luxe-charcoal/65">
            Your simulated order has been saved in this browser. No payment
            was processed and no confirmation email was sent.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/account" className="button-dark">View demo orders</Link>
            <Link to="/" className="button-outline">Return to the shop</Link>
          </div>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="page-shell flex min-h-[65vh] flex-col items-center justify-center py-20 text-center">
        <span className="eyebrow text-luxe-copper">Your selection</span>
        <h1 className="mt-5 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">A little room for something lovely.</h1>
        <p className="mt-4 max-w-md text-sm leading-7 text-luxe-charcoal/60">
          Your shopping bag is empty. Take your time and find a piece to keep.
        </p>
        <Link to="/" className="button-dark mt-8">Explore the collection <span aria-hidden="true">↗</span></Link>
      </main>
    );
  }

  return (
    <main className="page-shell py-12 sm:py-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-luxe-beige pb-6 sm:mb-14">
        <div>
          <span className="eyebrow text-luxe-copper">Your selection</span>
          <h1 className="mt-3 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">The shopping bag.</h1>
        </div>
        <span className="text-xs uppercase tracking-[0.14em] text-luxe-charcoal/55">
          {cart.reduce((count, item) => count + item.qty, 0)} pieces
        </span>
      </div>

      <div className="grid items-start gap-12 lg:grid-cols-[1.5fr_0.8fr] lg:gap-16">
        <ul className="divide-y divide-luxe-beige/80 border-y border-luxe-beige/80">
          {cart.map(item => (
            <li key={item.id} className="grid grid-cols-[88px_1fr] gap-4 py-5 sm:grid-cols-[120px_1fr] sm:gap-6 sm:py-7">
              <div className="aspect-[4/5] overflow-hidden bg-luxe-beige/30">
                <ProductImage src={item.image} alt={item.name} category={item.category} fit={item.imageFit} />
              </div>
              <div className="flex min-w-0 flex-col justify-between gap-4 py-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="eyebrow text-luxe-copper">{item.category}</p>
                    <h2 className="mt-2 font-serif text-lg leading-snug sm:text-xl">{item.name}</h2>
                  </div>
                  <span className="shrink-0 text-sm">${(item.price * item.qty).toFixed(2)}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center border border-luxe-beige" aria-label={`Quantity for ${item.name}`}>
                    <button
                      type="button"
                      onClick={() => {
                        setCheckoutError('');
                        updateCartQty(item.id, item.qty - 1);
                      }}
                      className="quantity-button"
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      −
                    </button>
                    <span className="min-w-9 text-center text-xs">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setCheckoutError('');
                        updateCartQty(item.id, item.qty + 1);
                      }}
                      className="quantity-button"
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCheckoutError('');
                      removeFromCart(item.id);
                    }}
                    className="text-[9px] uppercase tracking-[0.16em] text-luxe-charcoal/55 underline decoration-luxe-beige underline-offset-4 transition-colors hover:text-luxe-copper"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="border border-luxe-beige bg-white/35 p-5 sm:p-7 lg:sticky lg:top-32">
          <h2 className="font-serif text-2xl">Order summary</h2>
          <div className="mt-6 space-y-4 border-b border-luxe-beige/80 pb-5 text-sm">
            <div className="flex justify-between">
              <span className="text-luxe-charcoal/65">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-luxe-charcoal/65">Delivery</span>
              <span>{shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between pt-2 font-serif text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <form onSubmit={handleCheckout} className="mt-6 space-y-4">
            <label className="form-label" htmlFor="checkout-name">Full name</label>
            <input id="checkout-name" name="name" autoComplete="name" required className="form-field" />
            <label className="form-label" htmlFor="checkout-email">Email address</label>
            <input id="checkout-email" name="email" type="email" autoComplete="email" required className="form-field" />
            <label className="form-label" htmlFor="checkout-address">Delivery address</label>
            <textarea id="checkout-address" name="address" autoComplete="street-address" rows="2" required className="form-field resize-y" />
            <p className="border-l-2 border-luxe-copper py-1 pl-3 text-[10px] leading-5 text-luxe-charcoal/60">
              Demo checkout only. Order details stay in this browser; no payment is taken.
            </p>
            {checkoutError && (
              <p role="alert" className="text-xs leading-5 text-luxe-copper">{checkoutError}</p>
            )}
            <button type="submit" className="button-dark w-full justify-center">
              Place demo order <span aria-hidden="true">↗</span>
            </button>
          </form>
        </aside>
      </div>
    </main>
  );
};

export default CartPage;
