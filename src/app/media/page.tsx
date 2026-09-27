import type { Metadata } from "next";
import { WpCollectionPage } from "@/components/organisms/wp-collection-page";
export const metadata: Metadata = { title: "Media" };
export default function MediaPage() { return <WpCollectionPage type="media-piece" kicker="Media" title="Native Insight in the conversation." introduction="Interviews, commentary and public appearances from our team and collaborators." />; }
