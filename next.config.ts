import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/gallery",
      },
      {
        source: "/index",
        destination: "/overview",
      },
    ];
  },
};

export default nextConfig;
