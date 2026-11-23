import React from 'react';
import { BrowserRouter, HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { StoreProvider } from './components/StoreContext';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';
import CartToast from './components/CartToast';
import AccountPage from './pages/Account';
import CartPage from './pages/Cart';
import HomePage from './pages/Home';
import InfoPage from './pages/Info';
import JournalPage from './pages/Journal';
import ProductPage from './pages/Product';
import AdminPage from './pages/admin/Admin';

// GitHub Pages serves the app from a sub-path; the router must match it too.
// VITE_HASH_ROUTER=1 builds a version that works from any folder (previews).
const useHash = import.meta.env.VITE_HASH_ROUTER === '1';
const Router = useHash ? HashRouter : BrowserRouter;
const basename = useHash ? undefined : import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  React.useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

const Shell = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-luxe-ivory text-luxe-charcoal">
      <ScrollManager />
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/produit/:id" element={<ProductPage />} />
        <Route path="/panier" element={<CartPage />} />
        <Route path="/commandes" element={<AccountPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/infos" element={<InfoPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/cart" element={<Navigate to="/panier" replace />} />
        <Route path="/account" element={<Navigate to="/commandes" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
      {!isAdmin && <CartToast />}
    </div>
  );
};

const App = () => (
  <StoreProvider>
    <Router basename={basename}>
      <Shell />
    </Router>
  </StoreProvider>
);

export default App;
