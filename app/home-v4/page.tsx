import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Spectral, Karla } from "next/font/google";
import {
  ScrollReveal,
  StaggerChildren,
  StaggerItem,
  TextReveal,
  StickyImageSection,
} from "@/app/components/animations";
import { DesignOptionSwitcher } from "@/app/components/design-option-switcher";

/* Morning Light type: Spectral's light cuts breathe at display sizes; Karla grounds the body */
const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display-theme",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-body-theme",
});

export const metadata: Metadata = {
  title: "Homepage Option 4 · Morning Light",
  robots: { index: false, follow: false },
};

/* Morning palette: warm cream, sage green, soft honey gold */
const sage = "#6b7d5f";
const honey = "#b98a4a";
const inkNavy = "#1f3b53";
const mutedText = "#586574";

const morningRhythm = [
  {
    number: "01",
    title: "Gather",
    time: "9:00 AM",
    detail:
      "We begin the morning together in corporate prayer — a dedicated hour of seeking God before the worship service.",
  },
  {
    number: "02",
    title: "Worship",
    time: "10:00 AM",
    detail:
      "Expository preaching, congregational singing, and shared fellowship as we exalt Jesus Christ with reverence, joy, and expectancy.",
  },
  {
    number: "03",
    title: "Go",
    time: "After the service",
    detail:
      "We linger over coffee and conversation, then scatter into the week — sent to make disciples and serve our city with gospel clarity and love.",
  },
];

export default function HomeV5() {
  return (
    <div className={`${spectral.variable} ${karla.variable} themed-type min-h-screen overflow-hidden bg-[#f7f3ea]`}>
      {/* ── quiet type-only hero ───────────── */}
      <section className="relative flex min-h-[92svh] items-center justify-center px-5 pt-24 sm:px-8">
        {/* morning sun glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(760px 460px at 50% -8%, rgba(185,138,74,0.18), transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: honey }}>
              Trinity Fellowship · Addis Ababa
            </p>
          </ScrollReveal>

          <div className="mt-10 space-y-2">
            <TextReveal delay={0.12}>
              <h1 className="text-[clamp(2.9rem,6.5vw,5.25rem)] font-light leading-[1.08]" style={{ color: inkNavy }}>
                Worship God.
              </h1>
            </TextReveal>
            <TextReveal delay={0.28}>
              <h1 className="text-[clamp(2.9rem,6.5vw,5.25rem)] font-light leading-[1.08]" style={{ color: inkNavy }}>
                Grow in <span className="italic" style={{ color: sage }}>grace.</span>
              </h1>
            </TextReveal>
            <TextReveal delay={0.44}>
              <h1 className="text-[clamp(2.9rem,6.5vw,5.25rem)] font-light leading-[1.08]" style={{ color: inkNavy }}>
                Bear witness to <span className="italic" style={{ color: honey }}>Christ.</span>
              </h1>
            </TextReveal>
          </div>

          <ScrollReveal delay={0.6}>
            <p className="mx-auto mt-9 max-w-md text-lg leading-relaxed" style={{ color: mutedText }}>
              A gospel-centered community that exists to know God and make Him known.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.72}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/visit"
                className="inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: sage }}
              >
                Join Us Sunday
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-70"
                style={{ color: inkNavy }}
              >
                About our church
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.85}>
            <p className="mt-14 text-xs font-bold uppercase tracking-[0.12em]" style={{ color: mutedText }}>
              ( scroll )
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── cinematic pinned image ─────────── */}
      <StickyImageSection
        scrollLength={1.5}
        overlay={
          <div className="mx-auto w-full max-w-4xl px-5 text-center sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#e9c88f]">
              Every Sunday Morning
            </p>
            <h2 className="mt-6 text-[clamp(2.25rem,5vw,4rem)] font-light leading-[1.15] tracking-[0.01em] text-[#f5f0e8]">
              One people, gathered <span className="italic">in His presence.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg font-serif text-xl italic leading-relaxed tracking-[0.01em] text-[#f5f0e8]/80">
              &ldquo;In the morning, LORD, you hear my voice; in the morning I lay my requests
              before you.&rdquo; — Psalm 5:3
            </p>
          </div>
        }
      >
        <Image
          src="/images/hero-image.jpg"
          alt="The congregation bowed in prayer in golden morning light"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,30,26,0.5) 0%, rgba(20,30,26,0.62) 100%)",
          }}
        />
      </StickyImageSection>

      {/* ── the shape of a sunday ──────────── */}
      <section className="mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="text-center">
          <ScrollReveal>
            <p className="font-serif text-2xl italic" style={{ color: honey }}>
              The shape of a Sunday —
            </p>
          </ScrollReveal>
          <TextReveal delay={0.1}>
            <h2 className="mt-4 text-4xl font-light sm:text-5xl" style={{ color: inkNavy }}>
              Gather · Worship · Go
            </h2>
          </TextReveal>
        </div>

        <StaggerChildren className="mt-16" staggerDelay={0.14}>
          {morningRhythm.map((step) => (
            <StaggerItem key={step.number} direction="up">
              <div className="grid gap-3 border-t border-[#ddd4c2] py-10 sm:grid-cols-[90px_220px_1fr] sm:gap-8">
                <p className="font-serif text-xl italic" style={{ color: sage }}>
                  {step.number}
                </p>
                <div>
                  <h3 className="font-serif text-3xl font-medium" style={{ color: inkNavy }}>
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm font-bold uppercase tracking-[0.1em]" style={{ color: honey }}>
                    {step.time}
                  </p>
                </div>
                <p className="text-lg leading-relaxed" style={{ color: mutedText }}>
                  {step.detail}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <ScrollReveal delay={0.2}>
          <div className="border-t border-[#ddd4c2] pt-10 text-center">
            <Link
              href="/visit/what-to-expect"
              className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-70"
              style={{ color: inkNavy }}
            >
              What to expect on your first visit
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ── rooted in Addis (bright band) ──── */}
      <section className="relative flex min-h-[64svh] items-start overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/addis-landscape.jpg"
            alt="The modern Addis Ababa skyline reflected in still water on a bright morning"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        {/* text sits in the photo's empty sky */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#f7f3ea]/70 to-transparent"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-5 pt-16 text-center sm:px-8 sm:pt-20">
          <ScrollReveal>
            <p className="font-serif text-2xl italic" style={{ color: inkNavy }}>
              Our city —
            </p>
            <h2 className="mt-4 text-4xl font-light sm:text-5xl" style={{ color: inkNavy }}>
              Rooted in Addis Ababa
            </h2>
          </ScrollReveal>
        </div>
      </section>

      {/* ── community + children glimpse ───── */}
      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <ScrollReveal direction="right">
            <div className="relative mx-auto w-full max-w-md">
              <div className="relative aspect-square overflow-hidden rounded-full shadow-[0_30px_60px_-30px_rgba(31,59,83,0.4)]">
                <Image
                  src="/images/group-photo.jpeg"
                  alt="The church family celebrating together, hands raised"
                  fill
                  sizes="(min-width: 1024px) 36vw, 85vw"
                  className="object-cover object-center"
                />
              </div>
              <div
                aria-hidden
                className="absolute -right-3 -top-3 -z-10 h-full w-full rounded-full border"
                style={{ borderColor: "rgba(185,138,74,0.45)" }}
              />
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal>
              <p className="font-serif text-2xl italic" style={{ color: honey }}>
                Life together —
              </p>
            </ScrollReveal>
            <TextReveal delay={0.1}>
              <h2 className="mt-4 text-4xl font-light sm:text-5xl" style={{ color: inkNavy }}>
                A Family Formed by Grace
              </h2>
            </TextReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed" style={{ color: mutedText }}>
                We believe the church should feel both reverent and alive — spiritually deep,
                biblically grounded, and richly communal. There is a place here for the whole
                family, including a children&apos;s ministry every Sunday at 11:00.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-70"
                  style={{ color: inkNavy }}
                >
                  Our story
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
                <Link
                  href="/children"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-70"
                  style={{ color: sage }}
                >
                  Children&apos;s ministry
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── closing invitation ─────────────── */}
      <section className="relative overflow-hidden border-t border-[#ddd4c2] px-5 py-24 text-center sm:px-8 sm:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(680px 400px at 50% 115%, rgba(185,138,74,0.16), transparent 70%)",
          }}
        />
        <div className="relative">
          <TextReveal>
            <h2 className="text-[clamp(3rem,8vw,6rem)] font-light italic leading-[1.05]" style={{ color: inkNavy }}>
              Come &amp; see.
            </h2>
          </TextReveal>
          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed" style={{ color: mutedText }}>
              Sundays at 10:00 AM — EGST Building, 5th Floor, Sarbet, Addis Ababa.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.32}>
            <div className="mt-9">
              <Link
                href="/visit"
                className="inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: sage }}
              >
                Plan Your Visit
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <DesignOptionSwitcher />
    </div>
  );
}
