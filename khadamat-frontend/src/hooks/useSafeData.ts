'use client';

import { useState, useEffect } from 'react';

export function useSafeData<T>(
  fetchFn: () => Promise<T[] | { data: T[] }>,
  deps: any[] = []
) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetch = async () => {
      try {
        setIsLoading(true);
        const response = await fetchFn();

        if (cancelled) return;

        const safeData = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
          ? response.data
          : [];

        setData(safeData);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setData([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetch();
    return () => { cancelled = true; };
  }, deps);

  return { data, isLoading, error };
}