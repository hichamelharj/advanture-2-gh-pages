import { formatPrice } from './format';

export const whatsappLink = (number, text = '') => {
  const clean = String(number || '').replace(/[^\d]/g, '');
  return `https://wa.me/${clean}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
};

export const buildOrderMessage = order => {
  const lines = [
    `Salam 👋 Nouvelle commande ${order.id}`,
    '',
    ...order.items.map(item => `• ${item.name} — Taille ${item.size} × ${item.qty} = ${formatPrice(item.price * item.qty)}`),
    '',
    `Sous-total : ${formatPrice(order.subtotal)}`,
    `Livraison : ${order.shipping === 0 ? 'Gratuite' : formatPrice(order.shipping)}`,
    `Total à payer à la livraison : ${formatPrice(order.total)}`,
    '',
    `👤 ${order.customer.name}`,
    `📱 ${order.customer.phone}`,
    `📍 ${order.customer.city} — ${order.customer.address}`,
  ];
  if (order.customer.note) lines.push(`📝 ${order.customer.note}`);
  return lines.join('\n');
};
