"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function WorkflowCarousel({ id, children }: { id: string; children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollArea = scrollRef.current;
    const frame = frameRef.current;
    const track = trackRef.current;
    if (!scrollArea || !frame || !track) return;

    const list = frame.querySelector<HTMLOListElement>(".workflow");
    const steps = Array.from(scrollArea.querySelectorAll<HTMLElement>(".workflow-stage"));
    if (!list || steps.length < 2) return;

    let activeStep: HTMLElement | undefined;
    let animationFrame = 0;
    let frameOffset = 0;
    let stepTravel = 0;
    let exitTravel = 0;
    let exitProgress = 0;
    let disposed = false;

    const updateStep = () => {
      if (stepTravel <= 0) return;

      const distance = -scrollArea.getBoundingClientRect().top - frameOffset;
      const progress = distance / stepTravel;
      if (exitTravel > 0) {
        const nextExitProgress = Math.max(0, Math.min(1, (distance - stepTravel) / exitTravel));
        if (nextExitProgress !== exitProgress) {
          frame.style.setProperty("--workflow-exit-progress", String(nextExitProgress));
          exitProgress = nextExitProgress;
        }
      }
      const index = Math.max(0, Math.min(steps.length - 1, Math.floor(progress * steps.length)));
      const step = steps[index];
      if (step === activeStep) return;

      activeStep?.removeAttribute("data-active");
      step.setAttribute("data-active", "");
      activeStep = step;
    };

    const fitFrame = () => {
      scrollArea.setAttribute("data-pinned", "");
      scrollArea.style.removeProperty("--workflow-top");
      frameOffset = 0;

      if (frame.offsetHeight > window.innerHeight) {
        // On shorter screens, scroll the title past the top before pinning the panels.
        const inset = parseFloat(getComputedStyle(frame).paddingTop);
        if (list.offsetHeight + 2 * inset <= window.innerHeight) {
          frameOffset = list.offsetTop - inset;
          scrollArea.setAttribute("data-pinned", "panels");
          scrollArea.style.setProperty("--workflow-top", `${-frameOffset}px`);
        } else {
          scrollArea.removeAttribute("data-pinned");
        }
      }

      stepTravel = track.offsetHeight;
      exitTravel = scrollArea.offsetHeight - frame.offsetHeight - stepTravel;
      if (exitTravel <= 0 && exitProgress > 0) {
        frame.style.removeProperty("--workflow-exit-progress");
        exitProgress = 0;
      }
      updateStep();
    };

    const handleScroll = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        updateStep();
      });
    };

    fitFrame();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", fitFrame);
    void document.fonts.ready.then(() => {
      if (!disposed) fitFrame();
    });

    return () => {
      disposed = true;
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", fitFrame);
      window.cancelAnimationFrame(animationFrame);
      scrollArea.removeAttribute("data-pinned");
      scrollArea.style.removeProperty("--workflow-top");
      frame.style.removeProperty("--workflow-exit-progress");
      activeStep?.removeAttribute("data-active");
    };
  }, []);

  return (
    <div className="shell workflow-scroll" id={id} ref={scrollRef}>
      <div className="workflow-sticky" ref={frameRef}>{children}</div>
      <div className="workflow-track" ref={trackRef} aria-hidden="true" />
    </div>
  );
}
