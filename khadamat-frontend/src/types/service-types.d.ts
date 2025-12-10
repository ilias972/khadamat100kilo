/**
 * Comprehensive type definitions for service-related components
 * Replaces `any` usage in service components and hooks
 */

/**
 * Service Status
 */
export type ServiceStatus = 'active' | 'inactive' | 'draft' | 'archived';

/**
 * Service Category
 */
export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  imageUrl?: string;
  isActive: boolean;
  parentId?: string;
  subcategories?: ServiceCategory[];
  serviceCount?: number;
}

/**
 * Service Pricing
 */
export interface ServicePricing {
  basePrice: number;
  currency: string;
  priceType: 'fixed' | 'hourly' | 'daily' | 'project';
  minPrice?: number;
  maxPrice?: number;
  discountPercentage?: number;
  discountedPrice?: number;
}

/**
 * Service Duration
 */
export interface ServiceDuration {
  value: number;
  unit: 'minutes' | 'hours' | 'days' | 'weeks';
  estimated: boolean;
  flexible: boolean;
}

/**
 * Service Location
 */
export interface ServiceLocation {
  type: 'remote' | 'onsite' | 'both';
  cities?: string[];
  regions?: string[];
  radius?: number; // in kilometers
}

/**
 * Service Requirements
 */
export interface ServiceRequirements {
  materials: string[]; // Materials provided by professional
  tools: string[]; // Tools needed
  clientPreparation?: string[];
  specialConditions?: string[];
}

/**
 * Service Image
 */
export interface ServiceImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

/**
 * Service Review
 */
export interface ServiceReview {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  professionalId: string;
  professionalName: string;
  rating: number;
  comment: string;
  images?: string[];
  date: string;
  verified: boolean;
  helpful: number;
  response?: {
    comment: string;
    date: string;
  };
}

/**
 * Service Statistics
 */
export interface ServiceStats {
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  averageRating: number;
  reviewCount: number;
  completionRate: number;
  popularity: number; // Based on bookings/views
}

/**
 * Service Availability
 */
export interface ServiceAvailability {
  isAvailable: boolean;
  nextAvailableDate?: string;
  reason?: string; // e.g., "Professional on vacation"
  alternativeServices?: string[];
}

/**
 * Service Package Option
 */
export interface ServicePackageOption {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: ServiceDuration;
  features: string[];
  isPopular?: boolean;
  discountPercentage?: number;
}

/**
 * Service Profile
 */
export interface ServiceProfile {
  id: string;
  professionalId: string;
  professionalName: string;
  professionalAvatar?: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: ServiceCategory;
  pricing: ServicePricing;
  duration: ServiceDuration;
  location: ServiceLocation;
  requirements: ServiceRequirements;
  images: ServiceImage[];
  packages: ServicePackageOption[];
  reviews: ServiceReview[];
  stats: ServiceStats;
  availability: ServiceAvailability;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  lastBooked?: string;
}

/**
 * Service Card Props (for grid/list display)
 */
export interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    category: string;
    price: number;
    currency: string;
    rating: number;
    reviewCount: number;
    image?: string;
    professionalName: string;
    professionalAvatar?: string;
    duration?: string;
    isPremium?: boolean;
    isFeatured?: boolean;
    tags?: string[];
  };
  onBook?: () => void;
  onViewDetails?: () => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

/**
 * Service Filter Options
 */
export interface ServiceFilters {
  category?: string;
  cityId?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  duration?: string;
  availability?: 'immediate' | 'today' | 'this_week' | 'anytime';
  professionalType?: 'individual' | 'company' | 'agency';
  isPremium?: boolean;
  isFeatured?: boolean;
  tags?: string[];
  sortBy?: 'price' | 'rating' | 'popularity' | 'distance' | 'newest';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

/**
 * Service Search Result
 */
export interface ServiceSearchResult {
  services: ServiceProfile[];
  total: number;
  totalPages: number;
  currentPage: number;
  filters: ServiceFilters;
  facets?: {
    categories: Array<{ id: string; name: string; count: number }>;
    cities: Array<{ id: string; name: string; count: number }>;
    priceRanges: Array<{ min: number; max: number; count: number }>;
    durations: Array<{ value: string; label: string; count: number }>;
  };
}

/**
 * Service API Response
 */
export interface ServiceApiResponse {
  data: ServiceProfile | ServiceProfile[];
  count?: number;
  total?: number;
  totalPages?: number;
  currentPage?: number;
  message?: string;
  success: boolean;
}

/**
 * Service Booking Data
 */
export interface ServiceBookingData {
  serviceId: string;
  serviceName: string;
  professionalId: string;
  professionalName: string;
  packageId?: string;
  packageName?: string;
  pricing: ServicePricing;
  duration: ServiceDuration;
  location: ServiceLocation;
  requirements: ServiceRequirements;
  selectedDate?: string;
  selectedTime?: string;
  specialInstructions?: string;
  clientContact: {
    name: string;
    email: string;
    phone: string;
  };
}

/**
 * Service Comparison Item
 */
export interface ServiceComparisonItem {
  service: ServiceProfile;
  isSelected: boolean;
  comparisonPoints: {
    price: number;
    rating: number;
    duration: string;
    availability: string;
    features: string[];
  };
}

/**
 * Service Recommendation
 */
export interface ServiceRecommendation {
  service: ServiceProfile;
  reason: string;
  matchScore: number;
  basedOn: 'previous_bookings' | 'location' | 'preferences' | 'trending';
}

/**
 * Service Form Data (for creation/editing)
 */
export interface ServiceFormData {
  name: string;
  description: string;
  shortDescription: string;
  categoryId: string;
  pricing: ServicePricing;
  duration: ServiceDuration;
  location: ServiceLocation;
  requirements: ServiceRequirements;
  images: Omit<ServiceImage, 'id'>[];
  packages: Omit<ServicePackageOption, 'id'>[];
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  isPremium: boolean;
}

/**
 * Service Dashboard Data
 */
export interface ServiceDashboardData {
  service: ServiceProfile;
  recentBookings: Array<{
    id: string;
    clientName: string;
    date: string;
    time: string;
    status: string;
    price: number;
  }>;
  performance: {
    views: number;
    inquiries: number;
    bookings: number;
    conversionRate: number;
  };
  reviews: {
    recent: ServiceReview[];
    averageRating: number;
    totalCount: number;
  };
  competitors: Array<{
    name: string;
    price: number;
    rating: number;
  }>;
}

/**
 * Service Analytics
 */
export interface ServiceAnalytics {
  serviceId: string;
  period: string;
  metrics: {
    views: number;
    uniqueViews: number;
    inquiries: number;
    bookings: number;
    cancellations: number;
    revenue: number;
    averageRating: number;
    conversionRate: number;
  };
  trends: {
    viewsChange: number;
    bookingsChange: number;
    revenueChange: number;
    ratingChange: number;
  };
  topSources: Array<{
    source: string;
    views: number;
    bookings: number;
  }>;
  demographics: {
    topCities: Array<{ city: string; count: number }>;
    ageGroups: Array<{ group: string; count: number }>;
    deviceTypes: Array<{ type: string; count: number }>;
  };
}