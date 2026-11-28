import BusinessModelCanvas from "./business-model-canvas";
import CookieBanner from "./cookie-banner";
import SiteHeader from "./site-header";
import WaitlistDialog from "./waitlist-dialog";
import { siteLogo } from "../lib/site-metadata";

/* The investors page: the business model canvas on its own screen, linked from the
   Investors card in the landing page's Partnership section. */
export default function InvestorsPage({ basePath = "" }: { basePath?: string }) {
  const logo = { ...siteLogo, src: `${basePath}${siteLogo.src}` };
  const home = `${basePath}/`;
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <CookieBanner basePath={basePath} />
      <SiteHeader logo={logo} showWaitlist basePath={basePath} home={home} />

      <main id="main" tabIndex={-1} className="investors-page">
        <div className="shell">
          <header className="investors-intro">
            <p className="investors-eyebrow">Investors</p>
            <h1>A law firm built to scale</h1>
            <p>Our business model on one canvas. Open any block for the detail, or let it walk you through.</p>
          </header>
          <BusinessModelCanvas />
        </div>
      </main>

      <WaitlistDialog />

      <footer className="site-footer">
        <div className="shell footer-inner">
          <a className="wordmark" href={home}>
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
