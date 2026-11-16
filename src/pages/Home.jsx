import React from 'react';
import StoreContext from '../components/StoreContext';
import Hero from '../components/Hero';
import FeaturedCollections from '../components/FeaturedCollections';
import BrandStory from './BrandStory';
import Newsletter from './Newsletter';
import ProductGrid from '../components/ProductGrid';

const Home = () => {
  const { products, productsError } = React.useContext(StoreContext);
  const [category, setCategory] = React.useState('All');
  const [search, setSearch] = React.useState('');
  const [sort, setSort] = React.useState('featured');
  const [showAll, setShowAll] = React.useState(false);

  const uniqueProducts = React.useMemo(() => {
    const seen = new Set();
    return products.filter(product => {
      if (product.category === 'Home') return false;
      const signature = [product.name, product.category, product.price, product.image].join('|');
      if (seen.has(signature)) return false;
      seen.add(signature);
      return true;
    });
  }, [products]);

  const categories = ['All', ...new Set(uniqueProducts.map(product => product.category))];
  const normalizedSearch = search.trim().toLowerCase();
  const filteredProducts = uniqueProducts.filter(product => (
    (category === 'All' || product.category === category) &&
    `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(normalizedSearch)
  ));
  const sortedProducts = [...filteredProducts];

  if (sort === 'price-low') sortedProducts.sort((a, b) => a.price - b.price);
  if (sort === 'price-high') sortedProducts.sort((a, b) => b.price - a.price);
  if (sort === 'newest') {
    const newestValue = product => {
      const createdAt = Date.parse(product.createdAt || product.created_at || '');
      return Number.isNaN(createdAt) ? Number(product.id) || 0 : createdAt;
    };
    sortedProducts.sort((a, b) => newestValue(b) - newestValue(a));
  }

  const visibleProducts = showAll ? sortedProducts : sortedProducts.slice(0, 8);

  const selectCategory = selectedCategory => {
    setCategory(selectedCategory);
    setShowAll(false);
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main>
      <Hero />
      <FeaturedCollections onSelectCategory={selectCategory} />
      <section id="shop" className="section-padding scroll-mt-24 bg-[#F0EADF]">
        <div className="page-shell">
          <div className="section-heading items-end">
            <div>
              <span className="eyebrow text-luxe-copper">Selected for you</span>
              <h2 className="editorial-heading mt-4">The pieces we return to.</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-luxe-charcoal/65">
              Everyday companions, made more meaningful by the life you give them.
            </p>
          </div>

          <div className="mb-9 flex flex-col gap-5 border-y border-luxe-beige/70 py-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by collection">
              {categories.map(item => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                  className={`filter-chip${category === item ? ' filter-chip-active' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(190px,1fr)_auto] lg:w-[430px]">
              <label className="sr-only" htmlFor="product-search">Search pieces</label>
              <input
                id="product-search"
                type="search"
                value={search}
                onChange={event => {
                  setSearch(event.target.value);
                  setShowAll(false);
                }}
                placeholder="Search the collection"
                className="search-field"
              />
              <label className="sr-only" htmlFor="product-sort">Sort pieces</label>
              <select
                id="product-sort"
                value={sort}
                onChange={event => setSort(event.target.value)}
                className="search-field sm:w-[185px]"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </div>
          </div>

          {productsError && (
            <p role="alert" className="mb-6 border-l-2 border-luxe-copper bg-luxe-ivory/70 px-4 py-3 text-xs leading-6 text-luxe-charcoal/75">
              {productsError} The original catalog is shown instead.
            </p>
          )}

          {visibleProducts.length > 0 ? (
            <ProductGrid products={visibleProducts} />
          ) : (
            <div className="border-y border-luxe-beige/70 py-16 text-center">
              <p className="font-serif text-2xl text-luxe-charcoal/70">
                No pieces match your selection.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCategory('All');
                  setSearch('');
                }}
                className="button-outline mt-6"
              >
                Clear filters
              </button>
            </div>
          )}

          {sortedProducts.length > 8 && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => setShowAll(value => !value)}
                className="button-outline"
              >
                {showAll ? 'Show the edit' : 'View all pieces'}
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