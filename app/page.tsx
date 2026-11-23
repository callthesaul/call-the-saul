import WaitlistForm from "./waitlist-form";
import WorkflowCarousel from "./workflow-carousel";

const logo = { src: "/call-the-saul-logo.webp", width: 480, height: 233 };

const comparisonRows = [
  { question: "Who does the work", tools: "You", firm: "We do" },
  { question: "Who’s accountable", tools: "You", firm: "A real law firm" },
  { question: "What you receive", tools: "A draft", firm: "Finished work" },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <nav className="masthead" aria-label="Main navigation">
          <div className="masthead-links">
            <a className="masthead-link" href="#process">How it works</a>
            <a className="masthead-link" href="#firm">Contracts</a>
          </div>
          <a className="wordmark" href="#top" aria-label="Call the Saul home">
            <img {...logo} alt="" />
          </a>
          <div className="masthead-actions">
            <a className="masthead-link masthead-partnership" href="#partnership">Partnership</a>
            <a className="button button-primary header-cta" href="#waitlist">Join the waitlist</a>
          </div>
        </nav>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero shell" aria-labelledby="hero-title">
          <h1 id="hero-title">Lawyer-reviewed contracts within <span className="keep-together">12 hours.</span> <span className="hero-accent">One transparent fee.</span></h1>
          <p className="hero-description">We are an AI law firm specialized in commercial contracting, built for fast-growing companies.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#waitlist">Join the waitlist</a>
            <a className="text-link" href="#process">See how it works</a>
          </div>
        </section>

        <section className="process section-space" aria-labelledby="process-title">
          <WorkflowCarousel id="process">
            <header className="process-heading">
              <h2 id="process-title" aria-label="AI prepares. Expert lawyer reviews and Confirms.">
                <span className="process-heading-display" aria-hidden="true">
                  <span>AI prepares.</span>{" "}
                  <span className="process-expert">
                    <span className="process-review-line">
                      <span className="process-accent">Expert lawyer</span>{" "}<span className="review-mark"><span className="review-word">reviews</span></span><span>and</span>
                    </span>{" "}
                    <span>Confirms.</span>
                  </span>
                </span>
              </h2>
              <p>Legal AI tools want to make you faster. We do the work for you.</p>
            </header>
            <ol className="workflow" role="list">
              <li className="workflow-stage">
                <div className="stage-copy">
                  <span className="step-number" aria-hidden="true">1</span>
                  <h3>Better Call Saul</h3>
                  <p>We work where you work: Slack, Teams, Trello or Email. Drop the contract or request in your channel and the work starts.</p>
                </div>
                <figure className="example-panel" aria-label="Request and reply">
                  <div className="example-card intake-thread">
                    <div className="intake-message card-cycle">
                      <span className="intake-avatar" aria-hidden="true">T</span>
                      <div>
                        <p className="note-label">Your team</p>
                        <p>Can you review this supplier MSA? We’re especially concerned about the renewal and notice terms.</p>
                        <span className="intake-attachment"><span aria-hidden="true">§</span> Supplier_MSA.docx</span>
                      </div>
                    </div>
                    <div className="intake-response">
                      <div className="intake-message intake-answer card-cycle">
                        <span className="intake-avatar intake-avatar-saul"><img {...logo} alt="" /></span>
                        <div>
                          <p className="note-label">Saul</p>
                          <p>Done ✅ Redlined doc attached, plus a draft reply you can forward straight to them. Signed off by Sahar, your lead lawyer.</p>
                        </div>
                      </div>
                      <div className="intake-typing card-cycle" aria-hidden="true">
                        Saul is typing<span className="typing-dots">...</span>
                      </div>
                    </div>
                  </div>
                </figure>
              </li>
              <li className="workflow-stage">
                <div className="stage-copy">
                  <span className="step-number" aria-hidden="true">2</span>
                  <h3>Our AI runs the first review, adapted to your context</h3>
                  <p>We learn your standards once and apply them to every contract.</p>
                </div>
                <figure className="example-panel prep-example" aria-label="Legal profile">
                  <div className="example-card">
                    <div className="example-card-heading">
                      <p>Your legal profile</p>
                    </div>
                    <ul className="profile-standards" role="list">
                      <li className="card-cycle"><span aria-hidden="true">✓</span> Payment terms of 30 days or less</li>
                      <li className="card-cycle"><span aria-hidden="true">✓</span> Liability capped at 12 months of fees</li>
                      <li className="card-cycle profile-restriction"><span aria-hidden="true">×</span> No unlimited liability</li>
                    </ul>
                  </div>
                </figure>
              </li>
              <li className="workflow-stage">
                <div className="stage-copy">
                  <span className="step-number" aria-hidden="true">3</span>
                  <h3>An expert lawyer reviews and signs off</h3>
                  <p>No contract leaves without a qualified lawyer reading it line by line.</p>
                </div>
                <figure className="example-panel review-example" aria-label="Signed-off contract">
                  <div className="example-card">
                    <div className="example-card-heading">
                      <p>Supplier MSA</p>
                      <span className="signoff-stamp card-cycle"><span aria-hidden="true">✓</span> Signed off</span>
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
          </WorkflowCarousel>
        </section>

        <section className="comparison section-space" id="comparison" aria-labelledby="comparison-title">
          <div className="shell">
            <h2 id="comparison-title">We handle the contract work.</h2>
            <p>Send us an agreement to review or tell us what you need drafted.</p>
            <div className="comparison-card">
              <table className="comparison-table">
                <caption className="visually-hidden">AI tools compared with Call the Saul</caption>
                <colgroup>
                  <col className="comparison-question" />
                  <col className="comparison-tools" />
                  <col className="comparison-firm" />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col"><span className="visually-hidden">Question</span></th>
                    <th scope="col">AI tools</th>
                    <th scope="col">
                      <span className="comparison-brand"><img {...logo} alt="Call the Saul" /></span>
                    </th>
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

        <section className="section-space contracts" id="firm" aria-labelledby="contracts-title">
          <div className="shell">
            <h2 id="contracts-title">We review your commercial contracts <span>in Europe</span></h2>
            <ul className="contract-types" role="list">
              {["Master services agreements", "Sales agreements", "Purchasing agreements", "NDAs", "Terms & conditions", "DPAs"].map((name) => (
                <li key={name}><span aria-hidden="true">✓</span>{name}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="partnership section-space" id="partnership" aria-labelledby="partnership-title">
          <div className="shell">
            <h2 id="partnership-title">Partnership</h2>
            <div className="partnership-grid">
              <section id="lawyers" aria-labelledby="lawyers-title">
                <h3 id="lawyers-title">Lawyers</h3>
              </section>
              <section id="investors" aria-labelledby="investors-title">
                <h3 id="investors-title">Investors</h3>
              </section>
            </div>
          </div>
        </section>

        <section className="shell section-space contact" id="waitlist" aria-labelledby="contact-title">
          <WaitlistForm />
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <a className="wordmark" href="#top">
            <img {...logo} alt="Call the Saul" />
          </a>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </>
  );
}
