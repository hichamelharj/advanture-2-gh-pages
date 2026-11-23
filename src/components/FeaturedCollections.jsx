import { CATEGORIES } from '../data/products';
import { productImage } from '../lib/format';
import { useStore } from '../lib/store';

const FeaturedCollections = ({ onSelectCategory }) => {
  const { products } = useStore();

  const collections = CATEGORIES.map((category, index) => {
    const inCategory = products.filter(product => product.category === category.id);
    const cover = inCategory.find(product => product.featured) ?? inCategory[0];
    return { ...category, cover, count: inCategory.length, number: String(index + 1).padStart(2, '0') };
  }).filter(collection => collection.cover);

  if (collections.length === 0) return null;

  return (
    <section className="section-padding bg-luxe-ivory">
      <div className="page-shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow text-luxe-copper">Les collections</span>
            <h2 className="editorial-heading mt-4">Peu de pièces. Les bonnes.</h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-luxe-charcoal/65">
            Une garde-robe courte, pensée pour se combiner : chaque pièce va avec toutes les autres.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {collections.map(collection => (
            <button
              type="button"
              key={collection.id}
              onClick={() => onSelectCategory(collection.id)}
              className="collection-card group text-left"
              aria-label={`Voir la collection ${collection.label}`}
            >
              <span className="collection-card-image">
                <img
                  src={productImage(collection.cover.image)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                />
                <span className="collection-card-number">{collection.number}</span>
                <span className="collection-card-action" aria-hidden="true">↗</span>
              </span>
              <span className="mt-4 flex items-baseline justify-between gap-2">
                <span className="font-serif text-lg sm:text-xl">{collection.label}</span>
                <span className="text-[10px] uppercase tracking-[0.14em] text-luxe-charcoal/50">
                  {collection.count} pièce{collection.count > 1 ? 's' : ''}
                </span>
              </span>
              <span className="mt-1 block text-xs text-luxe-charcoal/55">{collection.note}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
