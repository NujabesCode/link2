import type { EmailOtpType } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

// Landing point for links in Supabase auth emails. Turns the link's one-time credential
// into a session cookie, then forwards to `next` (only same-site paths are allowed).
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const rawNext = searchParams.get("next") ?? "/";
  const next = rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/";

  const supabase = createClient(await cookies());
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  // Default email template → PKCE `code`; a custom template using {{ .TokenHash }} → `token_hash`.
  const { error } = code
    ? await supabase.auth.exchangeCodeForSession(code)
    : tokenHash && type
      ? await supabase.auth.verifyOtp({ token_hash: tokenHash, type })
      : { error: new Error("missing credential") };

  redirect(error ? "/forgot-password?error=expired" : next);
}
