import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Marcellus, Figtree, EB_Garamond } from "next/font/google";
import {
  ScrollReveal,
  StaggerChildren,
  StaggerItem,
  TextReveal,
} from "@/app/components/animations";
import { DesignOptionSwitcher } from "@/app/components/design-option-switcher";
import { weeklyRhythm, ministryFocus } from "@/app/lib/site-content";

/*
 * Evening Glow type: Marcellus (inscriptional Roman, single weight — carved
 * stone in candlelight) for display, Figtree for body on dark, and EB Garamond
 * italic reserved exclusively for the voice of Scripture.
 */
const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-theme",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-body-theme",
});

const scripture = EB_Garamond({
  subsets: ["latin"],
  weight: "500",
  style: "italic",
  variable: "--font-scripture",
});

export const metadata: Metadata = {
  title: "Homepage Option 3 · Evening Glow",
  robots: { index: false, follow: false },
};

/* Evening palette: deep ink navy, candlelight gold, warm cream */
const deep = "#0f1e2b";
const deepSoft = "#152a3b";
const gold = "#d9a441";
const cream = "#f3ecdd";
const creamFaded = "rgba(243, 236, 221, 0.68)";

export default function HomeV3() {
  return (
    <div
      className={`${marcellus.variable} ${figtree.variable} ${scripture.variable} themed-type min-h-screen overflow-hidden`}
    >
      {/* ── full-bleed hero ────────────────── */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden" style={{ backgroundColor: deep }}>
        {/* photo layer */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-image.jpg"
            alt="Sunday worship gathering at Trinity Fellowship"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </div>
        {/* warm dark wash */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,30,43,0.55) 0%, rgba(15,30,43,0.78) 55%, #0f1e2b 100%)",
          }}
        />
        {/* candlelight glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(700px 420px at 50% 68%, rgba(217,164,65,0.22), transparent 70%)",
          }}
        />
        {/* light haze at top so the fixed header stays readable */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#f5f0e8]/85 via-[#f5f0e8]/35 to-transparent"
        />

        <div className="relative z-10 mx-auto max-w-4xl px-5 py-32 text-center sm:px-8">
          <ScrollReveal>
            <p className="font-serif text-sm uppercase tracking-[0.12em]" style={{ color: gold }}>
              Trinity Fellowship · Addis Ababa
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.12} direction="none">
            <p aria-hidden className="mt-8 text-lg" style={{ color: gold }}>
              ✦
            </p>
          </ScrollReveal>

          <TextReveal delay={0.2}>
            <h1
              className="mt-6 text-[clamp(2.9rem,6vw,5.25rem)] leading-[1.12] tracking-[0.01em]"
              style={{ color: cream }}
            >
              A people gathered to <span style={{ color: gold }}>know God</span> and make Him
              known.
            </h1>
          </TextReveal>

          <ScrollReveal delay={0.38}>
            <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed" style={{ color: creamFaded }}>
              Worship God. Grow in grace. Bear witness to Christ.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/visit"
                className="inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_40px_-10px_rgba(217,164,65,0.6)]"
                style={{ backgroundColor: gold, color: deep }}
              >
                Join Us Sunday
              </Link>
              <Link
                href="/visit/what-to-expect"
                className="inline-flex items-center justify-center rounded-full border px-8 py-4 text-sm font-semibold transition-all duration-300 hover:bg-white/10"
                style={{ borderColor: "rgba(243,236,221,0.35)", color: cream }}
              >
                What to Expect
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.62}>
            <p className="mt-10 text-sm font-medium tracking-wide" style={{ color: creamFaded }}>
              Sundays 10:00 AM · EGST Building, 5th Floor, Sarbet
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── verse interlude (dark) ─────────── */}
      <section className="px-5 py-20 text-center sm:px-8 sm:py-24" style={{ backgroundColor: deep }}>
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <div aria-hidden className="mx-auto h-px w-16" style={{ backgroundColor: "rgba(217,164,65,0.5)" }} />
            <blockquote className="mt-8">
              <p
                className="text-[clamp(1.7rem,3.4vw,2.5rem)] italic leading-[1.4] [font-family:var(--font-scripture),serif]"
                style={{ color: cream }}
              >
                &ldquo;Come, let us bow down in worship, let us kneel before the LORD our
                Maker.&rdquo;
              </p>
              <cite
                className="mt-6 block font-serif text-xs uppercase not-italic tracking-[0.12em]"
                style={{ color: gold }}
              >
                Psalm 95 : 6
              </cite>
            </blockquote>
            <div aria-hidden className="mx-auto mt-8 h-px w-16" style={{ backgroundColor: "rgba(217,164,65,0.5)" }} />
          </div>
        </ScrollReveal>
      </section>

      {/* ── welcome (warm light) ───────────── */}
      <section className="bg-[#f5f0e8]">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-20">
          <div>
            <ScrollReveal>
              <p className="font-serif text-sm uppercase tracking-[0.12em] text-[#a8762f]">
                You&apos;re Welcome Here
              </p>
            </ScrollReveal>
            <TextReveal delay={0.1}>
              <h2 className="mt-3 text-4xl text-[#1f3b53] sm:text-5xl">
                Come as You Are, Leave Formed by Grace
              </h2>
            </TextReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-[#586574]">
                We believe the church should feel both reverent and alive. Whether you have
                followed Jesus for decades or are simply curious, there is a seat for you — as we
                worship, pray, preach, and serve together in the heart of Addis.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1f3b53] transition-colors hover:text-[#506d83]"
              >
                Learn more about us
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
            </ScrollReveal>
          </div>

          <ScrollReveal direction="left" delay={0.15}>
            <div className="relative mx-auto w-full max-w-md">
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] shadow-[0_30px_60px_-30px_rgba(15,30,43,0.5)]">
                <Image
                  src="/images/group-photo.jpeg"
                  alt="The Trinity Fellowship church family gathered together"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover object-center"
                />
              </div>
              <div
                aria-hidden
                className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-t-[999px] rounded-b-[2rem]"
                style={{ backgroundColor: "rgba(217,164,65,0.25)" }}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── ministries + schedule (dark band) ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${deep} 0%, ${deepSoft} 100%)`,
        }}
      >
        {/* candlelight dot texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(217,164,65,0.14) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="text-center">
            <ScrollReveal>
              <p className="font-serif text-sm uppercase tracking-[0.12em]" style={{ color: gold }}>
                What Shapes Us
              </p>
            </ScrollReveal>
            <TextReveal delay={0.1}>
              <h2 className="mt-3 text-4xl sm:text-5xl" style={{ color: cream }}>
                Word · Worship · Witness
              </h2>
            </TextReveal>
          </div>

          <StaggerChildren className="mt-14 grid gap-6 md:grid-cols-3" staggerDelay={0.12}>
            {ministryFocus.map((item) => (
              <StaggerItem key={item.number} direction="up">
                <div
                  className="group h-full rounded-2xl border p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1"
                  style={{
                    borderColor: "rgba(217,164,65,0.2)",
                    backgroundColor: "rgba(243,236,221,0.04)",
                  }}
                >
                  <p className="font-serif text-5xl" style={{ color: "rgba(217,164,65,0.55)" }}>
                    {item.number}
                  </p>
                  <h3 className="mt-5 font-serif text-2xl" style={{ color: cream }}>
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed tracking-[0.01em]" style={{ color: creamFaded }}>
                    {item.detail}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>

          {/* schedule */}
          <div className="mx-auto mt-24 max-w-2xl">
            <div className="text-center">
              <ScrollReveal>
                <p className="font-serif text-sm uppercase tracking-[0.12em]" style={{ color: gold }}>
                  Sundays
                </p>
              </ScrollReveal>
              <TextReveal delay={0.1}>
                <h2 className="mt-3 text-3xl sm:text-4xl" style={{ color: cream }}>
                  A Morning Together
                </h2>
              </TextReveal>
            </div>

            <StaggerChildren className="mt-10" staggerDelay={0.14}>
              {weeklyRhythm.map((item) => (
                <StaggerItem key={item.event} direction="up">
                  <div
                    className="flex items-baseline justify-between gap-6 border-b py-6"
                    style={{ borderColor: "rgba(243,236,221,0.12)" }}
                  >
                    <div>
                      <h3 className="text-xl" style={{ color: cream }}>
                        {item.event}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed tracking-[0.01em]" style={{ color: creamFaded }}>
                        {item.summary}
                      </p>
                    </div>
                    <p
                      className="shrink-0 font-serif text-2xl tabular-nums"
                      style={{ color: gold }}
                    >
                      {item.time}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* ── photo pair (warm light) ────────── */}
      <section className="bg-[#f5f0e8] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2">
          <ScrollReveal direction="right">
            <figure>
              <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
                <Image
                  src="/images/scripture-prayer.jpg"
                  alt="Praying over open scripture"
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              </div>
              <figcaption className="mt-3 font-serif text-lg italic text-[#1f3b53]">
                Rooted in prayer and the Word
              </figcaption>
            </figure>
          </ScrollReveal>
          <ScrollReveal direction="left" delay={0.15}>
            <figure className="sm:mt-12">
              <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
                <Image
                  src="/images/children-ministry.jpg"
                  alt="Children's ministry classroom"
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              </div>
              <figcaption className="mt-3 font-serif text-lg italic text-[#1f3b53]">
                A place for the whole family
              </figcaption>
            </figure>
          </ScrollReveal>
        </div>
      </section>

      {/* ── closing CTA (dark glow) ────────── */}
      <section className="relative overflow-hidden px-5 py-24 text-center sm:px-8 sm:py-32" style={{ backgroundColor: deep }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(640px 380px at 50% 100%, rgba(217,164,65,0.24), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl">
          <ScrollReveal>
            <p aria-hidden className="text-lg" style={{ color: gold }}>
              ✦
            </p>
          </ScrollReveal>
          <TextReveal delay={0.1}>
            <h2 className="mt-6 text-4xl sm:text-5xl" style={{ color: cream }}>
              We&apos;d Love to Welcome You This Sunday
            </h2>
          </TextReveal>
          <ScrollReveal delay={0.25}>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed" style={{ color: creamFaded }}>
              Trinity Fellowship meets in the Sarbet area of Addis Ababa. Find directions, times,
              and everything you need for your first visit.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.38}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/visit"
                className="inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_40px_-10px_rgba(217,164,65,0.6)]"
                style={{ backgroundColor: gold, color: deep }}
              >
                Plan Your Visit
              </Link>
              <Link
                href="/visit/what-to-expect"
                className="inline-flex items-center justify-center rounded-full border px-8 py-4 text-sm font-semibold transition-all duration-300 hover:bg-white/10"
                style={{ borderColor: "rgba(243,236,221,0.35)", color: cream }}
              >
                What to Expect
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <DesignOptionSwitcher />
    </div>
  );
}
