"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  BadgeCheck, ChevronLeft, ChevronRight, Coins, Handshake, Library, MessagesSquare,
  Pause, Play, Receipt, Send, Users, X, Zap,
} from "lucide-react";

/* Business model canvas for investors, in the classic nine-block layout.
   - Each block shows its icon, title and a one-line headline; clicking opens the full text.
   - "Walk me through it" plays the blocks in pitch order (customer first), one at a time.
   Blocks are listed in pitch order, which is also the order on phones; on wide screens CSS
   places them in the canvas grid by `key`. */

type Item = { label: string; text?: string; points?: string[] };
type Block = {
  key: string;
  title: string;
  headline: string;
  Icon: ComponentType<{ size?: number; strokeWidth?: number; "aria-hidden"?: boolean }>;
  items: Item[];
};

const blocks: Block[] = [
  {
    key: "segments",
    title: "Customer segments",
    headline: "Iranian founders, day zero to Series B",
    Icon: Users,
    items: [
      {
        label: "First users",
        text: "Iranian startup founders from incorporation to Series B (under 50 people, no in-house lawyer) who need contracts (SHA, NDA, fundraising, employment) or all the company’s legal work done without hiring a lawyer.",
      },
    ],
  },
  {
    key: "value",
    title: "Value propositions",
    headline: "A law firm at startup speed, signed by a lawyer",
    Icon: BadgeCheck,
    items: [
      {
        label: "Problem",
        text: "Early-stage founders skip legal work because law firms are slow and expensive, AI tools give drafts they can’t trust, and legal language is hard to follow.",
      },
      {
        label: "Why us",
        text: "A law firm at startup speed and price that speaks founders’ language; a lawyer confirms every piece of work and takes responsibility for it.",
      },
    ],
  },
  {
    key: "channels",
    title: "Channels",
    headline: "Investor referrals in, work done in their chat",
    Icon: Send,
    items: [
      {
        label: "Discover",
        text: "Investors, accelerators and founder communities refer their portfolio companies, plus the website waitlist with $200 credit.",
      },
      {
        label: "Access and buy",
        text: "Founders sign up on the website, then send work and get it back in their own Slack, Teams, Trello or email, paying a fixed fee per job or an All-in plan.",
      },
    ],
  },
  {
    key: "relationships",
    title: "Customer relationships",
    headline: "One lead lawyer who explains everything",
    Icon: MessagesSquare,
    items: [
      {
        label: "Onboard and support",
        text: "A short setup connects Saul to the team’s chat and builds their legal profile. Each client gets one lead lawyer who explains every piece of work in plain language, including by voice note.",
      },
      {
        label: "Retain",
        text: "The legal profile and lead lawyer remember the company, so every new job is faster than the last. Clients move from single jobs to the All-in plan as they grow.",
      },
    ],
  },
  {
    key: "revenue",
    title: "Revenue streams",
    headline: "Fixed fee per job, or All-in monthly",
    Icon: Coins,
    items: [
      {
        label: "Who pays, and for what",
        text: "Founders and startups pay for finished, lawyer-signed legal work: per document at a fixed fee by complexity (day zero, simple, complex), or a monthly All-in plan.",
      },
      {
        label: "How we charge",
        text: "The price is set before work starts and paid by card or invoice. No hourly billing.",
      },
    ],
  },
  {
    key: "resources",
    title: "Key resources",
    headline: "Licensed lawyers and a legal knowledge graph",
    Icon: Library,
    items: [
      {
        label: "People and assets",
        text: "Qualified lawyers in each target country who sign off the work, the law firm’s licence and professional liability insurance, and a small product team.",
      },
      {
        label: "Technology and data",
        text: "The smart legal engine that does the first review, a legal knowledge graph linking each client’s company, contracts, clauses and past decisions, Saul’s connections to Slack, Teams, Trello and email, and a library of tested templates and clause positions.",
      },
    ],
  },
  {
    key: "activities",
    title: "Key activities",
    headline: "Our legal engine reviews, a lawyer signs off in 24 hours",
    Icon: Zap,
    items: [
      {
        label: "Deliver",
        text: "Take requests in the client’s chat, run our smart legal engine’s first review against the knowledge graph and the client’s legal profile, then a lawyer checks, explains and signs off the work within 24 hours.",
      },
      {
        label: "Build and grow",
        points: [
          "Lawyers build and maintain the playbooks the legal engine follows",
          "Every finished job improves the legal engine, the knowledge graph and the template library",
          "Recruit and train partner lawyers",
          "Win clients through investor and founder-community partnerships",
        ],
      },
    ],
  },
  {
    key: "partners",
    title: "Key partnerships",
    headline: "Local lawyers, AI models, chat tools and Formaloo",
    Icon: Handshake,
    items: [
      {
        label: "Delivery partners",
        points: [
          "Independent lawyers and small law firms in each country, who review, sign off and take responsibility for the work",
          "AI model providers",
          "Slack, Teams and Trello, for the chat integrations",
          "Formaloo, for the waitlist and client intake, e-signature on finished documents, and part of each client’s company brain",
        ],
      },
      {
        label: "Growth partners",
        text: "VCs, accelerators and founder communities refer their portfolio companies in exchange for perks such as the $200 credit; incorporation services send day-zero founders.",
      },
    ],
  },
  {
    key: "costs",
    title: "Cost structure",
    headline: "Lawyer fees first, legal engine and team second",
    Icon: Receipt,
    items: [
      {
        label: "Operate",
        points: [
          "Lawyer fees per signed-off job, the largest variable cost",
          "Professional liability insurance and licensing",
          "AI model usage, plus Formaloo and other software subscriptions",
        ],
      },
      {
        label: "Build and grow",
        text: "A small product team to build the legal engine, the knowledge graph and the integrations; the waitlist credit and partner perks; marketing through founder communities.",
      },
    ],
  },
];

const STEP_MS = 7000; // time per block in the walk-through

export default function BusinessModelCanvas() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [step, setStep] = useState<number | null>(null); // walk-through position, null when off
  const [playing, setPlaying] = useState(false);
  const blockRefs = useRef<Record<string, HTMLElement | null>>({});
  const startRef = useRef<HTMLButtonElement>(null);
  const playRef = useRef<HTMLButtonElement>(null);
  const focusAfterRender = useRef<"tour" | "start" | null>(null); // keyboard focus follows the controls

  const touring = step !== null;
  const activeKey = touring ? blocks[step].key : openKey;

  // Auto-advance while playing; the last block stays open and the tour pauses there.
  useEffect(() => {
    if (step === null || !playing) return;
    if (step >= blocks.length - 1) {
      const id = window.setTimeout(() => setPlaying(false), STEP_MS);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => setStep(step + 1), STEP_MS);
    return () => window.clearTimeout(id);
  }, [step, playing]);

  // Keep the current tour block in view (matters on phones, where blocks stack), but only while
  // the canvas is on screen: a visitor who scrolled away is not pulled back every step.
  useEffect(() => {
    if (step === null) return;
    const el = blockRefs.current[blocks[step].key];
    const grid = el?.parentElement?.getBoundingClientRect();
    if (!el || !grid || grid.bottom < 0 || grid.top > window.innerHeight) return;
    const smooth = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    el.scrollIntoView({ block: "nearest", behavior: smooth ? "smooth" : "auto" });
  }, [step]);

  // The start and end buttons swap places, so move keyboard focus to whichever is now shown.
  useEffect(() => {
    const target = focusAfterRender.current === "tour" ? playRef.current : focusAfterRender.current === "start" ? startRef.current : null;
    focusAfterRender.current = null;
    target?.focus();
  }, [touring]);

  function startTour() {
    focusAfterRender.current = "tour";
    setOpenKey(null);
    setStep(0);
    // Reduced motion: no automatic advance; the visitor steps through with Next.
    setPlaying(window.matchMedia("(prefers-reduced-motion: no-preference)").matches);
  }

  function stopTour(returnFocus = false) {
    if (returnFocus) focusAfterRender.current = "start";
    setStep(null);
    setPlaying(false);
  }

  function go(delta: number) {
    if (step === null) return;
    setStep(Math.min(blocks.length - 1, Math.max(0, step + delta)));
  }

  function toggleBlock(key: string) {
    if (touring) stopTour();
    setOpenKey((current) => (current === key ? null : key));
  }

  return (
    <div className="bmc" id="business-model">
      <div className="bmc-header">
        <h2 className="bmc-title">Business model</h2>
        <div className="bmc-controls">
          {touring ? (
            <div className="bmc-tour" role="group" aria-label="Walk-through">
              <span className="bmc-tour-step" aria-live="polite">
                {step + 1} / {blocks.length} · {blocks[step].title}
              </span>
              {/* aria-disabled, not disabled: a disabled button would drop keyboard focus to the page */}
              <button type="button" className="bmc-control" onClick={() => go(-1)} aria-disabled={step === 0} aria-label="Previous block">
                <ChevronLeft size={18} aria-hidden />
              </button>
              <button
                ref={playRef}
                type="button"
                className="bmc-control"
                onClick={() => {
                  // Play at the last block starts again from the first.
                  if (!playing && step === blocks.length - 1) setStep(0);
                  setPlaying((p) => !p);
                }}
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? <Pause size={18} aria-hidden /> : <Play size={18} aria-hidden />}
              </button>
              <button type="button" className="bmc-control" onClick={() => go(1)} aria-disabled={step === blocks.length - 1} aria-label="Next block">
                <ChevronRight size={18} aria-hidden />
              </button>
              <button type="button" className="bmc-control" onClick={() => stopTour(true)} aria-label="End walk-through">
                <X size={18} aria-hidden />
              </button>
            </div>
          ) : (
            <button ref={startRef} type="button" className="bmc-control bmc-control-primary" onClick={startTour}>
              <Play size={16} aria-hidden /> Walk me through it
            </button>
          )}
        </div>
      </div>

      <div className="bmc-grid" data-touring={touring || undefined}>
        {blocks.map(({ key, title, headline, Icon, items }) => {
          const open = activeKey === key;
          const detailId = `bmc-detail-${key}`;
          return (
            <section
              key={key}
              ref={(el) => { blockRefs.current[key] = el; }}
              className={`bmc-block bmc-${key}`}
              data-open={open || undefined}
              aria-label={title}
            >
              <button type="button" className="bmc-head" aria-expanded={open} aria-controls={detailId} onClick={() => toggleBlock(key)}>
                <span className="bmc-name">{title}</span>
                <span className="bmc-icon"><Icon size={26} strokeWidth={1.5} aria-hidden /></span>
                <span className="bmc-headline">{headline}</span>
                <span className="bmc-more" aria-hidden="true">{open ? "Close" : "Read more"}</span>
              </button>
              <div className="bmc-detail" id={detailId} hidden={!open}>
                {items.map(({ label, text, points }) => (
                  <div key={label} className="bmc-item">
                    <strong className="bmc-label">{label}</strong>
                    {text && <p>{text}</p>}
                    {points && (
                      <ul role="list">
                        {points.map((point) => <li key={point}>{point}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
