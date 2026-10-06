"use client";

import { useCallback, useState, useTransition, type FormEvent } from "react";
import { resetPassword } from "@/app/(auth)/reset-password/actions";
import AuthField from "./AuthField";
import Button from "./Button";
import Toast from "./Toast";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const filled = password !== "" && passwordConfirm !== "";
  const closeToast = useCallback(() => setToast(null), []);

  function showError(message: string) {
    setToast({ id: Date.now(), message });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!filled || pending) return;
    if (password !== passwordConfirm) return showError("비밀번호가 일치하지 않아요.");

    startTransition(async () => {
      // Only returns on failure; success redirects to /.
      const result = await resetPassword(password, passwordConfirm);
      if (result?.error) showError(result.error);
    });
  }

  return (
    <>
      {toast && <Toast key={toast.id} message={toast.message} onClose={closeToast} />}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
        <AuthField
          id="password"
          label="새 비밀번호"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <AuthField
          id="password-confirm"
          label="새 비밀번호 확인"
          type="password"
          autoComplete="new-password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <Button type="submit" disabled={!filled || pending} className="mt-2 w-full">
          {pending ? "변경 중…" : "비밀번호 변경"}
        </Button>
      </form>
    </>
  );
}
