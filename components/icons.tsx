import type { CSSProperties } from "react";

const paths: Record<string, React.ReactNode> = {
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  external: <path d="M7 17 17 7M7 7h10v10" />,
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  helmet: <path d="M4 15a8 8 0 0 1 16 0M3 15h18v4H3zm7-9V3h4v3" />,
  chart: <path d="M4 20V12m5 8v-7m5 7V9m5 11V4M3 9l6-5 5 2 7-5" />,
  report: <path d="M5 3h9l5 5v13H5zM14 3v6h5M9 17v-4m5 4v-6" />,
  award: (
    <>
      <circle cx="12" cy="8" r="5" />
      <path d="m8 13-1 8 5-3 5 3-1-8" />
    </>
  ),
  headset: (
    <path d="M4 14v-3a8 8 0 0 1 16 0v7h-4v-7h4M4 11h4v7H4zm16 7c0 3-4 3-7 3" />
  ),
  shield: (
    <>
      <path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6z" />
      <path d="m8 11 3 3 5-6" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v5l3 2M9 2h6m-3 0v3" />
    </>
  ),
  play: <path d="m7 3 14 9-14 9z" />,
  monitor: (
    <>
      <rect x="3" y="3" width="18" height="13" rx="2" />
      <path d="M8 21h8m-4-5v5" />
    </>
  ),
  sparkles: (
    <path d="m12 3 2 6 6 2-6 2-2 6-2-6-6-2 6-2zm7 12 1 3 3 1-3 1-1 3-1-3-3-1 3-1" />
  ),
  users: (
    <>
      <circle cx="9" cy="7" r="4" />
      <path d="M2 21v-3a7 7 0 0 1 14 0v3M17 3a4 4 0 0 1 0 8m2 3a7 7 0 0 1 3 7" />
    </>
  ),
  search: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="m15 15 6 6" />
    </>
  ),
  bell: <path d="M5 9a7 7 0 0 1 14 0v6l2 3H3l2-3zm5 12h4" />,
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 8a3 3 0 1 1 4 3c-1 1-1 2-1 3m0 3h.01" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m16 8-2 6-6 2 2-6z" />
    </>
  ),
  flag: <path d="M5 22V3c5-5 9 5 15 0v11c-6 5-10-5-15 0" />,
  bolt: <path d="m13 2-9 12h7l-1 8 10-13h-7z" />,
  fire: (
    <path d="M12 2c4 6-2 6 2 10 2-1 3-3 3-4 7 8 3 14-5 14C3 22 0 13 7 8c-1 5 3 7 5 3 2-3 0-5 0-9Z" />
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V6a4 4 0 0 1 8 0v4m-4 5v2" />
    </>
  ),
  book: (
    <path d="M3 4c4-2 6-1 9 1 3-2 5-3 9-1v16c-4-2-6-1-9 1-3-2-5-3-9-1zm9 1v16" />
  ),
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="m5 5 14 14M5 19 19 5" />,
  download: <path d="M12 3v12m-5-5 5 5 5-5M3 15v6h18v-6" />,
  warning: <path d="m12 3 10 18H2zm0 6v5m0 3h.01" />,
  repeat: <path d="m17 2 4 4-4 4M3 11V6h18M7 22l-4-4 4-4m14-1v5H3" />,
  factory: <path d="M3 21V9l6 4V7l6 4V3h5v18zM7 17h1m4 0h1m4 0h1" />,
};
export function Icon({
  name,
  className = "",
  style,
}: {
  name: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      className={`icon ${className}`}
      style={style}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.sparkles}
    </svg>
  );
}
