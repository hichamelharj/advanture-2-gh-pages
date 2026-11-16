import React from 'react';

const Newsletter = () => {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const address = email.trim().toLowerCase();
    if (!address) return;

    try {
      const savedEmails = JSON.parse(
        window.localStorage.getItem('store_newsletter_subscribers') || '[]'
      );
      if (!Array.isArray(savedEmails)) {
        throw new Error('Stored newsletter signups are not a list.');
      }

      if (!savedEmails.includes(address)) {
        window.localStorage.setItem(
          'store_newsletter_subscribers',
          JSON.stringify([...savedEmails, address])
        );
      }
      setStatus('saved');
      setEmail('');
    } catch (error) {
      console.error('Unable to save newsletter signup in this browser.', error);
      setStatus('error');
    }
  };

  return (
    <section className="section-padding bg-luxe-ivory">
      <div className="page-shell">
        <div className="newsletter-panel">
          <div className="max-w-xl">
          <span className="eyebrow text-luxe-copper">
            A note from LUXEBRAND
          </span>
          <h2 className="mt-4 font-serif text-3xl leading-tight tracking-[-0.035em] sm:text-4xl">
            A little more considered.
          </h2>
          <p className="mt-4 text-sm leading-7 text-luxe-charcoal/65">
            Save your address locally as part of this browser-only demo.
          </p>
          </div>
          <div className="w-full max-w-lg">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="newsletter-email">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="Your email address"
                className="newsletter-input"
              />
              <button type="submit" className="button-dark shrink-0">
                Save locally
                <span aria-hidden="true">↗</span>
              </button>
            </form>
            <p className="mt-3 text-[10px] leading-5 text-luxe-charcoal/50">
              Demo only: your address is saved in this browser. No email is sent.
            </p>
            {status === 'saved' && (
              <p role="status" className="mt-3 text-xs text-luxe-green">
                Saved in this browser. Thank you.
              </p>
            )}
            {status === 'error' && (
              <p role="alert" className="mt-3 text-xs text-luxe-copper">
                We could not save your address. Please check your browser storage settings.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;