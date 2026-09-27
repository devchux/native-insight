import { Container } from "@/components/atoms/container";
import { PageShell } from "@/components/organisms/page-shell";
import { ArticleCard } from "@/components/molecules/article-card";
import { getContentByType } from "@/lib/wordpress/client";
import type { WpPost } from "@/types/wordpress";

export async function WpCollectionPage({ type, title, kicker, introduction }: { type: "report" | "media-piece"; title: string; kicker: string; introduction: string }) {
  const content = await getContentByType<WpPost>(type);
  return <PageShell title={title} kicker={kicker} introduction={introduction}><Container as="section" className="grid gap-7 py-[clamp(70px,9vw,120px)] md:grid-cols-2 lg:grid-cols-3">{content.items.map((item) => <ArticleCard key={item.id} post={item} />)}</Container></PageShell>;
}
