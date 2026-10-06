import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
      remotePatterns: [
        {
        protocol: 'https',
        hostname: 'npqwruxizyiyrjentlpi.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {protocol: 'https',hostname:'picsum.photos'},
      {protocol:'https',hostname:'i.picsum.photos'},
      ],
      dangerouslyAllowLocalIP: true,
    },
  };

export default nextConfig;
