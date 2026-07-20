import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EB_Garamond, Hanken_Grotesk } from "next/font/google";
import {
  ScrollReveal,
  StaggerChildren,
  StaggerItem,
  TextReveal,
  InfiniteScrollLoop,
} from "@/app/components/animations";
import { DesignOptionSwitcher } from "@/app/components/design-option-switcher";
import { weeklyRhythm, ministryFocus } from "@/app/lib/site-content";

/* Warm Classic type: heirloom Garamond display + humanist grotesk body */
const garamond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display-theme",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body-theme",
});

export const metadata: Metadata = {
  title: "Homepage Option 1 · Warm Classic",
  robots: { index: false, follow: false },
};

const marqueeWords = ["Worship", "Prayer", "Scripture", "Community", "Grace", "Witness"];

const photoStrip = [
  {
    src: "/images/hero-image.jpg",
    alt: "Sunday worship gathering",
    caption: "Sunday worship",
    rotate: "-rotate-2",
  },
  {
    src: "/images/scripture-prayer.jpg",
    alt: "Praying over open scripture",
    caption: "Prayer & the Word",
    rotate: "rotate-1",
  },
  {
    src: "/images/children-ministry.jpg",
    alt: "Children's ministry classroom",
    caption: "Children's ministry",
    rotate: "-rotate-1",
  },
];

export default function HomeV1() {
  return (
    <div className={`${garamond.variable} ${hanken.variable} themed-type min-h-screen overflow-hidden`}>
      {/* ── hero ───────────────────────────── */}
      <section className="relative px-5 pb-16 pt-32 sm:px-8 sm:pb-24 lg:pt-36">
        {/* warm ambient glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[-12%] h-[480px] w-[480px] rounded-full bg-[#7f5b34]/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-[-14%] top-1/3 h-[420px] w-[420px] rounded-full bg-[#1f3b53]/10 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
          <div>
            <ScrollReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--accent)]">
                Trinity Fellowship · Addis Ababa
              </p>
            </ScrollReveal>

            <TextReveal delay={0.1}>
              <h1 className="mt-5 text-[clamp(3rem,5.5vw,4.75rem)] leading-[1.08] text-[color:var(--brand)]">
                A community that exists to know God{" "}
                <span className="italic text-[color:var(--accent)]">&amp; make Him known.</span>
              </h1>
            </TextReveal>

            <ScrollReveal delay={0.22}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-[color:var(--muted)]">
                Worship God. Grow in grace. Bear witness to Christ — together, in the heart of
                Addis Ababa.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.32}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/visit"
                  className="inline-flex items-center justify-center rounded-full bg-[color:var(--brand)] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[color:var(--brand-soft)] hover:shadow-lg"
                >
                  Join Us Sunday
                </Link>
                <Link
                  href="/visit/what-to-expect"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--brand)] underline decoration-[color:var(--accent)]/40 decoration-2 underline-offset-8 transition-colors hover:decoration-[color:var(--accent)]"
                >
                  What to expect
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.42}>
              <div className="mt-9 flex items-center gap-3 text-sm text-[color:var(--muted)]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent)]/10">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-[color:var(--accent)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <p>
                  Sundays 10:00 AM · EGST Building, 5th Floor, Sarbet
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* arched portrait — a quiet nod to church architecture */}
          <ScrollReveal delay={0.2} direction="none">
            <div className="relative mx-auto w-full max-w-md">
              <div
                aria-hidden
                className="absolute -right-4 -top-4 h-full w-full rounded-t-[999px] rounded-b-[2rem] border border-[color:var(--accent)]/35"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] shadow-[0_30px_60px_-30px_rgba(31,59,83,0.45)]">
                <Image
                  src="/images/group-photo.jpeg"
                  alt="The Trinity Fellowship church family gathered together"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover object-center"
                  priority
                />
              </div>
              <div className="absolute -bottom-5 -left-4 -rotate-2 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] px-5 py-3.5 shadow-lg sm:-left-8">
                <p className="font-serif text-lg italic text-[color:var(--brand)]">
                  You&apos;re welcome here.
                </p>
                <p className="text-xs text-[color:var(--muted)]">Come as you are, this Sunday.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── serif marquee strip ────────────── */}
      <section className="border-y border-[color:var(--line)] bg-[color:var(--surface-strong)]/60 py-5">
        <InfiniteScrollLoop duration={38}>
          {[...marqueeWords, ...marqueeWords].map((word, i) => (
            <span key={`${word}-${i}`} className="flex items-center">
              <span className="px-6 font-serif text-2xl italic text-[color:var(--brand)]/80">
                {word}
              </span>
              <span aria-hidden className="text-sm text-[color:var(--accent)]">
                ✦
              </span>
            </span>
          ))}
        </InfiniteScrollLoop>
      </section>

      {/* ── who we are ─────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <ScrollReveal direction="right">
            <div className="relative">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem]">
                <Image
                  src="/images/hero-image.jpg"
                  alt="Worship gathering at Trinity Fellowship"
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="absolute -bottom-8 -right-3 w-40 rotate-3 overflow-hidden rounded-xl border-4 border-[color:var(--surface)] shadow-xl sm:-right-8 sm:w-48">
                <div className="relative aspect-square">
                  <Image
                    src="/images/scripture-prayer.jpg"
                    alt="Praying over open scripture"
                    fill
                    sizes="200px"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal>
              <p className="font-serif text-2xl italic text-[color:var(--accent)]">
                Who we are —
              </p>
            </ScrollReveal>
            <TextReveal delay={0.1}>
              <h2 className="mt-3 text-5xl text-[color:var(--foreground)] sm:text-6xl">
                A Church Formed by Grace
              </h2>
            </TextReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-[color:var(--muted)]">
                We believe the church should feel both reverent and alive. As we worship, pray,
                preach, and serve, we seek a life that is spiritually deep, biblically grounded,
                and richly communal.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <blockquote className="mt-9">
                <p className="font-serif text-[1.7rem] italic leading-snug text-[color:var(--brand)]">
                  &ldquo;Let the word of Christ dwell in you richly.&rdquo;
                </p>
                <cite className="mt-2 block text-xs font-semibold uppercase tracking-[0.1em] not-italic text-[color:var(--muted)]">
                  Colossians 3:16
                </cite>
              </blockquote>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--brand)] transition-colors hover:text-[color:var(--brand-soft)]"
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
        </div>
      </section>

      {/* ── word · worship · witness ───────── */}
      <section className="border-y border-[color:var(--line)] bg-[color:var(--surface)]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="text-center">
            <ScrollReveal>
              <p className="font-serif text-2xl italic text-[color:var(--accent)]">
                What shapes us —
              </p>
            </ScrollReveal>
            <TextReveal delay={0.1}>
              <h2 className="mt-3 text-5xl text-[color:var(--foreground)] sm:text-6xl">
                Word · Worship · Witness
              </h2>
            </TextReveal>
          </div>

          <StaggerChildren className="mt-14 grid gap-6 md:grid-cols-3" staggerDelay={0.12}>
            {ministryFocus.map((item) => (
              <StaggerItem key={item.number} direction="up">
                <div className="group h-full rounded-2xl border border-[color:var(--line)] bg-[color:var(--background)] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--accent)]/50 hover:shadow-xl hover:shadow-[rgba(127,91,52,0.1)]">
                  <p className="font-serif text-5xl italic text-[color:var(--accent)]/40 transition-colors duration-500 group-hover:text-[color:var(--accent)]">
                    {item.number}
                  </p>
                  <h3 className="mt-5 font-serif text-2xl font-semibold text-[color:var(--brand)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-[color:var(--muted)]">{item.detail}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── sunday timeline ────────────────── */}
      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="text-center">
          <ScrollReveal>
            <p className="font-serif text-2xl italic text-[color:var(--accent)]">
              Sundays —
            </p>
          </ScrollReveal>
          <TextReveal delay={0.1}>
            <h2 className="mt-3 text-5xl text-[color:var(--foreground)] sm:text-6xl">
              A Morning Together
            </h2>
          </TextReveal>
        </div>

        <StaggerChildren className="mx-auto mt-14 max-w-2xl" staggerDelay={0.15}>
          {weeklyRhythm.map((item, i) => (
            <StaggerItem key={item.event} direction="up">
              <div className="relative flex gap-6 pb-10 last:pb-0 sm:gap-8">
                {/* timeline rail */}
                <div className="flex flex-col items-center">
                  <span className="mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-[color:var(--accent)] bg-[color:var(--background)]" />
                  {i < weeklyRhythm.length - 1 && (
                    <span className="mt-2 w-px flex-1 bg-[color:var(--line)]" />
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <p className="font-serif text-2xl font-semibold tabular-nums text-[color:var(--accent)]">
                    {item.time}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-[color:var(--foreground)]">
                    {item.event}
                  </h3>
                  <p className="mt-1.5 leading-relaxed text-[color:var(--muted)]">{item.summary}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* ── photo strip ────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <StaggerChildren className="grid gap-8 sm:grid-cols-3 sm:gap-6" staggerDelay={0.12}>
          {photoStrip.map((photo) => (
            <StaggerItem key={photo.src} direction="up">
              <figure
                className={`${photo.rotate} rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-3 pb-4 shadow-md transition-transform duration-500 hover:rotate-0 hover:shadow-xl`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 640px) 33vw, 90vw"
                    className="object-cover object-center"
                  />
                </div>
                <figcaption className="mt-3 text-center font-serif text-lg italic text-[color:var(--brand)]">
                  {photo.caption}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* ── visit CTA band ─────────────────── */}
      <section className="px-5 pb-24 sm:px-8">
        <ScrollReveal>
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-[color:var(--brand)] px-6 py-16 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_300px_at_50%_-10%,rgba(217,164,65,0.22),transparent_70%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(500px_260px_at_85%_110%,rgba(80,109,131,0.5),transparent_70%)]"
            />
            <div className="relative">
              <p className="font-serif text-2xl italic text-[#d9a441]">
                Visit us —
              </p>
              <h2 className="mx-auto mt-4 max-w-2xl text-4xl leading-[1.15] tracking-[0.01em] text-[#f5f0e8] sm:text-5xl">
                We&apos;d Love to Welcome You This Sunday
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[#f5f0e8]/75">
                Trinity Fellowship meets in the Sarbet area of Addis Ababa. Find directions,
                times, and everything you need for your first visit.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/visit"
                  className="inline-flex items-center justify-center rounded-full bg-[#d9a441] px-8 py-4 text-sm font-semibold text-[#1f3b53] transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Plan Your Visit
                </Link>
                <Link
                  href="/visit/what-to-expect"
                  className="inline-flex items-center justify-center rounded-full border border-[#f5f0e8]/30 px-8 py-4 text-sm font-semibold text-[#f5f0e8] transition-all duration-300 hover:border-[#f5f0e8]/70 hover:bg-white/5"
                >
                  What to Expect
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <DesignOptionSwitcher />
    </div>
  );
}
