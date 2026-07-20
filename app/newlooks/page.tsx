import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "New Looks · Trinity Fellowship",
  description: "Preview the homepage redesign candidates for Trinity Fellowship.",
  robots: { index: false, follow: false },
};

const options = [
  {
    href: "/home-v1",
    num: "1",
    name: "Warm Classic",
    blurb: "Heirloom Garamond display paired with a humanist grotesk body — timeless and warm.",
  },
  {
    href: "/home-v2",
    num: "2",
    name: "Editorial",
    blurb: "Magazine-inspired layout with confident typography and generous whitespace.",
  },
  {
    href: "/home-v3",
    num: "3",
    name: "Evening Glow",
    blurb: "Deep, moody tones with golden accents for a reverent, evening feel.",
  },
  {
    href: "/home-v4",
    num: "4",
    name: "Morning Light",
    blurb: "Bright, airy, and hopeful — light-forward with soft, welcoming contrast.",
  },
  {
    href: "/home-v5",
    num: "5",
    name: "Refuge",
    blurb: "Calm and grounded, a sanctuary aesthetic that invites you to rest.",
  },
];

export default function NewLooksPage() {
  return (
    <main className="min-h-screen bg-[#0f1a24] text-[#e8e0d0]">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <header className="mb-14 text-center">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d9a441]">
            Homepage Redesign
          </p>
          <h1 className="font-serif text-4xl leading-tight sm:text-6xl">
            New Looks
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#e8e0d0]/70 sm:text-lg">
            Five directions for the new Trinity Fellowship homepage. Open any
            option below, then use the floating switcher at the bottom of each
            page to flip between them.
          </p>
        </header>

        <ul className="grid gap-5 sm:grid-cols-2">
          {options.map((option) => (
            <li key={option.href}>
              <Link
                href={option.href}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#12202c]/80 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#d9a441]/50 hover:bg-[#12202c]"
              >
                <div className="mb-5 flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d9a441] text-lg font-bold text-[#12202c]">
                    {option.num}
                  </span>
                  <h2 className="font-serif text-2xl">{option.name}</h2>
                </div>
                <p className="text-sm leading-relaxed text-[#e8e0d0]/70">
                  {option.blurb}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#d9a441] transition-transform group-hover:translate-x-1">
                  View option
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
