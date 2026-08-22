/**
 * Small decorative pathway glyph.
 *
 * The "pathways in motion" concept (design.md §1.1) rendered as connecting
 * curves and nodes — a step from learning to capability to opportunity. Purely
 * decorative, so it is hidden from assistive technology and carries no meaning
 * that is not also present in adjacent text.
 */

type Variant = "open" | "step" | "converge";

interface PathwayMarkProps {
  className?: string;
  variant?: Variant;
}

export function PathwayMark({ className, variant = "open" }: PathwayMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 96"
      fill="none"
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      {variant === "open" && (
        <>
          <path
            d="M8 78C40 78 44 22 84 22s44 56 84 56"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.35"
          />
          <path
            d="M8 60C44 60 48 40 92 40s52 20 100 20"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="6 9"
            opacity="0.55"
          />
          <circle cx="8" cy="78" r="5" fill="currentColor" />
          <circle cx="84" cy="22" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="168" cy="78" r="5" fill="currentColor" opacity="0.6" />
        </>
      )}

      {variant === "step" && (
        <>
          <path
            d="M10 82h34a10 10 0 0 0 10-10V56a10 10 0 0 1 10-10h32a10 10 0 0 0 10-10V26a10 10 0 0 1 10-10h74"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.5"
          />
          <circle cx="10" cy="82" r="5" fill="currentColor" />
          <circle cx="106" cy="46" r="5" fill="currentColor" opacity="0.7" />
          <circle cx="190" cy="16" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" />
        </>
      )}

      {variant === "converge" && (
        <>
          <path
            d="M6 20c56 0 70 28 126 28h62"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.45"
          />
          <path
            d="M6 76c56 0 70-28 126-28h62"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.45"
          />
          <path d="M132 48h62" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="6" cy="20" r="5" fill="currentColor" opacity="0.7" />
          <circle cx="6" cy="76" r="5" fill="currentColor" opacity="0.7" />
          <circle cx="132" cy="48" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" />
        </>
      )}
    </svg>
  );
}
