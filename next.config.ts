import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.raylase.de",
        pathname: "/_Resources/**",
      },
    ],
  },
};

export default nextConfig;
