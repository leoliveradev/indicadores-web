interface IconProps {
  size?: number;
  color?: string;
}

export const IFija = ({ size = 28, color = "var(--blue-500)" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.11 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.2 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.37 1.78.72 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.24a2 2 0 0 1 2.11-.45c.83.35 1.71.6 2.61.72A2 2 0 0 1 22 16.92z" />
  </svg>
);


export const IInternet = ({ size = 32, color = "var(--accent-green)" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20A14.5 14.5 0 0 0 12 2" /><path d="M2 12h20" />
  </svg>
);

export const ITV = ({ size = 32, color = "var(--accent-amber)" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5">
    <rect x="2" y="7" width="20" height="15" rx="2" /><path d="M17 2l-5 5-5-5" />
  </svg>
);

export const IMovil = ({ size = 32, color = "var(--accent-red)" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5">
    <rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="17" r="1" />
  </svg>
);

export const IPort = ({ size = 32, color = "#005297" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5">
    <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
  </svg>
);

export const IVelocidad = ({ size = 32, color = "var(--blue-200)", }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* arco velocímetro */}
    <path d="M5.5 18.5a8.5 8.5 0 1 1 13 0" />

    {/* aguja */}
    <line x1="12" y1="12" x2="15.5" y2="8.5" />
  </svg>
);

export const IDinero = ({ size = 32, color = "var(--accent-green)" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

export const IPostal = ({ size = 32, color = "var(--blue-400)" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export const IFibra = ({
  size = 32,
  color = "var(--accent-green)",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M6 9a6 6 0 1 0 12 0a6 6 0 0 0 -12 0" />
    <path d="M12 3c1.333 .333 2 2.333 2 6s-.667 5.667 -2 6" />
    <path d="M12 3c-1.333 .333 -2 2.333 -2 6s.667 5.667 2 6" />
    <path d="M6 9h12" />
    <path d="M3 20h7" />
    <path d="M14 20h7" />
    <path d="M10 20a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
    <path d="M12 15v3" />
  </svg>
);
// export const IFibra = ({ size = 32, color = "var(--accent-green)" }: IconProps) => (
//   <svg
//     width={size}
//     height={size}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke={color}
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="7" r="4" />
//     <path d="M12 11v7" />
//     <path d="M8 20h8" />
//   </svg>
// );

export const ISatelital = ({ size = 32, color = "var(--accent-green)", }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* cuerpo satélite */}
    <path d="M3.7 6.3l2.6-2.6a1 1 0 0 1 1.4 0l5.6 5.6a1 1 0 0 1 0 1.4l-2.6 2.6a1 1 0 0 1-1.4 0l-5.6-5.6a1 1 0 0 1 0-1.4z" />

    {/* paneles */}
    <path d="M6 10l-3 3 3 3 3-3" />
    <path d="M10 6l3-3 3 3-3 3" />

    {/* soporte */}
    <line x1="12" y1="12" x2="13.5" y2="13.5" />

    {/* señal */}
    <path d="M14.5 17a2.5 2.5 0 0 0 2.5-2.5" />
    <path d="M15 21a6 6 0 0 0 6-6" />
  </svg>
);

export const I4G = ({ size = 32, color = "var(--accent-red)" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Torre tipo A */}
    <path d="M8 22l4-10 4 10" />
    <path d="M10 18h4" />

    {/* Antena */}
    <circle cx="12" cy="8" r="1.5" />

    {/* Señales */}
    <path d="M8.5 6a4.5 4.5 0 0 1 7 0" />
    <path d="M6.5 4.5a7 7 0 0 1 11 0" />
  </svg>
);
