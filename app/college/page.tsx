import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/app/components/page-hero";
import { NextStepCTA } from "@/app/components/next-step-cta";
import { ScrollReveal } from "@/app/components/animations";

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
        eyebrow="Training"
        title="Pastors College"
        lede="Equipping the next generation of African pastors for gospel-centered ministry within the context of the local church."
        className="text-center [&>*]:mx-auto"
      />

      <section className="mx-auto max-w-3xl px-5 pb-20 text-center sm:px-8 sm:pb-28">
        <ScrollReveal>
          <div className="overflow-hidden rounded-2xl">
            <Image
              src="/images/pc-class-of26.jpg"
              alt="Pastors College Class of 2026"
              width={800}
              height={500}
              sizes="(max-width: 768px) 100vw, 768px"
              className="w-full object-cover"
            />
          </div>
          <div className="mt-10">
            <a
              href="https://tfpastorscollege.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--brand)] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[color:var(--brand-soft)] hover:shadow-lg"
            >
              Visit College Website
            </a>
          </div>
        </ScrollReveal>
      </section>

      <NextStepCTA
        eyebrow="Next Steps"
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
