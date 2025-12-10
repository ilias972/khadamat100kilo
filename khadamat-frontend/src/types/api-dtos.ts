/**
 * API DTOs - Types qui correspondent exactement aux réponses API
 * Ces types reflètent la réalité des endpoints, pas ce que l'UI veut
 */

// Types API pour les villes - plusieurs variantes existent
export interface CityApiV1 {
  id: string;
  name: string;
  region?: string;
  isActive: boolean;
}

export interface CityApiV2 {
  id: string;
  name: string;
  servicesCount: number;
  // Note: pas de isActive dans cette variante
}

export type CityApiResponse = CityApiV1 | CityApiV2;

// Types API pour les catégories
export interface ServiceCategoryApiV1 {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  isActive: boolean;
}

export interface ServiceCategoryApiV2 {
  id: string;
  name: string;
  icon: string;
  count: number;
  // Note: pas de isActive dans cette variante
}

export type ServiceCategoryApiResponse = ServiceCategoryApiV1 | ServiceCategoryApiV2;

/**
 * UI Types - Types normalisés pour l'interface utilisateur
 * Ce sont les types que les composants doivent utiliser
 */

export interface CityUI {
  id: string;
  name: string;
  region?: string;
  servicesCount: number;
  isActive: boolean; // Toujours présent dans l'UI
}

export interface ServiceCategoryUI {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  count: number;
  isActive: boolean; // Toujours présent dans l'UI
}

/**
 * Mapping Functions - Conversion API → UI
 * Centraliser toute la logique de mapping ici
 */

export function mapCityApiToUI(apiCity: CityApiResponse): CityUI {
  if ('isActive' in apiCity) {
    // Variante V1: a isActive
    return {
      id: apiCity.id,
      name: apiCity.name,
      region: apiCity.region,
      servicesCount: apiCity.region ? 0 : 0, // Default si pas dans V1
      isActive: apiCity.isActive,
    };
  } else {
    // Variante V2: n'a pas isActive, mais a servicesCount
    return {
      id: apiCity.id,
      name: apiCity.name,
      region: undefined,
      servicesCount: apiCity.servicesCount,
      isActive: true, // Par défaut pour V2
    };
  }
}

export function mapServiceCategoryApiToUI(apiCategory: ServiceCategoryApiResponse): ServiceCategoryUI {
  if ('isActive' in apiCategory) {
    // Variante V1: a isActive
    return {
      id: apiCategory.id,
      name: apiCategory.name,
      description: apiCategory.description,
      icon: apiCategory.icon,
      count: apiCategory.description ? 0 : 0, // Default si pas dans V1
      isActive: apiCategory.isActive,
    };
  } else {
    // Variante V2: n'a pas isActive, mais a count
    return {
      id: apiCategory.id,
      name: apiCategory.name,
      description: undefined,
      icon: apiCategory.icon,
      count: apiCategory.count,
      isActive: true, // Par défaut pour V2
    };
  }
}

export function mapCitiesApiToUI(apiCities: CityApiResponse[]): CityUI[] {
  return apiCities.map(mapCityApiToUI);
}

export function mapServiceCategoriesApiToUI(apiCategories: ServiceCategoryApiResponse[]): ServiceCategoryUI[] {
  return apiCategories.map(mapServiceCategoryApiToUI);
}