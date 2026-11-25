import { Check, PenLine, X } from "lucide-react";
import WaitlistDialog, { WaitlistButton } from "./waitlist-dialog";
import WorkflowCarousel from "./workflow-carousel";
import { siteLogo } from "../lib/site-metadata";

const comparisonRows = [
  { question: "Who does the work", tools: "You", firm: "We do" },
  { question: "Who’s accountable", tools: "You", firm: "A real law firm" },
  { question: "What you receive", tools: "A draft", firm: "Finished work" },
];

const contractTypes = [
  "Master services agreements",
  "Sales agreements",
  "Purchasing agreements",
  "NDAs",
  "Terms & conditions",
  "DPAs",
];

const iconProps = { size: 16, strokeWidth: 1.5, "aria-hidden": true } as const;

export default function LandingPage({
  basePath = "",
  showWaitlist = true,
}: {
  basePath?: string;
  showWaitlist?: boolean;
}) {
  const logo = { ...siteLogo, src: `${basePath}${siteLogo.src}` };
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
            {showWaitlist ? (
              <WaitlistButton className="button button-primary header-cta">Join the waitlist</WaitlistButton>
            ) : (
              <a className="button button-primary header-cta" href="#comparison">Compare</a>
            )}
          </div>
        </nav>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">
              Lawyer-reviewed contracts within <span className="keep-together">24 hours</span>{" "}
              <span className="hero-accent">One transparent fee</span>
            </h1>
            <p className="hero-description">We are an AI law firm specializing in commercial contracts, built for fast-growing companies</p>
            <div className="hero-actions">
              {showWaitlist ? (
                <>
                  <WaitlistButton className="button button-primary">Join the waitlist</WaitlistButton>
                  <a className="text-link" href="#process">See how it works</a>
                </>
              ) : (
                <>
                  <a className="button button-primary" href="#process">See how it works</a>
                  <a className="text-link" href="#firm">View contracts</a>
                </>
              )}
            </div>
          </div>

          <figure className="hero-document" aria-label="Example of a clause reviewed and signed off by a lawyer">
            <div className="sheet sheet-under" aria-hidden="true" />
            <div className="sheet">
              <div className="sheet-heading">
                <p>Shareholders’ agreement</p>
                <span className="sheet-meta">Draft 2 · redlined</span>
              </div>
              <div className="document-clause">
                <p className="clause-title">7.2 Founder vesting</p>
                <p className="clause-text">
                  Founder shares vest monthly over{" "}
                  <span className="redline">
                    <del>two years</del>{" "}
                    <ins>four years with a one-year cliff</ins>
                  </span>.{" "}
                  <span className="redline"><del>Unvested shares are kept by a founder who leaves.</del></span>
                </p>
              </div>
              <div className="review-note">
                <span className="note-marker" aria-hidden="true" />
                <div>
                  <p className="note-label">Lawyer’s note</p>
                  <p>Investors expect four-year vesting with a cliff. Setting it now protects the company if a co-founder leaves early and saves renegotiating at your seed round.</p>
                </div>
              </div>
              <div className="signoff-status-wrap" aria-hidden="true">
                <div>
                  <p className="signoff-status">
                    <PenLine {...iconProps} />
                    <span>Being reviewed by your lead lawyer<span className="typing-dots">...</span></span>
                  </p>
                </div>
              </div>
              <div className="signoff-reveal">
                <div>
                  <div className="sheet-signoff">
                    <span className="signoff-label">Reviewed and approved</span>
                    <svg className="signature" viewBox="0 0 410 190" width="410" height="190" fill="none" aria-hidden="true">
                      <path className="signature-oval" pathLength={1} d="M184 40c-6-4-18-2-34 6C110 66 52 110 26 146c-14 20-10 34 10 30 40-8 104-50 134-80 8-8 12-16 14-24" />
                      <path className="signature-letters" pathLength={1} d="M170 96c4-8 10-24 14-30 2 10-2 26 2 28 6-4 10-22 16-30 2 12-2 26 4 26 6-2 10-18 16-26 2 10-2 22 4 22 10-4 22-20 36-44 4-8 6-12 10-16" />
                      <path className="signature-stroke" pathLength={1} d="M214 150c8-36 18-82 30-142" />
                      <path className="signature-bar" d="M176 106c62-6 136-12 226-18-84 9-150 15-224 22-4 0-6-3-2-4z" />
                    </svg>
                    <span className="signature-role">Lawyer</span>
                  </div>
                </div>
              </div>
            </div>
          </figure>
        </section>

        <section className="process section-space" aria-labelledby="process-title">
          <WorkflowCarousel id="process">
            <header className="process-heading">
              <h2 id="process-title" aria-label="AI prepares. Expert lawyer reviews and confirms.">
                <span className="process-heading-display" aria-hidden="true">
                  <span>AI prepares</span>{" "}
                  <span className="process-expert">
                    <span className="process-review-line">
                      <span className="process-accent">Expert lawyer</span>{" "}<span className="review-mark"><span className="review-word">reviews and</span></span>
                    </span>{" "}
                    <span>confirms</span>
                  </span>
                </span>
              </h2>
              <p>Legal AI tools want to make you faster. We do the work for you.</p>
            </header>
            <ol className="workflow" role="list">
              <li className="workflow-stage">
                <div className="stage-copy">
                  <span className="step-number">Step 1</span>
                  <h3>Send it where your team already works</h3>
                  <p>We work where you work: Slack, Teams, Trello or email. Drop the contract or request in your channel and the work starts.</p>
                </div>
                <figure className="example-panel" aria-label="Request and reply">
                  <div className="sheet intake-thread">
                    <div className="intake-message card-cycle">
                      <span className="intake-avatar" aria-hidden="true">T</span>
                      <div>
                        <p className="note-label">Your team</p>
                        <p>We’re bringing on a new developer. Can you draft an NDA before we share our source code?</p>
                      </div>
                    </div>
                    <div className="intake-response">
                      <div className="intake-message intake-answer card-cycle">
                        <span className="intake-avatar intake-avatar-saul"><img {...logo} alt="" /></span>
                        <div>
                          <p className="note-label">Saul</p>
                          <p>Done ✅ The NDA is ready to send to your developer. Signed off by Sahar, your lead lawyer.</p>
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
                  <span className="step-number">Step 2</span>
                  <h3>Our AI runs the first review, adapted to your context</h3>
                  <p>We apply your confidentiality rules to the first draft of the NDA.</p>
                </div>
                <figure className="example-panel" aria-label="Legal profile">
                  <div className="sheet">
                    <div className="sheet-heading">
                      <p>Your legal profile</p>
                      <span className="sheet-meta">Confidentiality</span>
                    </div>
                    <ul className="profile-standards" role="list">
                      <li className="card-cycle"><Check {...iconProps} /> Protect source code and technical docs</li>
                      <li className="card-cycle"><Check {...iconProps} /> Limit use to the agreed project</li>
                      <li className="card-cycle profile-restriction"><X {...iconProps} /> No sharing without written consent</li>
                    </ul>
                  </div>
                </figure>
              </li>
              <li className="workflow-stage">
                <div className="stage-copy">
                  <span className="step-number">Step 3</span>
                  <h3>An expert lawyer reviews and signs off</h3>
                  <p>A qualified lawyer checks the NDA line by line and signs off before it’s sent.</p>
                </div>
                <figure className="example-panel" aria-label="Signed-off contract">
                  <div className="sheet">
                    <div className="sheet-heading">
                      <p>Developer NDA</p>
                      <span className="signoff-stamp card-cycle"><span aria-hidden="true">✓</span> Signed off by a lawyer</span>
                    </div>
                    <div className="document-clause">
                      <p className="clause-title">3.1 Use and disclosure</p>
                      <p className="clause-text">
                        The developer may use confidential information for{" "}
                        <span className="redline">
                          <del>any business purpose</del>{" "}
                          <ins>the agreed project only</ins>
                        </span>. Sharing requires written consent.{" "}
                        <span className="redline"><del>Subcontractors are exempt.</del></span>
                      </p>
                    </div>
                  </div>
                  <div className="review-note review-note-card">
                    <span className="note-marker" aria-hidden="true" />
                    <div>
                      <p className="note-label">Lawyer’s note</p>
                      <p>Your source code is a company asset. The NDA limits its use to this project.</p>
                    </div>
                  </div>
                </figure>
              </li>
            </ol>
          </WorkflowCarousel>
        </section>

        <section className="comparison section-space" id="comparison" aria-labelledby="comparison-title">
          <div className="shell">
            <h2 id="comparison-title">We handle the contract work</h2>
            <p>Send us an agreement to review or tell us what you need drafted</p>
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
                      <td><span className="comparison-cell"><X {...iconProps} />{tools}</span></td>
                      <td><span className="comparison-cell"><Check {...iconProps} />{firm}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section-space contracts" id="firm" aria-labelledby="contracts-title">
          <div className="shell contracts-inner">
            <h2 id="contracts-title">We review your commercial contracts</h2>
            <ul className="contract-types" role="list">
              {contractTypes.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="partnership section-space" id="partnership" aria-labelledby="partnership-title">
          <div className="shell partnership-inner">
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

      </main>

      {showWaitlist && <WaitlistDialog />}

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
