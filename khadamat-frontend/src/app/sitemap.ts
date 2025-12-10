import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://khadamat.ma';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/auth/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/messages`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.2,
    },
  ];

  // Dynamic pro profiles (mock data for now)
  const proProfiles = [
    'ahmed-bennani-plombier',
    'fatima-aloui-menage',
    'karim-idrissi-jardinage',
    'mohamed-rachid-electricite',
    'leila-mansouri-peinture',
  ].map((slug) => ({
    url: `${baseUrl}/pro/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Service categories
  const serviceCategories = [
    'plomberie',
    'electricite',
    'menage',
    'jardinage',
    'peinture',
    'reparation',
    'bricolage',
    'demenagement',
  ].map((category) => ({
    url: `${baseUrl}/services/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Cities
  const cities = [
    'casablanca',
    'rabat',
    'marrakech',
    'fes',
    'tangier',
    'agadir',
    'meknes',
    'oujda',
    'kenitra',
    'tetouan',
  ].map((city) => ({
    url: `${baseUrl}/services/${city}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...proProfiles,
    ...serviceCategories,
    ...cities,
  ];
}