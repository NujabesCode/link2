import type { Metadata } from "next";

export const SITE_NAME = "링크";
export const SITE_DESCRIPTION = "흩어진 링크를 폴더별로 깔끔하게 정리하는 북마크 서비스";

// public/og-image.png. Referenced explicitly because a page's own `openGraph` replaces the
// parent's wholesale, which would otherwise drop the image.
const OG_IMAGE = { url: "/og-image.png", width: 1200, height: 630, alt: `${SITE_NAME} - ${SITE_DESCRIPTION}` };

/** Open Graph + Twitter tags for a page. Pass the full title as it should appear when shared. */
export function socialMetadata(title: string, description: string): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: { type: "website", siteName: SITE_NAME, locale: "ko_KR", title, description, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  };
}

/** Per-page title/description, mirrored into the share tags. `title` goes through the root "%s | 링크" template. */
export function pageMetadata(title: string, description: string, extra: Metadata = {}): Metadata {
  return { title, description, ...socialMetadata(`${title} | ${SITE_NAME}`, description), ...extra };
}

/** For pages with nothing worth indexing (password reset flow). */
export const noIndex: Metadata = { robots: { index: false, follow: false } };
