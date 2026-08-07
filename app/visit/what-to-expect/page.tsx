import type { Metadata } from "next";
import { PageHero } from "@/app/components/page-hero";
import { NextStepCTA } from "@/app/components/next-step-cta";

export const metadata: Metadata = {
  title: "What to Expect",
  description:
    "Your first Sunday at Trinity Fellowship, answered: the sermon is preached in English, worship is in Amharic and English, dress is casual, parking is inside the EGST compound, and children join the children's ministry just before the sermon.",
  alternates: { canonical: "/visit/what-to-expect" },
};

const visitAnswers = [
  {
    title: "Worship & Preaching",
    body: "Our worship songs are a mix of Amharic and English, and the sermon is preached in English. Expect congregational singing and expository preaching through the Scriptures.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
      </svg>
    ),
  },
  {
    title: "What to Wear",
    body: "Come as you are — there is no dress code. Most of our church dresses casually, so wear whatever you are comfortable in.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23Z" />
      </svg>
    ),
  },
  {
    title: "Parking",
    body: "There is ample parking inside the EGST compound where we gather, so you can drive in and park with ease.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <path d="M9 17h6" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
  },
  {
    title: "Your Children",
    body: "Your kids stay with you in the main hall for the first part of the service. Just before the sermon begins, children ages 4 to 12 are dismissed and sent to the children's ministry in the same building.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const sundayFlow = [
  {
    time: "9:00 AM",
    title: "Corporate Prayer",
    detail: "We begin the morning with a dedicated hour of prayer before the worship service.",
  },
  {
    time: "10:00 AM",
    title: "Worship Begins",
    detail: "The whole church — children included — gathers to sing in Amharic and English.",
  },
  {
    time: "Before the Sermon",
    title: "Children Are Dismissed",
    detail:
      "Just before the sermon starts, children are dismissed from the main hall and sent to the children's ministry.",
  },
  {
    time: "Then",
    title: "The Sermon",
    detail: "The sermon is preached in English — expository preaching through God's Word.",
  },
];

export default function WhatToExpectPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        title="What to Expect"
        lede="Wondering what a Sunday at Trinity Fellowship is like? Here are the answers to the questions first-time visitors ask most."
      />

      {/* ── common questions ────────────────── */}
      <section className="mx-auto max-w-5xl px-5 pt-20 pb-16 sm:px-8 sm:pt-24 sm:pb-20">
        <dl className="border-t border-[color:var(--line)]">
          {visitAnswers.map((item) => (
            <div
              key={item.title}
              className="grid gap-3 border-b border-[color:var(--line)] py-8 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-10"
            >
              <dt className="flex items-center gap-3 font-serif text-xl text-[color:var(--brand)]">
                <span className="shrink-0 text-[color:var(--accent)]">{item.icon}</span>
                {item.title}
              </dt>
              <dd className="max-w-[54ch] leading-relaxed text-[color:var(--muted)]">
                {item.body}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── how sunday morning flows ─────────── */}
      <section className="border-t border-[color:var(--line)] bg-[color:var(--surface)]">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.15] text-[color:var(--brand)]">
            How the Morning Flows
          </h2>

          <dl className="mt-10 border-t border-[color:var(--line)]">
            {sundayFlow.map((step) => (
              <div
                key={step.title}
                className="flex flex-col gap-1 border-b border-[color:var(--line)] py-6 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <dt className="shrink-0 font-serif text-lg tabular-nums text-[color:var(--accent)] sm:w-44">
                  {step.time}
                </dt>
                <dd>
                  <p className="font-serif text-lg text-[color:var(--brand)]">{step.title}</p>
                  <p className="mt-1 max-w-[54ch] text-sm leading-relaxed text-[color:var(--muted)]">
                    {step.detail}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <NextStepCTA
        title="We'd Love to See You Sunday"
        description="Find directions to the EGST compound in Sarbet, or learn more about what your kids will experience."
        links={[
          { label: "Plan a Visit", href: "/visit" },
          { label: "Children's Ministry", href: "/children", variant: "outline" },
        ]}
      />
    </div>
  );
}
