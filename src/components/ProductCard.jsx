import { Link } from 'react-router-dom';
import { formatPrice, productImage } from '../lib/format';
import { useStore } from '../lib/store';
import { CATEGORIES } from '../data/products';
import ProductImage from './ProductImage';

const categoryLabel = id => CATEGORIES.find(category => category.id === id)?.label ?? id;

export const StockBadge = ({ stock, className = '' }) => {
  if (stock <= 0) return <span className={`stock-badge stock-badge-out ${className}`}>Épuisé</span>;
  if (stock <= 5) return <span className={`stock-badge stock-badge-low ${className}`}>Plus que {stock}</span>;
  return null;
};

const ProductCard = ({ product }) => {
  const { name, price, compareAt, category, stock, image } = product;
  const { addToCart, qtyInCart } = useStore();
  const oneSize = product.sizes?.length === 1;
  const canQuickAdd = oneSize && stock - qtyInCart(product.id) > 0;

  return (
    <article className="product-card group min-w-0">
      <Link to={`/produit/${product.id}`} className="block" aria-label={`${name}, ${formatPrice(price)}`}>
        <div className="product-card-image relative aspect-[4/5] overflow-hidden bg-luxe-beige/35">
          <ProductImage src={productImage(image)} alt={name} category={categoryLabel(category)} fit={product.imageFit} />
          <div className="absolute left-3 top-3 z-[1] flex flex-col items-start gap-1.5 sm:left-4 sm:top-4">
            <StockBadge stock={stock} />
            {compareAt > price && stock > 0 && (
              <span className="stock-badge stock-badge-sale">−{Math.round((1 - price / compareAt) * 100)}%</span>
            )}
          </div>
        </div>
      </Link>
      <div className="product-card-details">
        <p className="text-[10px] uppercase tracking-[0.16em] text-luxe-copper">{categoryLabel(category)}</p>
        <div className="product-card-meta mt-2">
          <h3 className="product-card-name font-serif text-base leading-snug sm:text-lg">
            <Link to={`/produit/${product.id}`} className="hover:text-luxe-copper">{name}</Link>
          </h3>
          <span className="product-card-price pt-0.5 text-right text-sm">
            {formatPrice(price)}
            {compareAt > price && <s className="block text-[11px] text-luxe-charcoal/45">{formatPrice(compareAt)}</s>}
          </span>
        </div>
        {stock > 0 && product.sizes?.length > 1 && (
          <p className="mt-2 text-[11px] tracking-wide text-luxe-charcoal/50">{product.sizes.join(' · ')}</p>
        )}
        {oneSize && (
          <button
            type="button"
            disabled={!canQuickAdd}
            onClick={() => addToCart(product, product.sizes[0])}
            className="text-link mt-3 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {stock <= 0 ? 'Épuisé' : canQuickAdd ? 'Ajouter au panier' : 'Stock max. au panier'}
          </button>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
