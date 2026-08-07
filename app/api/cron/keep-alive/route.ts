import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

/**
 * Keeps the Supabase project out of the free-tier inactivity pause.
 *
 * Supabase pauses free projects after ~7 days without activity, and the
 * members area can easily go a fortnight without a single sign-in. A daily
 * read gives us a 7x margin on that window.
 *
 * This must be a genuine round trip to Postgres — not a static response — so
 * the handler is forced dynamic and actually counts rows rather than just
 * constructing a client.
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;

  /*
   * Vercel sends `Authorization: Bearer $CRON_SECRET` on scheduled
   * invocations whenever that env var exists. Without the guard this is an
   * open endpoint anyone can hammer to burn the project's request quota, so
   * outside development we refuse to run unguarded.
   */
  if (secret) {
    if (request.headers.get("authorization") !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } else if (process.env.NODE_ENV === "production") {
    console.error("[cron/keep-alive] CRON_SECRET is not set; refusing to run.");
    return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.error("[cron/keep-alive] Supabase environment variables are missing.");
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const supabase = createClient(url, serviceKey);

  /*
   * Deliberately a row-returning select rather than a `head: true` count.
   * PostgREST reports counts in the `content-range` header, which does not
   * survive Next's patched fetch here — it came back null every time, which
   * would make a broken query look identical to a healthy one. Reading one id
   * proves the round trip from the response body instead.
   */
  const { data, error } = await supabase.from("members").select("id").limit(1);

  if (error) {
    console.error("[cron/keep-alive] Supabase query failed:", error.message);
    return NextResponse.json({ ok: false, error: error.message }, { status: 502 });
  }

  const reachable = (data?.length ?? 0) > 0;

  if (!reachable) {
    // A zero-row members table means the query ran but something is wrong.
    console.error("[cron/keep-alive] Query succeeded but members table is empty.");
    return NextResponse.json({ ok: false, error: "No rows returned" }, { status: 502 });
  }

  console.log("[cron/keep-alive] OK — members table reachable.");

  return NextResponse.json({ ok: true, at: new Date().toISOString() });
}
