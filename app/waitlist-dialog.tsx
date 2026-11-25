"use client";

import { X } from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
  type ReactNode,
} from "react";
import { waitlistFormUrl } from "../lib/site-metadata";

const dialogId = "waitlist-dialog";
const storageKey = "callthesaul:waitlist";
const storageEvent = "callthesaul:waitlist-change";
const joinedMessage = "callthesaul:waitlist-joined";
// Formaloo redirects to this page after a submission; it posts the answers back to the popup.
const thanksOrigin = "https://callthesaul.com";
const autoCloseMs = 5000;
const joinerFields = ["name", "company", "country", "role", "email"] as const;

type Joiner = Record<(typeof joinerFields)[number] | "joinedAt", string>;

function isJoiner(value: unknown): value is Joiner {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return [...joinerFields, "joinedAt"].every((key) => typeof record[key] === "string")
    && /\S+@\S+\.\S+/.test(record.email as string);
}

function parseJoiner(raw: string | null): Joiner | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    return isJoiner(value) ? value : null;
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
  for (const key of joinerFields) {
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
  const storedJoiner = useSyncExternalStore(subscribe, readStorage, () => null);
  const joiner = useMemo(() => parseJoiner(storedJoiner), [storedJoiner]);
  const [editing, setEditing] = useState(false);
  const [showingThanks, setShowingThanks] = useState(false);
  const [formVersion, setFormVersion] = useState(0);

  const close = () => dialogRef.current?.close();

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== thanksOrigin) return;
      const data: unknown = event.data;
      if (!data || typeof data !== "object") return;
      const { type, joiner: next } = data as { type?: unknown; joiner?: unknown };
      if (type !== joinedMessage || !isJoiner(next)) return;

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
    setEditing(false);
    setFormVersion((version) => version + 1);
  }

  // The dialog has no padding, so a click on the element itself is a click on the backdrop.
  function closeOnBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) close();
  }

  function joinWithDifferentEmail() {
    writeJoiner(null);
    setEditing(false);
    setFormVersion((version) => version + 1);
  }

  const showForm = !joiner || editing || showingThanks;
  const formUrl = editing && joiner ? prefilledFormUrl(joiner) : waitlistFormUrl;

  let title = "Join the waitlist";
  let intro = "Tell us a little about your company and we’ll be in touch about early access.";
  if (showingThanks) {
    title = "You’re on the waitlist";
    intro = "Thanks for joining. This window closes on its own.";
  } else if (editing) {
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
            <button className="waitlist-link" type="button" onClick={() => setEditing(true)}>Edit my details</button>
          </div>
          <button className="waitlist-link waitlist-reset" type="button" onClick={joinWithDifferentEmail}>
            Join with a different email
          </button>
        </div>
      )}
    </dialog>
  );
}
