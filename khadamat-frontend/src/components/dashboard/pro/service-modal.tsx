'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
// ✅ On garde locationsApi pour les listes déroulantes
import { locationsApi } from '@/lib/api-client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

// On définit l'interface localement ou on l'importe des types partagés
interface Service {
  id?: string;
  name?: string;
  category?: string;
  categoryId?: string;
  cityId?: string;
  price: number;
  description: string;
  duration?: number;
  isActive?: boolean;
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void; // Le parent gère la logique API
  editingService: Service | null;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingService,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Champs du formulaire
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [cityId, setCityId] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('60'); // Défaut 1h
  const [description, setDescription] = useState('');

  // Données pour les selects
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const isEditing = !!editingService;

  // 1. Charger les Villes et Catégories au montage
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        const [cats, cits] = await Promise.all([
          locationsApi.getCategories(),
          locationsApi.getCities()
        ]);
        setCategories(cats || []);
        setCities(cits || []);
      } catch (error) {
        console.error(error);
        toast.error('Impossible de charger les listes (villes/catégories)');
      } finally {
        setIsLoadingData(false);
      }
    };
    if (isOpen) fetchData();
  }, [isOpen]);

  // 2. Remplir le formulaire si on est en mode Édition
  useEffect(() => {
    if (isOpen) {
      if (editingService) {
        setName(editingService.name || '');
        // Note: L'API doit renvoyer categoryId, sinon on essaie de mapper avec le nom
        setCategoryId(editingService.categoryId || ''); 
        setCityId(editingService.cityId || '');
        setPrice(editingService.price.toString());
        setDuration(editingService.duration?.toString() || '60');
        setDescription(editingService.description || '');
      } else {
        // Reset pour création
        setName('');
        setCategoryId('');
        setCityId('');
        setPrice('');
        setDuration('60');
        setDescription('');
      }
    }
  }, [isOpen, editingService]);

  const handleSubmit = async () => {
    // Validation basique
    if (!price || parseFloat(price) <= 0) {
      toast.error('Le prix doit être valide.');
      return;
    }
    if (!description) {
      toast.error('La description est requise.');
      return;
    }
    if (!isEditing && (!categoryId || !cityId)) {
        toast.error('Veuillez sélectionner une catégorie et une ville.');
        return;
    }

    setIsSubmitting(true);

    // Construction de l'objet à envoyer
    const serviceData = {
      // Si on édite, on garde l'ID
      ...(isEditing && { id: editingService.id }),
      
      // Champs
      name: name || (categories.find(c => c.id === categoryId)?.name) || 'Nouveau Service',
      categoryId,
      cityId,
      price: parseFloat(price),
      duration: parseInt(duration),
      description,
      // On garde le statut actif si on édite, sinon true par défaut
      isActive: isEditing ? editingService.isActive : true,
    };

    try {
        // ✅ On délègue tout au parent via onSave
        await onSave(serviceData);
        // Le parent s'occupe de fermer la modal si succès, 
        // ou on peut le faire ici si onSave n'est pas async pour la fermeture
        // onClose(); (Géré par le parent dans ton code précédent)
    } catch (e) {
        console.error(e);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Modifier le service' : 'Ajouter un service'}
      size="md"
    >
      <div className="space-y-5">
        
        {/* En mode création, on demande Catégorie et Ville */}
        {!isEditing && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                disabled={isLoadingData}
                className="block w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-gray-900 focus:border-[#F97B22] focus:outline-none focus:ring-1 focus:ring-[#F97B22]"
              >
                <option value="">Choisir...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ville
              </label>
              <select
                value={cityId}
                onChange={(e) => setCityId(e.target.value)}
                disabled={isLoadingData}
                className="block w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-gray-900 focus:border-[#F97B22] focus:outline-none focus:ring-1 focus:ring-[#F97B22]"
              >
                <option value="">Choisir...</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Nom personnalisé (Optionnel) */}
        <Input
          label="Titre du service (ex: Réparation Fuite)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={categories.find(c => c.id === categoryId)?.name || "Nom du service"}
        />

        <div className="grid grid-cols-2 gap-4">
            <Input
            label="Prix (DH)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="150"
            />
            
            {/* ✅ NOUVEAU : Champ Durée */}
            <Input
            label="Durée estimée (min)"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="60"
            />
        </div>

        <Textarea
          label="Description détaillée"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Décrivez ce que comprend ce service..."
          rows={4}
        />

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
          <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Annuler
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="bg-[#F97B22] hover:bg-[#e06c1b] text-white min-w-[120px]"
          >
            {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            {isEditing ? 'Modifier' : 'Créer'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};