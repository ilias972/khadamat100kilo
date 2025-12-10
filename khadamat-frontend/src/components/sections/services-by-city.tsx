'use client';

import { useSafeData } from '@/hooks/useSafeData';
import { api } from '@/lib/api';

export function ServicesByCity() {
  const { data: services, isLoading, error } = useSafeData(
    () => api.getServicesByCity(),
    []
  );

  if (isLoading) return <div className="text-center py-8">Loading services by city...</div>;
  if (error) return <div className="text-red-500">Error loading services</div>;
  if (services.length === 0) return <div className="text-gray-500">No services found for your city</div>;

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-6">Services in Your City</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service: any) => (
          <div key={service.id} className="border rounded-lg p-4">
            <h3 className="font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-600">{service.category}</p>
            <p className="text-sm text-gray-500">{service.city}</p>
          </div>
        ))}
      </div>
    </section>
  );
}