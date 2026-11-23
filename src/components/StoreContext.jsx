import React from 'react';
import { DEFAULT_SETTINGS } from '../config';
import { INITIAL_PRODUCTS } from '../data/products';
import { shippingFor } from '../lib/format';
import { StoreContext, cartKey } from '../lib/store';

// Bump this when INITIAL_PRODUCTS changes shape, so browsers holding an old
// catalogue (e.g. the previous "$" demo data) start fresh instead of showing it.
const CATALOG_KEY = 'luxe_products_v2';

const isValidProductCatalog = value => (
  Array.isArray(value) &&
  value.every(product => (
    product &&
    typeof product === 'object' &&
    (typeof product.id === 'number' || typeof product.id === 'string') &&
    typeof product.name === 'string' &&
    typeof product.category === 'string' &&
    typeof product.price === 'number' &&
    typeof product.image === 'string' &&
    typeof product.stock === 'number' &&
    Array.isArray(product.sizes)
  ))
);

const isArray = value => Array.isArray(value);
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);

const readStorage = (key, initialValue, validate) => {
  try {
    const item = window.localStorage.getItem(key);
    if (item === null) return { value: initialValue, error: null };
    const value = JSON.parse(item);
    if (!validate(value)) throw new TypeError(`Invalid saved data for "${key}".`);
    return { value, error: null };
  } catch (error) {
    console.error(`Unable to read "${key}" from local storage.`, error);
    return { value: initialValue, error: 'Des données enregistrées dans ce navigateur étaient illisibles ; le catalogue d’origine est affiché.' };
  }
};

const useLocalStorage = (key, initialValue, validate = () => true) => {
  const [initial] = React.useState(() => readStorage(key, initialValue, validate));
  const [storedValue, setStoredValue] = React.useState(initial.value);

  React.useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Unable to save "${key}" to local storage.`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue, initial.error];
};

export const StoreProvider = ({ children }) => {
  const [products, setProducts, productsError] = useLocalStorage(CATALOG_KEY, INITIAL_PRODUCTS, isValidProductCatalog);
  const [cart, setCart] = useLocalStorage('luxe_cart_v2', [], isArray);
  const [orders, setOrders] = useLocalStorage('luxe_orders_v2', [], isArray);
  const [savedSettings, setSettings] = useLocalStorage('luxe_settings', DEFAULT_SETTINGS, isObject);
  const [cartNotice, setCartNotice] = React.useState(null);
  const settings = React.useMemo(() => ({ ...DEFAULT_SETTINGS, ...savedSettings }), [savedSettings]);

  // Keep the bag in sync with the catalogue: drop deleted products, refresh
  // prices/names edited in the admin, and cap quantities to current stock.
  const liveCart = React.useMemo(() => cart.flatMap(item => {
    const product = products.find(candidate => candidate.id === item.id);
    if (!product || product.stock <= 0) return [];
    return [{ ...item, name: product.name, price: product.price, image: product.image, category: product.category, stock: product.stock }];
  }), [cart, products]);

  const qtyInCart = React.useCallback(
    id => liveCart.filter(item => item.id === id).reduce((sum, item) => sum + item.qty, 0),
    [liveCart],
  );

  const addToCart = (product, size, qty = 1) => {
    const available = product.stock - qtyInCart(product.id);
    if (available <= 0) return false;
    const addQty = Math.min(qty, available);
    const key = cartKey(product.id, size);
    setCart(previous => {
      const existing = previous.find(item => item.key === key);
      if (existing) return previous.map(item => item.key === key ? { ...item, qty: item.qty + addQty } : item);
      return [...previous, { key, id: product.id, size, qty: addQty }];
    });
    setCartNotice({ name: product.name, size, at: Date.now() });
    return true;
  };

  const removeFromCart = key => setCart(previous => previous.filter(item => item.key !== key));

  const updateCartQty = (key, qty) => {
    if (qty <= 0) return removeFromCart(key);
    const line = liveCart.find(item => item.key === key);
    if (!line) return undefined;
    const otherLines = qtyInCart(line.id) - line.qty;
    const nextQty = Math.min(qty, line.stock - otherLines);
    if (nextQty <= 0) return removeFromCart(key);
    setCart(previous => previous.map(item => item.key === key ? { ...item, qty: nextQty } : item));
    return undefined;
  };

  const clearCart = () => setCart([]);

  const placeOrder = customer => {
    const subtotal = liveCart.reduce((total, item) => total + item.price * item.qty, 0);
    const shipping = shippingFor(subtotal, settings);
    const order = {
      id: `LB-${Date.now().toString(36).toUpperCase().slice(-6)}`,
      createdAt: new Date().toISOString(),
      items: liveCart.map(({ id, name, size, qty, price }) => ({ id, name, size, qty, price })),
      subtotal,
      shipping,
      total: subtotal + shipping,
      status: 'Nouvelle',
      customer,
    };
    setProducts(previous => previous.map(product => {
      const ordered = order.items.filter(item => item.id === product.id).reduce((sum, item) => sum + item.qty, 0);
      return ordered ? { ...product, stock: Math.max(0, product.stock - ordered) } : product;
    }));
    setOrders(previous => [order, ...previous]);
    clearCart();
    return order;
  };

  const value = {
    products, setProducts, productsError,
    cart: liveCart, addToCart, removeFromCart, updateCartQty, clearCart, qtyInCart,
    cartNotice, dismissCartNotice: () => setCartNotice(null),
    orders, setOrders, placeOrder,
    settings, setSettings,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
