import React from 'react';
import StoreContext from './StoreContext';

const COLLECTIONS = [
  { name: 'Leather goods', category: 'Accessories', feature: 'Premium Leather Bag', note: 'Made for everyday', number: '01' },
  { name: 'Watches & accessories', category: 'Accessories', feature: 'Minimalist Watch', note: 'The finishing touch', number: '02' },
  { name: 'Travel', category: 'Luggage', feature: 'Canvas Weekend Bag', note: 'Made for the long way', number: '03' },
  { name: 'Clothing', category: 'Clothing', feature: 'Cashmere Sweater', note: 'Quietly distinctive', number: '04' },
];

const FeaturedCollections = ({ onSelectCategory }) => {
  const { products } = React.useContext(StoreContext);

  return (
    <section className="section-padding bg-luxe-ivory">
      <div className="page-shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow text-luxe-copper">A considered wardrobe</span>
            <h2 className="editorial-heading mt-4">Collections with intention.</h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-luxe-charcoal/65">
            A small world of lasting pieces, chosen for their utility, material
            and quiet character.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {COLLECTIONS.map(collection => {
            const product = products.find(item => item.name === collection.feature) ??
              products.find(item => item.category === collection.category);
            if (!product) return null;

            return (
              <button
                type="button"
                key={collection.name}
                onClick={() => onSelectCategory(collection.category)}
                className="collection-card group text-left"
                aria-label={`Explore ${collection.name} collection`}
              >
                <span className="collection-card-image">
                  <img
                    src={product.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                  <span className="collection-card-number">{collection.number}</span>
                  <span className="collection-card-action" aria-hidden="true">↗</span>
                </span>
                <span className="mt-4 flex items-baseline justify-between gap-2">
                  <span className="font-serif text-lg sm:text-xl">{collection.name}</span>
                  <span className="hidden text-[9px] uppercase tracking-[0.16em] text-luxe-charcoal/50 sm:inline">
                    {collection.note}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;