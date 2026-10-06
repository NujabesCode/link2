import Logo from "@/components/Logo";

// Login and signup sit outside (main), so there's no header or sidebar here.
export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="flex flex-1 items-center justify-center bg-[var(--bg)] px-5 py-9">
      <div className="flex w-full max-w-[400px] flex-col items-center gap-7">
        <Logo className="text-[26px]" />
        <div className="w-full rounded-2xl bg-[var(--surface)] p-6 shadow-[var(--shadow)]">{children}</div>
      </div>
    </main>
  );
}
