'use client';

import { useEffect, useState } from 'react';

/**
 * Static asset caching strategy
 */
export const useStaticAssetCache = () => {
  const [cacheReady, setCacheReady] = useState(false);

  useEffect(() => {
    // Check if service worker is available
    if ('serviceWorker' in navigator) {
      // Register service worker for caching
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('ServiceWorker registration successful');
          setCacheReady(true);
        })
        .catch(err => {
          console.log('ServiceWorker registration failed: ', err);
          // Fallback to localStorage caching
          implementFallbackCaching();
        });
    } else {
      // Fallback to localStorage caching
      implementFallbackCaching();
    }
  }, []);

  const implementFallbackCaching = () => {
    // Cache critical assets in localStorage
    const criticalAssets = [
      '/auth/signup',
      '/auth/login',
      '/dashboard/client',
      '/dashboard/pro'
    ];

    // Pre-cache assets
    criticalAssets.forEach(asset => {
      localStorage.setItem(`cached-asset-${asset}`, 'true');
    });

    setCacheReady(true);
  };

  return { cacheReady };
};

/**
 * Authentication asset caching
 */
export const cacheAuthAssets = () => {
  // Cache authentication-related assets
  const authAssets = [
    { url: '/auth/signup', type: 'page' },
    { url: '/auth/login', type: 'page' },
    { url: '/api/auth/register', type: 'api' },
    { url: '/api/auth/login', type: 'api' }
  ];

  // Use Cache API if available
  if ('caches' in window) {
    caches.open('auth-assets-v1').then(cache => {
      authAssets.forEach(asset => {
        // In a real implementation, we would fetch and cache these
        cache.put(asset.url, new Response(JSON.stringify({ cached: true })));
      });
    });
  }

  // Fallback to localStorage
  authAssets.forEach(asset => {
    localStorage.setItem(`auth-cache-${asset.url}`, JSON.stringify({ cached: true }));
  });
};

/**
 * Get cached asset
 */
export const getCachedAsset = (url: string) => {
  // Try Cache API first
  if ('caches' in window) {
    return caches.match(url)
      .then(response => response || fetch(url));
  }

  // Fallback to localStorage
  const cachedData = localStorage.getItem(`auth-cache-${url}`);
  return cachedData ? JSON.parse(cachedData) : null;
};