import WaitlistForm from "./waitlist-form";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header" id="top">
        <div className="shell masthead">
          <a className="wordmark" href="#top" aria-label="CalltheSaul home">
            <span className="wordmark-sign" aria-hidden="true">§</span>
            <span>CalltheSaul</span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#process">How it works</a>
            <a href="#firm">The firm</a>
            <a href="#investors">For investors</a>
          </nav>
          <a className="button button-outline header-cta" href="#waitlist">Join the waitlist</a>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-content">
            <p className="eyebrow">Commercial contracting</p>
            <h1 id="hero-title">Lawyer-reviewed contracts within <span className="keep-together">12 hours.</span> <span className="hero-accent">One transparent fee.</span></h1>
            <p className="hero-description">CalltheSaul is an AI law firm specialized in commercial contracting, built for fast-growing companies.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#waitlist">Join the waitlist</a>
              <a className="text-link" href="#process">See how it works</a>
            </div>
          </div>
          <figure className="review-example">
            <figcaption className="example-caption">
              Illustrative contract review
            </figcaption>
            <div className="document">
              <div className="document-header">
                <span className="document-symbol" aria-hidden="true">§</span>
                <p>Services agreement</p>
              </div>
              <div className="document-clause">
                <p className="clause-title">4.2 · Renewal and termination</p>
                <p className="clause-text">
                  This agreement renews for a further term unless either party gives written notice at least{" "}
                  <span className="redline">
                    <span className="visually-hidden">[Replace </span><del>7 days</del>{" "}
                    <span className="visually-hidden">with </span><ins>30 days</ins><span className="visually-hidden">]</span>
                  </span>{" "}
                  before the end of the current term.
                </p>
              </div>
            </div>
            <div className="review-note">
              <span className="note-marker" aria-hidden="true" />
              <div>
                <p className="note-label">Lawyer’s note</p>
                <p>Ask for 30 days’ notice so your team has time to decide whether to renew.</p>
              </div>
            </div>
          </figure>
        </section>

        <section className="process section-space" id="process" aria-labelledby="process-title">
          <div className="shell process-grid">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 id="process-title">AI prepares.<br />Expert lawyer reviews.</h2>
            </div>
            <ol className="steps">
              <li>
                <span className="step-number" aria-hidden="true">1</span>
                <div>
                  <h3>Share the agreement</h3>
                  <p>Tell us what you’re signing and which terms matter to your team.</p>
                </div>
              </li>
              <li>
                <span className="step-number" aria-hidden="true">2</span>
                <div>
                  <h3>AI prepares the work</h3>
                  <p>AI prepares a first pass using the agreement and the context you’ve shared.</p>
                </div>
              </li>
              <li>
                <span className="step-number" aria-hidden="true">3</span>
                <div>
                  <h3>A lawyer reviews it</h3>
                  <p>An expert lawyer reviews the agreement and proposed edits before the work comes back to you.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="shell section-space firm" id="firm" aria-labelledby="firm-title">
          <div className="firm-copy">
            <p className="eyebrow">Who we are</p>
            <h2 id="firm-title">A law firm for the contracts you sign as you grow.</h2>
            <p>CalltheSaul focuses on commercial contracts. We bring together AI preparation and lawyer review for the agreements you sign with customers, suppliers, and partners.</p>
          </div>
          <div className="scope">
            <p className="eyebrow">Scope and pricing</p>
            <dl>
              <div>
                <dt>Commercial agreements</dt>
                <dd>Agreements that support day-to-day operations and new business.</dd>
              </div>
              <div>
                <dt>One fee per contract</dt>
                <dd>The fee, scope, and turnaround terms are set before work begins.</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="investors section-space" id="investors" aria-labelledby="investor-title">
          <div className="shell investor-grid">
            <div>
              <p className="eyebrow">For investors</p>
              <h2 id="investor-title">A per-contract model for recurring work.</h2>
              <p className="investor-description">As companies grow, every new customer, supplier, and partner can bring another agreement to review. CalltheSaul is built around that recurring work.</p>
              <a className="button button-light" href="#investor-inquiry">Make an investor inquiry</a>
            </div>
            <dl className="investor-details">
              <div>
                <dt>Who we serve</dt>
                <dd>Fast-growing companies with commercial agreements to review and deals to close.</dd>
              </div>
              <div>
                <dt>What customers pay for</dt>
                <dd>One transparent fee for a defined scope of lawyer-reviewed contract work.</dd>
              </div>
              <div>
                <dt>How we deliver</dt>
                <dd>AI prepares the work so lawyers can focus their time on reviewing terms and edits.</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="shell section-space contact" id="waitlist" aria-labelledby="contact-title">
          <WaitlistForm />
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <a className="wordmark" href="#top">
            <span className="wordmark-sign" aria-hidden="true">§</span>
            <span>CalltheSaul</span>
          </a>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </>
  );
}
