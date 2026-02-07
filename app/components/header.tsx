"use client";

import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { MobileNav } from "./mobile-nav";

const navLinks = ["About", "Schedule", "Beliefs", "Visit"];

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#fbf8f3]/90 backdrop-blur-md border-b border-[color:var(--line)] pt-5 pb-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
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
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--brand)] transition-colors duration-300 sm:text-sm">
              Trinity Fellowship
            </p>
            <p className="hidden text-[10px] text-[color:var(--muted)] transition-colors duration-300 sm:block">
              Addis Ababa, Ethiopia
            </p>
          </div>
        </div>

        {/* Desktop Navigation - The "Pill" */}
        <div
          className={`hidden md:flex items-center gap-1 transition-all duration-300 ${
            !scrolled
              ? "bg-[#fbf8f3]/85 backdrop-blur-sm rounded-full px-2 py-1.5 border border-white/60 shadow-sm"
              : "bg-transparent"
          }`}
        >
          {navLinks.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="relative rounded-full px-5 py-2 text-[13px] font-bold uppercase tracking-[0.1em] text-[color:var(--muted)] transition-all duration-300 hover:bg-[color:var(--brand)]/5 hover:text-[color:var(--brand)]"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </header>
  );
}
