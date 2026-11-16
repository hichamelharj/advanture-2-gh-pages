import { Link } from 'react-router-dom';

const currentYear = new Date().getFullYear();

const Footer = () => {

  return (
    <footer className="bg-luxe-charcoal text-luxe-ivory">
      <div className="page-shell py-16 sm:py-20">
        <div className="grid gap-12 border-b border-luxe-ivory/15 pb-14 md:grid-cols-[1.4fr_1fr_1fr] md:gap-16">
          <div className="max-w-sm">
            <Link to="/" className="wordmark wordmark-light">
              LUXEBRAND
              <span>OBJECTS FOR THE EVERYDAY</span>
            </Link>
            <p className="mt-6 text-sm leading-7 text-luxe-ivory/60">
              A considered collection for the everyday, and everything worth keeping.
            </p>
          </div>

          <div>
            <h2 className="eyebrow text-luxe-beige">Explore</h2>
            <ul className="mt-5 space-y-3 text-sm text-luxe-ivory/65">
              <li><Link to="/" className="footer-link">Shop</Link></li>
              <li><Link to="/journal" className="footer-link">Journal</Link></li>
              <li><Link to="/cart" className="footer-link">Shopping bag</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-luxe-beige">The details</h2>
            <ul className="mt-5 space-y-3 text-sm text-luxe-ivory/65">
              <li><Link to="/account" className="footer-link">Guest orders</Link></li>
              <li><Link to="/account" className="footer-link">Demo store information</Link></li>
              <li className="max-w-xs pt-1 text-xs leading-5 text-luxe-ivory/40">
                Orders are simulated and stored in this browser. No payment is taken.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-[9px] uppercase tracking-[0.15em] text-luxe-ivory/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {currentYear} LUXEBRAND</span>
          <span>Designed for a life well considered</span>
          <Link to="/account" className="footer-link w-fit">Demo details</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;