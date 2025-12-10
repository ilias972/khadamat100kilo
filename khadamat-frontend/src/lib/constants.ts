// Constants for Khadamat application
// Centralized text content for easier localization

export const APP_CONFIG = {
  name: 'Khadamat',
  tagline: 'Services à domicile au Maroc',
  description: 'Trouvez et réservez les meilleurs professionnels pour vos travaux à domicile. Plombiers, électriciens, femmes de ménage, peintres et bien plus…',
};

export const HERO_CONTENT = {
  title: 'Trouvez un artisan de confiance, près de chez vous.',
  subtitle: 'Plombiers, électriciens, femmes de ménage, peintres et bien plus… Des professionnels certifiés, locaux et évalués par des clients vérifiés.',
  searchPlaceholder: {
    service: 'Quel service ?',
    city: 'Quelle ville ?',
    loading: 'Chargement...',
    error: 'Erreur de chargement',
  },
  searchButton: {
    default: 'Chercher',
    loading: 'Chargement...',
  },
  trustNumbers: {
    clients: { count: '+1800', label: 'Clients satisfaits' },
    professionals: { count: '+450', label: 'Professionnels vérifiés' },
    rating: { count: '4.8', label: 'Note moyenne' },
    responseTime: { count: '30 min', label: 'Réponse moyenne' },
  },
  errorMessages: {
    noService: 'Veuillez sélectionner un service',
    noCity: 'Veuillez sélectionner une ville',
    apiError: 'Une erreur est survenue lors du chargement des données. Veuillez réessayer plus tard.',
    navigationError: 'Une erreur est survenue lors de la navigation. Veuillez réessayer.',
  },
};

export const SERVICES_CONTENT = {
  title: 'Services populaires',
  subtitle: 'Découvrez nos services les plus demandés. Cliquez sur un service pour explorer les professionnels disponibles.',
  emptyState: {
    title: 'Les services arrivent bientôt',
    description: 'Nous préparons une sélection de services pour votre région. Revenez bientôt !',
    ctaText: 'Voir tous les services',
  },
  errorState: {
    title: 'Service temporairement indisponible',
    description: 'Nous rencontrons un problème technique. Nos services reviennent bientôt.',
    ctaText: 'Voir tous les services',
  },
  ctaText: 'Explorer tous les services',
};

export const PROFESSIONALS_CONTENT = {
  title: 'Top Artisans près de chez vous',
  subtitle: 'Découvrez nos professionnels les mieux notés et les plus actifs. Tous vérifiés et assurés pour votre tranquillité d\'esprit.',
  emptyState: {
    title: 'Pas encore d\'artisans mis en avant',
    description: 'Nous préparons une sélection d\'artisans premium pour votre région. Découvrez tous nos professionnels disponibles.',
    ctaText: 'Voir tous les artisans',
  },
  buttons: {
    contact: 'Entrer en contact',
    viewProfile: 'Voir profil',
    viewAll: 'Voir tous les artisans',
  },
};

export const HOW_IT_WORKS_CONTENT = {
  title: 'Comment ça marche ?',
  subtitle: 'Réservez un artisan en 3 étapes simples. Notre plateforme vous guide à chaque étape pour une expérience sans stress.',
  steps: [
    {
      title: 'Décrivez votre besoin',
      description: 'Choisissez votre service, votre ville et expliquez ce dont vous avez besoin.',
    },
    {
      title: 'Comparez les artisans',
      description: 'Consultez les profils, avis clients et badges vérifiés pour choisir en confiance.',
    },
    {
      title: 'Réservez en toute sérénité',
      description: 'Validez la mission, échangez via la messagerie et notez l\'intervention.',
    },
  ],
  ctaText: 'Commencer maintenant',
};

export const JOIN_AS_PRO_CONTENT = {
  title: 'Rejoignez la plateforme #1 des artisans au Maroc',
  subtitle: 'Développez votre activité, gagnez en visibilité et recevez des missions qualifiées. Rejoignez notre communauté d\'artisans de confiance.',
  benefits: [
    {
      title: 'Gagnez en visibilité',
      description: 'Apparaissez en tête des recherches dans votre région',
    },
    {
      title: 'Recevez plus de missions',
      description: 'Accès à des milliers de clients actifs chaque jour',
    },
    {
      title: 'Devenez vérifié',
      description: 'Obtenez le badge Pro Vérifié pour plus de crédibilité',
    },
    {
      title: 'Gérez facilement vos clients',
      description: 'Outils intégrés pour organiser vos missions et paiements',
    },
  ],
  stats: {
    professionals: { count: '15,000+', label: 'artisans' },
    rating: { count: '4.9/5', label: 'Note moyenne des pros' },
    satisfaction: { count: '98%', label: 'Taux de satisfaction' },
    support: { count: '24/7', label: 'Support disponible' },
  },
  buttons: {
    primary: 'Devenir Pro',
    secondary: 'En savoir plus',
  },
};

export const FAQ_CONTENT = {
  title: 'Questions fréquentes',
  subtitle: 'Tout ce que vous devez savoir avant de réserver votre artisan',
  ctaText: 'Voir toutes les FAQ',
  whatsappText: 'Support WhatsApp',
  questions: [
    {
      question: "Comment être sûr que l'artisan est fiable ?",
      answer: "Tous nos artisans sont vérifiés via un processus rigoureux : contrôle d'identité, vérification des qualifications, et validation des références. Chaque professionnel reçoit un badge 'Pro Vérifié' après validation."
    },
    {
      question: "Comment fonctionne le paiement ?",
      answer: "Le paiement est sécurisé et ne se déclenche qu'après validation du travail par vos soins. Vous ne payez que si vous êtes satisfait du service rendu. Nous acceptons les cartes bancaires et les virements."
    },
    {
      question: "Et si le travail n'est pas satisfaisant ?",
      answer: "Notre garantie satisfaction vous protège. Si le travail ne correspond pas à vos attentes, contactez notre support dans les 48h. Nous trouverons une solution : correction gratuite ou remboursement."
    },
    {
      question: "Êtes-vous disponibles dans toutes les villes du Maroc ?",
      answer: "Oui ! Khadamat couvre l'ensemble du territoire marocain. De Casablanca à Ouarzazate, en passant par Marrakech, Rabat, Fès et toutes les villes intermédiaires, vous trouverez des artisans qualifiés près de chez vous."
    },
    {
      question: "Combien de temps faut-il pour trouver un artisan ?",
      answer: "En moyenne, vous recevez les premières propositions dans l'heure suivant votre demande. Pour les urgences, nous avons un service prioritaire avec réponse garantie sous 30 minutes."
    }
  ],
};

export const BLOG_CONTENT = {
  title: 'Blog & Astuces',
  subtitle: 'Découvrez nos conseils d\'experts, guides pratiques et astuces pour entretenir votre maison et réaliser vos projets.',
  ctaText: 'Voir tous les articles',
  tips: [
    {
      title: 'Maintenance plomberie',
      description: '5 gestes simples pour éviter les pannes',
      category: 'Astuces',
    },
    {
      title: 'Nettoyage de printemps',
      description: 'Guide complet pour un ménage efficace',
      category: 'Guide',
    },
    {
      title: 'Peinture intérieure',
      description: 'Choisir la bonne couleur pour chaque pièce',
      category: 'Conseils',
    },
  ],
};

export const FINAL_CTA_CONTENT = {
  title: 'Prêt à trouver un artisan de confiance ?',
  subtitle: 'Gratuit, sans engagement, artisans vérifiés. Commencez dès maintenant et trouvez le professionnel qu\'il vous faut pour tous vos travaux.',
  ctaText: 'Commencer maintenant',
  exploreText: 'Explorer les services',
  guarantees: [
    { text: 'Gratuit', icon: 'check' },
    { text: 'Sans engagement', icon: 'check' },
    { text: 'Artisans vérifiés', icon: 'check' },
  ],
};

export const NAVIGATION = {
  services: '/services',
  professionals: '/pros',
  signup: '/auth/signup',
  blog: '/blog',
  faq: '/faq',
  becomePro: '/devenir-pro',
  contact: '/contact',
};

export const API_ENDPOINTS = {
  categories: '/locations/categories',
  cities: '/locations/cities',
  professionals: '/pros',
  services: '/services',
};