// Catalogue de départ. Les visuels dans public/products/ sont des illustrations
// provisoires : remplacez-les par vos vraies photos (même nom de fichier, ou
// changez le champ "image" depuis /admin).
export const CATEGORIES = [
  { id: 'HOODIES', label: 'Hoodies', note: '450 GSM, coupe oversize' },
  { id: 'T-SHIRTS', label: 'T-shirts', note: 'Coton épais 240 GSM' },
  { id: 'PANTALONS', label: 'Pantalons', note: 'Cargo, parachute, jogging' },
  { id: 'CASQUETTES', label: 'Casquettes', note: 'La touche finale' },
];

const APPAREL_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const PANTS_SIZES = ['S', 'M', 'L', 'XL'];

export const INITIAL_PRODUCTS = [
  {
    id: 1, name: 'Hoodie Heavyweight Oversize — Noir', price: 450, compareAt: 520, category: 'HOODIES',
    image: 'products/hoodie-black.svg', stock: 15, sizes: APPAREL_SIZES, featured: true, createdAt: '2026-09-01',
    description: 'Molleton 450 GSM brossé à l’intérieur, coupe oversize, épaules tombantes et capuche doublée. Le hoodie qu’on ne quitte plus de l’hiver.',
  },
  {
    id: 2, name: 'Hoodie Heavyweight Oversize — Gris chiné', price: 450, category: 'HOODIES',
    image: 'products/hoodie-grey.svg', stock: 10, sizes: APPAREL_SIZES, createdAt: '2026-09-01',
    description: 'Molleton 450 GSM brossé à l’intérieur, coupe oversize, épaules tombantes et capuche doublée.',
  },
  {
    id: 3, name: 'Hoodie Heavyweight Oversize — Sable', price: 450, category: 'HOODIES',
    image: 'products/hoodie-sand.svg', stock: 4, sizes: APPAREL_SIZES, featured: true, createdAt: '2026-10-15',
    description: 'La couleur du désert de Merzouga. Molleton 450 GSM, coupe oversize, capuche doublée.',
  },
  {
    id: 9, name: 'T-shirt Heavyweight « Étoile » — Ivoire', price: 220, category: 'T-SHIRTS',
    image: 'products/tee-ivory.svg', stock: 25, sizes: APPAREL_SIZES, featured: true, createdAt: '2026-11-01',
    description: 'Coton épais 240 GSM, col côtelé serré, motif étoile inspiré du zellige brodé ton sur ton.',
  },
  {
    id: 10, name: 'T-shirt Heavyweight « Étoile » — Vert Atlas', price: 220, category: 'T-SHIRTS',
    image: 'products/tee-green.svg', stock: 20, sizes: APPAREL_SIZES, createdAt: '2026-11-01',
    description: 'Coton épais 240 GSM, col côtelé serré, motif étoile inspiré du zellige brodé en écru.',
  },
  {
    id: 4, name: 'Pantalon Cargo Street — Anthracite', price: 380, category: 'PANTALONS',
    image: 'products/cargo-charcoal.svg', stock: 12, sizes: PANTS_SIZES, featured: true, createdAt: '2026-09-10',
    description: 'Cargo multi-poches en twill résistant, chevilles ajustables par cordon.',
  },
  {
    id: 5, name: 'Pantalon Parachute — Noir', price: 350, category: 'PANTALONS',
    image: 'products/parachute-black.svg', stock: 10, sizes: PANTS_SIZES, createdAt: '2026-10-01',
    description: 'Nylon léger, jambe large, bas élastiqué. Une silhouette ample et moderne.',
  },
  {
    id: 6, name: 'Jogging Essentiel — Gris', price: 320, category: 'PANTALONS',
    image: 'products/sweat-grey.svg', stock: 15, sizes: PANTS_SIZES, createdAt: '2026-09-01',
    description: 'Molleton épais assorti au hoodie gris, coupe fuselée, poignets côtelés.',
  },
  {
    id: 7, name: 'Casquette Vintage Délavée — Marine', price: 150, category: 'CASQUETTES',
    image: 'products/cap-navy.svg', stock: 20, sizes: ['Unique'], createdAt: '2026-09-01',
    description: 'Coton délavé effet vintage, visière courbée, fermeture réglable en laiton.',
  },
  {
    id: 8, name: 'Casquette Minimal Brodée — Noir', price: 180, category: 'CASQUETTES',
    image: 'products/cap-black.svg', stock: 0, sizes: ['Unique'], createdAt: '2026-09-01',
    description: 'Ligne minimale, monogramme « L. » brodé ton sur ton.',
  },
];

export const SIZE_GUIDE = {
  HOODIES: [['S', 66, 58], ['M', 69, 61], ['L', 72, 64], ['XL', 75, 67], ['XXL', 78, 70]],
  'T-SHIRTS': [['S', 70, 54], ['M', 72, 57], ['L', 74, 60], ['XL', 76, 63], ['XXL', 78, 66]],
  PANTALONS: [['S', 100, 74], ['M', 102, 78], ['L', 104, 82], ['XL', 106, 86]],
};
