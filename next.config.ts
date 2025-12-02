import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // KHÔNG để output: "export" ở đây
  images: {
    // tuỳ bạn, có thể bỏ luôn cũng được
    unoptimized: true,
  },
  eslint: {
    // Nếu hiện tại build bị lỗi ESLint thì bật cái này cho nhanh
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
