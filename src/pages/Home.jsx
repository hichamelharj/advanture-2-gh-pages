import React from 'react';
import { useStore } from '../lib/store';
import { CATEGORIES } from '../data/products';
import Hero from '../components/Hero';
import FeaturedCollections from '../components/FeaturedCollections';
import TrustBadges from '../components/TrustBadges';
import BrandStory from './BrandStory';
import Newsletter from './Newsletter';
import ProductGrid from '../components/ProductGrid';

const PAGE_SIZE = 8;

const Home = () => {
  const { products, productsError } = useStore();
  const [category, setCategory] = React.useState('ALL');
  const [search, setSearch] = React.useState('');
  const [sort, setSort] = React.useState('featured');
  const [inStockOnly, setInStockOnly] = React.useState(false);
  const [showAll, setShowAll] = React.useState(false);

  const usedCategories = CATEGORIES.filter(item => products.some(product => product.category === item.id));
  const extraCategories = [...new Set(products.map(product => product.category))]
    .filter(id => !CATEGORIES.some(item => item.id === id))
    .map(id => ({ id, label: id }));
  const filters = [{ id: 'ALL', label: 'Tout' }, ...usedCategories, ...extraCategories];

  const normalizedSearch = search.trim().toLowerCase();
  const filtered = products.filter(product => (
    (category === 'ALL' || product.category === category) &&
    (!inStockOnly || product.stock > 0) &&
    `${product.name} ${product.category} ${product.description ?? ''}`.toLowerCase().includes(normalizedSearch)
  ));

  const sorted = [...filtered];
  if (sort === 'featured') sorted.sort((a, b) => (Number(b.featured || 0) - Number(a.featured || 0)) || (Number(b.stock > 0) - Number(a.stock > 0)));
  if (sort === 'price-low') sorted.sort((a, b) => a.price - b.price);
  if (sort === 'price-high') sorted.sort((a, b) => b.price - a.price);
  if (sort === 'newest') {
    const time = product => Date.parse(product.createdAt || '') || Number(product.id) || 0;
    sorted.sort((a, b) => time(b) - time(a));
  }

  const visible = showAll ? sorted : sorted.slice(0, PAGE_SIZE);

  const selectCategory = selected => {
    setCategory(selected);
    setShowAll(false);
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const resetFilters = () => {
    setCategory('ALL');
    setSearch('');
    setInStockOnly(false);
  };

  return (
    <main>
      <Hero />
      <TrustBadges />
      <FeaturedCollections onSelectCategory={selectCategory} />
      <section id="shop" className="section-padding scroll-mt-24 bg-[#F0EADF]">
        <div className="page-shell">
          <div className="section-heading items-end">
            <div>
              <span className="eyebrow text-luxe-copper">La boutique</span>
              <h2 className="editorial-heading mt-4">Toute la collection.</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-luxe-charcoal/65">
              Commandez en 1 minute, payez à la livraison. Vous pouvez vérifier votre colis avant de payer.
            </p>
          </div>

          <div className="mb-9 flex flex-col gap-5 border-y border-luxe-beige/70 py-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:flex-wrap lg:overflow-visible lg:pb-0" role="group" aria-label="Filtrer par collection">
              {filters.map(item => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => { setCategory(item.id); setShowAll(false); }}
                  aria-pressed={category === item.id}
                  className={`filter-chip shrink-0${category === item.id ? ' filter-chip-active' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-[minmax(190px,1fr)_auto_auto] lg:w-[560px]">
              <label className="sr-only" htmlFor="product-search">Rechercher</label>
              <input
                id="product-search"
                type="search"
                value={search}
                onChange={event => { setSearch(event.target.value); setShowAll(false); }}
                placeholder="Rechercher (hoodie, cargo…)"
                className="search-field col-span-2 sm:col-span-1"
              />
              <label className="sr-only" htmlFor="product-sort">Trier</label>
              <select id="product-sort" value={sort} onChange={event => setSort(event.target.value)} className="search-field sm:w-[170px]">
                <option value="featured">Sélection</option>
                <option value="newest">Nouveautés</option>
                <option value="price-low">Prix croissant</option>
                <option value="price-high">Prix décroissant</option>
              </select>
              <label className="search-field flex cursor-pointer items-center gap-2 whitespace-nowrap">
                <input type="checkbox" checked={inStockOnly} onChange={event => setInStockOnly(event.target.checked)} className="accent-luxe-green" />
                En stock
              </label>
            </div>
          </div>

          {productsError && (
            <p role="alert" className="mb-6 border-l-2 border-luxe-copper bg-luxe-ivory/70 px-4 py-3 text-xs leading-6 text-luxe-charcoal/75">
              {productsError}
            </p>
          )}

          <p className="mb-6 text-xs text-luxe-charcoal/55" aria-live="polite">
            {sorted.length} pièce{sorted.length > 1 ? 's' : ''}
          </p>

          {visible.length > 0 ? (
            <ProductGrid products={visible} />
          ) : (
            <div className="border-y border-luxe-beige/70 py-16 text-center">
              <p className="font-serif text-2xl text-luxe-charcoal/70">Aucune pièce ne correspond à votre recherche.</p>
              <button type="button" onClick={resetFilters} className="button-outline mt-6">Effacer les filtres</button>
            </div>
          )}

          {sorted.length > PAGE_SIZE && (
            <div className="mt-12 text-center">
              <button type="button" onClick={() => setShowAll(value => !value)} className="button-outline">
                {showAll ? 'Voir moins' : `Voir les ${sorted.length} pièces`}
                <span aria-hidden="true">{showAll ? '↑' : '↓'}</span>
              </button>
            </div>
          )}
        </div>
      </section>
      <BrandStory />
      <Newsletter />
    </main>
  );
};

export default Home;
