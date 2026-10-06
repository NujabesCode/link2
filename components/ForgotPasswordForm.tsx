"use client";

import { useCallback, useState, useTransition, type FormEvent } from "react";
import { sendResetLink } from "@/app/(auth)/forgot-password/actions";
import AuthField from "./AuthField";
import Button from "./Button";
import Toast from "./Toast";

type ToastState = { id: number; message: string; variant: "error" | "success" };

const EXPIRED_MESSAGE = "재설정 링크가 만료되었거나 올바르지 않아요. 다시 요청해 주세요.";

export default function ForgotPasswordForm({ linkExpired }: { linkExpired: boolean }) {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState<ToastState | null>(
    linkExpired ? { id: 0, message: EXPIRED_MESSAGE, variant: "error" } : null,
  );
  const [pending, startTransition] = useTransition();
  const filled = email.trim() !== "";
  const closeToast = useCallback(() => setToast(null), []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!filled || pending) return;

    startTransition(async () => {
      const result = await sendResetLink(email);
      setToast(
        "error" in result
          ? { id: Date.now(), message: result.error, variant: "error" }
          : { id: Date.now(), message: "비밀번호 재설정 링크를 보냈어요. 메일함을 확인해 주세요.", variant: "success" },
      );
    });
  }

  return (
    <>
      {toast && <Toast key={toast.id} message={toast.message} variant={toast.variant} onClose={closeToast} />}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
        <AuthField
          id="email"
          label="이메일"
          type="email"
          autoComplete="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" disabled={!filled || pending} className="mt-2 w-full">
          {pending ? "보내는 중…" : "재설정 링크 보내기"}
        </Button>
      </form>
    </>
  );
}
