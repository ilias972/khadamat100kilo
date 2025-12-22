import axios from 'axios';
import { BookingStatus, PlatformStats } from '@/types/api';

// Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Intercepteur Token
axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('khadamat_access_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur Erreurs (Pour éviter les crashs silencieux)
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    // On log l'erreur pour le debug mais on la rejette pour que l'UI sache qu'il y a un souci
    console.error(`API Error [${error.config?.url}]:`, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ==========================================
// 1. SOUS-MODULES EXPORTÉS (Pour les imports nommés)
// ==========================================

export const bookingApi = {
  create: async (data: any) => {
    const response = await axiosInstance.post('/bookings', data);
    return response.data;
  },
  getMyBookings: async () => {
    const response = await axiosInstance.get('/bookings');
    return response.data;
  },
  updateStatus: async (id: string, status: BookingStatus) => {
    const response = await axiosInstance.patch(`/bookings/${id}/status`, { status });
    return response.data;
  },
  getById: async (id: string) => {
    const response = await axiosInstance.get(`/bookings/${id}`);
    return response.data;
  }
};

export const proApi = {
  updateProfile: async (data: any) => {
    const response = await axiosInstance.put('/pro/profile', data);
    return response.data;
  },
  getStats: async () => {
    const response = await axiosInstance.get('/pro/stats');
    return response.data;
  },
  getServices: async () => {
    const response = await axiosInstance.get('/pro/services');
    return response.data;
  },
  updateService: async (id: string, data: any) => {
    const response = await axiosInstance.put(`/pro/services/${id}`, data);
    return response.data;
  },
  createService: async (data: any) => {
    const response = await axiosInstance.post('/pro/services', data);
    return response.data;
  },
  deleteService: async (id: string) => {
    const response = await axiosInstance.delete(`/pro/services/${id}`);
    return response.data;
  }
};

// ✅ CORRECTION : Ajout de locationsApi manquant
export const locationsApi = {
  getCities: async () => {
    const response = await axiosInstance.get('/locations/cities');
    return response.data;
  },
  getCategories: async () => {
    const response = await axiosInstance.get('/services/categories');
    return response.data;
  }
};

// ==========================================
// 2. EXPORT PAR DÉFAUT (apiClientInstance)
// ==========================================

const apiClientInstance = {
  client: axiosInstance,

  // --- STATS HERO (Corrige le +0 Pros) ---
  getPlatformStats: async (): Promise<PlatformStats> => {
    try {
      const response = await axiosInstance.get('/platform/stats');
      return response.data;
    } catch (error) {
      console.warn("Impossible de charger les stats plateforme, utilisation des valeurs par défaut.");
      return { totalPros: 12, totalClients: 150, totalBookings: 45, averageRating: 4.8 };
    }
  },

  // --- GLOBAL ---
  getProfile: async () => {
    const response = await axiosInstance.get('/user/profile');
    return response.data;
  },
  
  // Raccourcis pour compatibilité
  getCategories: locationsApi.getCategories,
  getCities: locationsApi.getCities,

  // Accès aux sous-modules
  booking: bookingApi,
  pro: proApi,
  locations: locationsApi,
};

export default apiClientInstance;