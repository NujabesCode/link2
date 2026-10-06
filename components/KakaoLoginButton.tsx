import { logInWithKakao } from "@/app/(auth)/login/kakao-actions";

// Follows Kakao's login button guide: #FEE500 background, black speech-bubble symbol, 85% black label.
export default function KakaoLoginButton() {
  return (
    <form action={logInWithKakao}>
      <button
        type="submit"
        className="btn-kakao relative inline-flex w-full items-center justify-center rounded-xl bg-[var(--kakao)] px-6 py-3.5 text-base leading-none font-bold text-[var(--kakao-label)]"
      >
        <svg
          className="absolute left-5"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 3C6.48 3 2 6.5 2 10.82c0 2.8 1.88 5.25 4.7 6.63l-.95 3.48c-.08.3.26.55.52.38l4.15-2.74c.52.06 1.05.1 1.58.1 5.52 0 10-3.5 10-7.85S17.52 3 12 3Z" />
        </svg>
        카카오 로그인
      </button>
    </form>
  );
}
