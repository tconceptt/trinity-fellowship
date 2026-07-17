import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/app/components/hero-section";
import { HashRedirect } from "@/app/components/hash-redirect";
import { MembersCTA } from "@/app/components/members-cta";
import { ScrollReveal, StaggerChildren, StaggerItem, TextReveal } from "@/app/components/animations";
import { weeklyRhythm } from "@/app/lib/site-content";
import { siteConfig } from "@/app/lib/site-config";

export const metadata: Metadata = {
  // No page-specific title: inherit the root layout's default
  // ("Trinity Fellowship Addis Ababa") which is the ideal home page title.
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const churchSchema = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "EGST Building, 5th Floor, Sarbet",
    addressLocality: "Addis Ababa",
    addressCountry: "ET",
  },
  sameAs: [siteConfig.instagram],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "https://schema.org/Sunday",
      opens: "09:00",
      closes: "10:00",
      description: "Corporate Prayer Meeting",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "https://schema.org/Sunday",
      opens: "10:00",
      closes: "12:00",
      description: "Worship Gathering",
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <HashRedirect />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(churchSchema) }}
      />

      {/* ── hero ───────────────────────────── */}
      <HeroSection />

      {/* ── who we are teaser ─────────────── */}
      <section className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
            Who We Are
          </p>
        </ScrollReveal>
        <TextReveal delay={0.1}>
          <h2 className="mt-3 text-4xl text-[color:var(--foreground)] sm:text-5xl">
            A Church Formed by Grace
          </h2>
        </TextReveal>
        <ScrollReveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--muted)]">
            We believe the church should feel both reverent and alive. As we worship, pray, preach,
            and serve, we seek a life that is spiritually deep, biblically grounded, and richly
            communal.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--brand)] transition-colors hover:text-[color:var(--brand-soft)]"
          >
            Learn more about us
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </ScrollReveal>
      </section>

      {/* ── compact sunday schedule ────────── */}
      <section className="border-y border-[color:var(--line)] bg-[color:var(--surface)]">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="text-center">
            <ScrollReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
                Sunday Schedule
              </p>
            </ScrollReveal>
            <TextReveal delay={0.1}>
              <h2 className="mt-3 text-3xl text-[color:var(--foreground)] sm:text-4xl">
                Join Us Every Sunday
              </h2>
            </TextReveal>
          </div>

          <StaggerChildren className="mx-auto mt-10 max-w-2xl space-y-3" staggerDelay={0.1}>
            {weeklyRhythm.map((item) => (
              <StaggerItem key={`${item.day}-${item.event}`} direction="up">
                <div className="flex items-center justify-between gap-4 rounded-xl border border-[color:var(--line)] bg-[color:var(--background)] px-5 py-4">
                  <div>
                    <p className="text-base font-semibold text-[color:var(--foreground)]">
                      {item.event}
                    </p>
                    <p className="text-sm text-[color:var(--muted)]">{item.summary}</p>
                  </div>
                  <p className="shrink-0 text-lg font-semibold tabular-nums text-[color:var(--accent)]">
                    {item.time}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <ScrollReveal delay={0.25}>
            <div className="mt-8 text-center">
              <Link
                href="/visit"
                className="inline-flex items-center justify-center rounded-full bg-[color:var(--brand)] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[color:var(--brand-soft)] hover:shadow-lg"
              >
                Plan Your Visit
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── members CTA (portal entry) ─────── */}
      <MembersCTA />

      {/* ── closing visit CTA ──────────────── */}
      <section className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-24">
        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
            Visit
          </p>
        </ScrollReveal>
        <TextReveal delay={0.1}>
          <h2 className="mt-3 text-3xl text-[color:var(--foreground)] sm:text-4xl">
            We&apos;d Love to Welcome You This Sunday
          </h2>
        </TextReveal>
        <ScrollReveal delay={0.2}>
          <p className="mx-auto mt-4 max-w-xl text-[color:var(--muted)]">
            Trinity Fellowship meets in the Sarbet area of Addis Ababa. Find directions, times, and
            more on our visit page.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <div className="mt-8">
            <Link
              href="/visit"
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-7 py-3.5 text-sm font-semibold text-[color:var(--brand)] transition-all duration-300 hover:border-[color:var(--brand)] hover:shadow-md"
            >
              Get Directions &amp; Times
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
