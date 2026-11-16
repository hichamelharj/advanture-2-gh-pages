import React from 'react';

const ProductImage = ({ src, alt, category, fit = 'cover' }) => {
  const [imageState, setImageState] = React.useState({ src, status: 'loading' });
  const status = imageState.src === src ? imageState.status : 'loading';
  const imageFit = fit === 'contain' ? 'object-contain' : 'object-cover';

  if (status === 'error') {
    return (
      <div
        role="img"
        aria-label={`${alt}; image unavailable`}
        className="flex h-full w-full flex-col items-center justify-center bg-luxe-green px-4 text-center text-luxe-ivory"
      >
        <span className="font-serif text-3xl tracking-[0.18em]">L</span>
        <span className="mt-3 text-[8px] uppercase tracking-[0.2em] text-luxe-beige">
          {category}
        </span>
        <span className="mt-2 text-[8px] uppercase tracking-[0.14em] text-luxe-ivory/70">
          Image unavailable
        </span>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {status === 'loading' && (
        <div role="status" className="absolute inset-0 grid place-items-center bg-luxe-beige/45">
          <span className="sr-only">Loading image for {alt}</span>
          <span aria-hidden="true" className="h-5 w-5 animate-pulse border border-luxe-green/60" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setImageState({ src, status: 'loaded' })}
        onError={() => setImageState({ src, status: 'error' })}
        className={`h-full w-full ${imageFit} object-center transition-[opacity,transform] duration-700 group-hover:scale-[1.035]${status === 'loaded' ? ' opacity-100' : ' opacity-0'}`}
      />
    </div>
  );
};

export default ProductImage;