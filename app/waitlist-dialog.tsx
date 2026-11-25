"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore, type MouseEvent, type ReactNode } from "react";
import { waitlistFormUrl } from "../lib/site-metadata";

const dialogId = "waitlist-dialog";
const storageKey = "callthesaul:waitlist";
const storageEvent = "callthesaul:waitlist-change";
const joinedMessage = "callthesaul:waitlist-joined";
// Formaloo redirects the form iframe to https://callthesaul.com/waitlist-thanks.html after a
// submission; that page posts the answers here, so only messages from its origin are accepted.
const thanksOrigin = "https://callthesaul.com";
const autoCloseMs = 5000;

// Field alias -> max length. Mirrors the limits in public/waitlist-thanks.html.
const joinerLimits = { name: 100, company: 120, country: 80, role: 80, email: 254 } as const;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type JoinerField = keyof typeof joinerLimits;
type Joiner = Record<JoinerField, string> & { joinedAt: string };

/* Rebuilds a clean joiner from untrusted input (a postMessage or localStorage), or returns null. */
function toJoiner(value: unknown): Joiner | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const text = (key: string, max: number) =>
    typeof record[key] === "string" ? (record[key] as string).trim().slice(0, max) : "";

  const joiner = {
    name: text("name", joinerLimits.name),
    company: text("company", joinerLimits.company),
    country: text("country", joinerLimits.country),
    role: text("role", joinerLimits.role),
    email: text("email", joinerLimits.email),
    joinedAt: text("joinedAt", 40),
  };
  return joiner.name && emailPattern.test(joiner.email) ? joiner : null;
}

function parseJoiner(raw: string | null): Joiner | null {
  if (!raw) return null;
  try {
    return toJoiner(JSON.parse(raw));
  } catch {
    return null;
  }
}

function writeJoiner(joiner: Joiner | null) {
  try {
    if (joiner) localStorage.setItem(storageKey, JSON.stringify(joiner));
    else localStorage.removeItem(storageKey);
  } catch {
    // Storage can be blocked (private mode); the popup still works, it just won't remember.
  }
  window.dispatchEvent(new Event(storageEvent));
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(storageEvent, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(storageEvent, onChange);
  };
}

function readStorage() {
  try {
    return localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

function prefilledFormUrl(joiner: Joiner) {
  const url = new URL(waitlistFormUrl);
  for (const key of Object.keys(joinerLimits) as JoinerField[]) {
    if (joiner[key]) url.searchParams.set(key, joiner[key]);
  }
  return url.toString();
}

/* A real link to the form, upgraded to open the popup once the page is interactive. */
export function WaitlistButton({ className, children }: { className?: string; children: ReactNode }) {
  function open(event: MouseEvent<HTMLAnchorElement>) {
    const dialog = document.getElementById(dialogId);
    if (!(dialog instanceof HTMLDialogElement)) return;
    event.preventDefault();
    dialog.showModal();
  }

  return (
    <a className={className} href={waitlistFormUrl} onClick={open} aria-haspopup="dialog">
      {children}
    </a>
  );
}

export default function WaitlistDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const joiner = parseJoiner(useSyncExternalStore(subscribe, readStorage, () => null));
  // Fixed when "Edit my details" is clicked, so a newly saved joiner can't reload the form mid-flow.
  const [editUrl, setEditUrl] = useState<string | null>(null);
  const [showingThanks, setShowingThanks] = useState(false);
  const [formVersion, setFormVersion] = useState(0);

  const close = () => dialogRef.current?.close();

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== thanksOrigin) return;
      const data: unknown = event.data;
      if (!data || typeof data !== "object" || (data as { type?: unknown }).type !== joinedMessage) return;
      const next = toJoiner((data as { joiner?: unknown }).joiner);
      if (!next) return;

      writeJoiner(next);
      setShowingThanks(true);
      window.clearTimeout(closeTimer.current);
      closeTimer.current = window.setTimeout(() => dialogRef.current?.close(), autoCloseMs);
    }
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(closeTimer.current);
    };
  }, []);

  // Reset to the right view whenever the popup closes, however it was closed.
  function onClose() {
    window.clearTimeout(closeTimer.current);
    setShowingThanks(false);
    setEditUrl(null);
    setFormVersion((version) => version + 1);
  }

  // The dialog has no padding, so a click on the element itself is a click on the backdrop.
  function closeOnBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) close();
  }

  const showForm = !joiner || editUrl !== null || showingThanks;
  const formUrl = editUrl ?? waitlistFormUrl;

  let title = "Join the waitlist";
  let intro = "Tell us a little about your company and we’ll be in touch about early access.";
  if (showingThanks) {
    title = "You’re on the waitlist";
    intro = "Thanks for joining. This window closes on its own.";
  } else if (editUrl) {
    title = "Edit your details";
    intro = "Change anything that’s out of date and submit again.";
  } else if (joiner) {
    title = "You’re already on the waitlist";
    intro = "Your place and your $200 credit are saved.";
  }

  return (
    <dialog
      id={dialogId}
      ref={dialogRef}
      className="waitlist-dialog"
      aria-labelledby="waitlist-title"
      onClick={closeOnBackdrop}
      onClose={onClose}
    >
      <div className="waitlist-dialog-header">
        <div>
          <h2 id="waitlist-title">{title}</h2>
          <p>{intro}</p>
        </div>
        <button className="waitlist-close" type="button" onClick={close} aria-label="Close">
          <X size={18} strokeWidth={1.5} aria-hidden />
        </button>
      </div>

      {showForm ? (
        <>
          <iframe
            key={formVersion}
            className="waitlist-embed"
            src={formUrl}
            title="Join the Call the Saul waitlist"
            loading="lazy"
          />
          {!showingThanks && (
            <p className="waitlist-fallback">
              Form not loading? <a href={formUrl} target="_blank" rel="noopener noreferrer">Open it in a new tab</a>
            </p>
          )}
        </>
      ) : (
        <div className="waitlist-joined">
          <dl className="waitlist-details">
            <div><dt>Name</dt><dd>{joiner.name}</dd></div>
            {joiner.company && <div><dt>Company</dt><dd>{joiner.company}</dd></div>}
            <div><dt>Email</dt><dd>{joiner.email}</dd></div>
          </dl>
          <div className="waitlist-joined-actions">
            <button className="button button-primary" type="button" onClick={close}>Done</button>
            <button className="waitlist-link" type="button" onClick={() => setEditUrl(prefilledFormUrl(joiner))}>
              Edit my details
            </button>
          </div>
          <button className="waitlist-link waitlist-reset" type="button" onClick={() => writeJoiner(null)}>
            Join with a different email
          </button>
        </div>
      )}
    </dialog>
  );
}
