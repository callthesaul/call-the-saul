import WaitlistForm from "./waitlist-form";

const comparisonRows = [
  { question: "Who does the work", tools: "You", firm: "We do" },
  { question: "Who’s accountable", tools: "You", firm: "A real law firm" },
  { question: "What you receive", tools: "A draft", firm: "Finished work" },
];

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
          <p className="eyebrow">Commercial contracting</p>
          <h1 id="hero-title">Lawyer-reviewed contracts within <span className="keep-together">12 hours.</span> <span className="hero-accent">One transparent fee.</span></h1>
          <p className="hero-description">We are an AI law firm specialized in commercial contracting, built for fast-growing companies.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#waitlist">Join the waitlist</a>
            <a className="text-link" href="#process">See how it works</a>
          </div>
        </section>

        <section className="comparison section-space" id="comparison" aria-labelledby="comparison-title">
          <div className="shell">
            <h2 id="comparison-title">We handle the contract work.</h2>
            <p>Send us an agreement to review or tell us what you need drafted.</p>
            <div className="comparison-card">
              <table className="comparison-table">
                <caption className="visually-hidden">AI tools compared with CalltheSaul</caption>
                <colgroup>
                  <col className="comparison-question" />
                  <col className="comparison-tools" />
                  <col className="comparison-firm" />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col"><span className="visually-hidden">Question</span></th>
                    <th scope="col">AI tools</th>
                    <th scope="col">CalltheSaul</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map(({ question, tools, firm }) => (
                    <tr key={question}>
                      <th scope="row">{question}</th>
                      <td><span className="comparison-mark" aria-hidden="true">×</span>{tools}</td>
                      <td><span className="comparison-mark" aria-hidden="true">✓</span>{firm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="process section-space" id="process" aria-labelledby="process-title">
          <div className="shell">
            <header className="process-heading">
              <p className="eyebrow">How it works</p>
              <h2 id="process-title">AI prepares. Expert lawyer reviews.</h2>
              <p>Follow a sample services agreement from your first request to the lawyer’s edits.</p>
            </header>
            <ol className="workflow" role="list">
              <li className="workflow-stage">
                <div className="stage-copy">
                  <span className="step-number" aria-hidden="true">1</span>
                  <h3>Share the agreement.</h3>
                  <p>Send the contract and tell us what’s at stake. Your priorities give the review a starting point.</p>
                </div>
                <figure className="example-panel">
                  <figcaption className="example-caption">Example intake</figcaption>
                  <div className="example-card">
                    <div className="example-card-heading">
                      <span className="document-symbol" aria-hidden="true">§</span>
                      <p>Supplier services agreement</p>
                    </div>
                    <div className="request-body">
                      <p className="note-label">From your team</p>
                      <p>We’re about to sign with a new supplier. Can you check how the agreement renews and how much notice we need to give?</p>
                    </div>
                  </div>
                </figure>
              </li>
              <li className="workflow-stage">
                <div className="stage-copy">
                  <span className="step-number" aria-hidden="true">2</span>
                  <h3>AI makes the first pass.</h3>
                  <p>AI identifies the relevant clauses and pulls out the terms your lawyer needs to check against your priorities.</p>
                </div>
                <figure className="example-panel prep-example">
                  <figcaption className="example-caption">Example first pass</figcaption>
                  <div className="example-card">
                    <div className="example-card-heading">
                      <p>Renewal terms · Clause 4.2</p>
                    </div>
                    <dl className="terms">
                      <div>
                        <dt>Renewal</dt>
                        <dd>Automatic</dd>
                      </div>
                      <div>
                        <dt>Notice period</dt>
                        <dd>7 days before the term ends</dd>
                      </div>
                      <div>
                        <dt>For the lawyer</dt>
                        <dd>Is 7 days enough time for the team to decide whether to renew?</dd>
                      </div>
                    </dl>
                  </div>
                </figure>
              </li>
              <li className="workflow-stage">
                <div className="stage-copy">
                  <span className="step-number" aria-hidden="true">3</span>
                  <h3>Get the lawyer’s edits.</h3>
                  <p>A lawyer reviews the agreement and proposed changes. You get a marked-up contract with notes explaining what to raise before signing.</p>
                </div>
                <figure className="example-panel review-example">
                  <figcaption className="example-caption">Example lawyer review</figcaption>
                  <div className="example-card">
                    <div className="example-card-heading">
                      <span className="document-symbol" aria-hidden="true">§</span>
                      <p>Supplier services agreement</p>
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
