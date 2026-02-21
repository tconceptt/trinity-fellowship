"use client";

import Image from "next/image";
import {
  useScroll,
  useMotionValueEvent,
  motion,
  AnimatePresence,
} from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MobileNav } from "./mobile-nav";
import { SignInForm } from "./sign-in-form";
import { navLinks } from "@/app/lib/nav-links";
import { useAuth } from "@/app/lib/auth-context";
import { getInitials, getAccent } from "@/app/lib/avatar-utils";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const authDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, loading, signOut, memberName, memberFirstName } = useAuth();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isScrolled = latest > 48;
    setScrolled((prev) => (prev === isScrolled ? prev : isScrolled));
  });

  const handleMouseEnter = useCallback((label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  }, []);

  // Close auth dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (authDropdownRef.current && !authDropdownRef.current.contains(e.target as Node)) {
        setAuthDropdownOpen(false);
      }
    }
    if (authDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [authDropdownOpen]);

  const handleSignOut = async () => {
    setAuthDropdownOpen(false);
    await signOut();
    router.push("/");
  };

  const displayName = memberName || user?.user_metadata?.full_name || user?.email || "";
  const initials = displayName ? getInitials(displayName) : "?";
  const accent = displayName ? getAccent(displayName) : ["bg-[#1f3b53]/10", "text-[#1f3b53]"] as const;

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div
        className={`relative border-b transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? "border-[color:var(--line)] bg-[color:var(--surface)]/90 shadow-[0_10px_35px_-25px_rgba(18,32,45,0.7)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 md:grid md:grid-cols-[1fr_auto_1fr]">
          {/* Logo */}
          <a href="/" aria-label="Go to homepage" className="justify-self-start">
            <div className="flex items-center gap-3">
              <Image
                src="/Logos/trinity-logo.svg"
                alt="Trinity Fellowship logo"
                width={32}
                height={42}
                priority
                className="h-auto w-8 sm:w-9"
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--brand)] sm:text-sm">
                  Trinity Fellowship
                </p>
                <p className="hidden text-[10px] text-[color:var(--muted)] sm:block">
                  Addis Ababa, Ethiopia
                </p>
              </div>
            </div>
          </a>

          {/* Centered desktop navigation capsule */}
          <nav
            className={`hidden items-center gap-1 rounded-full border px-2 py-1.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:flex ${
              scrolled
                ? "border-transparent bg-transparent shadow-none"
                : "border-white/65 bg-[#edf4ee]/95 shadow-[0_12px_26px_-18px_rgba(23,33,43,0.55)] backdrop-blur-sm"
            }`}
          >
            {navLinks.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.children && handleMouseEnter(item.label)
                }
                onMouseLeave={() => item.children && handleMouseLeave()}
              >
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-[13px] font-bold uppercase tracking-[0.1em] text-[color:var(--muted)] transition-all duration-300 hover:bg-[color:var(--brand)]/6 hover:text-[color:var(--brand)]"
                >
                  {item.label}
                  {item.children && (
                    <svg
                      className={`h-3 w-3 transition-transform duration-300 ${openDropdown === item.label ? "rotate-180" : ""}`}
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 4.5l3 3 3-3" />
                    </svg>
                  )}
                </a>

                <AnimatePresence>
                  {item.children && openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2"
                    >
                      <div className="min-w-[180px] overflow-hidden rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)]/95 p-1.5 shadow-lg shadow-[rgba(31,59,83,0.12)] backdrop-blur-md">
                        {item.children.map((child) => (
                          <a
                            key={child.href}
                            href={child.href}
                            className="block rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[color:var(--muted)] transition-all duration-200 hover:bg-[color:var(--brand)]/6 hover:text-[color:var(--brand)]"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right side: Auth (desktop) + Mobile Nav */}
          <div className="flex items-center gap-3 justify-self-end">
            {/* Desktop auth section */}
            <div className="relative hidden md:block" ref={authDropdownRef}>
              {loading ? (
                <div className="h-9 w-9" />
              ) : user ? (
                <>
                  <button
                    onClick={() => setAuthDropdownOpen(!authDropdownOpen)}
                    className="flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--surface)]/60 py-1 pl-1 pr-3.5 backdrop-blur-md transition-all duration-200 hover:border-[color:var(--brand)]/30 hover:shadow-sm"
                    aria-label="User menu"
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full font-serif text-[11px] font-bold ${accent[0]} ${accent[1]}`}
                    >
                      {initials}
                    </span>
                    {memberFirstName && (
                      <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                        {memberFirstName}
                      </span>
                    )}
                  </button>

                  <AnimatePresence>
                    {authDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute right-0 top-full z-50 mt-2"
                      >
                        <div className="w-64 overflow-hidden rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)]/95 p-1.5 shadow-lg shadow-[rgba(31,59,83,0.12)] backdrop-blur-md">
                          {/* User info */}
                          <div className="px-3 py-2.5">
                            <p className="truncate text-xs text-[color:var(--muted)]">
                              {user.email}
                            </p>
                          </div>
                          <div className="mx-1.5 border-t border-[color:var(--line)]" />

                          {/* Links */}
                          <a
                            href="/members/hub"
                            onClick={() => setAuthDropdownOpen(false)}
                            className="mt-1 flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-[color:var(--muted)] transition-all duration-200 hover:bg-[color:var(--brand)]/6 hover:text-[color:var(--brand)]"
                          >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="3" width="7" height="7" rx="1" />
                              <rect x="14" y="3" width="7" height="7" rx="1" />
                              <rect x="3" y="14" width="7" height="7" rx="1" />
                              <rect x="14" y="14" width="7" height="7" rx="1" />
                            </svg>
                            Members Area
                          </a>
                          <a
                            href="/members"
                            onClick={() => setAuthDropdownOpen(false)}
                            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-[color:var(--muted)] transition-all duration-200 hover:bg-[color:var(--brand)]/6 hover:text-[color:var(--brand)]"
                          >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            Members Directory
                          </a>
                          <a
                            href="/members/prayer-requests"
                            onClick={() => setAuthDropdownOpen(false)}
                            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-[color:var(--muted)] transition-all duration-200 hover:bg-[color:var(--brand)]/6 hover:text-[color:var(--brand)]"
                          >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                            Prayer Requests
                          </a>

                          <div className="mx-1.5 mt-1 border-t border-[color:var(--line)]" />

                          <button
                            onClick={handleSignOut}
                            className="mt-1 flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-[color:var(--muted)] transition-all duration-200 hover:bg-red-500/6 hover:text-red-600"
                          >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                              <polyline points="16 17 21 12 16 7" />
                              <line x1="21" x2="9" y1="12" y2="12" />
                            </svg>
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setAuthDropdownOpen(!authDropdownOpen)}
                    className="rounded-full bg-[color:var(--brand)] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.1em] text-white shadow-sm transition-all duration-300 hover:bg-[color:var(--brand-soft)] hover:shadow-md"
                  >
                    Sign In
                  </button>

                  <AnimatePresence>
                    {authDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute right-0 top-full z-50 mt-2"
                      >
                        <div className="w-72 overflow-hidden rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)]/95 p-5 shadow-lg shadow-[rgba(31,59,83,0.12)] backdrop-blur-md">
                          <p className="text-center text-sm font-semibold text-[color:var(--foreground)]">
                            Member Sign In
                          </p>
                          <p className="mt-1 text-center text-xs text-[color:var(--muted)]">
                            Enter your email to receive a login link.
                          </p>
                          <div className="mt-4">
                            <SignInForm compact />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>

            {/* Mobile Navigation */}
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
