"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/app/lib/supabase/browser";
import { Header } from "@/app/components/header";
import { StaggerChildren, StaggerItem } from "@/app/components/animations";

type Member = {
  id: string;
  full_name: string;
  email: string;
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

      // Check if user is an active member
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

      // Fetch all active members (RLS enforces access)
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
        m.full_name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        (m.phone && m.phone.includes(q)),
    );
  }, [members, search]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <Header />

      <main className="mx-auto max-w-7xl px-5 pt-28 pb-16 sm:px-8">
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
            {/* Header row */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
                  Members Only
                </p>
                <h1 className="mt-1 font-serif text-4xl text-[color:var(--foreground)] sm:text-5xl">
                  Church Directory
                </h1>
              </div>
              <button
                onClick={handleSignOut}
                className="self-start rounded-full border border-[color:var(--line)] px-5 py-2.5 text-sm font-semibold text-[color:var(--muted)] transition-all duration-300 hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]"
              >
                Sign Out
              </button>
            </div>

            {/* Search */}
            <div className="mt-8">
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-md rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none transition-colors duration-200 placeholder:text-[color:var(--muted)]/50 focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/20"
              />
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <p className="mt-12 text-center text-[color:var(--muted)]">
                {search.trim()
                  ? "No members match your search."
                  : "No members found."}
              </p>
            ) : (
              <StaggerChildren
                className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                staggerDelay={0.06}
              >
                {filtered.map((member) => (
                  <StaggerItem key={member.id} direction="up">
                    <div className="group rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-6 transition-all duration-300 hover:border-[color:var(--brand-soft)] hover:shadow-lg hover:shadow-[rgba(31,59,83,0.06)]">
                      <p className="text-lg font-semibold text-[color:var(--foreground)] transition-colors duration-300 group-hover:text-[color:var(--brand)]">
                        {member.full_name}
                      </p>

                      <div className="mt-3 space-y-2">
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-2 text-sm text-[color:var(--muted)] transition-colors hover:text-[color:var(--brand)]"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="h-4 w-4 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              width="20"
                              height="16"
                              x="2"
                              y="4"
                              rx="2"
                            />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                          {member.email}
                        </a>

                        {member.phone && (
                          <a
                            href={`tel:${member.phone}`}
                            className="flex items-center gap-2 text-sm text-[color:var(--muted)] transition-colors hover:text-[color:var(--brand)]"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="h-4 w-4 shrink-0"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            {member.phone}
                          </a>
                        )}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}
