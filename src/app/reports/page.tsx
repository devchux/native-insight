import type { Metadata } from "next";
import { ReportsPage } from "@/components/organisms/reports-page";
import { getContentByType } from "@/lib/wordpress/client";
import { getReportsPageContent } from "@/lib/wordpress/reports-page";
import type { WpPost } from "@/types/wordpress";

export const metadata: Metadata = { title: "Reports" };

export default async function Page() {
  const [content, reports] = await Promise.all([
    getReportsPageContent(),
    getContentByType<WpPost>("report"),
  ]);

  return <ReportsPage content={content} reports={reports.items} />;
}
