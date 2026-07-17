import type { Metadata } from "next";
import Image from "next/image";
import { NextStepCTA } from "@/app/components/next-step-cta";
import {
  ScrollReveal,
  StaggerChildren,
  StaggerItem,
  TextReveal,
} from "@/app/components/animations";
import { childrenMinistryDetails } from "@/app/lib/site-content";

export const metadata: Metadata = {
  title: "Children's Ministry",
  description:
    "Every Sunday from 11:00 AM to 12:00 PM, children ages 4 to 12 are welcomed into a safe and joyful space to learn the Scriptures and get to know Jesus at Trinity Fellowship.",
  alternates: { canonical: "/children" },
};

export default function ChildrenPage() {
  return (
    <div className="min-h-screen">
      {/* ── children ministry hero ─────────── */}
      <section className="relative flex h-[85svh] items-end overflow-hidden sm:h-[90svh]">
        <Image
          src="/images/children-ministry.jpg"
          alt="Children's ministry at Trinity Fellowship"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,33,48,0.82)_0%,rgba(14,33,48,0.4)_40%,rgba(14,33,48,0.15)_100%)]" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 sm:px-10 sm:pb-20">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c9b89a]">
              Family Ministry
            </p>
          </ScrollReveal>
          <TextReveal delay={0.1}>
            <h1
              className="mt-3 text-4xl leading-tight text-[#fbf4e8] sm:text-5xl lg:text-6xl"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.3)" }}
            >
              Children&apos;s Ministry
            </h1>
          </TextReveal>
        </div>
      </section>

      {/* ── children ministry details ────────── */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <ScrollReveal>
              <p className="max-w-2xl text-lg leading-relaxed text-[color:var(--muted)]">
                Every Sunday from 11:00 AM to 12:00 PM, children ages 4 to 12 are welcomed into a
                safe and joyful space to learn the Scriptures and get to know Jesus.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.12}>
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

      <NextStepCTA
        eyebrow="Next Steps"
        title="Bring the Whole Family"
        description="See the full Sunday schedule and find directions to our gathering in Sarbet."
        links={[{ label: "Plan a Visit", href: "/visit" }]}
      />
    </div>
  );
}
