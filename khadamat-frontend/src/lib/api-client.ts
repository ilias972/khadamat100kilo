import axios from 'axios';

// Configuration vers le Backend Port 4000
const API_URL = 'http://localhost:4000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('khadamat_access_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const apiClientInstance = {
  // --- AUTH & USER ---
  getProfile: async () => {
    const response = await axiosInstance.get('/user/profile');
    return response.data;
  },
  
  updateProfile: async (data: any) => {
    const response = await axiosInstance.patch('/user/profile', data);
    return response.data;
  },

  // --- SERVICES & LOCATIONS ---
  getCategories: async () => {
    const response = await axiosInstance.get('/services/categories');
    return response.data;
  },

  getCities: async () => {
    const response = await axiosInstance.get('/locations/cities');
    return response.data;
  },

  // --- 👇 AJOUT CRUCIAL : LA FONCTION QUI MANQUAIT 👇 ---
  getPros: async (params?: { isVerified?: boolean; limit?: number; minRating?: number }) => {
    const response = await axiosInstance.get('/pros', { params });
    return response.data;
  },
  // -----------------------------------------------------

  // --- AUTRES MÉTHODES ---
  getMyBookings: async () => {
    const response = await axiosInstance.get('/bookings');
    return response.data;
  },
  
  getConversations: async () => {
    const response = await axiosInstance.get('/messaging/conversations');
    return response.data;
  },
  
  client: axiosInstance,
};

export default apiClientInstance;