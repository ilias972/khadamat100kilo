'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { proApi, locationsApi } from '@/lib/api-client';
import { ProService } from '@/lib/mocks/pro-services-mocks';
import { toast } from 'sonner';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: Omit<ProService, 'id'> | ProService) => void;
  editingService: ProService | null;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingService,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);

  const isEditing = !!editingService;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, cits] = await Promise.all([
          locationsApi.getCategories(),
          locationsApi.getCities()
        ]);
        setCategories(cats);
        setCities(cits);
      } catch (error) {
        toast.error('Erreur lors du chargement des données');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (isEditing) {
        setCategory(editingService.category);
        setPrice(editingService.price.toString());
        setDescription(editingService.description);
      } else {
        setCategory('');
        setCity('');
        setPrice('');
        setDescription('');
      }
    }
  }, [isOpen, editingService, isEditing]);

  const handleSave = async () => {
    if (parseFloat(price) <= 0 || !description.trim() || !category || !city) {
      toast.error('Tous les champs sont requis et le prix doit être supérieur à 0.');
      return;
    }

    setIsSaving(true);

    try {
      if (isEditing) {
        // For edit, keep mock for now
        const serviceData = {
          id: editingService.id,
          name: editingService.name,
          category,
          price: parseFloat(price),
          description,
          isActive: editingService.isActive,
        };
        onSave(serviceData);
      } else {
        // Create via API
        await proApi.createProService({
          categoryId: category,
          cityId: city,
          basePrice: parseFloat(price),
          description,
        });
        toast.success('Service créé avec succès');
        onClose();
        // Refresh or callback
      }
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Modifier le service' : 'Ajouter un service'}
      size="md"
    >
      <div className="space-y-4">
        {!isEditing && (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Catégorie
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full rounded-3xl border bg-surface px-3 py-2 text-text-primary focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {!isEditing && (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Ville
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="block w-full rounded-3xl border bg-surface px-3 py-2 text-text-primary focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="">Sélectionner une ville</option>
              {cities.map((cit) => (
                <option key={cit.id} value={cit.id}>
                  {cit.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {isEditing && (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Nom du service
            </label>
            <div className="block w-full rounded-3xl border bg-surface px-3 py-2 text-text-muted">
              {editingService.name}
            </div>
          </div>
        )}

        <Input
          label="Prix de base (DH)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Ex: 150"
        />

        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Décrivez le service..."
          rows={4}
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="ghost" onClick={onClose} disabled={isSaving}>
            Annuler
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};