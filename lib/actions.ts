"use server";

import { cookies } from "next/headers";
import { validateFolderName } from "@/components/folderName";
import { createClient } from "@/utils/supabase/server";
import { toBookmark, type Bookmark, type Folder } from "./data";

export type Result<T> = { ok: true; data: T } | { ok: false; error: string };

const DUPLICATE_NAME = "같은 이름의 폴더가 이미 있어요.";
const SAVE_FAILED = "저장하지 못했어요. 잠시 후 다시 시도해 주세요.";

async function db() {
  return createClient(await cookies());
}

// Every action is a public POST endpoint, so inputs are re-validated here.
// Duplicate names are left to the unique constraint (Postgres code 23505).
function checkName(name: unknown): string | null {
  return typeof name === "string" ? validateFolderName(name.trim(), []) : "폴더 이름을 입력해 주세요.";
}

export async function createFolder(name: string): Promise<Result<Folder>> {
  const nameError = checkName(name);
  if (nameError) return { ok: false, error: nameError };

  const { data, error } = await (await db()).from("folders").insert({ name: name.trim() }).select("id, name").single();
  if (error) return { ok: false, error: error.code === "23505" ? DUPLICATE_NAME : SAVE_FAILED };
  return { ok: true, data };
}

export async function updateFolderName(id: string, name: string): Promise<Result<Folder>> {
  const nameError = checkName(name);
  if (nameError) return { ok: false, error: nameError };

  const { data, error } = await (await db())
    .from("folders")
    .update({ name: name.trim() })
    .eq("id", id)
    .select("id, name")
    .maybeSingle();
  if (error) return { ok: false, error: error.code === "23505" ? DUPLICATE_NAME : SAVE_FAILED };
  if (!data) return { ok: false, error: "폴더를 찾을 수 없어요." };
  return { ok: true, data };
}

// Bookmarks in the folder go with it (on delete cascade).
export async function removeFolder(id: string): Promise<Result<null>> {
  const { error } = await (await db()).from("folders").delete().eq("id", id);
  if (error) return { ok: false, error: "삭제하지 못했어요. 잠시 후 다시 시도해 주세요." };
  return { ok: true, data: null };
}

export async function createBookmark(input: Omit<Bookmark, "id">): Promise<Result<Bookmark>> {
  let url: URL;
  try {
    url = new URL(input.url);
  } catch {
    return { ok: false, error: "올바른 URL을 입력해 주세요." };
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return { ok: false, error: "http 또는 https 링크만 저장할 수 있습니다." };
  }

  const { data, error } = await (await db())
    .from("bookmarks")
    .insert({
      title: String(input.title).slice(0, 300),
      url: url.href,
      description: String(input.description ?? "").slice(0, 1000),
      folder_id: input.folderId,
    })
    .select("id, title, url, description, folder_id")
    .single();
  if (error) return { ok: false, error: SAVE_FAILED };
  return { ok: true, data: toBookmark(data) };
}
