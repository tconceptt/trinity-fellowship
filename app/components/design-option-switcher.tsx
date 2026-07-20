"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Temporary floating pill shown on the homepage redesign candidates
 * (/home-v1..v5) so the options can be flipped through quickly while
 * a direction is being chosen.
 */
const options = [
  { href: "/home-v1", num: "1", name: "Warm Classic" },
  { href: "/home-v2", num: "2", name: "Editorial" },
  { href: "/home-v3", num: "3", name: "Evening Glow" },
  { href: "/home-v4", num: "4", name: "Morning Light" },
  { href: "/home-v5", num: "5", name: "Refuge" },
];

export function DesignOptionSwitcher() {
  const pathname = usePathname();
  const active = options.find((o) => o.href === pathname);

  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#12202c]/90 py-2 pl-5 pr-2 shadow-[0_18px_40px_-18px_rgba(10,20,30,0.8)] backdrop-blur-md">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#e8e0d0]/70">
          {active ? active.name : "Homepage options"}
        </p>
        <div className="flex items-center gap-1">
          {options.map((option) => {
            const isActive = pathname === option.href;
            return (
              <Link
                key={option.href}
                href={option.href}
                aria-label={`Homepage option ${option.num}: ${option.name}`}
                aria-current={isActive ? "page" : undefined}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-[#d9a441] text-[#12202c]"
                    : "text-[#e8e0d0]/60 hover:bg-white/10 hover:text-[#e8e0d0]"
                }`}
              >
                {option.num}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
