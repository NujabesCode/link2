"use client";

import { useRef, useState, useTransition, type FormEvent } from "react";
import { useBookmarks } from "./BookmarksProvider";
import { buttonStyles, compactSecondaryButtonStyles, secondaryButtonStyles } from "./Button";
import { fieldStyles, labelStyles } from "./fieldStyles";
import { MAX_FOLDER_NAME_LENGTH, validateFolderName } from "./folderName";
import Modal from "./Modal";

export default function NewFolderButton() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { folders, addFolder } = useBookmarks();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function close() {
    dialogRef.current?.close();
  }

  // Fires for Esc, backdrop click, cancel and save alike.
  function handleClose() {
    formRef.current?.reset();
    setError(null);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = String(new FormData(e.currentTarget).get("name") ?? "").trim();

    const nameError = validateFolderName(name, folders);
    if (nameError) return setError(nameError);

    startTransition(async () => {
      const result = await addFolder(name);
      if (result.ok) close();
      else setError(result.error);
    });
  }

  return (
    <>
      <button type="button" onClick={() => dialogRef.current?.showModal()} className={compactSecondaryButtonStyles}>
        + 새 폴더
      </button>
      <Modal ref={dialogRef} labelledBy="new-folder-title" onClose={handleClose}>
        <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
          <h2 id="new-folder-title" className="text-xl leading-[1.4] font-bold">
            새 폴더 만들기
          </h2>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="folder-name" className={labelStyles}>
              폴더 이름
            </label>
            <input
              id="folder-name"
              name="name"
              type="text"
              autoComplete="off"
              placeholder="예: 읽을거리"
              maxLength={MAX_FOLDER_NAME_LENGTH}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "folder-name-error" : undefined}
              className={fieldStyles}
            />
            {error && (
              <p id="folder-name-error" role="alert" className="text-[13px] leading-[1.4] text-[var(--error)]">
                {error}
              </p>
            )}
          </div>
          <div className="mt-2 flex gap-2">
            <button type="button" onClick={close} className={`${secondaryButtonStyles} flex-1`}>
              취소
            </button>
            <button type="submit" disabled={pending} className={`${buttonStyles} flex-1`}>
              {pending ? "저장 중…" : "저장"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
