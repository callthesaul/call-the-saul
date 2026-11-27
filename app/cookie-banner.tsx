"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type Choice = "necessary" | "all";
type Consent = { choice: Choice; at: string; version: number };

const storageKey = "callthesaul:cookie-consent";
const storageEvent = "callthesaul:cookie-consent-change";
/** Fired whenever the banner opens or closes; the hero film listens so it waits for a choice. */
export const cookieBannerEvent = "callthesaul:cookie-banner-change";
const consentVersion = 1;
const dayMs = 24 * 60 * 60 * 1000;
const maxAgeMs = 365 * dayMs; // ask again after 12 months

/* Client snapshot: the stored text, "" when missing or storage is blocked. The server snapshot is
   null, which no stored string can equal, so the prerendered page never shows the banner. */
function readStorage(): string {
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

/* Rebuilds a valid consent record from stored text, or returns null (missing, malformed,
   expired, or dated in the future). */
function parseConsent(raw: string): Consent | null {
  if (!raw) return null;
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null; // not JSON: ask again
  }
  if (typeof value !== "object" || value === null) return null;
  const { choice, at, version } = value as Record<string, unknown>;
  if ((choice !== "necessary" && choice !== "all") || typeof at !== "string" || version !== consentVersion) return null;
  const age = Date.now() - Date.parse(at);
  if (Number.isNaN(age) || age < -dayMs || age > maxAgeMs) return null;
  return { choice, at, version };
}

/** True while no valid choice is stored: the banner will ask, so the film should not start yet. */
export function cookieChoicePending() {
  return parseConsent(readStorage()) === null;
}

/** True while the banner is on screen (it marks <html data-cookie-banner="open">). */
export function cookieBannerOpen() {
  return document.documentElement.dataset.cookieBanner === "open";
}

function saveConsent(choice: Choice) {
  try {
    const consent: Consent = { choice, at: new Date().toISOString(), version: consentVersion };
    localStorage.setItem(storageKey, JSON.stringify(consent));
  } catch {
    // Storage blocked: nothing is saved; the dismissed state hides the banner until the page reloads.
  }
  window.dispatchEvent(new Event(storageEvent));
}

/* Cookie banner, laid out like large law firms' banners: a white bar across the bottom with the
   statement on the left and the two choices on the right, over a dimmed page that cannot be used
   until a choice is made (the rest of the page is inert, so this is a real modal dialog). The site
   sets no optional cookies yet, so both choices are stored for when it does. Any element with
   data-cookie-settings (the footer's "Cookie settings" link) reopens it; without JavaScript that
   link simply opens the statement. */
export default function CookieBanner({ basePath }: { basePath: string }) {
  const stored = useSyncExternalStore<string | null>(subscribe, readStorage, () => null);
  const [reopened, setReopened] = useState(false);
  const [dismissed, setDismissed] = useState(false); // closes the banner even when storage is blocked
  const bannerRef = useRef<HTMLElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const reopen = (event: MouseEvent) => {
      const trigger = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-cookie-settings]") : null;
      if (!trigger) return;
      event.preventDefault();
      returnFocusRef.current = trigger;
      setDismissed(false);
      setReopened(true);
    };
    document.addEventListener("click", reopen);
    return () => document.removeEventListener("click", reopen);
  }, []);

  const undecided = stored !== null && parseConsent(stored) === null;
  const open = !dismissed && (reopened || undecided);

  // While open: tell the film, make the rest of the page inert and move focus into the banner.
  useEffect(() => {
    const root = document.documentElement;
    const banner = bannerRef.current;
    if (!open || !banner) return;
    root.dataset.cookieBanner = "open";
    window.dispatchEvent(new Event(cookieBannerEvent));
    const background = [...(banner.parentElement?.children ?? [])].filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && element !== banner && !element.classList.contains("cookie-banner-backdrop") && !element.inert,
    );
    background.forEach((element) => { element.inert = true; });
    banner.focus({ preventScroll: true });
    return () => {
      background.forEach((element) => { element.inert = false; });
      delete root.dataset.cookieBanner;
      window.dispatchEvent(new Event(cookieBannerEvent));
    };
  }, [open]);

  function choose(choice: Choice) {
    const focusWasInBanner = bannerRef.current?.contains(document.activeElement) ?? false;
    saveConsent(choice);
    setReopened(false);
    setDismissed(true);
    if (!focusWasInBanner) return;
    // Give focus back to whatever opened the banner, or to the page itself on a first visit.
    const target = returnFocusRef.current ?? document.getElementById("main");
    target?.focus({ preventScroll: true });
    returnFocusRef.current = null;
  }

  if (!open) return null;

  return (
    <>
    <div className="cookie-banner-backdrop" aria-hidden="true" />
    <section ref={bannerRef} className="cookie-banner" role="dialog" aria-modal="true" aria-labelledby="cookie-banner-title" tabIndex={-1}>
      <div className="cookie-banner-copy">
        <h2 id="cookie-banner-title">About Your Privacy</h2>
        <p>
          This website uses cookies and similar storage. Necessary ones (essential to make our website work) are
          always on; others are only used if you accept them. You can change your choice at any time with
          &lsquo;Cookie settings&rsquo; in the footer.
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
      <button
        type="button"
        className="cookie-banner-close"
        aria-label="Close (necessary cookies only)"
        onClick={() => choose("necessary")}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
        </svg>
      </button>
    </section>
    </>
  );
}
