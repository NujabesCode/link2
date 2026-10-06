"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { createBookmark, createFolder, removeFolder, updateFolderName, type Result } from "@/lib/actions";
import type { Bookmark, Folder } from "@/lib/data";

type BookmarksContextValue = {
  bookmarks: Bookmark[];
  folders: Folder[];
  addBookmark: (input: Omit<Bookmark, "id">) => Promise<Result<Bookmark>>;
  addFolder: (name: string) => Promise<Result<Folder>>;
  /** Removes the folder and every bookmark in it. */
  deleteFolder: (id: string) => Promise<Result<null>>;
  renameFolder: (id: string, name: string) => Promise<Result<Folder>>;
};

const BookmarksContext = createContext<BookmarksContextValue | null>(null);

type BookmarksProviderProps = {
  initial: Bookmark[];
  initialFolders: Folder[];
  children: ReactNode;
};

// Seeded from Supabase on the server; each change is saved there first and only
// applied locally once the database accepts it.
export default function BookmarksProvider({ initial, initialFolders, children }: BookmarksProviderProps) {
  const [bookmarks, setBookmarks] = useState(initial);
  const [folders, setFolders] = useState(initialFolders);

  async function addBookmark(input: Omit<Bookmark, "id">) {
    const result = await createBookmark(input);
    if (result.ok) setBookmarks((prev) => [...prev, result.data]);
    return result;
  }

  async function addFolder(name: string) {
    const result = await createFolder(name);
    if (result.ok) setFolders((prev) => [...prev, result.data]);
    return result;
  }

  async function renameFolder(id: string, name: string) {
    const result = await updateFolderName(id, name);
    if (result.ok) setFolders((prev) => prev.map((f) => (f.id === id ? result.data : f)));
    return result;
  }

  async function deleteFolder(id: string) {
    const result = await removeFolder(id);
    if (result.ok) {
      setFolders((prev) => prev.filter((f) => f.id !== id));
      setBookmarks((prev) => prev.filter((b) => b.folderId !== id));
    }
    return result;
  }

  return (
    <BookmarksContext value={{ bookmarks, folders, addBookmark, addFolder, renameFolder, deleteFolder }}>
      {children}
    </BookmarksContext>
  );
}

export function useBookmarks() {
  const ctx = useContext(BookmarksContext);
  if (!ctx) throw new Error("useBookmarks must be used within BookmarksProvider");
  return ctx;
}
