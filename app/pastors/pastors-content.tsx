"use client";

import Link from "next/link";
import Image from "next/image";
import { ScrollReveal, TextReveal } from "@/app/components/animations";

const pastors = [
  {
    name: "Michael Granger",
    title: "Senior Pastor",
    image: "/images/michael.jpeg",
    bio: [
      "Michael has served faithfully in pastoral ministry for over two decades, bringing a deep love for expository preaching and a heart for shepherding God's people.",
      "He and his family moved to Addis Ababa to plant and lead Trinity Fellowship, where he continues to labor in the ministry of the Word.",
    ],
  },
  {
    name: "Amanuel Yehualashet",
    title: "Executive Pastor",
    image: "/images/amanuel.jpeg",
    bio: [
      "Amanuel has worked with Ethiopian Airlines for nearly five years and graduated from Trinity Fellowship Pastors College in 2022. He now serves as the full-time Executive Pastor of Trinity Fellowship Addis Ababa Church.",
      "Alongside preaching and teaching, he oversees many of the church's daily ministries and operations, and serves as the Director of Student Care at Trinity Fellowship Pastors College. Amanuel married his wife, Hallelujah, in 2023.",
    ],
  },
  {
    name: "Yeabtsega Haile",
    title: "Bi-vocational Pastor",
    image: "/images/Yeabtsega.jpeg",
    bio: [
      "Yeabtsega is married to Kimia and has a son, Yohanan. He studied for his bachelor's degree in Mechanical Engineering, and earned his PGiD and MA from Trinity Fellowship Pastors College. He is now pursuing an MTh at Union School of Theology.",
      "He serves as an Assistant Dean at the Pastors College, overseeing daily operations and teaching, and also serves as a bi-vocational pastor at Trinity Fellowship Church.",
    ],
  },
];

type Pastor = (typeof pastors)[number];

function PastorRow({ pastor, index }: { pastor: Pastor; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex flex-col gap-10 sm:gap-12 lg:gap-24 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} mb-24 sm:mb-32 lg:mb-48`}>
      {/* Background large number for typographic texture */}
      <div className={`absolute top-0 ${isEven ? 'left-0 lg:-left-12' : 'right-0 lg:-right-12'} -translate-y-1/3 sm:-translate-y-1/2 text-[8rem] sm:text-[12rem] lg:text-[20rem] font-serif font-black text-[color:var(--line)] opacity-20 pointer-events-none z-0 select-none leading-none tracking-tighter`} aria-hidden="true">
        0{index + 1}
      </div>

      {/* Image Side */}
      <div className="w-full max-w-sm lg:max-w-none lg:w-5/12 relative z-10 shrink-0">
        <ScrollReveal delay={0.1} direction={isEven ? "right" : "left"}>
          <div className="relative">
            {/* Offset decorative border */}
            <div className={`absolute inset-0 border border-[color:var(--line)] ${isEven ? 'translate-x-3 translate-y-3 lg:translate-x-8 lg:translate-y-8' : '-translate-x-3 translate-y-3 lg:-translate-x-8 lg:translate-y-8'} transition-transform duration-700 ease-out ${isEven ? 'rounded-tr-3xl rounded-bl-3xl' : 'rounded-tl-3xl rounded-br-3xl'}`} />

            {/* Main image container */}
            <div className={`relative aspect-[4/5] w-full overflow-hidden bg-[color:var(--surface)] border border-[color:var(--line)] group ${isEven ? 'rounded-tr-3xl rounded-bl-3xl' : 'rounded-tl-3xl rounded-br-3xl'}`}>
              <Image
                src={pastor.image}
                alt={`Portrait of ${pastor.name}`}
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.15),rgba(0,0,0,0)_40%,rgba(0,0,0,0.15))] z-10 pointer-events-none" />
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Text Side */}
      <div className="w-full lg:w-7/12 relative z-10 flex flex-col justify-center">
        <ScrollReveal delay={0.2} direction="up">
          <div className={`flex flex-col items-start text-left ${isEven ? '' : 'lg:items-end lg:text-right'}`}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)] mb-4 sm:mb-6 block">
              {pastor.title}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl text-[color:var(--foreground)] font-serif leading-tight mb-6 sm:mb-8">
              {pastor.name}
            </h2>

            <div className={`w-12 h-px bg-[color:var(--accent)] mb-6 sm:mb-8 ${isEven ? '' : 'lg:ml-auto'}`} />

            <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10 max-w-xl">
              {pastor.bio.map((paragraph, i) => (
                <p key={i} className="text-base sm:text-lg leading-relaxed text-[color:var(--muted)]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

export function PastorsContent() {
  return (
    <>
      {/* ── page header ──────────────────────── */}
      <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[color:var(--surface-strong)] rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            <ScrollReveal>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[color:var(--brand-soft)] transition-colors hover:text-[color:var(--accent)] mb-8"
              >
                <svg
                  className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to About
              </Link>
            </ScrollReveal>

            <TextReveal delay={0.1}>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl text-[color:var(--foreground)] font-serif tracking-tight leading-none mb-6">
                Our <span className="italic text-[color:var(--brand-soft)]">Pastors</span>
              </h1>
            </TextReveal>

            <ScrollReveal delay={0.2}>
              <div className="w-px h-16 bg-[color:var(--line)] mx-auto mb-8" />
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="max-w-2xl text-xl sm:text-2xl font-serif italic leading-relaxed text-[color:var(--muted)]">
                Called to shepherd, teach, and care for the flock of God at
                Trinity Fellowship Addis Ababa.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── pastors list ─────────────────────── */}
      <section className="relative w-full overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pb-10 lg:pb-16">
          <div className="flex flex-col w-full">
            {pastors.map((pastor, index) => (
              <PastorRow key={pastor.name} pastor={pastor} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── bottom call to action ────────────── */}
      <section className="border-t border-[color:var(--line)] bg-[color:var(--surface)]">
        <div className="mx-auto max-w-4xl px-5 py-24 sm:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-serif text-[color:var(--foreground)] mb-6">
              Join Us This Sunday
            </h2>
            <p className="text-[color:var(--muted)] mb-10 max-w-xl mx-auto text-lg leading-relaxed">
              We would love to welcome you to our gathering and get to know you personally.
            </p>
            <Link
              href="/visit"
              className="inline-flex items-center justify-center px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase bg-[color:var(--brand)] text-white hover:bg-[color:var(--accent)] transition-colors duration-300 rounded-sm"
            >
              Plan a Visit
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
