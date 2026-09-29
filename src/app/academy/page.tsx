import type { Metadata } from "next";
import { AcademyPage } from "@/components/organisms/academy-page";
import { getAcademyPageContent } from "@/lib/wordpress/academy-page";

export const metadata: Metadata = { title: "Academy" };

export default async function Page() {
  const content = await getAcademyPageContent();
  return <AcademyPage content={content} />;
}
