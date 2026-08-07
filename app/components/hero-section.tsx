import Image from "next/image";
import Link from "next/link";

/**
 * Homepage hero — a full-bleed photograph darkened by a single directional
 * wash so the type sits in the shadowed lower half of the frame. The gradient
 * is the light in the room, not a decorative halo laid over it.
 */
export function HeroSection() {
  return (
    <section className="band-deep relative flex min-h-[92svh] items-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-image.jpg"
          alt="Worship gathering at Trinity Fellowship"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Directional wash: light stays in the upper frame, type sits in shadow. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,30,43,0.30) 0%, rgba(15,30,43,0.62) 46%, rgba(15,30,43,0.94) 100%)",
        }}
      />

      <div className="hero-intro relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8 sm:pb-24">
          <h1 className="max-w-[54ch] text-[clamp(2.25rem,4.4vw,3.5rem)] leading-[1.12]">
            A Gospel-Centered Community That Exists To Know God And Make Him Known.
          </h1>

          <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-[color:var(--cream-faded)]">
            Worship God. Grow In Grace. Bear Witness To Christ.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/visit"
              className="inline-flex items-center justify-center rounded-lg bg-[color:var(--gold)] px-7 py-3.5 text-sm font-semibold text-[color:var(--deep)] transition-colors duration-200 hover:bg-[color:var(--gold-bright)]"
            >
              Join Us Sunday
            </Link>
            <Link
              href="/visit/what-to-expect"
              className="inline-flex items-center justify-center rounded-lg border border-[color:var(--cream-line-strong)] px-7 py-3.5 text-sm font-semibold text-[color:var(--cream)] transition-colors duration-200 hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
            >
              What to Expect
            </Link>
          </div>

          <p className="mt-10 border-t border-[color:var(--cream-line)] pt-5 text-sm text-[color:var(--cream-faded)]">
            Sundays 10:00 AM
            <span aria-hidden className="px-2 text-[color:var(--gold)]">
              /
            </span>
            EGST Building, 5th Floor, Sarbet
          </p>
      </div>
    </section>
  );
}
