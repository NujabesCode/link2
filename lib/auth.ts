import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

/** The signed-in user's email, or null when logged out. */
export async function getUserEmail(): Promise<string | null> {
  const supabase = createClient(await cookies());
  const { data } = await supabase.auth.getClaims();
  return data?.claims.email ?? null;
}
