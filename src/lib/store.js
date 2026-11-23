import React from 'react';

export const StoreContext = React.createContext(null);

export const useStore = () => {
  const value = React.useContext(StoreContext);
  if (!value) throw new Error('useStore must be used inside <StoreProvider>.');
  return value;
};

export const cartKey = (id, size) => `${id}::${size}`;
