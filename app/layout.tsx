import type { Metadata, Viewport } from "next";
import { SITE_DESCRIPTION, SITE_NAME, socialMetadata } from "@/lib/metadata";
import "./globals.css";

// Icon: app/favicon.ico (file convention). Share thumbnail: public/og-image.png (see lib/metadata).
export const metadata: Metadata = {
  // Absolute base for og:image and other URL fields; set NEXT_PUBLIC_SITE_URL when deploying.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { template: `%s | ${SITE_NAME}`, default: SITE_NAME },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: ["북마크", "링크 저장", "링크 정리", "폴더", "bookmark"],
  ...socialMetadata(SITE_NAME, SITE_DESCRIPTION),
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
