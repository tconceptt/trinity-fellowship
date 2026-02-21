import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        maxAge: 60 * 60 * 24 * 30, // 30 days
      },
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Refresh the session so it doesn't expire
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Allow the login page through without auth
  if (request.nextUrl.pathname === "/members/login") {
    return supabaseResponse;
  }

  // Redirect unauthenticated users away from /members
  if (!user && request.nextUrl.pathname.startsWith("/members")) {
    const url = request.nextUrl.clone();
    url.pathname = "/members/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/members/:path*", "/auth/:path*"],
};
