
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'localhost'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    unoptimized: false,
  },
  compiler: {
    styledComponents: true,
    reactRemoveProperties: true,
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
  experimental: {
    optimizeCss: true,
    optimizeImages: true,
    nextScriptWorkers: true,
    cpus: 4,
    memoryLimit: 4096,
    granularChunks: true,
  },
  productionBrowserSourceMaps: false,
  compress: true,
  swcMinify: true,
  reactStrictMode: true,
  output: 'standalone',
  poweredByHeader: false,
  optimizeFonts: true,
  staticPageGenerationTimeout: 120,
};

module.exports = nextConfig;
