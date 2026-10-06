"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ERROR_MESSAGES: Record<string, string> = {
  user_already_exists: "이미 가입된 이메일이에요.",
  email_exists: "이미 가입된 이메일이에요.",
  email_address_invalid: "사용할 수 없는 이메일 주소예요.",
  weak_password: "비밀번호가 너무 약해요. 6자 이상으로 입력해 주세요.",
  over_email_send_rate_limit: "요청이 너무 많아요. 잠시 후 다시 시도해 주세요.",
  over_request_rate_limit: "요청이 너무 많아요. 잠시 후 다시 시도해 주세요.",
  signup_disabled: "지금은 회원가입을 할 수 없어요.",
  email_provider_disabled: "지금은 이메일 회원가입을 할 수 없어요.",
};

// Redirects to / on success; otherwise returns a Korean message for the toast.
export async function signUp(email: string, password: string, passwordConfirm: string): Promise<{ error: string }> {
  // Public POST endpoint, so the form's checks are repeated here.
  if (typeof email !== "string" || typeof password !== "string" || typeof passwordConfirm !== "string") {
    return { error: "입력값이 올바르지 않아요." };
  }
  if (!email || !password || !passwordConfirm) return { error: "모든 항목을 입력해 주세요." };
  if (!EMAIL_PATTERN.test(email.trim())) return { error: "올바른 이메일 주소를 입력해 주세요." };
  if (password !== passwordConfirm) return { error: "비밀번호가 일치하지 않아요." };
  if (password.length < 6) return { error: "비밀번호는 6자 이상으로 입력해 주세요." };

  const supabase = createClient(await cookies());
  const { data, error } = await supabase.auth.signUp({ email: email.trim(), password });

  if (error) return { error: (error.code && ERROR_MESSAGES[error.code]) || "회원가입에 실패했어요. 잠시 후 다시 시도해 주세요." };
  // With email confirmation on, Supabase hides duplicates behind a fake success with no identities.
  if (data.user?.identities?.length === 0) return { error: ERROR_MESSAGES.user_already_exists };

  redirect("/");
}
