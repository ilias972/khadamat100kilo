'use client';

import { useState, useEffect } from 'react';
import apiClientInstance from '@/lib/api-client';
import { ProProfile } from '@/types/api';

// Interface locale pour éviter les erreurs de typage si ProProfile n'est pas parfait
interface Professional {
  id: string;
  firstName: string;
  lastName: string;
  profession?: string; // Optionnel au cas où
  // Ajoutez d'autres champs si nécessaire
}

export function FeaturedProfessionals() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        setIsLoading(true);
        // On passe les paramètres demandés par votre code précédent
        const response = await apiClientInstance.getPros({
          isVerified: true,
          limit: 6,
          minRating: 4.5
        });

        console.log("Pros API Response:", response); // Pour le debug

        // 🛡️ LOGIQUE DE SÉCURITÉ RENFORCÉE
        // NestJS renvoie souvent les données, ou un objet { data: [...] }
        // On vérifie tous les cas possibles pour trouver le tableau
        let prosArray: Professional[] = [];

        if (Array.isArray(response)) {
          prosArray = response;
        } else if (response && Array.isArray(response.data)) {
          prosArray = response.data;
        } else if (response && Array.isArray(response.professionals)) {
          prosArray = response.professionals;
        }

        // Application du slice seulement si on a un tableau
        setProfessionals(prosArray.slice(0, 6));
        setError(null);

      } catch (err) {
        console.error('Error fetching professionals:', err);
        // On n'affiche pas l'erreur à l'utilisateur pour ne pas casser l'UI, on met juste vide
        setProfessionals([]); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfessionals();
  }, []);

  if (isLoading) return <div className="text-center py-8">Chargement des professionnels...</div>;
  // Si erreur ou vide, on n'affiche rien ou un message discret
  if (professionals.length === 0) return null; 

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Professionnels recommandés</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {professionals.map((pro) => (
            <div key={pro.id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg">{pro.firstName} {pro.lastName}</h3>
              <p className="text-sm text-gray-600">{pro.profession || 'Professionnel'}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}