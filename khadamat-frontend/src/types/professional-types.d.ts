/**
 * Comprehensive type definitions for professional-related components
 * Replaces `any` usage in professional components and hooks
 */

/**
 * Professional Status
 */
export type ProfessionalStatus = 'active' | 'inactive' | 'suspended' | 'pending';

/**
 * Professional Verification Status
 */
export type VerificationStatus = 'verified' | 'pending' | 'rejected' | 'unverified';

/**
 * Professional Premium Status
 */
export type PremiumStatus = 'free' | 'premium' | 'premium_plus';

/**
 * Professional Rating
 */
export interface ProfessionalRating {
  average: number;
  count: number;
  distribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

/**
 * Professional Contact Information
 */
export interface ProfessionalContact {
  email: string;
  phone: string;
  whatsapp?: string;
  website?: string;
}

/**
 * Professional Location
 */
export interface ProfessionalLocation {
  cityId: string;
  cityName: string;
  region?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  serviceRadius?: number; // in kilometers
}

/**
 * Professional Service Category
 */
export interface ProfessionalServiceCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  isActive: boolean;
}

/**
 * Professional Service
 */
export interface ProfessionalService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string; // e.g., "1h30", "30min"
  category: string;
  isActive: boolean;
  bookingCount?: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Professional Working Hours
 */
export interface ProfessionalWorkingHours {
  monday: string; // "09:00-17:00"
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

/**
 * Professional Portfolio Item
 */
export interface ProfessionalPortfolioItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
  createdAt: string;
  tags?: string[];
}

/**
 * Professional Certification
 */
export interface ProfessionalCertification {
  id: string;
  title: string;
  issuer: string;
  year: number;
  description?: string;
  documentUrl?: string;
  isVerified: boolean;
}

/**
 * Professional Review
 */
export interface ProfessionalReview {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  rating: number;
  comment: string;
  serviceName: string;
  serviceId: string;
  date: string;
  verified: boolean;
  helpful?: number;
  response?: {
    comment: string;
    date: string;
  };
}

/**
 * Professional Statistics
 */
export interface ProfessionalStats {
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  averageRating: number;
  responseRate: number;
  responseTime: string; // e.g., "< 1h"
  completionRate: number;
  repeatClients: number;
}

/**
 * Professional Badge
 */
export interface ProfessionalBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt: string;
}

/**
 * Professional Profile
 */
export interface ProfessionalProfile {
  id: string;
  userId: string;
  fullName: string;
  avatarUrl?: string;
  title: string;
  shortBio: string;
  detailedBio: string;
  contact: ProfessionalContact;
  location: ProfessionalLocation;
  serviceCategory: ProfessionalServiceCategory;
  services: ProfessionalService[];
  workingHours: ProfessionalWorkingHours;
  rating: ProfessionalRating;
  stats: ProfessionalStats;
  badges: ProfessionalBadge[];
  certifications: ProfessionalCertification[];
  portfolio: ProfessionalPortfolioItem[];
  reviews: ProfessionalReview[];
  languages: string[];
  experienceYears: number;
  startingPrice: number;
  isVerified: boolean;
  verificationStatus: VerificationStatus;
  premiumStatus: PremiumStatus;
  status: ProfessionalStatus;
  availability: string; // "available", "busy", "offline"
  lastActive: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Professional Card Props (for grid/list display)
 */
export interface ProfessionalCardProps {
  professional: {
    id: string;
    name: string;
    profession: string;
    rating: number;
    reviewCount: number;
    city: string;
    isVerified: boolean;
    completedJobs: number;
    description?: string;
    avatar?: string;
    startingPrice?: number;
    badges?: string[];
  };
  onClick?: () => void;
  onContact?: () => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

/**
 * Professional Filter Options
 */
export interface ProfessionalFilters {
  cityId?: string;
  category?: string;
  minRating?: number;
  maxPrice?: number;
  isVerified?: boolean;
  isPremium?: boolean;
  availability?: string;
  experienceYears?: number;
  sortBy?: 'rating' | 'price' | 'distance' | 'reviews' | 'experience';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

/**
 * Professional Search Result
 */
export interface ProfessionalSearchResult {
  professionals: ProfessionalProfile[];
  total: number;
  totalPages: number;
  currentPage: number;
  filters: ProfessionalFilters;
  facets?: {
    categories: Array<{ id: string; name: string; count: number }>;
    cities: Array<{ id: string; name: string; count: number }>;
    priceRanges: Array<{ min: number; max: number; count: number }>;
  };
}

/**
 * Professional API Response
 */
export interface ProfessionalApiResponse {
  data: ProfessionalProfile | ProfessionalProfile[];
  count?: number;
  total?: number;
  totalPages?: number;
  currentPage?: number;
  message?: string;
  success: boolean;
}

/**
 * Professional Form Data (for creation/editing)
 */
export interface ProfessionalFormData {
  fullName: string;
  email: string;
  phone: string;
  title: string;
  shortBio: string;
  detailedBio: string;
  cityId: string;
  serviceCategoryId: string;
  experienceYears: number;
  startingPrice: number;
  languages: string[];
  workingHours: ProfessionalWorkingHours;
  services: Omit<ProfessionalService, 'id' | 'createdAt' | 'updatedAt'>[];
}

/**
 * Professional Availability Slot
 */
export interface ProfessionalAvailabilitySlot {
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  bookingId?: string;
}

/**
 * Professional Dashboard Data
 */
export interface ProfessionalDashboardData {
  profile: ProfessionalProfile;
  recentBookings: Array<{
    id: string;
    clientName: string;
    serviceName: string;
    date: string;
    time: string;
    status: string;
    price: number;
  }>;
  earnings: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    pending: number;
  };
  notifications: Array<{
    id: string;
    type: string;
    message: string;
    date: string;
    read: boolean;
  }>;
  upcomingBookings: number;
  messages: number;
}