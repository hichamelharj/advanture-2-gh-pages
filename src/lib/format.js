const numberFormat = new Intl.NumberFormat('fr-MA', { maximumFractionDigits: 0 });

export const formatPrice = value => `${numberFormat.format(Number(value) || 0)} DH`;

export const productImage = path => {
  if (!path) return '';
  if (/^(https?:|data:|blob:)/.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
};

// Moroccan mobile numbers: 06/07 + 8 digits, or +212 / 00212 + 6/7 + 8 digits.
export const normalizeMoroccanPhone = raw => {
  const digits = String(raw || '').replace(/[^\d]/g, '');
  if (/^0[5-7]\d{8}$/.test(digits)) return `212${digits.slice(1)}`;
  if (/^212[5-7]\d{8}$/.test(digits)) return digits;
  if (/^00212[5-7]\d{8}$/.test(digits)) return digits.slice(2);
  return null;
};

export const shippingFor = (subtotal, settings) => {
  if (subtotal <= 0) return 0;
  return subtotal >= settings.freeShippingThreshold ? 0 : settings.deliveryFee;
};
