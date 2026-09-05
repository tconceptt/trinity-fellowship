"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero } from "@/app/components/page-hero";
import { createClient } from "@/app/lib/supabase/browser";
import { getInitials, getAccent } from "@/app/lib/avatar-utils";
import {
  BackToHub,
  LoadFailed,
  MembersLoading,
  NotAMember,
} from "../members-states";

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

const TITLE = "Prayer Requests";

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
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
  /** Request whose inline "Remove?" confirmation is open. */
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<{
    id: string;
    message: string;
  } | null>(null);

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
    setDeleteError(null);

    let message: string | null = null;
    try {
      const res = await fetch(`/api/prayer-requests/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        message = data?.error ?? "Could not remove the request just now.";
      }
    } catch {
      message =
        "Could not reach the server. Check your connection and try again.";
    }

    if (message) {
      setDeleteError({ id, message });
    } else {
      setRequests((prev) => prev.filter((r) => r.id !== id));
      setConfirmId(null);
    }
    setDeletingId(null);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (status === "loading") {
    return <MembersLoading title={TITLE} label="Loading prayer requests…" />;
  }

  if (status === "not-member") {
    return <NotAMember email={userEmail} onSignOut={handleSignOut} />;
  }

  if (status === "error" || !currentMember) {
    return (
      <LoadFailed
        title={TITLE}
        message="We could not load prayer requests just now. This is usually temporary."
      />
    );
  }

  const firstName = currentMember.full_name?.split(" ")[0];

  return (
    <div className="min-h-screen">
      <PageHero
        compact
        title={TITLE}
        lede={
          firstName
            ? `${firstName}, this is a place to say what is on your heart. Your church family is here to carry it with you.`
            : "A place to say what is on your heart. Your church family is here to carry it with you."
        }
      />

      <section className="mx-auto max-w-2xl px-5 pt-10 pb-16 sm:px-8 sm:pt-12">
        <BackToHub />

        <figure className="my-8 border-y border-[color:var(--line)] py-6">
          <blockquote>
            <p className="font-quote text-lg leading-relaxed text-[color:var(--brand)]">
              &ldquo;Therefore, confess your sins to one another and pray for
              one another, that you may be healed. The prayer of a righteous
              person has great power as it is working.&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-3 text-sm font-semibold text-[color:var(--accent)]">
            James 5:16 (ESV)
          </figcaption>
        </figure>

        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-brand"
        >
          {showForm ? "Cancel" : "Share a Prayer Request"}
        </button>

        {/*
          A disclosure the member opened themselves, not decorative motion —
          the same pattern the header and mobile nav already use.
        */}
        <AnimatePresence initial={false}>
          {showForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={handleSubmit}
              className="overflow-hidden"
            >
              <div className="mt-6 rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
                <label
                  htmlFor="prayer-body"
                  className="text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--muted)]"
                >
                  Your Request
                </label>
                <textarea
                  id="prayer-body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="What would you like prayer for?"
                  rows={4}
                  className="mt-2 w-full resize-none rounded-lg border border-[color:var(--line)] bg-[color:var(--background)] px-4 py-3 text-sm leading-relaxed text-[color:var(--foreground)] outline-none transition-colors duration-200 placeholder:text-[color:var(--muted)] focus:border-[color:var(--accent)]"
                />

                <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--muted)]">
                      Who Can See This
                    </p>
                    <div className="mt-2 inline-flex rounded-lg border border-[color:var(--line)] p-0.5">
                      {(
                        [
                          ["all_members", "All Members"],
                          ["pastors_only", "Pastors Only"],
                        ] as const
                      ).map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          aria-pressed={visibility === value}
                          onClick={() => setVisibility(value)}
                          className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors duration-200 ${
                            visibility === value
                              ? "bg-[color:var(--brand)] text-[color:var(--cream)]"
                              : "text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 max-w-[40ch] text-xs leading-snug text-[color:var(--muted)]">
                      {visibility === "all_members"
                        ? "Visible to all church members who are signed in."
                        : "Only pastors will be able to see this request."}
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || !body.trim()}
                    className="btn btn-brand shrink-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[color:var(--brand)]"
                  >
                    {submitting ? "Sharing…" : "Share Request"}
                  </button>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* ── the feed ──────────────────────── */}
        <h2 className="mt-12 font-serif text-xl text-[color:var(--brand)]">
          From Our Church Family
        </h2>

        {requests.length === 0 ? (
          <p className="mt-4 border-t border-[color:var(--line)] pt-6 leading-relaxed text-[color:var(--muted)]">
            No prayer requests yet. Be the first to share what is on your heart.
          </p>
        ) : (
          <ul className="mt-4 border-t border-[color:var(--line)]">
            {requests.map((req) => {
              const authorName = req.member?.full_name ?? "Unknown";
              const [bg, fg] = getAccent(authorName);
              const isOwn = req.member_id === currentMember.id;
              const isPastor = currentMember.role === "pastor";

              return (
                <li
                  key={req.id}
                  className="flex items-start gap-3.5 border-b border-[color:var(--line)] py-5"
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-serif text-sm font-bold ${bg} ${fg}`}
                  >
                    {getInitials(authorName)}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                      <p className="text-[15px] font-semibold text-[color:var(--foreground)]">
                        {authorName}
                      </p>
                      <span className="text-xs text-[color:var(--muted)]">
                        {timeAgo(req.created_at)}
                      </span>
                      {req.visibility === "pastors_only" &&
                        (isOwn || isPastor) && (
                          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[color:var(--accent)]">
                            Pastors Only
                          </span>
                        )}
                    </div>
                    <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-[color:var(--muted)]">
                      {req.body}
                    </p>
                  </div>

                  {isOwn && (
                    <OwnRequestControls
                      confirming={confirmId === req.id}
                      deleting={deletingId === req.id}
                      error={
                        deleteError?.id === req.id ? deleteError.message : null
                      }
                      onAsk={() => {
                        setDeleteError(null);
                        setConfirmId(req.id);
                      }}
                      onKeep={() => {
                        setConfirmId(null);
                        setDeleteError(null);
                      }}
                      onRemove={() => handleDelete(req.id)}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

/**
 * A stray tap on a trash icon should not erase something a member wrote
 * from the heart, so removal asks once, inline, and reports failure in place
 * rather than pretending it worked.
 */
function OwnRequestControls({
  confirming,
  deleting,
  error,
  onAsk,
  onKeep,
  onRemove,
}: {
  confirming: boolean;
  deleting: boolean;
  error: string | null;
  onAsk: () => void;
  onKeep: () => void;
  onRemove: () => void;
}) {
  if (!confirming) {
    return (
      <button
        type="button"
        onClick={onAsk}
        aria-label="Remove this request"
        title="Remove this request"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-[color:var(--muted)] transition-colors duration-200 hover:bg-[color:var(--surface-strong)] hover:text-[color:var(--danger)]"
      >
        <TrashIcon />
      </button>
    );
  }

  return (
    <div
      className="flex shrink-0 flex-col items-end gap-1.5"
      role="group"
      aria-label="Confirm removal"
    >
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onKeep}
          disabled={deleting}
          className="rounded-md px-2.5 py-1.5 text-xs font-semibold text-[color:var(--muted)] transition-colors duration-200 hover:bg-[color:var(--surface-strong)] hover:text-[color:var(--foreground)] disabled:opacity-50"
        >
          Keep
        </button>
        <button
          type="button"
          onClick={onRemove}
          disabled={deleting}
          autoFocus
          className="rounded-md bg-[color:var(--danger)] px-2.5 py-1.5 text-xs font-semibold text-[color:var(--cream)] transition-opacity duration-200 hover:opacity-90 disabled:opacity-60"
        >
          {deleting ? "Removing…" : "Remove"}
        </button>
      </div>
      {error && (
        <p
          role="alert"
          className="max-w-[26ch] text-right text-xs leading-snug text-[color:var(--danger)]"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function TrashIcon() {
  return (
    <svg
      aria-hidden
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
  );
}
