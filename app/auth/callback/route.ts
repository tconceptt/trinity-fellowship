import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

async function enrichUserMetadata(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return;

  // Skip if already set
  if (user.user_metadata?.full_name) return;

  const { data: member } = await supabase
    .from("members")
    .select("full_name")
    .eq("email", user.email)
    .eq("is_active", true)
    .single();

  if (member?.full_name) {
    await supabase.auth.updateUser({
      data: { full_name: member.full_name },
    });
  }
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as
    | "magiclink"
    | "email"
    | null;

  // Use x-forwarded-host for correct redirect behind Vercel proxy
  const forwardedHost = request.headers.get("x-forwarded-host");
  const redirectBase =
    forwardedHost && process.env.NODE_ENV !== "development"
      ? `https://${forwardedHost}`
      : origin;

  const supabase = await createClient();

  // PKCE flow – magic link opened in the same browser
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      await enrichUserMetadata(supabase);
      return NextResponse.redirect(`${redirectBase}/members/hub`);
    }
  }

  // Token-hash flow – magic link opened in a different browser/context
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type,
    });
    if (!error) {
      await enrichUserMetadata(supabase);
      return NextResponse.redirect(`${redirectBase}/members/hub`);
    }
  }

  return NextResponse.redirect(`${redirectBase}/members/login?error=auth`);
}
