"use client";

import { useEffect, useRef, useState } from "react";

type State = "playing" | "blocked" | "error";

/* The hero's muted loop. If the browser refuses to autoplay (e.g. iOS Low Power Mode) or the
   files fail to load, the video is hidden so the section's poster background shows cleanly,
   instead of a frozen frame with a native play button on top. Reduced-motion visitors get no
   matching <source>, so nothing is downloaded and the poster stays. */
export default function HeroFilmVideo({ basePath }: { basePath: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<State>("playing");
  const [paused, setPaused] = useState(false);

  function togglePause() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      video
        .play()
        .then(() => setPaused(false))
        .catch(() => setState("error"));
    } else {
      video.pause();
      setPaused(true);
    }
  }

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    video.play().catch((error: unknown) => {
      // NotAllowedError = autoplay refused; anything else means the media could not play.
      setState(
        error instanceof DOMException && error.name === "NotAllowedError"
          ? "blocked"
          : "error",
      );
    });
  }, []);

  const motionOk = "(prefers-reduced-motion: no-preference)";
  const sharp = `${motionOk} and (min-width: 90rem), ${motionOk} and (min-width: 48rem) and (min-resolution: 1.5dppx)`;
  return (
    <>
      <video
        ref={ref}
        className="hero-film-video"
        data-state={state}
        muted
        loop
        playsInline
        preload="metadata"
        disableRemotePlayback
        disablePictureInPicture
        poster={`${basePath}/images/hero-film-poster.webp`}
        aria-hidden="true"
      >
        <source
          src={`${basePath}/video/hero-film-960.mp4`}
          type='video/mp4; codecs="avc1.64001f"'
          media={`${motionOk} and (max-width: 42rem)`}
        />
        {/* 1080p for large screens and high-density (retina) screens */}
        <source
          src={`${basePath}/video/hero-film-1080.webm`}
          type='video/webm; codecs="vp9"'
          media={sharp}
        />
        <source
          src={`${basePath}/video/hero-film-1080.mp4`}
          type='video/mp4; codecs="avc1.640032"'
          media={sharp}
        />
        <source
          src={`${basePath}/video/hero-film.webm`}
          type='video/webm; codecs="vp9"'
          media={motionOk}
        />
        <source
          src={`${basePath}/video/hero-film.mp4`}
          type='video/mp4; codecs="avc1.64001f"'
          media={motionOk}
          onError={() => setState("error")}
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
