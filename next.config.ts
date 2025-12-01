import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://campus-backend-1-uo30.onrender.com/api/:path*',
      },
    ];
  }
};

export default nextConfig;
