"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Phase = "loading" | "leaving" | "done";

// This component lives in the persistent root layout. A new document resets it;
// App Router navigation keeps it mounted, including when switching environments.
export function StartupScreen({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);
  const [artworkFailed, setArtworkFailed] = useState(false);
  const [artworkReady, setArtworkReady] = useState(false);
  const artwork = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ready = false;
    let frame = 0;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    let finishStarted: number | undefined;
    const started = performance.now();
    const image = artwork.current;
    let removeLoadListener = () => {};

    const pageLoaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", onLoad, { once: true });
      function onLoad() {
        resolve();
      }
      // The load listener is removed below even if unmounted before load.
      removeLoadListener = () => window.removeEventListener("load", onLoad);
    });
    let removeImageListeners = () => {};
    const artworkLoaded = new Promise<void>((resolve) => {
      if (!image || image.complete) {
        resolve();
        return;
      }
      const loaded = () => resolve();
      image.addEventListener("load", loaded, { once: true });
      image.addEventListener("error", loaded, { once: true });
      removeImageListeners = () => {
        image.removeEventListener("load", loaded);
        image.removeEventListener("error", loaded);
      };
    }).then(() => image?.decode().catch(() => {}));

    Promise.all([pageLoaded, artworkLoaded, document.fonts.ready]).then(() => {
      if (!cancelled) ready = true;
    });

    function tick(now: number) {
      if (cancelled) return;
      const elapsed = now - started;
      // This is a presentation timer, not a fabricated network percentage.
      // Hold at 94% until the document, fonts and splash image are ready.
      if (elapsed >= 2100 && ready) finishStarted ??= now;
      const value =
        finishStarted === undefined
          ? 94 * Math.min(elapsed / 2100, 1)
          : 94 + 6 * Math.min((now - finishStarted) / 400, 1);
      setProgress(value);
      if (value < 100) frame = requestAnimationFrame(tick);
      else {
        setPhase("leaving");
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        exitTimer = setTimeout(() => setPhase("done"), reducedMotion ? 0 : 250);
      }
    }
    frame = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      clearTimeout(exitTimer);
      removeLoadListener();
      removeImageListeners();
    };
  }, []);

  return (
    <>
      <div
        className="startup-content"
        data-startup-state={phase}
        inert={phase !== "done"}
        aria-hidden={phase !== "done" ? true : undefined}
      >
        {children}
      </div>
      {phase !== "done" && (
        <div
          className="startup-screen"
          data-phase={phase}
          role="region"
          aria-label="Tela de inicialização VIRTEON"
        >
          <div className="startup-artwork">
            <Image
              ref={artwork}
              src="/virteon-splash.jpg"
              alt="VIRTEON — Treinamento imersivo para um amanhã mais seguro"
              width={1536}
              height={1024}
              loading="eager"
              fetchPriority="high"
              unoptimized
              data-ready={artworkReady}
              onLoad={() => setArtworkReady(true)}
              onError={() => setArtworkFailed(true)}
            />
            {artworkFailed && (
              <div className="startup-fallback">
                VIRTEON
                <span>Treinamento imersivo para um amanhã mais seguro</span>
              </div>
            )}
            <div className="startup-bar-mask" aria-hidden="true" />
            <div
              className="startup-progress"
              role="progressbar"
              aria-label="Inicialização da plataforma"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.floor(progress)}
              aria-valuetext={
                progress === 100 ? "Pronto" : "Inicializando a plataforma"
              }
            >
              <div
                className="startup-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
