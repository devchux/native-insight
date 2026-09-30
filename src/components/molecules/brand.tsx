import Image from "next/image";
import Link from "next/link";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label="Native Insight home" className="relative block h-9.5 w-31.5 shrink-0">
      <Image
        src={light
          ? "https://cms.nativeinsightng.com/wp-content/mu-plugins/native-insight/assets/ni-logo-white.png"
          : "https://cms.nativeinsightng.com/wp-content/mu-plugins/native-insight/assets/ni-logo.png"}
        alt="Native Insight"
        fill
        priority
        sizes="126px"
        className="object-contain object-left"
      />
    </Link>
  );
}
