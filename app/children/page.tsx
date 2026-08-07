import type { Metadata } from "next";
import Image from "next/image";
import { NextStepCTA } from "@/app/components/next-step-cta";
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
      <section className="band-deep relative flex h-[70svh] items-end overflow-hidden sm:h-[78svh]">
        <Image
          src="/images/children-ministry.jpg"
          alt="Children's ministry at Trinity Fellowship"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* The wash is the contrast guarantee — the type never relies on the photo. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,30,43,0.92)_0%,rgba(15,30,43,0.55)_45%,rgba(15,30,43,0.2)_100%)]"
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20">
          <h1 className="text-[clamp(2.25rem,5vw,4rem)] leading-[1.12]">Children&apos;s Ministry</h1>
        </div>
      </section>

      {/* ── children ministry details ────────── */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <p className="max-w-[54ch] text-lg leading-relaxed text-[color:var(--muted)]">
              Every Sunday from 11:00 AM to 12:00 PM, children ages 4 to 12 are welcomed into a safe
              and joyful space to learn the Scriptures and get to know Jesus.
            </p>
            <p className="mt-4 max-w-[54ch] leading-relaxed text-[color:var(--muted)]">
              Parents can attend the main service with peace of mind, knowing their children are
              cared for nearby in the same building.
            </p>
          </div>

          <dl className="self-center border-t border-[color:var(--line)]">
            {childrenMinistryDetails.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-1 border-b border-[color:var(--line)] py-5 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <dt className="shrink-0 text-sm font-semibold text-[color:var(--accent)] sm:w-20">
                  {item.label}
                </dt>
                <dd className="text-lg text-[color:var(--brand)]">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <NextStepCTA
        title="Bring the Whole Family"
        description="See the full Sunday schedule and find directions to our gathering in Sarbet."
        links={[
          { label: "Plan a Visit", href: "/visit" },
          { label: "What to Expect", href: "/visit/what-to-expect", variant: "outline" },
        ]}
      />
    </div>
  );
}
