"use client";

import { Suspense, useState, useEffect, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/app/lib/supabase/browser";
import { Header } from "@/app/components/header";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"form" | "success" | "error">("form");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // If already authenticated, redirect to /members
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.replace("/members");
    });
  }, [supabase, router]);

  // Show error if redirected from a failed auth callback
  useEffect(() => {
    if (searchParams.get("error") === "auth") {
      setStatus("error");
      setErrorMsg("Authentication failed. Please try again.");
    }
  }, [searchParams]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      setStatus("success");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md"
    >
      <div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-8 shadow-lg shadow-[rgba(31,59,83,0.06)]">
        <h1 className="text-center font-serif text-3xl text-[color:var(--foreground)]">
          Member Login
        </h1>
        <p className="mt-2 text-center text-sm text-[color:var(--muted)]">
          Enter your email to receive a login link.
        </p>

        {status === "form" && (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--brand-soft)]"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-lg border border-[color:var(--line)] bg-[color:var(--background)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none transition-colors duration-200 placeholder:text-[color:var(--muted)]/50 focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/20"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[color:var(--brand)] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[color:var(--brand-soft)] hover:shadow-md disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Login Link"}
            </button>
          </form>
        )}

        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--brand)]/10">
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7"
                fill="none"
                stroke="var(--brand)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                <path d="m16 19 2 2 4-4" />
              </svg>
            </div>
            <p className="mt-4 text-lg font-semibold text-[color:var(--foreground)]">
              Check Your Email
            </p>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              We sent a login link to <strong>{email}</strong>. Click the link
              in the email to sign in.
            </p>
            <button
              onClick={() => setStatus("form")}
              className="mt-6 text-sm font-semibold text-[color:var(--brand)] transition-colors hover:text-[color:var(--brand-soft)]"
            >
              Try a different email
            </button>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-red-600">{errorMsg}</p>
            <button
              onClick={() => {
                setStatus("form");
                setErrorMsg("");
              }}
              className="mt-4 text-sm font-semibold text-[color:var(--brand)] transition-colors hover:text-[color:var(--brand-soft)]"
            >
              Try again
            </button>
          </motion.div>
        )}
      </div>

      <p className="mt-6 text-center text-xs text-[color:var(--muted)]">
        Only registered members can access the directory.
      </p>
    </motion.div>
  );
}

export default function MembersLoginPage() {
  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <Header />
      <main className="flex min-h-screen items-center justify-center px-5 pt-24 pb-12">
        <Suspense>
          <LoginForm />
        </Suspense>
      </main>
    </div>
  );
}
