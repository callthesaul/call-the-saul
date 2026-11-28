import type { CSSProperties } from "react";
import { Check, X } from "lucide-react";
import CookieBanner from "./cookie-banner";
import HeroFilmVideo from "./hero-film-video";
import SiteHeader from "./site-header";
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

// Official marks of the AI tools we compare against (nominative use; CC0 drawings, public/icons/icons-credits.json).
const aiTools = [
  { name: "ChatGPT", file: "openai.svg", width: 27, height: 28 },
  { name: "Gemini", file: "gemini.svg", width: 28, height: 28 },
  { name: "Claude", file: "claude.svg", width: 28, height: 28 },
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
      {/* Direct child of the page root beside header, main and footer: while open it makes those inert and
          takes focus. Shown fixed at the bottom. */}
      <CookieBanner basePath={basePath} />
      <SiteHeader logo={logo} showWaitlist={showWaitlist} />

      <main id="main" tabIndex={-1}>
        <section
          className="hero-film"
          aria-labelledby="hero-title"
          style={{ "--hero-poster": `url("${basePath}/images/hero-film-poster.webp")` } as CSSProperties}
        >
          {/* Muted, decorative loop: a founder's request in Slack, the lawyer signing, "Done" in the morning. */}
          <HeroFilmVideo basePath={basePath} />
          <div className="hero-film-scrim" aria-hidden="true" />
          <div className="hero-film-copy">
            <h1 id="hero-title">Lawyer-reviewed<br /> contracts, fast and<br /> priced for startups.</h1>
            <div className="hero-film-row">
              <p>A lawyer handles it within 24 hours.<br /> One transparent fee.</p>
              {showWaitlist ? (
                <WaitlistButton className="button button-primary">Join the waitlist</WaitlistButton>
              ) : (
                <a className="button button-primary" href="#process">See how it works</a>
              )}
            </div>
          </div>
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
                    <th scope="col" className="comparison-tools-head">
                      <span className="comparison-tools-label">AI tools</span>
                      {/* Decorative: the header reads "AI tools"; the names show on hover. An empty alt
                          also means a logo that fails to load leaves no broken icon or stray text. */}
                      <span className="comparison-ai-logos" aria-hidden="true">
                        {aiTools.map(({ name, file, width, height }) => (
                          <img key={name} src={`${basePath}/icons/${file}`} alt="" title={name} width={width} height={height} />
                        ))}
                      </span>
                    </th>
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
          <nav className="footer-links" aria-label="Footer">
            <a href={`${basePath}/privacy/#cookies`}>Cookies Statement</a>
            <a href={`${basePath}/privacy/#cookies`} data-cookie-settings>Cookie settings</a>
            <a href="#top">Back to top</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
