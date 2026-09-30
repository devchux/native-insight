/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    // Serve source files directly. WordPress already provides the image assets,
    // so an additional Next.js optimization pass can soften photography.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.nativeinsightng.com",
        pathname: "/wp-content/**",
      },
    ],
  },
};

export default nextConfig;
