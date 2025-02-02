import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 環境変数の設定 */
  env: {
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
