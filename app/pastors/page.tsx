"use client";

import Link from "next/link";
import {
  ScrollReveal,
  ScrollProgress,
  TextReveal
} from "../components/animations";
import { Header } from "../components/header";

const pastors = [
  {
    name: "Michael Granger",
    title: "Senior Pastor",
    bio: "Michael has served faithfully in pastoral ministry for over two decades, bringing a deep love for expository preaching and a heart for shepherding God's people. He and his family moved to Addis Ababa to plant and lead Trinity Fellowship.",
    quote: "Preach the word; be ready in season and out of season.",
  },
  {
    name: "Amanuel Yehualashet",
    title: "Pastor",
    bio: "Amanuel is passionate about building up the body of Christ through discipleship and biblical counseling. Born and raised in Ethiopia, he brings a unique perspective to pastoral ministry and a deep commitment to the local church.",
    quote: "Building up the body of Christ in love and truth.",
  },
  {
    name: "Yeabtsega Haile",
    title: "Pastor-in-Training",
    bio: "Yeabtsega is currently training for pastoral ministry through the Pastors College. He has a heart for worship, youth ministry, and seeing the next generation of Ethiopian believers grow in their faith.",
    quote: "Serving the next generation with gladness and joy.",
  },
];

function PastorRow({ pastor, index }: { pastor: any; index: number }) {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`relative flex flex-col gap-12 lg:gap-24 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} mb-32 lg:mb-48`}>
      {/* Background large number for typographic texture */}
      <div className={`absolute top-0 ${isEven ? 'left-0 lg:-left-12' : 'right-0 lg:-right-12'} -translate-y-1/2 text-[12rem] lg:text-[20rem] font-serif font-black text-[color:var(--line)] opacity-20 pointer-events-none z-0 select-none leading-none tracking-tighter`} aria-hidden="true">
        0{index + 1}
      </div>

      {/* Image Side */}
      <div className="w-full lg:w-5/12 relative z-10 shrink-0">
        <ScrollReveal delay={0.1} direction={isEven ? "right" : "left"}>
          <div className="relative">
            {/* Offset decorative border */}
            <div className={`absolute inset-0 border border-[color:var(--line)] ${isEven ? 'translate-x-4 translate-y-4 lg:translate-x-8 lg:translate-y-8' : '-translate-x-4 translate-y-4 lg:-translate-x-8 lg:translate-y-8'} transition-transform duration-700 ease-out`} />
            
            {/* Main image container */}
            <div className={`relative aspect-[3/4] w-full overflow-hidden bg-[color:var(--surface)] border border-[color:var(--line)] group ${isEven ? 'rounded-tr-3xl rounded-bl-3xl' : 'rounded-tl-3xl rounded-br-3xl'}`}>
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.4),rgba(255,255,255,0)_50%,rgba(0,0,0,0.02))] z-10" />
              <div className="absolute inset-0 bg-[#e6ded0] transition-transform duration-1000 group-hover:scale-105" />
              
              {/* Elegant placeholder content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40 mix-blend-multiply text-[color:var(--brand)]">
                 <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-4">
                   <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                   <circle cx="12" cy="7" r="4" />
                 </svg>
                 <span className="font-serif tracking-[0.3em] uppercase text-[0.65rem]">Portrait</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Text Side */}
      <div className="w-full lg:w-7/12 relative z-10 flex flex-col justify-center">
        <ScrollReveal delay={0.2} direction="up">
          <div className={`flex flex-col ${isEven ? 'lg:items-start lg:text-left' : 'lg:items-end lg:text-right'}`}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)] mb-6 block">
              {pastor.title}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl text-[color:var(--foreground)] font-serif leading-tight mb-8">
              {pastor.name}
            </h2>
            
            <div className={`w-12 h-px bg-[color:var(--accent)] mb-8 ${isEven ? '' : 'lg:ml-auto'}`} />
            
            <p className="text-lg leading-relaxed text-[color:var(--muted)] mb-10 max-w-xl">
              {pastor.bio}
            </p>
            
            <blockquote className="relative">
              <span className={`absolute -top-4 -left-6 text-6xl font-serif text-[color:var(--brand-soft)] opacity-20 ${isEven ? '' : 'lg:hidden'}`}>&ldquo;</span>
              <p className={`font-serif text-xl sm:text-2xl text-[color:var(--brand)] italic leading-snug max-w-lg ${isEven ? '' : 'lg:text-right'}`}>
                {pastor.quote}
              </p>
            </blockquote>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

export default function PastorsPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[color:var(--background)] selection:bg-[color:var(--brand-soft)] selection:text-white">
      <ScrollProgress />
      <Header />

      {/* ── page header ──────────────────────── */}
      <section className="relative pt-40 pb-24 sm:pt-48 sm:pb-32 overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[color:var(--surface-strong)] rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            <ScrollReveal>
              <Link
                href="/#about"
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
              href="/#visit"
              className="inline-flex items-center justify-center px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase bg-[color:var(--brand)] text-white hover:bg-[color:var(--accent)] transition-colors duration-300 rounded-sm"
            >
              Plan a Visit
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── footer ───────────────────────────── */}
      <footer className="border-t border-[color:var(--line)] bg-[color:var(--background)]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-sm font-serif italic text-[color:var(--muted)]">
              &copy; {currentYear} Trinity Fellowship Addis Ababa
            </p>
            <Link
              href="/"
              className="text-xs font-bold uppercase tracking-widest text-[color:var(--brand-soft)] transition-colors hover:text-[color:var(--accent)]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
