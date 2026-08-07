"use client";

import Link from "next/link";
import { PageHero } from "@/app/components/page-hero";
import { useAuth } from "@/app/lib/auth-context";

const verses = [
  {
    text: "And let us consider how to stir up one another to love and good works, not neglecting to meet together, as is the habit of some, but encouraging one another, and all the more as you see the Day drawing near.",
    ref: "Hebrews 10:24–25",
  },
  {
    text: "Behold, how good and pleasant it is when brothers dwell in unity!",
    ref: "Psalm 133:1",
  },
  {
    text: "Bear one another’s burdens, and so fulfill the law of Christ.",
    ref: "Galatians 6:2",
  },
  {
    text: "For just as the body is one and has many members, and all the members of the body, though many, are one body, so it is with Christ.",
    ref: "1 Corinthians 12:12",
  },
];

const links = [
  {
    href: "/members",
    title: "Members Directory",
    description: "Find and connect with fellow members of our church family.",
  },
  {
    href: "/members/prayer-requests",
    title: "Prayer Requests",
    description: "Share what’s on your heart and pray for one another.",
  },
];

export default function MembersHubPage() {
  const { memberFirstName } = useAuth();

  return (
    <div className="min-h-screen">
      {/* The name arrives with client-side auth state, so the greeting renders
          nameless on first paint and fills in once the session resolves. */}
      <PageHero
        compact
        title={memberFirstName ? `Welcome back, ${memberFirstName}.` : "Welcome back."}
        lede="This is your space to stay connected with our church family: find one another, pray for one another, and encourage one another."
      />

      {/* ── where to go ─────────────────────── */}
      <section className="mx-auto max-w-3xl px-5 pt-12 pb-14 sm:px-8 sm:pt-14 sm:pb-16">
        <ul className="border-t border-[color:var(--line)]">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex items-baseline justify-between gap-6 border-b border-[color:var(--line)] py-5 transition-colors duration-200 hover:bg-[color:var(--surface)]"
              >
                <span>
                  <span className="block font-serif text-xl text-[color:var(--brand)]">
                    {link.title}
                  </span>
                  <span className="mt-1 block text-sm text-[color:var(--muted)]">
                    {link.description}
                  </span>
                </span>
                <span className="shrink-0 text-sm font-semibold text-[color:var(--accent)]">
                  Open
                  <span
                    aria-hidden
                    className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── scripture ───────────────────────── */}
      <section className="border-t border-[color:var(--line)] bg-[color:var(--surface)]">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
          <h2 className="text-[clamp(1.6rem,2.6vw,2.125rem)] leading-[1.2] text-[color:var(--brand)]">
            One Body, Many Members
          </h2>
          <p className="mt-4 max-w-[54ch] leading-relaxed text-[color:var(--muted)]">
            Scripture calls us to a life lived together: bearing one another&apos;s burdens,
            stirring up love, and meeting together with joy.
          </p>

          <div className="mt-8 border-t border-[color:var(--line)]">
            {verses.map((verse) => (
              <figure key={verse.ref} className="border-b border-[color:var(--line)] py-6">
                <blockquote>
                  <p className="max-w-[58ch] font-quote text-lg leading-relaxed text-[color:var(--brand)]">
                    &ldquo;{verse.text}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-3 text-sm font-semibold text-[color:var(--accent)]">
                  {verse.ref}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
