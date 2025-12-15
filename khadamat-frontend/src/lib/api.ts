import axios from 'axios';
import apiClientInstance from './api-client';

// Configuration de base
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
export const API_URL = `${BASE_URL}/api`;

console.log('API Target:', API_URL);

// ============================================
// MÉTHODES API PUBLIQUES (Homepage)
// ============================================

/**
 * Récupérer toutes les catégories de services
 */
export const getCategories = async () => {
  try {
    const response = await apiClientInstance.getCategories();
    return response;
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Fallback : retourner des catégories par défaut
    return [
      { id: '1', name: 'Plomberie', icon: '🔧', count: 150 },
      { id: '2', name: 'Électricité', icon: '⚡', count: 120 },
      { id: '3', name: 'Ménage', icon: '🧹', count: 200 },
      { id: '4', name: 'Jardinage', icon: '🌿', count: 80 },
      { id: '5', name: 'Peinture', icon: '🎨', count: 95 },
    ];
  }
};

/**
 * Récupérer les professionnels vedettes
 */
export const getPros = async (params?: {
  featured?: boolean;
  limit?: number;
  rating?: number;
}) => {
  try {
    const response = await apiClientInstance.getPros({
      isVerified: params?.featured || true,
      limit: params?.limit || 6,
      minRating: params?.rating || 4.5,
    } as any);
    return response;
  } catch (error) {
    console.error('Error fetching professionals:', error);
    // Fallback : retourner des pros fictifs
    return {
      data: [
        {
          id: '1',
          name: 'Mohamed Alami',
          profession: 'Plombier Expert',
          rating: 4.9,
          reviewsCount: 156,
          avatar: '/avatars/default.jpg',
          verified: true,
        },
        {
          id: '2',
          name: 'Fatima Zahra',
          profession: 'Électricienne',
          rating: 4.8,
          reviewsCount: 142,
          avatar: '/avatars/default.jpg',
          verified: true,
        },
        {
          id: '3',
          name: 'Ahmed Bennis',
          profession: 'Peintre',
          rating: 4.7,
          reviewsCount: 98,
          avatar: '/avatars/default.jpg',
          verified: true,
        },
      ],
      count: 3,
    };
  }
};

/**
 * Récupérer les villes disponibles
 */
export const getCities = async () => {
  try {
    const response = await apiClientInstance.getCities();
    return response;
  } catch (error) {
    console.error('Error fetching cities:', error);
    // Fallback : retourner les principales villes du Maroc
    return [
      { id: '1', name: 'Casablanca', servicesCount: 450 },
      { id: '2', name: 'Rabat', servicesCount: 320 },
      { id: '3', name: 'Marrakech', servicesCount: 280 },
      { id: '4', name: 'Tanger', servicesCount: 190 },
      { id: '5', name: 'Fès', servicesCount: 160 },
      { id: '6', name: 'Agadir', servicesCount: 140 },
    ];
  }
};

/**
 * Récupérer les services populaires
 */
export const getPopularServices = async (params?: {
  limit?: number;
  category?: string;
}) => {
  try {
    // Pour l'instant, utiliser les catégories comme services populaires
    const categories = await getCategories();
    return {
      data: categories.slice(0, params?.limit || 8),
      count: categories.length,
    };
  } catch (error) {
    console.error('Error fetching popular services:', error);
    return { data: [], count: 0 };
  }
};

/**
 * Récupérer les statistiques globales (pour Hero section)
 */
export const getStats = async () => {
  try {
    // Essayer d'obtenir les stats depuis le backend si disponible
    const response = await axios.get(`${BASE_URL}/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    // Fallback : retourner des stats par défaut
    return {
      totalServices: 1250,
      totalProfessionals: 450,
      totalBookings: 3200,
      averageRating: 4.7,
    };
  }
};

// ============================================
// API COMPLÈTE AVEC TOUTES LES MÉTHODES
// ============================================

const api = {
  // Méthodes depuis api-client (inclut toutes les méthodes dont les nouvelles)
  ...apiClientInstance,

  // Méthodes locales (override si nécessaire)
  getCategories,
  getPros,
  getCities,
  getPopularServices,
  getStats,

  // Méthodes supplémentaires pour la stabilité frontend
  getFeaturedProfessionals: async () => {
    try {
      const response = await apiClientInstance.getPros({ isVerified: true, limit: 6 });
      return response;
    } catch (error) {
      console.error('Error fetching featured professionals:', error);
      return { data: [], count: 0 };
    }
  },
  getPlatformStats: async () => {
    try {
      const response = await apiClientInstance.getPlatformStats();
      return response;
    } catch (error) {
      console.error('Error fetching platform stats:', error);
      return {
        professionalsCount: 450,
        servicesCount: 1250,
        happyClients: 3200,
      };
    }
  },
  getCategoryById: async (categoryId: string) => {
    try {
      if (typeof (apiClientInstance as any).getCategoryById === 'function') {
        const response = await (apiClientInstance as any).getCategoryById(categoryId);
        return response;
      }
      const categories = await apiClientInstance.getCategories();
      return categories.find((c: any) => c.id === categoryId) || null;
    } catch (error) {
      console.error('Error fetching category by id:', error);
      return null;
    }
  },
  getServicesByCity: async (cityId?: string) => {
    try {
      // If the client supports fetching services by city, forward the cityId
      if (typeof (apiClientInstance as any).getServicesByCity === 'function') {
        const response = await (apiClientInstance as any).getServicesByCity(cityId);
        return response;
      }
      // Fallback: return categories as services
      const response = await apiClientInstance.getCategories();
      return response;
    } catch (error) {
      console.error('Error fetching services by city:', error);
      return { data: [], count: 0 };
    }
  },
  searchServices: async (query: string) => {
    try {
      const response = await apiClientInstance.getPros({ search: query });
      return response;
    } catch (error) {
      console.error('Error searching services:', error);
      return { data: [], count: 0 };
    }
  },
};

// Export de l'API complète
export { api };

// Export des méthodes individuelles pour une utilisation directe
export * from './api-client';

// Export par défaut pour la compatibilité
export default api;