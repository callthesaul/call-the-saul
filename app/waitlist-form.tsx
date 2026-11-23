"use client";

import { useEffect, useState, type FormEvent } from "react";

type Interest = "waitlist" | "investor";
type Status = { kind: "success" | "error"; message: string };

export default function WaitlistForm() {
  const [interest, setInterest] = useState<Interest>("waitlist");
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);
  const isInvestor = interest === "investor";

  useEffect(() => {
    function setFromHash(hash: string) {
      if (hash === "#investor-inquiry" || hash === "#waitlist") {
        setInterest(hash === "#investor-inquiry" ? "investor" : "waitlist");
        setStatus(null);
      }
    }

    function onHashChange() {
      setFromHash(window.location.hash);
    }

    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href='#investor-inquiry'], a[href='#waitlist']");
      if (link) setFromHash(link.hash);
    }

    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick);
    };
  }, []);

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
      setStatus({ kind: "success", message: result.message ?? "Thanks. We’ve saved your request." });
    } catch {
      setStatus({ kind: "error", message: "We couldn’t submit your request. Please try again." });
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <div className="contact-copy" id="investor-inquiry">
        <p className="eyebrow">{isInvestor ? "For investors" : "Early access"}</p>
        <h2 id="contact-title">{isInvestor ? <>Get in <em>touch.</em></> : <>Join the <em>waitlist.</em></>}</h2>
        <p>{isInvestor
          ? "Leave your details to start a conversation about CalltheSaul."
          : "Tell us a little about your company and we’ll be in touch about early access."}</p>
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
        <label>
          I’m interested in
          <select name="interest" value={interest} onChange={(event) => {
            setInterest(event.currentTarget.value as Interest);
            setStatus(null);
          }}>
            <option value="waitlist">Early access</option>
            <option value="investor">Investor inquiry</option>
          </select>
        </label>
        <div className="form-actions">
          <button className="button button-primary" type="submit" disabled={pending}>
            {pending ? "Submitting…" : isInvestor ? "Send inquiry" : "Join the waitlist"}
          </button>
          <p>We’ll use these details to follow up on your request.</p>
        </div>
        <div className="form-feedback" aria-live="polite" aria-atomic="true">
          {status && <p className={status.kind}>{status.message}</p>}
        </div>
      </form>
    </>
  );
}
