import type { Metadata } from "next";
import { CareersPage } from "@/components/organisms/careers-page";
import { getCareersPageContent } from "@/lib/wordpress/careers-page";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Native Insight and help shape the future of African digital economy insights.",
};

export default async function Page() {
  const content = await getCareersPageContent();
  return <CareersPage content={content} />;
}
