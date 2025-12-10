export const cacheStrategies = {
  static: { maxAge: 31536000, swr: true },
  dynamic: { maxAge: 60, swr: true },
  api: { maxAge: 300, swr: true },
} as const;

export type CacheStrategy = keyof typeof cacheStrategies;

export function getCacheHeaders(strategy: CacheStrategy) {
  const config = cacheStrategies[strategy];
  return {
    'Cache-Control': `public, max-age=${config.maxAge}, ${config.swr ? 'stale-while-revalidate' : 'must-revalidate'}`,
  };
}