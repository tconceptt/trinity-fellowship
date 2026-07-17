import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Pastors", href: "/pastors" },
  { label: "Beliefs", href: "/beliefs" },
  { label: "Membership", href: "/membership" },
  { label: "Children", href: "/children" },
  { label: "College", href: "/college" },
  { label: "Visit", href: "/visit" },
  { label: "Members", href: "/members" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0))]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:gap-12">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/Logos/trinity-logo.svg"
                alt="Trinity Fellowship"
                width={30}
                height={40}
              />
              <div>
                <p className="text-lg font-semibold text-[color:var(--brand)]">
                  Trinity Fellowship Addis Ababa
                </p>
                <p className="text-xs uppercase tracking-[0.12em] text-[color:var(--brand-soft)]">
                  Part of Sovereign Grace Churches
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[color:var(--muted)]">
              Worship with us in Sarbet on Sundays, or visit our church office during the week at
              Karama Building.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--brand-soft)]">
              Quick Links
            </p>
            <nav className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-[color:var(--muted)]">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-[color:var(--brand)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-[color:var(--line)] pt-5">
          <p className="text-xs text-[color:var(--muted)]">
            © {currentYear} Trinity Fellowship Addis Ababa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
