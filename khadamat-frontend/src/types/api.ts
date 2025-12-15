export interface User {
  id: string;
  email: string;
  phone?: string;
  role: 'CLIENT' | 'PRO' | 'ADMIN';
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: string;
  // Ajoute d'autres champs si ton backend en renvoie plus
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token?: string; // Optionnel si tu gères le refresh
  message?: string;
}