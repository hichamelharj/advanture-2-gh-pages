import React from 'react';

const BrandStory = () => {
  return (
    <section className="section-padding overflow-hidden bg-luxe-green text-luxe-ivory">
      <div className="page-shell">
        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-24">
          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80"
                alt="A close view of considered fabric and careful tailoring"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="absolute -bottom-5 -right-4 hidden font-serif text-7xl italic text-luxe-beige/70 lg:block">
              L.
            </span>
          </div>

          <div className="max-w-xl py-4 lg:py-12">
            <span className="eyebrow text-luxe-beige">
              The LUXEBRAND point of view
            </span>
            <h2 className="mt-5 font-serif text-4xl leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Less, chosen
              <br />
              <em className="font-normal">with care.</em>
            </h2>
            <p className="mt-7 text-sm leading-7 text-luxe-ivory/70 sm:text-base">
              We believe the most personal things are rarely the loudest. A
              beautifully worn leather, a familiar silhouette, a piece that
              finds its way into every journey.
            </p>
            <p className="mt-4 text-sm leading-7 text-luxe-ivory/70 sm:text-base">
              LUXEBRAND is an ongoing study in restraint: useful forms, enduring
              materials and details that reward a closer look.
            </p>
            <div className="mt-9 h-px w-20 bg-luxe-copper" />
            <span className="mt-5 block text-[9px] uppercase tracking-[0.2em] text-luxe-beige">
              A quieter kind of luxury
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;