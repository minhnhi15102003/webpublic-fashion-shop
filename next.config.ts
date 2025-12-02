import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/webpublic-fashion-shop",
  assetPrefix: "/webpublic-fashion-shop/",
};

export default nextConfig;
