import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="band-deep flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Image
        src="/Logos/trinity-logo.svg"
        alt="Trinity Fellowship"
        width={48}
        height={64}
        className="mb-8 opacity-70"
      />
      <h1 className="text-4xl sm:text-5xl">Page Not Found</h1>
      <p className="mt-4 max-w-[54ch] text-lg leading-relaxed text-[color:var(--cream-faded)]">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn btn-gold mt-10">
        Back to Home
      </Link>
    </div>
  );
}
