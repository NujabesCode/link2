import Link from "next/link";
import type { Folder } from "@/lib/data";
import { compactButtonStyles, compactSecondaryButtonStyles } from "./Button";
import FolderList from "./FolderList";
import SidebarItem from "./SidebarItem";

export type SidebarProps = {
  folders: Folder[];
  counts: Record<string, number>;
  total: number;
  /** "all", a folder id, or null when no item is active (e.g. on /new). */
  activeKey: string | null;
  loggedIn: boolean;
};

export default function Sidebar({ folders, counts, total, activeKey, loggedIn }: SidebarProps) {
  return (
    <aside className="w-60 shrink-0 bg-[var(--surface)] shadow-[1px_0_0_rgba(0,0,0,0.06)]">
      {/* Sticky below the 56px header so the auth buttons stay pinned to the bottom of the viewport. */}
      <div className="sticky top-14 flex h-[calc(100vh-56px)] flex-col gap-6 px-3 py-6">
        <nav className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto">
          <SidebarItem label="전체" count={total} href="/" active={activeKey === "all"} />
          <div>
            <h2 className="mb-2 px-3 text-[13px] font-bold text-[var(--text-sub)]">폴더</h2>
            <FolderList folders={folders} counts={counts} activeKey={activeKey} />
          </div>
        </nav>
        {!loggedIn && (
          <div className="flex shrink-0 gap-2 px-1">
            <Link href="/login" className={`${compactButtonStyles} flex-1`}>
              로그인
            </Link>
            <Link href="/signup" className={`${compactSecondaryButtonStyles} flex-1`}>
              회원가입
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
