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
      <Container wide className="flex gap-3 overflow-x-auto pr-5 snap-x snap-mandatory md:grid md:h-[clamp(510px,46vw,690px)] md:grid-cols-12 md:grid-rows-6 md:overflow-visible md:pr-[clamp(20px,5vw,64px)]">
        {images.map((src, index) => (
          <div key={src} className={`relative h-77.5 min-w-[min(78vw,420px)] snap-start overflow-hidden bg-surface md:h-auto md:min-w-0 ${desktopPlacement[index] ?? "md:col-span-3 md:row-span-2"}`}>
            <Image
              src={src}
              alt="Native Insight team and community"
              fill
              sizes="(max-width: 767px) 80vw, 33vw"
              className="gallery-scroll-image object-cover"
            />
          </div>
        ))}
      </Container>
    </GalleryReveal>
  );
}
