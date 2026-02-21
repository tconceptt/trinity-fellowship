import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ firstName: null });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data } = await supabase
    .from("members")
    .select("full_name")
    .eq("email", email.toLowerCase().trim())
    .eq("is_active", true)
    .single();

  const fullName = data?.full_name ?? null;
  const firstName = fullName?.split(" ")[0] ?? null;

  return NextResponse.json({ firstName, fullName });
}
