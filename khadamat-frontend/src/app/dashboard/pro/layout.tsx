'use client';

import React, { useState } from 'react';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'; // Vérifie que le chemin est bon
import { Menu } from 'lucide-react';
import { useAuth } from '@/lib/auth-context'; // Pour récupérer les infos de Hassan

export default function ProDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth(); // On récupère l'utilisateur connecté

  // Préparation des données d'affichage
  // Si l'utilisateur n'est pas encore chargé, on met des valeurs par défaut
  const displayName = user?.firstName 
    ? `${user.firstName} ${user.lastName || ''}` 
    : 'Professionnel';
    
  const displayAvatar = user?.avatarUrl;

  return (
    <div className="h-screen flex bg-gray-50"> {/* Fond gris clair pour le contraste */}
      
      {/* 🖥️ SIDEBAR DESKTOP (Cachée sur mobile) */}
      <div className="hidden lg:flex lg:flex-shrink-0 h-full">
        <DashboardSidebar
          userType="pro"
          userName={displayName}
          userAvatar={displayAvatar}
          // Pas besoin de onClose ici
        />
      </div>

      {/* 📱 SIDEBAR MOBILE (Overlay) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Fond sombre flouté */}
          <div 
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" 
            onClick={() => setSidebarOpen(false)} 
          />
          
          {/* Le menu lui-même */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-2xl transform transition-transform">
            <DashboardSidebar
              userType="pro"
              userName={displayName}
              userAvatar={displayAvatar}
              onClose={() => setSidebarOpen(false)} // Important pour fermer après clic
              className="w-full h-full border-none"
            />
          </div>
          
          {/* Zone cliquable invisible à droite pour fermer */}
          <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
        </div>
      )}

      {/* 📄 CONTENU PRINCIPAL */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        
        {/* En-tête Mobile (Visible uniquement sur petits écrans) */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Ouvrir le menu</span>
            </button>
            <span className="font-heading font-bold text-lg text-gray-900">
              Khadamat Pro
            </span>
          </div>
          {/* Tu pourrais ajouter une cloche de notification ici pour le mobile */}
        </div>

        {/* Zone de contenu scrollable */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
}