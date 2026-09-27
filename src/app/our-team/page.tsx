import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/atoms/container";
import { Kicker } from "@/components/atoms/kicker";
import { SiteFooter } from "@/components/organisms/site-footer";
import { SiteHeader } from "@/components/organisms/site-header";
import { TeamMap } from "@/components/organisms/team-map";
import { decodeHtml, featuredImage } from "@/lib/content";
import { getContentByType } from "@/lib/wordpress/client";
import type { WpPost } from "@/types/wordpress";

export const metadata: Metadata = { title: "Our Team" };

const order = [
  "uju-ikedionu",
  "idris-shonubi",
  "olawale-kasali",
  "ikechukwu-okafor",
  "amam-okafor",
  "chukwuma-dim",
  "gideon-ndubuisi",
];
const roles: Record<string, string> = {
  "uju-ikedionu": "Fintech & Data Insight",
  "idris-shonubi": "Agritech & Data Insight",
  "olawale-kasali": "Modelling & Advancement",
  "ikechukwu-okafor": "Energytech & Finance",
  "amam-okafor": "Digital Economy",
  "chukwuma-dim": "Finance And Big Data",
  "gideon-ndubuisi": "Green Industrialization & Structural Change",
};

export default async function TeamPage() {
  const response = await getContentByType<WpPost>("team");
  const team = [...response.items].sort(
    (a, b) => order.indexOf(a.slug) - order.indexOf(b.slug),
  );
  return (
    <>
      <SiteHeader />
      <main className="team-page">
        <section className="team-hero">
          <Container>
            <Kicker>The people behind the insight</Kicker>
            <h1>Our team and network</h1>
            <p className="team-intro">
              We have a team of agile consultants located in different cities
              across Africa, Europe and North America. Our consultants embody
              our values, and work hard to deliver excellence for our clients
              every day.
            </p>
          </Container>
        </section>
        <section className="team-map-section">
          <Container>
            <TeamMap />
            <p className="team-network-copy">
              ...plus a network of{" "}
              <strong>40+ consultants and field researchers</strong> mobilised
              across 20 markets — the reach that makes every engagement
              sector-specific.
            </p>
          </Container>
        </section>
        <section className="team-leadership">
          <Container>
            <Kicker>Leadership</Kicker>
            <h2>The minds steering the research.</h2>
            <div className="team-grid">
              {team.map((person) => {
                const image = featuredImage(person);
                return (
                  <article key={person.id} className="team-person">
                    <div className="team-person-photo">
                      {image ? (
                        <Image
                          src={image.source_url}
                          alt={image.alt_text || ""}
                          fill
                          sizes="(min-width: 1024px) 22vw, (min-width: 560px) 48vw, 100vw"
                        />
                      ) : null}
                    </div>
                    <h3>{decodeHtml(person.title.rendered)}</h3>
                    <p>{roles[person.slug] ?? "Native Insight consultant"}</p>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter ctaTitle="Reach out to us" />
    </>
  );
}
