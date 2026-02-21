"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/app/components/header";
import { useAuth } from "@/app/lib/auth-context";

const verses = [
  {
    text: "And let us consider how to stir up one another to love and good works, not neglecting to meet together, as is the habit of some, but encouraging one another, and all the more as you see the Day drawing near.",
    ref: "Hebrews 10:24\u201325",
  },
  {
    text: "Behold, how good and pleasant it is when brothers dwell in unity!",
    ref: "Psalm 133:1",
  },
  {
    text: "Bear one another\u2019s burdens, and so fulfill the law of Christ.",
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
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="var(--brand)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    accentClass: "bg-[color:var(--brand)]/10",
  },
  {
    href: "/members/prayer-requests",
    title: "Prayer Requests",
    description: "Share what\u2019s on your heart and pray for one another.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
    accentClass: "bg-[color:var(--accent)]/10",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function MembersHubPage() {
  const { memberFirstName } = useAuth();

  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <Header />

      <main className="mx-auto max-w-3xl px-5 pt-28 pb-20 sm:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
            Members Area
          </p>
          <h1 className="mt-3 font-serif text-4xl text-[color:var(--foreground)] sm:text-5xl">
            {memberFirstName
              ? `Welcome back, ${memberFirstName}.`
              : "Welcome back."}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-[color:var(--muted)]">
            This is your space to stay connected with our church family &mdash;
            find one another, pray for one another, and encourage one another.
          </p>
        </motion.div>

        {/* Action cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
          className="mt-12 grid gap-5 sm:grid-cols-2"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative flex flex-col items-center rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-8 text-center transition-all duration-500 hover:border-[color:var(--brand-soft)] hover:shadow-xl hover:shadow-[rgba(31,59,83,0.08)]"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 ${link.accentClass}`}
              >
                {link.icon}
              </div>
              <h2 className="mt-5 text-xl font-semibold text-[color:var(--foreground)]">
                {link.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
                {link.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--brand)] transition-colors group-hover:text-[color:var(--brand-soft)]">
                Open
                <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </Link>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-16 mb-12 h-px w-24 bg-[color:var(--line)]"
        />

        {/* Verses section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease }}
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
            The Fellowship of the Saints
          </p>
          <h2 className="mt-3 text-center font-serif text-3xl text-[color:var(--foreground)] sm:text-4xl">
            One Body, Many Members
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm leading-relaxed text-[color:var(--muted)]">
            Scripture calls us to a life lived together &mdash; bearing one
            another&apos;s burdens, stirring up love, and meeting together
            with joy.
          </p>
        </motion.div>

        <div className="mt-10 space-y-6">
          {verses.map((verse, i) => (
            <motion.blockquote
              key={verse.ref}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 + i * 0.1, ease }}
              className="rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] p-6 sm:p-8"
            >
              <div className="flex gap-4">
                <div className="mt-1 hidden shrink-0 sm:block">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--brand)]/8">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-[color:var(--brand)]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-[15px] italic leading-relaxed text-[color:var(--foreground)]/80">
                    &ldquo;{verse.text}&rdquo;
                  </p>
                  <cite className="mt-3 block text-xs font-bold not-italic tracking-wide text-[color:var(--brand)]">
                    {verse.ref}
                  </cite>
                </div>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </main>
    </div>
  );
}
