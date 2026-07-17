import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/app/components/page-hero";
import { NextStepCTA } from "@/app/components/next-step-cta";
import {
  StaggerChildren,
  StaggerItem,
  StickyImageSection,
  SectionDivider,
} from "@/app/components/animations";
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
        eyebrow="Who We Are"
        title="A Church Formed by Grace"
        lede="We believe the church should feel both reverent and alive. As we worship, pray, preach, and serve, we seek a life that is spiritually deep, biblically grounded, and richly communal."
      />

      {/* ── word / worship / witness ──────── */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
        <StaggerChildren className="grid gap-8 sm:grid-cols-3" staggerDelay={0.15}>
          {ministryFocus.map((item) => (
            <StaggerItem key={item.title} direction="up">
              <div className="group relative h-full border-l-2 border-[color:var(--line)] py-2 pl-6 transition-all duration-500 hover:border-[color:var(--accent)] hover:pl-8">
                <span className="absolute -left-[1px] top-0 block h-0 w-[2px] bg-[color:var(--accent)] transition-all duration-500 group-hover:h-full" />
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[color:var(--brand-soft)] opacity-60">
                    {item.number}
                  </span>
                  <h2 className="text-3xl text-[color:var(--brand)] sm:text-4xl">{item.title}</h2>
                </div>
                <p className="mt-2 text-[color:var(--muted)]">{item.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* ── cityscape parallax quote ───────── */}
      <StickyImageSection
        overlay={
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <blockquote
              className="max-w-3xl text-3xl leading-tight text-[#fbf4e8] sm:text-5xl lg:text-6xl"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.3)" }}
            >
              &ldquo;By his Word and Spirit, Christ is building his church
              <span className="text-[#c9b89a]"> in every tribe, tongue, and nation.</span>
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

      {/* ── our aim ─────────────────────────── */}
      <StickyImageSection
        overlay={
          <div className="mx-auto max-w-7xl px-6 sm:px-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c9b89a]">
              Our Aim
            </p>
            <p className="mt-4 max-w-3xl text-3xl leading-tight text-[#f5ecde] sm:text-5xl lg:text-6xl">
              To worship God, mature believers, and bear witness to Christ and his kingdom
              <span className="text-[#c9b89a]"> in all the world.</span>
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
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(12,28,41,0.78)_12%,rgba(12,28,41,0.30)_56%,rgba(12,28,41,0.78)_100%)]" />
      </StickyImageSection>

      <SectionDivider className="mx-auto max-w-7xl px-5 sm:px-8" />

      <NextStepCTA
        eyebrow="Next Steps"
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
