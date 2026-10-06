import { logOut } from "@/app/(auth)/logout/actions";
import AddLinkButton from "./AddLinkButton";
import { compactSecondaryButtonStyles } from "./Button";
import Logo from "./Logo";
import NewFolderButton from "./NewFolderButton";

export default function Header({ email }: { email: string | null }) {
  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between bg-[var(--surface)] px-5 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      <h1>
        <Logo />
      </h1>
      <div className="flex items-center gap-2">
        <NewFolderButton />
        <AddLinkButton />
        {email && (
          <div className="ml-2 flex items-center gap-3 border-l border-[var(--border)] pl-4">
            <span className="max-w-48 truncate text-sm font-bold text-[var(--text)]" title={email}>
              {email}
            </span>
            <form action={logOut}>
              <button type="submit" className={compactSecondaryButtonStyles}>
                로그아웃
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
