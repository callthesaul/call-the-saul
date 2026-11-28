"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { WaitlistButton } from "./waitlist-dialog";

type Logo = { src: string; width: number; height: number };

/* The header sits transparent over the hero film at the top of the page and becomes a white
   bar with one hairline once the visitor scrolls. On other pages (`home` set) the links point
   back to the landing page and the bar is always white, since there is no film behind it.
   "Partnership" opens a small menu: For investors (its own page) and For lawyers.
   Phones get a hamburger instead: the logo, the waitlist button and ☰, which opens a panel
   with every link. */
export default function SiteHeader({
  logo,
  showWaitlist,
  basePath = "",
  home = "",
}: {
  logo: Logo;
  showWaitlist: boolean;
  basePath?: string;
  home?: string;
}) {
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false); // the phone panel
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => setAtTop(window.scrollY < 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Close the Partnership menu on a click outside it or on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuRef.current?.querySelector("button")?.focus();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // The phone panel closes on Escape and when the screen grows past the phone layout.
  useEffect(() => {
    if (!navOpen) return;
    const wide = window.matchMedia("(min-width: 42.01rem)");
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setNavOpen(false);
      burgerRef.current?.focus();
    };
    const onWide = () => { if (wide.matches) setNavOpen(false); };
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [navOpen]);

  const closeNav = () => setNavOpen(false);

  // A mouse opens the menu on hover as well as on click; touch and keyboard use the click.
  const hover = (open: boolean) => (event: ReactPointerEvent) => {
    if (event.pointerType === "mouse") setMenuOpen(open);
  };

  return (
    <header className={["site-header", atTop && !home && !navOpen ? "is-top" : "", navOpen ? "is-open" : ""].filter(Boolean).join(" ")}>
      <nav className="masthead" aria-label="Main navigation">
        <div className="masthead-links">
          <a className="masthead-link" href={`${home}#process`}>How it works</a>
          <a className="masthead-link" href={`${home}#firm`}>Contracts</a>
        </div>
        <a className="wordmark" href={home || "#top"} aria-label="Call the Saul home">
          <img {...logo} alt="" />
        </a>
        <div className="masthead-actions">
          <div
            ref={menuRef}
            className="masthead-menu masthead-partnership"
            onPointerEnter={hover(true)}
            onPointerLeave={hover(false)}
          >
            <button
              type="button"
              className="masthead-link masthead-menu-button"
              aria-expanded={menuOpen}
              aria-controls="partnership-menu"
              // A mouse already opened it on hover, so its click keeps it open; touch and keyboard toggle.
              onClick={(event) => {
                const mouse = (event.nativeEvent as PointerEvent).pointerType === "mouse";
                setMenuOpen((open) => (mouse ? true : !open));
              }}
            >
              Partnership <ChevronDown size={14} strokeWidth={2.5} aria-hidden />
            </button>
            <div id="partnership-menu" className="masthead-dropdown" hidden={!menuOpen}>
              <a href={`${basePath}/investors/`} onClick={() => setMenuOpen(false)}>For investors</a>
              <a href={`${home}#lawyers`} onClick={() => setMenuOpen(false)}>For lawyers</a>
            </div>
          </div>
          {showWaitlist ? (
            <WaitlistButton className="button button-primary header-cta">Join the waitlist</WaitlistButton>
          ) : (
            <a className="button button-primary header-cta" href={`${home}#comparison`}>Compare</a>
          )}
          <button
            ref={burgerRef}
            type="button"
            className="masthead-burger"
            aria-expanded={navOpen}
            aria-controls="mobile-nav"
            aria-label={navOpen ? "Close menu" : "Open menu"}
            onClick={() => setNavOpen((open) => !open)}
          >
            {navOpen ? <X size={26} strokeWidth={2} aria-hidden /> : <Menu size={26} strokeWidth={2} aria-hidden />}
          </button>
        </div>
      </nav>
      <nav id="mobile-nav" className="mobile-nav" aria-label="Menu" hidden={!navOpen}>
        <a href={`${home}#process`} onClick={closeNav}>How it works</a>
        <a href={`${home}#firm`} onClick={closeNav}>Contracts</a>
        <p className="mobile-nav-group">Partnership</p>
        <a className="mobile-nav-sub" href={`${basePath}/investors/`} onClick={closeNav}>For investors</a>
        <a className="mobile-nav-sub" href={`${home}#lawyers`} onClick={closeNav}>For lawyers</a>
      </nav>
    </header>
  );
}
