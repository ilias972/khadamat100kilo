'use client';

import { useState, useEffect } from 'react';
import apiClientInstance from '@/lib/api-client';

interface PlatformStats {
  totalProfessionals: number;
  totalServices: number;
  totalCities: number;
}

export function Hero() {
  const [stats, setStats] = useState<PlatformStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const response = await apiClientInstance.getPlatformStats();
        // Map the API response to the expected PlatformStats format
        const mappedStats: PlatformStats[] = [{
          totalProfessionals: response.totalPros,
          totalServices: 0, // Not available in API response
          totalCities: 0    // Not available in API response
        }];
        setStats(mappedStats);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setStats([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) return <div className="text-center py-8">Loading platform data...</div>;
  if (error) return <div className="text-red-500">Error loading platform data</div>;

  return (
    <section className="py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Khadamat</h1>
      <p className="text-xl mb-8">Find the best professionals for your needs</p>

      {stats && stats.length > 0 && (
        <div className="grid grid-cols-3 gap-8">
          <div>
            <div className="text-3xl font-bold">{(stats[0] as any)?.totalProfessionals || 0}+</div>
            <div className="text-gray-600">Professionals</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{(stats[0] as any)?.totalServices || 0}+</div>
            <div className="text-gray-600">Services</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{(stats[0] as any)?.totalCities || 0}+</div>
            <div className="text-gray-600">Cities</div>
          </div>
        </div>
      )}
    </section>
  );
}