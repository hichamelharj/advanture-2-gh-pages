import React from 'react';
import { normalizeMoroccanPhone } from '../lib/format';
import { SUBSCRIBERS_KEY, readSubscribers } from '../lib/subscribers';

const Newsletter = () => {
  const [phone, setPhone] = React.useState('');
  const [status, setStatus] = React.useState(null);

  const handleSubmit = event => {
    event.preventDefault();
    const normalized = normalizeMoroccanPhone(phone);
    if (!normalized) {
      setStatus('invalid');
      return;
    }
    try {
      const saved = readSubscribers();
      if (!saved.some(entry => entry.phone === normalized)) {
        window.localStorage.setItem(SUBSCRIBERS_KEY, JSON.stringify([...saved, { phone: normalized, at: new Date().toISOString() }]));
      }
      setStatus('saved');
      setPhone('');
    } catch (error) {
      console.error('Unable to save signup.', error);
      setStatus('error');
    }
  };

  return (
    <section className="section-padding bg-luxe-ivory">
      <div className="page-shell">
        <div className="newsletter-panel">
          <div className="max-w-xl">
            <span className="eyebrow text-luxe-copper">Liste VIP · Drop 02</span>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-[-0.035em] sm:text-4xl">
              Soyez prévenu avant tout le monde.
            </h2>
            <p className="mt-4 text-sm leading-7 text-luxe-charcoal/65">
              Les drops partent vite. Laissez votre numéro WhatsApp : on vous envoie un message
              24h avant la sortie, pour commander avant l’ouverture au public.
            </p>
          </div>
          <div className="w-full max-w-lg">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row" noValidate>
              <label className="sr-only" htmlFor="drop-phone">Numéro WhatsApp</label>
              <input
                id="drop-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                value={phone}
                onChange={event => { setPhone(event.target.value); setStatus(null); }}
                placeholder="06 12 34 56 78"
                className="newsletter-input"
                aria-invalid={status === 'invalid'}
              />
              <button type="submit" className="button-dark shrink-0">Je m’inscris <span aria-hidden="true">↗</span></button>
            </form>
            {status === 'invalid' && <p role="alert" className="mt-3 text-xs text-luxe-copper">Entrez un numéro marocain valide (06… ou 07…).</p>}
            {status === 'saved' && <p role="status" className="mt-3 text-xs text-luxe-green">C’est noté ! Vous serez prévenu sur WhatsApp avant le prochain drop.</p>}
            {status === 'error' && <p role="alert" className="mt-3 text-xs text-luxe-copper">Impossible d’enregistrer pour le moment. Réessayez.</p>}
            <p className="mt-3 text-[11px] leading-5 text-luxe-charcoal/50">Pas de spam : un message par drop, maximum.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
