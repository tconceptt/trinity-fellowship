"use client";

import type { ReactNode } from "react";
import { ScrollReveal, TextReveal } from "./animations";

/**
 * Compact, consistent page-header pattern used at the top of every
 * short-form page (about, beliefs, children detail, college, visit, etc.):
 * eyebrow + serif h1 + short lede. Includes top padding so content clears
 * the fixed header.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-7xl px-5 pt-32 pb-10 sm:px-8 sm:pt-40 sm:pb-14 ${className}`}>
      <ScrollReveal>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
          {eyebrow}
        </p>
      </ScrollReveal>
      <TextReveal delay={0.1}>
        <h1 className="mt-3 text-4xl text-[color:var(--foreground)] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
      </TextReveal>
      {lede && (
        <ScrollReveal delay={0.2}>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[color:var(--muted)]">
            {lede}
          </p>
        </ScrollReveal>
      )}
    </section>
  );
}
