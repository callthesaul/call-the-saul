import { waitlistFormUrl } from "../lib/site-metadata";

export default function WaitlistForm() {
  return (
    <>
      <div className="contact-copy">
        <h2 id="contact-title">Join the waitlist</h2>
        <p>Tell us a little about your company and we’ll be in touch about early access.</p>
      </div>
      <div className="contact-form">
        <iframe
          className="waitlist-embed"
          src={waitlistFormUrl}
          title="Join the Call the Saul waitlist"
          loading="lazy"
        />
        <p className="waitlist-fallback">
          Form not loading? <a href={waitlistFormUrl} target="_blank" rel="noopener noreferrer">Open it in a new tab</a>
        </p>
      </div>
    </>
  );
}
