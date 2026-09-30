import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve source files directly. WordPress already provides the image assets,
    // so an additional Next.js optimization pass can soften photography.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nativeinsightng.com",
        pathname: "/wp-content/**",
      },
    ],
  },
};

export default nextConfig;
