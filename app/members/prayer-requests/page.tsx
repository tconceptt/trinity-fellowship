"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/app/lib/supabase/browser";
import { getInitials, getAccent } from "@/app/lib/avatar-utils";
import { Header } from "@/app/components/header";

type CurrentMember = {
  id: string;
  role: string;
  full_name?: string;
};

type PrayerRequest = {
  id: string;
  member_id: string;
  body: string;
  visibility: string;
  created_at: string;
  member: { id: string; full_name: string };
};

function timeAgo(dateStr: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / 1000,
  );
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export default function PrayerRequestsPage() {
  const router = useRouter();
  const supabase = createClient();

  const [status, setStatus] = useState<
    "loading" | "not-member" | "error" | "success"
  >("loading");
  const [currentMember, setCurrentMember] = useState<CurrentMember | null>(
    null,
  );
  const [userEmail, setUserEmail] = useState("");
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [body, setBody] = useState("");
  const [visibility, setVisibility] = useState<"all_members" | "pastors_only">(
    "all_members",
  );
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

      const { data: member } = await supabase
        .from("members")
        .select("id, role, full_name")
        .eq("email", user.email)
        .eq("is_active", true)
        .single();

      if (!member) {
        setStatus("not-member");
        return;
      }

      setCurrentMember(member);

      const { data, error } = await supabase
        .from("prayer_requests")
        .select("*, member:members(id, full_name)")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) {
        setStatus("error");
        return;
      }

      setRequests(data ?? []);
      setStatus("success");
    }

    load();
  }, [supabase, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!currentMember || !body.trim()) return;
    setSubmitting(true);

    const { data, error } = await supabase
      .from("prayer_requests")
      .insert({
        member_id: currentMember.id,
        body: body.trim(),
        visibility,
      })
      .select("*, member:members(id, full_name)")
      .single();

    if (!error && data) {
      setRequests((prev) => [data, ...prev]);
      setBody("");
      setVisibility("all_members");
      setShowForm(false);
    }

    setSubmitting(false);
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    const { error } = await supabase
      .from("prayer_requests")
      .update({ is_active: false })
      .eq("id", id);

    if (!error) {
      setRequests((prev) => prev.filter((r) => r.id !== id));
    }
    setDeletingId(null);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <Header />

      <main className="mx-auto max-w-2xl px-5 pt-28 pb-16 sm:px-8">
        {/* Loading */}
        {status === "loading" && (
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[color:var(--line)] border-t-[color:var(--brand)]" />
              <p className="mt-4 text-sm text-[color:var(--muted)]">
                Loading prayer requests...
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
                We couldn&apos;t load prayer requests. Please try again.
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

        {/* Success */}
        {status === "success" && currentMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Back link */}
            <Link
              href="/members/hub"
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--muted)] transition-colors duration-200 hover:text-[color:var(--brand)]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
              Members Area
            </Link>

            {/* Hero section */}
            <div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] px-6 py-8 text-center sm:px-10 sm:py-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--brand)]/10">
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7"
                  fill="none"
                  stroke="var(--brand)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h1 className="mt-4 font-serif text-3xl text-[color:var(--foreground)] sm:text-4xl">
                Prayer Requests
              </h1>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[color:var(--muted)]">
                {currentMember?.full_name
                  ? <>{currentMember.full_name.split(" ")[0]}, this is a safe space to share what&apos;s on your heart. Your church family is here to lift you up in prayer.</>
                  : <>This is a safe space to share what&apos;s on your heart. Your church family is here to lift you up in prayer.</>}
              </p>

              {/* Bible verse */}
              <blockquote className="mx-auto mt-6 max-w-lg border-l-2 border-[color:var(--brand)]/30 pl-4 text-left">
                <p className="text-sm italic leading-relaxed text-[color:var(--foreground)]/70">
                  &ldquo;Therefore confess your sins to each other and pray for
                  each other so that you may be healed. The prayer of a
                  righteous person is powerful and effective.&rdquo;
                </p>
                <cite className="mt-2 block text-xs font-semibold not-italic text-[color:var(--brand)]">
                  James 5:16
                </cite>
              </blockquote>

              <button
                onClick={() => setShowForm(!showForm)}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--brand)] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[color:var(--brand-soft)] hover:shadow-md"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                {showForm ? "Cancel" : "Share a Prayer Request"}
              </button>

              {requests.length > 0 && (
                <p className="mt-4 text-xs text-[color:var(--muted)]">
                  {requests.length}{" "}
                  {requests.length === 1 ? "request" : "requests"} from our
                  church family
                </p>
              )}
            </div>

            {/* New request form */}
            <AnimatePresence>
              {showForm && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  onSubmit={handleSubmit}
                  className="overflow-hidden"
                >
                  <div className="mt-6 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
                    <p className="mb-3 text-xs text-[color:var(--muted)]">
                      Your request will be shared with love and held in
                      confidence by our community.
                    </p>
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      placeholder="What would you like prayer for?"
                      rows={4}
                      className="w-full resize-none rounded-lg border border-[color:var(--line)] bg-[color:var(--background)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none transition-colors duration-200 placeholder:text-[color:var(--muted)]/50 focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/20"
                    />

                    <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                      {/* Visibility toggle */}
                      <div>
                        <p className="mb-1.5 text-xs font-semibold text-[color:var(--foreground)]">
                          Choose Visibility
                        </p>
                        <div className="flex rounded-full border border-[color:var(--line)] p-0.5">
                          <button
                            type="button"
                            onClick={() => setVisibility("all_members")}
                            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                              visibility === "all_members"
                                ? "bg-[color:var(--brand)] text-white"
                                : "text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
                            }`}
                          >
                            All Members
                          </button>
                          <button
                            type="button"
                            onClick={() => setVisibility("pastors_only")}
                            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                              visibility === "pastors_only"
                                ? "bg-[color:var(--brand)] text-white"
                                : "text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
                            }`}
                          >
                            Pastors Only
                          </button>
                        </div>
                        <p className="mt-1.5 text-[11px] leading-snug text-[color:var(--muted)]">
                          {visibility === "all_members"
                            ? "Visible to all church members who are signed in."
                            : "Only pastors will be able to see this request."}
                        </p>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting || !body.trim()}
                        className="shrink-0 rounded-full bg-[color:var(--brand)] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[color:var(--brand-soft)] hover:shadow-md disabled:opacity-50 disabled:hover:bg-[color:var(--brand)] disabled:hover:shadow-none"
                      >
                        {submitting ? "Submitting..." : "Submit Request"}
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Feed */}
            <div className="mt-8 space-y-4">
              {requests.length > 0 && (
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  From Our Church Family
                </p>
              )}
            </div>
            <div className="mt-3 space-y-4">
              {requests.length === 0 ? (
                <div className="flex min-h-[20vh] items-center justify-center rounded-xl border border-dashed border-[color:var(--line)] p-8">
                  <div className="text-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="mx-auto h-8 w-8 text-[color:var(--muted)]/40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                    <p className="mt-3 text-sm text-[color:var(--muted)]">
                      No prayer requests yet.
                    </p>
                    <p className="mt-1 text-xs text-[color:var(--muted)]/70">
                      Be the first to share what&apos;s on your heart.
                    </p>
                  </div>
                </div>
              ) : (
                requests.map((req) => {
                  const authorName = req.member?.full_name ?? "Unknown";
                  const [bg, fg] = getAccent(authorName);
                  const isOwn = req.member_id === currentMember.id;
                  const isPastor = currentMember.role === "pastor";

                  return (
                    <motion.div
                      key={req.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] p-5"
                    >
                      <div className="flex items-start gap-3.5">
                        {/* Avatar */}
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-serif text-sm font-bold ${bg} ${fg}`}
                        >
                          {getInitials(authorName)}
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-[15px] font-semibold text-[color:var(--foreground)]">
                              {authorName}
                            </p>
                            <span className="text-xs text-[color:var(--muted)]">
                              {timeAgo(req.created_at)}
                            </span>
                            {req.visibility === "pastors_only" &&
                              (isOwn || isPastor) && (
                                <span className="rounded-full bg-[color:var(--brand)]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[color:var(--brand)]">
                                  Pastors Only
                                </span>
                              )}
                          </div>
                          <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-[color:var(--foreground)]/80">
                            {req.body}
                          </p>
                        </div>

                        {/* Delete (own requests only) */}
                        {isOwn && (
                          <button
                            onClick={() => handleDelete(req.id)}
                            disabled={deletingId === req.id}
                            className="shrink-0 rounded-full p-2 text-[color:var(--muted)] transition-colors duration-200 hover:bg-red-500/10 hover:text-red-600 disabled:opacity-50"
                            title="Remove request"
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
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
