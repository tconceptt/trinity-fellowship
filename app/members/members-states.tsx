"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { PageHero } from "@/app/components/page-hero";

/**
 * The directory and prayer-request pages resolve identically: check the
 * session, check the email belongs to an active member, then load. Their three
 * non-success outcomes were copy-pasted between the two files, so they live
 * here instead — one place to restyle, and the chrome stays identical whichever
 * page you landed on.
 */

export function MembersLoading({
  title,
  label,
  children,
}: {
  title: string;
  label: string;
  /** Optional skeleton shaped like the content that is about to arrive. */
  children?: ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <PageHero compact title={title} />
      <section className="mx-auto max-w-5xl px-5 pt-10 pb-16 sm:px-8 sm:pt-12">
        {/* Text rather than a spinner: nothing else on the site spins, and the
            reduced-motion rule in globals.css would freeze one mid-turn. */}
        <p
          className={children ? "sr-only" : "text-sm text-[color:var(--muted)]"}
          role="status"
          aria-live="polite"
        >
          {label}
        </p>
        {children}
      </section>
    </div>
  );
}

export function NotAMember({
  email,
  onSignOut,
}: {
  email: string;
  onSignOut: () => void;
}) {
  return (
    <div className="min-h-screen">
      <PageHero
        compact
        title="Not a Registered Member"
        lede="This area is for members of Trinity Fellowship, and the address you signed in with is not on our list."
      />
      <section className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
        <p className="max-w-[54ch] leading-relaxed text-[color:var(--muted)]">
          You are signed in as{" "}
          <strong className="font-semibold text-[color:var(--foreground)]">
            {email}
          </strong>
          . If you believe this is a mistake, or you have joined recently, speak
          with any of our staff after a Sunday service and we will put it right.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <button
            onClick={onSignOut}
            className="text-sm font-semibold text-[color:var(--muted)] transition-colors duration-200 hover:text-[color:var(--accent)]"
          >
            Sign out and try another email
          </button>
          <Link
            href="/membership"
            className="prose-link text-sm font-semibold text-[color:var(--brand)] hover:text-[color:var(--accent)]"
          >
            About membership
          </Link>
        </div>
      </section>
    </div>
  );
}

export function LoadFailed({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="min-h-screen">
      <PageHero compact title={title} />
      <section className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
        <p className="max-w-[54ch] leading-relaxed text-[color:var(--muted)]">
          {message}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-brand mt-8"
        >
          Try Again
        </button>
      </section>
    </div>
  );
}

/** Back to the members hub. Shown at the top of the two leaf pages. */
export function BackToHub() {
  return (
    <Link
      href="/members/hub"
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--muted)] transition-colors duration-200 hover:text-[color:var(--accent)]"
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
      Members Area
    </Link>
  );
}
