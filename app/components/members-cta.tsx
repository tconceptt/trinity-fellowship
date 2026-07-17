"use client";

import Link from "next/link";
import { ScrollReveal, StaggerChildren, StaggerItem, TextReveal } from "./animations";
import { useAuth } from "@/app/lib/auth-context";

/**
 * The "Stay Connected" members-area entry point. Isolated as a client
 * component because it needs auth state (useAuth) to decide the sign-in
 * CTA label/target, while the pages that render it are server components.
 */
export function MembersCTA() {
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* subtle background texture */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(31,59,83,0.04)_0%,transparent_50%,rgba(127,91,52,0.04)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(31,59,83,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
              Members
            </p>
          </ScrollReveal>
          <TextReveal delay={0.1}>
            <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl">Stay Connected</h2>
          </TextReveal>
          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--muted)]">
              As a member, you can pray for one another, share prayer requests, and stay connected through the members directory.
            </p>
          </ScrollReveal>
        </div>

        <StaggerChildren className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-3 sm:gap-6" staggerDelay={0.12}>
          {/* Pray for Others */}
          <StaggerItem direction="up">
            <Link
              href="/members/prayer-requests"
              className="group relative flex flex-col items-center rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-8 text-center transition-all duration-500 hover:border-[color:var(--brand-soft)] hover:shadow-xl hover:shadow-[rgba(31,59,83,0.08)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--brand)]/10 transition-transform duration-500 group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="var(--brand)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[color:var(--foreground)]">
                Pray for Others
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
                See what your church family needs prayer for and lift them up before the Lord.
              </p>
            </Link>
          </StaggerItem>

          {/* Get Prayed For */}
          <StaggerItem direction="up">
            <Link
              href="/members/prayer-requests"
              className="group relative flex flex-col items-center rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-8 text-center transition-all duration-500 hover:border-[color:var(--brand-soft)] hover:shadow-xl hover:shadow-[rgba(31,59,83,0.08)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--accent)]/10 transition-transform duration-500 group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M17.5 21H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                  <path d="M22 10a4.5 4.5 0 0 0-7.29-3.5" />
                  <path d="M8 12v4" />
                  <path d="M8 8v.01" />
                </svg>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[color:var(--foreground)]">
                Share Requests
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
                Submit prayer requests to be shared with the church or your pastors privately.
              </p>
            </Link>
          </StaggerItem>

          {/* Members Directory */}
          <StaggerItem direction="up">
            <Link
              href="/members"
              className="group relative flex flex-col items-center rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-8 text-center transition-all duration-500 hover:border-[color:var(--brand-soft)] hover:shadow-xl hover:shadow-[rgba(31,59,83,0.08)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--brand-soft)]/10 transition-transform duration-500 group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="var(--brand-soft)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[color:var(--foreground)]">
                Members Directory
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
                Find and connect with fellow members through the church directory.
              </p>
            </Link>
          </StaggerItem>
        </StaggerChildren>

        {/* CTA */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12 text-center">
            <Link
              href={user ? "/members/hub" : "/members"}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--brand)] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[color:var(--brand-soft)] hover:shadow-lg"
            >
              {user ? "Go to Members Area" : "Sign In as a Member"}
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
            {!user && (
              <p className="mt-4 text-sm text-[color:var(--muted)]">
                Only registered members can access these features.
              </p>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
