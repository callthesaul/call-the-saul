"use client";

import { useState, type FormEvent } from "react";

type Status = { kind: "success" | "error"; message: string };

export default function WaitlistForm() {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const fields = new URLSearchParams();
    new FormData(form).forEach((value, key) => fields.set(key, String(value)));
    setPending(true);
    setStatus(null);
    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fields,
      });
      const result: { message?: string } = await response.json();
      if (!response.ok) {
        setStatus({ kind: "error", message: result.message ?? "Please try again." });
        return;
      }
      form.reset();
      setStatus({ kind: "success", message: result.message ?? "You’re on the waitlist." });
    } catch {
      setStatus({ kind: "error", message: "We couldn’t submit your request. Please try again." });
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <div className="contact-copy">
        <h2 id="contact-title">Join the waitlist</h2>
        <p>Tell us a little about your company and we’ll be in touch about early access.</p>
      </div>
      <form className="contact-form" method="post" action="/api/interest" onSubmit={submit} aria-busy={pending}>
        <div className="field-row">
          <label>
            Full name
            <input name="name" autoComplete="name" maxLength={100} required />
          </label>
          <label>
            Company
            <input name="company" autoComplete="organization" maxLength={120} required />
          </label>
        </div>
        <label>
          Work email
          <input type="email" name="email" autoComplete="email" maxLength={254} required />
        </label>
        <div className="form-actions">
          <button className="button button-primary" type="submit" disabled={pending}>
            {pending ? "Submitting…" : "Join the waitlist"}
          </button>
          <p>We’ll use these details to contact you about early access.</p>
        </div>
        <div className="form-feedback" aria-live="polite" aria-atomic="true">
          {status && <p className={status.kind}>{status.message}</p>}
        </div>
      </form>
    </>
  );
}
