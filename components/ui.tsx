"use client";

import Image from "next/image";
import Link from "next/link";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Icon } from "./icons";

const NoticeContext = createContext<(message?: string) => void>(() => {});
export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [notice, setNotice] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  function notify(message = "Funcionalidade em desenvolvimento") {
    setNotice(message);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setNotice(""), 4500);
  }
  return (
    <NoticeContext.Provider value={notify}>
      {children}
      <div
        className={`toast ${notice ? "visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {notice && (
          <>
            <Icon name="help" />
            <span>{notice}</span>
            <button aria-label="Fechar aviso" onClick={() => setNotice("")}>
              <Icon name="close" />
            </button>
          </>
        )}
      </div>
    </NoticeContext.Provider>
  );
}
export function FutureButton({
  children,
  className = "",
  message,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  message?: string;
  label?: string;
}) {
  const notify = useContext(NoticeContext);
  return (
    <button
      type="button"
      className={className}
      onClick={() => notify(message)}
      aria-label={label}
    >
      {children}
    </button>
  );
}
export function Brand() {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <Link href="/" className="brand" aria-label="Virteon — página inicial">
      {imageFailed ? (
        <span className="brand-fallback">VIRTEON</span>
      ) : (
        <Image
          src="/virteon-logo.jpg"
          alt="VIRTEON"
          width={1536}
          height={796}
          loading="eager"
          unoptimized
          className="brand-image"
          onError={() => setImageFailed(true)}
        />
      )}
    </Link>
  );
}
export function Photo({
  name,
  alt,
  className = "",
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image
        src={`/assets/${name}.webp`}
        alt={alt}
        fill
        sizes="(max-width: 700px) 100vw, 55vw"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </div>
  );
}
export function Progress({
  value,
  orange = false,
}: {
  value: number;
  orange?: boolean;
}) {
  return (
    <div
      className={`progress ${orange ? "orange" : ""}`}
      role="progressbar"
      aria-label="Progresso"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span style={{ width: `${value}%` }} />
    </div>
  );
}
export function Metrics({
  items,
}: {
  items: { label: string; value: string; caption: string; icon: string }[];
}) {
  return (
    <div className="metrics grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <article
          className={`panel metric hover-card metric-${item.icon}`}
          key={item.label}
        >
          <div className="flex items-center justify-between gap-2">
            <span>{item.label}</span>
            <Icon name={item.icon} />
          </div>
          <strong>{item.value}</strong>
          <small>{item.caption}</small>
        </article>
      ))}
    </div>
  );
}
export function Competencies({ demo = false }: { demo?: boolean }) {
  return (
    <div className="competency-list">
      {[
        ["Identificação de riscos", 100],
        ["Uso correto de EPIs", 96],
        ["Procedimento operacional", 88],
        ["Resposta a emergências", 84],
      ]
        .slice(0, demo ? 3 : 4)
        .map(([label, value], i) => (
          <div key={label}>
            <div className="flex justify-between gap-3">
              <span>{label}</span>
              <span>{value}%</span>
            </div>
            <Progress value={Number(value)} orange={!demo && i > 1} />
          </div>
        ))}
    </div>
  );
}
export function Reveal({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("revealed");
            observer.unobserve(el);
          }
        }),
      { threshold: 0.08 },
    );
    el.classList.add("reveal-ready");
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}
