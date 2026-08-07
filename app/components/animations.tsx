"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

/* ──────────────────────────────────────────────
   StickyImageSection – image stays pinned while
   overlay text scrolls away, then image scrolls
   out naturally
   ────────────────────────────────────────────── */
export function StickyImageSection({
  children,
  overlay,
  className = "",
  scrollLength = 1.35,
}: {
  children: ReactNode;
  overlay: ReactNode;
  className?: string;
  scrollLength?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textY = useTransform(scrollYProgress, [0, 0.85], ["0%", "-50%"]);
  const smoothTextY = useSpring(textY, { stiffness: 60, damping: 40, restDelta: 0.001 });
  const textOpacity = useTransform(scrollYProgress, [0, 0.35, 0.8], [1, 1, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 0.85], [1, 1.12]);

  return (
    <div ref={containerRef} style={{ height: `${scrollLength * 100}vh` }}>
      <div className={`sticky top-0 h-screen overflow-hidden ${className}`}>
        {/* background image layer */}
        <motion.div style={{ scale: imgScale }} className="absolute inset-0">
          {children}
        </motion.div>

        {/* text overlay */}
        <motion.div
          style={{ y: smoothTextY, opacity: textOpacity }}
          className="relative z-10 flex h-full items-center"
        >
          {overlay}
        </motion.div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   ScrollProgress – thin top bar showing
   overall page scroll progress
   ────────────────────────────────────────────── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-[color:var(--accent)]"
      style={{ scaleX }}
    />
  );
}

/* ──────────────────────────────────────────────
   CountUp – animates a number on scroll
   ────────────────────────────────────────────── */
