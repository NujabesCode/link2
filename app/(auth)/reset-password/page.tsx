import ResetPasswordForm from "@/components/ResetPasswordForm";
import { noIndex, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("비밀번호 재설정", "새로 사용할 비밀번호를 설정해요.", noIndex);

// Reached from the email link via /auth/confirm, which has already signed the user in.
export default function ResetPasswordPage() {
  return (
    <>
      <h1 className="mb-2 text-xl leading-[1.4] font-bold">비밀번호 재설정</h1>
      <p className="mb-5 text-[13px] leading-[1.4] text-[var(--text-sub)]">새로 사용할 비밀번호를 입력해 주세요.</p>
      <ResetPasswordForm />
    </>
  );
}
