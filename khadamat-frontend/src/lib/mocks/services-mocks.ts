// Centralized mock data for services page
export type ServiceCategory = any;

// Blog types
export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readTime: number; // in minutes
  featuredImage?: string;
  isPublished: boolean;
  views: number;
  likes: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  articleCount: number;
  color: string;
}

export const mockCities: any[] = [
  { id: '1', name: 'Casablanca', region: 'Grand Casablanca', isActive: true },
  { id: '2', name: 'Rabat', region: 'Rabat-Salé-Zemmour-Zaër', isActive: true },
  { id: '3', name: 'Marrakech', region: 'Marrakech-Tensift-Al Haouz', isActive: true },
  { id: '4', name: 'Fès', region: 'Fès-Boulemane', isActive: true },
  { id: '5', name: 'Tanger', region: 'Tanger-Tétouan', isActive: true },
  { id: '6', name: 'Oujda', region: 'Oriental', isActive: true },
  { id: '7', name: 'Agadir', region: 'Souss-Massa', isActive: true },
  { id: '8', name: 'Meknès', region: 'Meknès-Tafilalet', isActive: true },
];

export const mockCategories: any[] = [
  { id: '1', name: 'Plomberie', description: 'Réparations et installations de plomberie', icon: 'Wrench', isActive: true },
  { id: '2', name: 'Électricité', description: 'Travaux électriques et installations', icon: 'Zap', isActive: true },
  { id: '3', name: 'Ménage', description: 'Services de nettoyage et entretien', icon: 'Home', isActive: true },
  { id: '4', name: 'Peinture', description: 'Peinture intérieure et extérieure', icon: 'Palette', isActive: true },
  { id: '5', name: 'Jardinage', description: 'Entretien d\'espaces verts', icon: 'Scissors', isActive: true },
  { id: '6', name: 'Maçonnerie', description: 'Travaux de maçonnerie et construction', icon: 'Hammer', isActive: true },
  { id: '7', name: 'Déménagement', description: 'Services de déménagement', icon: 'Truck', isActive: true },
  { id: '8', name: 'Photographie', description: 'Services photographiques', icon: 'Camera', isActive: true },
  { id: '9', name: 'Climatisation', description: 'Installation et réparation de climatisations', icon: 'Wind', isActive: true },
  { id: '10', name: 'Menuiserie', description: 'Travaux de menuiserie et bois', icon: 'TreePine', isActive: true },
  { id: '11', name: 'Carrelage', description: 'Pose de carrelage et revêtements', icon: 'Grid3X3', isActive: true },
  { id: '12', name: 'Vitrerie', description: 'Réparation et remplacement de vitres', icon: 'Square', isActive: true },
  { id: '13', name: 'Serrurerie', description: 'Services de serrurerie d\'urgence', icon: 'Lock', isActive: true },
  { id: '14', name: 'Informatique', description: 'Dépannage et réparation informatique', icon: 'Monitor', isActive: true },
  { id: '15', name: 'Coiffure', description: 'Services de coiffure à domicile', icon: 'Scissors', isActive: true },
  { id: '16', name: 'Massage', description: 'Massages et soins relaxants', icon: 'Sparkles', isActive: true },
];

// Professional type for pros page
export interface Professional {
  id: string;
  fullName: string;
  avatarUrl?: string;
  cityId: string;
  serviceCategoryId: string;
  title: string;
  shortBio: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isPremium: boolean;
  startingPrice: number;
  experienceYears: number;
  responseTime: string;
  badgeLabels?: string[];
  cityName?: string;
  serviceCategoryName?: string;
  portfolioImages?: string[];
}

// Extended types for detailed professional profiles
export interface ProfessionalService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string; // e.g., "1h", "2h30"
  category: string;
}

export interface ProfessionalReview {
  id: string;
  clientName: string;
  clientAvatar?: string;
  rating: number;
  comment: string;
  serviceName: string;
  date: string; // ISO date string
  verified: boolean;
}

export interface ProfessionalCertification {
  id: string;
  title: string;
  issuer: string;
  year: number;
  description?: string;
}

export interface ProfessionalDetail {
  id: string;
  fullName: string;
  avatarUrl?: string;
  cityId: string;
  serviceCategoryId: string;
  title: string;
  shortBio: string;
  detailedBio: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isPremium: boolean;
  startingPrice: number;
  experienceYears: number;
  responseTime: string;
  badgeLabels?: string[];
  cityName?: string;
  serviceCategoryName?: string;
  languages: string[];
  availability: string;
  completedJobs: number;
  responseRate: number; // percentage
  services: ProfessionalService[];
  reviews: ProfessionalReview[];
  certifications: ProfessionalCertification[];
  portfolioImages?: string[];
  workingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}


// Mock professionals data
export const mockProfessionals: Professional[] = [
  {
    id: '1',
    fullName: 'Ahmed Bennani',
    cityId: '1',
    serviceCategoryId: '1',
    title: 'Plombier certifié',
    shortBio: 'Expert en réparation et installation de plomberie depuis 12 ans. Intervention rapide et garantie.',
    rating: 4.8,
    reviewCount: 127,
    isVerified: true,
    isPremium: false,
    startingPrice: 150,
    experienceYears: 12,
    responseTime: 'Répond en moins d\'1h',
    badgeLabels: ['Top choix', 'Très réactif'],
    cityName: 'Casablanca',
    serviceCategoryName: 'Plomberie',
    portfolioImages: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop'
    ],
  },
  {
    id: '2',
    fullName: 'Fatima Alaoui',
    cityId: '2',
    serviceCategoryId: '2',
    title: 'Électricienne expérimentée',
    shortBio: 'Spécialiste en installations électriques et dépannages. Sécurité et qualité garanties.',
    rating: 4.9,
    reviewCount: 89,
    isVerified: true,
    isPremium: true,
    startingPrice: 200,
    experienceYears: 8,
    responseTime: 'Répond en moins d\'2h',
    badgeLabels: ['Premium', 'Certifiée'],
    cityName: 'Rabat',
    serviceCategoryName: 'Électricité',
    portfolioImages: [
      'https://images.unsplash.com/photo-1621905252472-943afaa20e20?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop'
    ],
  },
  {
    id: '3',
    fullName: 'Mohammed Tazi',
    cityId: '3',
    serviceCategoryId: '4',
    title: 'Peintre professionnel',
    shortBio: 'Peinture intérieure et extérieure avec matériaux de qualité. Finitions impeccables.',
    rating: 4.7,
    reviewCount: 203,
    isVerified: false,
    isPremium: false,
    startingPrice: 120,
    experienceYears: 15,
    responseTime: 'Répond en moins d\'3h',
    badgeLabels: ['Expérimenté'],
    cityName: 'Marrakech',
    serviceCategoryName: 'Peinture',
    portfolioImages: [
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
    ],
  },
  {
    id: '4',
    fullName: 'Leila Mansouri',
    cityId: '1',
    serviceCategoryId: '3',
    title: 'Femme de ménage qualifiée',
    shortBio: 'Services de nettoyage complets pour particuliers et entreprises. Produits écologiques.',
    rating: 4.9,
    reviewCount: 312,
    isVerified: true,
    isPremium: false,
    startingPrice: 80,
    experienceYears: 6,
    responseTime: 'Répond en moins d\'1h',
    badgeLabels: ['Écologique', 'Ponctuelle'],
    cityName: 'Casablanca',
    serviceCategoryName: 'Ménage',
  },
  {
    id: '5',
    fullName: 'Youssef El Amrani',
    cityId: '4',
    serviceCategoryId: '6',
    title: 'Maçon expérimenté',
    shortBio: 'Construction et rénovation de maçonnerie. Travail soigné et durable.',
    rating: 4.6,
    reviewCount: 156,
    isVerified: true,
    isPremium: false,
    startingPrice: 180,
    experienceYears: 20,
    responseTime: 'Répond en moins d\'4h',
    badgeLabels: ['Maître artisan'],
    cityName: 'Fès',
    serviceCategoryName: 'Maçonnerie',
  },
  {
    id: '6',
    fullName: 'Amina Bouazza',
    cityId: '5',
    serviceCategoryId: '5',
    title: 'Jardinier paysagiste',
    shortBio: 'Création et entretien d\'espaces verts. Passionnée par les jardins marocains traditionnels.',
    rating: 4.8,
    reviewCount: 94,
    isVerified: true,
    isPremium: true,
    startingPrice: 100,
    experienceYears: 10,
    responseTime: 'Répond en moins d\'2h',
    badgeLabels: ['Premium', 'Créatif'],
    cityName: 'Tanger',
    serviceCategoryName: 'Jardinage',
  },
  {
    id: '7',
    fullName: 'Karim Haddad',
    cityId: '1',
    serviceCategoryId: '7',
    title: 'Déménageur professionnel',
    shortBio: 'Déménagements locaux et interurbains. Équipe formée et véhicules adaptés.',
    rating: 4.5,
    reviewCount: 78,
    isVerified: false,
    isPremium: false,
    startingPrice: 250,
    experienceYears: 7,
    responseTime: 'Répond en moins d\'6h',
    badgeLabels: ['Équipé'],
    cityName: 'Casablanca',
    serviceCategoryName: 'Déménagement',
  },
  {
    id: '8',
    fullName: 'Sofia Benjelloun',
    cityId: '3',
    serviceCategoryId: '8',
    title: 'Photographe événementiel',
    shortBio: 'Photographie de mariages, événements et portraits. Style artistique et naturel.',
    rating: 4.9,
    reviewCount: 245,
    isVerified: true,
    isPremium: true,
    startingPrice: 500,
    experienceYears: 9,
    responseTime: 'Répond en moins d\'12h',
    badgeLabels: ['Premium', 'Artistique'],
    cityName: 'Marrakech',
    serviceCategoryName: 'Photographie',
  },
  {
    id: '9',
    fullName: 'Omar Chraibi',
    cityId: '2',
    serviceCategoryId: '1',
    title: 'Plombier d\'urgence',
    shortBio: 'Dépannage plomberie 24/7. Intervention rapide pour les urgences.',
    rating: 4.7,
    reviewCount: 189,
    isVerified: true,
    isPremium: false,
    startingPrice: 200,
    experienceYears: 14,
    responseTime: 'Répond en moins d\'30min',
    badgeLabels: ['Urgence', '24/7'],
    cityName: 'Rabat',
    serviceCategoryName: 'Plomberie',
  },
  {
    id: '10',
    fullName: 'Nadia El Fassi',
    cityId: '4',
    serviceCategoryId: '3',
    title: 'Spécialiste nettoyage',
    shortBio: 'Nettoyage de bureaux et locaux commerciaux. Services réguliers disponibles.',
    rating: 4.6,
    reviewCount: 167,
    isVerified: true,
    isPremium: false,
    startingPrice: 90,
    experienceYears: 5,
    responseTime: 'Répond en moins d\'2h',
    badgeLabels: ['Entreprises'],
    cityName: 'Fès',
    serviceCategoryName: 'Ménage',
  },
  {
    id: '11',
    fullName: 'Hassan Alaoui',
    cityId: '1',
    serviceCategoryId: '2',
    title: 'Électricien bâtiment',
    shortBio: 'Installations électriques pour bâtiments résidentiels et commerciaux.',
    rating: 4.8,
    reviewCount: 134,
    isVerified: true,
    isPremium: true,
    startingPrice: 250,
    experienceYears: 16,
    responseTime: 'Répond en moins d\'3h',
    badgeLabels: ['Premium', 'Bâtiments'],
    cityName: 'Casablanca',
    serviceCategoryName: 'Électricité',
  },
  {
    id: '12',
    fullName: 'Zineb Tazi',
    cityId: '3',
    serviceCategoryId: '4',
    title: 'Peintre décoratrice',
    shortBio: 'Peinture décorative et rénovation intérieure. Conseils en couleur et style.',
    rating: 4.9,
    reviewCount: 98,
    isVerified: true,
    isPremium: false,
    startingPrice: 140,
    experienceYears: 11,
    responseTime: 'Répond en moins d\'4h',
    badgeLabels: ['Créative', 'Designer'],
    cityName: 'Marrakech',
    serviceCategoryName: 'Peinture',
  },
  {
    id: '13',
    fullName: 'Mehdi Bennani',
    cityId: '5',
    serviceCategoryId: '6',
    title: 'Maçon rénovation',
    shortBio: 'Spécialisé dans la rénovation de maçonnerie ancienne et moderne.',
    rating: 4.5,
    reviewCount: 112,
    isVerified: false,
    isPremium: false,
    startingPrice: 160,
    experienceYears: 18,
    responseTime: 'Répond en moins d\'5h',
    badgeLabels: ['Rénovation'],
    cityName: 'Tanger',
    serviceCategoryName: 'Maçonnerie',
  },
  {
    id: '14',
    fullName: 'Laila Chraibi',
    cityId: '2',
    serviceCategoryId: '5',
    title: 'Jardinière urbaine',
    shortBio: 'Aménagement de petits espaces et balcons. Solutions écologiques.',
    rating: 4.7,
    reviewCount: 76,
    isVerified: true,
    isPremium: false,
    startingPrice: 110,
    experienceYears: 8,
    responseTime: 'Répond en moins d\'3h',
    badgeLabels: ['Urbain', 'Écolo'],
    cityName: 'Rabat',
    serviceCategoryName: 'Jardinage',
  },
  {
    id: '15',
    fullName: 'Rachid El Amrani',
    cityId: '1',
    serviceCategoryId: '7',
    title: 'Déménageur express',
    shortBio: 'Déménagements rapides et sécurisés. Emballage professionnel disponible.',
    rating: 4.4,
    reviewCount: 145,
    isVerified: true,
    isPremium: false,
    startingPrice: 220,
    experienceYears: 9,
    responseTime: 'Répond en moins d\'2h',
    badgeLabels: ['Rapide', 'Emballage'],
    cityName: 'Casablanca',
    serviceCategoryName: 'Déménagement',
  },
  {
    id: '16',
    fullName: 'Imane Bouazza',
    cityId: '4',
    serviceCategoryId: '8',
    title: 'Photographe portrait',
    shortBio: 'Portraits professionnels et séances en studio. Retouches incluses.',
    rating: 4.8,
    reviewCount: 178,
    isVerified: true,
    isPremium: true,
    startingPrice: 350,
    experienceYears: 7,
    responseTime: 'Répond en moins d\'8h',
    badgeLabels: ['Premium', 'Studio'],
    cityName: 'Fès',
    serviceCategoryName: 'Photographie',
  },
  {
    id: '17',
    fullName: 'Younes Haddad',
    cityId: '3',
    serviceCategoryId: '1',
    title: 'Plombier chauffage',
    shortBio: 'Spécialiste en chauffage et climatisation. Maintenance et installation.',
    rating: 4.6,
    reviewCount: 201,
    isVerified: true,
    isPremium: false,
    startingPrice: 170,
    experienceYears: 13,
    responseTime: 'Répond en moins d\'2h',
    badgeLabels: ['Chauffage', 'Climatisation'],
    cityName: 'Marrakech',
    serviceCategoryName: 'Plomberie',
  },
  {
    id: '18',
    fullName: 'Sara Benjelloun',
    cityId: '5',
    serviceCategoryId: '3',
    title: 'Ménage écologique',
    shortBio: 'Nettoyage avec produits naturels et biodégradables. Respectueux de l\'environnement.',
    rating: 4.8,
    reviewCount: 223,
    isVerified: true,
    isPremium: true,
    startingPrice: 95,
    experienceYears: 4,
    responseTime: 'Répond en moins d\'1h',
    badgeLabels: ['Premium', 'Écologique'],
    cityName: 'Tanger',
    serviceCategoryName: 'Ménage',
  },
  {
    id: '19',
    fullName: 'Adil Mansouri',
    cityId: '2',
    serviceCategoryId: '2',
    title: 'Électricien domotique',
    shortBio: 'Installation de systèmes domotiques et automatisation résidentielle.',
    rating: 4.9,
    reviewCount: 87,
    isVerified: true,
    isPremium: true,
    startingPrice: 300,
    experienceYears: 12,
    responseTime: 'Répond en moins d\'6h',
    badgeLabels: ['Premium', 'Domotique'],
    cityName: 'Rabat',
    serviceCategoryName: 'Électricité',
  },
  {
    id: '20',
    fullName: 'Khadija El Fassi',
    cityId: '1',
    serviceCategoryId: '4',
    title: 'Peintre artistique',
    shortBio: 'Peinture murale et décorative. Créations personnalisées et fresques.',
    rating: 4.7,
    reviewCount: 156,
    isVerified: false,
    isPremium: false,
    startingPrice: 180,
    experienceYears: 10,
    responseTime: 'Répond en moins d\'5h',
    badgeLabels: ['Artistique', 'Personnalisé'],
    cityName: 'Casablanca',
    serviceCategoryName: 'Peinture',
  },
  {
    id: '21',
    fullName: 'Mustapha Alaoui',
    cityId: '4',
    serviceCategoryId: '6',
    title: 'Maçon traditionnel',
    shortBio: 'Construction en techniques traditionnelles marocaines. Zelliges et plâtre.',
    rating: 4.8,
    reviewCount: 134,
    isVerified: true,
    isPremium: true,
    startingPrice: 220,
    experienceYears: 25,
    responseTime: 'Répond en moins d\'4h',
    badgeLabels: ['Premium', 'Traditionnel'],
    cityName: 'Fès',
    serviceCategoryName: 'Maçonnerie',
  },
  {
    id: '22',
    fullName: 'Najat Tazi',
    cityId: '3',
    serviceCategoryId: '5',
    title: 'Paysagiste créative',
    shortBio: 'Design de jardins contemporains et traditionnels. Irrigation automatique.',
    rating: 4.9,
    reviewCount: 112,
    isVerified: true,
    isPremium: true,
    startingPrice: 150,
    experienceYears: 14,
    responseTime: 'Répond en moins d\'3h',
    badgeLabels: ['Premium', 'Designer'],
    cityName: 'Marrakech',
    serviceCategoryName: 'Jardinage',
  },
  {
    id: '23',
    fullName: 'Hamza Bennani',
    cityId: '5',
    serviceCategoryId: '7',
    title: 'Déménageur international',
    shortBio: 'Déménagements internationaux et relocation. Services complets et assurés.',
    rating: 4.6,
    reviewCount: 89,
    isVerified: true,
    isPremium: false,
    startingPrice: 400,
    experienceYears: 11,
    responseTime: 'Répond en moins d\'12h',
    badgeLabels: ['International', 'Assuré'],
    cityName: 'Tanger',
    serviceCategoryName: 'Déménagement',
  },
  {
    id: '24',
    fullName: 'Aicha Chraibi',
    cityId: '2',
    serviceCategoryId: '8',
    title: 'Photographe culinaire',
    shortBio: 'Photographie de plats et établissements. Spécialisée dans la cuisine marocaine.',
    rating: 4.7,
    reviewCount: 198,
    isVerified: true,
    isPremium: false,
    startingPrice: 280,
    experienceYears: 8,
    responseTime: 'Répond en moins d\'10h',
    badgeLabels: ['Culinaire', 'Spécialisée'],
    cityName: 'Rabat',
    serviceCategoryName: 'Photographie',
  },
  {
    id: '25',
    fullName: 'Reda El Amrani',
    cityId: '1',
    serviceCategoryId: '1',
    title: 'Plombier piscine',
    shortBio: 'Installation et maintenance de piscines. Traitement de l\'eau et filtration.',
    rating: 4.5,
    reviewCount: 167,
    isVerified: false,
    isPremium: false,
    startingPrice: 190,
    experienceYears: 9,
    responseTime: 'Répond en moins d\'3h',
    badgeLabels: ['Piscines'],
    cityName: 'Casablanca',
    serviceCategoryName: 'Plomberie',
  },
  {
    id: '26',
    fullName: 'Meryem Bouazza',
    cityId: '4',
    serviceCategoryId: '3',
    title: 'Ménage bureaux',
    shortBio: 'Nettoyage d\'espaces de bureaux et open spaces. Services quotidiens.',
    rating: 4.6,
    reviewCount: 145,
    isVerified: true,
    isPremium: false,
    startingPrice: 85,
    experienceYears: 6,
    responseTime: 'Répond en moins d\'2h',
    badgeLabels: ['Bureaux', 'Quotidien'],
    cityName: 'Fès',
    serviceCategoryName: 'Ménage',
  },
  {
    id: '27',
    fullName: 'Salah Haddad',
    cityId: '3',
    serviceCategoryId: '2',
    title: 'Électricien solaire',
    shortBio: 'Installation de panneaux solaires et systèmes photovoltaïques.',
    rating: 4.8,
    reviewCount: 123,
    isVerified: true,
    isPremium: true,
    startingPrice: 350,
    experienceYears: 10,
    responseTime: 'Répond en moins d\'5h',
    badgeLabels: ['Premium', 'Solaire'],
    cityName: 'Marrakech',
    serviceCategoryName: 'Électricité',
  },
  {
    id: '28',
    fullName: 'Wafa Benjelloun',
    cityId: '5',
    serviceCategoryId: '4',
    title: 'Peintre industrielle',
    shortBio: 'Peinture de bâtiments industriels et entrepôts. Résistances spéciales.',
    rating: 4.4,
    reviewCount: 98,
    isVerified: false,
    isPremium: false,
    startingPrice: 130,
    experienceYears: 12,
    responseTime: 'Répond en moins d\'6h',
    badgeLabels: ['Industriel'],
    cityName: 'Tanger',
    serviceCategoryName: 'Peinture',
  },
  {
    id: '29',
    fullName: 'Ibrahim Mansouri',
    cityId: '2',
    serviceCategoryId: '6',
    title: 'Maçon isolation',
    shortBio: 'Isolation thermique et acoustique. Économies d\'énergie garanties.',
    rating: 4.7,
    reviewCount: 156,
    isVerified: true,
    isPremium: false,
    startingPrice: 175,
    experienceYears: 17,
    responseTime: 'Répond en moins d\'4h',
    badgeLabels: ['Isolation', 'Économie'],
    cityName: 'Rabat',
    serviceCategoryName: 'Maçonnerie',
  },
  {
    id: '30',
    fullName: 'Houda El Fassi',
    cityId: '1',
    serviceCategoryId: '5',
    title: 'Jardinier thérapeutique',
    shortBio: 'Jardinage adapté aux personnes âgées et handicapées. Espaces accessibles.',
    rating: 4.9,
    reviewCount: 87,
    isVerified: true,
    isPremium: true,
    startingPrice: 125,
    experienceYears: 7,
    responseTime: 'Répond en moins d\'2h',
    badgeLabels: ['Premium', 'Thérapeutique'],
    cityName: 'Casablanca',
    serviceCategoryName: 'Jardinage',
  },
];


// Mock detailed professional profiles
export const mockProfessionalDetails: Record<string, ProfessionalDetail> = {
  '1': {
    ...mockProfessionals[0],
    detailedBio: `Ahmed Bennani est un plombier expérimenté avec plus de 12 ans d'expérience dans le domaine de la plomberie résidentielle et commerciale. Passionné par son métier, il met un point d'honneur à offrir des services de qualité supérieure avec une attention particulière aux détails.

Spécialisé dans l'installation et la réparation de systèmes de plomberie, Ahmed maîtrise toutes les techniques modernes et traditionnelles. Il travaille avec des matériaux de haute qualité et respecte toujours les normes de sécurité les plus strictes.

Son approche client-centrée lui permet de comprendre les besoins spécifiques de chaque projet et de proposer des solutions adaptées. Disponible 7j/7 pour les urgences, Ahmed garantit une intervention rapide et efficace.`,
    services: [
      {
        id: '1-1',
        name: 'Réparation de fuite d\'eau',
        description: 'Diagnostic et réparation de toutes types de fuites',
        price: 150,
        duration: '1-2h',
        category: 'Réparation'
      },
      {
        id: '1-2',
        name: 'Installation de chauffe-eau',
        description: 'Installation complète de chauffe-eau électrique ou gaz',
        price: 300,
        duration: '2-3h',
        category: 'Installation'
      },
      {
        id: '1-3',
        name: 'Débouchage canalisation',
        description: 'Débouchage professionnel avec équipement spécialisé',
        price: 120,
        duration: '30-60min',
        category: 'Débouchage'
      },
      {
        id: '1-4',
        name: 'Installation salle de bain',
        description: 'Installation complète de salle de bain (douche, WC, lavabo)',
        price: 800,
        duration: '1 journée',
        category: 'Installation'
      }
    ],
    reviews: [
      {
        id: 'r1-1',
        clientName: 'Fatima Alaoui',
        rating: 5,
        comment: 'Excellent travail ! Ahmed est arrivé à l\'heure et a réparé la fuite en moins d\'une heure. Très professionnel et prix correct.',
        date: '2024-01-15',
        serviceName: 'Réparation de fuite d\'eau',
        verified: true
      },
      {
        id: 'r1-2',
        clientName: 'Mohammed Tazi',
        rating: 5,
        comment: 'Très satisfait du service. Ahmed a installé mon chauffe-eau en une matinée. Nettoyage impeccable et conseils utiles.',
        date: '2024-01-10',
        serviceName: 'Installation de chauffe-eau',
        verified: true
      },
      {
        id: 'r1-3',
        clientName: 'Leila Mansouri',
        rating: 4,
        comment: 'Bon travail, intervention rapide pour le débouchage. Un peu cher mais qualité au rendez-vous.',
        date: '2024-01-05',
        serviceName: 'Débouchage canalisation',
        verified: true
      }
    ],
    certifications: [
      {
        id: 'c1-1',
        title: 'Certificat de Qualification Professionnelle Plomberie',
        issuer: 'Chambre des Métiers du Maroc',
        year: 2015,
        description: 'Certification officielle pour les travaux de plomberie'
      },
      {
        id: 'c1-2',
        title: 'Formation Sécurité Gaz',
        issuer: 'GRDF Maroc',
        year: 2018,
        description: 'Formation spécialisée pour les installations gaz'
      },
      {
        id: 'c1-3',
        title: 'Certification Qualibat',
        issuer: 'Qualibat',
        year: 2020,
        description: 'Label de qualité pour les artisans du bâtiment'
      }
    ],
    languages: ['Arabe', 'Français'],
    availability: 'Disponible 7j/7, urgences 24h/24',
    completedJobs: 247,
    responseRate: 98,
    workingHours: {
      monday: '08:00 - 18:00',
      tuesday: '08:00 - 18:00',
      wednesday: '08:00 - 18:00',
      thursday: '08:00 - 18:00',
      friday: '08:00 - 17:00',
      saturday: '09:00 - 16:00',
      sunday: 'Fermé'
    }
  },
  '2': {
    ...mockProfessionals[1],
    detailedBio: `Fatima Alaoui est une électricienne qualifiée avec 8 ans d'expérience dans l'installation et la maintenance électrique. Femme pionnière dans un métier traditionnellement masculin, elle apporte précision, sécurité et professionnalisme à chaque intervention.

Spécialisée dans les installations électriques résidentielles et commerciales, Fatima maîtrise les dernières normes électriques et utilise uniquement des matériaux certifiés. Elle est particulièrement attentive à la sécurité et forme régulièrement ses clients sur les bonnes pratiques électriques.

Membre active de l'association des femmes électriciennes, Fatima s'engage pour la promotion des femmes dans les métiers techniques.`,
    services: [
      {
        id: '2-1',
        name: 'Installation électrique complète',
        description: 'Installation électrique d\'un appartement ou maison',
        price: 2500,
        duration: '2-3 jours',
        category: 'Installation'
      },
      {
        id: '2-2',
        name: 'Réparation prise électrique',
        description: 'Diagnostic et réparation de problèmes électriques',
        price: 100,
        duration: '30-60min',
        category: 'Réparation'
      },
      {
        id: '2-3',
        name: 'Installation domotique',
        description: 'Système d\'éclairage intelligent et automatisation',
        price: 1500,
        duration: '1 journée',
        category: 'Installation'
      }
    ],
    reviews: [
      {
        id: 'r2-1',
        clientName: 'Ahmed Bennani',
        rating: 5,
        comment: 'Fatima a fait un travail impeccable pour l\'installation électrique de mon appartement. Très professionnelle et à l\'écoute.',
        date: '2024-01-12',
        serviceName: 'Installation électrique complète',
        verified: true
      },
      {
        id: 'r2-2',
        clientName: 'Youssef El Amrani',
        rating: 5,
        comment: 'Intervention rapide et efficace pour une panne électrique. Fatima a trouvé le problème en 5 minutes !',
        date: '2024-01-08',
        serviceName: 'Réparation prise électrique',
        verified: true
      }
    ],
    certifications: [
      {
        id: 'c2-1',
        title: 'Brevet d\'Électricien',
        issuer: 'Ministère de l\'Éducation Nationale',
        year: 2016,
        description: 'Diplôme officiel d\'électricien qualifié'
      },
      {
        id: 'c2-2',
        title: 'Certification NF C 15-100',
        issuer: 'Consuel',
        year: 2019,
        description: 'Certification pour les installations électriques'
      }
    ],
    languages: ['Arabe', 'Français', 'Anglais'],
    availability: 'Lundi au Samedi, 8h-18h',
    completedJobs: 156,
    responseRate: 95,
    workingHours: {
      monday: '07:00 - 19:00',
      tuesday: '07:00 - 19:00',
      wednesday: '07:00 - 19:00',
      thursday: '07:00 - 19:00',
      friday: '07:00 - 18:00',
      saturday: '08:00 - 17:00',
      sunday: '09:00 - 14:00'
    }
  },
  '3': {
    ...mockProfessionals[2],
    detailedBio: `Mohammed Tazi est un peintre professionnel expérimenté spécialisé dans les travaux de peinture intérieure et extérieure. Avec plus de 15 ans d'expérience, il maîtrise toutes les techniques de peinture moderne et traditionnelle.

Passionné par son métier, Mohammed apporte un soin particulier à la préparation des surfaces et utilise uniquement des peintures de qualité supérieure. Il est reconnu pour ses finitions impeccables et son respect des délais.

Son approche artisanale lui permet de conseiller ses clients sur les choix de couleurs et de matériaux adaptés à leurs besoins spécifiques.`,
    services: [
      {
        id: '3-1',
        name: 'Peinture intérieure complète',
        description: 'Peinture de toutes les pièces d\'un appartement',
        price: 800,
        duration: '2-3 jours',
        category: 'Intérieur'
      },
      {
        id: '3-2',
        name: 'Peinture extérieure',
        description: 'Peinture de façade et extérieur',
        price: 1200,
        duration: '3-4 jours',
        category: 'Extérieur'
      },
      {
        id: '3-3',
        name: 'Peinture décorative',
        description: 'Techniques décoratives et effets spéciaux',
        price: 150,
        duration: '1 journée',
        category: 'Décoratif'
      }
    ],
    reviews: [
      {
        id: 'r3-1',
        clientName: 'Ahmed Bennani',
        rating: 5,
        comment: 'Excellent travail de peinture. Très professionnel et propre.',
        date: '2024-01-10',
        serviceName: 'Peinture intérieure complète',
        verified: true
      },
      {
        id: 'r3-2',
        clientName: 'Fatima Alaoui',
        rating: 4,
        comment: 'Bon peintre, délais respectés. Quelques retouches mineures.',
        date: '2024-01-05',
        serviceName: 'Peinture extérieure',
        verified: true
      }
    ],
    certifications: [
      {
        id: 'c3-1',
        title: 'Certificat de Peintre Professionnel',
        issuer: 'Chambre des Métiers',
        year: 2010,
        description: 'Certification officielle pour les travaux de peinture'
      }
    ],
    languages: ['Arabe', 'Français'],
    availability: 'Lundi au Vendredi, 8h-17h',
    completedJobs: 203,
    responseRate: 92,
    workingHours: {
      monday: '08:00 - 17:00',
      tuesday: '08:00 - 17:00',
      wednesday: '08:00 - 17:00',
      thursday: '08:00 - 17:00',
      friday: '08:00 - 17:00',
      saturday: 'Fermé',
      sunday: 'Fermé'
    }
  }
};

// Blog mock data
export const mockBlogCategories: BlogCategory[] = [
 {
   id: '1',
   name: 'Conseils',
   slug: 'conseils',
   description: 'Conseils pratiques pour vos projets',
   articleCount: 12,
   color: '#F97B22'
 },
 {
   id: '2',
   name: 'Maintenance',
   slug: 'maintenance',
   description: 'Entretien et maintenance de votre maison',
   articleCount: 8,
   color: '#2E7D32'
 },
 {
   id: '3',
   name: 'Rénovation',
   slug: 'renovation',
   description: 'Guides de rénovation et travaux',
   articleCount: 15,
   color: '#1976D2'
 },
 {
   id: '4',
   name: 'Économie d\'énergie',
   slug: 'economie-energie',
   description: 'Astuces pour réduire vos factures',
   articleCount: 6,
   color: '#FF9800'
 },
 {
   id: '5',
   name: 'Sécurité',
   slug: 'securite',
   description: 'Sécurité à la maison et au travail',
   articleCount: 9,
   color: '#D32F2F'
 }
];

export const mockBlogArticles: BlogArticle[] = [
 {
   id: '1',
   slug: 'comment-choisir-bon-plombier',
   title: 'Comment choisir le bon plombier pour votre maison',
   excerpt: 'Découvrez les critères essentiels pour sélectionner un professionnel qualifié et éviter les mauvaises surprises.',
   content: `# Comment choisir le bon plombier pour votre maison

Choisir le bon plombier est crucial pour garantir la qualité et la sécurité de vos installations. Voici les critères essentiels à prendre en compte.

## 1. Vérifiez les qualifications

Un bon plombier doit être titulaire d'un certificat de qualification professionnelle. Au Maroc, les plombiers qualifiés possèdent généralement :

- Un diplôme de l'enseignement professionnel
- Une certification de la Chambre des Métiers
- Une assurance responsabilité civile

## 2. Demandez des références

N'hésitez pas à demander des références auprès d'anciens clients. Un professionnel sérieux sera ravi de vous fournir des contacts de clients satisfaits.

## 3. Comparez les devis

Obtenez au moins 3 devis détaillés avant de prendre votre décision. Un devis sérieux comprend :

- Le détail des travaux
- Les matériaux utilisés
- Les délais d'intervention
- La garantie proposée

## 4. Vérifiez l'assurance

Assurez-vous que le plombier est couvert par une assurance responsabilité civile et décennale pour les gros travaux.

## 5. La réactivité

Un bon professionnel répond rapidement à vos appels et propose des créneaux adaptés à votre emploi du temps.

En suivant ces critères, vous maximiserez vos chances de trouver un plombier compétent et fiable pour vos travaux.`,
   author: {
     name: 'Ahmed Bennani',
     avatar: '/avatars/ahmed.jpg',
     bio: 'Plombier certifié avec 12 ans d\'expérience'
   },
   category: 'Conseils',
   tags: ['plomberie', 'choix professionnel', 'qualité'],
   publishedAt: '2024-11-15T10:00:00Z',
   updatedAt: '2024-11-15T10:00:00Z',
   readTime: 5,
   featuredImage: '/blog/plomberie-hero.jpg',
   isPublished: true,
   views: 1250,
   likes: 45
 },
 {
   id: '2',
   slug: 'entretien-climatisation-annuel',
   title: 'L\'importance de l\'entretien régulier de votre climatisation',
   excerpt: 'Pourquoi un entretien annuel peut vous faire économiser jusqu\'à 30% sur vos factures d\'énergie.',
   content: `# L'importance de l'entretien régulier de votre climatisation

Un entretien régulier de votre climatisation n'est pas seulement une question de confort, c'est aussi une économie substantielle sur vos factures d'énergie.

## Les bénéfices de l'entretien annuel

### Économies d'énergie
Un système bien entretenu consomme jusqu'à 30% d'énergie en moins. La poussière et les saletés obstruent les filtres et réduisent l'efficacité du système.

### Durée de vie prolongée
L'entretien régulier peut augmenter la durée de vie de votre climatisation de 5 à 10 ans supplémentaires.

### Qualité de l'air
Des filtres propres garantissent un air sain et réduisent les risques d'allergies.

## Fréquence recommandée

- **Filtre à air** : Nettoyage tous les 2 mois, remplacement annuel
- **Unité extérieure** : Nettoyage 2 fois par an
- **Réfrigérant** : Contrôle annuel des niveaux
- **Entretien complet** : Une fois par an par un professionnel

## Signes qu'il faut intervenir

- Climatisation qui fonctionne en continu
- Air moins frais qu'avant
- Bruits inhabituels
- Odeurs désagréables
- Consommation électrique excessive

N'attendez pas que votre climatisation tombe en panne. Un entretien préventif vous évitera des réparations coûteuses.`,
   author: {
     name: 'Fatima Alaoui',
     avatar: '/avatars/fatima.jpg',
     bio: 'Spécialiste en climatisation et chauffage'
   },
   category: 'Maintenance',
   tags: ['climatisation', 'entretien', 'économie énergie'],
   publishedAt: '2024-11-12T14:30:00Z',
   updatedAt: '2024-11-12T14:30:00Z',
   readTime: 4,
   featuredImage: '/blog/clim-hero.jpg',
   isPublished: true,
   views: 890,
   likes: 32
 },
 {
   id: '3',
   slug: 'guide-renovation-salle-bain',
   title: 'Guide complet de la rénovation de salle de bain',
   excerpt: 'Tout ce que vous devez savoir avant de vous lancer dans les travaux de rénovation.',
   content: `# Guide complet de la rénovation de salle de bain

La rénovation d'une salle de bain est un projet important qui nécessite une bonne préparation. Voici votre guide complet pour réussir vos travaux.

## 1. Planification du projet

### Évaluez vos besoins
- Nombre d'utilisateurs quotidiens
- Budget disponible
- Durée des travaux acceptable
- Style souhaité

### Définissez votre budget
Prévoyez 15-20% supplémentaires pour les imprévus :
- Démolition : 10-15% du budget total
- Plomberie : 20-30%
- Électricité : 10-15%
- Revêtements : 25-35%
- Mobilier : 15-25%

## 2. Les étapes clés

### Phase préparatoire
- Obtention des autorisations si nécessaire
- Choix des matériaux et équipements
- Planification des travaux

### Démolition
- Protection des zones adjacentes
- Évacuation des déchets
- Préparation des surfaces

### Installation
- Plomberie et électricité
- Revêtements muraux et sols
- Pose des équipements

## 3. Choix des matériaux

### Carrelage
- Grès cérame pour sa résistance
- Format adapté à la taille de la pièce
- Jointoiement étanche

### Receveur de douche
- Préférer les receveurs extra-plats
- Bon système d'évacuation
- Facilité d'entretien

### Meubles et rangements
- Optimisation de l'espace
- Qualité des finitions
- Fonctionnalité

## 4. Économies d'énergie

- Robinetterie économe
- Chauffage performant
- Ventilation efficace
- Isolation thermique

## 5. Sécurité

- Revêtements antidérapants
- Barres d'appui si nécessaire
- Éclairage adapté
- Prises électriques hors d'eau

Une rénovation bien planifiée transforme votre salle de bain en un espace moderne et fonctionnel.`,
   author: {
     name: 'Youssef Tazi',
     avatar: '/avatars/youssef.jpg',
     bio: 'Expert en rénovation et design d\'intérieur'
   },
   category: 'Rénovation',
   tags: ['salle de bain', 'rénovation', 'guide travaux'],
   publishedAt: '2024-11-10T09:15:00Z',
   updatedAt: '2024-11-10T09:15:00Z',
   readTime: 8,
   featuredImage: '/blog/sdb-hero.jpg',
   isPublished: true,
   views: 2100,
   likes: 78
 },
 {
   id: '4',
   slug: 'isolation-thermique-economique',
   title: 'Isolation thermique : comment réduire vos factures de chauffage',
   excerpt: 'Découvrez les meilleures techniques d\'isolation pour optimiser votre confort et réduire vos dépenses énergétiques.',
   content: `# Isolation thermique : comment réduire vos factures de chauffage

Une bonne isolation thermique peut réduire vos factures de chauffage de 20 à 30%. Voici les solutions les plus efficaces.

## Les points critiques à isoler

### Les murs
- Isolation par l'extérieur (ITE) : la solution idéale
- Isolation par l'intérieur : moins coûteuse mais réduit l'espace
- Matériaux : laine de verre, laine de roche, ouate de cellulose

### Le toit
- 30% des déperditions de chaleur passent par le toit
- Isolation des combles : solution économique et efficace
- Matériaux adaptés à l'humidité

### Les fenêtres
- Double vitrage obligatoire
- Triple vitrage pour les régions froides
- Calfeutrage des joints

## Les aides financières

### Au Maroc
- Programme d'efficacité énergétique
- Crédits bancaires préférentiels
- Subventions locales

### Retour sur investissement
- Isolation des combles : 2-3 ans
- Changement des fenêtres : 5-7 ans
- Isolation des murs : 7-10 ans

## Les erreurs à éviter

- Négliger l'étanchéité à l'air
- Choisir des matériaux de mauvaise qualité
- Oublier l'isolation des ponts thermiques
- Mal installer les matériaux

Une isolation bien réalisée améliore votre confort toute l'année et valorise votre bien immobilier.`,
   author: {
     name: 'Karim Alaoui',
     avatar: '/avatars/karim.jpg',
     bio: 'Spécialiste en rénovation énergétique'
   },
   category: 'Économie d\'énergie',
   tags: ['isolation', 'économie énergie', 'chauffage'],
   publishedAt: '2024-11-08T11:45:00Z',
   updatedAt: '2024-11-08T11:45:00Z',
   readTime: 6,
   featuredImage: '/blog/isolation-hero.jpg',
   isPublished: true,
   views: 1650,
   likes: 56
 },
 {
   id: '5',
   slug: 'securite-electrique-domicile',
   title: 'Sécurité électrique à domicile : les règles essentielles',
   excerpt: 'Protégez votre famille et vos biens en respectant les normes de sécurité électrique.',
   content: `# Sécurité électrique à domicile : les règles essentielles

La sécurité électrique est primordiale pour protéger votre famille et vos biens. Voici les règles essentielles à respecter.

## Les installations obligatoires

### Disjoncteur différentiel
- Protège contre les électrocutions
- Doit être installé sur tous les circuits
- Test mensuel obligatoire

### Prises de terre
- Essentielles pour la sécurité
- Vérification périodique requise
- Normes strictes à respecter

### Tableau électrique
- Accessible et sécurisé
- Étiquetage clair des circuits
- Protection contre les surintensités

## Les bonnes pratiques

### Utilisation quotidienne
- Ne jamais surcharger les prises
- Utiliser des multiprises avec protection
- Débrancher les appareils en cas d'orage

### Entretien
- Vérification annuelle par un professionnel
- Remplacement des installations anciennes
- Mise à jour selon les normes actuelles

### En cas de problème
- Couper immédiatement le courant
- Ne pas toucher un fil dénudé
- Faire appel à un électricien qualifié

## Les signes de danger

- Odeurs de brûlé
- Étincelles ou arcs électriques
- Appareils qui chauffent anormalement
- Disjoncteurs qui se déclenchent fréquemment

La sécurité électrique n'est pas une option. Elle sauve des vies et protège vos biens.`,
   author: {
     name: 'Leila Mansouri',
     avatar: '/avatars/leila.jpg',
     bio: 'Électricienne spécialisée en sécurité'
   },
   category: 'Sécurité',
   tags: ['sécurité électrique', 'domicile', 'normes'],
   publishedAt: '2024-11-05T16:20:00Z',
   updatedAt: '2024-11-05T16:20:00Z',
   readTime: 7,
   featuredImage: '/blog/securite-hero.jpg',
   isPublished: true,
   views: 1350,
   likes: 41
 }
];

// Helper functions for blog
export const getBlogArticleBySlug = (slug: string): BlogArticle | undefined => {
 return mockBlogArticles.find(article => article.slug === slug && article.isPublished);
};

export const getBlogArticlesByCategory = (categorySlug: string): BlogArticle[] => {
 const category = mockBlogCategories.find(cat => cat.slug === categorySlug);
 if (!category) return [];
 return mockBlogArticles.filter(article => article.category === category.name && article.isPublished);
};

export const getPopularBlogArticles = (limit: number = 5): BlogArticle[] => {
 return mockBlogArticles
   .filter(article => article.isPublished)
   .sort((a, b) => b.views - a.views)
   .slice(0, limit);
};

export const getRelatedBlogArticles = (currentArticle: BlogArticle, limit: number = 3): BlogArticle[] => {
  return mockBlogArticles
    .filter(article =>
      article.id !== currentArticle.id &&
      article.isPublished &&
      (article.category === currentArticle.category ||
       article.tags.some(tag => currentArticle.tags.includes(tag)))
    )
    .slice(0, limit);
};

// Client Dashboard types
export interface Client {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  cityId: string;
  cityName?: string;
  createdAt: string;
  isVerified: boolean;
  totalBookings: number;
  totalSpent: number;
  favoriteCount: number;
}

export interface ClientBooking {
  id: string;
  clientId: string;
  professionalId: string;
  professionalName: string;
  professionalAvatar?: string;
  serviceName: string;
  serviceCategory: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  scheduledDate: string;
  scheduledTime: string;
  duration: string;
  price: number;
  location: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientMessage {
  id: string;
  clientId: string;
  professionalId: string;
  professionalName: string;
  professionalAvatar?: string;
  bookingId?: string;
  content: string;
  isFromClient: boolean;
  isRead: boolean;
  createdAt: string;
}

export interface ClientFavorite {
  id: string;
  clientId: string;
  professionalId: string;
  professionalName: string;
  professionalAvatar?: string;
  serviceCategory: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  cityName: string;
  addedAt: string;
}

export interface ClientStats {
  totalBookings: number;
  activeBookings: number;
  completedBookings: number;
  totalSpent: number;
  averageRating: number;
  favoriteCount: number;
  unreadMessages: number;
}

// Mock client data
export const mockClient: Client = {
  id: 'client-1',
  fullName: 'Karim Bennani',
  email: 'karim.bennani@email.com',
  phone: '+212 6 12 34 56 78',
  avatar: '/avatars/client-karim.jpg',
  cityId: '1',
  cityName: 'Casablanca',
  createdAt: '2024-01-15T10:00:00Z',
  isVerified: true,
  totalBookings: 12,
  totalSpent: 8500,
  favoriteCount: 8
};

export const mockClientBookings: ClientBooking[] = [
  {
    id: 'booking-1',
    clientId: 'client-1',
    professionalId: '1',
    professionalName: 'Ahmed Bennani',
    professionalAvatar: '/avatars/ahmed.jpg',
    serviceName: 'Réparation de fuite d\'eau',
    serviceCategory: 'Plomberie',
    status: 'completed',
    scheduledDate: '2024-11-20',
    scheduledTime: '14:00',
    duration: '2h',
    price: 300,
    location: 'Casablanca, Maarif',
    notes: 'Fuite sous l\'évier de la cuisine',
    createdAt: '2024-11-18T09:00:00Z',
    updatedAt: '2024-11-20T16:00:00Z'
  },
  {
    id: 'booking-2',
    clientId: 'client-1',
    professionalId: '2',
    professionalName: 'Fatima Alaoui',
    professionalAvatar: '/avatars/fatima.jpg',
    serviceName: 'Installation électrique complète',
    serviceCategory: 'Électricité',
    status: 'confirmed',
    scheduledDate: '2024-11-25',
    scheduledTime: '09:00',
    duration: '1 journée',
    price: 1200,
    location: 'Casablanca, Racine',
    notes: 'Installation électrique pour appartement neuf',
    createdAt: '2024-11-15T14:30:00Z',
    updatedAt: '2024-11-15T14:30:00Z'
  },
  {
    id: 'booking-3',
    clientId: 'client-1',
    professionalId: '4',
    professionalName: 'Leila Mansouri',
    professionalAvatar: '/avatars/leila.jpg',
    serviceName: 'Nettoyage complet appartement',
    serviceCategory: 'Ménage',
    status: 'in_progress',
    scheduledDate: '2024-11-22',
    scheduledTime: '10:00',
    duration: '4h',
    price: 200,
    location: 'Casablanca, Gauthier',
    notes: 'Nettoyage appartement 3 pièces',
    createdAt: '2024-11-20T11:00:00Z',
    updatedAt: '2024-11-20T11:00:00Z'
  },
  {
    id: 'booking-4',
    clientId: 'client-1',
    professionalId: '6',
    professionalName: 'Amina Bouazza',
    professionalAvatar: '/avatars/amina.jpg',
    serviceName: 'Entretien jardin mensuel',
    serviceCategory: 'Jardinage',
    status: 'pending',
    scheduledDate: '2024-12-01',
    scheduledTime: '08:00',
    duration: '3h',
    price: 150,
    location: 'Casablanca, Californie',
    notes: 'Taille des haies et arrosage automatique',
    createdAt: '2024-11-10T16:45:00Z',
    updatedAt: '2024-11-10T16:45:00Z'
  },
  {
    id: 'booking-5',
    clientId: 'client-1',
    professionalId: '3',
    professionalName: 'Mohammed Tazi',
    professionalAvatar: '/avatars/mohammed.jpg',
    serviceName: 'Peinture intérieure salon',
    serviceCategory: 'Peinture',
    status: 'completed',
    scheduledDate: '2024-10-15',
    scheduledTime: '13:00',
    duration: '6h',
    price: 800,
    location: 'Casablanca, Palmier',
    notes: 'Peinture salon 25m², couleur blanc cassé',
    createdAt: '2024-10-10T10:30:00Z',
    updatedAt: '2024-10-15T19:00:00Z'
  }
];

export const mockClientMessages: ClientMessage[] = [
  {
    id: 'msg-1',
    clientId: 'client-1',
    professionalId: '2',
    professionalName: 'Fatima Alaoui',
    professionalAvatar: '/avatars/fatima.jpg',
    bookingId: 'booking-2',
    content: 'Bonjour, je confirme le rendez-vous pour demain à 9h. Auriez-vous des préférences particulières pour les interrupteurs ?',
    isFromClient: false,
    isRead: false,
    createdAt: '2024-11-21T18:30:00Z'
  },
  {
    id: 'msg-2',
    clientId: 'client-1',
    professionalId: '4',
    professionalName: 'Leila Mansouri',
    professionalAvatar: '/avatars/leila.jpg',
    bookingId: 'booking-3',
    content: 'Le nettoyage se déroule parfaitement. Je termine dans environ 1h.',
    isFromClient: false,
    isRead: true,
    createdAt: '2024-11-22T11:30:00Z'
  },
  {
    id: 'msg-3',
    clientId: 'client-1',
    professionalId: '6',
    professionalName: 'Amina Bouazza',
    professionalAvatar: '/avatars/amina.jpg',
    bookingId: 'booking-4',
    content: 'Parfait pour le rendez-vous du 1er décembre. Le temps devrait être favorable.',
    isFromClient: false,
    isRead: true,
    createdAt: '2024-11-18T14:15:00Z'
  },
  {
    id: 'msg-4',
    clientId: 'client-1',
    professionalId: '1',
    professionalName: 'Ahmed Bennani',
    professionalAvatar: '/avatars/ahmed.jpg',
    bookingId: 'booking-1',
    content: 'Intervention terminée avec succès. La facture sera disponible sous 24h.',
    isFromClient: false,
    isRead: true,
    createdAt: '2024-11-20T16:15:00Z'
  }
];

export const mockClientFavorites: ClientFavorite[] = [
  {
    id: 'fav-1',
    clientId: 'client-1',
    professionalId: '2',
    professionalName: 'Fatima Alaoui',
    professionalAvatar: '/avatars/fatima.jpg',
    serviceCategory: 'Électricité',
    rating: 4.9,
    reviewCount: 89,
    startingPrice: 200,
    cityName: 'Rabat',
    addedAt: '2024-09-15T10:00:00Z'
  },
  {
    id: 'fav-2',
    clientId: 'client-1',
    professionalId: '4',
    professionalName: 'Leila Mansouri',
    professionalAvatar: '/avatars/leila.jpg',
    serviceCategory: 'Ménage',
    rating: 4.9,
    reviewCount: 312,
    startingPrice: 80,
    cityName: 'Casablanca',
    addedAt: '2024-08-20T14:30:00Z'
  },
  {
    id: 'fav-3',
    clientId: 'client-1',
    professionalId: '6',
    professionalName: 'Amina Bouazza',
    professionalAvatar: '/avatars/amina.jpg',
    serviceCategory: 'Jardinage',
    rating: 4.8,
    reviewCount: 94,
    startingPrice: 100,
    cityName: 'Tanger',
    addedAt: '2024-10-05T09:15:00Z'
  },
  {
    id: 'fav-4',
    clientId: 'client-1',
    professionalId: '11',
    professionalName: 'Hassan Alaoui',
    professionalAvatar: '/avatars/hassan.jpg',
    serviceCategory: 'Électricité',
    rating: 4.8,
    reviewCount: 134,
    startingPrice: 250,
    cityName: 'Casablanca',
    addedAt: '2024-07-12T16:45:00Z'
  },
  {
    id: 'fav-5',
    clientId: 'client-1',
    professionalId: '19',
    professionalName: 'Adil Mansouri',
    professionalAvatar: '/avatars/adil.jpg',
    serviceCategory: 'Électricité',
    rating: 4.9,
    reviewCount: 87,
    startingPrice: 300,
    cityName: 'Rabat',
    addedAt: '2024-11-01T11:20:00Z'
  }
];

export const mockClientStats: ClientStats = {
  totalBookings: 12,
  activeBookings: 2,
  completedBookings: 8,
  totalSpent: 8500,
  averageRating: 4.7,
  favoriteCount: 8,
  unreadMessages: 1
};

// Helper functions for client dashboard
export const getClientBookingsByStatus = (status?: ClientBooking['status']): ClientBooking[] => {
  if (!status) return mockClientBookings;
  return mockClientBookings.filter(booking => booking.status === status);
};

export const getClientUnreadMessages = (): ClientMessage[] => {
  return mockClientMessages.filter(message => !message.isRead && message.isFromClient === false);
};

export const getClientRecentBookings = (limit: number = 5): ClientBooking[] => {
  return mockClientBookings
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};

export const getClientUpcomingBookings = (): ClientBooking[] => {
  const now = new Date();
  return mockClientBookings
    .filter(booking => {
      const bookingDate = new Date(`${booking.scheduledDate}T${booking.scheduledTime}`);
      return bookingDate > now && booking.status !== 'cancelled';
    })
    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());
};

// Pro Dashboard types
export interface ProProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  cityId: string;
  cityName?: string;
  serviceCategoryId: string;
  serviceCategoryName?: string;
  title: string;
  shortBio: string;
  isVerified: boolean;
  isPremium: boolean;
  rating: number;
  reviewCount: number;
  responseRate: number; // percentage
  monthlyRevenue: number;
  totalBookings: number;
  completedBookings: number;
  createdAt: string;
  badges: string[];
}

export interface ProBooking {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  clientPhone: string;
  serviceId: string;
  serviceName: string;
  serviceCategory: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  scheduledDate: string;
  scheduledTime: string;
  duration: string;
  price: number;
  location: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  unreadMessages: number;
}

export interface ProService {
  id: string;
  proId: string;
  name: string;
  description: string;
  price: number;
  duration: string; // e.g., "1h", "2h30"
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  bookingCount: number;
}

export interface ProTransaction {
  id: string;
  bookingId: string;
  clientName: string;
  serviceName: string;
  amount: number;
  fee: number; // platform fee
  netAmount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentDate: string;
  createdAt: string;
}

export interface ProEarningsStats {
  monthlyRevenue: number;
  totalRevenue: number;
  pendingPayments: number;
  averageTicket: number;
  growthRate: number; // percentage
  totalTransactions: number;
}

// Mock pro data
export const mockProProfile: ProProfile = {
  id: 'pro-1',
  fullName: 'Ahmed Bennani',
  email: 'ahmed.bennani@email.com',
  phone: '+212 6 12 34 56 78',
  avatar: '/avatars/ahmed.jpg',
  cityId: '1',
  cityName: 'Casablanca',
  serviceCategoryId: '1',
  serviceCategoryName: 'Plomberie',
  title: 'Plombier certifié',
  shortBio: 'Expert en réparation et installation de plomberie depuis 12 ans. Intervention rapide et garantie.',
  isVerified: true,
  isPremium: false,
  rating: 4.8,
  reviewCount: 127,
  responseRate: 98,
  monthlyRevenue: 12500,
  totalBookings: 45,
  completedBookings: 42,
  createdAt: '2023-06-15T10:00:00Z',
  badges: ['Top professionnel', 'Réponse rapide', 'Service garanti']
};

export const mockProBookings: ProBooking[] = [
  {
    id: 'pro-booking-1',
    clientId: 'client-1',
    clientName: 'Karim Bennani',
    clientAvatar: '/avatars/client-karim.jpg',
    clientPhone: '+212 6 98 76 54 32',
    serviceId: 'service-1',
    serviceName: 'Réparation de fuite d\'eau',
    serviceCategory: 'Plomberie',
    status: 'confirmed',
    scheduledDate: '2024-11-25',
    scheduledTime: '09:00',
    duration: '2h',
    price: 300,
    location: 'Casablanca, Maarif',
    notes: 'Fuite sous l\'évier de la cuisine',
    createdAt: '2024-11-20T14:30:00Z',
    updatedAt: '2024-11-20T14:30:00Z',
    unreadMessages: 1
  },
  {
    id: 'pro-booking-2',
    clientId: 'client-2',
    clientName: 'Fatima Alaoui',
    clientAvatar: '/avatars/fatima.jpg',
    clientPhone: '+212 6 11 22 33 44',
    serviceId: 'service-2',
    serviceName: 'Installation chauffe-eau',
    serviceCategory: 'Plomberie',
    status: 'pending',
    scheduledDate: '2024-11-28',
    scheduledTime: '14:00',
    duration: '3h',
    price: 450,
    location: 'Rabat, Agdal',
    notes: 'Installation d\'un chauffe-eau électrique 200L',
    createdAt: '2024-11-18T10:15:00Z',
    updatedAt: '2024-11-18T10:15:00Z',
    unreadMessages: 0
  },
  {
    id: 'pro-booking-3',
    clientId: 'client-3',
    clientName: 'Mohammed Tazi',
    clientAvatar: '/avatars/mohammed.jpg',
    clientPhone: '+212 6 55 66 77 88',
    serviceId: 'service-3',
    serviceName: 'Débouchage canalisation',
    serviceCategory: 'Plomberie',
    status: 'completed',
    scheduledDate: '2024-11-15',
    scheduledTime: '11:00',
    duration: '1h',
    price: 150,
    location: 'Marrakech, Gueliz',
    notes: 'Débouchage complet salle de bain',
    createdAt: '2024-11-10T09:00:00Z',
    updatedAt: '2024-11-15T12:00:00Z',
    unreadMessages: 0
  },
  {
    id: 'pro-booking-4',
    clientId: 'client-4',
    clientName: 'Leila Mansouri',
    clientAvatar: '/avatars/leila.jpg',
    clientPhone: '+212 6 44 33 22 11',
    serviceId: 'service-4',
    serviceName: 'Réparation robinetterie',
    serviceCategory: 'Plomberie',
    status: 'in_progress',
    scheduledDate: '2024-11-22',
    scheduledTime: '16:00',
    duration: '1h30',
    price: 200,
    location: 'Casablanca, Racine',
    notes: 'Réparation de 3 robinets qui fuient',
    createdAt: '2024-11-19T13:45:00Z',
    updatedAt: '2024-11-19T13:45:00Z',
    unreadMessages: 2
  },
  {
    id: 'pro-booking-5',
    clientId: 'client-5',
    clientName: 'Youssef El Amrani',
    clientAvatar: '/avatars/youssef.jpg',
    clientPhone: '+212 6 77 88 99 00',
    serviceId: 'service-5',
    serviceName: 'Installation salle de bain',
    serviceCategory: 'Plomberie',
    status: 'cancelled',
    scheduledDate: '2024-11-20',
    scheduledTime: '08:00',
    duration: '4h',
    price: 600,
    location: 'Fès, Ville Nouvelle',
    notes: 'Installation complète douche + WC',
    createdAt: '2024-11-12T11:20:00Z',
    updatedAt: '2024-11-18T15:30:00Z',
    unreadMessages: 0
  }
];

export const mockProServices: ProService[] = [
  {
    id: 'service-1',
    proId: 'pro-1',
    name: 'Réparation de fuite d\'eau',
    description: 'Diagnostic et réparation de toutes types de fuites d\'eau. Intervention rapide garantie.',
    price: 150,
    duration: '1-2h',
    category: 'Réparation',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    bookingCount: 23
  },
  {
    id: 'service-2',
    proId: 'pro-1',
    name: 'Installation de chauffe-eau',
    description: 'Installation complète de chauffe-eau électrique ou gaz avec mise en service.',
    price: 300,
    duration: '2-3h',
    category: 'Installation',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    bookingCount: 15
  },
  {
    id: 'service-3',
    proId: 'pro-1',
    name: 'Débouchage canalisation',
    description: 'Débouchage professionnel avec équipement spécialisé. Traitement écologique.',
    price: 120,
    duration: '30-60min',
    category: 'Débouchage',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    bookingCount: 31
  },
  {
    id: 'service-4',
    proId: 'pro-1',
    name: 'Réparation robinetterie',
    description: 'Réparation et remplacement de robinets, mélangeurs et accessoires.',
    price: 100,
    duration: '45min-1h',
    category: 'Réparation',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    bookingCount: 18
  },
  {
    id: 'service-5',
    proId: 'pro-1',
    name: 'Installation salle de bain',
    description: 'Installation complète de salle de bain : douche, WC, lavabo avec finitions.',
    price: 800,
    duration: '1 journée',
    category: 'Installation',
    isActive: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-06-20T14:00:00Z',
    bookingCount: 7
  }
];

export const mockProTransactions: ProTransaction[] = [
  {
    id: 'txn-1',
    bookingId: 'pro-booking-3',
    clientName: 'Mohammed Tazi',
    serviceName: 'Débouchage canalisation',
    amount: 150,
    fee: 15, // 10% platform fee
    netAmount: 135,
    status: 'completed',
    paymentDate: '2024-11-15T12:00:00Z',
    createdAt: '2024-11-15T12:00:00Z'
  },
  {
    id: 'txn-2',
    bookingId: 'pro-booking-1',
    clientName: 'Karim Bennani',
    serviceName: 'Réparation de fuite d\'eau',
    amount: 300,
    fee: 30,
    netAmount: 270,
    status: 'completed',
    paymentDate: '2024-11-20T16:00:00Z',
    createdAt: '2024-11-20T16:00:00Z'
  },
  {
    id: 'txn-3',
    bookingId: 'pro-booking-4',
    clientName: 'Leila Mansouri',
    serviceName: 'Réparation robinetterie',
    amount: 200,
    fee: 20,
    netAmount: 180,
    status: 'pending',
    paymentDate: '2024-11-22T16:00:00Z',
    createdAt: '2024-11-19T13:45:00Z'
  },
  {
    id: 'txn-4',
    bookingId: 'pro-booking-2',
    clientName: 'Fatima Alaoui',
    serviceName: 'Installation chauffe-eau',
    amount: 450,
    fee: 45,
    netAmount: 405,
    status: 'pending',
    paymentDate: '2024-11-28T14:00:00Z',
    createdAt: '2024-11-18T10:15:00Z'
  }
];

export const mockProEarningsStats: ProEarningsStats = {
  monthlyRevenue: 12500,
  totalRevenue: 87500,
  pendingPayments: 585,
  averageTicket: 208,
  growthRate: 15.5,
  totalTransactions: 421
};

// Helper functions for pro dashboard
export const getProBookingsByStatus = (status?: ProBooking['status']): ProBooking[] => {
  if (!status) return mockProBookings;
  return mockProBookings.filter(booking => booking.status === status);
};

export const getProRecentBookings = (limit: number = 5): ProBooking[] => {
  return mockProBookings
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};

export const getProPendingBookings = (): ProBooking[] => {
  return mockProBookings.filter(booking => booking.status === 'pending');
};

export const getProActiveServices = (): ProService[] => {
  return mockProServices.filter(service => service.isActive);
};

export const getProMonthlyTransactions = (month?: string): ProTransaction[] => {
  if (!month) {
    // Return current month transactions
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    return mockProTransactions.filter(txn =>
      txn.createdAt.startsWith(currentMonth)
    );
  }
  return mockProTransactions.filter(txn =>
    txn.createdAt.startsWith(month)
  );
};

export const getProRevenueByMonth = (): { month: string; revenue: number }[] => {
  // Mock monthly revenue data for the last 6 months
  return [
    { month: '2024-06', revenue: 9200 },
    { month: '2024-07', revenue: 10100 },
    { month: '2024-08', revenue: 11800 },
    { month: '2024-09', revenue: 11200 },
    { month: '2024-10', revenue: 12100 },
    { month: '2024-11', revenue: 12500 }
  ];
};

// Support & Legal types
export interface SupportCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  articleCount: number;
  isPopular: boolean;
}

export interface SupportArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  views: number;
  helpful: number;
  notHelpful: number;
  tags: string[];
  isPublished: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  isPopular: boolean;
  views: number;
}

// Support mock data
export const mockSupportCategories: SupportCategory[] = [
  {
    id: '1',
    name: 'Réservations',
    slug: 'reservations',
    description: 'Tout savoir sur vos réservations et rendez-vous',
    icon: 'Calendar',
    color: '#F97B22',
    articleCount: 8,
    isPopular: true
  },
  {
    id: '2',
    name: 'Paiements',
    slug: 'paiements',
    description: 'Paiements sécurisés et remboursements',
    icon: 'CreditCard',
    color: '#2E7D32',
    articleCount: 6,
    isPopular: true
  },
  {
    id: '3',
    name: 'Mon compte',
    slug: 'compte',
    description: 'Gestion de votre profil et paramètres',
    icon: 'User',
    color: '#1976D2',
    articleCount: 5,
    isPopular: false
  },
  {
    id: '4',
    name: 'Sécurité',
    slug: 'securite',
    description: 'Protection de vos données et sécurité',
    icon: 'Shield',
    color: '#D32F2F',
    articleCount: 4,
    isPopular: false
  },
  {
    id: '5',
    name: 'Litiges',
    slug: 'litiges',
    description: 'Résoudre les problèmes et conflits',
    icon: 'AlertTriangle',
    color: '#FF9800',
    articleCount: 3,
    isPopular: false
  },
  {
    id: '6',
    name: 'Services',
    slug: 'services',
    description: 'Comprendre nos services et tarifs',
    icon: 'Wrench',
    color: '#9C27B0',
    articleCount: 7,
    isPopular: true
  }
];

export const mockSupportArticles: SupportArticle[] = [
  {
    id: '1',
    slug: 'comment-annuler-reservation',
    title: 'Comment annuler ou modifier une réservation ?',
    excerpt: 'Découvrez comment gérer vos réservations : annulation, modification de date ou de service.',
    content: `# Comment annuler ou modifier une réservation ?

Vous pouvez gérer vos réservations directement depuis votre tableau de bord client ou l'application mobile.

## Annulation d'une réservation

### Délais d'annulation
- **Plus de 24h avant** : Annulation gratuite
- **Entre 24h et 2h avant** : Frais d'annulation de 20%
- **Moins de 2h avant** : Frais d'annulation de 50%

### Comment annuler
1. Connectez-vous à votre compte
2. Allez dans "Mes réservations"
3. Sélectionnez la réservation
4. Cliquez sur "Annuler"
5. Confirmez l'annulation

## Modification d'une réservation

### Ce qui peut être modifié
- Date et heure du rendez-vous
- Adresse d'intervention
- Service demandé (sous conditions)

### Conditions de modification
- Au moins 24h avant le rendez-vous
- Même professionnel disponible
- Tarif identique ou supérieur

### Procédure de modification
1. Contactez directement le professionnel
2. Ou utilisez le chat intégré
3. Le professionnel confirmera la modification

## Remboursement

### Délais de traitement
- Annulation gratuite : Remboursement sous 3-5 jours ouvrés
- Annulation avec frais : Remboursement sous 7-10 jours ouvrés

### Méthodes de remboursement
- Carte bancaire : Même carte utilisée
- Virement bancaire : Sur demande
- PayPal : Retour sur votre compte

## Conseils importants

⚠️ **Important** : Les annulations répétées peuvent affecter votre compte.

💡 **Astuce** : Contactez toujours le professionnel en premier pour une modification.

📞 **Support** : Notre équipe est là pour vous aider en cas de problème.`,
    categoryId: '1',
    categoryName: 'Réservations',
    categoryColor: '#F97B22',
    author: 'Équipe Support Khadamat',
    publishedAt: '2024-11-15T10:00:00Z',
    updatedAt: '2024-11-15T10:00:00Z',
    views: 1250,
    helpful: 89,
    notHelpful: 3,
    tags: ['annulation', 'modification', 'remboursement'],
    isPublished: true
  },
  {
    id: '2',
    slug: 'paiement-securise',
    title: 'Comment fonctionne le paiement sécurisé ?',
    excerpt: 'Découvrez notre système de paiement sécurisé et les garanties offertes.',
    content: `# Comment fonctionne le paiement sécurisé ?

Chez Khadamat, votre sécurité est notre priorité. Nous utilisons les dernières technologies de paiement sécurisé.

## Paiement en ligne

### Méthodes acceptées
- **Carte bancaire** : Visa, MasterCard, American Express
- **PayPal** : Compte PayPal ou carte bancaire
- **Virement bancaire** : Pour les montants élevés

### Sécurité des transactions
- Chiffrement SSL 256 bits
- Tokenisation des données bancaires
- Conformité PCI DSS
- Authentification 3D Secure

## Moment du paiement

### Réservation
- Paiement immédiat lors de la réservation
- Montant bloqué sur votre compte
- Libération après service rendu

### Service terminé
- Confirmation du service par le professionnel
- Validation par le client sous 24h
- Virement au professionnel sous 2-3 jours

## Garanties Khadamat

### Protection acheteur
- Service non conforme : Remboursement intégral
- Professionnel absent : Annulation gratuite + remboursement
- Problème qualité : Médiation gratuite

### Assurance qualité
- Vérification des professionnels
- Avis clients certifiés
- Support client 7j/7

## Frais et commissions

### Pour les clients
- Aucun frais supplémentaire
- Prix affiché = prix payé
- Frais de paiement inclus

### Pour les professionnels
- Commission de 10% sur chaque transaction
- Frais de traitement bancaire inclus
- Paiement sous 48h après service

## Problèmes de paiement

### Carte refusée
- Vérifiez vos fonds disponibles
- Contactez votre banque
- Essayez une autre carte

### Erreur technique
- Actualisez la page
- Videz le cache de votre navigateur
- Contactez notre support

### Remboursement
- Traitement sous 3-5 jours ouvrés
- Même méthode de paiement
- Confirmation par email

## Conseils de sécurité

🔒 **Sécurité** : Ne partagez jamais vos informations bancaires par email.

⚡ **Rapidité** : Les paiements sont traités instantanément.

📞 **Support** : Notre équipe vous aide pour tout problème de paiement.`,
    categoryId: '2',
    categoryName: 'Paiements',
    categoryColor: '#2E7D32',
    author: 'Équipe Support Khadamat',
    publishedAt: '2024-11-12T14:30:00Z',
    updatedAt: '2024-11-12T14:30:00Z',
    views: 890,
    helpful: 76,
    notHelpful: 2,
    tags: ['paiement', 'sécurité', 'remboursement'],
    isPublished: true
  },
  {
    id: '3',
    slug: 'modifier-mot-de-passe',
    title: 'Comment modifier mon mot de passe ?',
    excerpt: 'Guide simple pour changer votre mot de passe et sécuriser votre compte.',
    content: `# Comment modifier mon mot de passe ?

La sécurité de votre compte est importante. Voici comment changer votre mot de passe facilement.

## Depuis votre compte

### Via le tableau de bord
1. Connectez-vous à votre compte
2. Cliquez sur votre avatar en haut à droite
3. Sélectionnez "Paramètres du compte"
4. Allez dans "Sécurité"
5. Cliquez sur "Changer le mot de passe"

### Via l'application mobile
1. Ouvrez l'application Khadamat
2. Allez dans "Profil"
3. Touchez "Paramètres"
4. Sélectionnez "Mot de passe"
5. Suivez les instructions

## Mot de passe oublié

### Réinitialisation par email
1. Sur la page de connexion, cliquez sur "Mot de passe oublié ?"
2. Entrez votre adresse email
3. Vérifiez votre boîte mail
4. Cliquez sur le lien de réinitialisation
5. Créez un nouveau mot de passe

### Réinitialisation par SMS
1. Choisissez "Réinitialisation par SMS"
2. Entrez votre numéro de téléphone
3. Recevez le code de vérification
4. Entrez le code
5. Créez un nouveau mot de passe

## Exigences du mot de passe

### Critères obligatoires
- Au minimum 8 caractères
- Au moins une lettre majuscule
- Au moins une lettre minuscule
- Au moins un chiffre
- Au moins un caractère spécial (!@#$%^&*)

### Conseils de sécurité
- Utilisez des mots de passe uniques
- Changez régulièrement votre mot de passe
- N'utilisez pas d'informations personnelles
- Activez l'authentification à deux facteurs

## Authentification à deux facteurs (2FA)

### Activation
1. Allez dans "Paramètres de sécurité"
2. Cliquez sur "Activer 2FA"
3. Choisissez votre méthode (SMS ou application)
4. Suivez les instructions d'installation

### Applications recommandées
- Google Authenticator
- Authy
- Microsoft Authenticator
- LastPass Authenticator

## Problèmes courants

### Mot de passe rejeté
- Vérifiez les critères de sécurité
- Évitez les mots de passe trop simples
- N'utilisez pas votre nom ou date de naissance

### Email de réinitialisation non reçu
- Vérifiez votre dossier spam
- Attendez quelques minutes
- Contactez le support si nécessaire

### Compte bloqué
- Trop de tentatives de connexion échouées
- Contactez le support pour déblocage
- Réinitialisation du mot de passe requise

## Conseils de sécurité

🔐 **Confidentialité** : Ne partagez jamais votre mot de passe.

📱 **2FA** : Activez l'authentification à deux facteurs.

🔄 **Changement régulier** : Changez votre mot de passe tous les 3 mois.

📞 **Support** : Notre équipe vous aide en cas de problème.`,
    categoryId: '3',
    categoryName: 'Mon compte',
    categoryColor: '#1976D2',
    author: 'Équipe Support Khadamat',
    publishedAt: '2024-11-10T09:15:00Z',
    updatedAt: '2024-11-10T09:15:00Z',
    views: 654,
    helpful: 92,
    notHelpful: 1,
    tags: ['mot de passe', 'sécurité', 'compte'],
    isPublished: true
  },
  {
    id: '4',
    slug: 'signaler-probleme-securite',
    title: 'Comment signaler un problème de sécurité ?',
    excerpt: 'Découvrez comment signaler les problèmes de sécurité et protéger la communauté Khadamat.',
    content: `# Comment signaler un problème de sécurité ?

La sécurité de notre communauté est primordiale. Voici comment signaler tout problème de sécurité.

## Types de problèmes à signaler

### Comptes suspects
- Profils frauduleux
- Tentatives d'escroquerie
- Comportements inappropriés
- Violations des conditions d'utilisation

### Problèmes techniques
- Fuites de données
- Accès non autorisé
- Virus ou malware
- Phishing

### Problèmes de paiement
- Fraude détectée
- Transactions suspectes
- Problèmes de remboursement
- Erreurs de facturation

## Comment signaler

### Via l'application
1. Allez sur le profil ou la réservation concernée
2. Cliquez sur les trois points "..."
3. Sélectionnez "Signaler un problème"
4. Choisissez la catégorie du problème
5. Décrivez le problème en détail
6. Ajoutez des captures d'écran si possible

### Via le site web
1. Connectez-vous à votre compte
2. Allez dans "Aide & Support"
3. Cliquez sur "Signaler un problème"
4. Remplissez le formulaire détaillé
5. Téléchargez des preuves si nécessaire

### Par email
- **Support sécurité** : security@khadamat.ma
- **Urgences** : emergency@khadamat.ma
- **Fraude** : fraud@khadamat.ma

## Traitement des signalements

### Délais de réponse
- **Signalements standards** : 24-48h
- **Urgences sécurité** : Immédiat
- **Fraude** : 4-6h ouvrées

### Actions prises
- Investigation approfondie
- Suspension temporaire si nécessaire
- Résolution du problème
- Communication transparente

## Protection de vos données

### Confidentialité
- Vos signalements sont confidentiels
- Anonymat préservé si souhaité
- Protection des données personnelles

### Suivi
- Numéro de ticket pour suivi
- Mises à jour régulières
- Résolution garantie

## Prévention

### Conseils de sécurité
- Vérifiez toujours les profils
- Utilisez des mots de passe forts
- Activez l'authentification 2FA
- Méfiez-vous des offres trop belles

### Signes d'alerte
- Prix anormalement bas
- Demandes de paiement extérieur
- Pression pour réserver rapidement
- Informations manquantes sur le profil

## Contact d'urgence

### En cas d'urgence
- **Police** : 19 (Maroc)
- **Support Khadamat** : +212 6 12 34 56 78
- **Email urgence** : emergency@khadamat.ma

### Heures d'ouverture
- Support sécurité : 24h/24, 7j/7
- Support technique : 8h-20h, du lundi au samedi
- Support commercial : 9h-18h, du lundi au vendredi

## Engagement Khadamat

🛡️ **Sécurité** : Nous prenons tous les signalements au sérieux.

⚡ **Rapidité** : Action immédiate sur les menaces graves.

🤝 **Transparence** : Communication claire sur les actions prises.

📞 **Support** : Notre équipe est là pour vous protéger.`,
    categoryId: '4',
    categoryName: 'Sécurité',
    categoryColor: '#D32F2F',
    author: 'Équipe Support Khadamat',
    publishedAt: '2024-11-08T11:45:00Z',
    updatedAt: '2024-11-08T11:45:00Z',
    views: 432,
    helpful: 67,
    notHelpful: 0,
    tags: ['sécurité', 'signalement', 'fraude'],
    isPublished: true
  },
  {
    id: '5',
    slug: 'resoudre-litige-client',
    title: 'Comment résoudre un litige avec un professionnel ?',
    excerpt: 'Guide pour résoudre les conflits et obtenir satisfaction en cas de problème.',
    content: `# Comment résoudre un litige avec un professionnel ?

Nous sommes là pour vous aider à résoudre tout litige de manière amiable et efficace.

## Étapes de résolution

### 1. Contact direct
**Première étape** : Contactez toujours le professionnel en premier.

#### Comment procéder
- Utilisez le chat intégré à la plateforme
- Soyez courtois et précis dans votre demande
- Fournissez des photos ou vidéos si nécessaire
- Donnez un délai raisonnable pour la réponse

#### Délais attendus
- Réponse sous 24h pour les professionnels actifs
- Résolution sous 48-72h pour les problèmes simples
- Plus de temps pour les problèmes complexes

### 2. Médiation Khadamat
**Deuxième étape** : Si le contact direct échoue.

#### Quand faire appel à nous
- Pas de réponse du professionnel sous 48h
- Refus injustifié de résoudre le problème
- Désaccord sur la qualité du service
- Problème de facturation

#### Comment nous contacter
1. Allez dans "Mes réservations"
2. Sélectionnez la réservation concernée
3. Cliquez sur "Signaler un problème"
4. Choisissez "Litige avec professionnel"
5. Décrivez le problème en détail

### 3. Arbitrage
**Dernière étape** : Si la médiation échoue.

#### Conditions d'arbitrage
- Preuves suffisantes fournies
- Tentative de résolution amiable effectuée
- Délai de 30 jours après la prestation
- Montant du litige > 200 DH

#### Procédure
- Soumission du dossier complet
- Examen par notre équipe d'arbitrage
- Décision sous 15 jours
- Application immédiate de la décision

## Types de litiges courants

### Qualité du service
- Travail non conforme aux attentes
- Matériaux de mauvaise qualité
- Délais non respectés
- Comportement inapproprié

### Problèmes de paiement
- Frais supplémentaires non prévus
- Facturation erronée
- Remboursement refusé
- Problèmes techniques de paiement

### Annulation et retard
- Annulation injustifiée
- Retards importants
- Non-présentation du professionnel
- Changement de conditions

## Garanties Khadamat

### Protection client
- **Satisfaction garantie** : Résolution de 95% des litiges
- **Remboursement possible** : Jusqu'à 100% selon le cas
- **Support gratuit** : Médiation sans frais supplémentaires
- **Rapidité** : Traitement sous 48h en moyenne

### Engagements
- **Impartialité** : Décisions basées sur les faits
- **Transparence** : Communication claire des décisions
- **Efficacité** : Résolutions concrètes et applicables

## Prévention des litiges

### Avant la réservation
- Lisez attentivement les profils professionnels
- Vérifiez les avis et certifications
- Posez toutes vos questions avant de réserver
- Prenez des photos de l'état initial

### Pendant le service
- Communiquez régulièrement avec le professionnel
- Notez tout problème immédiatement
- Prenez des photos du travail en cours
- Conservez tous les échanges

### Après le service
- Laissez un avis détaillé
- Signalez immédiatement tout problème
- Conservez les factures et photos
- Contactez le support si nécessaire

## Contact support litiges

### Coordonnées
- **Email** : litiges@khadamat.ma
- **Téléphone** : +212 6 12 34 56 78
- **Chat** : Disponible 24h/24 dans l'application

### Horaires
- **Support litiges** : 9h-18h, du lundi au vendredi
- **Urgences** : 24h/24, 7j/7
- **Délai de réponse** : 4h maximum

## Conseils importants

⚖️ **Calme** : Restez courtois dans vos échanges.

📝 **Preuves** : Conservez tous les éléments de preuve.

⏰ **Rapidité** : Signalez les problèmes rapidement.

🤝 **Dialogue** : Le dialogue résout 80% des litiges.

📞 **Support** : Notre équipe vous accompagne à chaque étape.`,
    categoryId: '5',
    categoryName: 'Litiges',
    categoryColor: '#FF9800',
    author: 'Équipe Support Khadamat',
    publishedAt: '2024-11-05T16:20:00Z',
    updatedAt: '2024-11-05T16:20:00Z',
    views: 387,
    helpful: 58,
    notHelpful: 2,
    tags: ['litige', 'résolution', 'médiation'],
    isPublished: true
  },
  {
    id: '6',
    slug: 'comprendre-tarifs-services',
    title: 'Comment comprendre les tarifs des services ?',
    excerpt: 'Découvrez comment sont fixés les prix et ce qui influence les tarifs.',
    content: `# Comment comprendre les tarifs des services ?

Les prix sur Khadamat sont transparents et compétitifs. Voici comment ils sont déterminés.

## Structure des prix

### Prix affiché
- **Prix de base** : Tarif minimum pour le service standard
- **Prix moyen** : Tarif le plus demandé
- **Prix maximum** : Pour services premium ou complexes

### Éléments inclus
- Déplacement du professionnel
- Main d'œuvre qualifiée
- Matériaux de base (si mentionné)
- Garantie du travail
- Assurance responsabilité civile

## Facteurs influençant les prix

### Expérience du professionnel
- **Débutant** : 0-2 ans d'expérience (-20% sur moyenne)
- **Confirmé** : 3-5 ans d'expérience (prix moyen)
- **Expert** : 5+ ans d'expérience (+20% sur moyenne)

### Complexité du travail
- **Simple** : Travaux standards (-10%)
- **Moyen** : Travaux nécessitant expertise (prix de base)
- **Complexe** : Travaux techniques avancés (+30%)

### Localisation
- **Casablanca/Rabat** : Prix de référence
- **Marrakech/Fès** : -5% à +5%
- **Autres villes** : -10% à +10%

### Saisonnalité
- **Haute saison** : +10-15% (été pour clim, hiver pour chauffage)
- **Basse saison** : -5% (périodes creuses)

## Tarifs par catégorie

### Plomberie
- **Réparation fuite** : 150-300 DH
- **Installation chauffe-eau** : 300-600 DH
- **Salle de bain complète** : 800-2000 DH

### Électricité
- **Réparation prise** : 100-200 DH
- **Installation complète** : 2500-5000 DH
- **Domotique** : 1500-3000 DH

### Ménage
- **Ménage standard** : 80-120 DH
- **Grand ménage** : 150-250 DH
- **Nettoyage bureaux** : 100-150 DH

### Peinture
- **Pièce simple** : 400-600 DH
- **Façade** : 800-1500 DH
- **Décoratif** : 200-400 DH

## Frais supplémentaires

### Déplacements
- **Zone urbaine** : Inclus dans le prix
- **Zone périurbaine** : +50-100 DH
- **Zone rurale** : +100-200 DH

### Matériaux
- **Fournis par le pro** : +20-50% sur coût réel
- **Fournis par le client** : Prix main d'œuvre uniquement
- **Options premium** : +10-30% sur tarif standard

### Urgences
- **Intervention < 24h** : +50% sur tarif normal
- **Intervention < 2h** : +100% sur tarif normal
- **Week-end/nuits** : +30% sur tarif normal

## Réductions et avantages

### Khadamat Premium
- **Réduction** : -10% sur tous les services
- **Priorité** : Réservation accélérée
- **Support** : Ligne dédiée

### Premiers clients
- **Réduction** : -15% sur 3 premières réservations
- **Code promo** : KHADAMAT15

### Fidélité
- **À partir de 5 réservations** : -5% automatique
- **Programme VIP** : Réductions croissantes

## Transparence des prix

### Commission Khadamat
- **10%** sur chaque transaction
- Inclus dans le prix affiché
- Support et sécurité inclus

### Pas de frais cachés
- Prix affiché = prix payé
- Pas de frais de réservation
- Pas de frais d'annulation (sous conditions)

### Garanties incluses
- **Qualité** : Garantie 1 an sur travaux
- **Satisfaction** : Remboursement si insatisfaction
- **Assurance** : Couverture professionnelle

## Conseils pour économiser

### Planification
- Réservez à l'avance pour éviter suppléments
- Choisissez des créneaux standards
- Regroupez plusieurs services

### Comparaison
- Comparez 3 devis minimum
- Lisez les avis clients
- Vérifiez les certifications

### Négociation
- Négociez pour travaux multiples
- Demandez devis détaillé
- Mentionnez concurrence si pertinente

## Support tarifaire

### Questions fréquentes
- **Prix trop élevé** : Contactez le professionnel pour négocier
- **Prix trop bas** : Méfiance, peut indiquer manque de qualité
- **Devis gratuit** : Toujours demandé avant réservation

### Contact
- **Email** : tarifs@khadamat.ma
- **Chat** : Disponible dans l'application
- **Téléphone** : +212 6 12 34 56 78

## Engagement transparence

💰 **Clarté** : Prix transparents et justifiés.

⚖️ **Équité** : Tarifs adaptés à la qualité du service.

🤝 **Confiance** : Pas de mauvaises surprises.

📞 **Support** : Notre équipe explique tous les tarifs.`,
    categoryId: '6',
    categoryName: 'Services',
    categoryColor: '#9C27B0',
    author: 'Équipe Support Khadamat',
    publishedAt: '2024-11-03T13:10:00Z',
    updatedAt: '2024-11-03T13:10:00Z',
    views: 756,
    helpful: 83,
    notHelpful: 1,
    tags: ['tarifs', 'prix', 'transparence'],
    isPublished: true
  }
];

export const mockFAQItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Comment puis-je annuler une réservation ?',
    answer: 'Vous pouvez annuler votre réservation directement depuis votre tableau de bord client. Allez dans "Mes réservations", sélectionnez la réservation concernée et cliquez sur "Annuler". Les conditions d\'annulation varient selon le délai avant le rendez-vous.',
    category: 'Réservations',
    isPopular: true,
    views: 1250
  },
  {
    id: 'faq-2',
    question: 'Quand serai-je débité pour ma réservation ?',
    answer: 'Le paiement est débité immédiatement lors de la confirmation de votre réservation. Les fonds sont sécurisés et ne sont versés au professionnel qu\'après validation du service rendu.',
    category: 'Paiements',
    isPopular: true,
    views: 890
  },
  {
    id: 'faq-3',
    question: 'Comment contacter un professionnel ?',
    answer: 'Utilisez le système de messagerie intégré à la plateforme. Allez sur la page du professionnel ou dans vos réservations actives pour accéder au chat. Les professionnels répondent généralement sous 2 heures.',
    category: 'Réservations',
    isPopular: true,
    views: 654
  },
  {
    id: 'faq-4',
    question: 'Que faire si le professionnel est en retard ?',
    answer: 'Contactez immédiatement le professionnel via le chat. Si le retard dépasse 30 minutes, vous pouvez annuler gratuitement. Khadamat vous remboursera intégralement.',
    category: 'Réservations',
    isPopular: false,
    views: 432
  },
  {
    id: 'faq-5',
    question: 'Comment modifier mes informations de paiement ?',
    answer: 'Allez dans "Paramètres du compte" > "Moyens de paiement". Vous pouvez ajouter, modifier ou supprimer vos cartes bancaires. Toutes les transactions sont sécurisées.',
    category: 'Paiements',
    isPopular: false,
    views: 387
  },
  {
    id: 'faq-6',
    question: 'Comment laisser un avis sur un service ?',
    answer: 'Après validation du service, vous recevrez une notification pour laisser votre avis. Les avis sont anonymes et aident la communauté à choisir les meilleurs professionnels.',
    category: 'Mon compte',
    isPopular: false,
    views: 298
  },
  {
    id: 'faq-7',
    question: 'Que faire en cas de problème avec un service ?',
    answer: 'Contactez d\'abord le professionnel via le chat. Si le problème persiste, signalez-le via "Signaler un problème" dans votre réservation. Notre équipe de médiation interviendra gratuitement.',
    category: 'Litiges',
    isPopular: true,
    views: 567
  },
  {
    id: 'faq-8',
    question: 'Comment devenir professionnel sur Khadamat ?',
    answer: 'Rendez-vous sur khadamat.ma/devenir-pro pour créer votre profil. Vous devrez fournir vos certifications, assurances et références. Notre équipe valide chaque candidature sous 48h.',
    category: 'Services',
    isPopular: false,
    views: 723
  },
  {
    id: 'faq-9',
    question: 'Mes données personnelles sont-elles sécurisées ?',
    answer: 'Oui, nous respectons le RGPD et utilisons le chiffrement SSL. Vos données ne sont jamais vendues et ne servent qu\'à améliorer votre expérience sur la plateforme.',
    category: 'Sécurité',
    isPopular: false,
    views: 345
  },
  {
    id: 'faq-10',
    question: 'Comment fonctionne la garantie Khadamat ?',
    answer: 'Tous les services bénéficient d\'une garantie de 1 an. En cas de problème, contactez le support. Nous organisons une intervention corrective gratuite ou un remboursement.',
    category: 'Services',
    isPopular: true,
    views: 678
  }
];

// Helper functions for support
export const getSupportArticleBySlug = (slug: string): SupportArticle | undefined => {
  return mockSupportArticles.find(article => article.slug === slug && article.isPublished);
};

export const getSupportArticlesByCategory = (categorySlug: string): SupportArticle[] => {
  const category = mockSupportCategories.find(cat => cat.slug === categorySlug);
  if (!category) return [];
  return mockSupportArticles.filter(article => article.categoryId === category.id && article.isPublished);
};

export const getPopularSupportArticles = (limit: number = 5): SupportArticle[] => {
  return mockSupportArticles
    .filter(article => article.isPublished)
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
};

export const getRelatedSupportArticles = (currentArticle: SupportArticle, limit: number = 3): SupportArticle[] => {
  return mockSupportArticles
    .filter(article =>
      article.id !== currentArticle.id &&
      article.isPublished &&
      (article.categoryId === currentArticle.categoryId ||
       article.tags.some(tag => currentArticle.tags.includes(tag)))
    )
    .slice(0, limit);
};

export const searchSupportArticles = (query: string): SupportArticle[] => {
  if (!query.trim()) return mockSupportArticles.filter(article => article.isPublished);

  const searchTerm = query.toLowerCase();
  return mockSupportArticles
    .filter(article =>
      article.isPublished && (
        article.title.toLowerCase().includes(searchTerm) ||
        article.content.toLowerCase().includes(searchTerm) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        article.categoryName.toLowerCase().includes(searchTerm)
      )
    );
};

export const getPopularFAQItems = (limit: number = 5): FAQItem[] => {
  return mockFAQItems
    .filter(faq => faq.isPopular)
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
};

// About page types
export interface CompanyStats {
  prosCount: number;
  missionsCompleted: number;
  averageRating: number;
  citiesCovered: number;
}

export interface TeamMember {
  id: string;
  fullName: string;
  role: string;
  shortBio: string;
  avatarUrl: string;
}

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

// About page mock data
export const mockCompanyStats: CompanyStats = {
  prosCount: 2500,
  missionsCompleted: 15000,
  averageRating: 4.8,
  citiesCovered: 15
};

export const mockTeamMembers: TeamMember[] = [
  {
    id: 'team-1',
    fullName: 'Ahmed Bennani',
    role: 'Co-fondateur & CEO',
    shortBio: 'Passionné par la simplification des services au Maroc, Ahmed a fondé Khadamat pour connecter artisans et clients de manière transparente.',
    avatarUrl: '/avatars/team-ahmed.jpg'
  },
  {
    id: 'team-2',
    fullName: 'Fatima Alaoui',
    role: 'Co-fondatrice & CTO',
    shortBio: 'Experte en technologie, Fatima développe les solutions innovantes qui rendent Khadamat fiable et sécurisée pour tous.',
    avatarUrl: '/avatars/team-fatima.jpg'
  },
  {
    id: 'team-3',
    fullName: 'Youssef Tazi',
    role: 'Directeur des Opérations',
    shortBio: 'Avec 10 ans d\'expérience dans les services, Youssef assure la qualité et la satisfaction de chaque intervention.',
    avatarUrl: '/avatars/team-youssef.jpg'
  },
  {
    id: 'team-4',
    fullName: 'Leila Mansouri',
    role: 'Responsable Qualité',
    shortBio: 'Leila veille à ce que chaque professionnel respecte nos standards élevés de service et de sécurité.',
    avatarUrl: '/avatars/team-leila.jpg'
  },
  {
    id: 'team-5',
    fullName: 'Karim Alaoui',
    role: 'Chef Produit',
    shortBio: 'Karim conçoit les fonctionnalités qui rendent Khadamat intuitive et adaptée aux besoins des utilisateurs marocains.',
    avatarUrl: '/avatars/team-karim.jpg'
  },
  {
    id: 'team-6',
    fullName: 'Amina Bouazza',
    role: 'Responsable Support Client',
    shortBio: 'Amina et son équipe accompagnent clients et professionnels pour une expérience exceptionnelle sur la plateforme.',
    avatarUrl: '/avatars/team-amina.jpg'
  }
];

export const mockCompanyValues: CompanyValue[] = [
  {
    id: 'value-1',
    title: 'Sécurité',
    description: 'Nous garantissons des transactions sécurisées et vérifions rigoureusement tous nos professionnels.',
    iconName: 'Shield'
  },
  {
    id: 'value-2',
    title: 'Transparence',
    description: 'Prix clairs, avis authentiques, processus transparents : la confiance est au cœur de notre modèle.',
    iconName: 'Eye'
  },
  {
    id: 'value-3',
    title: 'Qualité',
    description: 'Nous sélectionnons les meilleurs artisans et assurons un suivi qualité sur chaque mission.',
    iconName: 'Award'
  },
  {
    id: 'value-4',
    title: 'Proximité',
    description: 'Plateforme 100% marocaine, nous comprenons les besoins locaux et valorisons l\'expertise nationale.',
    iconName: 'Heart'
  }
];