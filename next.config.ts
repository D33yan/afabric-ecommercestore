import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   // Enable static exports
  images: {
    unoptimized: true,  // Required for static exports
    domains: ['images.unsplash.com', 'images.pexels.com', 'pexels.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
    ]
  },
};

export default nextConfig;