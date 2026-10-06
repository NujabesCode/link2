import Link from "next/link";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { noIndex, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("비밀번호 찾기", "가입한 이메일로 비밀번호 재설정 링크를 받아요.", noIndex);

export default async function ForgotPasswordPage({ searchParams }: PageProps<"/forgot-password">) {
  const { error } = await searchParams;

  return (
    <>
      <h1 className="mb-2 text-xl leading-[1.4] font-bold">비밀번호 찾기</h1>
      <p className="mb-5 text-[13px] leading-[1.4] text-[var(--text-sub)]">
        가입한 이메일을 입력하면 비밀번호 재설정 링크를 보내드려요.
      </p>
      <ForgotPasswordForm linkExpired={error === "expired"} />
      <p className="mt-5 text-center text-[13px] leading-[1.4] text-[var(--text-sub)]">
        비밀번호가 생각났나요?{" "}
        <Link href="/login" className="text-link font-bold text-[var(--accent)]">
          로그인
        </Link>
      </p>
    </>
  );
}
