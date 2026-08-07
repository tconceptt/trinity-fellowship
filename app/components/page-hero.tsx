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
  className = "",
}: {
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`band-deep ${className}`}>
      <div className="mx-auto max-w-7xl px-5 pt-28 pb-16 sm:px-8 sm:pt-36 sm:pb-20">
        <h1 className="max-w-4xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.12]">{title}</h1>
        {lede && (
          <>
            <div aria-hidden className="mt-8 h-px w-14 bg-[color:var(--gold)]" />
            <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-[color:var(--cream-faded)]">
              {lede}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
