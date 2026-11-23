import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Minus, Plus } from 'lucide-react';
import { useStore } from '../lib/store';
import { formatPrice, productImage } from '../lib/format';
import { whatsappLink } from '../lib/whatsapp';
import { CATEGORIES, SIZE_GUIDE } from '../data/products';
import ProductImage from '../components/ProductImage';
import ProductGrid from '../components/ProductGrid';
import TrustBadges from '../components/TrustBadges';
import { StockBadge } from '../components/ProductCard';
import { WhatsAppIcon } from '../components/WhatsAppButton';
import { SizeGuideTable } from './Info';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, qtyInCart, settings } = useStore();
  const product = products.find(item => String(item.id) === id);
  const [size, setSize] = React.useState(() => (product?.sizes?.length === 1 ? product.sizes[0] : null));
  const [qty, setQty] = React.useState(1);
  const [error, setError] = React.useState('');
  const [showGuide, setShowGuide] = React.useState(false);

  const [previousId, setPreviousId] = React.useState(id);
  if (previousId !== id) {
    setPreviousId(id);
    setSize(product?.sizes?.length === 1 ? product.sizes[0] : null);
    setQty(1);
    setError('');
    setShowGuide(false);
  }

  React.useEffect(() => {
    if (product) document.title = `${product.name} | ${settings.storeName}`;
    return () => { document.title = `${settings.storeName} | Streetwear heavyweight au Maroc`; };
  }, [product, settings.storeName]);

  if (!product) {
    return (
      <main className="page-shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="font-serif text-4xl">Cette pièce n’existe plus.</h1>
        <Link to="/#shop" className="button-dark mt-8">Voir la collection</Link>
      </main>
    );
  }

  const category = CATEGORIES.find(item => item.id === product.category);
  const available = product.stock - qtyInCart(product.id);
  const soldOut = product.stock <= 0;
  const related = products.filter(item => item.id !== product.id && item.category === product.category && item.stock > 0).slice(0, 4);
  const fill = related.length < 4
    ? products.filter(item => item.id !== product.id && item.category !== product.category && item.stock > 0).slice(0, 4 - related.length)
    : [];

  const requireSize = () => {
    if (!size) {
      setError('Choisissez votre taille.');
      return false;
    }
    if (available <= 0) {
      setError('Vous avez déjà tout le stock disponible dans votre panier.');
      return false;
    }
    setError('');
    return true;
  };

  const handleAdd = () => {
    if (requireSize()) addToCart(product, size, qty);
  };

  const handleBuyNow = () => {
    if (!requireSize()) return;
    addToCart(product, size, qty);
    navigate('/panier#checkout');
  };

  const askLink = whatsappLink(
    settings.whatsappNumber,
    `Salam 👋 J'ai une question sur « ${product.name} »${size ? ` (taille ${size})` : ''}.`,
  );

  return (
    <main>
      <div className="page-shell pt-6 text-[11px] uppercase tracking-[0.14em] text-luxe-charcoal/55">
        <Link to="/" className="hover:text-luxe-copper">Boutique</Link>
        <span className="mx-2">/</span>
        <Link to="/#shop" className="hover:text-luxe-copper">{category?.label ?? product.category}</Link>
      </div>

      <section className="page-shell grid gap-10 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-12">
        <div className="aspect-[4/5] overflow-hidden bg-luxe-beige/35 lg:sticky lg:top-28 lg:self-start">
          <ProductImage src={productImage(product.image)} alt={product.name} category={category?.label ?? product.category} fit={product.imageFit} />
        </div>

        <div className="max-w-xl">
          <p className="eyebrow text-luxe-copper">{category?.label ?? product.category}</p>
          <h1 className="mt-3 font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.04em]">{product.name}</h1>
          <div className="mt-5 flex items-center gap-3">
            <span className="text-2xl">{formatPrice(product.price)}</span>
            {product.compareAt > product.price && <s className="text-luxe-charcoal/45">{formatPrice(product.compareAt)}</s>}
            <StockBadge stock={product.stock} />
          </div>
          {product.description && <p className="mt-6 text-[15px] leading-7 text-luxe-charcoal/75">{product.description}</p>}

          {!soldOut && (
            <>
              <div className="mt-8">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.14em]">Taille{size ? ` : ${size}` : ''}</span>
                  {SIZE_GUIDE[product.category] && (
                    <button type="button" onClick={() => setShowGuide(value => !value)} className="text-xs underline underline-offset-4 hover:text-luxe-copper" aria-expanded={showGuide}>
                      Guide des tailles
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Choisir la taille">
                  {product.sizes.map(option => (
                    <button
                      key={option}
                      type="button"
                      role="radio"
                      aria-checked={size === option}
                      onClick={() => { setSize(option); setError(''); }}
                      className={`size-option${size === option ? ' size-option-active' : ''}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {showGuide && SIZE_GUIDE[product.category] && (
                  <div className="mt-4"><SizeGuideTable category={product.category} /></div>
                )}
              </div>

              <div className="mt-6 flex items-center gap-4">
                <span className="text-xs uppercase tracking-[0.14em]">Quantité</span>
                <div className="flex items-center border border-luxe-beige">
                  <button type="button" className="quantity-button" onClick={() => setQty(value => Math.max(1, value - 1))} aria-label="Diminuer la quantité"><Minus size={14} /></button>
                  <span className="min-w-9 text-center text-sm">{qty}</span>
                  <button type="button" className="quantity-button" onClick={() => setQty(value => Math.min(Math.max(1, available), value + 1))} aria-label="Augmenter la quantité"><Plus size={14} /></button>
                </div>
              </div>

              {error && <p role="alert" className="mt-4 text-sm text-luxe-copper">{error}</p>}

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={handleBuyNow} className="button-dark w-full">Commander — paiement à la livraison</button>
                <button type="button" onClick={handleAdd} className="button-outline w-full">Ajouter au panier</button>
              </div>
            </>
          )}

          {soldOut && (
            <div className="mt-8 border border-luxe-beige p-5">
              <p className="font-serif text-xl">Épuisé pour le moment.</p>
              <p className="mt-2 text-sm text-luxe-charcoal/65">Écrivez-nous sur WhatsApp : on vous prévient dès le retour en stock.</p>
            </div>
          )}

          <a href={askLink} target="_blank" rel="noreferrer" className="mt-4 flex w-full items-center justify-center gap-2 border border-[#25D366]/60 py-3.5 text-[12px] uppercase tracking-[0.14em] text-[#128C4A] transition-colors hover:bg-[#25D366]/10">
            <WhatsAppIcon size={18} /> {soldOut ? 'Me prévenir sur WhatsApp' : 'Une question ? WhatsApp'}
          </a>

          <div className="mt-10 border-t border-luxe-beige pt-8">
            <TrustBadges compact />
          </div>
        </div>
      </section>

      {related.length + fill.length > 0 && (
        <section className="section-padding bg-[#F0EADF]">
          <div className="page-shell">
            <h2 className="editorial-heading mb-10 text-[clamp(1.8rem,3vw,2.6rem)]">À porter avec.</h2>
            <ProductGrid products={[...related, ...fill]} />
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductPage;
