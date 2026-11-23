import { useStore } from '../lib/store';
import { formatPrice } from '../lib/format';
import { whatsappLink } from '../lib/whatsapp';
import { SIZE_GUIDE } from '../data/products';

const GUIDE_LABELS = {
  HOODIES: ['Hoodies', 'Longueur', 'Largeur poitrine'],
  'T-SHIRTS': ['T-shirts', 'Longueur', 'Largeur poitrine'],
  PANTALONS: ['Pantalons', 'Longueur', 'Tour de taille'],
};

export const SizeGuideTable = ({ category }) => {
  const rows = SIZE_GUIDE[category];
  const [, colA, colB] = GUIDE_LABELS[category] ?? ['', 'A', 'B'];
  if (!rows) return null;
  return (
    <div className="overflow-x-auto">
      <table className="size-table">
        <thead><tr><th>Taille</th><th>{colA} (cm)</th><th>{colB} (cm)</th></tr></thead>
        <tbody>{rows.map(([size, a, b]) => <tr key={size}><td>{size}</td><td>{a}</td><td>{b}</td></tr>)}</tbody>
      </table>
    </div>
  );
};

const FAQ = [
  ['Je paie quand ?', 'À la livraison, en espèces, au livreur. Vous pouvez ouvrir le colis et vérifier vos articles avant de payer.'],
  ['Comment savoir si ma commande est confirmée ?', 'Après avoir validé, envoyez-nous la commande sur WhatsApp. On vous répond pour confirmer l’adresse et le jour de livraison.'],
  ['Les hoodies taillent comment ?', 'Coupe oversize : prenez votre taille habituelle pour un look ample, une taille en dessous pour un look plus ajusté.'],
  ['Comment entretenir le coton heavyweight ?', 'Lavage à 30°C sur l’envers, pas de sèche-linge. Il garde sa forme et sa couleur beaucoup plus longtemps.'],
];

const InfoPage = () => {
  const { settings } = useStore();

  return (
    <main>
      <header className="journal-intro">
        <div className="page-shell">
          <span className="eyebrow text-luxe-copper">Aide</span>
          <h1 className="editorial-heading mt-5">Livraison, retours & tailles.</h1>
          <p className="mt-6 max-w-xl text-[15px] leading-7 text-luxe-charcoal/70">
            Tout ce qu’il faut savoir avant de commander. Une autre question ?{' '}
            <a className="underline underline-offset-4 hover:text-luxe-copper" href={whatsappLink(settings.whatsappNumber)} target="_blank" rel="noreferrer">Écrivez-nous sur WhatsApp</a>.
          </p>
        </div>
      </header>

      <div className="page-shell grid gap-14 py-16 sm:py-20 lg:grid-cols-2 lg:gap-20">
        <section id="livraison" className="scroll-mt-28">
          <h2 className="font-serif text-3xl">Livraison</h2>
          <ul className="info-list mt-6">
            <li><strong>Partout au Maroc</strong>, en 24 à 72h ouvrées selon la ville.</li>
            <li><strong>{formatPrice(settings.deliveryFee)}</strong> la livraison, <strong>gratuite dès {formatPrice(settings.freeShippingThreshold)}</strong> d’achat.</li>
            <li><strong>Paiement à la livraison</strong> en espèces. Aucune carte bancaire demandée.</li>
            <li>Vous pouvez <strong>ouvrir et vérifier le colis</strong> devant le livreur avant de payer.</li>
          </ul>
        </section>

        <section id="retours" className="scroll-mt-28">
          <h2 className="font-serif text-3xl">Échanges & retours</h2>
          <ul className="info-list mt-6">
            <li><strong>Échange de taille sous 7 jours</strong> après réception, article non porté et non lavé.</li>
            <li>Écrivez-nous sur WhatsApp avec votre numéro de commande : on organise l’échange.</li>
            <li>Les frais de retour sont à votre charge, sauf si l’article est défectueux ou ne correspond pas à la commande.</li>
          </ul>
        </section>

        <section id="tailles" className="scroll-mt-28 lg:col-span-2">
          <h2 className="font-serif text-3xl">Guide des tailles</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-luxe-charcoal/65">
            Mesures du vêtement à plat, en centimètres. Comparez avec une pièce que vous aimez déjà porter.
          </p>
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            {Object.keys(SIZE_GUIDE).map(category => (
              <div key={category}>
                <h3 className="mb-3 text-xs uppercase tracking-[0.16em] text-luxe-copper">{GUIDE_LABELS[category]?.[0] ?? category}</h3>
                <SizeGuideTable category={category} />
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="scroll-mt-28 lg:col-span-2">
          <h2 className="font-serif text-3xl">Questions fréquentes</h2>
          <div className="mt-6 divide-y divide-luxe-beige border-y border-luxe-beige">
            {FAQ.map(([question, answer]) => (
              <details key={question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg">
                  {question}<span className="text-luxe-copper transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-luxe-charcoal/70">{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default InfoPage;
