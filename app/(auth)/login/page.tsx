import Link from "next/link";
import KakaoLoginButton from "@/components/KakaoLoginButton";
import LoginForm from "@/components/LoginForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("로그인", "이메일 또는 카카오 계정으로 링크에 로그인해요.");

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { error } = await searchParams;

  return (
    <>
      <h1 className="mb-5 text-xl leading-[1.4] font-bold">로그인</h1>
      <LoginForm initialError={error === "kakao" ? "카카오 로그인에 실패했어요. 잠시 후 다시 시도해 주세요." : null} />
      <div className="mt-2.5">
        <KakaoLoginButton />
      </div>
      <p className="mt-5 text-center text-[13px] leading-[1.4]">
        <Link href="/forgot-password" className="text-link font-bold text-[var(--text-sub)]">
          비밀번호를 잊으셨나요?
        </Link>
      </p>
      <p className="mt-2 text-center text-[13px] leading-[1.4] text-[var(--text-sub)]">
        아직 계정이 없나요?{" "}
        <Link href="/signup" className="text-link font-bold text-[var(--accent)]">
          회원가입
        </Link>
      </p>
    </>
  );
}
