import React from 'react';

const pexelsImage = id => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`;

const PRODUCT_IMAGES = {
  leatherBag: pexelsImage(27174573),
  minimalistWatch: pexelsImage(4061280),
  canvasWeekendBag: pexelsImage(5120082),
  woolBlendScarf: pexelsImage(5475167),
  cashmereSweater: pexelsImage(5618175),
  leatherTravelCase: pexelsImage(11499403),
  satinSilkBlouse: pexelsImage(15968866),
  suedeLoafers: pexelsImage(9992899),
  silkPocketSquare: pexelsImage(11911796),
  leatherWallet: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80',
  leatherDuffelBag: pexelsImage(1152077),
  silkTie: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80',
  leatherJournal: pexelsImage(921716),
  silkScarf: pexelsImage(16049198),
  leatherBriefcase: pexelsImage(6535352),
  cashmereCardigan: pexelsImage(8619007),
  leatherBelt: pexelsImage(31959216),
  leatherSuitcase: pexelsImage(36933446),
  cashmereShawl: pexelsImage(8995906),
};

const PRODUCT_IMAGE_MIGRATIONS = {
  'Premium Leather Bag|Accessories|120': { from: ['photo-1548036328-c9fa89d128fa', 'photo-1590874103328-eac38a683ce7'], to: PRODUCT_IMAGES.leatherBag, fit: 'contain' },
  'Minimalist Watch|Accessories|85': { from: ['photo-1523170335258-f5ed11844a49', 'photo-18094251', 'photo-22032443'], to: PRODUCT_IMAGES.minimalistWatch, fit: 'contain' },
  'Canvas Weekend Bag|Luggage|65': { from: ['photo-1565026057447-bc90a3dceb87', 'photo-1544816155-12df9643f363'], to: PRODUCT_IMAGES.canvasWeekendBag },
  'Wool Blend Scarf|Clothing|35': { from: ['photo-1521572163474-6864f9cf17ab', '6569963'], to: PRODUCT_IMAGES.woolBlendScarf, fit: 'contain' },
  'Cashmere Sweater|Clothing|180': { from: 'photo-1523381210434-271e8be1f52b', to: PRODUCT_IMAGES.cashmereSweater },
  'Leather Travel Case|Luggage|220': { from: 'photo-1575428652377-a2d80e2277fc', to: PRODUCT_IMAGES.leatherTravelCase },
  'Satin Silk Blouse|Clothing|110': { from: 'photo-1523381210434-271e8be1f52b', to: PRODUCT_IMAGES.satinSilkBlouse },
  'Suede Loafers|Clothing|150': { from: 'photo-1434389677669-e08b4cac3105', to: PRODUCT_IMAGES.suedeLoafers },
  'Silk Pocket Square|Accessories|45': { from: 'photo-1434389677669-e08b4cac3105', to: PRODUCT_IMAGES.silkPocketSquare },
  'Premium Leather Wallet|Accessories|75': { from: 'photo-1566150905458-1bf1fc113f0d', to: PRODUCT_IMAGES.leatherWallet },
  'Leather Duffel Bag|Luggage|320': { from: 'photo-1507473885765-e6ed057f782c', to: PRODUCT_IMAGES.leatherDuffelBag },
  'Silk Tie|Clothing|65': { from: 'photo-1517841905240-472988babdf9', to: PRODUCT_IMAGES.silkTie },
  'Leather Journal|Accessories|95': { from: 'photo-1517841905240-472988babdf9', to: PRODUCT_IMAGES.leatherJournal },
  'Silk Scarf|Clothing|55': { from: 'photo-1496747611176-843222e1e57c', to: PRODUCT_IMAGES.silkScarf },
  'Premium Leather Briefcase|Accessories|450': { from: 'photo-1487222477894-8943e31ef7b2', to: PRODUCT_IMAGES.leatherBriefcase },
  'Cashmere Cardigan|Clothing|165': { from: 'photo-1515886657613-9f3515b0c78f', to: PRODUCT_IMAGES.cashmereCardigan },
  'Leather Belt|Accessories|85': { from: 'photo-1566150905458-1bf1fc113f0d', to: PRODUCT_IMAGES.leatherBelt },
  'Leather Suitcase|Luggage|420': { from: 'photo-1507473885765-e6ed057f782c', to: PRODUCT_IMAGES.leatherSuitcase },
  'Cashmere Shawl|Clothing|135': { from: 'photo-1509631179647-0177331693ae', to: PRODUCT_IMAGES.cashmereShawl },
};

const matchesImageSource = (image, sources) => (
  typeof image === 'string' &&
  (Array.isArray(sources) ? sources : [sources]).some(source => image.includes(source))
);

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Premium Leather Bag', price: 120, category: 'Accessories', image: PRODUCT_IMAGES.leatherBag, imageFit: 'contain', stock: 10, description: 'Handcrafted premium leather bag for everyday use.' },
  { id: 2, name: 'Minimalist Watch', price: 85, category: 'Accessories', image: PRODUCT_IMAGES.minimalistWatch, imageFit: 'contain', stock: 5, description: 'Sleek, timeless design with a genuine leather strap.' },
  { id: 3, name: 'Canvas Weekend Bag', price: 65, category: 'Luggage', image: PRODUCT_IMAGES.canvasWeekendBag, stock: 15, description: 'Durable canvas bag perfect for short trips.' },
  { id: 4, name: 'Wool Blend Scarf', price: 35, category: 'Clothing', image: PRODUCT_IMAGES.woolBlendScarf, imageFit: 'contain', stock: 20, description: 'Warm and soft wool blend scarf for winter.' },
  { id: 5, name: 'Cashmere Sweater', price: 180, category: 'Clothing', image: PRODUCT_IMAGES.cashmereSweater, stock: 8, description: 'Luxurious cashmere sweater with elegant drape.' },
  { id: 6, name: 'Leather Travel Case', price: 220, category: 'Luggage', image: PRODUCT_IMAGES.leatherTravelCase, stock: 6, description: 'Premium leather travel case for sophisticated journeys.' },
  { id: 7, name: 'Satin Silk Blouse', price: 110, category: 'Clothing', image: PRODUCT_IMAGES.satinSilkBlouse, stock: 12, description: 'Elegant satin silk blouse with subtle sheen.' },
  { id: 8, name: 'Suede Loafers', price: 150, category: 'Clothing', image: PRODUCT_IMAGES.suedeLoafers, stock: 7, description: 'Handcrafted suede loafers for refined style.' },
  { id: 9, name: 'Silk Pocket Square', price: 45, category: 'Accessories', image: PRODUCT_IMAGES.silkPocketSquare, stock: 18, description: 'Premium silk pocket square for refined detailing.' },
  { id: 21, name: 'Premium Leather Wallet', price: 75, category: 'Accessories', image: PRODUCT_IMAGES.leatherWallet, stock: 25, description: 'Hand-stitched leather wallet for timeless elegance.' },
  { id: 22, name: 'Cashmere Blanket', price: 280, category: 'Home', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80', stock: 4, description: 'Ultra-soft cashmere blanket for ultimate comfort.' },
  { id: 10, name: 'Leather Duffel Bag', price: 320, category: 'Luggage', image: PRODUCT_IMAGES.leatherDuffelBag, stock: 3, description: 'Spacious leather duffel bag for weekend getaways.' },
  { id: 11, name: 'Silk Tie', price: 65, category: 'Clothing', image: PRODUCT_IMAGES.silkTie, stock: 14, description: 'Classic silk tie with subtle pattern.' },
  { id: 12, name: 'Leather Journal', price: 95, category: 'Accessories', image: PRODUCT_IMAGES.leatherJournal, stock: 11, description: 'Premium leather journal for refined note-taking.' },
  { id: 13, name: 'Silk Scarf', price: 55, category: 'Clothing', image: PRODUCT_IMAGES.silkScarf, stock: 16, description: 'Delicate silk scarf with elegant drape.' },
  { id: 23, name: 'Premium Leather Briefcase', price: 450, category: 'Accessories', image: PRODUCT_IMAGES.leatherBriefcase, stock: 2, description: 'Sophisticated leather briefcase for the modern professional.' },
  { id: 14, name: 'Cashmere Cardigan', price: 165, category: 'Clothing', image: PRODUCT_IMAGES.cashmereCardigan, stock: 9, description: 'Soft cashmere cardigan with timeless design.' },
  { id: 15, name: 'Leather Belt', price: 85, category: 'Accessories', image: PRODUCT_IMAGES.leatherBelt, stock: 22, description: 'Handcrafted leather belt with polished finish.' },
  { id: 24, name: 'Leather Suitcase', price: 420, category: 'Luggage', image: PRODUCT_IMAGES.leatherSuitcase, stock: 1, description: 'Premium leather suitcase for luxury travel.' },
  { id: 16, name: 'Cashmere Shawl', price: 135, category: 'Clothing', image: PRODUCT_IMAGES.cashmereShawl, stock: 10, description: 'Elegant cashmere shawl for refined layering.' },
  { id: 17, name: 'Premium Leather Briefcase', price: 450, category: 'Accessories', image: PRODUCT_IMAGES.leatherBriefcase, stock: 2, description: 'Sophisticated leather briefcase for the modern professional.' },
  { id: 18, name: 'Cashmere Cardigan', price: 165, category: 'Clothing', image: PRODUCT_IMAGES.cashmereCardigan, stock: 9, description: 'Soft cashmere cardigan with timeless design.' },
  { id: 19, name: 'Leather Belt', price: 85, category: 'Accessories', image: PRODUCT_IMAGES.leatherBelt, stock: 22, description: 'Handcrafted leather belt with polished finish.' },
  { id: 20, name: 'Leather Suitcase', price: 420, category: 'Luggage', image: PRODUCT_IMAGES.leatherSuitcase, stock: 1, description: 'Premium leather suitcase for luxury travel.' },
  { id: 25, name: 'Cashmere Shawl', price: 135, category: 'Clothing', image: PRODUCT_IMAGES.cashmereShawl, stock: 10, description: 'Elegant cashmere shawl for refined layering.' }
];

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
    typeof product.stock === 'number'
  ))
);

const useLocalStorage = (key, initialValue, validate = () => true) => {
  const [initialState] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      const value = item === null ? initialValue : JSON.parse(item);
      if (!validate(value)) throw new TypeError(`Invalid saved data for "${key}".`);
      return { value, error: null };
    } catch (error) {
      console.error(`Unable to read "${key}" from local storage.`, error);
      return { value: initialValue, error: `Saved ${key.replace('store_', '')} data could not be read.` };
    }
  });
  const [storedValue, setStoredValue] = React.useState(initialState.value);
  const [storageError] = React.useState(initialState.error);

  const setValue = React.useCallback((value) => {
    setStoredValue(previousValue =>
      typeof value === 'function' ? value(previousValue) : value
    );
  }, []);

  React.useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Unable to save "${key}" to local storage.`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue, storageError];
};

const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {
  const [products, setProducts, productsError] = useLocalStorage('store_products', INITIAL_PRODUCTS, isValidProductCatalog);
  const [cart, setCart] = useLocalStorage('store_cart', []);
  const [orders, setOrders] = useLocalStorage('store_orders', []);

  React.useEffect(() => {
    const usedIds = new Set();
    let nextId = Math.max(0, ...products.map(product => Number(product.id) || 0)) + 1;
    let hasDuplicateIds = false;
    let hasImageUpdates = false;

    const normalizedProducts = products.map(product => {
      const signature = `${product.name}|${product.category}|${product.price}`;
      const imageMigration = PRODUCT_IMAGE_MIGRATIONS[signature];
      const hasLegacyImage = imageMigration && matchesImageSource(product.image, imageMigration.from);
      const hasManagedImage = imageMigration && (hasLegacyImage || product.image === imageMigration.to);
      const needsFitUpdate = hasManagedImage && imageMigration.fit && product.imageFit !== imageMigration.fit;
      const migratedProduct = hasManagedImage && (hasLegacyImage || needsFitUpdate)
        ? {
          ...product,
          ...(hasLegacyImage ? { image: imageMigration.to } : {}),
          ...(imageMigration.fit ? { imageFit: imageMigration.fit } : {}),
        }
        : product;

      if (migratedProduct !== product) hasImageUpdates = true;

      if (!usedIds.has(migratedProduct.id)) {
        usedIds.add(migratedProduct.id);
        return migratedProduct;
      }

      while (usedIds.has(nextId)) nextId += 1;
      const normalizedProduct = { ...migratedProduct, id: nextId };
      usedIds.add(nextId);
      nextId += 1;
      hasDuplicateIds = true;
      return normalizedProduct;
    });

    if (hasDuplicateIds || hasImageUpdates) setProducts(normalizedProducts);
  }, [products, setProducts]);

  React.useEffect(() => {
    let needsUpdate = false;
    const normalizedCart = cart.map(item => {
      const signature = `${item.name}|${item.category}|${item.price}`;
      const imageMigration = PRODUCT_IMAGE_MIGRATIONS[signature];
      const hasLegacyImage = imageMigration && matchesImageSource(item.image, imageMigration.from);
      const product = products.find(candidate => (
        candidate.name === item.name &&
        candidate.category === item.category &&
        candidate.price === item.price &&
        (candidate.image === item.image || hasLegacyImage)
      ));

      if (product && (
        product.id !== item.id ||
        product.image !== item.image ||
        (product.imageFit && product.imageFit !== item.imageFit)
      )) {
        needsUpdate = true;
        return {
          ...item,
          id: product.id,
          image: product.image,
          ...(product.imageFit ? { imageFit: product.imageFit } : {}),
        };
      }

      return item;
    });

    if (needsUpdate) setCart(normalizedCart);
  }, [cart, products, setCart]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing?.qty >= product.stock) return prev;
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const updateCartQty = (id, qty) => {
    if (qty <= 0) return removeFromCart(id);
    const product = products.find(item => item.id === id);
    const nextQty = product ? Math.min(qty, product.stock) : qty;
    if (nextQty <= 0) return removeFromCart(id);
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: nextQty } : item));
  };
  const clearCart = () => setCart([]);

  return (
    <StoreContext.Provider value={{ products, productsError, setProducts, cart, setCart, addToCart, removeFromCart, updateCartQty, orders, setOrders, clearCart }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;