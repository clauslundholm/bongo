import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { locales, defaultLocale } from "./i18n/config";
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from "./lib/supabase/env";

function getLocale(req: NextRequest): string {
  const header = req.headers.get("accept-language");
  if (header) {
    const preferred = header.split(",").map((p) => p.split(";")[0].trim().slice(0, 2).toLowerCase());
    for (const p of preferred) {
      if ((locales as readonly string[]).includes(p)) return p;
      if (p === "nb" || p === "nn") return "no";
      if (p === "se") return "sv";
    }
  }
  return defaultLocale;
}

export default async function proxy(req: NextRequest) {
  let res = NextResponse.next({ request: req });

  // Keep the Supabase auth session fresh on every request.
  if (isSupabaseConfigured) {
    const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
          res = NextResponse.next({ request: req });
          cookiesToSet.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
        },
      },
    });
    await supabase.auth.getUser();
  }

  const { pathname } = req.nextUrl;

  // Admin and API routes are not localized.
  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    return res;
  }

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return res;

  const locale = getLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const redirect = NextResponse.redirect(url);
  res.cookies.getAll().forEach((c) => redirect.cookies.set(c));
  return redirect;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
