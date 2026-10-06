import NewLinkForm from "@/components/NewLinkForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("새 링크 추가", "저장할 링크 주소를 붙여넣고 폴더를 골라 저장해요.");

export default function NewLinkPage() {
  return (
    <>
      <div className="flex flex-col gap-1">
        <h2 className="text-[26px] leading-[1.3] font-bold">새 링크 추가</h2>
        <p className="text-[13px] leading-[1.4] text-[var(--text-sub)]">
          저장할 링크 주소를 붙여넣고 폴더를 골라주세요.
        </p>
      </div>
      <NewLinkForm />
    </>
  );
}
