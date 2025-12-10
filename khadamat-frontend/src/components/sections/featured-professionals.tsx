'use client';

import { useState, useEffect } from 'react';
import apiClientInstance from '@/lib/api-client';
import { ProProfile } from '@/types/api';

export function FeaturedProfessionals() {
  const [professionals, setProfessionals] = useState<ProProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        setIsLoading(true);
        const response = await apiClientInstance.getPros();

        // Defensive check
        if (!response || !Array.isArray(response.professionals)) {
          console.error('Invalid API response:', response);
          setProfessionals([]);
          setError(new Error('Invalid API response'));
          return;
        }

        setProfessionals(response?.professionals?.slice(0, 6) || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching professionals:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setProfessionals([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfessionals();
  }, []);

  if (isLoading) return <div className="text-center py-8">Loading professionals...</div>;
  if (error) return <div className="text-red-500">Error loading professionals</div>;
  if (professionals.length === 0) return <div className="text-gray-500">No professionals found</div>;

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-6">Featured Professionals</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {professionals.map((pro: ProProfile) => (
          <div key={pro.id} className="border rounded-lg p-4">
            <h3 className="font-semibold">{pro.firstName} {pro.lastName}</h3>
            <p className="text-sm text-gray-600">{pro.profession}</p>
          </div>
        ))}
      </div>
    </section>
  );
}