"use client";

import Link from "next/link";
import { useAuth } from "@/app/lib/auth-context";

/**
 * The "Stay Connected" members-area entry point. Isolated as a client
 * component because it needs auth state (useAuth) to decide the sign-in
 * CTA label/target, while the pages that render it are server components.
 *
 * The three destinations are a list of links, not a grid of identical cards:
 * they are one kind of thing, read in order, and the row rule carries the
 * separation that three boxes were doing.
 */
const destinations = [
  {
    href: "/members/prayer-requests",
    title: "Pray for others",
    detail: "See what your church family needs prayer for and lift them up before the Lord.",
  },
  {
    href: "/members/prayer-requests",
    title: "Share requests",
    detail: "Submit prayer requests to be shared with the church or your pastors privately.",
  },
  {
    href: "/members",
    title: "Members directory",
    detail: "Find and connect with fellow members through the church directory.",
  },
];

export function MembersCTA() {
  const { user } = useAuth();

  return (
    <section className="border-t border-[color:var(--line)] bg-[color:var(--surface)]">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
        <div>
          <h2 className="text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.15] text-[color:var(--brand)]">
            Stay Connected
          </h2>
          <p className="mt-5 max-w-[54ch] text-lg leading-relaxed text-[color:var(--muted)]">
            As a member, you can pray for one another, share prayer requests, and stay connected
            through the members directory.
          </p>
          <Link
            href={user ? "/members/hub" : "/members"}
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-[color:var(--brand)] px-7 py-3.5 text-sm font-semibold text-[color:var(--cream)] transition-colors duration-200 hover:bg-[color:var(--brand-soft)]"
          >
            {user ? "Go to Members Area" : "Sign In as a Member"}
          </Link>
          {!user && (
            <p className="mt-4 text-sm text-[color:var(--muted)]">
              Only registered members can access these features.
            </p>
          )}
        </div>

        <ul className="border-t border-[color:var(--line)]">
          {destinations.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                className="group flex items-baseline gap-6 border-b border-[color:var(--line)] py-6 transition-colors duration-200 hover:bg-[color:var(--background)]"
              >
                <span className="flex-1">
                  <span className="block font-serif text-xl text-[color:var(--brand)]">
                    {item.title}
                  </span>
                  <span className="mt-1.5 block max-w-[54ch] text-sm leading-relaxed text-[color:var(--muted)]">
                    {item.detail}
                  </span>
                </span>
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0 text-[color:var(--accent)] transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
