import type { Metadata } from "next";
import { PageHero } from "@/app/components/page-hero";
import { NextStepCTA } from "@/app/components/next-step-cta";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Why church membership matters at Trinity Fellowship Addis Ababa: every Christian belongs in a gospel-centered local church, under shepherds who know them by name. Learn how to pursue membership at Trinity.",
  alternates: { canonical: "/membership" },
};

/**
 * Scripture is set in the quote face and separated by rules above and below —
 * the voice change carries it, so it needs no tinted box or accent stripe.
 */
function Verse({ text, reference }: { text: string; reference: string }) {
  return (
    <figure className="my-10 border-y border-[color:var(--line)] py-7">
      <blockquote>
        <p className="font-quote text-xl leading-relaxed text-[color:var(--brand)] sm:text-2xl">
          &ldquo;{text}&rdquo;
        </p>
      </blockquote>
      <figcaption className="mt-4 text-sm font-semibold text-[color:var(--accent)]">
        {reference}
      </figcaption>
    </figure>
  );
}

const careCommitments = [
  {
    title: "Our Pastors Pray for Members by Name",
    detail:
      "Not as a crowd, but as individual sheep whom the Good Shepherd knows and loves.",
  },
  {
    title: "Members Care for One Another",
    detail:
      "Through community groups and everyday fellowship, your joys become the church's joys — and your burdens become burdens we carry together.",
  },
];

export default function MembershipPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        title="Belonging to the Flock"
        lede="God never meant for Christians to follow Jesus alone. Membership is how we commit to a local church — and how a local church commits to us."
      />

      {/* ── why membership matters ──────────── */}
      <section className="mx-auto max-w-[54ch] px-5 pt-20 pb-16 sm:px-8 sm:pt-24 sm:pb-20">
        <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.2] text-[color:var(--brand)]">
          Why Membership Matters
        </h2>
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
        <Verse
          text="So we, though many, are one body in Christ, and individually members one of another."
          reference="Romans 12:5 (ESV)"
        />
      </section>

      {/* ── a god-assigned shepherd ─────────── */}
      <section className="border-t border-[color:var(--line)] bg-[color:var(--surface)]">
        <div className="mx-auto max-w-[54ch] px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.2] text-[color:var(--brand)]">
            A God-Assigned Shepherd
          </h2>
          <p className="mt-6 leading-relaxed text-[color:var(--muted)]">
            Shepherds are God&apos;s own design for the care of His church: the Holy Spirit places
            pastors in the flock (Acts 20:28) — not to domineer, but to lead willingly and by
            example (1 Peter 5:2&ndash;3).
          </p>
          <Verse
            text="Obey your leaders and submit to them, for they are keeping watch over your souls, as those who will have to give an account."
            reference="Hebrews 13:17 (ESV)"
          />
          <p className="leading-relaxed text-[color:var(--muted)]">
            This verse presses one question on each of us: <em>who is keeping watch over your
            soul?</em> Membership is how you answer it — placing yourself under the joyful,
            accountable care of shepherds who actually know you.
          </p>
        </div>
      </section>

      {/* ── how we care for one another ─────── */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.2] text-[color:var(--brand)]">
          Membership Is Not a Name on a List
        </h2>
        <dl className="mt-10 border-t border-[color:var(--line)]">
          {careCommitments.map((item) => (
            <div
              key={item.title}
              className="grid gap-2 border-b border-[color:var(--line)] py-7 sm:grid-cols-[minmax(0,24rem)_1fr] sm:gap-10"
            >
              <dt className="font-serif text-xl text-[color:var(--brand)]">{item.title}</dt>
              <dd className="max-w-[54ch] leading-relaxed text-[color:var(--muted)]">
                {item.detail}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── how to pursue membership ────────── */}
      <section className="border-t border-[color:var(--line)] bg-[color:var(--surface)]">
        <div className="mx-auto max-w-[54ch] px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.2] text-[color:var(--brand)]">
            How to Pursue Membership
          </h2>
          <p className="mt-6 leading-relaxed text-[color:var(--muted)]">
            The first step is easy: speak with any of our church staff after a Sunday service. From
            there, we will walk with you at a deliberate pace. We take great care to truly know the
            sheep coming into the flock, so new members are welcomed in intentional rounds, held only
            two to three times a year. It is slow the way good shepherding is slow — you will not be
            joining a database, but a family that already knows your name.
          </p>
        </div>
      </section>

      <NextStepCTA
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
