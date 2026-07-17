import type { Metadata } from "next";
import { PageHero } from "@/app/components/page-hero";
import { NextStepCTA } from "@/app/components/next-step-cta";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/app/components/animations";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Why church membership matters at Trinity Fellowship Addis Ababa: every Christian belongs in a gospel-centered local church, under shepherds who know them by name. Learn how to pursue membership at Trinity.",
  alternates: { canonical: "/membership" },
};

function Verse({
  text,
  reference,
  onSurface = false,
}: {
  text: string;
  reference: string;
  /** Use the page background when the verse sits inside a surface-colored section. */
  onSurface?: boolean;
}) {
  return (
    <blockquote
      className={`my-8 rounded-2xl border-l-4 border-[color:var(--accent)] px-6 py-5 sm:px-8 ${
        onSurface ? "bg-[color:var(--background)]" : "bg-[color:var(--surface)]"
      }`}
    >
      <p className="font-serif text-lg leading-relaxed text-[color:var(--brand)] sm:text-xl">
        &ldquo;{text}&rdquo;
      </p>
      <cite className="mt-3 block text-xs font-semibold uppercase not-italic tracking-[0.14em] text-[color:var(--brand-soft)]">
        {reference}
      </cite>
    </blockquote>
  );
}

export default function MembershipPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Membership"
        title="Belonging to the Flock"
        lede="God never meant for Christians to follow Jesus alone. Membership is how we commit to a local church — and how a local church commits to us."
      />

      {/* ── why membership matters ──────────── */}
      <section className="mx-auto max-w-3xl px-5 pb-16 sm:px-8 sm:pb-20">
        <ScrollReveal>
          <h2 className="text-3xl text-[color:var(--foreground)] sm:text-4xl">
            Why Membership Matters
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mt-6 space-y-4 leading-relaxed text-[color:var(--muted)]">
            <p>
              When God saves us, He saves us into a family. That is why we believe every Christian
              should become a member of a gospel-centered local church — and Trinity is not the only
              one in Addis Ababa. Our desire is not that you join <em>our</em> church, but that you
              joyfully commit to <em>a</em> church where the gospel is preached and the sheep are
              known. If that is Trinity, we would be glad beyond words to welcome you.
            </p>
            <p>
              What we lovingly urge you not to do is drift — attending here and there, known by no
              one, carried by no one when trials come.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <Verse
            text="So we, though many, are one body in Christ, and individually members one of another."
            reference="Romans 12:5 (ESV)"
          />
        </ScrollReveal>
      </section>

      {/* ── a god-assigned shepherd ─────────── */}
      <section className="border-t border-[color:var(--line)] bg-[color:var(--surface)]">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
              God&apos;s Design
            </p>
            <h2 className="mt-3 text-3xl text-[color:var(--foreground)] sm:text-4xl">
              A God-Assigned Shepherd
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-6 leading-relaxed text-[color:var(--muted)]">
              Shepherds are God&apos;s own design for the care of His church: the Holy Spirit places
              pastors in the flock (Acts 20:28) — not to domineer, but to lead willingly and by
              example (1 Peter 5:2&ndash;3).
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <Verse
              onSurface
              text="Obey your leaders and submit to them, for they are keeping watch over your souls, as those who will have to give an account."
              reference="Hebrews 13:17 (ESV)"
            />
            <p className="leading-relaxed text-[color:var(--muted)]">
              This verse presses one question on each of us: <em>who is keeping watch over your
              soul?</em> Membership is how you answer it — placing yourself under the joyful,
              accountable care of shepherds who actually know you.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── how we care for one another ─────── */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
            Life Together
          </p>
          <h2 className="mt-3 text-3xl text-[color:var(--foreground)] sm:text-4xl">
            Membership Is Not a Name on a List
          </h2>
        </ScrollReveal>

        <StaggerChildren className="mt-10 grid gap-5 sm:grid-cols-2" staggerDelay={0.12}>
          <StaggerItem direction="up">
            <div className="h-full rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-6 transition-all duration-300 hover:border-[color:var(--brand-soft)] hover:shadow-lg hover:shadow-[rgba(31,59,83,0.06)] sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--brand-soft)]">
                Shepherded in Prayer
              </p>
              <h3 className="mt-3 text-xl font-semibold text-[color:var(--foreground)]">
                Our Pastors Pray for Members by Name
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">
                Not as a crowd, but as individual sheep whom the Good Shepherd knows and loves.
              </p>
            </div>
          </StaggerItem>
          <StaggerItem direction="up">
            <div className="h-full rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-6 transition-all duration-300 hover:border-[color:var(--brand-soft)] hover:shadow-lg hover:shadow-[rgba(31,59,83,0.06)] sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--brand-soft)]">
                Carried by the Body
              </p>
              <h3 className="mt-3 text-xl font-semibold text-[color:var(--foreground)]">
                Members Care for One Another
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">
                Through community groups and everyday fellowship, your joys become the church&apos;s
                joys — and your burdens become burdens we carry together.
              </p>
            </div>
          </StaggerItem>
        </StaggerChildren>
      </section>

      {/* ── how to pursue membership ────────── */}
      <section className="border-t border-[color:var(--line)] bg-[color:var(--surface)]">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
              Next Steps
            </p>
            <h2 className="mt-3 text-3xl text-[color:var(--foreground)] sm:text-4xl">
              How to Pursue Membership
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="mt-6 space-y-4 leading-relaxed text-[color:var(--muted)]">
              <p>
                The first step is easy: speak with any of our church staff after a Sunday service.
                From there, we will walk with you at a deliberate pace. We take great care to truly
                know the sheep coming into the flock, so new members are welcomed in intentional
                rounds, held only two to three times a year. It is slow the way good shepherding is
                slow — you will not be joining a database, but a family that already knows your name.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <NextStepCTA
        eyebrow="Take the First Step"
        title="Come Worship with Us"
        description="Join us any Sunday and find a member of our staff afterward. We would be glad to begin the conversation."
        links={[
          { label: "Plan a Visit", href: "/visit" },
          { label: "What to Expect", href: "/visit/what-to-expect", variant: "outline" },
        ]}
      />
    </div>
  );
}
