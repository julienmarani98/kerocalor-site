import { LOGO_VIEWBOX, LOGO_RED, LOGO_DARK, LOGO_STEM } from "./logo-paths";

/**
 * Logo Kerocalor (asta + K freccia rossa + "erocalor").
 * Il testo/contorno usa currentColor: bianco su sfondi scuri, ink su chiari.
 * Dimensionare via className (es. h-10 w-auto).
 */
export default function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      role="img"
      aria-label="Kerocalor"
      fill="none"
    >
      <rect fill="#F03A17" {...LOGO_STEM} />
      <path fillRule="evenodd" fill="#F03A17" d={LOGO_RED} />
      <path fillRule="evenodd" fill="currentColor" d={LOGO_DARK} />
    </svg>
  );
}
