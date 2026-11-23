export const SUBSCRIBERS_KEY = 'luxe_drop_list';

export const readSubscribers = () => {
  try {
    const saved = JSON.parse(window.localStorage.getItem(SUBSCRIBERS_KEY) || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};
