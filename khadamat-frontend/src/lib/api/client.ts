import axios from 'axios';

// ⚠️ FORCE BRUTE : On met l'adresse complète.
// Si tu vois encore une erreur vers port 3000 après ça, c'est que ce fichier n'est pas utilisé.
const BASE_URL = 'http://localhost:4000/api';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  // On force l'URL de base si jamais Axios l'a perdue
  if (!config.baseURL) {
    config.baseURL = BASE_URL;
  }
  
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('khadamat_access_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  
  // 👀 LOG CRITIQUE : Si tu vois 3000 ici, c'est impossible.
  console.log(`📡 [CLIENT] Vers : ${config.baseURL}${config.url}`);
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    // Debug amélioré
    const target = error.config ? `${error.config.baseURL}${error.config.url}` : 'Inconnu';
    console.error(`❌ [CLIENT] ECHEC vers ${target} :`, error.message);
    return Promise.reject(error);
  }
);

export default apiClient;