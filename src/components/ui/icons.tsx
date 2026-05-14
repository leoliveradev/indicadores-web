interface IconProps {
  size?: number;
  color?: string;
}

export function IFija() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1f4e79"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.11 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.2 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.37 1.78.72 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.24a2 2 0 0 1 2.11-.45c.83.35 1.71.6 2.61.72A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export const IInternet = ({ size = 32, color = "#005297" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20A14.5 14.5 0 0 0 12 2" /><path d="M2 12h20" />
  </svg>
);

export const ITV = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#BA7517" strokeWidth="1.5">
    <rect x="2" y="7" width="20" height="15" rx="2" /><path d="M17 2l-5 5-5-5" />
  </svg>
);

export const IMovil = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E74242" strokeWidth="1.5">
    <rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="17" r="1" />
  </svg>
);

export const IPort = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#005297" strokeWidth="1.5">
    <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
  </svg>
);

export const IVel = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00B5E5" strokeWidth="1.5">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" /><path d="M12 12l3-3" />
  </svg>
);

export const IDinero = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#636519" strokeWidth="1.5">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

export const IPostal = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#636519" strokeWidth="1.5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);