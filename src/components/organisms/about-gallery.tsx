import Image from "next/image";
import { Container } from "@/components/atoms/container";
import { GalleryReveal } from "@/components/organisms/gallery-reveal";

const desktopPlacement = [
  "md:col-start-1 md:col-span-5 md:row-start-1 md:row-span-4",
  "md:col-start-6 md:col-span-3 md:row-start-1 md:row-span-2",
  "md:col-start-9 md:col-span-4 md:row-start-1 md:row-span-3",
  "md:col-start-1 md:col-span-3 md:row-start-5 md:row-span-2",
  "md:col-start-4 md:col-span-2 md:row-start-5 md:row-span-2",
  "md:col-start-6 md:col-span-3 md:row-start-3 md:row-span-4",
  "md:col-start-9 md:col-span-4 md:row-start-4 md:row-span-3",
];

export function AboutGallery({ images }: { images: string[] }) {
  return (
    <GalleryReveal>
      <Container wide className="grid grid-cols-2 gap-1.5 md:h-[clamp(510px,46vw,690px)] md:grid-cols-12 md:grid-rows-6 md:gap-3">
        {images.map((src, index) => (
          <div
            key={src}
            className={`relative aspect-4/3 overflow-hidden bg-surface first:col-span-2 first:aspect-16/10 md:aspect-auto md:first:col-span-5 md:first:aspect-auto ${desktopPlacement[index] ?? "md:col-span-3 md:row-span-2"}`}
          >
            <Image
              src={src}
              alt="Native Insight team and community"
              fill
              quality={90}
              sizes="(max-width: 767px) 50vw, (max-width: 1279px) 42vw, 33vw"
              className="gallery-scroll-image object-cover"
            />
          </div>
        ))}
      </Container>
    </GalleryReveal>
  );
}
