"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

// Sends the browser to Kakao's consent screen; Kakao → Supabase → /auth/callback brings it back.
export async function logInWithKakao() {
  const h = await headers();
  const origin = h.get("origin") ?? `${h.get("x-forwarded-proto") ?? "http"}://${h.get("host")}`;

  const supabase = createClient(await cookies());
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: { redirectTo: `${origin}/auth/callback` },
  });

  redirect(error || !data.url ? "/login?error=kakao" : data.url);
}
