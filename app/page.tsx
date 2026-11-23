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
            <h1 id="hero-title">Lawyer-reviewed contracts within <span className="keep-together">12 hours.</span> <em>One transparent fee.</em></h1>
            <p className="hero-description">CalltheSaul is an AI law firm specialized in commercial contracting, built for fast-growing companies.</p>
            <a className="button button-primary" href="#waitlist">Join the waitlist</a>
          </div>
          <figure className="hero-figure">
            <img className="hero-image" src="/contract-review.jpg" alt="A hand marking a printed contract at a walnut desk" width="1000" height="1250" fetchPriority="high" />
            <figcaption className="review-note">
              <span className="review-note-label">Illustrative review</span>
              <span className="review-note-clause">§ 4.2 &nbsp; Renewal terms</span>
              <span className="review-note-text">Confirm the notice period before signing.</span>
            </figcaption>
          </figure>
        </section>

        <section className="process section-space" id="process" aria-labelledby="process-title">
          <div className="shell">
            <div className="opening-grid">
              <div>
                <p className="eyebrow">How it works</p>
                <h2 id="process-title">AI prepares.<br /><em>Expert lawyer reviews.</em></h2>
              </div>
              <p className="section-intro">From the first draft to the final review, you get a clear view of what needs attention before you sign.</p>
            </div>
            <ol className="steps">
              <li>
                <span className="step-number" aria-hidden="true">01</span>
                <h3>Share the agreement</h3>
                <p>Tell us what the contract is for, where you are in the deal, and what matters to your team.</p>
              </li>
              <li>
                <span className="step-number" aria-hidden="true">02</span>
                <h3>AI prepares the work</h3>
                <p>AI organizes the agreement and prepares a first pass against the details you’ve shared.</p>
              </li>
              <li>
                <span className="step-number" aria-hidden="true">03</span>
                <h3>A lawyer reviews it</h3>
                <p>An expert lawyer reviews the agreement and the proposed edits before the work comes back to you.</p>
              </li>
            </ol>
          </div>
        </section>

        <section className="shell section-space firm" id="firm" aria-labelledby="firm-title">
          <div className="firm-copy">
            <p className="eyebrow">Who we are</p>
            <h2 id="firm-title">A law firm for companies <em>that move quickly.</em></h2>
            <p>Commercial agreements are where growing companies turn conversations into commitments. We built CalltheSaul around that moment, with AI handling preparation and lawyers applying their judgment to the terms that matter.</p>
          </div>
          <div className="scope">
            <p className="eyebrow">Scope and pricing</p>
            <dl>
              <div>
                <dt>Commercial agreements</dt>
                <dd>For the contracts teams encounter while working with customers, vendors, and partners.</dd>
              </div>
              <div>
                <dt>One fee per contract</dt>
                <dd>See the fee, review scope, and turnaround terms before you book.</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="investors section-space" id="investors" aria-labelledby="investor-title">
          <div className="shell investor-grid">
            <div>
              <p className="eyebrow">For investors</p>
              <h2 id="investor-title">A repeat need.<br /><em>A per-contract model.</em></h2>
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
          <span>Commercial contracting for fast-growing companies.</span>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </>
  );
}
