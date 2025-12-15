'use client';

import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { User, Mail, Phone, Save, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
// ✅ Import de notre client API configuré
import apiClientInstance from '@/lib/api-client';

export default function ClientProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // États du formulaire
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  
  // États de feedback
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (user) {
      // Priorité aux données du profil spécifique
      const fName = user.clientProfile?.firstName || user.firstName || '';
      const lName = user.clientProfile?.lastName || user.lastName || '';
      // Le téléphone est sur l'objet user racine selon le schema Prisma
      const phoneNum = user.phone || ''; 
      
      setFirstName(fName);
      setLastName(lName);
      setPhone(phoneNum);
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);

    try {
      // ✅ APPEL RÉEL AU BACKEND
      await apiClientInstance.updateProfile({
        firstName,
        lastName,
        phone
      });

      setMessage({ type: 'success', text: 'Profil mis à jour avec succès !' });
      
      // On recharge la page après un court délai pour mettre à jour le Header
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      console.error('Erreur update:', error);
      setMessage({ type: 'error', text: 'Erreur lors de la mise à jour.' });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
        <div className="flex h-full items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
        </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)]">
      <DashboardHeader
        title="Mon Profil"
        subtitle="Gérez vos informations personnelles"
      />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto">
          
          <Card className="p-8 mb-6 shadow-sm border border-gray-100">
            {/* Header Profil */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8 border-b border-gray-100 pb-8">
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center border-4 border-white shadow-md">
                <span className="text-3xl font-bold text-orange-600">
                  {firstName ? firstName.charAt(0).toUpperCase() : 'U'}
                  {lastName ? lastName.charAt(0).toUpperCase() : ''}
                </span>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900">
                  {firstName} {lastName}
                </h2>
                <p className="text-gray-500">{email}</p>
              </div>
            </div>

            {/* Message Feedback */}
            {message && (
                <div className={`p-4 mb-6 rounded-lg flex items-center gap-3 ${
                    message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                    {message.type === 'success' ? <CheckCircle size={20}/> : <AlertCircle size={20}/>}
                    {message.text}
                </div>
            )}

            {/* Champs du formulaire */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Prénom</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                    placeholder="Votre prénom"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nom</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full pl-10 pr-4 py-2 border bg-gray-50 text-gray-500 rounded-lg cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Téléphone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                    placeholder="+212 6..."
                  />
                </div>
              </div>

            </div>

            {/* ✅ UN SEUL BOUTON EN BAS */}
            <div className="mt-8 flex justify-end pt-6 border-t border-gray-100">
              <Button 
                onClick={handleSave} 
                disabled={loading}
                className="bg-[#F97B22] hover:bg-[#e66a1f] text-white min-w-[150px]"
              >
                {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                    <Save className="w-4 h-4 mr-2" />
                )}
                Enregistrer les modifications
              </Button>
            </div>
          </Card>

        </div>
      </main>
    </div>
  );
}