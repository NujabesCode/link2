"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function logOut() {
  const supabase = createClient(await cookies());
  await supabase.auth.signOut();
  redirect("/");
}
