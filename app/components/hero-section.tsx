"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#f5f0e8] lg:flex-row">
      {/* ── Content (Left/Top on mobile) ── */}
      <div className="relative z-10 flex flex-1 flex-col justify-end px-6 pt-24 pb-12 sm:px-12 lg:w-[50%] lg:justify-center lg:px-16 lg:py-0 xl:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl lg:max-w-2xl"
        >
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-[#1f3b53]">
            A Gospel-Centered Community That Exists To Know God And Make Him Known.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-[#586574]">
            Worship God. Grow In Grace. Bear Witness To Christ.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/visit"
              className="inline-flex items-center justify-center rounded-full bg-[#1f3b53] px-8 py-4 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105 hover:shadow-lg"
            >
              Join Us Sunday
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── Mobile Image (Bottom) ── */}
      <div className="relative h-[45svh] w-full shrink-0 lg:hidden">
        <Image
          src="/images/hero-image.jpg"
          alt="Worship gathering at Trinity Fellowship"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />

        {/* Mobile Top Curve Mask */}
        <div className="absolute top-0 left-0 right-0 h-16 w-full -translate-y-[1px] overflow-hidden leading-[0]">
          <svg
            className="h-full w-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,120 C150,30 400,20 600,60 C800,100 1050,100 1200,60 V0 H0 V120Z"
              fill="#f5f0e8"
            />
          </svg>
        </div>
      </div>

      {/* ── Desktop Image (Right) ── */}
      <div className="relative hidden h-auto w-[50%] lg:block">
        <div className="absolute inset-0 h-full w-full">
          <Image
            src="/images/hero-image.jpg"
            alt="Worship gathering at Trinity Fellowship"
            fill
            className="object-cover object-center"
            priority
            sizes="50vw"
          />
        </div>

        {/* Desktop Left Wave Mask */}
        <div className="absolute inset-y-0 left-0 h-full w-32 -translate-x-[1px] overflow-hidden leading-[0]">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 H40 C90,30 20,70 60,100 H0 Z"
              fill="#f5f0e8"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
