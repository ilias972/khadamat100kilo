'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner'; // ✅ On utilise Sonner comme partout ailleurs
import { proApi } from '@/lib/api-client'; // ✅ Vraie API
import { ServiceModal } from '@/components/dashboard/pro/service-modal';
import { Edit, Plus, Package, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';

// Définition du type local si pas encore dans @/types/api
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // en minutes
  category: string;
  isActive: boolean;
}

export default function ProServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // 1. Charger les services depuis la BDD
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await proApi.getServices();
      // On s'assure que c'est bien un tableau
      setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erreur chargement services:", error);
      toast.error("Impossible de charger vos services.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Activer / Désactiver un service
  const handleToggleActive = async (serviceId: string, currentStatus: boolean) => {
    // Optimisme UI : on change tout de suite visuellement
    setServices(prev => prev.map(s => s.id === serviceId ? { ...s, isActive: !s.isActive } : s));

    try {
      await proApi.updateService(serviceId, { isActive: !currentStatus });
      toast.success(currentStatus ? 'Service désactivé' : 'Service activé');
    } catch (error) {
      // Si ça rate, on remet comme avant
      setServices(prev => prev.map(s => s.id === serviceId ? { ...s, isActive: currentStatus } : s));
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const handleAddService = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  // 3. Sauvegarder (Création ou Modif)
  const handleSaveService = async (serviceData: any) => {
    try {
      // On ferme la modal tout de suite pour l'UX
      setIsModalOpen(false); 
      
      if (editingService) {
        // --- MISE À JOUR ---
        const updated = await proApi.updateService(editingService.id, serviceData);
        setServices(prev => prev.map(s => s.id === updated.id ? updated : s));
        toast.success('Service modifié avec succès');
      } else {
        // --- CRÉATION ---
        const created = await proApi.createService(serviceData);
        setServices(prev => [...prev, created]);
        toast.success('Service ajouté avec succès');
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'enregistrement du service");
      // On rouvre la modal en cas d'erreur si besoin
      setIsModalOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#F97B22]" />
      </div>
    );
  }

  return (
    <div className="p-6 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 font-heading">
              Mes Services
            </h1>
            <p className="text-gray-500">
              Gérez les prestations que vous proposez aux clients
            </p>
          </div>
          <Button 
            onClick={handleAddService} 
            className="bg-[#F97B22] hover:bg-[#e06c1b] text-white flex items-center space-x-2 px-6 py-2 rounded-xl shadow-md transition-all"
          >
            <Plus className="h-5 w-5" />
            <span className="font-bold">Ajouter un service</span>
          </Button>
        </motion.div>

        {/* État Vide */}
        {services.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200"
          >
            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <Package className="h-12 w-12 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Vous n'avez pas encore de services
            </h3>
            <p className="text-gray-500 max-w-md mb-8">
                Ajoutez votre premier service pour commencer à recevoir des réservations.
            </p>
            <Button onClick={handleAddService} className="bg-[#F97B22] hover:bg-[#e06c1b] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Créer mon premier service
            </Button>
          </motion.div>
        ) : (
          /* Grille des Services */
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
              >
                <Card className={`p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 ${!service.isActive ? 'opacity-75 bg-gray-50' : 'bg-white'}`}>
                  
                  {/* En-tête Carte */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                        {service.name}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {service.category}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditService(service)}
                      className="text-gray-400 hover:text-[#F97B22] hover:bg-orange-50 rounded-full h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Prix & Durée */}
                  <div className="flex items-baseline gap-2 mb-4">
                     <span className="text-2xl font-bold text-[#F97B22]">
                        {service.price} <span className="text-sm font-normal text-gray-500">DH</span>
                     </span>
                     {service.duration && (
                        <span className="text-xs text-gray-400 flex items-center gap-1 ml-auto">
                            <Clock className="w-3 h-3" /> {service.duration} min
                        </span>
                     )}
                  </div>

                  <p className="text-sm text-gray-500 mb-6 line-clamp-2 h-10">
                    {service.description || "Aucune description fournie."}
                  </p>

                  {/* Footer Carte (Toggle) */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className={`text-sm font-medium flex items-center gap-1.5 ${service.isActive ? 'text-green-600' : 'text-gray-400'}`}>
                      {service.isActive ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      {service.isActive ? 'En ligne' : 'Hors ligne'}
                    </span>
                    
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={service.isActive}
                        onChange={() => handleToggleActive(service.id, service.isActive)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F97B22]"></div>
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