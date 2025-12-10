'use client';

import React, { useState, useEffect } from 'react';
import { useMe } from '@/hooks/useAuth';
import { useToast } from '@/lib/toast-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/lib/api';
import { City } from '@/types/api';
import { CityApiResponse, mapCitiesApiToUI } from '@/types/api-dtos';
import {
  User,
  Camera,
  Trash2,
  Plus,
  Save,
  Loader2,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  FileText,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

// Mock portfolio images
const mockPortfolioImages = [
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1584622781564-1d987fa99f95?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop'
];

export default function ProSettingsPage() {
  const { data: user, isLoading: userLoading } = useMe();
  const { success, error } = useToast();

  const [activeTab, setActiveTab] = useState<'general' | 'portfolio' | 'security'>('general');
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    title: '',
    bio: '',
    cityId: '',
    available: true
  });

  const [portfolio, setPortfolio] = useState<string[]>(mockPortfolioImages.slice(0, 4));

  // Load cities and user data
  useEffect(() => {
    const loadData = async () => {
      try {
        const citiesData = await api.getCities();
        setCities(mapCitiesApiToUI(citiesData));
      } catch (err) {
        console.error('Failed to load cities:', err);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (user?.proProfile) {
      setFormData({
        fullName: `${user.proProfile.firstName} ${user.proProfile.lastName}`,
        title: user.proProfile.profession,
        bio: user.proProfile.bio || '',
        cityId: user.proProfile.cityId || '',
        available: true // Mock availability
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddPortfolioImage = () => {
    // Simulate upload
    const newImage = mockPortfolioImages[Math.floor(Math.random() * mockPortfolioImages.length)];
    setPortfolio(prev => [...prev, newImage]);
    success('Photo ajoutée au portfolio avec succès');
  };

  const handleDeletePortfolioImage = (index: number) => {
    setPortfolio(prev => prev.filter((_, i) => i !== index));
    success('Photo supprimée du portfolio');
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      success('Modifications enregistrées avec succès');
    } catch (err) {
      error('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  if (userLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-surface rounded-lg w-1/4"></div>
          <div className="space-y-4">
            <div className="h-12 bg-surface rounded-lg"></div>
            <div className="h-12 bg-surface rounded-lg"></div>
            <div className="h-24 bg-surface rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary font-heading mb-2">
          Paramètres du profil
        </h1>
        <p className="text-text-secondary">
          Gérez vos informations publiques et votre disponibilité
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-surface rounded-[24px] p-1">
          {[
            { id: 'general', label: 'Informations générales', icon: User },
            { id: 'portfolio', label: 'Portfolio', icon: Camera },
            { id: 'security', label: 'Sécurité', icon: FileText }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-[20px] text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-8">
        {activeTab === 'general' && (
          <div className="space-y-8">
            {/* Public Info Form */}
            <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6">
              <h2 className="text-xl font-bold text-text-primary mb-6 font-heading">
                Informations publiques
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Nom complet"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  startIcon={<User className="w-4 h-4" />}
                />
                <Input
                  label="Titre professionnel"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  startIcon={<Briefcase className="w-4 h-4" />}
                />
                <div className="md:col-span-2">
                  <Textarea
                    label="Biographie"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                    helperText="Décrivez votre expérience et vos spécialités"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Ville
                  </label>
                  <select
                    value={formData.cityId}
                    onChange={(e) => handleInputChange('cityId', e.target.value)}
                    className="block w-full rounded-3xl border bg-surface px-3 py-2 text-text-primary focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  >
                    <option value="">Sélectionnez une ville</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6">
              <h2 className="text-xl font-bold text-text-primary mb-6 font-heading">
                Informations de contact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Email
                  </label>
                  <div className="flex items-center space-x-3 p-3 bg-surface rounded-3xl">
                    <Mail className="w-4 h-4 text-text-muted" />
                    <span className="text-text-secondary">{user?.email}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Téléphone
                  </label>
                  <div className="flex items-center space-x-3 p-3 bg-surface rounded-3xl">
                    <Phone className="w-4 h-4 text-text-muted" />
                    <span className="text-text-secondary">{user?.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6">
              <h2 className="text-xl font-bold text-text-primary mb-6 font-heading">
                Disponibilité
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    Disponible pour les missions
                  </h3>
                  <p className="text-text-secondary">
                    Activez cette option pour recevoir de nouvelles demandes
                  </p>
                </div>
                <button
                  onClick={() => handleInputChange('available', !formData.available)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.available ? 'bg-[#F97B22]' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.available ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-primary font-heading">
                Portfolio
              </h2>
              <Button
                onClick={handleAddPortfolioImage}
                variant="primary"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter une photo</span>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {portfolio.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Portfolio ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleDeletePortfolioImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Supprimer la photo"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {portfolio.length === 0 && (
              <div className="text-center py-12">
                <Camera className="w-12 h-12 text-text-muted mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Aucun portfolio
                </h3>
                <p className="text-text-secondary mb-4">
                  Ajoutez des photos de vos travaux pour attirer plus de clients
                </p>
                <Button onClick={handleAddPortfolioImage} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter la première photo
                </Button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6">
            <h2 className="text-xl font-bold text-text-primary mb-6 font-heading">
              Sécurité
            </h2>
            <p className="text-text-secondary">
              Fonctionnalités de sécurité à implémenter...
            </p>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-2 px-8 py-3"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{saving ? 'Enregistrement...' : 'Enregistrer les modifications'}</span>
        </Button>
      </div>
    </div>
  );
}