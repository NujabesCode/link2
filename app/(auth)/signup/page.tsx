import Link from "next/link";
import SignupForm from "@/components/SignupForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("회원가입", "이메일로 가입하고 나만의 링크 폴더를 만들어요.");

export default function SignupPage() {
  return (
    <>
      <h1 className="mb-5 text-xl leading-[1.4] font-bold">회원가입</h1>
      <SignupForm />
      <p className="mt-5 text-center text-[13px] leading-[1.4] text-[var(--text-sub)]">
        이미 계정이 있나요?{" "}
        <Link href="/login" className="text-link font-bold text-[var(--accent)]">
          로그인
        </Link>
      </p>
    </>
  );
}
