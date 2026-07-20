import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bodoni_Moda, Archivo } from "next/font/google";
import {
  ScrollReveal,
  StaggerChildren,
  StaggerItem,
  TextReveal,
} from "@/app/components/animations";
import { DesignOptionSwitcher } from "@/app/components/design-option-switcher";
import { weeklyRhythm } from "@/app/lib/site-content";

/*
 * Refuge type: Bodoni Moda — a true high-contrast Didone with real italics —
 * glows in white hairlines against the dark; Archivo sets the small
 * neo-grotesque folio labels and body copy.
 */
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display-theme",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-body-theme",
});

export const metadata: Metadata = {
  title: "Homepage Option 5 · Refuge",
  robots: { index: false, follow: false },
};

/* Ember palette: near-black warm ink, ember orange, warm paper */
const ink = "#100c09";
const inkSoft = "#181210";
const ember = "#ff7a2f";
const paper = "#f4efe6";
const paperFaded = "rgba(244, 239, 230, 0.62)";

/* Signature link: lowercase Bodoni italic in parentheses, inverted paper box */
function EmberLink({
  href,
  children,
  ghost = false,
  onDark = true,
}: {
  href: string;
  children: React.ReactNode;
  ghost?: boolean;
  onDark?: boolean;
}) {
  if (ghost) {
    return (
      <Link
        href={href}
        className="inline-block font-serif text-lg italic lowercase underline decoration-1 underline-offset-4 transition-opacity duration-300 hover:opacity-70"
        style={{ color: onDark ? paper : ink }}
      >
        ({children})
      </Link>
    );
  }
  return (
    <Link
      href={href}
      className="inline-block px-3.5 py-1 font-serif text-lg italic lowercase transition-colors duration-300 hover:bg-[#ff7a2f]"
      style={{ backgroundColor: paper, color: ink }}
    >
      ({children})
    </Link>
  );
}

/* Folio label: the section grammar borrowed from the reference */
function Folio({ label, index, onDark = true }: { label: string; index: string; onDark?: boolean }) {
  return (
    <div
      className="flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.12em]"
      style={{ color: onDark ? paperFaded : "#6f675a" }}
    >
      <span>{label}</span>
      <span className="tabular-nums opacity-70">{index} · 05</span>
    </div>
  );
}

export default function HomeV6() {
  return (
    <div
      className={`${bodoni.variable} ${archivo.variable} themed-type min-h-screen overflow-hidden`}
      style={{ backgroundColor: ink }}
    >
      {/* ── hero: ember sanctuary ──────────── */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
        {/* worship photo, ember-treated */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-image.jpg"
            alt="The congregation bowed in prayer, washed in warm light"
            fill
            sizes="100vw"
            className="object-cover object-center sepia-[0.35] saturate-[1.3]"
            priority
          />
        </div>
        {/* dark wash + ember glow */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(16,12,9,0.72) 0%, rgba(16,12,9,0.45) 45%, #100c09 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(820px 520px at 62% 60%, rgba(255,122,47,0.36), transparent 70%)",
          }}
        />
        {/* light haze so the fixed header stays readable */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#f5f0e8]/80 via-[#f5f0e8]/30 to-transparent"
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8 sm:pb-24">
          <div className="flex flex-wrap items-end justify-between gap-10">
            <TextReveal delay={0.1}>
              <h1
                className="max-w-3xl text-[clamp(3rem,7vw,6rem)] leading-[1.04] tracking-[-0.01em]"
                style={{ color: paper }}
              >
                A gospel-centered community that exists to know God and make Him known.
              </h1>
            </TextReveal>

            <ScrollReveal delay={0.35}>
              <div className="max-w-xs">
                <p className="font-serif text-xl italic leading-snug" style={{ color: paper }}>
                  Worship God. Grow in grace. Bear witness to Christ.
                </p>
                <p className="mt-3 text-sm leading-relaxed tracking-[0.01em]" style={{ color: paperFaded }}>
                  We gather every Sunday at 10:00 AM — EGST Building, 5th Floor, Sarbet,
                  Addis Ababa.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <EmberLink href="/visit">join us sunday</EmberLink>
                  <EmberLink href="/visit/what-to-expect" ghost>
                    what to expect
                  </EmberLink>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 01 · about ─────────────────────── */}
      <section className="px-5 py-24 sm:px-8 sm:py-32" style={{ backgroundColor: ink }}>
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <Folio label="Who We Are" index="01" />
          </ScrollReveal>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
            <TextReveal delay={0.1}>
              <h2
                className="text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.15]"
                style={{ color: paper }}
              >
                A church formed by grace.
              </h2>
            </TextReveal>

            <ScrollReveal delay={0.25}>
              <div className="flex flex-col justify-end gap-6">
                <div className="relative aspect-[5/4] w-full max-w-xs overflow-hidden">
                  <Image
                    src="/images/group-photo.jpeg"
                    alt="The church family celebrating together"
                    fill
                    sizes="320px"
                    className="object-cover object-center grayscale contrast-[1.05]"
                  />
                </div>
                <p className="max-w-sm text-[15px] leading-relaxed tracking-[0.01em]" style={{ color: paperFaded }}>
                  We believe the church should feel both reverent and alive. As we worship,
                  pray, preach, and serve, we seek a life that is spiritually deep, biblically
                  grounded, and richly communal.
                </p>
                <div>
                  <EmberLink href="/about" ghost>
                    learn more about us
                  </EmberLink>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 02 · the invitation (ember drench) ── */}
      <section
        className="relative overflow-hidden px-5 py-28 text-center sm:px-8 sm:py-36"
        style={{
          background:
            "linear-gradient(180deg, #100c09 0%, #7c2d0c 30%, #e05c17 62%, #ff8a3d 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 480px at 50% 115%, rgba(255,205,150,0.5), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl">
          <ScrollReveal>
            <Folio label="The Invitation" index="02" />
          </ScrollReveal>
          <TextReveal delay={0.15}>
            <blockquote className="mt-10">
              <p
                className="text-[clamp(1.9rem,4.4vw,3.6rem)] leading-[1.2]"
                style={{ color: paper }}
              >
                To know God, and to make Him known.
              </p>
              <cite
                className="mt-8 block text-[11px] font-semibold uppercase not-italic tracking-[0.12em]"
                style={{ color: "rgba(244,239,230,0.85)" }}
              >
                Worship God · Grow in grace · Bear witness to Christ
              </cite>
            </blockquote>
          </TextReveal>
          <ScrollReveal delay={0.35}>
            <div className="mt-10">
              <EmberLink href="/visit">plan your visit</EmberLink>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 03 · sundays ───────────────────── */}
      <section className="px-5 py-24 sm:px-8 sm:py-32" style={{ backgroundColor: inkSoft }}>
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <Folio label="Sunday Schedule" index="03" />
          </ScrollReveal>

          <StaggerChildren className="mt-10" staggerDelay={0.14}>
            {weeklyRhythm.map((item) => (
              <StaggerItem key={item.event} direction="up">
                <div
                  className="grid items-baseline gap-2 border-t py-8 sm:grid-cols-[200px_1fr_auto] sm:gap-8"
                  style={{ borderColor: "rgba(244,239,230,0.14)" }}
                >
                  <p className="font-serif text-3xl tabular-nums sm:text-4xl" style={{ color: ember }}>
                    {item.time}
                  </p>
                  <div>
                    <h3 className="font-serif text-2xl" style={{ color: paper }}>
                      {item.event}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed tracking-[0.01em]" style={{ color: paperFaded }}>
                      {item.summary}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <ScrollReveal delay={0.2}>
            <div className="border-t pt-10" style={{ borderColor: "rgba(244,239,230,0.14)" }}>
              <EmberLink href="/visit" ghost>
                directions &amp; times
              </EmberLink>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 04 · life together (paper strip) ── */}
      <section className="px-5 py-24 sm:px-8 sm:py-32" style={{ backgroundColor: paper }}>
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <Folio label="Life Together" index="04" onDark={false} />
          </ScrollReveal>

          <TextReveal delay={0.1}>
            <h2 className="mt-8 max-w-2xl text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.18]" style={{ color: ink }}>
              Rooted in the Word, gathered in worship, growing together in community.
            </h2>
          </TextReveal>

          <StaggerChildren className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-3" staggerDelay={0.12}>
            <StaggerItem direction="up">
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/scripture-prayer.jpg"
                    alt="An open Bible, mid-study"
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover object-center grayscale contrast-[1.05] transition-all duration-700 hover:grayscale-0"
                  />
                </div>
                <figcaption className="mt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: "#6f675a" }}>
                    The Word
                  </p>
                  <p className="mt-1 font-serif text-lg" style={{ color: ink }}>
                    Expository preaching, every Sunday
                  </p>
                </figcaption>
              </figure>
            </StaggerItem>

            <StaggerItem direction="up">
              <figure className="sm:mt-10">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/group-photo.jpeg"
                    alt="The church family, hands raised in celebration"
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
                <figcaption className="mt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: "#6f675a" }}>
                    The Family
                  </p>
                  <p className="mt-1 font-serif text-lg" style={{ color: ink }}>
                    One body, many faces
                  </p>
                </figcaption>
              </figure>
            </StaggerItem>

            <StaggerItem direction="up">
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/children-ministry.jpg"
                    alt="Children beaming in the children's ministry"
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover object-center grayscale contrast-[1.05] transition-all duration-700 hover:grayscale-0"
                  />
                </div>
                <figcaption className="mt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: "#6f675a" }}>
                    The Children
                  </p>
                  <p className="mt-1 font-serif text-lg" style={{ color: ink }}>
                    Sundays, 11:00 AM · ages 4–12
                  </p>
                </figcaption>
              </figure>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>

      {/* ── 05 · new here (floating card) ──── */}
      <section className="px-5 py-24 sm:px-8 sm:py-32" style={{ backgroundColor: ink }}>
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="bg-white px-6 py-12 sm:px-12 sm:py-16">
              <div className="grid gap-8 sm:grid-cols-[auto_1.2fr_1fr] sm:gap-12">
                <Folio label="New Here" index="05" onDark={false} />
                <h2 className="text-[clamp(1.7rem,3.2vw,2.5rem)] leading-[1.2]" style={{ color: ink }}>
                  Planning your first visit to Trinity?
                </h2>
                <div className="flex flex-col justify-between gap-6">
                  <p className="text-[15px] leading-relaxed" style={{ color: "#4a4438" }}>
                    Whether you have followed Jesus for years or are exploring the faith for the
                    first time, you are warmly welcome. Find out what a Sunday gathering looks
                    like before you come.
                  </p>
                  <div>
                    <EmberLink href="/visit/what-to-expect" ghost onDark={false}>
                      what to expect
                    </EmberLink>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── closing: ember glow ────────────── */}
      <section
        className="relative overflow-hidden px-5 pb-28 pt-24 text-center sm:px-8 sm:pb-36 sm:pt-32"
        style={{ backgroundColor: ink }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(760px 460px at 50% 118%, rgba(255,122,47,0.45), transparent 72%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl">
          <TextReveal>
            <h2
              className="text-[clamp(2.8rem,6.5vw,5.5rem)] italic leading-[1.06]"
              style={{ color: paper }}
            >
              We&apos;d love to welcome you this Sunday.
            </h2>
          </TextReveal>
          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed tracking-[0.01em]" style={{ color: paperFaded }}>
              Trinity Fellowship meets in the Sarbet area of Addis Ababa. Find directions,
              times, and more on our visit page.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.32}>
            <div className="mt-9">
              <EmberLink href="/visit">get directions &amp; times</EmberLink>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <DesignOptionSwitcher />
    </div>
  );
}
