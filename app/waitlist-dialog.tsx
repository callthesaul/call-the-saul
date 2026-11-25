"use client";

import { X } from "lucide-react";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { waitlistFormUrl } from "../lib/site-metadata";

const dialogId = "waitlist-dialog";

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
  const close = () => dialogRef.current?.close();

  // The dialog has no padding, so a click on the element itself is a click on the backdrop.
  function closeOnBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) close();
  }

  return (
    <dialog
      id={dialogId}
      ref={dialogRef}
      className="waitlist-dialog"
      aria-labelledby="waitlist-title"
      onClick={closeOnBackdrop}
    >
      <div className="waitlist-dialog-header">
        <div>
          <h2 id="waitlist-title">Join the waitlist</h2>
          <p>Tell us a little about your company and we’ll be in touch about early access.</p>
        </div>
        <button className="waitlist-close" type="button" onClick={close} aria-label="Close">
          <X size={18} strokeWidth={1.5} aria-hidden />
        </button>
      </div>
      <iframe
        className="waitlist-embed"
        src={waitlistFormUrl}
        title="Join the Call the Saul waitlist"
        loading="lazy"
      />
      <p className="waitlist-fallback">
        Form not loading? <a href={waitlistFormUrl} target="_blank" rel="noopener noreferrer">Open it in a new tab</a>
      </p>
    </dialog>
  );
}
