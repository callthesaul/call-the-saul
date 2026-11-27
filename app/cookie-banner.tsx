"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

type Choice = "necessary" | "all";
type Consent = { choice: Choice; at: string; version: number };

const storageKey = "callthesaul:cookie-consent";
const storageEvent = "callthesaul:cookie-consent-change";
const serverSnapshot = "server"; // the prerendered page never shows the banner
const consentVersion = 1;
const maxAgeMs = 365 * 24 * 60 * 60 * 1000; // ask again after 12 months

function readStorage() {
  try {
    return localStorage.getItem(storageKey) ?? "";
  } catch {
    return ""; // storage blocked: ask again
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(storageEvent, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(storageEvent, onChange);
  };
}

/* Rebuilds a valid consent record from stored text, or returns null (missing, malformed, expired). */
function parseConsent(raw: string): Consent | null {
  try {
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (typeof value !== "object" || value === null) return null;
    const { choice, at, version } = value as Record<string, unknown>;
    if ((choice !== "necessary" && choice !== "all") || typeof at !== "string" || version !== consentVersion) return null;
    const time = Date.parse(at);
    if (Number.isNaN(time) || Date.now() - time > maxAgeMs) return null;
    return { choice, at, version };
  } catch {
    return null; // unreadable: ask again
  }
}

function saveConsent(choice: Choice) {
  try {
    const consent: Consent = { choice, at: new Date().toISOString(), version: consentVersion };
    localStorage.setItem(storageKey, JSON.stringify(consent));
  } catch {
    // Storage blocked: the choice holds for this visit only.
  }
  window.dispatchEvent(new Event(storageEvent));
}

/* Cookie banner, laid out like large law firms' banners: a white bar across the bottom with the
   statement on the left and the two choices on the right. The site sets no optional cookies yet,
   so both choices are stored for when it does. Any element with data-cookie-settings reopens it. */
export default function CookieBanner({ basePath }: { basePath: string }) {
  const stored = useSyncExternalStore(subscribe, readStorage, () => serverSnapshot);
  const [reopened, setReopened] = useState(false);
  const [dismissed, setDismissed] = useState(false); // closes the banner even when storage is blocked

  useEffect(() => {
    const reopen = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest("[data-cookie-settings]")) {
        setDismissed(false);
        setReopened(true);
      }
    };
    document.addEventListener("click", reopen);
    return () => document.removeEventListener("click", reopen);
  }, []);

  function choose(choice: Choice) {
    saveConsent(choice);
    setReopened(false);
    setDismissed(true);
  }

  const undecided = stored !== serverSnapshot && parseConsent(stored) === null;
  if (dismissed || !(reopened || undecided)) return null;

  return (
    <section className="cookie-banner" role="dialog" aria-modal="false" aria-labelledby="cookie-banner-title">
      <div className="cookie-banner-copy">
        <h2 id="cookie-banner-title">About Your Privacy</h2>
        <p>
          This website uses cookies and similar storage. Necessary ones (essential to make our website work) are
          always on; any others are only used if you accept them. You can change your choice at any time with the
          &lsquo;Cookie settings&rsquo; link in the footer of our website.
        </p>
        <a className="cookie-banner-link" href={`${basePath}/privacy/#cookies`}>Cookies Statement</a>
      </div>
      <div className="cookie-banner-actions">
        <button type="button" className="cookie-banner-button" onClick={() => choose("necessary")}>
          Necessary Cookies Only
        </button>
        <button type="button" className="cookie-banner-button" onClick={() => choose("all")}>
          Accept All Cookies
        </button>
      </div>
      <button type="button" className="cookie-banner-close" aria-label="Close" onClick={() => choose("necessary")}>
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
        </svg>
      </button>
    </section>
  );
}
