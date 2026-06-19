import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
      },
    ],
  },

  async rewrites() {
    return [
      {
        // запити на /api/* на бек
        source: "/api/:path*",
        destination: "http://localhost:4010/api/:path*",
      },
    ];
  },
};

export default nextConfig;
