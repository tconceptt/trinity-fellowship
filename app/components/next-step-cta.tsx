import Link from "next/link";

type CTALink = {
  label: string;
  href: string;
  variant?: "solid" | "outline";
  external?: boolean;
};

/**
 * A short closing call-to-action used at the bottom of each short-form page,
 * pointing the visitor to the next logical page.
 */
export function NextStepCTA({
  eyebrow,
  title,
  description,
  links,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  links: CTALink[];
}) {
  return (
    <section className="border-t border-[color:var(--line)] bg-[color:var(--surface)]">
      <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-3xl text-[color:var(--foreground)] sm:text-4xl">{title}</h2>
        {description && (
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-[color:var(--muted)]">
            {description}
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {links.map((link) =>
            link.variant === "outline" ? (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-8 py-4 text-sm font-semibold text-[color:var(--brand)] transition-all duration-300 hover:border-[color:var(--brand)] hover:shadow-md"
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center rounded-full bg-[color:var(--brand)] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[color:var(--brand-soft)] hover:shadow-lg"
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}
