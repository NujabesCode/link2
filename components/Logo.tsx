import Link from "next/link";

export default function Logo({ className = "text-xl" }: { className?: string }) {
  return (
    <Link href="/" className={`logo-link flex items-center gap-1.5 font-bold ${className}`}>
      <span className="text-[var(--accent)]">링크</span>
      <span className="size-2 rounded-full bg-[var(--point)]" aria-hidden />
    </Link>
  );
}
