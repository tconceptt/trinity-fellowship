"use client";

import Image from "next/image";
import {
  useScroll,
  useMotionValueEvent,
  motion,
  AnimatePresence,
} from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { MobileNav } from "./mobile-nav";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const navLinks: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/#about",
    children: [
      { label: "Our Story", href: "/#about" },
      { label: "Our Pastors", href: "/pastors" },
    ],
  },
  { label: "Schedule", href: "/#schedule" },
  { label: "Children", href: "/#children" },
  { label: "Beliefs", href: "/#beliefs" },
  { label: "Visit", href: "/#visit" },
  { label: "Members", href: "/members" },
];

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div
        className={`relative border-b transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? "border-[color:var(--line)] bg-[color:var(--surface)]/90 shadow-[0_10px_35px_-25px_rgba(18,32,45,0.7)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 py-4 sm:px-8">
          {/* Logo sits outside the nav capsule */}
          <a href="#" aria-label="Go to top" className="justify-self-start">
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

          {/* Mobile Navigation */}
          <div className="justify-self-end">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
