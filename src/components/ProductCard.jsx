import React from 'react';
import StoreContext from './StoreContext';
import ProductImage from './ProductImage';

const ProductCard = ({ product }) => {
  const { name, price, category, stock, image } = product;
  const { cart, addToCart } = React.useContext(StoreContext);
  const imageFit = product.imageFit || 'cover';
  const quickViewRef = React.useRef(null);
  const isInStock = stock > 0;
  const cartItem = cart.find(item => item.id === product.id);
  const atStockLimit = cartItem?.qty >= stock;
  const addToCartLabel = !isInStock
    ? 'Unavailable'
    : atStockLimit
      ? 'Stock limit reached'
      : cartItem
        ? `Add another · ${cartItem.qty} in bag`
        : 'Add to bag';

  const openQuickView = () => quickViewRef.current?.showModal();
  const closeQuickView = () => quickViewRef.current?.close();

  return (
    <article className="product-card group min-w-0">
      <div className="product-card-image relative aspect-[4/5] overflow-hidden bg-luxe-beige/35">
        <ProductImage src={image} alt={name} category={category} fit={imageFit} />
        <span className="absolute left-3 top-3 z-[1] bg-luxe-ivory/90 px-2.5 py-1.5 text-[8px] uppercase tracking-[0.15em] text-luxe-charcoal sm:left-4 sm:top-4">
          {isInStock ? 'In stock' : 'Sold out'}
        </span>
        <div className="product-card-action">
          <button
            type="button"
            onClick={openQuickView}
            className="product-action-button bg-luxe-ivory text-luxe-charcoal hover:bg-luxe-beige"
          >
            Quick view
          </button>
          <button
            type="button"
            disabled={!isInStock || atStockLimit}
            onClick={() => addToCart(product)}
            aria-label={`${addToCartLabel}: ${name}`}
            className="product-action-button bg-luxe-green text-luxe-ivory hover:bg-luxe-charcoal disabled:cursor-not-allowed disabled:opacity-60"
          >
            {addToCartLabel}
          </button>
        </div>
      </div>
      <div className="product-card-details">
        <p className="product-card-category text-[8px] uppercase tracking-[0.18em] text-luxe-copper sm:text-[9px]">
          {category}
        </p>
        <div className="product-card-meta mt-2">
          <h3 className="product-card-name font-serif text-base leading-snug sm:text-lg">{name}</h3>
          <span className="product-card-price pt-0.5 text-xs tracking-wide sm:text-sm">${price}</span>
        </div>
      </div>

      <dialog
        ref={quickViewRef}
        className="quick-view-dialog"
        aria-labelledby={`quick-view-title-${product.id}`}
        onClick={event => {
          if (event.target === event.currentTarget) closeQuickView();
        }}
      >
        <div className="quick-view-panel">
          <div className="quick-view-image">
            <ProductImage src={image} alt={name} category={category} fit={imageFit} />
          </div>
          <div className="quick-view-copy">
            <button
              type="button"
              onClick={closeQuickView}
              className="quick-view-close"
              aria-label={`Close ${name} quick view`}
            >
              ×
            </button>
            <p className="eyebrow text-luxe-copper">{category}</p>
            <h2 id={`quick-view-title-${product.id}`} className="mt-4 font-serif text-3xl tracking-[-0.04em] sm:text-4xl">
              {name}
            </h2>
            <p className="mt-4 text-sm tracking-wide">${price}</p>
            <p className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-luxe-charcoal/70">
              <span aria-hidden="true" className={`h-1.5 w-1.5 ${isInStock ? 'bg-luxe-green' : 'bg-luxe-copper'}`} />
              {isInStock ? 'In stock' : 'Sold out'}
            </p>
            {product.description && (
              <p className="mt-5 max-w-md text-sm leading-7 text-luxe-charcoal/70">{product.description}</p>
            )}
            <button
              type="button"
              disabled={!isInStock || atStockLimit}
              onClick={() => {
                addToCart(product);
                closeQuickView();
              }}
              className="button-dark mt-8 w-full justify-center disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {addToCartLabel}
            </button>
          </div>
        </div>
      </dialog>
    </article>
  );
};

export default ProductCard;