import type { Metadata } from "next";
import { MediaPage } from "@/components/organisms/media-page";
import { getMediaPageContent } from "@/lib/wordpress/media-page";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Native Insight newsroom, press coverage, field gallery and media resources.",
};

export default async function Page() {
  const content = await getMediaPageContent();
  return <MediaPage content={content} />;
}
