"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/app/lib/supabase/browser";

type SignInFormProps = {
  compact?: boolean;
  onSuccess?: () => void;
};

export function SignInForm({ compact = false, onSuccess }: SignInFormProps) {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"form" | "success" | "error">("form");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
      onSuccess?.();
    }
  }

  if (status === "success") {
    const content = (
      <div className={compact ? "text-center" : "mt-8 text-center"}>
        <div
          className={`mx-auto flex items-center justify-center rounded-full bg-[color:var(--brand)]/10 ${
            compact ? "h-10 w-10" : "h-14 w-14"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className={compact ? "h-5 w-5" : "h-7 w-7"}
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
        <p
          className={`font-semibold text-[color:var(--foreground)] ${
            compact ? "mt-3 text-sm" : "mt-4 text-lg"
          }`}
        >
          Check Your Email
        </p>
        <p
          className={`text-[color:var(--muted)] ${
            compact ? "mt-1 text-xs" : "mt-2 text-sm"
          }`}
        >
          We sent a login link to <strong>{email}</strong>.
        </p>
        <button
          onClick={() => setStatus("form")}
          className={`font-semibold text-[color:var(--brand)] transition-colors hover:text-[color:var(--brand-soft)] ${
            compact ? "mt-3 text-xs" : "mt-6 text-sm"
          }`}
        >
          Try a different email
        </button>
      </div>
    );

    return compact ? content : <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>{content}</motion.div>;
  }

  if (status === "error") {
    const content = (
      <div className={compact ? "text-center" : "mt-8 text-center"}>
        <p className={`text-red-600 ${compact ? "text-xs" : "text-sm"}`}>{errorMsg}</p>
        <button
          onClick={() => {
            setStatus("form");
            setErrorMsg("");
          }}
          className={`font-semibold text-[color:var(--brand)] transition-colors hover:text-[color:var(--brand-soft)] ${
            compact ? "mt-3 text-xs" : "mt-4 text-sm"
          }`}
        >
          Try again
        </button>
      </div>
    );

    return compact ? content : <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>{content}</motion.div>;
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "mt-8 space-y-4"}>
      <div>
        <label
          htmlFor={compact ? "email-compact" : "email"}
          className={`block font-semibold uppercase tracking-[0.12em] text-[color:var(--brand-soft)] ${
            compact ? "text-[10px]" : "text-xs"
          }`}
        >
          Email Address
        </label>
        <input
          id={compact ? "email-compact" : "email"}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={`w-full rounded-lg border border-[color:var(--line)] bg-[color:var(--background)] text-[color:var(--foreground)] outline-none transition-colors duration-200 placeholder:text-[color:var(--muted)]/50 focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/20 ${
            compact ? "mt-1.5 px-3 py-2 text-xs" : "mt-2 px-4 py-3 text-sm"
          }`}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full rounded-full bg-[color:var(--brand)] font-semibold text-white transition-all duration-300 hover:bg-[color:var(--brand-soft)] hover:shadow-md disabled:opacity-60 ${
          compact ? "px-4 py-2 text-xs" : "px-6 py-3 text-sm"
        }`}
      >
        {loading ? "Sending..." : "Send Login Link"}
      </button>
    </form>
  );
}
