"use server";

import { cookies, headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ERROR_MESSAGES: Record<string, string> = {
  over_email_send_rate_limit: "메일을 너무 자주 요청했어요. 잠시 후 다시 시도해 주세요.",
  over_request_rate_limit: "요청이 너무 많아요. 잠시 후 다시 시도해 주세요.",
  email_address_invalid: "사용할 수 없는 이메일 주소예요.",
};

export async function sendResetLink(email: string): Promise<{ error: string } | { ok: true }> {
  if (typeof email !== "string" || !EMAIL_PATTERN.test(email.trim())) {
    return { error: "올바른 이메일 주소를 입력해 주세요." };
  }

  // The link in the email lands on /auth/confirm, which signs the user in and forwards to /reset-password.
  const h = await headers();
  const origin = h.get("origin") ?? `${h.get("x-forwarded-proto") ?? "http"}://${h.get("host")}`;

  const supabase = createClient(await cookies());
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: `${origin}/auth/confirm?next=/reset-password`,
  });

  if (error) return { error: (error.code && ERROR_MESSAGES[error.code]) || "메일을 보내지 못했어요. 잠시 후 다시 시도해 주세요." };
  // Supabase doesn't reveal whether the address has an account, and neither do we.
  return { ok: true };
}
