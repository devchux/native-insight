import type { Metadata } from "next";
import { WpCollectionPage } from "@/components/organisms/wp-collection-page";
export const metadata: Metadata = { title: "Reports" };
export default function ReportsPage() { return <WpCollectionPage type="report" kicker="Reports" title="Evidence you can use." introduction="Original research and practical intelligence for decision-makers working across African markets." />; }
