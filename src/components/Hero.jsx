import { Link } from 'react-router-dom';
import { formatPrice, productImage } from '../lib/format';
import { useStore } from '../lib/store';

const Hero = () => {
  const { products } = useStore();
  const featured = products.filter(product => product.featured && product.stock > 0);
  const tiles = (featured.length >= 3 ? featured : products).slice(0, 3);

  return (
  <section className="overflow-hidden bg-luxe-green text-luxe-ivory">
    <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:min-h-[700px] lg:grid-cols-[0.95fr_1.05fr]">
      <div className="flex flex-col justify-center px-6 py-16 sm:px-10 sm:py-20 lg:px-16 xl:px-24">
        <span className="eyebrow mb-7 text-luxe-beige">Drop 01 · Hiver 2026 · Casablanca</span>
        <h1 className="max-w-3xl font-serif text-[clamp(2.9rem,7vw,6.2rem)] leading-[0.98] tracking-[-0.05em]">
          Le poids
          <br />
          <em className="font-normal">du bon coton.</em>
        </h1>
        <p className="mt-7 max-w-md text-[15px] leading-7 text-luxe-ivory/75 sm:text-base">
          Hoodies 450 GSM, cargos et casquettes pensés au Maroc. Des pièces lourdes,
          bien coupées, faites pour durer plus d’une saison.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/#shop" className="button-light">
            Découvrir le drop <span aria-hidden="true">↓</span>
          </Link>
          <Link to="/infos#tailles" className="button-ghost-light">Guide des tailles</Link>
        </div>
        <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-luxe-ivory/15 pt-6">
          {[['450', 'GSM'], ['24–72h', 'Livraison'], ['COD', 'Paiement']].map(([value, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd className="font-serif text-2xl">{value}</dd>
              <dd className="mt-1 text-[10px] uppercase tracking-[0.16em] text-luxe-ivory/55">{label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative grid min-h-[420px] grid-cols-2 gap-2 bg-luxe-green p-2 sm:min-h-[520px] lg:min-h-full lg:gap-3 lg:p-3">
        {tiles.map((product, index) => (
          <Link
            key={product.id}
            to={`/produit/${product.id}`}
            className={`hero-tile${index === 0 ? ' row-span-2' : ''}`}
            aria-label={`Voir ${product.name}`}
          >
            <img src={productImage(product.image)} alt="" fetchPriority={index === 0 ? 'high' : undefined} />
            <span className="hero-tile-label">{product.name.split(' — ')[0]} · {formatPrice(product.price)}</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
  );
};

export default Hero;
