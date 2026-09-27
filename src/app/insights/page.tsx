import type { Metadata } from "next";
import { InsightsPage } from "@/components/organisms/insights-page";
import { getCategories, getPosts } from "@/lib/wordpress/client";
import { getInsightsPageContent } from "@/lib/wordpress/insights-page";

export const metadata: Metadata = { title: "Insights" };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const [content, categories] = await Promise.all([
    getInsightsPageContent(),
    getCategories(),
  ]);
  const selectedCategory = categories.find(
    (category) => category.slug === params.category,
  );
  const posts = await getPosts({ perPage: 9, category: selectedCategory?.id });

  return (
    <InsightsPage
      content={content}
      posts={posts}
      categories={categories}
      activeCategory={selectedCategory?.slug}
    />
  );
}
