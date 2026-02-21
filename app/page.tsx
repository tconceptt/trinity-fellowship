"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ScrollReveal,
  StaggerChildren,
  StaggerItem,
  ParallaxImage,
  StickyImageSection,
  TextReveal,
  SectionDivider,
  ScrollProgress,
  InfiniteScrollLoop,
} from "./components/animations";
import { Header } from "./components/header";

/* ── data ───────────────────────────────────── */

const weeklyRhythm = [
  {
    day: "Sunday",
    event: "Corporate Prayer Meeting",
    time: "9:00 AM",
    summary: "A dedicated hour of prayer before the gathered worship service.",
  },
  {
    day: "Sunday",
    event: "Worship Gathering",
    time: "10:00 AM",
    summary: "Expository preaching, congregational singing, and shared fellowship.",
  },
];

const doctrineThemes = [
  "The Scriptures",
  "The Triune God",
  "God's Sovereign Purposes",
  "Creation, Providence, and Man",
  "Man's Sin and Its Effects",
  "The Person of Jesus Christ",
  "The Saving Work of Jesus Christ",
  "The Person and Work of the Holy Spirit",
  "The Gospel and the Application of Salvation",
  "The Empowering Ministry of the Spirit",
  "Life in Christ",
  "The Church of Christ",
  "The Last Things",
];

const ministryFocus = [
  {
    title: "Word",
    number: "01",
    detail: "We preach and teach the Bible as the final authority for faith and life.",
  },
  {
    title: "Worship",
    number: "02",
    detail: "We gather to exalt Jesus Christ with reverence, joy, and expectancy.",
  },
  {
    title: "Witness",
    number: "03",
    detail: "We make disciples and serve our city with gospel clarity and love.",
  },
];

const childrenMinistryDetails = [
  {
    label: "When",
    value: "Sunday, 11:00 AM - 12:00 PM",
  },
  {
    label: "Where",
    value: "In the same building as the church gathering",
  },
  {
    label: "Ages",
    value: "Children ages 4 to 12",
  },
];

/* ── hero subcomponent ──────────────────────── */

function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#f5f0e8] lg:flex-row">
      {/* ── Content (Left/Top on mobile) ── */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-6 pt-24 pb-12 sm:px-12 lg:w-[55%] lg:px-20 lg:py-0 xl:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-[#1f3b53]">
            A Gospel-Centered Community That Exists To Know God And Make Him Known.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-[#586574]">
            Worship God. Grow In Grace. Bear Witness To Christ.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#schedule"
              className="inline-flex items-center justify-center rounded-full bg-[#1f3b53] px-8 py-4 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105 hover:shadow-lg"
            >
              Join Us Sunday
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── Mobile Image (Bottom) ── */}
      <div className="relative h-[45vh] w-full shrink-0 lg:hidden">
        <Image
          src="/images/group-photo.jpeg"
          alt="Worship gathering at Trinity Fellowship"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        
        {/* Mobile Top Curve Mask */}
        <div className="absolute top-0 left-0 right-0 h-16 w-full -translate-y-[1px] overflow-hidden leading-[0]">
          <svg
            className="h-full w-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,120 C150,30 400,20 600,60 C800,100 1050,100 1200,60 V0 H0 V120Z"
              fill="#f5f0e8"
            />
          </svg>
        </div>
      </div>

      {/* ── Desktop Image (Right) ── */}
      <div className="relative hidden h-auto w-[45%] lg:block">
        <div className="absolute inset-0 h-full w-full">
          <Image
            src="/images/group-photo.jpeg"
            alt="Worship gathering at Trinity Fellowship"
            fill
            className="object-cover object-center"
            priority
            sizes="50vw"
          />
        </div>

        {/* Desktop Left Wave Mask */}
        <div className="absolute inset-y-0 left-0 h-full w-32 -translate-x-[1px] overflow-hidden leading-[0]">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 H40 C90,30 20,70 60,100 H0 Z"
              fill="#f5f0e8"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ── main page ──────────────────────────────── */

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen">
      <ScrollProgress />

      {/* ── header ─────────────────────────── */}
      <Header />

      {/* ── hero ───────────────────────────── */}
      <HeroSection />

      {/* ── about ──────────────────────────── */}
      <section id="about" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <ScrollReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
                Who We Are
              </p>
            </ScrollReveal>
            <TextReveal delay={0.1}>
              <h2 className="mt-3 text-4xl text-[color:var(--foreground)] sm:text-5xl lg:text-6xl">
                A Church Formed by Grace
              </h2>
            </TextReveal>
            <ScrollReveal delay={0.25}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[color:var(--muted)]">
                We believe the church should feel both reverent and alive. As we worship, pray,
                preach, and serve, we seek a life that is spiritually deep, biblically grounded, and
                richly communal.
              </p>
            </ScrollReveal>
          </div>

          <StaggerChildren className="space-y-8" staggerDelay={0.15}>
            {ministryFocus.map((item) => (
              <StaggerItem key={item.title} direction="left">
                <div className="group relative border-l-2 border-[color:var(--line)] py-2 pl-6 transition-all duration-500 hover:border-[color:var(--accent)] hover:pl-8">
                  <span className="absolute -left-[1px] top-0 block h-0 w-[2px] bg-[color:var(--accent)] transition-all duration-500 group-hover:h-full" />
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-[color:var(--brand-soft)] opacity-60">
                      {item.number}
                    </span>
                    <h3 className="text-3xl text-[color:var(--brand)] sm:text-4xl">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-[color:var(--muted)]">{item.detail}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── cityscape parallax ─────────────── */}
      <StickyImageSection
        overlay={
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <blockquote
              className="max-w-3xl text-3xl leading-tight text-[#fbf4e8] sm:text-5xl lg:text-6xl"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.3)" }}
            >
              &ldquo;By his Word and Spirit, Christ is building his church
              <span className="text-[#c9b89a]">
                {" "}in every tribe, tongue, and nation.
              </span>
              &rdquo;
            </blockquote>
          </div>
        }
      >
        <Image
          src="/images/addis-landscape.jpg"
          alt="Addis Ababa cityscape"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(14,33,48,0.72)_14%,rgba(14,33,48,0.35)_50%,rgba(14,33,48,0.72)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.2),transparent_40%)]" />
      </StickyImageSection>

      <SectionDivider className="mx-auto max-w-7xl px-5 sm:px-8" />

      {/* ── schedule ───────────────────────── */}
      <section id="schedule" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
            Sunday Schedule
          </p>
        </ScrollReveal>
        <TextReveal delay={0.1}>
          <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl">Join Us Every Sunday</h2>
        </TextReveal>
        <ScrollReveal delay={0.2}>
          <p className="mt-4 max-w-2xl text-[color:var(--muted)]">
            All times are Addis Ababa local time (EAT). Our two regular Sunday gatherings are
            corporate prayer at 9:00 AM and worship at 10:00 AM.
          </p>
        </ScrollReveal>

        <StaggerChildren className="mt-12 space-y-4" staggerDelay={0.1}>
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
                  <h3 className="text-2xl text-[color:var(--foreground)] transition-colors duration-300 group-hover:text-[color:var(--brand)] sm:text-3xl">
                    {item.event}
                  </h3>
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

      <SectionDivider className="mx-auto max-w-7xl px-5 sm:px-8" />

      {/* ── children ministry ─────────────── */}
      <section id="children" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <ScrollReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
                Family Ministry
              </p>
            </ScrollReveal>
            <TextReveal delay={0.1}>
              <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl">Children&apos;s Ministry</h2>
            </TextReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--muted)]">
                Every Sunday from 11:00 AM to 12:00 PM, children ages 4 to 12 are welcomed into a
                safe and joyful space to learn the Scriptures and get to know Jesus.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.28}>
              <p className="mt-4 max-w-2xl text-[color:var(--muted)]">
                Parents can attend the main service with peace of mind, knowing their children are
                cared for nearby in the same building.
              </p>
            </ScrollReveal>
          </div>

          <StaggerChildren className="space-y-4 self-center" staggerDelay={0.1}>
            {childrenMinistryDetails.map((item) => (
              <StaggerItem key={item.label} direction="left">
                <div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-6 transition-all duration-300 hover:border-[color:var(--brand-soft)] hover:shadow-lg hover:shadow-[rgba(31,59,83,0.06)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--brand-soft)]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-lg text-[color:var(--foreground)]">{item.value}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <SectionDivider className="mx-auto max-w-7xl px-5 sm:px-8" />

      {/* ── beliefs ────────────────────────── */}
      <section id="beliefs" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
              Doctrine
            </p>
          </ScrollReveal>
          <TextReveal delay={0.1}>
            <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl">Statement of Faith</h2>
          </TextReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-4 max-w-3xl text-[color:var(--muted)]">
              We affirm the Sovereign Grace Churches confession with thirteen major doctrinal themes,
              from the authority of Scripture to the hope of Christ&apos;s return.
            </p>
          </ScrollReveal>
        </div>

        {/* scroll-linked doctrine marquee */}
        <div className="mt-14">
          <InfiniteScrollLoop className="border-y border-[color:var(--line)] py-6" duration={60}>
            {[...doctrineThemes, ...doctrineThemes].map((theme, i) => (
              <span
                key={`${theme}-${i}`}
                className="mr-10 whitespace-nowrap font-serif text-[clamp(1.3rem,3vw,2.2rem)] leading-none text-[color:var(--brand)] opacity-80 sm:mr-14"
              >
                {theme}
                <span className="ml-10 text-[color:var(--line)] sm:ml-14">/</span>
              </span>
            ))}
          </InfiniteScrollLoop>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-wrap gap-3 px-5 sm:px-8">
          <ScrollReveal delay={0.1}>
            <Link
              href="/docs/statement-of-faith-editors-edition.pdf"
              target="_blank"
              className="inline-flex rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-6 py-3 text-sm font-semibold text-[color:var(--brand)] transition-all duration-300 hover:border-[color:var(--brand)] hover:shadow-md"
            >
              View Statement of Faith PDF
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Link
              href="https://sovereigngrace.com/we-believe/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[color:var(--brand)] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[color:var(--brand-soft)] hover:shadow-md"
            >
              Sovereign Grace Beliefs
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── scripture / aim parallax ───────── */}
      <ParallaxImage className="min-h-[70vh] sm:min-h-[80vh]" speed={0.25}>
        <Image
          src="/images/scripture-prayer.jpg"
          alt="Open Bible and prayerful hands"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(12,28,41,0.78)_12%,rgba(12,28,41,0.30)_56%,rgba(12,28,41,0.78)_100%)]" />
      </ParallaxImage>
      <div className="relative z-10 mx-auto -mt-[50vh] flex min-h-[50vh] max-w-7xl items-center px-6 sm:-mt-[60vh] sm:min-h-[60vh] sm:px-12">
        <div>
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c9b89a]">
              Our Aim
            </p>
          </ScrollReveal>
          <TextReveal delay={0.15}>
            <p className="mt-4 max-w-3xl text-3xl leading-tight text-[#f5ecde] sm:text-5xl lg:text-6xl">
              To worship God, mature believers, and bear witness to Christ and his kingdom
              <span className="text-[#c9b89a]"> in all the world.</span>
            </p>
          </TextReveal>
        </div>
      </div>
      <div className="h-[20vh] sm:h-[20vh]" />

      <SectionDivider className="mx-auto max-w-7xl px-5 sm:px-8" />

      {/* ── pastors college ────────────────── */}
      <section id="college" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
              Training
            </p>
          </ScrollReveal>
          <TextReveal delay={0.1}>
            <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl">
              Pastors College
            </h2>
          </TextReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-[color:var(--muted)]">
              Equipping the next generation of African pastors for gospel-centered ministry within the context of the local church.
            </p>
            <div className="mt-10 overflow-hidden rounded-2xl">
              <Image
                src="/images/pc-class-of26.jpg"
                alt="Pastors College Class of 2026"
                width={800}
                height={500}
                sizes="(max-width: 768px) 100vw, 768px"
                className="w-full object-cover"
              />
            </div>
            <div className="mt-10">
              <a
                href="https://tfpastorscollege.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[color:var(--brand)] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[color:var(--brand-soft)] hover:shadow-lg"
              >
                Visit College Website
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider className="mx-auto max-w-7xl px-5 sm:px-8" />

      {/* ── members CTA ──────────────────── */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        {/* subtle background texture */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(31,59,83,0.04)_0%,transparent_50%,rgba(127,91,52,0.04)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(31,59,83,0.06),transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center">
            <ScrollReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
                Members
              </p>
            </ScrollReveal>
            <TextReveal delay={0.1}>
              <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl">
                Stay Connected
              </h2>
            </TextReveal>
            <ScrollReveal delay={0.2}>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--muted)]">
                As a member, you can pray for one another, share prayer requests, and stay connected through the members directory.
              </p>
            </ScrollReveal>
          </div>

          <StaggerChildren className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-3 sm:gap-6" staggerDelay={0.12}>
            {/* Pray for Others */}
            <StaggerItem direction="up">
              <div className="group relative flex flex-col items-center rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-8 text-center transition-all duration-500 hover:border-[color:var(--brand-soft)] hover:shadow-xl hover:shadow-[rgba(31,59,83,0.08)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--brand)]/10 transition-transform duration-500 group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="var(--brand)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-[color:var(--foreground)]">
                  Pray for Others
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
                  See what your church family needs prayer for and lift them up before the Lord.
                </p>
              </div>
            </StaggerItem>

            {/* Get Prayed For */}
            <StaggerItem direction="up">
              <div className="group relative flex flex-col items-center rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-8 text-center transition-all duration-500 hover:border-[color:var(--brand-soft)] hover:shadow-xl hover:shadow-[rgba(31,59,83,0.08)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--accent)]/10 transition-transform duration-500 group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M17.5 21H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                    <path d="M22 10a4.5 4.5 0 0 0-7.29-3.5" />
                    <path d="M8 12v4" />
                    <path d="M8 8v.01" />
                  </svg>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-[color:var(--foreground)]">
                  Share Requests
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
                  Submit prayer requests to be shared with the church or your pastors privately.
                </p>
              </div>
            </StaggerItem>

            {/* Members Directory */}
            <StaggerItem direction="up">
              <div className="group relative flex flex-col items-center rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-8 text-center transition-all duration-500 hover:border-[color:var(--brand-soft)] hover:shadow-xl hover:shadow-[rgba(31,59,83,0.08)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--brand-soft)]/10 transition-transform duration-500 group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="var(--brand-soft)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-[color:var(--foreground)]">
                  Members Directory
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
                  Find and connect with fellow members through the church directory.
                </p>
              </div>
            </StaggerItem>
          </StaggerChildren>

          {/* CTA */}
          <ScrollReveal delay={0.4}>
            <div className="mt-12 text-center">
              <Link
                href="/members"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--brand)] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[color:var(--brand-soft)] hover:shadow-lg"
              >
                Sign In as a Member
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
              <p className="mt-4 text-sm text-[color:var(--muted)]">
                Only registered members can access these features.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider className="mx-auto max-w-7xl px-5 sm:px-8" />

      {/* ── visit ──────────────────────────── */}
      <section id="visit" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <ScrollReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
                Visit
              </p>
            </ScrollReveal>
            <TextReveal delay={0.1}>
              <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl">
                Join Us This Sunday
              </h2>
            </TextReveal>
            <ScrollReveal delay={0.25}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[color:var(--muted)]">
                Trinity Fellowship meets in the Sarbet area of Addis Ababa for Sunday worship.
                During the week, you can also visit our church office on the first floor of Karama
                Building.
              </p>
            </ScrollReveal>
          </div>

          <StaggerChildren className="flex flex-col justify-center gap-5" staggerDelay={0.12}>
            {/* Locations */}
            <StaggerItem direction="left">
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

            {/* Instagram */}
            <StaggerItem direction="left">
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
        </div>
      </section>

      {/* ── footer ─────────────────────────── */}
      <footer className="border-t border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0))]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14">
          <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:gap-12">
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src="/Logos/trinity-logo.svg"
                  alt="Trinity Fellowship"
                  width={30}
                  height={40}
                />
                <div>
                  <p className="text-lg font-semibold text-[color:var(--brand)]">
                    Trinity Fellowship Addis Ababa
                  </p>
                  <p className="text-xs uppercase tracking-[0.12em] text-[color:var(--brand-soft)]">
                    Part of Sovereign Grace Churches
                  </p>
                </div>
              </div>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[color:var(--muted)]">
                Worship with us in Sarbet on Sundays, or visit our church office during the week at
                Karama Building.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--brand-soft)]">
                Quick Links
              </p>
              <nav className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-[color:var(--muted)]">
                {[
                    { label: "About", href: "/#about" },
                    { label: "Pastors", href: "/pastors" },
                    { label: "Schedule", href: "/#schedule" },
                    { label: "Children", href: "/#children" },
                    { label: "Beliefs", href: "/#beliefs" },
                    { label: "College", href: "/#college" },
                    { label: "Visit", href: "/#visit" },
                    { label: "Members", href: "/members" },
                  ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="transition-colors hover:text-[color:var(--brand)]"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

          </div>

          <div className="mt-10 border-t border-[color:var(--line)] pt-5">
            <p className="text-xs text-[color:var(--muted)]">
              © {currentYear} Trinity Fellowship Addis Ababa. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
