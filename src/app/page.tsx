import {
  ExpertiseStrip,
  LatestInsights,
  Partners,
  Services,
  Stats,
} from "@/components/organisms/home-sections";
import { HomeHero } from "@/components/organisms/home-interactive";
import { SiteFooter } from "@/components/organisms/site-footer";
import { SiteHeader } from "@/components/organisms/site-header";
import { getPosts } from "@/lib/wordpress/client";

export default async function HomePage() {
  const posts = await getPosts({ perPage: 3 });
  return (
    <>
      <SiteHeader overlay />
      <main>
        <HomeHero />
        <ExpertiseStrip />
        <Stats />
        <Services />
        <LatestInsights posts={posts.items} />
        <Partners />
      </main>
      <SiteFooter />
    </>
  );
}
