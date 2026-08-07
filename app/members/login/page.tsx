"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PageHero } from "@/app/components/page-hero";
import { createClient } from "@/app/lib/supabase/browser";
import { SignInForm } from "@/app/components/sign-in-form";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  // If already authenticated, skip straight to the hub.
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.replace("/members/hub");
    });
  }, [supabase, router]);

  const errorType = searchParams.get("error");

  return (
    <>
      {errorType && (
        <p
          role="alert"
          className="mb-6 max-w-[54ch] text-sm leading-relaxed text-[color:var(--danger)]"
        >
          {/*
            The callback redirects here with `different_browser` when the PKCE
            verifier cookie is missing, which happens whenever a link is opened
            somewhere other than where it was requested. Naming that is far more
            useful than a generic failure, because the fix is to use the code.
          */}
          {errorType === "different_browser"
            ? "That link was opened in a different browser from the one you signed in with. Request a new code below and type it in here instead."
            : "We could not sign you in. Please request a new code and try again."}
        </p>
      )}
      <SignInForm />
    </>
  );
}

export default function MembersLoginPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        compact
        title="Member Sign In"
        lede="Enter your email and we will send you a code. Only registered members can reach the directory and prayer requests."
      />

      {/* Same 3xl spine as the other pages; the form itself stays form-width
          inside it so it lines up with the rest of the site rather than
          floating in the middle of the viewport. */}
      <section className="mx-auto max-w-3xl px-5 pt-12 pb-20 sm:px-8 sm:pt-14">
        <div className="max-w-md">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>

        <p className="mt-8 max-w-md border-t border-[color:var(--line)] pt-6 text-sm leading-relaxed text-[color:var(--muted)]">
          Not a member yet, or not sure whether you are on the list? Speak with any of our staff
          after a Sunday service.
        </p>
      </section>
    </div>
  );
}
