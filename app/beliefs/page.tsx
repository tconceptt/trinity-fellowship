import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/app/components/page-hero";
import { NextStepCTA } from "@/app/components/next-step-cta";
import { InfiniteScrollLoop, ScrollReveal } from "@/app/components/animations";
import { doctrineThemes } from "@/app/lib/site-content";

export const metadata: Metadata = {
  title: "Beliefs",
  description:
    "Trinity Fellowship affirms the Sovereign Grace Churches confession with thirteen major doctrinal themes, from the authority of Scripture to the hope of Christ's return.",
  alternates: { canonical: "/beliefs" },
};

export default function BeliefsPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Doctrine"
        title="Statement of Faith"
        lede="We affirm the Sovereign Grace Churches confession with thirteen major doctrinal themes, from the authority of Scripture to the hope of Christ's return."
      />

      {/* ── doctrine themes: mobile readable list, desktop marquee ── */}
      <div className="mt-2">
        <div className="mx-auto grid max-w-3xl gap-3 px-5 sm:hidden">
          {doctrineThemes.map((theme, i) => (
            <div
              key={theme}
              className="flex items-baseline gap-3 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3"
            >
              <span className="font-mono text-xs text-[color:var(--brand-soft)] opacity-60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-serif text-lg leading-snug text-[color:var(--brand)]">
                {theme}
              </span>
            </div>
          ))}
        </div>

        <div className="hidden sm:block">
          <InfiniteScrollLoop className="border-y border-[color:var(--line)] py-6" duration={60}>
            {[...doctrineThemes, ...doctrineThemes].map((theme, i) => (
              <span
                key={`${theme}-${i}`}
                className="mr-10 whitespace-nowrap font-serif text-[clamp(1.3rem,3vw,2.2rem)] leading-none text-[color:var(--brand)] opacity-80 sm:mr-14"
              >
                {theme}
                <span className="ml-10 text-[color:var(--line)] sm:ml-14">/</span>
              </span>
            ))}
          </InfiniteScrollLoop>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-wrap gap-3 px-5 pb-20 sm:px-8 sm:pb-28">
        <ScrollReveal delay={0.1}>
          <Link
            href="/docs/statement-of-faith-editors-edition.pdf"
            target="_blank"
            className="inline-flex rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-6 py-3 text-sm font-semibold text-[color:var(--brand)] transition-all duration-300 hover:border-[color:var(--brand)] hover:shadow-md"
          >
            View Statement of Faith PDF
          </Link>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <Link
            href="https://sovereigngrace.com/we-believe/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full bg-[color:var(--brand)] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[color:var(--brand-soft)] hover:shadow-md"
          >
            Sovereign Grace Beliefs
          </Link>
        </ScrollReveal>
      </div>

      <NextStepCTA
        eyebrow="Next Steps"
        title="Come See It Lived Out"
        description="These convictions shape everything from our preaching to our prayer. Come worship with us and see for yourself."
        links={[{ label: "Plan a Visit", href: "/visit" }]}
      />
    </div>
  );
}
