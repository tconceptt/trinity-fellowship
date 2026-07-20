import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Libre_Caslon_Display, Libre_Caslon_Text } from "next/font/google";
import { ScrollReveal, StaggerChildren, StaggerItem, TextReveal } from "@/app/components/animations";
import { DesignOptionSwitcher } from "@/app/components/design-option-switcher";
import { weeklyRhythm, ministryFocus } from "@/app/lib/site-content";

/*
 * Editorial type: a matched letterpress pairing. Caslon Display carries the
 * big roman headlines; Caslon Text sets everything else, including the true
 * italics (the Display cut has none — never fake a slant).
 */
const caslonDisplay = Libre_Caslon_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-theme",
});

const caslonText = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-body-theme",
});

export const metadata: Metadata = {
  title: "Homepage Option 2 · Editorial",
  robots: { index: false, follow: false },
};

/* Editorial palette: warm paper, warm ink, terracotta accent */
const ink = "#26221b";
const terracotta = "#b0552f";
const faded = "#6f675a";
const rule = "#ddd2bf";

const spread = [
  {
    src: "/images/group-photo.jpeg",
    alt: "The Trinity Fellowship church family",
    caption: "The church family, gathered after worship",
    tall: true,
  },
  {
    src: "/images/scripture-prayer.jpg",
    alt: "Praying over open scripture",
    caption: "Prayer and the open Word",
    tall: false,
  },
  {
    src: "/images/children-ministry.jpg",
    alt: "Children's ministry classroom",
    caption: "Children's ministry, Sundays at 11:00",
    tall: false,
  },
  {
    src: "/images/addis-city.jpg",
    alt: "The city of Addis Ababa",
    caption: "Addis Ababa — the city we love and serve",
    tall: true,
  },
];

export default function HomeV2() {
  return (
    <div
      className={`${caslonDisplay.variable} ${caslonText.variable} themed-type min-h-screen overflow-hidden bg-[#faf6ee] text-[#26221b]`}
    >
      {/* ── masthead hero ──────────────────── */}
      <section className="mx-auto max-w-6xl px-5 pt-32 sm:px-8 lg:pt-36">
        {/* meta row */}
        <ScrollReveal>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b pb-4 text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ borderColor: rule, color: faded }}>
            <p>Trinity Fellowship — Addis Ababa, Ethiopia</p>
            <p>Sundays · 10:00 AM · Sarbet</p>
          </div>
        </ScrollReveal>

        {/* oversized statement */}
        <div className="grid gap-10 pt-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16 lg:pt-16">
          <div>
            <TextReveal delay={0.1}>
              <h1
                className="text-[clamp(3rem,7.5vw,6rem)] leading-[1.02] tracking-[-0.015em] [font-family:var(--font-display-theme),serif]"
                style={{ color: ink }}
              >
                Know God.
              </h1>
            </TextReveal>
            <TextReveal delay={0.22}>
              <h1
                className="text-[clamp(3rem,7.5vw,6rem)] italic leading-[1.02] tracking-[-0.015em] [font-family:var(--font-body-theme),serif]"
                style={{ color: terracotta }}
              >
                &amp; make Him known.
              </h1>
            </TextReveal>
          </div>

          <div className="flex flex-col justify-end pb-2 lg:pb-4">
            <ScrollReveal delay={0.35}>
              <p className="max-w-sm text-lg leading-relaxed" style={{ color: faded }}>
                Trinity Fellowship is a gospel-centered community in Addis Ababa. We worship God,
                grow in grace, and bear witness to Christ.
              </p>
              <Link
                href="/visit"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] transition-colors"
                style={{ color: ink }}
              >
                <span className="border-b-2 pb-0.5 transition-colors group-hover:border-[#b0552f]" style={{ borderColor: ink }}>
                  Plan your visit
                </span>
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </ScrollReveal>
          </div>
        </div>

        {/* full-width lead photo */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12 lg:mt-16">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl sm:aspect-[21/9]">
              <Image
                src="/images/hero-image.jpg"
                alt="Sunday worship gathering at Trinity Fellowship"
                fill
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="object-cover object-center"
                priority
              />
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-2 pt-3 text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ color: faded }}>
              <p>Fig. 01 — The Sunday worship gathering</p>
              <p>EGST Building, 5th Floor</p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── 01 · who we are ────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <ScrollReveal>
          <div className="flex items-baseline gap-4 border-t pt-5" style={{ borderColor: rule }}>
            <p className="text-sm font-bold tabular-nums [font-family:var(--font-body-theme),serif]" style={{ color: terracotta }}>
              01
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: faded }}>
              Who We Are
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-10 pt-10 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <TextReveal delay={0.1}>
            <h2
              className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.15] [font-family:var(--font-display-theme),serif]"
              style={{ color: ink }}
            >
              A church that feels both{" "}
              <em className="[font-family:var(--font-body-theme),serif]" style={{ color: terracotta }}>
                reverent
              </em>{" "}
              and{" "}
              <em className="[font-family:var(--font-body-theme),serif]" style={{ color: terracotta }}>
                alive.
              </em>
            </h2>
          </TextReveal>
          <ScrollReveal delay={0.25}>
            <div className="flex flex-col justify-end">
              <p className="text-lg leading-relaxed" style={{ color: faded }}>
                As we worship, pray, preach, and serve, we seek a life that is spiritually deep,
                biblically grounded, and richly communal — formed by grace, from beginning to end.
              </p>
              <Link
                href="/about"
                className="group mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em]"
                style={{ color: ink }}
              >
                <span className="border-b-2 pb-0.5 transition-colors group-hover:border-[#b0552f]" style={{ borderColor: ink }}>
                  Our story
                </span>
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 02 · what shapes us (index rows) ── */}
      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 sm:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline gap-4 border-t pt-5" style={{ borderColor: rule }}>
            <p className="text-sm font-bold tabular-nums [font-family:var(--font-body-theme),serif]" style={{ color: terracotta }}>
              02
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: faded }}>
              What Shapes Us
            </p>
          </div>
        </ScrollReveal>

        <StaggerChildren className="mt-6" staggerDelay={0.12}>
          {ministryFocus.map((item) => (
            <StaggerItem key={item.number} direction="up">
              <div
                className="group grid items-baseline gap-2 border-b py-8 transition-colors sm:grid-cols-[80px_1fr_1.4fr] sm:gap-8"
                style={{ borderColor: rule }}
              >
                <p
                  className="text-sm font-bold tabular-nums [font-family:var(--font-body-theme),serif]"
                  style={{ color: faded }}
                >
                  ({item.number})
                </p>
                <h3
                  className="text-4xl transition-colors duration-300 [font-family:var(--font-display-theme),serif] group-hover:text-[#b0552f] sm:text-5xl"
                  style={{ color: ink }}
                >
                  {item.title}
                </h3>
                <p className="text-lg leading-relaxed" style={{ color: faded }}>
                  {item.detail}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* ── pull quote ─────────────────────── */}
      <section className="mx-auto max-w-4xl px-5 pb-24 text-center sm:px-8 sm:pb-32">
        <ScrollReveal>
          <p aria-hidden className="text-2xl" style={{ color: terracotta }}>
            ✦
          </p>
          <blockquote className="mt-6">
            <p
              className="text-[clamp(1.75rem,3.6vw,2.75rem)] italic leading-[1.35] [font-family:var(--font-body-theme),serif]"
              style={{ color: ink }}
            >
              &ldquo;Since we are receiving a kingdom that cannot be shaken, let us be thankful,
              and so worship God acceptably with reverence and awe.&rdquo;
            </p>
            <cite className="mt-6 block text-[11px] font-semibold uppercase not-italic tracking-[0.12em]" style={{ color: faded }}>
              Hebrews 12 : 28
            </cite>
          </blockquote>
        </ScrollReveal>
      </section>

      {/* ── 03 · sundays (timetable) ───────── */}
      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 sm:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline gap-4 border-t pt-5" style={{ borderColor: rule }}>
            <p className="text-sm font-bold tabular-nums [font-family:var(--font-body-theme),serif]" style={{ color: terracotta }}>
              03
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: faded }}>
              Sundays at Trinity
            </p>
          </div>
        </ScrollReveal>

        <StaggerChildren className="mt-6" staggerDelay={0.15}>
          {weeklyRhythm.map((item) => (
            <StaggerItem key={item.event} direction="up">
              <div
                className="grid items-baseline gap-2 border-b py-8 sm:grid-cols-[220px_1fr] sm:gap-10"
                style={{ borderColor: rule }}
              >
                <p
                  className="text-4xl tabular-nums [font-family:var(--font-display-theme),serif] sm:text-5xl"
                  style={{ color: terracotta }}
                >
                  {item.time}
                </p>
                <div>
                  <h3 className="text-2xl font-semibold" style={{ color: ink }}>
                    {item.event}
                  </h3>
                  <p className="mt-1.5 text-lg leading-relaxed" style={{ color: faded }}>
                    {item.summary}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <ScrollReveal delay={0.2}>
          <div className="pt-10">
            <Link
              href="/visit"
              className="inline-flex items-center justify-center gap-2 rounded-md px-8 py-4 text-sm font-bold uppercase tracking-[0.1em] text-[#faf6ee] transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
              style={{ backgroundColor: ink }}
            >
              Plan your visit
              <span aria-hidden>→</span>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ── photo spread ───────────────────── */}
      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 sm:pb-32">
        <StaggerChildren className="grid gap-x-6 gap-y-10 sm:grid-cols-2" staggerDelay={0.12}>
          {spread.map((photo, i) => (
            <StaggerItem key={photo.src} direction="up">
              <figure className={i % 2 === 1 ? "sm:mt-16" : ""}>
                <div
                  className={`relative overflow-hidden rounded-xl ${photo.tall ? "aspect-[4/5]" : "aspect-[5/4]"}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <figcaption
                  className="pt-3 text-[11px] font-semibold uppercase tracking-[0.1em]"
                  style={{ color: faded }}
                >
                  Fig. {String(i + 2).padStart(2, "0")} — {photo.caption}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* ── closing statement ──────────────── */}
      <section className="border-t px-5 py-24 text-center sm:px-8 sm:py-32" style={{ borderColor: rule }}>
        <TextReveal>
          <h2
            className="mx-auto max-w-4xl text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.05] tracking-[-0.015em] [font-family:var(--font-display-theme),serif]"
            style={{ color: ink }}
          >
            Come, worship{" "}
            <em className="[font-family:var(--font-body-theme),serif]" style={{ color: terracotta }}>
              with us.
            </em>
          </h2>
        </TextReveal>
        <ScrollReveal delay={0.25}>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed" style={{ color: faded }}>
            Sundays at 10:00 AM — EGST Building, 5th Floor, Sarbet, Addis Ababa.
          </p>
          <Link
            href="/visit"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em]"
            style={{ color: terracotta }}
          >
            <span className="border-b-2 border-[#b0552f] pb-0.5">Directions &amp; times</span>
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </ScrollReveal>
      </section>

      <DesignOptionSwitcher />
    </div>
  );
}
