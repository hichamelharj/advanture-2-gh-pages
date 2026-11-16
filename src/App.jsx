import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { StoreProvider } from './components/StoreContext';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AccountPage from './pages/Account';
import CartPage from './pages/Cart';
import HomePage from './pages/Home';
import JournalPage from './pages/Journal';

// GitHub Pages serves the app from a sub-path; the router must match it too.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

const App = () => (
  <StoreProvider>
    <Router basename={basename}>
      <div className="min-h-screen bg-luxe-ivory text-luxe-charcoal">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  </StoreProvider>
);

export default App;
