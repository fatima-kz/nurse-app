import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Add the domains here that you want to allow for Next.js Image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '**', // This allows any path from the hostname
      },
      // You can add more domains if you use images from other external sources
      // {
      //   protocol: 'https',
      //   hostname: 'another-image-domain.com',
      // },
    ],
  },
};

export default nextConfig;
