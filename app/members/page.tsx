"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { PageHero } from "@/app/components/page-hero";
import { createClient } from "@/app/lib/supabase/browser";
import { getInitials, getAccent } from "@/app/lib/avatar-utils";
import { BackToHub, LoadFailed, MembersLoading, NotAMember } from "./members-states";

type Member = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
};

const TITLE = "Church Directory";

export default function MembersPage() {
  const router = useRouter();
  const supabase = createClient();

  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"loading" | "not-member" | "error" | "success">("loading");
  const [userEmail, setUserEmail] = useState("");
  const [userFirstName, setUserFirstName] = useState<string | null>(null);

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
        .select("id, full_name")
        .eq("email", user.email)
        .eq("is_active", true)
        .single();

      if (!memberCheck) {
        setStatus("not-member");
        return;
      }

      setUserFirstName(memberCheck.full_name?.split(" ")[0] ?? null);

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

  // Group by first letter of first name.
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

  if (status === "loading") {
    return <MembersLoading title={TITLE} label="Loading the directory…" />;
  }

  if (status === "not-member") {
    return <NotAMember email={userEmail} onSignOut={handleSignOut} />;
  }

  if (status === "error") {
    return (
      <LoadFailed
        title={TITLE}
        message="We could not load the member directory just now. This is usually temporary."
      />
    );
  }

  return (
    <div className="min-h-screen">
      <PageHero
        compact
        title={TITLE}
        lede={
          userFirstName
            ? `Welcome, ${userFirstName}. ${members.length} people belong to this fellowship.`
            : `${members.length} people belong to this fellowship.`
        }
      />

      <section className="mx-auto max-w-5xl px-5 pt-10 pb-16 sm:px-8 sm:pt-12">
        <div className="flex items-center justify-between gap-4">
          <BackToHub />
          <button
            onClick={handleSignOut}
            className="text-sm font-semibold text-[color:var(--muted)] transition-colors duration-200 hover:text-[color:var(--accent)]"
          >
            Sign Out
          </button>
        </div>

        {/* ── search ────────────────────────── */}
        <div className="relative mt-7">
          <svg
            aria-hidden
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
            type="search"
            aria-label="Search members by name, email, or phone"
            placeholder="Search by name, email, or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] py-3 pl-11 pr-4 text-sm text-[color:var(--foreground)] outline-none transition-colors duration-200 placeholder:text-[color:var(--muted)] focus:border-[color:var(--accent)]"
          />
        </div>

        {/* ── letter jump ───────────────────── */}
        {!search.trim() && (
          <nav aria-label="Jump to letter" className="mt-5 flex flex-wrap gap-1">
            {grouped.map(([letter]) => (
              <button
                key={letter}
                onClick={() =>
                  document
                    .getElementById(`letter-${letter}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="flex h-8 w-8 items-center justify-center rounded-md font-serif text-sm text-[color:var(--muted)] transition-colors duration-200 hover:bg-[color:var(--surface-strong)] hover:text-[color:var(--accent)]"
              >
                {letter}
              </button>
            ))}
          </nav>
        )}

        {/* ── directory ─────────────────────── */}
        {filtered.length === 0 ? (
          <p className="mt-12 text-[color:var(--muted)]">
            {search.trim() ? "No members match your search." : "No members found."}
          </p>
        ) : (
          <div className="mt-8 space-y-10">
            {grouped.map(([letter, groupMembers]) => (
              <section key={letter} id={`letter-${letter}`} className="scroll-mt-24">
                {/* The sticky rail needs an opaque background or rows show
                    through it as they scroll under. */}
                <div className="sticky top-16 z-10 flex items-baseline gap-4 bg-[color:var(--background)] py-2">
                  <span className="font-serif text-2xl leading-none text-[color:var(--accent)]">
                    {letter}
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-[color:var(--line)]" />
                  <span className="text-xs tabular-nums text-[color:var(--muted)]">
                    {groupMembers.length}
                  </span>
                </div>

                <ul className="mt-1 grid sm:grid-cols-2 sm:gap-x-10">
                  {groupMembers.map((member) => {
                    const [bg, fg] = getAccent(member.full_name);
                    return (
                      <li
                        key={member.id}
                        className="group flex items-center gap-3.5 border-b border-[color:var(--line)] py-3.5"
                      >
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-serif text-sm font-bold ${bg} ${fg}`}
                        >
                          {getInitials(member.full_name)}
                        </span>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[15px] font-semibold text-[color:var(--foreground)]">
                            {member.full_name}
                          </p>
                          {member.email && (
                            <p className="hidden truncate text-xs text-[color:var(--muted)] sm:block">
                              {member.email}
                            </p>
                          )}
                          {/* Mobile has no hover, so contact links are inline. */}
                          <div className="mt-0.5 flex items-center gap-3 sm:hidden">
                            {member.email && (
                              <a
                                href={`mailto:${member.email}`}
                                className="inline-flex min-w-0 items-center gap-1 text-xs text-[color:var(--muted)] active:text-[color:var(--accent)]"
                              >
                                <MailIcon className="h-3 w-3 shrink-0" />
                                <span className="truncate">{member.email}</span>
                              </a>
                            )}
                            {member.phone && (
                              <a
                                href={`tel:${member.phone}`}
                                className="inline-flex shrink-0 items-center gap-1 text-xs text-[color:var(--muted)] active:text-[color:var(--accent)]"
                              >
                                <PhoneIcon className="h-3 w-3 shrink-0" />
                                {member.phone}
                              </a>
                            )}
                          </div>
                        </div>

                        {/*
                          These used to be opacity-0 until row hover. Kept
                          visible instead: a control you cannot see is a control
                          most people never find, and hover hides it from
                          keyboard users entirely.
                        */}
                        <div className="hidden shrink-0 items-center gap-1 sm:flex">
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              aria-label={`Email ${member.full_name}`}
                              className="flex h-8 w-8 items-center justify-center rounded-md text-[color:var(--muted)] transition-colors duration-200 hover:text-[color:var(--accent)]"
                            >
                              <MailIcon className="h-4 w-4" />
                            </a>
                          )}
                          {member.phone && (
                            <a
                              href={`tel:${member.phone}`}
                              aria-label={`Call ${member.full_name}`}
                              className="flex h-8 w-8 items-center justify-center rounded-md text-[color:var(--muted)] transition-colors duration-200 hover:text-[color:var(--accent)]"
                            >
                              <PhoneIcon className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
