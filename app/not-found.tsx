import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5f0e8] px-6 text-center">
      <Image
        src="/Logos/trinity-logo.svg"
        alt="Trinity Fellowship"
        width={48}
        height={64}
        className="mb-8 opacity-60"
      />
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b6f4e]">
        404
      </p>
      <h1 className="mt-3 font-serif text-4xl text-[#1f3b53] sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-[#586574]">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center justify-center rounded-full bg-[#1f3b53] px-8 py-4 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105 hover:shadow-lg"
      >
        Back to Home
      </Link>
    </div>
  );
}
