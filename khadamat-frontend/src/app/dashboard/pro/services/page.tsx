'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/lib/toast-context';
import { mockProServices, ProService } from '@/lib/mocks/pro-services-mocks';
import { ServiceModal } from '@/components/dashboard/pro/service-modal';
import { Edit, Plus, Package } from 'lucide-react';

export default function ProServicesPage() {
  const toast = useToast();
  const [services, setServices] = useState<ProService[]>(mockProServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ProService | null>(null);

  const handleToggleActive = (serviceId: string) => {
    setServices(prev =>
      prev.map(service =>
        service.id === serviceId
          ? { ...service, isActive: !service.isActive }
          : service
      )
    );
    const service = services.find(s => s.id === serviceId);
    toast.success(
      service?.isActive
        ? 'Service désactivé'
        : 'Service activé'
    );
  };

  const handleAddService = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEditService = (service: ProService) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleSaveService = (serviceData: Omit<ProService, 'id'> | ProService) => {
    if ('id' in serviceData) {
      // Update existing
      setServices(prev =>
        prev.map(service =>
          service.id === serviceData.id ? serviceData : service
        )
      );
      toast.success('Service modifié avec succès');
    } else {
      // Add new
      const newService: ProService = {
        ...serviceData,
        id: Date.now().toString(),
      };
      setServices(prev => [...prev, newService]);
      toast.success('Service ajouté avec succès');
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Mes Services
            </h1>
            <p className="text-text-secondary">
              Gérez vos services et leurs tarifs
            </p>
          </div>
          <Button onClick={handleAddService} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Ajouter un service</span>
          </Button>
        </motion.div>

        {/* Services Grid or Empty State */}
        {services.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <Package className="h-16 w-16 text-text-muted mb-4" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              Aucun service ajouté
            </h3>
            <Button onClick={handleAddService} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Ajouter un service</span>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary mb-1">
                        {service.name}
                      </h3>
                      <p className="text-sm text-text-secondary mb-2">
                        {service.category}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditService(service)}
                      className="p-2"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="text-2xl font-bold text-primary-500 mb-3">
                    {service.price} DH
                  </p>

                  <p className="text-sm text-text-secondary mb-4 line-clamp-3">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text-primary">
                      Actif
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={service.isActive}
                        onChange={() => handleToggleActive(service.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Modal */}
        <ServiceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveService}
          editingService={editingService}
        />
      </div>
    </div>
  );
}