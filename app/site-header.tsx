"use client";

import { useEffect, useState } from "react";
import { WaitlistButton } from "./waitlist-dialog";

type Logo = { src: string; width: number; height: number };

/* The header sits transparent over the hero film at the top of the page and becomes a white
   bar with one hairline once the visitor scrolls. */
export default function SiteHeader({ logo, showWaitlist }: { logo: Logo; showWaitlist: boolean }) {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const update = () => setAtTop(window.scrollY < 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={atTop ? "site-header is-top" : "site-header"}>
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
  );
}
