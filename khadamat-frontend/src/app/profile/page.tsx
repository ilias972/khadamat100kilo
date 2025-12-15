'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth, useUserRole } from '@/lib/auth-context';
import { Header } from '@/components/layout/header';
import { User, Mail, Phone, MapPin, Camera, Save, Settings } from 'lucide-react';
// 👇 AJOUT CRUCIAL : Import de votre client API configuré
import apiClient from '@/lib/api-client';

export default function ProfilePage() {
  const { user } = useAuth();
  const roles = useUserRole(); // Note: variable déclarée mais pas utilisée directement dans le JSX fourni, je la laisse.
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: user?.clientProfile?.firstName || user?.proProfile?.firstName || '',
    lastName: user?.clientProfile?.lastName || user?.proProfile?.lastName || '',
    email: user?.email || '',
    phone: '', // Idéalement, récupérez cela du user context si disponible
    address: user?.clientProfile?.address || '',
    bio: user?.proProfile?.bio || '',
    experience: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 👇 FONCTION CORRIGÉE : Connectée au Backend via apiClient
  const handleSave = async () => {
    try {
      console.log('Envoi des données au backend...', formData);

      // Préparation du payload selon ce que votre api-client.ts attend
      // Note : Assurez-vous que votre backend gère aussi l'adresse et la bio si vous voulez les sauvegarder
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        // Ajoutez ici address, bio, etc. si vous avez mis à jour api-client.ts pour les accepter
      };

      await apiClient.updateProfile(payload);

      // Feedback utilisateur
      alert("Profil mis à jour avec succès !"); 
      setIsEditing(false);
      
      // Optionnel : Forcer le rechargement pour mettre à jour le header ou le contexte
      // window.location.reload(); 

    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert("Erreur lors de la sauvegarde. Vérifiez que le backend tourne sur le port 4000.");
    }
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      firstName: user?.clientProfile?.firstName || user?.proProfile?.firstName || '',
      lastName: user?.clientProfile?.lastName || user?.proProfile?.lastName || '',
      email: user?.email || '',
      phone: '',
      address: user?.clientProfile?.address || '',
      bio: user?.proProfile?.bio || '',
      experience: '',
    });
    setIsEditing(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-surface pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Mon Profil
          </h1>
          <p className="text-text-secondary">
            Gérez vos informations personnelles et professionnelles
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Photo & Basic Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                {/* Profile Photo */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                    <User className="h-16 w-16 text-white" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors duration-200">
                    <Camera className="h-5 w-5 text-white" />
                  </button>
                </div>

                {/* Basic Info */}
                <h2 className="text-xl font-semibold text-text-primary mb-1">
                  {formData.firstName} {formData.lastName}
                </h2>
                <p className="text-text-secondary mb-4">
                  {user?.role === 'PRO' ? 'Professionnel' : 'Client'}
                </p>

                {/* Role Badge */}
                <div className="mb-6">
                  <span className={`inline-block px-3 py-1 text-sm rounded-full ${
                    user?.role === 'PRO'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {user?.role === 'PRO' ? '✅ Profil Vérifié' : '👤 Client Actif'}
                  </span>
                </div>

                {/* Quick Actions */}
                <div className="w-full space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    {isEditing ? 'Annuler' : 'Modifier le profil'}
                  </Button>
                  {isEditing && (
                    <Button
                      className="w-full"
                      onClick={handleSave}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Sauvegarder
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Profile Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-6">
                Informations personnelles
              </h3>

              <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Prénom
                    </label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Nom
                    </label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                    />
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-text-muted" />
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing} // Email est souvent non-modifiable
                        className={`pl-10 ${!isEditing ? 'bg-gray-50' : ''}`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Téléphone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-text-muted" />
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        disabled={!isEditing}
                        className={`pl-10 ${!isEditing ? 'bg-gray-50' : ''}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Adresse
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-text-muted" />
                    <Input
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      disabled={!isEditing}
                      className={`pl-10 ${!isEditing ? 'bg-gray-50' : ''}`}
                      placeholder="Votre adresse complète"
                    />
                  </div>
                </div>

                {/* Pro-specific fields */}
                {user?.role === 'PRO' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Biographie professionnelle
                      </label>
                      <Textarea
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-gray-50' : ''}
                        placeholder="Décrivez votre expérience et vos spécialités..."
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Années d'expérience
                      </label>
                      <Input
                        type="number"
                        value={formData.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-gray-50' : ''}
                        placeholder="Ex: 5"
                      />
                    </div>
                  </>
                )}

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex space-x-4 pt-4">
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Sauvegarder les modifications
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Annuler
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Account Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8"
        >
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-text-primary mb-6">
              Paramètres du compte
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-text-primary">Sécurité</h4>
                <Button variant="outline" className="w-full justify-start">
                  Changer le mot de passe
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Activer l'authentification à deux facteurs
                </Button>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-text-primary">Notifications</h4>
                <Button variant="outline" className="w-full justify-start">
                  Préférences de notification
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Gestion des emails marketing
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
    </>
  );
}