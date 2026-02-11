import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com"
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "100MB"
    }
  }
};

export default nextConfig;