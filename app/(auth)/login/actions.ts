"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: "이메일 또는 비밀번호가 올바르지 않아요.",
  email_not_confirmed: "이메일 인증이 아직 완료되지 않았어요. 메일함을 확인해 주세요.",
  user_banned: "이용이 제한된 계정이에요.",
  over_request_rate_limit: "요청이 너무 많아요. 잠시 후 다시 시도해 주세요.",
  email_provider_disabled: "지금은 이메일 로그인을 할 수 없어요.",
};

// Redirects to / on success; otherwise returns a Korean message for the toast.
export async function logIn(email: string, password: string): Promise<{ error: string }> {
  // Public POST endpoint, so the form's checks are repeated here.
  if (typeof email !== "string" || typeof password !== "string") return { error: "입력값이 올바르지 않아요." };
  if (!email.trim() || !password) return { error: "이메일과 비밀번호를 입력해 주세요." };

  const supabase = createClient(await cookies());
  const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });

  if (error) return { error: (error.code && ERROR_MESSAGES[error.code]) || "로그인에 실패했어요. 잠시 후 다시 시도해 주세요." };

  redirect("/");
}
