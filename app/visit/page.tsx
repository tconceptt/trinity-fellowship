import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/app/components/page-hero";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/app/components/animations";
import { weeklyRhythm } from "@/app/lib/site-content";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "Trinity Fellowship meets in the Sarbet area of Addis Ababa for Sunday worship at 9:00 AM and 10:00 AM EAT. Find directions to our Sunday gathering and weekday church office.",
  alternates: { canonical: "/visit" },
};

export default function VisitPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Visit"
        title="Join Us This Sunday"
        lede="Trinity Fellowship meets in the Sarbet area of Addis Ababa for Sunday worship. During the week, you can also visit our church office on the first floor of Karama Building."
      />

      {/* ── full schedule ──────────────────── */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20">
        <ScrollReveal>
          <p className="max-w-2xl text-[color:var(--muted)]">
            All times are Addis Ababa local time (EAT). Our two regular Sunday gatherings are
            corporate prayer at 9:00 AM and worship at 10:00 AM.
          </p>
        </ScrollReveal>

        <StaggerChildren className="mt-8 space-y-4" staggerDelay={0.1}>
          {weeklyRhythm.map((item) => (
            <StaggerItem key={`${item.day}-${item.event}`} direction="up">
              <div className="group relative grid items-center gap-4 rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-5 transition-all duration-400 hover:border-[color:var(--brand-soft)] hover:shadow-lg hover:shadow-[rgba(31,59,83,0.06)] sm:grid-cols-[120px_1fr_auto] sm:p-6">
                {/* day badge */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--brand-soft)]">
                    {item.day}
                  </p>
                </div>

                {/* event details */}
                <div>
                  <h2 className="text-2xl text-[color:var(--foreground)] transition-colors duration-300 group-hover:text-[color:var(--brand)] sm:text-3xl">
                    {item.event}
                  </h2>
                  <p className="mt-1 text-sm text-[color:var(--muted)]">{item.summary}</p>
                </div>

                {/* time */}
                <div className="sm:text-right">
                  <p className="text-xl font-semibold tabular-nums text-[color:var(--accent)]">
                    {item.time}
                  </p>
                </div>

                {/* hover accent line */}
                <span className="absolute bottom-0 left-6 right-6 h-[2px] scale-x-0 bg-[color:var(--accent)] transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* ── locations + instagram ───────────── */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
        <StaggerChildren className="mx-auto grid max-w-3xl gap-5" staggerDelay={0.12}>
          {/* Locations */}
          <StaggerItem direction="up">
            <div className="relative w-full overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[linear-gradient(135deg,rgba(31,59,83,0.06),rgba(31,59,83,0.015))] p-6">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[color:var(--brand)]/10">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-semibold text-[color:var(--foreground)]">
                    Find Us
                  </p>
                  <p className="mt-1 text-sm text-[color:var(--muted)]">
                    One church, two places: Sunday gathering and weekday office.
                  </p>
                </div>
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--brand-soft)]">
                Tap a location to open maps
              </p>

              <div className="mt-3 space-y-3">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Trinity+Fellowship+Addis+Ababa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-3 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3 transition-all duration-300 hover:border-[color:var(--brand-soft)] hover:bg-[color:var(--surface-strong)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-soft)]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--brand)]/10">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[color:var(--foreground)] transition-colors duration-300 group-hover:text-[color:var(--brand)]">
                      Sunday Gathering
                    </p>
                    <p className="mt-1 text-xs text-[color:var(--muted)]">
                      5th Floor, EGST &middot; Sarbet
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[color:var(--brand-soft)]">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.1em]">
                      Open map
                    </span>
                    <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </div>
                </a>

                <a
                  href="https://maps.app.goo.gl/wEFC31hvkY5aKcDMA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-3 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3 transition-all duration-300 hover:border-[color:var(--brand-soft)] hover:bg-[color:var(--surface-strong)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-soft)]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--brand)]/10">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 21h18" />
                      <path d="M5 21V7l7-4 7 4v14" />
                      <path d="M9 21v-5h6v5" />
                      <path d="M9 10h.01" />
                      <path d="M15 10h.01" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[color:var(--foreground)] transition-colors duration-300 group-hover:text-[color:var(--brand)]">
                      Church Office
                    </p>
                    <p className="mt-1 text-xs text-[color:var(--muted)]">
                      1st Floor, Karama Building
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[color:var(--brand-soft)]">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.1em]">
                      Open map
                    </span>
                    <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </StaggerItem>

          {/* What to Expect */}
          <StaggerItem direction="up">
            <Link
              href="/visit/what-to-expect"
              className="group relative flex w-full items-center gap-5 overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-6 transition-all duration-300 hover:border-[color:var(--brand-soft)] hover:shadow-lg hover:shadow-[rgba(31,59,83,0.06)]"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[color:var(--brand)]/10 transition-transform duration-300 group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-lg font-semibold text-[color:var(--foreground)] transition-colors duration-300 group-hover:text-[color:var(--brand)]">
                  First Time at Trinity?
                </p>
                <p className="mt-0.5 text-sm text-[color:var(--muted)]">
                  What to expect on a Sunday — language, dress, parking, and kids.
                </p>
              </div>
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-[color:var(--brand-soft)] transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </StaggerItem>

          {/* Instagram */}
          <StaggerItem direction="up">
            <a
              href="https://instagram.com/trinityfellowshipaddisababa"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex w-full items-center gap-5 overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-6 transition-all duration-300 hover:border-[color:var(--brand-soft)] hover:shadow-lg hover:shadow-[rgba(31,59,83,0.06)]"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[color:var(--accent)]/10 transition-transform duration-300 group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="var(--accent)" stroke="none" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-lg font-semibold text-[color:var(--foreground)] transition-colors duration-300 group-hover:text-[color:var(--accent)]">
                  Follow on Instagram
                </p>
                <p className="mt-0.5 text-sm text-[color:var(--muted)]">
                  @trinityfellowshipaddisababa
                </p>
              </div>
            </a>
          </StaggerItem>
        </StaggerChildren>
      </section>

      {/* ── members mention ─────────────────── */}
      <section className="border-t border-[color:var(--line)] bg-[color:var(--surface)]">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
              Already a Member?
            </p>
            <h2 className="mt-3 text-2xl text-[color:var(--foreground)] sm:text-3xl">
              Sign In to Stay Connected
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[color:var(--muted)]">
              Members can sign in to browse the church directory and share prayer requests with
              our fellowship.
            </p>
            <div className="mt-6">
              <Link
                href="/members"
                className="inline-flex items-center justify-center rounded-full bg-[color:var(--brand)] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[color:var(--brand-soft)] hover:shadow-lg"
              >
                Sign In as a Member
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
