"use client";

import { useEffect, useRef, useState } from "react";

type State = "playing" | "blocked" | "error";

const MOTION_OK = "(prefers-reduced-motion: no-preference)";
// 1080p for large screens and high-density (retina) screens
const SHARP = `${MOTION_OK} and (min-width: 90rem), ${MOTION_OK} and (min-width: 48rem) and (min-resolution: 1.5dppx)`;

const errorName = (error: unknown) => (error instanceof DOMException ? error.name : "UnknownError");

/* The hero's muted loop.
   - Autoplay refused (e.g. iOS Low Power Mode): the poster shows and the toggle offers "Play",
     which counts as a user gesture, so the film can still be started.
   - Files fail (before or after playback starts): the video is hidden so the section's poster
     background shows cleanly, never a frozen frame with a native play button on top.
   - Reduced motion: no <source> matches, nothing is downloaded and the element shows its poster.
   The failure reason is kept in data-error for debugging (the project has no logger). */
export default function HeroFilmVideo({ basePath }: { basePath: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<State>("playing");
  const [reason, setReason] = useState<string | undefined>();
  const [paused, setPaused] = useState(false);

  function fail(name: string) {
    setReason(name);
    setState("error");
  }

  // A play() interrupted by pause() rejects with AbortError: that is not a failure.
  function onPlayRejected(error: unknown) {
    const name = errorName(error);
    if (name === "AbortError") return;
    if (name === "NotAllowedError") {
      setReason(name);
      setState("blocked");
      setPaused(true);
      return;
    }
    fail(name);
  }

  function togglePause() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      setState("playing");
      setPaused(false);
      video.play().catch(onPlayRejected);
    } else {
      video.pause();
      setPaused(true);
    }
  }

  useEffect(() => {
    const video = ref.current;
    if (!video || !window.matchMedia(MOTION_OK).matches) return;
    // Source errors can fire before hydration, when React is not listening yet: check the
    // element itself. NETWORK_NO_SOURCE here means every candidate was tried and failed.
    if (video.error || video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
      fail(video.error ? `MediaError${video.error.code}` : "NoSource");
      return;
    }
    video.play().catch(onPlayRejected);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs once on mount
  }, []);

  return (
    <>
      <video
        ref={ref}
        className="hero-film-video"
        data-state={state}
        data-error={reason}
        muted
        loop
        playsInline
        preload="metadata"
        disableRemotePlayback
        disablePictureInPicture
        poster={`${basePath}/images/hero-film-poster.webp`}
        aria-hidden="true"
        // Decode or network errors after a source was chosen land on the <video>, not a <source>.
        onError={(event) => fail(`MediaError${event.currentTarget.error?.code ?? ""}`)}
      >
        <source
          src={`${basePath}/video/hero-film-960.mp4`}
          type='video/mp4; codecs="avc1.64001f"'
          media={`${MOTION_OK} and (max-width: 42rem)`}
        />
        <source src={`${basePath}/video/hero-film-1080.webm`} type='video/webm; codecs="vp9"' media={SHARP} />
        <source src={`${basePath}/video/hero-film-1080.mp4`} type='video/mp4; codecs="avc1.640032"' media={SHARP} />
        <source src={`${basePath}/video/hero-film.webm`} type='video/webm; codecs="vp9"' media={MOTION_OK} />
        <source
          src={`${basePath}/video/hero-film.mp4`}
          type='video/mp4; codecs="avc1.64001f"'
          media={MOTION_OK}
          // A <source> whose media does not match also fires error; only count real failures.
          onError={() => {
            if (window.matchMedia(MOTION_OK).matches) fail("NoSource");
          }}
        />
      </video>
      <button
        type="button"
        className="hero-film-toggle"
        onClick={togglePause}
        aria-pressed={paused}
        aria-label="Pause background film"
      >
        {paused ? "Play" : "Pause"}
      </button>
    </>
  );
}
