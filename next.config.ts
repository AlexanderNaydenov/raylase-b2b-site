import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://app.hygraph.com",
          },
        ],
      },
    ];
  },
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
