import type { ReactNode } from "react";

/**
 * The page header at the top of every short-form page: title + short lede on
 * the deep band. No kicker — the heading carries its own weight — and no
 * spotlight wash; the surface is a flat, lit-from-nowhere ink navy, and the
 * hairline rule under the lede is the only ornament.
 */
export function PageHero({
  title,
  lede,
  compact = false,
  className = "",
}: {
  title: ReactNode;
  lede?: ReactNode;
  /**
   * Trims the vertical padding for pages whose first section is the point of
   * the page and should not sit below the fold. The top padding still has to
   * clear the fixed header, so only the slack below it comes off.
   */
  compact?: boolean;
  className?: string;
}) {
  return (
    <section className={`band-deep ${className}`}>
      <div
        className={`mx-auto max-w-7xl px-5 sm:px-8 ${
          compact ? "pt-24 pb-10 sm:pt-28 sm:pb-12" : "pt-28 pb-16 sm:pt-36 sm:pb-20"
        }`}
      >
        <h1
          className={`max-w-4xl leading-[1.12] ${
            compact
              ? "text-[clamp(2rem,4vw,3rem)]"
              : "text-[clamp(2.25rem,5vw,4rem)]"
          }`}
        >
          {title}
        </h1>
        {lede && (
          <>
            <div
              aria-hidden
              className={`h-px w-14 bg-[color:var(--gold)] ${compact ? "mt-5" : "mt-8"}`}
            />
            <p
              className={`max-w-[54ch] text-lg leading-relaxed text-[color:var(--cream-faded)] ${
                compact ? "mt-4" : "mt-6"
              }`}
            >
              {lede}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
