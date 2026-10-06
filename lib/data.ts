import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export type Folder = {
  id: string;
  name: string;
};

export type Bookmark = {
  id: string;
  title: string;
  url: string;
  description: string;
  folderId: string;
};

type BookmarkRow = { id: string; title: string; url: string; description: string; folder_id: string };

export const toBookmark = (row: BookmarkRow): Bookmark => ({
  id: row.id,
  title: row.title,
  url: row.url,
  description: row.description,
  folderId: row.folder_id,
});

/** For page titles; null when the id doesn't match a folder. */
export async function getFolderName(id: string): Promise<string | null> {
  const supabase = createClient(await cookies());
  const { data } = await supabase.from("folders").select("name").eq("id", id).maybeSingle();
  return data?.name ?? null;
}

export async function getData(): Promise<{ folders: Folder[]; bookmarks: Bookmark[] }> {
  const supabase = createClient(await cookies());
  const [folders, bookmarks] = await Promise.all([
    supabase.from("folders").select("id, name").order("created_at"),
    supabase.from("bookmarks").select("id, title, url, description, folder_id").order("created_at"),
  ]);
  if (folders.error) throw folders.error;
  if (bookmarks.error) throw bookmarks.error;
  return { folders: folders.data, bookmarks: bookmarks.data.map(toBookmark) };
}
