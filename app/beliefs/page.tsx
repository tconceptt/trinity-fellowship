import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/app/components/page-hero";
import { NextStepCTA } from "@/app/components/next-step-cta";
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
        title="Statement of Faith"
        lede="We affirm the Sovereign Grace Churches confession with thirteen major doctrinal themes, from the authority of Scripture to the hope of Christ's return."
      />

      {/* ── the thirteen themes ─────────────── */}
      <section className="mx-auto max-w-5xl px-5 pt-20 pb-20 sm:px-8 sm:pt-24 sm:pb-28">
        <ul className="grid border-t border-[color:var(--line)] sm:grid-cols-2 sm:gap-x-14">
          {doctrineThemes.map((theme) => (
            <li
              key={theme}
              className="border-b border-[color:var(--line)] py-5 font-serif text-xl leading-snug text-[color:var(--brand)] sm:text-2xl"
            >
              {theme}
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/docs/statement-of-faith-editors-edition.pdf"
            target="_blank"
            className="btn btn-brand"
          >
            View Statement of Faith PDF
          </Link>
          <Link
            href="https://sovereigngrace.com/we-believe/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Sovereign Grace Beliefs
          </Link>
        </div>
      </section>

      <NextStepCTA
        title="Come See It Lived Out"
        description="These convictions shape everything from our preaching to our prayer. Come worship with us and see for yourself."
        links={[
          { label: "Plan a Visit", href: "/visit" },
          { label: "About Membership", href: "/membership", variant: "outline" },
        ]}
      />
    </div>
  );
}
