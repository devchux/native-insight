import type { Metadata } from "next";
import { ArticleCard } from "@/components/molecules/article-card";
import { Container } from "@/components/atoms/container";
import { PageShell } from "@/components/organisms/page-shell";
import { getPosts } from "@/lib/wordpress/client";

export const metadata: Metadata = { title: "Insights" };

export default async function InsightsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? 1));
  const posts = await getPosts({ page, perPage: 9 });
  return (
    <PageShell title="Ideas for Africa's next chapter." kicker="Insights" introduction="Research, analysis and informed perspectives on the forces shaping African economies, institutions and businesses.">
      <Container as="section" className="py-[clamp(64px,9vw,110px)]">
        {posts.items[0] ? <ArticleCard post={posts.items[0]} featured /> : null}
        <div className="mt-7 grid gap-7 md:grid-cols-2 lg:grid-cols-3">{posts.items.slice(1).map((post) => <ArticleCard key={post.id} post={post} />)}</div>
      </Container>
    </PageShell>
  );
}
