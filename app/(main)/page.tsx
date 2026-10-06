import FolderLinkGrid from "@/components/FolderLinkGrid";
import { getFolderName } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";

// A folder id that isn't a uuid would make Postgres reject the query, so skip the lookup.
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function generateMetadata({ searchParams }: PageProps<"/">) {
  const { folder } = await searchParams;
  const name = typeof folder === "string" && UUID.test(folder) ? await getFolderName(folder) : null;

  return name
    ? pageMetadata(`${name} 폴더`, `'${name}' 폴더에 저장한 링크를 모아 봐요.`)
    : pageMetadata("전체 링크", "폴더별로 저장한 링크를 한눈에 모아 봐요.");
}

export default async function Home({ searchParams }: PageProps<"/">) {
  const { folder } = await searchParams;
  const selectedId = typeof folder === "string" ? folder : null;

  return <FolderLinkGrid selectedId={selectedId} />;
}
