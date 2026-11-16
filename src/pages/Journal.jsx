const JournalPage = () => {
  return (
    <main>
      <header className="journal-intro">
        <div className="page-shell">
          <span className="eyebrow text-luxe-copper">The journal</span>
          <h1 className="editorial-heading mt-5 max-w-3xl">
            Notes on the things we keep.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-luxe-charcoal/65 sm:text-base">
            A slower look at material, movement and the everyday objects that
            become part of our story.
          </p>
        </div>
      </header>

      <section className="section-padding bg-luxe-ivory">
        <div className="page-shell grid gap-6 md:grid-cols-3">
          <article className="journal-card md:col-span-2">
            <div className="journal-card-image journal-image-material" role="img" aria-label="Warm leather tones and natural materials" />
            <div className="journal-card-copy">
              <span className="eyebrow text-luxe-copper">Materials</span>
              <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
                The beauty of a well-loved leather.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-luxe-charcoal/65">
                Natural texture is never static. With time and use, a leather
                piece develops its own character—an honest record of where it
                has been.
              </p>
            </div>
          </article>
          <article className="journal-card">
            <div className="journal-card-image journal-image-travel" role="img" aria-label="A quiet moment before a journey" />
            <div className="journal-card-copy">
              <span className="eyebrow text-luxe-copper">Travel</span>
              <h2 className="mt-3 font-serif text-2xl leading-tight">
                Carry only what matters.
              </h2>
              <p className="mt-4 text-sm leading-7 text-luxe-charcoal/65">
                A thoughtful packing ritual begins with choosing fewer, better
                companions.
              </p>
            </div>
          </article>
          <article className="journal-card md:col-span-3 md:grid md:grid-cols-[0.8fr_1.2fr]">
            <div className="journal-card-image journal-image-detail" role="img" aria-label="A quiet, timeless wardrobe" />
            <div className="journal-card-copy flex flex-col justify-center">
              <span className="eyebrow text-luxe-copper">Point of view</span>
              <h2 className="mt-3 font-serif text-3xl leading-tight">
                An edit, not an excess.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-luxe-charcoal/65">
                Personal style is often less about adding something new, and
                more about finding the pieces that feel like you.
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default JournalPage;