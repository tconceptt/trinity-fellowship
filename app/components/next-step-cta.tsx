import Link from "next/link";

type CTALink = {
  label: string;
  href: string;
  variant?: "solid" | "outline";
  external?: boolean;
};

/**
 * The closing call-to-action at the bottom of each short-form page, pointing
 * the visitor to the next logical page. Sits on the deep band so every page
 * closes the way the homepage does and hands off cleanly to the footer.
 */
export function NextStepCTA({
  title,
  description,
  links,
}: {
  title: string;
  description?: string;
  links: CTALink[];
}) {
  return (
    <section className="band-deep border-t border-[color:var(--cream-line)]">
      <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-24">
        <h2 className="text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.15]">{title}</h2>
        {description && (
          <p className="mx-auto mt-5 max-w-[54ch] text-lg leading-relaxed text-[color:var(--cream-faded)]">
            {description}
          </p>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {links.map((link) =>
            link.variant === "outline" ? (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center rounded-lg border border-[color:var(--cream-line-strong)] px-7 py-3.5 text-sm font-semibold text-[color:var(--cream)] transition-colors duration-200 hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center rounded-lg bg-[color:var(--gold)] px-7 py-3.5 text-sm font-semibold text-[color:var(--deep)] transition-colors duration-200 hover:bg-[color:var(--gold-bright)]"
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
