import { Link } from 'react-router-dom';
import { productImage } from '../lib/format';

const STORIES = [
  {
    tag: 'Matière',
    title: 'Pourquoi 450 GSM change tout.',
    text: 'Le GSM, c’est le poids du tissu au mètre carré. Un hoodie classique tourne autour de 280. À 450, le molleton tombe droit, ne bouloche pas et garde sa forme lavage après lavage.',
    image: 'products/hoodie-grey.svg',
    link: '/produit/2',
    wide: true,
  },
  {
    tag: 'Style',
    title: 'Trois façons de porter le cargo.',
    text: 'Avec le hoodie sable pour un ton sur ton, avec un tee ivoire pour l’été, ou tout en noir avec la casquette minimal.',
    image: 'products/cargo-charcoal.svg',
    link: '/produit/4',
  },
  {
    tag: 'Inspiration',
    title: 'L’étoile du zellige, en version brodée.',
    text: 'Huit branches, deux carrés superposés : le motif qu’on retrouve sur les murs des riads devient un détail discret sur notre tee heavyweight.',
    image: 'products/tee-green.svg',
    link: '/produit/10',
    full: true,
  },
];

const JournalPage = () => (
  <main>
    <header className="journal-intro">
      <div className="page-shell">
        <span className="eyebrow text-luxe-copper">Le journal</span>
        <h1 className="editorial-heading mt-5 max-w-3xl">Matières, coupes et inspirations.</h1>
        <p className="mt-6 max-w-xl text-[15px] leading-7 text-luxe-charcoal/70">
          Les coulisses du drop : comment on choisit nos tissus, comment porter nos pièces, et d’où viennent nos idées.
        </p>
      </div>
    </header>

    <section className="section-padding bg-luxe-ivory">
      <div className="page-shell grid gap-6 md:grid-cols-3">
        {STORIES.map(story => (
          <article key={story.title} className={`journal-card${story.wide ? ' md:col-span-2 md:grid md:grid-cols-[0.9fr_1.1fr]' : ''}${story.full ? ' md:col-span-3 md:grid md:grid-cols-[0.7fr_1.3fr]' : ''}`}>
            <img src={productImage(story.image)} alt="" loading="lazy" className="journal-card-image h-full w-full object-cover" />
            <div className="journal-card-copy flex flex-col justify-center">
              <span className="eyebrow text-luxe-copper">{story.tag}</span>
              <h2 className="mt-3 font-serif text-2xl leading-tight sm:text-3xl">{story.title}</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-luxe-charcoal/70">{story.text}</p>
              <Link to={story.link} className="text-link mt-6 w-fit">Voir la pièce <span aria-hidden="true">↗</span></Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  </main>
);

export default JournalPage;
