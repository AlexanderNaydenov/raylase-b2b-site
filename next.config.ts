import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eu-central-1-shared-euc1-02.graphassets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.raylase.de",
        pathname: "/_Resources/**",
      },
    ],
  },
};

export default nextConfig;
