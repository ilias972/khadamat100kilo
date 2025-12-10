import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Strict Mode for better performance
  reactStrictMode: true,


  // Enable static HTML export for better caching
  output: 'standalone',


  // Optimize images
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Enable experimental features for better performance
  experimental: {
    // Enable optimized CSS
    optimizeCss: true,
  },

  // Enable production optimizations
  compiler: {
    // Enable React removal of console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,

    // Enable styled-components optimization
    styledComponents: true,

    // Enable emotion optimization
    emotion: true,
  },

  // Enable CDN support
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || '',

  // Enable better caching
  headers: async () => {
    return [
      {
        source: '/auth/signup',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Enable better compression
  webpack: (config, { isServer }) => {
    // Add compression plugin
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
    }

    return config;
  },
};

export default nextConfig;
