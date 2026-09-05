import { createClient as createServiceClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

/**
 * Soft-deletes a prayer request. Row-level security on prayer_requests has
 * no UPDATE policy, so a browser-side update quietly matches zero rows and
 * the request reappears on reload. This runs the update with the service
 * key after checking, server-side, that the signed-in member wrote it.
 */
export async function DELETE(
  _request: Request,
  ctx: RouteContext<"/api/prayer-requests/[id]">,
) {
  const { id } = await ctx.params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json(
      { error: "You are signed out. Sign in and try again." },
      { status: 401 },
    );
  }

  const admin = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data: member } = await admin
    .from("members")
    .select("id")
    .eq("email", user.email)
    .eq("is_active", true)
    .single();

  if (!member) {
    return NextResponse.json(
      { error: "Only registered members can do this." },
      { status: 403 },
    );
  }

  const { data: removed, error } = await admin
    .from("prayer_requests")
    .update({ is_active: false })
    .eq("id", id)
    .eq("member_id", member.id)
    .eq("is_active", true)
    .select("id");

  if (error) {
    return NextResponse.json(
      { error: "Could not remove the request just now." },
      { status: 500 },
    );
  }

  if (!removed || removed.length === 0) {
    return NextResponse.json(
      { error: "This request is not yours to remove, or it is already gone." },
      { status: 404 },
    );
  }

  return NextResponse.json({ ok: true });
}
