import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com','images.pexels.com','pexels.com'], // Add the domains you use for external images
     // Add the domains you use for external images
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
