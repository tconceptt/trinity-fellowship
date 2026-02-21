"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/app/lib/supabase/browser";
import { Header } from "@/app/components/header";
import { SignInForm } from "@/app/components/sign-in-form";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  // If already authenticated, redirect to /members
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.replace("/members/hub");
    });
  }, [supabase, router]);

  const errorType = searchParams.get("error");

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
          Enter your email to receive a login code.
        </p>

        {errorType ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-red-600">
              Authentication failed. Please try again.
            </p>
            <div className="mt-4">
              <SignInForm />
            </div>
          </motion.div>
        ) : (
          <div className="mt-8">
            <SignInForm />
          </div>
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
