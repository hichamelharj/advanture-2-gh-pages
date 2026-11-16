import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="editorial-hero overflow-hidden bg-luxe-green text-luxe-ivory">
      <div className="mx-auto grid min-h-[680px] max-w-[1600px] grid-cols-1 lg:min-h-[740px] lg:grid-cols-[0.88fr_1.12fr]">
        <div className="flex flex-col justify-center px-6 py-20 sm:px-10 lg:px-16 xl:px-24">
          <span className="eyebrow mb-8 text-luxe-beige">
            Considered pieces · Since always
          </span>
          <h1 className="max-w-3xl font-serif text-[clamp(3.2rem,7vw,6.6rem)] leading-[0.96] tracking-[-0.055em]">
            A quieter kind
            <br />
            <em className="font-normal">of forever.</em>
          </h1>
          <p className="mt-8 max-w-md text-sm leading-7 text-luxe-ivory/75 sm:text-base">
            Objects for the lives we lead, and the journeys that shape them.
            Thoughtful in form. Made to be kept close.
          </p>
          <Link
            to="/#shop"
            className="button-light mt-10 w-fit"
          >
            Discover the collection
            <span aria-hidden="true">↗</span>
          </Link>
          <div className="mt-16 flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-luxe-ivory/55">
            <span className="h-px w-10 bg-luxe-copper" />
            The LUXEBRAND collection
          </div>
        </div>

        <div className="editorial-hero-image relative min-h-[440px] overflow-hidden lg:min-h-full">
          <img
            src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80"
            alt="A sculptural leather carryall in warm natural light"
            className="absolute inset-0 h-full w-full object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-luxe-ivory px-4 py-3 text-luxe-charcoal sm:bottom-10 sm:left-10">
            <span className="font-serif text-lg italic">01</span>
            <span className="h-7 w-px bg-luxe-beige" />
            <span className="text-[9px] uppercase leading-4 tracking-[0.16em]">
              Everyday,
              <br />
              considered
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;