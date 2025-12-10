'use client';

import { useState, useEffect } from 'react';
import apiClientInstance from '@/lib/api-client';
import { ServiceCategoryApiResponse, mapServiceCategoriesApiToUI } from '@/types/api-dtos';

interface Service {
  id: string;
  name: string;
  category: string;
}

export function PopularServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await apiClientInstance.getCategories();
        const mappedCategories = mapServiceCategoriesApiToUI(response);
        // Map to Service interface
        const mappedServices: Service[] = mappedCategories.map(cat => ({
          id: cat.id,
          name: cat.name,
          category: cat.description || ''
        }));
        setServices(mappedServices);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setServices([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (isLoading) return <div className="text-center py-8">Loading services...</div>;
  if (error) return <div className="text-red-500">Error loading services</div>;
  if (services.length === 0) return <div className="text-gray-500">No services found</div>;

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-6">Popular Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {services.map((service: any) => (
          <div key={service.id} className="border rounded-lg p-4">
            <h3 className="font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-600">{service.category}</p>
          </div>
        ))}
      </div>
    </section>
  );
}