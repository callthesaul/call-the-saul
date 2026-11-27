"use client";

import { useEffect, useRef, useState } from "react";
import { cookieBannerEvent, cookieBannerOpen, cookieChoicePending } from "./cookie-banner";

type State = "playing" | "blocked" | "error";

const MOTION_OK = "(prefers-reduced-motion: no-preference)";
// 1080p for large screens and high-density (retina) screens
const SHARP = `${MOTION_OK} and (min-width: 90rem), ${MOTION_OK} and (min-width: 48rem) and (min-resolution: 1.5dppx)`;

const errorName = (error: unknown) =>
  error instanceof DOMException ? error.name : "UnknownError";

/* The hero's muted loop.
   - Autoplay refused (e.g. iOS Low Power Mode): the video is hidden and the poster shows.
   - Files fail (before or after playback starts): the video is hidden so the section's poster
     background shows cleanly, never a frozen frame with a native play button on top.
   - Reduced motion: no <source> matches, nothing is downloaded and the element shows its poster.
   - Cookie banner: the film waits until the visitor has made a choice, and pauses while the
     banner is reopened.
   The failure reason is kept in data-error for debugging (the project has no logger). */
export default function HeroFilmVideo({ basePath }: { basePath: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<State>("playing");
  const [reason, setReason] = useState<string | undefined>();

  function fail(name: string) {
    setReason(name);
    setState("error");
  }

  // A play() interrupted (e.g. by the browser pausing an off-screen video) rejects with AbortError: not a failure.
  function onPlayRejected(error: unknown) {
    const name = errorName(error);
    if (name === "AbortError") return;
    if (name === "NotAllowedError") {
      setReason(name);
      setState("blocked");
      return;
    }
    fail(name);
  }

  useEffect(() => {
    const video = ref.current;
    if (!video || !window.matchMedia(MOTION_OK).matches) return;
    // Source errors can fire before hydration, when React is not listening yet: check the
    // element itself. NETWORK_NO_SOURCE here means every candidate was tried and failed.
    if (
      video.error ||
      video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE
    ) {
      fail(video.error ? `MediaError${video.error.code}` : "NoSource");
      return;
    }
    const start = () => { video.play().catch(onPlayRejected); };
    const followBanner = () => {
      if (cookieBannerOpen()) video.pause();
      else if (video.paused) start();
    };
    window.addEventListener(cookieBannerEvent, followBanner);
    if (!cookieChoicePending()) start();
    return () => window.removeEventListener(cookieBannerEvent, followBanner);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs once on mount
  }, []);

  return (
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
      // Decode or network errors after a source was chosen land on the <video> and set
      // video.error. React also passes up each <source>'s error event, which fires whenever the
      // browser skips a source (a media query that does not match, e.g. the phone file on a
      // desktop): those are normal and must not hide the film.
      onError={(event) => {
        const mediaError = event.currentTarget.error;
        if (event.target !== event.currentTarget || !mediaError) return;
        fail(`MediaError${mediaError.code}`);
      }}
    >
      <source
        src={`${basePath}/video/hero-film-960.mp4`}
        type='video/mp4; codecs="avc1.64001f"'
        media={`${MOTION_OK} and (max-width: 42rem)`}
      />
      <source
        src={`${basePath}/video/hero-film-1080.webm`}
        type='video/webm; codecs="vp9"'
        media={SHARP}
      />
      <source
        src={`${basePath}/video/hero-film-1080.mp4`}
        type='video/mp4; codecs="avc1.640032"'
        media={SHARP}
      />
      <source
        src={`${basePath}/video/hero-film.webm`}
        type='video/webm; codecs="vp9"'
        media={MOTION_OK}
      />
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
  );
}
