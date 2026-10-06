"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const ERROR_MESSAGES: Record<string, string> = {
  same_password: "기존 비밀번호와 다른 비밀번호를 입력해 주세요.",
  weak_password: "비밀번호가 너무 약해요. 6자 이상으로 입력해 주세요.",
  session_not_found: "재설정 링크가 만료되었어요. 비밀번호 찾기를 다시 진행해 주세요.",
  over_request_rate_limit: "요청이 너무 많아요. 잠시 후 다시 시도해 주세요.",
};

// Needs the session that /auth/confirm created from the email link. Redirects to / on success.
export async function resetPassword(password: string, passwordConfirm: string): Promise<{ error: string }> {
  if (typeof password !== "string" || typeof passwordConfirm !== "string") return { error: "입력값이 올바르지 않아요." };
  if (!password || !passwordConfirm) return { error: "모든 항목을 입력해 주세요." };
  if (password !== passwordConfirm) return { error: "비밀번호가 일치하지 않아요." };
  if (password.length < 6) return { error: "비밀번호는 6자 이상으로 입력해 주세요." };

  const supabase = createClient(await cookies());
  const { data } = await supabase.auth.getClaims();
  if (!data) return { error: ERROR_MESSAGES.session_not_found };

  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: (error.code && ERROR_MESSAGES[error.code]) || "비밀번호를 바꾸지 못했어요. 잠시 후 다시 시도해 주세요." };

  redirect("/");
}
