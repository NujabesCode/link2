"use client";

import { useCallback, useState, useTransition, type FormEvent } from "react";
import { logIn } from "@/app/(auth)/login/actions";
import AuthField from "./AuthField";
import Button from "./Button";
import Toast from "./Toast";

/** `initialError` comes from the URL, e.g. a failed Kakao round trip landing back on /login?error=kakao. */
export default function LoginForm({ initialError }: { initialError: string | null }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState<{ id: number; message: string } | null>(
    initialError ? { id: 0, message: initialError } : null,
  );
  const [pending, startTransition] = useTransition();
  const filled = email.trim() !== "" && password !== "";
  const closeToast = useCallback(() => setToast(null), []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!filled || pending) return;

    startTransition(async () => {
      // Only returns on failure; success redirects to /.
      const result = await logIn(email, password);
      if (result?.error) setToast({ id: Date.now(), message: result.error });
    });
  }

  return (
    <>
      {toast && <Toast key={toast.id} message={toast.message} onClose={closeToast} />}
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
        <AuthField
          id="password"
          label="비밀번호"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" disabled={!filled || pending} className="mt-2 w-full">
          {pending ? "로그인 중…" : "로그인"}
        </Button>
      </form>
    </>
  );
}
