import type { Metadata } from "next";
import { ReportsPage } from "@/components/organisms/reports-page";
import { getContentByType } from "@/lib/wordpress/client";
import { getReportDownloadHref } from "@/lib/wordpress/report-detail";
import { getReportsPageContent } from "@/lib/wordpress/reports-page";
import type { WpPost } from "@/types/wordpress";

export const metadata: Metadata = { title: "Reports" };

export default async function Page() {
  const [content, reports] = await Promise.all([
    getReportsPageContent(),
    getContentByType<WpPost>("report"),
  ]);
  const sortedReports = [...reports.items].sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date),
  );
  const latestDownloadHref = sortedReports[0]
    ? await getReportDownloadHref(sortedReports[0])
    : undefined;

  return (
    <ReportsPage
      content={content}
      reports={sortedReports}
      latestDownloadHref={latestDownloadHref}
    />
  );
}
