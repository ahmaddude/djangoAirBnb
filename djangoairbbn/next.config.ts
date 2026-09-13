import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
      remotePatterns: [
        {
        protocol: 'https',
        hostname: 'npqwruxizyiyrjentlpi.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      ],
      dangerouslyAllowLocalIP: true,
    },
  };

export default nextConfig;
