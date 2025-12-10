'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/lib/toast-context';
import { api } from '@/lib/api';
import { City } from '@/types/api';
import { CityUI, mapCitiesApiToUI } from '@/types/api-dtos';
import { User, Camera, Lock } from 'lucide-react';

export default function ClientProfilePage() {
  const { user } = useAuth();
  const { success } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cityId: '',
    address: '',
  });

  const [cities, setCities] = useState<CityUI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load user data and cities
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.clientProfile?.firstName || '',
        lastName: user.clientProfile?.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        cityId: user.clientProfile?.cityId || '',
        address: user.clientProfile?.address || '',
      });
    }

    // Fetch cities
    const fetchCities = async () => {
      try {
        const citiesData = await api.getCities();
        const mappedCities = mapCitiesApiToUI(citiesData);
        setCities(mappedCities);
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      }
    };

    fetchCities();
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = () => {
    console.log('Avatar change clicked');
    // Simulate upload
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      success('Profile updated successfully!');
    }, 1000);
  };

  const handleChangePassword = () => {
    console.log('Change password clicked');
    // Placeholder for modal
  };

  const getInitials = () => {
    const first = formData.firstName || 'U';
    const last = formData.lastName || 'U';
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  };

  const selectedCity = cities.find(city => city.id === formData.cityId);

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-text-primary mb-8">
            Mon Profil
          </h1>

          <Card className="p-8">
            {/* Profile Photo Section */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-600">
                    {getInitials()}
                  </span>
                </div>
                <button
                  onClick={handleAvatarChange}
                  className="absolute -bottom-2 -right-2 bg-primary-500 text-white p-2 rounded-full hover:bg-primary-600 transition-colors"
                  aria-label="Change photo"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-text-primary">
                  Photo de profil
                </h2>
                <p className="text-text-secondary">
                  Cliquez sur l'icône pour modifier votre photo
                </p>
              </div>
            </div>

            {/* Personal Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-text-primary mb-6">
                Informations personnelles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Prénom"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Votre prénom"
                />
                <Input
                  label="Nom"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Votre nom"
                />
                <Input
                  label="Email"
                  value={formData.email}
                  disabled
                  className="bg-gray-50"
                />
                <Input
                  label="Téléphone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Votre numéro de téléphone"
                />
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-text-primary">
                    Ville
                  </label>
                  <select
                    value={formData.cityId}
                    onChange={(e) => handleInputChange('cityId', e.target.value)}
                    className="block w-full rounded-3xl border bg-surface px-3 py-2 text-text-primary placeholder-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
                  >
                    <option value="">Sélectionnez une ville</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  label="Adresse"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Votre adresse"
                />
              </div>
            </div>

            {/* Security Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-text-primary mb-6">
                Sécurité
              </h2>
              <Button
                variant="outline"
                onClick={handleChangePassword}
                className="flex items-center space-x-2"
              >
                <Lock className="h-4 w-4" />
                <span>Changer le mot de passe</span>
              </Button>
            </div>

            {/* Actions */}
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="min-w-[120px]"
              >
                {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}