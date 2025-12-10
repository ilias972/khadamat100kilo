import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { User, ProProfile, Booking, ServiceCategory, City, ProService, Conversation, Message } from '@/types/api';
import { CityApiResponse, ServiceCategoryApiResponse } from '@/types/api-dtos';

// Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to inject JWT token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('khadamat_access_token');
    console.log('🔑 Token injecté:', token ? 'OUI' : 'NON');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('👉 API Request:', (config.method || 'GET').toUpperCase(), config.url, 'Token:', config.headers.Authorization || 'No token');
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('✅ API Response:', response.status, response.data);
    return response;
  },
  (error: AxiosError) => {
    console.log('❌ API Error:', error.response?.status, error.message, error.response?.data);
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - token expired or invalid
          localStorage.removeItem('khadamat_access_token');
          // Redirect to login or dispatch logout action
          console.error('Unauthorized access - token removed');
          break;
        case 403:
          console.error('Forbidden access');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Internal server error');
          break;
        default:
          console.error(`API Error: ${status}`, data);
      }
    } else if (error.request) {
      // Network error
      console.error('Network error - please check your connection');
    } else {
      console.error('Request error:', error.message);
    }

    return Promise.reject(error);
  }
);

// API Client class
class ApiClient {
  // Auth
  async login(credentials: { emailOrPhone: string; password: string }) {
    const response = await apiClient.post('/api/auth/login', credentials);
    return response.data;
  }

  async register(userData: {
    email: string;
    phone: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'CLIENT' | 'PRO';
    cityId?: string;
    profession?: string;
  }) {
    const response = await apiClient.post('/api/auth/signup', userData);
    return response.data;
  }

  async refreshToken(refreshToken: string) {
    const response = await apiClient.post('/api/auth/refresh', { refreshToken });
    return response.data;
  }

  // Professionals
  async getPros(filters?: {
    cityId?: string;
    category?: string;
    search?: string;
    minRating?: number;
    isVerified?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{
    professionals: ProProfile[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  }> {
    const params = new URLSearchParams();
    if (filters?.cityId) params.append('city', filters.cityId);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.minRating !== undefined) params.append('minRating', filters.minRating.toString());
    if (filters?.isVerified !== undefined) params.append('isVerified', filters.isVerified.toString());
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await apiClient.get<{
      professionals: ProProfile[];
      total: number;
      page: number;
      pageSize: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    }>(`/api/pros?${params.toString()}`);
    return response.data;
  }

  async getProById(id: string): Promise<ProProfile> {
    const response = await apiClient.get<ProProfile>(`/api/pros/${id}`);
    return response.data;
  }

  // Bookings
  async createBooking(data: {
    proId: string;
    serviceCategoryId: string;
    cityId: string;
    description: string;
    photos?: string[];
    scheduledDate?: string;
    timeSlot?: string;
    priceEstimate?: number;
  }): Promise<void> {
    await apiClient.post('/api/bookings', data);
  }

  // Search professionals/services
  async search(filters?: {
    cityId?: string;
    categoryId?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<any> {
    return this.getPros(filters);
  }

  // Locations
  async getCities(): Promise<CityApiResponse[]> {
    const response = await apiClient.get<CityApiResponse[]>('/api/locations/cities');
    return response.data;
  }

  async getCategories(): Promise<ServiceCategoryApiResponse[]> {
    const response = await apiClient.get<ServiceCategoryApiResponse[]>('/api/locations/categories');
    return response.data;
  }

  // Pro Dashboard
  async getProServices(proId: string): Promise<ProService[]> {
    const response = await apiClient.get<ProService[]>(`/api/pros/${proId}/services`);
    return response.data;
  }

  async getProBookings(proId: string): Promise<Booking[]> {
    const response = await apiClient.get<Booking[]>(`/api/pros/${proId}/bookings`);
    return response.data;
  }

  // Pro Services
  async createProService(data: {
    categoryId: string;
    cityId: string;
    basePrice: number;
    description: string;
  }): Promise<any> {
    const response = await apiClient.post('/api/pro/services', data);
    return response.data;
  }

  // Client Bookings
  async getMyBookings(): Promise<Booking[]> {
    const response = await apiClient.get<Booking[]>('/api/bookings/my');
    return response.data;
  }

  // Pro Stats
  async getProStats(proId: string): Promise<{
    totalBookings: number;
    completedBookings: number;
    revenue: number;
    averageRating: number;
  }> {
    const response = await apiClient.get<{
      totalBookings: number;
      completedBookings: number;
      revenue: number;
      averageRating: number;
    }>(`/api/pro/${proId}/stats`);
    return response.data;
  }

  // Platform Stats
  async getPlatformStats(): Promise<{
    totalUsers: number;
    totalPros: number;
    totalBookings: number;
    activeBookings: number;
  }> {
    const response = await apiClient.get<{
      totalUsers: number;
      totalPros: number;
      totalBookings: number;
      activeBookings: number;
    }>('/api/platform/stats');
    return response.data;
  }

  // Booking Status Update
  async updateBookingStatus(bookingId: string, status: string): Promise<Booking> {
    const response = await apiClient.patch<Booking>(`/api/bookings/${bookingId}/status`, { status });
    return response.data;
  }

  // User profile
  async getUserProfile(): Promise<User> {
    const response = await apiClient.get<User>('/api/user/profile');
    return response.data;
  }

  async updateUserProfile(data: Partial<User>): Promise<User> {
    const response = await apiClient.put<User>('/api/user/profile', data);
    return response.data;
  }

  // Password change
  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<any> {
    const response = await apiClient.patch('/api/user/change-password', data);
    return response.data;
  }

  // Messaging
  async getConversations(): Promise<Conversation[]> {
    const response = await apiClient.get<Conversation[]>('/api/conversations');
    return response.data;
  }

  async getConversationMessages(conversationId: string): Promise<Message[]> {
    const response = await apiClient.get<Message[]>(`/api/conversations/${conversationId}/messages`);
    return response.data;
  }

  async sendMessage(conversationId: string, data: { content: string }): Promise<Message> {
    const response = await apiClient.post<Message>(`/api/conversations/${conversationId}/messages`, data);
    return response.data;
  }
}

// Export singleton instance
const apiClientInstance = new ApiClient();

// Export the instance as default and also export the raw axios instance
export default apiClientInstance;
export { apiClient };

// Export specific API instances for different modules
export const bookingApi = apiClientInstance;
export const proApi = apiClientInstance;
export const locationsApi = apiClientInstance;
export const userApi = apiClientInstance;