// Default store settings. They can be changed from /admin → Paramètres
// (saved in the browser) — but put your real WhatsApp number here before going live.
export const DEFAULT_SETTINGS = {
  storeName: 'LUXEBRAND.MA',
  // Numéro WhatsApp au format international, sans "+" ni espaces (ex: 212612345678)
  whatsappNumber: '212600000000',
  instagram: 'luxebrand.ma',
  email: 'contact@luxebrand.ma',
  freeShippingThreshold: 500,
  deliveryFee: 35,
  // Démo uniquement : ce code n'est PAS une vraie sécurité (tout est côté navigateur).
  adminPin: '1234',
};

export const CITIES = [
  'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 'Oujda',
  'Kénitra', 'Tétouan', 'Salé', 'Témara', 'Mohammédia', 'El Jadida', 'Béni Mellal',
  'Nador', 'Safi', 'Khouribga', 'Laâyoune', 'Essaouira', 'Autre ville',
];

export const ORDER_STATUSES = ['Nouvelle', 'Confirmée', 'Expédiée', 'Livrée', 'Annulée'];
