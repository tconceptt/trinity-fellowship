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
  { label: "Give", href: "/give" },
  { label: "Members", href: "/members" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="band-deep border-t border-[color:var(--cream-line)]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
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
                <p className="font-serif text-lg text-[color:var(--cream)]">
                  Trinity Fellowship Addis Ababa
                </p>
                <p className="text-sm text-[color:var(--cream-faded)]">
                  Part of Sovereign Grace Churches
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[color:var(--cream-faded)]">
              Worship with us in Sarbet on Sundays, or visit our church office during the week at
              Karama Building.
            </p>
          </div>

          <div>
            <p className="font-serif text-sm text-[color:var(--gold)]">
              Quick Links
            </p>
            <nav className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-[color:var(--cream-faded)]">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-[color:var(--gold)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-[color:var(--cream-line)] pt-5">
          <p className="text-xs text-[color:var(--cream-faded)]">
            © {currentYear} Trinity Fellowship Addis Ababa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
