import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/app/components/page-hero";
import { NextStepCTA } from "@/app/components/next-step-cta";

export const metadata: Metadata = {
  title: "Pastors College",
  description:
    "Trinity Fellowship Pastors College equips the next generation of African pastors for gospel-centered ministry within the context of the local church.",
  alternates: { canonical: "/college" },
};

export default function CollegePage() {
  return (
    <div className="min-h-screen">
      <PageHero
        title="Pastors College"
        lede="Equipping the next generation of African pastors for gospel-centered ministry within the context of the local church."
      />

      <section className="mx-auto max-w-4xl px-5 pt-20 pb-20 sm:px-8 sm:pt-24 sm:pb-28">
        <figure>
          <div className="overflow-hidden rounded-2xl bg-[color:var(--surface-strong)]">
            <Image
              src="/images/pc-class-of26.jpg"
              alt="Pastors College Class of 2026"
              width={800}
              height={500}
              sizes="(max-width: 896px) 100vw, 896px"
              className="h-auto w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 text-sm text-[color:var(--muted)]">
            The Pastors College class of 2026.
          </figcaption>
        </figure>

        <a
          href="https://tfpastorscollege.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-brand mt-10"
        >
          Visit College Website
        </a>
      </section>

      <NextStepCTA
        title="Learn More About Trinity Fellowship"
        description="Meet the pastors who lead our church, or plan a visit to see us in person."
        links={[
          { label: "Meet Our Pastors", href: "/pastors" },
          { label: "Plan a Visit", href: "/visit", variant: "outline" },
        ]}
      />
    </div>
  );
}
