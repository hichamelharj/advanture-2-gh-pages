import { productImage } from '../lib/format';

const BrandStory = () => (
  <section className="section-padding overflow-hidden bg-luxe-green text-luxe-ivory">
    <div className="page-shell">
      <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-24">
        <div className="relative mx-auto w-full max-w-[480px]">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={productImage('products/tee-ivory.svg')}
              alt="T-shirt ivoire au motif étoile inspiré du zellige"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="absolute -bottom-5 -right-4 hidden font-serif text-7xl italic text-luxe-beige/70 lg:block">L.</span>
        </div>

        <div className="max-w-xl py-4 lg:py-12">
          <span className="eyebrow text-luxe-beige">Notre histoire</span>
          <h2 className="mt-5 font-serif text-4xl leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            Né à Casa,
            <br />
            <em className="font-normal">porté partout.</em>
          </h2>
          <p className="mt-7 text-[15px] leading-7 text-luxe-ivory/75 sm:text-base">
            On en avait marre des hoodies qui se déforment après trois lavages. Alors on a fait
            les nôtres : du coton lourd, des coutures solides et des coupes oversize qui tombent bien.
          </p>
          <p className="mt-4 text-[15px] leading-7 text-luxe-ivory/75 sm:text-base">
            Chaque drop est produit en petite quantité. Le motif étoile vient du zellige —
            un clin d’œil discret à nos racines.
          </p>
          <div className="mt-9 h-px w-20 bg-luxe-copper" />
          <span className="mt-5 block text-[10px] uppercase tracking-[0.2em] text-luxe-beige">
            Petites séries · Coton lourd · Fait pour durer
          </span>
        </div>
      </div>
    </div>
  </section>
);

export default BrandStory;
