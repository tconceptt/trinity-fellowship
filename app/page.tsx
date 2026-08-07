import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "@/app/components/hero-section";
import { HashRedirect } from "@/app/components/hash-redirect";
import { MembersCTA } from "@/app/components/members-cta";
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

      <HeroSection />

      {/* ── who we are ─────────────────────── */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.15] text-[color:var(--brand)]">
            A Church Formed by Grace
          </h2>
          <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-[color:var(--muted)]">
            We believe the church should feel both reverent and alive. As we worship, pray, preach,
            and serve, we seek a life that is spiritually deep, biblically grounded, and richly
            communal.
          </p>
          <Link
            href="/about"
            className="prose-link mt-8 inline-block text-sm font-semibold text-[color:var(--brand)] hover:text-[color:var(--accent)]"
          >
            Learn more about us
          </Link>
        </div>

        <div className="relative aspect-[4/5] w-full max-w-md justify-self-center overflow-hidden rounded-2xl lg:justify-self-end">
          <Image
            src="/images/group-photo.jpeg"
            alt="The Trinity Fellowship church family gathered together"
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* ── sunday schedule ────────────────── */}
      <section className="band-deep">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
          <h2 className="text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.15]">
            Join Us Every Sunday
          </h2>

          <dl className="mt-10 border-t border-[color:var(--cream-line)]">
            {weeklyRhythm.map((item) => (
              <div
                key={`${item.day}-${item.event}`}
                className="flex flex-col gap-1 border-b border-[color:var(--cream-line)] py-6 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <dt className="shrink-0 font-serif text-2xl tabular-nums text-[color:var(--gold)] sm:w-32">
                  {item.time}
                </dt>
                <dd>
                  <p className="font-serif text-xl">{item.event}</p>
                  <p className="mt-1 max-w-[54ch] text-sm leading-relaxed text-[color:var(--cream-faded)]">
                    {item.summary}
                  </p>
                </dd>
              </div>
            ))}
          </dl>

          <Link
            href="/visit"
            className="mt-10 inline-flex items-center justify-center rounded-lg bg-[color:var(--gold)] px-7 py-3.5 text-sm font-semibold text-[color:var(--deep)] transition-colors duration-200 hover:bg-[color:var(--gold-bright)]"
          >
            Plan Your Visit
          </Link>
        </div>
      </section>

      {/* ── members portal entry ───────────── */}
      <MembersCTA />

      {/* ── closing visit CTA ──────────────── */}
      <section className="band-deep border-t border-[color:var(--cream-line)]">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-24">
          <h2 className="text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.15]">
            We&apos;d Love to Welcome You This Sunday
          </h2>
          <p className="mx-auto mt-5 max-w-[54ch] text-lg leading-relaxed text-[color:var(--cream-faded)]">
            Trinity Fellowship meets in the Sarbet area of Addis Ababa. Find directions, times, and
            more on our visit page.
          </p>
          <Link
            href="/visit"
            className="mt-10 inline-flex items-center justify-center rounded-lg border border-[color:var(--cream-line-strong)] px-7 py-3.5 text-sm font-semibold text-[color:var(--cream)] transition-colors duration-200 hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
          >
            Get Directions &amp; Times
          </Link>
        </div>
      </section>
    </div>
  );
}
