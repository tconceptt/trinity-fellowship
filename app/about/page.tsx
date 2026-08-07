import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/app/components/page-hero";
import { NextStepCTA } from "@/app/components/next-step-cta";
import { StickyImageSection } from "@/app/components/animations";
import { ministryFocus } from "@/app/lib/site-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Trinity Fellowship is a gospel-centered church in Addis Ababa formed by grace, devoted to the Word, worship, and witness.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        title="A Church Formed by Grace"
        lede="We believe the church should feel both reverent and alive. As we worship, pray, preach, and serve, we seek a life that is spiritually deep, biblically grounded, and richly communal."
      />

      {/* ── word / worship / witness ──────── */}
      <section className="mx-auto max-w-6xl px-5 pt-20 pb-20 sm:px-8 sm:pt-24 sm:pb-28">
        <dl className="border-t border-[color:var(--line)]">
          {ministryFocus.map((item) => (
            <div
              key={item.title}
              className="grid gap-2 border-b border-[color:var(--line)] py-8 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-12"
            >
              <dt className="text-[clamp(1.75rem,3vw,2.5rem)] leading-none text-[color:var(--brand)]">
                {item.title}
              </dt>
              <dd className="max-w-[54ch] text-lg leading-relaxed text-[color:var(--muted)]">
                {item.detail}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── cityscape quote ────────────────── */}
      <StickyImageSection
        className="band-deep"
        overlay={
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <blockquote className="max-w-4xl text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.3]">
              &ldquo;By his Word and Spirit, Christ is building his church
              <span className="text-[color:var(--gold)]"> in every tribe, tongue, and nation.</span>
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
        {/* The wash carries the contrast so the type never depends on the photo. */}
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(15,30,43,0.84)_14%,rgba(15,30,43,0.58)_50%,rgba(15,30,43,0.86)_100%)]" />
      </StickyImageSection>

      {/* ── our aim ─────────────────────────── */}
      <StickyImageSection
        className="band-deep"
        overlay={
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <p className="max-w-4xl text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.3]">
              To worship God, mature believers, and bear witness to Christ and his kingdom
              <span className="text-[color:var(--gold)]"> in all the world.</span>
            </p>
          </div>
        }
      >
        <Image
          src="/images/scripture-prayer.jpg"
          alt="Open Bible and prayerful hands"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,30,43,0.86)_12%,rgba(15,30,43,0.58)_56%,rgba(15,30,43,0.86)_100%)]" />
      </StickyImageSection>

      <NextStepCTA
        title="Get to Know Trinity Fellowship"
        description="Meet our pastors and read the doctrinal convictions that shape our life together."
        links={[
          { label: "Meet Our Pastors", href: "/pastors" },
          { label: "Read Our Beliefs", href: "/beliefs", variant: "outline" },
        ]}
      />
    </div>
  );
}
