const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
export const Arrow = () => (
  <span className="arrow" aria-hidden="true">
    →
  </span>
);
export const Phone = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...s}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);
export const Close = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...s}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const Instagram = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...s}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);
export const Facebook = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...s}>
    <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />
  </svg>
);
export const XIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...s}>
    <path d="M4 4l16 16M20 4L4 20" />
  </svg>
);
