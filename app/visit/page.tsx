import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/app/components/page-hero";
import { NextStepCTA } from "@/app/components/next-step-cta";
import { weeklyRhythm } from "@/app/lib/site-content";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "Trinity Fellowship meets in the Sarbet area of Addis Ababa for Sunday worship at 9:00 AM and 10:00 AM EAT. Find directions to our Sunday gathering and weekday church office.",
  alternates: { canonical: "/visit" },
};

const places = [
  {
    name: "Sunday Gathering",
    address: "5th Floor, EGST · Sarbet",
    href: "https://www.google.com/maps/search/?api=1&query=Trinity+Fellowship+Addis+Ababa",
  },
  {
    name: "Church Office",
    address: "1st Floor, Karama Building",
    href: "https://maps.app.goo.gl/wEFC31hvkY5aKcDMA",
  },
];

export default function VisitPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        title="Join Us This Sunday"
        lede="Trinity Fellowship meets in the Sarbet area of Addis Ababa for Sunday worship. During the week, you can also visit our church office on the first floor of Karama Building."
      />

      {/* ── full schedule ──────────────────── */}
      <section className="mx-auto max-w-3xl px-5 pt-20 pb-16 sm:px-8 sm:pt-24 sm:pb-20">
        <p className="max-w-[54ch] text-[color:var(--muted)]">
          All times are Addis Ababa local time (EAT). Our two regular Sunday gatherings are
          corporate prayer at 9:00 AM and worship at 10:00 AM.
        </p>

        <dl className="mt-10 border-t border-[color:var(--line)]">
          {weeklyRhythm.map((item) => (
            <div
              key={`${item.day}-${item.event}`}
              className="flex flex-col gap-1 border-b border-[color:var(--line)] py-6 sm:flex-row sm:items-baseline sm:gap-8"
            >
              <dt className="shrink-0 font-serif text-2xl tabular-nums text-[color:var(--accent)] sm:w-32">
                {item.time}
              </dt>
              <dd>
                <p className="font-serif text-xl text-[color:var(--brand)]">{item.event}</p>
                <p className="mt-1 max-w-[54ch] text-sm leading-relaxed text-[color:var(--muted)]">
                  {item.day} · {item.summary}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── where to find us ────────────────── */}
      <section className="border-t border-[color:var(--line)] bg-[color:var(--surface)]">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.2] text-[color:var(--brand)]">
            Find Us
          </h2>
          <p className="mt-4 max-w-[54ch] text-[color:var(--muted)]">
            One church, two places: the Sunday gathering and the weekday office. Each address opens
            in maps.
          </p>

          <ul className="mt-9 border-t border-[color:var(--line)]">
            {places.map((place) => (
              <li key={place.name}>
                <a
                  href={place.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-6 border-b border-[color:var(--line)] py-5 transition-colors duration-200 hover:bg-[color:var(--background)]"
                >
                  <span>
                    <span className="block font-serif text-xl text-[color:var(--brand)]">
                      {place.name}
                    </span>
                    <span className="mt-1 block text-sm text-[color:var(--muted)]">
                      {place.address}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-[color:var(--accent)]">
                    Open map
                    <span
                      aria-hidden
                      className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <Link
              href="/visit/what-to-expect"
              className="prose-link font-semibold text-[color:var(--brand)] hover:text-[color:var(--accent)]"
            >
              First time at Trinity? What to expect
            </Link>
            <a
              href="https://instagram.com/trinityfellowshipaddisababa"
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link font-semibold text-[color:var(--brand)] hover:text-[color:var(--accent)]"
            >
              Follow @trinityfellowshipaddisababa
            </a>
          </div>
        </div>
      </section>

      <NextStepCTA
        title="Sign In to Stay Connected"
        description="Members can sign in to browse the church directory and share prayer requests with our fellowship."
        links={[
          { label: "Sign In as a Member", href: "/members" },
          { label: "About Membership", href: "/membership", variant: "outline" },
        ]}
      />
    </div>
  );
}
