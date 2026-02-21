"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/app/lib/supabase/browser";
import { getInitials, getAccent } from "@/app/lib/avatar-utils";
import { Header } from "@/app/components/header";

type Member = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
};

export default function MembersPage() {
  const router = useRouter();
  const supabase = createClient();

  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<
    "loading" | "not-member" | "error" | "success"
  >("loading");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.email) {
        router.replace("/members/login");
        return;
      }

      setUserEmail(user.email);

      const { data: memberCheck } = await supabase
        .from("members")
        .select("id")
        .eq("email", user.email)
        .eq("is_active", true)
        .single();

      if (!memberCheck) {
        setStatus("not-member");
        return;
      }

      const { data, error } = await supabase
        .from("members")
        .select("id, full_name, email, phone")
        .eq("is_active", true)
        .order("full_name");

      if (error) {
        setStatus("error");
        return;
      }

      setMembers(data ?? []);
      setStatus("success");
    }

    load();
  }, [supabase, router]);

  const filtered = useMemo(() => {
    if (!search.trim()) return members;
    const q = search.toLowerCase();
    return members.filter(
      (m) =>
        m.full_name?.toLowerCase().includes(q) ||
        (m.email && m.email.toLowerCase().includes(q)) ||
        (m.phone && m.phone.includes(q)),
    );
  }, [members, search]);

  // Group by first letter of first name
  const grouped = useMemo(() => {
    const groups: Record<string, Member[]> = {};
    for (const m of filtered) {
      const letter = m.full_name.trim()[0]?.toUpperCase() || "#";
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(m);
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <Header />

      <main className="mx-auto max-w-5xl px-5 pt-28 pb-16 sm:px-8">
        {/* Loading */}
        {status === "loading" && (
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[color:var(--line)] border-t-[color:var(--brand)]" />
              <p className="mt-4 text-sm text-[color:var(--muted)]">
                Loading directory...
              </p>
            </div>
          </div>
        )}

        {/* Not a member */}
        {status === "not-member" && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-[50vh] items-center justify-center"
          >
            <div className="max-w-md text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--brand)]/10">
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8"
                  fill="none"
                  stroke="var(--brand)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m4.93 4.93 14.14 14.14" />
                </svg>
              </div>
              <h1 className="mt-6 font-serif text-3xl text-[color:var(--foreground)]">
                Not a Registered Member
              </h1>
              <p className="mt-3 text-[color:var(--muted)]">
                The email <strong>{userEmail}</strong> is not associated with an
                active membership. If you believe this is an error, please
                contact the church office.
              </p>
              <button
                onClick={handleSignOut}
                className="mt-8 rounded-full border border-[color:var(--line)] px-6 py-3 text-sm font-semibold text-[color:var(--brand)] transition-all duration-300 hover:border-[color:var(--brand)] hover:shadow-md"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        )}

        {/* Error */}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-[50vh] items-center justify-center"
          >
            <div className="max-w-md text-center">
              <p className="text-lg font-semibold text-[color:var(--foreground)]">
                Something went wrong
              </p>
              <p className="mt-2 text-sm text-[color:var(--muted)]">
                We couldn&apos;t load the member directory. Please try again.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-6 rounded-full bg-[color:var(--brand)] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[color:var(--brand-soft)] hover:shadow-md"
              >
                Retry
              </button>
            </div>
          </motion.div>
        )}

        {/* Success – directory */}
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
                  Members Only
                </p>
                <h1 className="mt-1 font-serif text-4xl text-[color:var(--foreground)] sm:text-5xl">
                  Church Directory
                </h1>
                <p className="mt-2 text-sm text-[color:var(--muted)]">
                  {members.length} members
                </p>
              </div>
              <button
                onClick={handleSignOut}
                className="self-start rounded-full border border-[color:var(--line)] px-5 py-2.5 text-sm font-semibold text-[color:var(--muted)] transition-all duration-300 hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]"
              >
                Sign Out
              </button>
            </div>

            {/* Search */}
            <div className="relative mt-8">
              <svg
                viewBox="0 0 24 24"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--muted)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] py-3 pl-11 pr-4 text-sm text-[color:var(--foreground)] outline-none transition-colors duration-200 placeholder:text-[color:var(--muted)]/50 focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/20"
              />
            </div>

            {/* Letter jump nav */}
            {!search.trim() && (
              <div className="mt-6 flex flex-wrap gap-1">
                {grouped.map(([letter]) => (
                  <button
                    key={letter}
                    onClick={() =>
                      document
                        .getElementById(`letter-${letter}`)
                        ?.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-full font-serif text-sm font-semibold text-[color:var(--muted)] transition-all duration-200 hover:bg-[color:var(--brand)]/10 hover:text-[color:var(--brand)]"
                  >
                    {letter}
                  </button>
                ))}
              </div>
            )}

            {/* Directory */}
            {filtered.length === 0 ? (
              <p className="mt-12 text-center text-[color:var(--muted)]">
                {search.trim()
                  ? "No members match your search."
                  : "No members found."}
              </p>
            ) : (
              <div className="mt-8 space-y-10">
                {grouped.map(([letter, groupMembers]) => (
                  <section key={letter} id={`letter-${letter}`} className="scroll-mt-28">
                    {/* Letter anchor */}
                    <div className="sticky top-24 z-10 -mx-2 mb-1 flex items-center gap-3 bg-[color:var(--background)]/95 px-2 py-2 backdrop-blur-sm">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--brand)] font-serif text-base font-bold text-white">
                        {letter}
                      </span>
                      <div className="h-px flex-1 bg-[color:var(--line)]" />
                      <span className="text-xs tabular-nums text-[color:var(--muted)]">
                        {groupMembers.length}
                      </span>
                    </div>

                    {/* Members */}
                    <div className="grid gap-2 sm:grid-cols-2">
                      {groupMembers.map((member) => {
                        const [bg, fg] = getAccent(member.full_name);
                        return (
                          <div
                            key={member.id}
                            className="group flex items-center gap-3.5 rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-[color:var(--surface)]"
                          >
                            {/* Avatar */}
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-serif text-sm font-bold ${bg} ${fg}`}
                            >
                              {getInitials(member.full_name)}
                            </div>

                            {/* Info */}
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[15px] font-semibold text-[color:var(--foreground)] transition-colors duration-200 group-hover:text-[color:var(--brand)]">
                                {member.full_name}
                              </p>
                              {/* Mobile: tappable contact links */}
                              <div className="mt-0.5 flex items-center gap-3 sm:hidden">
                                {member.email && (
                                  <a
                                    href={`mailto:${member.email}`}
                                    className="inline-flex items-center gap-1 text-xs text-[color:var(--muted)] active:text-[color:var(--brand)]"
                                  >
                                    <svg
                                      viewBox="0 0 24 24"
                                      className="h-3 w-3 shrink-0"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <rect width="20" height="16" x="2" y="4" rx="2" />
                                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                    <span className="truncate">{member.email}</span>
                                  </a>
                                )}
                                {member.phone && (
                                  <a
                                    href={`tel:${member.phone}`}
                                    className="inline-flex items-center gap-1 text-xs text-[color:var(--muted)] active:text-[color:var(--brand)]"
                                  >
                                    <svg
                                      viewBox="0 0 24 24"
                                      className="h-3 w-3 shrink-0"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    {member.phone}
                                  </a>
                                )}
                              </div>
                              {/* Desktop: static email text */}
                              {member.email && (
                                <p className="hidden truncate text-xs text-[color:var(--muted)] sm:block">
                                  {member.email}
                                </p>
                              )}
                            </div>

                            {/* Desktop: hover-reveal action icons */}
                            <div className="hidden shrink-0 items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:flex">
                              {member.email && (
                                <a
                                  href={`mailto:${member.email}`}
                                  className="flex h-8 w-8 items-center justify-center rounded-full text-[color:var(--muted)] transition-colors duration-200 hover:bg-[color:var(--brand)]/10 hover:text-[color:var(--brand)]"
                                  title={`Email ${member.full_name}`}
                                >
                                  <svg
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <rect width="20" height="16" x="2" y="4" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                  </svg>
                                </a>
                              )}
                              {member.phone && (
                                <a
                                  href={`tel:${member.phone}`}
                                  className="flex h-8 w-8 items-center justify-center rounded-full text-[color:var(--muted)] transition-colors duration-200 hover:bg-[color:var(--brand)]/10 hover:text-[color:var(--brand)]"
                                  title={`Call ${member.full_name}`}
                                >
                                  <svg
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                  </svg>
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}
